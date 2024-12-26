import xmlrpc from "xmlrpc";

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
    const baseUrl = (process.env.ODOO_URL || "").replace(/\/$/, "");

    try {
      new URL(baseUrl);
    } catch (e) {
      console.error("Invalid Odoo URL format:", baseUrl);
      throw new Error(
        "Invalid Odoo URL format. Please check your ODOO_URL environment variable.",
      );
    }

    this.config = {
      url: baseUrl,
      db: process.env.ODOO_DB || "",
      username: process.env.ODOO_USERNAME || "",
      password: process.env.ODOO_PASSWORD || "",
    };

    console.log("Initializing Odoo service with URL:", this.config.url);
    console.log("Database:", this.config.db);
    console.log("Username:", this.config.username);

    const clientOptions = {
      headers: {
        "User-Agent": "Salut-Enterprise/1.0",
        "Content-Type": "text/xml",
        Accept: "text/xml",
        "X-Forwarded-Proto": "https",
        "X-Forwarded-Host": new URL(this.config.url).hostname,
        "X-Forwarded-Port": "8069",
      },
      cookies: true,
      timeout: 60000,
      rejectUnauthorized: false,
    };

    const xmlrpcPath = "/xmlrpc/2";
    this.commonClient = xmlrpc.createClient({
      ...clientOptions,
      url: `${this.config.url}:8069${xmlrpcPath}/common`,
    });

    this.objectClient = xmlrpc.createClient({
      ...clientOptions,
      url: `${this.config.url}:8069${xmlrpcPath}/object`,
    });
  }

  // Rest of the OdooService implementation remains the same
  // ... (copy the remaining methods from the original odoo.ts)
}

export const odooService = new OdooService();
