import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/config';
import { SALARY_RECORDS, COMPANY_META } from '@/lib/mock-data';
import { computeMedian, formatSalary } from '@/lib/utils';
import CompanyLogo from '@/components/ui/CompanyLogo';

export const metadata: Metadata = {
  title: 'Jobs | TalentDash',
  description: 'Find the right opportunities, remote or on-site, and understand your worth before you apply.',
  alternates: { canonical: `${SITE_URL}/jobs` },
};

export default function JobsPage() {
  const roleGroups = Array.from(new Set(SALARY_RECORDS.map((r) => r.role))).map((role) => {
    const recs = SALARY_RECORDS.filter((r) => r.role === role);
    const companies = Array.from(new Set(recs.map((r) => r.company_slug))).slice(0, 4);
    const inr = recs.filter((r) => r.currency === 'INR');
    const median = inr.length ? computeMedian(inr.map((r) => r.total_compensation)) : 0;
    return { role, companies, median, count: recs.length };
  });

  return (
    <main className="min-h-screen bg-[#F7F7F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl border border-[#EBEBEB] p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-8 h-8 rounded-lg bg-[#FDF2F8] flex items-center justify-center text-[#EC4899] font-bold text-sm">⚲</span>
            <h1 className="text-lg font-bold text-[#111827]">Find the right opportunities</h1>
          </div>
          <p className="text-sm text-[#717171] mb-6">Understand your worth before you apply — remote, hybrid or on-site.</p>

          <div className="grid grid-cols-1 gap-3">
            {roleGroups.map((g) => (
              <div key={g.role} className="flex items-center justify-between p-4 rounded-lg border border-[#EBEBEB] hover:border-[#EC4899] transition-colors">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-[#111827] mb-1">{g.role}</p>
                  <div className="flex items-center gap-1.5">
                    {g.companies.map((slug) => (
                      <CompanyLogo key={slug} name={COMPANY_META[slug]?.name || slug} size="sm" />
                    ))}
                    <span className="text-xs text-[#9CA3AF] ml-1">{g.count} open roles tracked</span>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <p className="text-sm font-bold text-[#111827]">{g.median ? formatSalary(g.median, 'INR', 'INR') : '—'}</p>
                  <Link href={`/salaries?role=${encodeURIComponent(g.role)}`} className="text-xs font-semibold text-[#EC4899] hover:underline">
                    View salaries →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-[#9CA3AF] mt-6 pt-6 border-t border-[#EBEBEB] text-center">
            Job listings are derived from verified compensation data tracked across companies. Live application links coming soon.
          </p>
        </div>
      </div>
    </main>
  );
}
