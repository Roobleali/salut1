
import { createClient } from '@odoo/odoo-client';

export class OdooService {
  private client: any;

  constructor() {
    this.client = createClient({
      baseURL: 'https://franchisetech.ro',
      db: 'franchisetech',
      username: 'admin',
      password: 'ZD1hjj8dCXbbUPrU',
      timeout: 60000, // 60 second timeout
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
  }

  async createCustomerDatabase(company: string, email: string) {
    try {
      const safeCompany = company.toLowerCase().replace(/[^a-z0-9]/g, '_');
      const dbName = `${safeCompany}_${Date.now()}`;
      console.log(`Creating database: ${dbName}`);
      
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
      console.error('Failed to create database:', dbName);
      throw new Error(`Failed to create database: ${error.message || 'Unknown error'}`);
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
