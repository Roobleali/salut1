import type { Express } from "express";
import { createServer, type Server } from "http";
import sgMail from '@sendgrid/mail';
import { odooService } from './services/odoo';

export function registerRoutes(app: Express): Server {
  // Company creation endpoint
  app.post("/api/odoo/create-company", async (req, res) => {
    try {
      console.log("Received request body:", JSON.stringify(req.body, null, 2));

      const {
        name,
        email,
        phone,
        street,
        city,
        adminName,
        adminLogin,
        adminPassword
      } = req.body;

      if (!name?.trim()) {
        return res.status(400).json({
          success: false,
          message: "Company name is required"
        });
      }

      const result = await odooService.createCompany({
        name,
        email,
        phone,
        street,
        city,
        adminName,
        adminLogin,
        adminPassword
      });

      res.json({
        success: true,
        message: "Company and user created successfully in Odoo",
        data: result
      });
    } catch (error: any) {
      console.error("Odoo integration error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create company in Odoo",
        error: error.message
      });
    }
  });

  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const {
        company,
        industry,
        currentSoftware,
        email,
        address,
        county,
        phone,
        cui
      } = req.body;

      if (!company || !email || !industry) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields"
        });
      }

      sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

      const msg = {
        to: 'info@saluttech.ro',
        from: process.env.SENDGRID_FROM_EMAIL || '',
        subject: `New Implementation Request - ${company}`,
        text: `
New Implementation Request

Company Details:
---------------
Company Name: ${company}
Industry: ${industry}
Current Software: ${currentSoftware || 'Not specified'}
Email: ${email}
Address: ${address || 'Not provided'}
County: ${county || 'Not provided'}
Phone: ${phone || 'Not provided'}
CUI: ${cui || 'Not provided'}

Submission Time: ${new Date().toLocaleString('ro-RO', { timeZone: 'Europe/Bucharest' })}
        `.trim(),
      };

      await sgMail.send(msg);

      res.json({
        success: true,
        message: "Your request has been submitted successfully. We'll be in touch shortly."
      });
    } catch (error: any) {
      console.error("Contact form submission error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to process your request. Please try again later.",
        error: error.message
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
