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

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail', // Using Gmail service instead of manual SMTP config
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD, // This should be an App Password for Gmail
  },
});

export async function sendOnboardingEmail(data: OnboardingData) {
  const emailContent = `
    New Onboarding Request:

    Industry: ${data.industry}
    CUI: ${data.cui || 'Not provided'}
    Company Name: ${data.companyName}
    Email: ${data.email}
    Address: ${data.address || 'Not provided'}
    County: ${data.county || 'Not provided'}
    Phone: ${data.phone || 'Not provided'}

    Date: ${new Date().toLocaleString('ro-RO', { timeZone: 'Europe/Bucharest' })}
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'info@saluttech.ro',
    subject: `New Onboarding Request - ${data.companyName}`,
    text: emailContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    // Instead of throwing error, return failure status
    return { 
      success: false, 
      error: 'Unable to send email notification, but your request has been recorded.' 
    };
  }
}