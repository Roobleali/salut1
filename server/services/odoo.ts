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

    console.log('Initializing Odoo service with URL:', this.config.url);
    console.log('Database:', this.config.db);
    console.log('Username:', this.config.username);

    // Initialize XML-RPC clients for Odoo 17
    const commonEndpoint = `${this.config.url}/xmlrpc/2/common`;
    const objectEndpoint = `${this.config.url}/xmlrpc/2/object`;

    console.log('Common endpoint:', commonEndpoint);
    console.log('Object endpoint:', objectEndpoint);

    this.commonClient = xmlrpc.createClient({
      url: commonEndpoint,
      cookies: true,
      headers: {
        'User-Agent': 'Salut-Enterprise/1.0',
        'Content-Type': 'text/xml',
        'Accept': 'text/xml',
        'Connection': 'close'
      }
    });

    this.objectClient = xmlrpc.createClient({
      url: objectEndpoint,
      cookies: true,
      headers: {
        'User-Agent': 'Salut-Enterprise/1.0',
        'Content-Type': 'text/xml',
        'Accept': 'text/xml',
        'Connection': 'close'
      }
    });
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
    console.log('Using database:', this.config.db);
    console.log('Username:', this.config.username);

    return new Promise((resolve, reject) => {
      // First, verify server availability
      this.commonClient.methodCall('version', [], (err: any, version: any) => {
        if (err) {
          console.error('Failed to get Odoo version:', err);
          reject(new Error('Could not connect to Odoo server. Please verify the URL and port.'));
          return;
        }

        console.log('Connected to Odoo server. Version info:', version);

        // Now attempt authentication with explicit context
        this.commonClient.methodCall(
          'authenticate',
          [
            this.config.db,
            this.config.username,
            this.config.password,
            { lang: 'en_US', tz: 'UTC' }
          ],
          (authErr: any, uid: number) => {
            if (authErr) {
              console.error('Authentication error:', authErr);
              reject(new Error(`Authentication failed: ${authErr.message}`));
              return;
            }

            if (!uid) {
              console.error('Authentication failed: Invalid credentials');
              reject(new Error('Invalid credentials or user not found'));
              return;
            }

            console.log('Successfully authenticated with Odoo. UID:', uid);
            resolve(uid);
          }
        );
      });
    });
  }

  public async testConnection(): Promise<boolean> {
    try {
      await this.authenticate();
      return true;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
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
      const companyValues = {
        name: companyData.name,
        email: companyData.email,
        phone: companyData.phone,
        street: companyData.street,
        city: companyData.city,
        vat: companyData.vat,
        is_company: true,
        company_type: 'company'
      };

      return new Promise((resolve, reject) => {
        this.objectClient.methodCall(
          'execute_kw',
          [
            this.config.db,
            uid,
            this.config.password,
            'res.partner',
            'create',
            [companyValues]
          ],
          (err: any, companyId: number) => {
            if (err) {
              console.error('Company creation error:', err);
              reject(new Error(`Failed to create company: ${err.message}`));
              return;
            }

            console.log('Company created successfully with ID:', companyId);
            resolve({ companyId });
          }
        );
      });
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

      return new Promise((resolve, reject) => {
        this.objectClient.methodCall(
          'execute_kw',
          [
            this.config.db,
            uid,
            this.config.password,
            'res.users',
            'create',
            [{
              name: userData.name,
              login: userData.login,
              company_id: userData.companyId,
              company_ids: [[6, 0, [userData.companyId]]],
              groups_id: [[6, 0, []]]  // Basic user access rights
            }]
          ],
          (err: any, userId: number) => {
            if (err) {
              console.error('User creation error:', err);
              reject(new Error(`Failed to create user: ${err.message}`));
              return;
            }

            console.log('User created successfully with ID:', userId);
            resolve({ userId });
          }
        );
      });
    } catch (error) {
      console.error('Odoo user creation error:', error);
      throw error;
    }
  }
}

// Export a singleton instance
export const odooService = new OdooService();