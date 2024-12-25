import sgMail from '@sendgrid/mail';

interface OnboardingData {
  companyName: string;
  email: string;
  name?: string;
  message?: string;
  industry?: string;
}

export async function sendOnboardingEmail(data: OnboardingData) {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      throw new Error('SendGrid API key is not configured');
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const emailTemplate = `
Contact Form Submission Details:
-----------------------------
Name: ${data.name || data.companyName}
Email: ${data.email}
Message: ${data.message || 'No message provided'}

Submission Time: ${new Date().toLocaleString('ro-RO', { timeZone: 'Europe/Bucharest' })}
    `.trim();

    const msg = {
      to: 'info@saluttech.ro',
      from: {
        email: process.env.SENDGRID_FROM_EMAIL || '',
        name: 'Salut Enterprise Contact System'
      },
      replyTo: data.email,
      subject: `New Contact Form Submission - ${data.name || data.companyName}`,
      text: emailTemplate,
    };

    await sgMail.send(msg);
    console.log('Email sent successfully via SendGrid');

    return {
      success: true,
      message: 'Your message has been received and our team will contact you shortly.'
    };
  } catch (error: any) {
    console.error('SendGrid email error:', error);
    return {
      success: false,
      error: 'Failed to send email. Please try again later.'
    };
  }
}