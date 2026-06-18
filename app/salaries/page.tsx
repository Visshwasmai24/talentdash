import { Suspense } from 'react';
import { Metadata } from 'next';
import { SALARY_RECORDS } from '@/lib/mock-data';
import { Currency } from '@/types';
import { ITEMS_PER_PAGE } from '@/lib/config';
import { SITE_URL } from '@/lib/config';
import FilterBar from '@/components/features/FilterBar';
import SalaryTable from '@/components/features/SalaryTable';

import PaginationClient from '@/components/features/PaginationClient';

export const metadata: Metadata = {
  title: 'Software Engineer Salaries in India — L3 to Principal | TalentDash',
  description: 'Browse verified salary data for software engineers across Google, Amazon, Meta, Flipkart, TCS and more. Filter by level, location, and role.',
  alternates: { canonical: `${SITE_URL}/salaries` },
  openGraph: {
    title: 'Software Engineer Salaries in India | TalentDash',
    description: 'Compensation data for 60+ records across top Indian and global tech companies.',
    url: `${SITE_URL}/salaries`,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  name: 'TalentDash Salary Data',
  description: 'Structured, normalised salary data for software engineers in India and globally',
  url: `${SITE_URL}/salaries`,
  creator: { '@type': 'Organization', name: 'TalentDash' },
};

interface PageProps {
  searchParams: Promise<Record<string, string | string[]>>;
}

export default async function SalariesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const company = (params.company as string) || '';
  const role = (params.role as string) || '';
  const levels = params.level ? (Array.isArray(params.level) ? params.level : [params.level]) : [];
  const location = (params.location as string) || '';
  const currency = ((params.currency as string) || 'INR') as Currency;
  const sort = (params.sort as string) || 'total_comp_desc';
  const page = Math.max(1, parseInt((params.page as string) || '1', 10));

  const filtered = SALARY_RECORDS.filter(r => {
    if (company && !r.company.includes(company.toLowerCase()) && !r.company_slug.includes(company.toLowerCase())) return false;
    if (role && !r.role.toLowerCase().includes(role.toLowerCase())) return false;
    if (levels.length && !levels.includes(r.level_standardized)) return false;
    if (location && r.location !== location) return false;
    return true;
  });

  if (sort === 'total_comp_desc') filtered.sort((a, b) => b.total_compensation - a.total_compensation);
  else if (sort === 'total_comp_asc') filtered.sort((a, b) => a.total_compensation - b.total_compensation);
  else if (sort === 'date_desc') filtered.sort((a, b) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime());

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-[#222222] mb-1">Salary Explorer</h1>
            <p className="text-[#717171] text-base">Verified compensation data from {SALARY_RECORDS.length}+ records across top companies</p>
          </div>

          <Suspense>
            <FilterBar
              initialCompany={company}
              initialRole={role}
              initialLevels={levels}
              initialLocation={location}
              initialCurrency={currency}
              initialSort={sort}
            />
          </Suspense>

          {paginated.length === 0 ? (
            <div className="bg-white rounded-xl border border-[#EBEBEB] p-16 text-center">
              <p className="text-[#484848] text-lg font-medium mb-2">No records found for these filters.</p>
              <p className="text-[#717171] mb-4">Try removing a filter to see more results.</p>
              <a href="/salaries" className="text-[#FF5A5F] font-medium hover:underline">Clear all filters</a>
            </div>
          ) : (
            <>
              <SalaryTable records={paginated} displayCurrency={currency} />
              <Suspense>
                <PaginationClient page={safePage} totalPages={totalPages} total={total} limit={ITEMS_PER_PAGE} />
              </Suspense>
            </>
          )}
        </div>
      </main>
    </>
  );
}
