import { z } from 'zod';

// Validation schemas
export const companyDataSchema = z.object({
  name: z.string().min(1, "Company name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  adminName: z.string().min(1, "Admin name is required"),
  adminLogin: z.string().email("Admin email is required"),
  adminPassword: z.string().min(8, "Password must be at least 8 characters"),
});

export type CompanyData = z.infer<typeof companyDataSchema>;

export interface CompanyResponse {
  companyId: number;
  userId: number;
  redirectUrl: string;
}

export interface ANAFLookupResponse {
  found: boolean;
  denumire?: string;
  adresa?: string;
  judet?: string;
  telefon?: string;
}

export interface BaseAPIResponse {
  success: boolean;
  message?: string;
}

export interface APIErrorResponse extends BaseAPIResponse {
  success: false;
  error?: string;
}

export interface APISuccessResponse<T> extends BaseAPIResponse {
  success: true;
  data: T;
}

export type APIResponse<T> = APISuccessResponse<T> | APIErrorResponse;

export class OdooService {
  private readonly baseUrl: string;
  private readonly defaultHeaders: HeadersInit;

  constructor(baseUrl: string = '/api', headers: HeadersInit = {}) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...headers
    };
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          ...this.defaultHeaders,
          ...options.headers
        },
        credentials: 'include'
      });

      const data = await response.json() as APIResponse<T>;

      if (!response.ok) {
        throw new Error(
          (data as APIErrorResponse).message || response.statusText
        );
      }

      if (!data.success) {
        throw new Error(
          (data as APIErrorResponse).message || 'Operation failed'
        );
      }

      return (data as APISuccessResponse<T>).data;
    } catch (error: any) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }

  async createCompany(data: CompanyData): Promise<CompanyResponse> {
    try {
      // Validate input data
      const validatedData = companyDataSchema.parse(data);

      console.log('Creating company with data:', {
        ...validatedData,
        email: '***',
        adminPassword: '***'
      });

      return this.request<CompanyResponse>('/odoo/create-company', {
        method: 'POST',
        body: JSON.stringify(validatedData)
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors.map(err => err.message).join(', ');
        throw new Error(`Validation failed: ${errorMessage}`);
      }
      throw new Error(error.message || 'Failed to create company');
    }
  }

  async lookupCompany(cui: string): Promise<ANAFLookupResponse> {
    try {
      const sanitizedCui = cui.toString().trim().replace(/[^0-9]/g, '');
      if (!sanitizedCui) {
        throw new Error('Invalid CUI format');
      }

      return this.request<ANAFLookupResponse>(`/anaf-lookup?cui=${sanitizedCui}`);
    } catch (error: any) {
      console.error('Error looking up company:', error);
      throw new Error(error.message || 'Failed to lookup company details');
    }
  }

  // Additional helper methods for common operations
  static validateCompanyData(data: Partial<CompanyData>): Array<string> {
    try {
      companyDataSchema.parse(data);
      return [];
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors.map(err => err.message);
      }
      return ['Invalid company data'];
    }
  }

  static formatCompanyData(data: CompanyData): CompanyData {
    return {
      ...data,
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone?.trim(),
      street: data.street?.trim(),
      city: data.city?.trim(),
      adminName: data.adminName.trim(),
      adminLogin: data.adminLogin.trim().toLowerCase(),
      adminPassword: data.adminPassword
    };
  }
}

// Export a singleton instance with default configuration
export const odooService = new OdooService();

// Also export the class for custom configuration
export default OdooService;