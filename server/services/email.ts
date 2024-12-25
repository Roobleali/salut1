import nodemailer from 'nodemailer';

interface OnboardingData {
  industry: string;
  cui?: string;
  companyName: string;
  email: string;
  address?: string;
  county?: string;
  phone?: string;
}

// Create transporter once and reuse
const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    throw new Error('Email credentials are not properly configured');
  }

  return nodemailer.createTransport({
    host: 'smtp.office365.com', // Changed to Office 365 since you mentioned using a business email
    port: 587,
    secure: false, // Use STARTTLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    },
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false // Only for development
    }
  });
};

let transporter: nodemailer.Transporter;

try {
  transporter = createTransporter();
  console.log('Email transporter created successfully');
} catch (error) {
  console.error('Failed to create email transporter:', error);
  throw error;
}

export async function sendOnboardingEmail(data: OnboardingData) {
  // Validate required fields
  if (!data.companyName || !data.email || !data.industry) {
    throw new Error('Missing required fields: company name, email, and industry are required');
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
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
          .company-info {
            background-color: #f8fafc;
            border-left: 4px solid #0066cc;
            padding: 16px;
            margin-bottom: 24px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Implementation Request</h2>
          </div>

          <div class="content">
            <div class="company-info">
              <div class="section-title">Requesting Company</div>
              <div class="field">
                <span class="label">Name:</span>
                <span class="value highlight">${data.companyName}</span>
              </div>
              <div class="field">
                <span class="label">CUI:</span>
                <span class="value">${data.cui || 'Not provided'}</span>
              </div>
              <div class="field">
                <span class="label">Industry:</span>
                <span class="value">${data.industry}</span>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Location Details</div>
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
              <div class="section-title">Contact Information</div>
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
            For inquiries, contact our sales team at ${process.env.EMAIL_USER}
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    // Log attempt with redacted credentials
    console.log('Attempting to send email with Nodemailer...', {
      to: 'info@saluttech.ro',
      from: process.env.EMAIL_USER,
      subject: `New Implementation Request - ${data.companyName}`
    });

    // Verify transporter
    await transporter.verify();
    console.log('Transporter verified successfully');

    const info = await transporter.sendMail({
      from: {
        name: 'SalutTech Platform',
        address: process.env.EMAIL_USER || ''
      },
      to: 'info@saluttech.ro',
      replyTo: data.email,
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
    });

    console.log('Email sent successfully:', info);

    return { 
      success: true,
      message: 'Your request has been received and our team will contact you shortly.'
    };
  } catch (error: any) {
    console.error('Email sending failed:', error);

    // Detailed error logging
    if (error.code === 'EAUTH') {
      console.error('Authentication error - please check email credentials');
    } else if (error.code === 'ESOCKET') {
      console.error('Socket error - please check network connectivity');
    }

    return { 
      success: false,
      error: error.message || 
            'Your request has been recorded but we encountered an issue with the email notification. Our team will still process your request.'
    };
  }
}