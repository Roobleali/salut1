
import { createClient } from '@odoo/odoo-client';

export class OdooService {
  private client: any;

  constructor() {
    this.client = createClient({
      baseURL: process.env.ODOO_URL || 'http://localhost:8069',
      db: process.env.ODOO_DB || 'odoo',
      username: process.env.ODOO_ADMIN_USER || 'admin',
      password: process.env.ODOO_ADMIN_PASSWORD || 'admin',
    });
  }

  async createCustomerDatabase(company: string, email: string) {
    try {
      const dbName = `${company.toLowerCase().replace(/\s/g, '_')}_${Date.now()}`;
      
      // Create new database
      await this.client.createDatabase({
        dbName,
        demoData: false,
        language: 'en_US',
        password: 'admin' // Initial admin password
      });

      // Configure basic settings
      const newClient = createClient({
        baseURL: process.env.ODOO_URL || 'http://localhost:8069',
        db: dbName,
        username: 'admin',
        password: 'admin'
      });

      // Create user and company
      await newClient.create('res.company', {
        name: company,
      });

      await newClient.create('res.users', {
        name: 'Admin',
        login: email,
        email: email,
      });

      return dbName;
    } catch (error) {
      console.error('Database creation failed:', error);
      throw error;
    }
  }

  async setupTrialSubscription(dbName: string) {
    const trialDays = 14;
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + trialDays);

    await this.client.create('subscription.subscription', {
      database: dbName,
      status: 'trial',
      expiry_date: expiryDate,
    });
  }
}

export const odooService = new OdooService();
