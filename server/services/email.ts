import nodemailer from 'nodemailer';

interface OnboardingData {
  industry: string;
  cui?: string;
  companyName: string;
  email: string;
  address?: string;
  county?: string;
  phone?: string;
  name?: string; // Added name field
  message?: string; // Added message field
}

// Create transporter once and reuse
const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    throw new Error('Email credentials are not properly configured');
  }

  return nodemailer.createTransport({
    host: 'smtp.office365.com',
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
  try {
    const emailTemplate = `
Company Information:
------------------
Name: Salut Enterprise
Type: Cloud-based ERP Platform
Location: Romania
Industry Focus: Romanian Businesses

Contact Form Submission Details:
-----------------------------
Submitted By: ${data.name || 'Anonymous'}
Email Address: ${data.email}

Message Content:
-------------
${data.message || 'No message provided'}

Submission Timestamp: ${new Date().toLocaleString('ro-RO', { timeZone: 'Europe/Bucharest' })}
`;

    const info = await transporter.sendMail({
      from: {
        name: 'SalutTech Platform',
        address: process.env.EMAIL_USER || ''
      },
      to: 'info@saluttech.ro',
      replyTo: data.email,
      subject: `New Implementation Request - ${data.companyName}`,
      text: emailTemplate,
    });

    console.log('Email sent successfully:', info);

    return { 
      success: true,
      message: 'Your request has been received and our team will contact you shortly.'
    };
  } catch (error: any) {
    console.error('Email sending failed:', error);

    return { 
      success: false,
      error: error.message || 
            'Your request has been recorded but we encountered an issue with the email notification. Our team will still process your request.'
    };
  }
}