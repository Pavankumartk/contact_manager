export interface Contact {
  id: number;
  full_name: string;
  email: string;
  mobile: string;
  company_name?: string;
  job_title?: string;
  city?: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface ContactFormData {
  full_name: string;
  email: string;
  mobile: string;
  company_name?: string;
  job_title?: string;
  city?: string;
  status: 'active' | 'inactive';
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}
