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

    console.log("XML-RPC endpoints configured:");
    console.log("- Common:", `${this.config.url}:8069${xmlrpcPath}/common`);
    console.log("- Object:", `${this.config.url}:8069${xmlrpcPath}/object`);
  }

  private validateConfig() {
    const missingFields = [];
    if (!this.config.url) missingFields.push("ODOO_URL");
    if (!this.config.db) missingFields.push("ODOO_DB");
    if (!this.config.username) missingFields.push("ODOO_USERNAME");
    if (!this.config.password) missingFields.push("ODOO_PASSWORD");

    if (missingFields.length > 0) {
      throw new Error(
        `Missing required Odoo configuration: ${missingFields.join(", ")}`,
      );
    }
  }

  private async authenticate(): Promise<number> {
    this.validateConfig();
    console.log("Attempting to authenticate with Odoo...");
    console.log("Using database:", this.config.db);
    console.log("Username:", this.config.username);

    return new Promise((resolve, reject) => {
      this.commonClient.methodCall("version", [], (err: any, version: any) => {
        if (err) {
          console.error("Failed to get Odoo version:", err);
          reject(
            new Error(
              "Could not connect to Odoo server. Please verify the server is accessible.",
            ),
          );
          return;
        }

        console.log("Connected to Odoo server. Version info:", version);

        this.commonClient.methodCall(
          "authenticate",
          [
            this.config.db,
            this.config.username,
            this.config.password,
            { lang: "en_US", tz: "UTC" },
          ],
          (authErr: any, uid: number) => {
            if (authErr) {
              console.error("Authentication error:", authErr);
              reject(new Error(`Authentication failed: ${authErr.message}`));
              return;
            }

            if (!uid) {
              console.error("Authentication failed: Invalid credentials");
              reject(new Error("Invalid credentials or user not found"));
              return;
            }

            console.log("Successfully authenticated with Odoo. UID:", uid);
            resolve(uid);
          },
        );
      });
    });
  }

  private async executeKw(
    uid: number,
    model: string,
    method: string,
    args: any[] = [],
    kwargs: any = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.objectClient.methodCall(
        "execute_kw",
        [
          this.config.db,
          uid,
          this.config.password,
          model,
          method,
          args,
          kwargs,
        ],
        (err: any, result: any) => {
          if (err) {
            console.error(`Odoo execute error for ${model}.${method}:`, err);
            reject(err);
            return;
          }
          resolve(result);
        },
      );
    });
  }

  private async getGroupId(uid: number, xmlId: string): Promise<number> {
    try {
      const [module, name] = xmlId.split(".");
      const result = await this.executeKw(uid, "ir.model.data", "search_read", [
        [
          ["module", "=", module],
          ["name", "=", name]
        ],
        ["res_id"]
      ]);

      if (!result || !result.length) {
        throw new Error(`Group ${xmlId} not found`);
      }

      return result[0].res_id;
    } catch (error) {
      console.error(`Error getting group ID for ${xmlId}:`, error);
      return 1;
    }
  }

  private async checkCompanyExists(
    uid: number,
    name: string,
  ): Promise<boolean> {
    try {
      const count = await this.executeKw(uid, "res.company", "search_count", [
        [["name", "=", name]],
      ]);
      return count > 0;
    } catch (error) {
      console.error("Error checking company existence:", error);
      throw error;
    }
  }

  private async createAdminUser(uid: number, userData: {
    name: string;
    login: string;
    password: string;
    companyId: number;
    partnerId: number;
  }): Promise<number> {
    try {
      const adminGroups = await Promise.all([
        this.getGroupId(uid, "base.group_user"),
        this.getGroupId(uid, "base.group_system"),
        this.getGroupId(uid, "base.group_erp_manager"),
        this.getGroupId(uid, "account.group_account_manager"),
        this.getGroupId(uid, "sales_team.group_sale_manager"),
        this.getGroupId(uid, "stock.group_stock_manager"),
        this.getGroupId(uid, "hr.group_hr_manager"),
      ]);

      const validGroups = adminGroups.filter(id => id !== undefined);

      const userCreateData = {
        name: userData.name,
        login: userData.login,
        password: userData.password,
        company_id: userData.companyId,
        company_ids: [[6, 0, [userData.companyId]]], 
        groups_id: [[6, 0, validGroups]], 
        partner_id: userData.partnerId,
        notification_type: 'email',
        share: false,
        active: true
      };

      // Disable automatic welcome email and password reset
      const context = {
        no_reset_password: true,
        create_user: true,
        mail_create_nosubscribe: true,
        mail_notrack: true,
      };

      const userId = await this.executeKw(
        uid,
        "res.users",
        "create",
        [userCreateData],
        { context }
      );

      // Set initial preferences
      await this.executeKw(
        uid,
        "res.users",
        "write",
        [[userId], {
          lang: 'en_US',
          tz: 'Europe/Bucharest',
          email: userData.login,
        }],
        { context }
      );

      return userId;
    } catch (error) {
      console.error("Error creating admin user:", error);
      throw error;
    }
  }

  public async createCompany(companyData: {
    name: string;
    email: string;
    phone?: string;
    street?: string;
    city?: string;
    adminName: string;
    adminLogin: string;
    adminPassword: string;
  }): Promise<{ companyId: number; userId: number; redirectUrl: string }> {
    try {
      if (!companyData.name?.trim()) {
        throw new Error("Company name is required");
      }
      if (!companyData.email?.trim()) {
        throw new Error("Email is required");
      }
      if (!companyData.adminName?.trim()) {
        throw new Error("Admin name is required");
      }
      if (!companyData.adminLogin?.trim()) {
        throw new Error("Admin login is required");
      }
      if (!companyData.adminPassword?.trim()) {
        throw new Error("Admin password is required");
      }

      const sanitizedData = {
        ...companyData,
        name: companyData.name.trim(),
        email: companyData.email.trim(),
        adminName: companyData.adminName.trim(),
        adminLogin: companyData.adminLogin.trim(),
        phone: companyData.phone?.trim(),
        street: companyData.street?.trim(),
        city: companyData.city?.trim(),
      };

      console.log('Creating company with data:', {
        name: sanitizedData.name,
        email: '***',
        phone: sanitizedData.phone,
        street: sanitizedData.street,
        city: sanitizedData.city,
        adminName: sanitizedData.adminName,
        adminLogin: '***',
        adminPassword: '***'
      });

      const uid = await this.authenticate();

      const companyExists = await this.checkCompanyExists(uid, sanitizedData.name);
      if (companyExists) {
        throw new Error(
          `A company with the name "${sanitizedData.name}" already exists. Please choose a different name.`,
        );
      }

      const partnerData = {
        name: sanitizedData.name,
        email: sanitizedData.email,
        phone: sanitizedData.phone,
        street: sanitizedData.street,
        city: sanitizedData.city,
        is_company: true,
        company_type: "company",
      };

      const partnerId = await this.executeKw(uid, "res.partner", "create", [
        partnerData,
      ]);

      console.log("Created company partner with ID:", partnerId);

      const companyId = await this.executeKw(uid, "res.company", "create", [
        {
          name: sanitizedData.name,
          partner_id: partnerId,
        },
      ]);

      console.log("Company created successfully with ID:", companyId);

      try {
        const userId = await this.createAdminUser(uid, {
          name: sanitizedData.adminName,
          login: sanitizedData.adminLogin,
          password: sanitizedData.adminPassword,
          companyId,
          partnerId,
        });

        console.log("User created successfully with ID:", userId);

        await this.executeKw(uid, "res.partner", "write", [
          [partnerId],
          { user_id: userId },
        ]);

        console.log("Partner updated with user reference");

        const baseUrl = this.config.url.replace(/\/+$/, '');
        const redirectUrl = `${baseUrl}/web/login?login=${encodeURIComponent(sanitizedData.adminLogin)}&redirect=/web`;

        return { companyId, userId, redirectUrl };
      } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Failed to create user account");
      }
    } catch (error: any) {
      console.error("Odoo integration error:", error);
      let errorMessage = "Failed to create company. ";

      if (error.faultString) {
        if (error.faultString.includes("The company name must be unique")) {
          errorMessage = "A company with this name already exists. Please choose a different name.";
        } else {
          errorMessage += error.faultString;
        }
      } else {
        errorMessage += error.message || "An unexpected error occurred.";
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
      console.log("Creating user with data:", { ...userData, login: "***" });
      const uid = await this.authenticate();

      const companyExists = await this.executeKw(
        uid,
        "res.company",
        "search_count",
        [[["id", "=", userData.companyId]]],
      );

      if (!companyExists) {
        throw new Error(`Company with ID ${userData.companyId} not found`);
      }

      const userCreateData = {
        name: userData.name,
        login: userData.login,
        company_id: userData.companyId,
        company_ids: [[6, 0, [userData.companyId]]], 
        groups_id: [[6, 0, []]], 
      };

      const userId = await this.executeKw(uid, "res.users", "create", [
        userCreateData,
      ]);

      console.log("User created successfully with ID:", userId);
      return { userId };
    } catch (error) {
      console.error("Odoo user creation error:", error);
      throw error;
    }
  }
}

export const odooService = new OdooService();