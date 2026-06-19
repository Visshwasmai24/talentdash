export type Level =
  | 'L3'
  | 'L4'
  | 'L5'
  | 'L6'
  | 'SDE-I'
  | 'SDE-II'
  | 'SDE-III'
  | 'Staff'
  | 'Principal'
  | 'IC4'
  | 'IC5';

export type Currency = 'INR' | 'USD';
export type Source = 'CONTRIBUTOR' | 'SCRAPED' | 'AI_INFERRED';

export interface SalaryRecord {
  id: string;
  company: string;
  company_slug: string;
  role: string;
  level_standardized: Level;
  location: string;
  currency: Currency;
  experience_years: number;
  base_salary: number;
  bonus: number;
  stock: number;
  total_compensation: number;
  source: Source;
  confidence_score: number;
  is_verified: boolean;
  submitted_at: string;
}

export interface CompanyMeta {
  slug: string;
  name: string;
  industry: string;
  founded_year: number | null;
  headcount_range: string;
  headquarters: string;
}

export interface FilterParams {
  company?: string;
  role?: string;
  level?: string;
  location?: string;
  currency?: Currency;
  sort?:
    | 'total_comp_desc'
    | 'total_comp_asc'
    | 'base_desc'
    | 'base_asc'
    | 'stock_desc'
    | 'stock_asc'
    | 'exp_desc'
    | 'exp_asc'
    | 'date_desc';
  page?: number;
}
