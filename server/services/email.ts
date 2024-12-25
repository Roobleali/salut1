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
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #f8f9fa; padding: 20px; margin-bottom: 20px; border-radius: 5px; }
          .section { margin-bottom: 20px; }
          .section-title { color: #0066cc; font-size: 18px; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px; }
          .field { margin-bottom: 10px; }
          .label { font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Onboarding Request from SalutTech Platform</h2>
          </div>

          <div class="section">
            <div class="section-title">Company Information</div>
            <div class="field">
              <span class="label">Company Name:</span> ${data.companyName}
            </div>
            <div class="field">
              <span class="label">Industry:</span> ${data.industry}
            </div>
            <div class="field">
              <span class="label">CUI:</span> ${data.cui || 'Not provided'}
            </div>
          </div>

          <div class="section">
            <div class="section-title">Contact Details</div>
            <div class="field">
              <span class="label">Email:</span> ${data.email}
            </div>
            <div class="field">
              <span class="label">Phone:</span> ${data.phone || 'Not provided'}
            </div>
            <div class="field">
              <span class="label">Address:</span> ${data.address || 'Not provided'}
            </div>
            <div class="field">
              <span class="label">County:</span> ${data.county || 'Not provided'}
            </div>
          </div>

          <div class="section">
            <div class="section-title">Submission Details</div>
            <div class="field">
              <span class="label">Time:</span> ${new Date().toLocaleString('ro-RO', { timeZone: 'Europe/Bucharest' })}
            </div>
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
    subject: `New Onboarding Request - ${data.companyName}`,
    text: `
New Onboarding Request from SalutTech Platform

Company Information:
-------------------
Company Name: ${data.companyName}
Industry: ${data.industry}
CUI: ${data.cui || 'Not provided'}

Contact Details:
---------------
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Address: ${data.address || 'Not provided'}
County: ${data.county || 'Not provided'}

Submission Time: ${new Date().toLocaleString('ro-RO', { timeZone: 'Europe/Bucharest' })}
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