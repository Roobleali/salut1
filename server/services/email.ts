import sgMail from '@sendgrid/mail';

interface OnboardingData {
  industry: string;
  cui?: string;
  companyName: string;
  email: string;
  address?: string;
  county?: string;
  phone?: string;
}

if (!process.env.SENDGRID_API_KEY) {
  console.warn('SendGrid API key not found. Email functionality will not work.');
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export async function sendOnboardingEmail(data: OnboardingData) {
  // Validate required fields
  if (!data.companyName || !data.email || !data.industry) {
    throw new Error('Missing required fields: company name, email, and industry are required');
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f9fafb;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #0066cc 0%, #0052a3 100%);
            padding: 32px 24px;
            text-align: center;
          }
          .header h2 {
            color: #ffffff;
            margin: 0;
            font-size: 24px;
            font-weight: 600;
          }
          .content {
            padding: 32px 24px;
          }
          .section {
            margin-bottom: 32px;
            padding: 24px;
            background-color: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
          }
          .section:last-child {
            margin-bottom: 0;
          }
          .section-title {
            color: #0066cc;
            font-size: 18px;
            font-weight: 600;
            margin: 0 0 16px 0;
            padding-bottom: 8px;
            border-bottom: 2px solid #e5e7eb;
          }
          .field {
            margin-bottom: 12px;
          }
          .field:last-child {
            margin-bottom: 0;
          }
          .label {
            font-weight: 600;
            color: #374151;
            display: inline-block;
            width: 120px;
          }
          .value {
            color: #4b5563;
          }
          .highlight {
            background-color: #f3f4f6;
            padding: 4px 8px;
            border-radius: 4px;
            font-family: monospace;
          }
          .footer {
            padding: 16px 24px;
            background-color: #f3f4f6;
            color: #6b7280;
            font-size: 12px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Enterprise Implementation Request</h2>
          </div>

          <div class="content">
            <div class="section">
              <div class="section-title">Company Information</div>
              <div class="field">
                <span class="label">Company:</span>
                <span class="value highlight">${data.companyName}</span>
              </div>
              <div class="field">
                <span class="label">Industry:</span>
                <span class="value">${data.industry}</span>
              </div>
              <div class="field">
                <span class="label">CUI:</span>
                <span class="value">${data.cui || 'Not provided'}</span>
              </div>
              <div class="field">
                <span class="label">Address:</span>
                <span class="value">${data.address || 'Not provided'}</span>
              </div>
              <div class="field">
                <span class="label">County:</span>
                <span class="value">${data.county || 'Not provided'}</span>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Contact Details</div>
              <div class="field">
                <span class="label">Email:</span>
                <span class="value highlight">${data.email}</span>
              </div>
              <div class="field">
                <span class="label">Phone:</span>
                <span class="value">${data.phone || 'Not provided'}</span>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Submission Details</div>
              <div class="field">
                <span class="label">Timestamp:</span>
                <span class="value">${new Date().toLocaleString('ro-RO', { 
                  timeZone: 'Europe/Bucharest',
                  dateStyle: 'full',
                  timeStyle: 'long'
                })}</span>
              </div>
            </div>
          </div>

          <div class="footer">
            This is an automated message from SalutTech Platform. Please do not reply directly to this email.
            For inquiries, contact the sender at ${data.email}
          </div>
        </div>
      </body>
    </html>
  `;

  const msg = {
    to: 'info@saluttech.ro',
    from: {
      email: process.env.SENDGRID_FROM_EMAIL || 'noreply@saluttech.ro',
      name: 'SalutTech Platform'
    },
    replyTo: data.email, // Add reply-to as the customer's email
    subject: `New Implementation Request - ${data.companyName}`,
    text: `
New Implementation Request from SalutTech Platform

Company Information:
-------------------
Company Name: ${data.companyName}
Industry: ${data.industry}
CUI: ${data.cui || 'Not provided'}
Address: ${data.address || 'Not provided'}
County: ${data.county || 'Not provided'}

Contact Details:
---------------
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}

Submission Time: ${new Date().toLocaleString('ro-RO', { 
  timeZone: 'Europe/Bucharest',
  dateStyle: 'full',
  timeStyle: 'long'
})}
    `.trim(),
    html: htmlContent,
  };

  try {
    console.log('Attempting to send email with SendGrid...', {
      to: msg.to,
      from: msg.from.email,
      subject: msg.subject
    });

    const [response] = await sgMail.send(msg);
    console.log('SendGrid API Response:', {
      statusCode: response.statusCode,
      headers: response.headers,
      body: response.body
    });

    if (response?.statusCode === 202) {
      return { 
        success: true,
        message: 'Your request has been received and our team will contact you shortly.'
      };
    }

    throw new Error(`Unexpected response code: ${response?.statusCode}`);
  } catch (error: any) {
    console.error('Email sending failed:', error);
    if (error.response) {
      console.error('SendGrid API error details:', {
        status: error.response.status,
        body: error.response.body,
        headers: error.response.headers
      });
    }
    return { 
      success: false,
      error: error.response?.body?.errors?.[0]?.message || 
            'Your request has been recorded but we encountered an issue with the email notification. Our team will still process your request.'
    };
  }
}