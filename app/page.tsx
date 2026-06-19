import Link from 'next/link';
import { Metadata } from 'next';
import { SALARY_RECORDS, COMPANY_META } from '@/lib/mock-data';
import { formatSalary, computeMedian, slugToName } from '@/lib/utils';
import { SITE_URL } from '@/lib/config';
import CompanyLogo from '@/components/ui/CompanyLogo';

export const metadata: Metadata = {
  title: 'TalentDash — Salary data you can act on.',
  description: 'Discover real salary insights, read reviews, prepare for interviews, and find the right opportunities — all in one place.',
  alternates: { canonical: SITE_URL },
  openGraph: { title: 'TalentDash — Salary data you can act on.', url: SITE_URL },
};

export default function HomePage() {
  const totalRecords = SALARY_RECORDS.length;
  const companies = Object.values(COMPANY_META).slice(0, 8);
  const topRecords = [...SALARY_RECORDS].sort((a, b) => b.total_compensation - a.total_compensation).slice(0, 5);

  return (
    <main className="min-h-screen bg-[#F7F7F7]">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#F3FBF8] to-[#F7F7F7] border-b border-[#EBEBEB]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-5xl font-bold text-[#1a1a1a] mb-3 leading-tight">
            Salary data you can <span className="text-[#00A67E]">act on</span>
          </h1>
          <p className="text-lg text-[#484848] mb-8 max-w-2xl mx-auto">
            Structured, normalised, level-aware compensation data across top Indian and global tech companies.
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/salaries" className="px-6 py-3 bg-[#00A67E] text-white text-sm font-semibold rounded-xl hover:bg-[#008f6c] transition-colors w-full sm:w-auto text-center">
              Explore Salaries
            </Link>
            <Link href="/compare" className="px-6 py-3 bg-white text-[#1a1a1a] text-sm font-semibold rounded-xl border border-[#EBEBEB] hover:border-[#00A67E] hover:text-[#00A67E] transition-colors w-full sm:w-auto text-center">
              Compare Offers
            </Link>
          </div>

          {/* Trust line */}
          <p className="text-sm text-[#717171] mt-6">
            {totalRecords}+ verified records · {Object.keys(COMPANY_META).length}+ companies · Updated daily
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Companies */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#1a1a1a]">Browse by Company</h2>
            <Link href="/companies/google" className="text-sm font-medium text-[#00A67E] hover:underline">Explore companies →</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {companies.map(c => {
              const recs = SALARY_RECORDS.filter(r => r.company_slug === c.slug);
              const median = computeMedian(recs.map(r => r.total_compensation));
              const cur = recs[0]?.currency || 'INR';
              return (
                <Link key={c.slug} href={`/companies/${c.slug}`}
                  className="bg-white rounded-xl border border-[#EBEBEB] p-5 hover:border-[#00A67E]/40 hover:shadow-md transition-all group">
                  <div className="flex items-center gap-2.5 mb-3">
                    <CompanyLogo name={c.name} size="sm" />
                    <h3 className="font-bold text-[#1a1a1a] text-base group-hover:text-[#00A67E] transition-colors truncate">{c.name}</h3>
                  </div>
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
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#1a1a1a]">Top Paying Records</h2>
            <Link href="/salaries" className="text-sm font-medium text-[#00A67E] hover:underline">View all salaries →</Link>
          </div>
          <div className="bg-white rounded-xl border border-[#EBEBEB] overflow-hidden shadow-sm">
            {topRecords.map((r, i) => (
              <div key={r.id} className={`flex items-center justify-between px-6 py-4 ${i < topRecords.length - 1 ? 'border-b border-[#EBEBEB]' : ''} hover:bg-[#F7F7F7] transition-colors`}>
                <div className="flex items-center gap-4 min-w-0">
                  <span className="text-lg font-bold text-[#EBEBEB] w-6 shrink-0">#{i + 1}</span>
                  <CompanyLogo name={slugToName(r.company_slug)} size="sm" />
                  <div className="min-w-0">
                    <p className="font-semibold text-[#1a1a1a] truncate">{slugToName(r.company_slug)}</p>
                    <p className="text-sm text-[#717171] truncate">{r.role} · {r.level_standardized} · {r.location}</p>
                  </div>
                </div>
                <p className="text-xl font-bold text-[#0369A1] shrink-0 ml-4">{formatSalary(r.total_compensation, r.currency, r.currency)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Explore by category */}
        <section>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Explore by what matters to you</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              ['Salaries', '/salaries', '#00A67E'],
              ['Reviews', '/reviews', '#F59E0B'],
              ['Interviews', '/interviews', '#8B5CF6'],
              ['Jobs', '/jobs', '#EC4899'],
              ['Offers', '/offers', '#0EA5E9'],
              ['Community', '/community', '#10B981'],
            ].map(([label, href, color]) => (
              <Link key={label} href={href} className="bg-white rounded-xl border border-[#EBEBEB] p-4 hover:shadow-md transition-all text-center">
                <div className="w-9 h-9 rounded-lg mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                </div>
                <p className="text-sm font-semibold text-[#1a1a1a]">{label}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
