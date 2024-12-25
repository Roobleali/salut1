
import { createClient } from '@odoo/odoo-client';

export class OdooService {
  private client: any;

  constructor() {
    this.client = createClient({
      baseURL: 'https://franchisetech.ro',
      db: 'franchisetech',
      username: 'admin',
      password: 'ZD1hjj8dCXbbUPrU',
      timeout: 60000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
  }

  async createCustomerDatabase(company: string, email: string, plan: string) {
    try {
      const safeCompany = company.toLowerCase().replace(/[^a-z0-9]/g, '_');
      const dbName = `${safeCompany}_${Date.now()}`;
      console.log(`Creating database: ${dbName}`);
      
      // Create new database
      await this.client.createDatabase({
        dbName,
        demoData: false,
        language: 'en_US',
        password: 'admin'
      });

      // Configure basic settings
      const newClient = createClient({
        baseURL: process.env.ODOO_URL || 'http://0.0.0.0:8069',
        db: dbName,
        username: 'admin',
        password: 'admin'
      });

      // Create company and subscription
      const companyId = await newClient.create('res.company', {
        name: company,
      });

      const userId = await newClient.create('res.users', {
        name: 'Admin',
        login: email,
        email: email,
        company_id: companyId,
      });

      // Create subscription contract
      await this.createSubscriptionContract(dbName, plan, email);

      return {
        dbName,
        credentials: {
          url: process.env.ODOO_URL || 'http://0.0.0.0:8069',
          database: dbName,
          username: email,
          password: 'admin'
        }
      };
    } catch (error) {
      console.error('Database creation failed:', error);
      throw new Error(`Failed to create database: ${error.message || 'Unknown error'}`);
    }
  }

  private async createSubscriptionContract(dbName: string, plan: string, email: string) {
    const trialDays = 14;
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + trialDays);

    await this.client.create('saas.contract', {
      database: dbName,
      plan_id: plan,
      customer_email: email,
      state: 'trial',
      trial_period: trialDays,
      expiry_date: expiryDate,
      max_users: this.getMaxUsersForPlan(plan),
      modules: this.getModulesForPlan(plan),
    });
  }

  private getMaxUsersForPlan(plan: string): number {
    const plans = {
      'starter': 5,
      'professional': 20,
      'enterprise': 100
    };
    return plans[plan] || 5;
  }

  private getModulesForPlan(plan: string): string[] {
    const modules = {
      'starter': ['base', 'sale', 'purchase', 'account'],
      'professional': ['base', 'sale', 'purchase', 'account', 'inventory', 'mrp'],
      'enterprise': ['base', 'sale', 'purchase', 'account', 'inventory', 'mrp', 'hr', 'crm']
    };
    return modules[plan] || modules.starter;
  }
}

export const odooService = new OdooService();
