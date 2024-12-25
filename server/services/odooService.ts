
const xmlrpc = require('xmlrpc');
const { Client } = require('pg');

class OdooService {
  private client;
  private dbClient;

  constructor() {
    this.client = xmlrpc.createClient({
      host: process.env.ODOO_HOST || '0.0.0.0',
      port: parseInt(process.env.ODOO_PORT || '8069'),
      path: '/xmlrpc/2/common'
    });

    this.dbClient = new Client({
      connectionString: process.env.DATABASE_URL,
    });
  }

  async createDatabase(dbName: string): Promise<boolean> {
    try {
      await this.dbClient.connect();
      await this.dbClient.query(`CREATE DATABASE ${dbName}`);
      
      const object = xmlrpc.createClient({
        host: process.env.ODOO_HOST || '0.0.0.0',
        port: parseInt(process.env.ODOO_PORT || '8069'),
        path: '/xmlrpc/2/object'
      });

      return true;
    } catch (error) {
      console.error('Database creation failed:', error);
      return false;
    } finally {
      await this.dbClient.end();
    }
  }

  async authenticate(db: string, username: string, password: string): Promise<number | false> {
    return new Promise((resolve) => {
      this.client.methodCall('authenticate', [db, username, password, {}], (error: any, uid: number) => {
        if (error) {
          console.error('Authentication failed:', error);
          resolve(false);
        }
        resolve(uid);
      });
    });
  }
}

module.exports = { OdooService };
