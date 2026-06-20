import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/config';
import { COMPANY_META, SALARY_RECORDS } from '@/lib/mock-data';
import { computeMedian, formatSalary } from '@/lib/utils';
import CompanyLogo from '@/components/ui/CompanyLogo';

export const metadata: Metadata = {
  title: 'Offers & Negotiation | TalentDash',
  description: 'Decode your offer and know your worth with AI-powered insights.',
  alternates: { canonical: `${SITE_URL}/offers` },
};

const BREAKDOWN = [
  { label: 'Base Salary', verdict: 'Above market', color: '#16A34A' },
  { label: 'Bonus', verdict: 'Average', color: '#F59E0B' },
  { label: 'Equity', verdict: 'Above market', color: '#16A34A' },
  { label: 'Benefits', verdict: 'Excellent', color: '#16A34A' },
];

export default function OffersPage() {
  const inrRecords = SALARY_RECORDS.filter((r) => r.currency === 'INR');
  const medianOffer = computeMedian(inrRecords.map((r) => r.total_compensation));
  const topPaying = Object.values(COMPANY_META).slice(0, 5);

  return (
    <main className="min-h-screen bg-[#F7F7F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl border border-[#EBEBEB] p-6 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-6">
          <div>
            <p className="text-xs font-semibold text-[#0EA5E9] uppercase tracking-wider mb-1">Offers</p>
            <h1 className="text-2xl font-bold text-[#111827] mb-2">Decode your offer. Know your worth.</h1>
            <p className="text-sm text-[#717171] mb-5">AI-powered insights to evaluate your total compensation and make confident career decisions.</p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                ['280K+', 'Offers analyzed'],
                ['35K+', 'Companies covered'],
                ['18%', 'Higher offers achieved'],
                ['100%', 'Private & secure'],
              ].map(([s, l]) => (
                <div key={l} className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-[#F0F9FF] flex items-center justify-center text-[#0EA5E9] text-[10px] font-bold">✓</span>
                  <div>
                    <p className="text-sm font-bold text-[#111827]">{s}</p>
                    <p className="text-[10px] text-[#9CA3AF]">{l}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-[#717171]">
              Median verified offer for SDE-II in India: <span className="font-bold text-[#111827]">{formatSalary(medianOffer, 'INR', 'INR')}</span>
            </p>
          </div>

          <div className="bg-[#F9FAFB] rounded-xl p-6">
            <p className="text-sm font-semibold text-[#111827] mb-1">Evaluate your offer in 2 minutes</p>
            <p className="text-xs text-[#717171] mb-5">Upload your offer details and get a complete breakdown of your CTC, benefits, equity and more.</p>
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-4xl font-bold text-[#16A34A]">82<span className="text-base text-[#9CA3AF] font-normal">/100</span></p>
                <p className="text-xs text-[#9CA3AF]">Your Offer Score · Above Market</p>
              </div>
              <div className="grid grid-cols-1 gap-1.5 text-xs">
                {BREAKDOWN.map((b) => (
                  <div key={b.label} className="flex items-center justify-between gap-3">
                    <span className="text-[#4B5563]">{b.label}</span>
                    <span className="font-semibold" style={{ color: b.color }}>{b.verdict}</span>
                  </div>
                ))}
              </div>
            </div>
            <Link href="/compare" className="inline-flex w-full justify-center px-4 py-2.5 bg-[#0EA5E9] text-white text-sm font-semibold rounded-lg hover:bg-[#0284C7] transition-colors">
              Evaluate my offer
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#EBEBEB] p-6 shadow-sm">
          <h2 className="text-sm font-bold text-[#111827] mb-4">Compare offers from top companies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {topPaying.map((c) => (
              <Link key={c.slug} href={`/companies/${c.slug}`} className="p-3 rounded-lg border border-[#EBEBEB] text-center hover:border-[#0EA5E9] transition-colors">
                <CompanyLogo name={c.name} size="md" />
                <p className="text-xs font-medium text-[#111827] mt-2 truncate">{c.name}</p>
              </Link>
            ))}
          </div>
          <Link href="/compare" className="text-xs font-semibold text-[#0EA5E9] hover:underline mt-4 inline-block">Open offer comparator →</Link>
        </div>
      </div>
    </main>
  );
}
