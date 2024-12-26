import { z } from 'zod';
import xmlrpc from 'xmlrpc';

// Validation schemas
export const companyDataSchema = z.object({
  name: z.string().min(1, "Company name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  adminName: z.string().min(1, "Admin name is required"),
  adminLogin: z.string().email("Admin email is required"),
  adminPassword: z.string().min(8, "Password must be at least 8 characters"),
});

export type CompanyData = z.infer<typeof companyDataSchema>;

export interface CompanyResponse {
  companyId: number;
  userId: number;
  redirectUrl: string;
}

export interface ANAFLookupResponse {
  found: boolean;
  denumire?: string;
  adresa?: string;
  judet?: string;
  telefon?: string;
}

export class CompanyService {
  private readonly odooConfig: {
    url: string;
    db: string;
    username: string;
    password: string;
  };

  constructor() {
    // Get configuration from environment variables
    this.odooConfig = {
      url: import.meta.env.VITE_ODOO_URL || '',
      db: import.meta.env.VITE_ODOO_DB || '',
      username: import.meta.env.VITE_ODOO_USERNAME || '',
      password: import.meta.env.VITE_ODOO_PASSWORD || '',
    };
  }

  async lookupCompany(cui: string): Promise<ANAFLookupResponse> {
    try {
      const sanitizedCui = cui.toString().trim().replace(/[^0-9]/g, '');
      if (!sanitizedCui) {
        throw new Error('Invalid CUI format');
      }

      const apiKey = import.meta.env.VITE_OPENAPI_RO_KEY;
      const response = await fetch(`https://api.openapi.ro/api/companies/${sanitizedCui}`, {
        headers: {
          'x-api-key': apiKey,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to lookup company');
      }

      const data = await response.json();
      return {
        found: true,
        denumire: data.denumire,
        adresa: data.adresa,
        judet: data.judet,
        telefon: data.telefon
      };
    } catch (error) {
      console.error('Error looking up company:', error);
      return { found: false };
    }
  }

  private async authenticateOdoo(): Promise<number> {
    return new Promise((resolve, reject) => {
      const commonClient = xmlrpc.createClient({
        url: `${this.odooConfig.url}/xmlrpc/2/common`,
        headers: {
          'User-Agent': 'Salut-Enterprise/1.0',
          'Content-Type': 'text/xml',
        }
      });

      commonClient.methodCall(
        'authenticate',
        [
          this.odooConfig.db,
          this.odooConfig.username,
          this.odooConfig.password,
          {}
        ],
        (error: any, uid: number) => {
          if (error) {
            console.error('Authentication error:', error);
            reject(new Error('Failed to authenticate with Odoo'));
            return;
          }
          resolve(uid);
        }
      );
    });
  }

  private async executeOdoo(uid: number, model: string, method: string, args: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      const objectClient = xmlrpc.createClient({
        url: `${this.odooConfig.url}/xmlrpc/2/object`,
        headers: {
          'User-Agent': 'Salut-Enterprise/1.0',
          'Content-Type': 'text/xml',
        }
      });

      objectClient.methodCall(
        'execute_kw',
        [
          this.odooConfig.db,
          uid,
          this.odooConfig.password,
          model,
          method,
          args
        ],
        (error: any, result: any) => {
          if (error) {
            console.error(`Odoo execute error for ${model}.${method}:`, error);
            reject(error);
            return;
          }
          resolve(result);
        }
      );
    });
  }

  async createCompany(data: CompanyData): Promise<CompanyResponse> {
    try {
      // Validate input data
      const validatedData = companyDataSchema.parse(data);
      
      const uid = await this.authenticateOdoo();
      
      // Create partner record
      const partnerId = await this.executeOdoo(uid, 'res.partner', 'create', [{
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        street: validatedData.street,
        city: validatedData.city,
        is_company: true,
        company_type: 'company',
      }]);

      // Create company
      const companyId = await this.executeOdoo(uid, 'res.company', 'create', [{
        name: validatedData.name,
        partner_id: partnerId,
      }]);

      // Create admin user
      const userId = await this.executeOdoo(uid, 'res.users', 'create', [{
        name: validatedData.adminName,
        login: validatedData.adminLogin,
        password: validatedData.adminPassword,
        company_id: companyId,
        company_ids: [[6, 0, [companyId]]],
        partner_id: partnerId,
      }]);

      // Send welcome email using EmailJS
      await this.sendWelcomeEmail(validatedData);

      const redirectUrl = `${this.odooConfig.url}/web/login?login=${encodeURIComponent(validatedData.adminLogin)}&redirect=/web`;

      return { companyId, userId, redirectUrl };
    } catch (error: any) {
      console.error('Error creating company:', error);
      if (error instanceof z.ZodError) {
        throw new Error(`Validation failed: ${error.errors.map(e => e.message).join(', ')}`);
      }
      throw new Error(error.message || 'Failed to create company');
    }
  }

  private async sendWelcomeEmail(data: CompanyData): Promise<void> {
    try {
      const emailjs = (await import('@emailjs/browser')).default;
      
      const templateParams = {
        to_email: data.adminLogin,
        to_name: data.adminName,
        company_name: data.name,
        login_url: `${this.odooConfig.url}/web/login`,
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
    } catch (error) {
      console.error('Failed to send welcome email:', error);
      // Don't throw error as email sending is not critical
    }
  }

  // Helper methods
  static validateCompanyData(data: Partial<CompanyData>): Array<string> {
    try {
      companyDataSchema.parse(data);
      return [];
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors.map(err => err.message);
      }
      return ['Invalid company data'];
    }
  }

  static formatCompanyData(data: CompanyData): CompanyData {
    return {
      ...data,
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone?.trim(),
      street: data.street?.trim(),
      city: data.city?.trim(),
      adminName: data.adminName.trim(),
      adminLogin: data.adminLogin.trim().toLowerCase(),
      adminPassword: data.adminPassword
    };
  }
}

// Export a singleton instance
export const companyService = new CompanyService();
