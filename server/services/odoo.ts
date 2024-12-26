import xmlrpc from 'xmlrpc';

interface OdooConfig {
  url: string;
  db: string;
  username: string;
  password: string;
}

export class OdooService {
  private config: OdooConfig;
  private commonClient: any;
  private objectClient: any;

  constructor() {
    // Remove trailing slashes and ensure proper URL format
    const baseUrl = (process.env.ODOO_URL || '').replace(/\/$/, '');

    // Validate URL format
    try {
      new URL(baseUrl);
    } catch (e) {
      console.error('Invalid Odoo URL format:', baseUrl);
      throw new Error('Invalid Odoo URL format. Please check your ODOO_URL environment variable.');
    }

    this.config = {
      url: baseUrl,
      db: process.env.ODOO_DB || '',
      username: process.env.ODOO_USERNAME || '',
      password: process.env.ODOO_PASSWORD || ''
    };

    // Initialize XML-RPC clients with proper paths and options
    const clientOptions = {
      headers: {
        'User-Agent': 'Salut-Enterprise/1.0',
        'Accept': 'text/xml',
        'Content-Type': 'text/xml',
        'Connection': 'keep-alive'
      },
      rejectUnauthorized: false, // Only for development/testing
      timeout: 30000
    };

    this.commonClient = xmlrpc.createClient({ 
      ...clientOptions,
      url: `${this.config.url}/xmlrpc/2/common` 
    });

    this.objectClient = xmlrpc.createClient({ 
      ...clientOptions,
      url: `${this.config.url}/xmlrpc/2/object` 
    });

    console.log('Initialized Odoo service with URL:', this.config.url);
  }

  private validateConfig() {
    const missingFields = [];
    if (!this.config.url) missingFields.push('ODOO_URL');
    if (!this.config.db) missingFields.push('ODOO_DB');
    if (!this.config.username) missingFields.push('ODOO_USERNAME');
    if (!this.config.password) missingFields.push('ODOO_PASSWORD');

    if (missingFields.length > 0) {
      throw new Error(`Missing required Odoo configuration: ${missingFields.join(', ')}`);
    }
  }

  private async authenticate(): Promise<number> {
    this.validateConfig();
    console.log('Attempting to authenticate with Odoo...');

    return new Promise((resolve, reject) => {
      this.commonClient.methodCall(
        'authenticate',
        [this.config.db, this.config.username, this.config.password, {}],
        (err: any, uid: number) => {
          if (err) {
            console.error('Odoo authentication error:', err);

            // Check for specific error types and provide clear messages
            if (err.code === 'ECONNREFUSED') {
              reject(new Error('Could not connect to Odoo server. Please check if the server is running and accessible.'));
            } else if (err.code === 'ETIMEDOUT') {
              reject(new Error('Connection to Odoo server timed out. Please check your network connection.'));
            } else if (err.message.includes('TITLE')) {
              reject(new Error('Invalid XML-RPC response. Please verify the Odoo server URL and ensure it supports XML-RPC.'));
            } else {
              reject(new Error(`Failed to authenticate with Odoo: ${err.message}`));
            }
            return;
          }

          if (!uid) {
            reject(new Error('Invalid credentials or user not found'));
            return;
          }

          console.log('Successfully authenticated with Odoo, UID:', uid);
          resolve(uid);
        }
      );
    });
  }

  private async executeKw(uid: number, model: string, method: string, params: any[]): Promise<any> {
    console.log(`Executing Odoo method: ${model}.${method}`, { params });

    return new Promise((resolve, reject) => {
      this.objectClient.methodCall(
        'execute_kw',
        [this.config.db, uid, this.config.password, model, method, params],
        (err: any, result: any) => {
          if (err) {
            console.error(`Odoo execute error for ${model}.${method}:`, err);

            // Handle specific error cases
            if (err.message.includes('TITLE')) {
              reject(new Error('Invalid XML-RPC response. Please verify the Odoo server URL and ensure it supports XML-RPC.'));
            } else {
              reject(new Error(`Failed to execute Odoo operation ${model}.${method}: ${err.message}`));
            }
            return;
          }

          console.log(`Successfully executed ${model}.${method}`, { result });
          resolve(result);
        }
      );
    });
  }

  public async createCompany(companyData: {
    name: string;
    email: string;
    phone?: string;
    street?: string;
    city?: string;
    vat?: string;
  }): Promise<{ companyId: number }> {
    try {
      console.log('Creating company with data:', { ...companyData, email: '***' });
      const uid = await this.authenticate();

      // Create company (res.partner)
      const companyId = await this.executeKw(uid, 'res.partner', 'create', [[{
        name: companyData.name,
        email: companyData.email,
        phone: companyData.phone,
        street: companyData.street,
        city: companyData.city,
        vat: companyData.vat,
        is_company: true,
        company_type: 'company'
      }]]);

      console.log('Company created successfully with ID:', companyId);
      return { companyId };
    } catch (error) {
      console.error('Odoo company creation error:', error);
      throw error;
    }
  }

  public async createUser(userData: {
    name: string;
    login: string;
    companyId: number;
  }): Promise<{ userId: number }> {
    try {
      console.log('Creating user with data:', { ...userData, login: '***' });
      const uid = await this.authenticate();

      // Create user (res.users)
      const userId = await this.executeKw(uid, 'res.users', 'create', [[{
        name: userData.name,
        login: userData.login,
        company_id: userData.companyId,
        company_ids: [[6, 0, [userData.companyId]]],
      }]]);

      console.log('User created successfully with ID:', userId);
      return { userId };
    } catch (error) {
      console.error('Odoo user creation error:', error);
      throw error;
    }
  }
}

// Export a singleton instance
export const odooService = new OdooService();