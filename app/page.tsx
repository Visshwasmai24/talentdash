import Link from 'next/link';
import { Metadata } from 'next';
import { SALARY_RECORDS, COMPANY_META } from '@/lib/mock-data';
import { formatSalary, computeMedian, slugToName } from '@/lib/utils';
import { SITE_URL } from '@/lib/config';

export const metadata: Metadata = {
  title: 'TalentDash — Career Intelligence for India',
  description: 'Structured salary data for software engineers across Google, Amazon, Meta, Flipkart, TCS and more. Filter by level, location, role.',
  alternates: { canonical: SITE_URL },
  openGraph: { title: 'TalentDash — Career Intelligence for India', url: SITE_URL },
};

export default function HomePage() {
  const totalRecords = SALARY_RECORDS.length;
  const companies = Object.values(COMPANY_META).slice(0, 8);
  const topRecords = [...SALARY_RECORDS].sort((a,b) => b.total_compensation - a.total_compensation).slice(0,5);

  return (
    <main className="min-h-screen bg-[#F7F7F7]">
      {/* Hero */}
      <section className="bg-white border-b border-[#EBEBEB]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-5xl font-bold text-[#222222] mb-4 leading-tight">
            Salary data you can <span className="text-[#FF5A5F]">act on</span>
          </h1>
          <p className="text-xl text-[#484848] mb-8 max-w-2xl mx-auto">
            Structured, normalised, level-aware compensation data for {totalRecords}+ records across top Indian and global tech companies.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/salaries" className="px-8 py-3.5 bg-[#FF5A5F] text-white font-semibold rounded-xl hover:bg-[#e05055] transition-colors text-base">
              Explore Salaries
            </Link>
            <Link href="/compare" className="px-8 py-3.5 bg-white border border-[#EBEBEB] text-[#484848] font-semibold rounded-xl hover:bg-[#F7F7F7] transition-colors text-base">
              Compare Offers
            </Link>
          </div>
          <p className="mt-6 text-sm text-[#717171]">{totalRecords} verified records · {Object.keys(COMPANY_META).length} companies · Updated daily</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Companies */}
        <section>
          <h2 className="text-2xl font-bold text-[#222222] mb-6">Browse by Company</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {companies.map(c => {
              const recs = SALARY_RECORDS.filter(r => r.company_slug === c.slug);
              const median = computeMedian(recs.map(r => r.total_compensation));
              const cur = recs[0]?.currency || 'INR';
              return (
                <Link key={c.slug} href={`/companies/${c.slug}`}
                  className="bg-white rounded-xl border border-[#EBEBEB] p-5 hover:border-[#FF5A5F]/40 hover:shadow-md transition-all group">
                  <h3 className="font-bold text-[#222222] text-base group-hover:text-[#FF5A5F] transition-colors truncate">{c.name}</h3>
                  <p className="text-xs text-[#717171] mb-3">{c.industry}</p>
                  <p className="text-lg font-bold text-[#0369A1]">{formatSalary(median, cur, cur)}</p>
                  <p className="text-xs text-[#717171]">Median TC · {recs.length} records</p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Top Paying */}
        <section>
          <h2 className="text-2xl font-bold text-[#222222] mb-6">Top Paying Records</h2>
          <div className="bg-white rounded-xl border border-[#EBEBEB] overflow-hidden shadow-sm">
            {topRecords.map((r, i) => (
              <div key={r.id} className={`flex items-center justify-between px-6 py-4 ${i < topRecords.length - 1 ? 'border-b border-[#EBEBEB]' : ''} hover:bg-[#F7F7F7] transition-colors`}>
                <div className="flex items-center gap-4 min-w-0">
                  <span className="text-lg font-bold text-[#EBEBEB] w-6 shrink-0">#{i+1}</span>
                  <div className="min-w-0">
                    <p className="font-semibold text-[#222222] truncate">{slugToName(r.company_slug)}</p>
                    <p className="text-sm text-[#717171] truncate">{r.role} · {r.level_standardized} · {r.location}</p>
                  </div>
                </div>
                <p className="text-xl font-bold text-[#0369A1] shrink-0 ml-4">{formatSalary(r.total_compensation, r.currency, r.currency)}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link href="/salaries" className="text-sm font-medium text-[#FF5A5F] hover:underline">View all records →</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
