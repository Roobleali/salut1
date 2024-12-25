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
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendOnboardingEmail(data: OnboardingData) {
  const emailContent = `
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
  `.trim();

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'info@saluttech.ro',
    subject: `New Onboarding Request - ${data.companyName}`,
    text: emailContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { 
      success: true,
      message: 'Your request has been received and our team will contact you shortly.'
    };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { 
      success: false, 
      error: 'Your request has been recorded but we encountered an issue with the email notification. Our team will still process your request.'
    };
  }
}