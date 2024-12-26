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

    // Configure XML-RPC clients with proxy-aware settings
    const clientOptions = {
      headers: {
        'User-Agent': 'Salut-Enterprise/1.0',
        'Content-Type': 'text/xml',
        'Accept': 'text/xml',
        'X-Forwarded-Proto': 'https',
        'X-Forwarded-Host': new URL(this.config.url).hostname,
        'X-Forwarded-Port': '8069'
      },
      cookies: true,
      timeout: 60000, // 60 second timeout
      rejectUnauthorized: false // Required for self-signed certs
    };

    // Create clients with explicit endpoints
    const xmlrpcPath = '/xmlrpc/2';
    this.commonClient = xmlrpc.createClient({
      ...clientOptions,
      url: `${this.config.url}:8069${xmlrpcPath}/common`
    });

    this.objectClient = xmlrpc.createClient({
      ...clientOptions,
      url: `${this.config.url}:8069${xmlrpcPath}/object`
    });

    console.log('XML-RPC endpoints configured:');
    console.log('- Common:', `${this.config.url}:8069${xmlrpcPath}/common`);
    console.log('- Object:', `${this.config.url}:8069${xmlrpcPath}/object`);
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
      // First, test the server connection
      this.commonClient.methodCall('version', [], (err: any, version: any) => {
        if (err) {
          console.error('Failed to get Odoo version:', err);
          reject(new Error('Could not connect to Odoo server. Please verify the server is accessible.'));
          return;
        }

        console.log('Connected to Odoo server. Version info:', version);

        // Then attempt authentication with explicit context
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

  private async executeKw(uid: number, model: string, method: string, args: any[] = [], kwargs: any = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      this.objectClient.methodCall(
        'execute_kw',
        [
          this.config.db,
          uid,
          this.config.password,
          model,
          method,
          args,
          kwargs
        ],
        (err: any, result: any) => {
          if (err) {
            console.error(`Odoo execute error for ${model}.${method}:`, err);
            reject(err);
            return;
          }
          resolve(result);
        }
      );
    });
  }

  private async getGroupId(uid: number, xmlId: string): Promise<number> {
    const [module, name] = xmlId.split('.');
    const result = await this.executeKw(
      uid,
      'ir.model.data',
      'get_object_reference',
      [module, name]
    );
    return result[1];
  }

  private async checkCompanyExists(uid: number, name: string): Promise<boolean> {
    try {
      const count = await this.executeKw(
        uid,
        'res.company',
        'search_count',
        [[['name', '=', name]]]
      );
      return count > 0;
    } catch (error) {
      console.error('Error checking company existence:', error);
      throw error;
    }
  }

  public async createCompany(companyData: {
    name: string;
    email: string;
    phone?: string;
    street?: string;
    city?: string;
    vat?: string;
    adminName: string;
    adminLogin: string;
    adminPassword: string;
  }): Promise<{ companyId: number; userId: number }> {
    try {
      // Validate required fields
      if (!companyData.name) {
        throw new Error("Company name is required");
      }
      if (!companyData.email) {
        throw new Error("Email is required");
      }
      if (!companyData.adminName) {
        throw new Error("Admin name is required");
      }
      if (!companyData.adminLogin) {
        throw new Error("Admin login is required");
      }
      if (!companyData.adminPassword) {
        throw new Error("Admin password is required");
      }

      console.log('Creating company with data:', {
        name: companyData.name,
        email: '***',
        phone: companyData.phone,
        street: companyData.street,
        city: companyData.city,
        adminName: companyData.adminName,
        adminLogin: '***',
        adminPassword: '***'
      });

      const uid = await this.authenticate();

      // Check if company name already exists
      const companyExists = await this.checkCompanyExists(uid, companyData.name);
      if (companyExists) {
        throw new Error(`A company with the name "${companyData.name}" already exists. Please choose a different name.`);
      }

      // First create res.partner record for the company
      const partnerData = {
        name: companyData.name,
        email: companyData.email,
        phone: companyData.phone,
        street: companyData.street,
        city: companyData.city,
        is_company: true,
        company_type: 'company',
      };

      const partnerId = await this.executeKw(
        uid,
        'res.partner',
        'create',
        [partnerData]
      );

      console.log('Created company partner with ID:', partnerId);

      // Create the company with the partner reference
      const companyId = await this.executeKw(
        uid,
        'res.company',
        'create',
        [{
          name: companyData.name,
          partner_id: partnerId,
        }]
      );

      console.log('Company created successfully with ID:', companyId);

      // Get required group IDs
      const portalGroupId = await this.getGroupId(uid, 'base.group_portal');
      const contactCreationGroupId = await this.getGroupId(uid, 'base.group_partner_manager');
      const internalUserGroupId = await this.getGroupId(uid, 'base.group_user');

      // Create user with proper access rights
      const userCreateData = {
        name: companyData.adminName,
        login: companyData.adminLogin,
        password: companyData.adminPassword,
        company_id: companyId,
        company_ids: [[6, 0, [companyId]]], // Set allowed companies
        groups_id: [[6, 0, [portalGroupId, contactCreationGroupId, internalUserGroupId]]], // Set user groups
        partner_id: partnerId,
      };

      const userId = await this.executeKw(
        uid,
        'res.users',
        'create',
        [userCreateData]
      );

      console.log('User created successfully with ID:', userId);

      // Update partner record with the new user
      await this.executeKw(
        uid,
        'res.partner',
        'write',
        [[partnerId], { user_id: userId }]
      );

      console.log('Partner updated with user reference');

      return { companyId, userId };
    } catch (error: any) {
      console.error('Odoo integration error:', error);

      // Format error message for UI display
      let errorMessage = 'Failed to create company. ';
      if (error.faultString) {
        // Handle XML-RPC fault errors
        if (error.faultString.includes('The company name must be unique')) {
          errorMessage = 'A company with this name already exists. Please choose a different name.';
        } else {
          errorMessage += error.faultString;
        }
      } else {
        errorMessage += error.message || 'An unexpected error occurred.';
      }

      throw new Error(errorMessage);
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

      // First verify the company exists
      const companyExists = await this.executeKw(
        uid,
        'res.company',
        'search_count',
        [[['id', '=', userData.companyId]]]
      );

      if (!companyExists) {
        throw new Error(`Company with ID ${userData.companyId} not found`);
      }

      // Create the user with proper company references
      const userCreateData = {
        name: userData.name,
        login: userData.login,
        company_id: userData.companyId,
        company_ids: [[6, 0, [userData.companyId]]], // Set allowed companies
        groups_id: [[6, 0, []]], // Basic user access rights
      };

      const userId = await this.executeKw(
        uid,
        'res.users',
        'create',
        [userCreateData]
      );

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