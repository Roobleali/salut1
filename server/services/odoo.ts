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
    this.config = {
      url: process.env.ODOO_URL || 'https://your-odoo-instance.com',
      db: process.env.ODOO_DB || 'your-database-name',
      username: process.env.ODOO_USERNAME || 'your-username',
      password: process.env.ODOO_PASSWORD || 'your-password'
    };

    this.commonClient = xmlrpc.createClient({ url: `${this.config.url}/xmlrpc/2/common` });
    this.objectClient = xmlrpc.createClient({ url: `${this.config.url}/xmlrpc/2/object` });
  }

  private authenticate(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.commonClient.methodCall(
        'authenticate',
        [this.config.db, this.config.username, this.config.password, {}],
        (err: any, uid: number) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(uid);
        }
      );
    });
  }

  private executeKw(uid: number, model: string, method: string, params: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
      this.objectClient.methodCall(
        'execute_kw',
        [this.config.db, uid, this.config.password, model, method, params],
        (err: any, result: any) => {
          if (err) {
            reject(err);
            return;
          }
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

      return { companyId };
    } catch (error) {
      console.error('Odoo API error:', error);
      throw new Error('Failed to create company in Odoo');
    }
  }

  public async createUser(userData: {
    name: string;
    login: string;
    companyId: number;
  }): Promise<{ userId: number }> {
    try {
      const uid = await this.authenticate();
      
      // Create user (res.users)
      const userId = await this.executeKw(uid, 'res.users', 'create', [[{
        name: userData.name,
        login: userData.login,
        company_id: userData.companyId,
        company_ids: [[6, 0, [userData.companyId]]],
      }]]);

      return { userId };
    } catch (error) {
      console.error('Odoo API error:', error);
      throw new Error('Failed to create user in Odoo');
    }
  }
}

export const odooService = new OdooService();
