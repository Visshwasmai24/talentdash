import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/config';
import { COMPANY_META } from '@/lib/mock-data';
import CompanyLogo from '@/components/ui/CompanyLogo';

export const metadata: Metadata = {
  title: 'TalentDash Workplace Index | TalentDash',
  description: 'Data-driven rankings of companies, industries and workplaces based on what professionals value most.',
  alternates: { canonical: `${SITE_URL}/workplace-index` },
};

const RANKING_LISTS = [
  { title: 'Top 100 Companies Overall', companies: ['google', 'microsoft', 'amazon'] },
  { title: 'Top 100 Companies for Millennials', companies: ['google', 'microsoft', 'nvidia'] },
  { title: 'Top 100 Companies for Gen Z', companies: ['nvidia', 'google', 'microsoft'] },
  { title: 'Top 100 Best Paying Companies', companies: ['nvidia', 'google', 'microsoft'] },
  { title: 'Top 100 for Work-Life Balance', companies: ['google', 'microsoft', 'meta'] },
  { title: 'Top 100 Most Loved Workplaces', companies: ['google', 'microsoft', 'razorpay'] },
];

const INDUSTRIES = [
  { name: 'IT Services', companies: ['google', 'infosys'] },
  { name: 'BFSI', companies: ['razorpay'] },
  { name: 'FMCG', companies: ['flipkart'] },
  { name: 'Consumer Services', companies: ['zepto'] },
  { name: 'E-commerce', companies: ['amazon', 'flipkart'] },
  { name: 'Healthcare', companies: ['nvidia'] },
  { name: 'Travel & Hospitality', companies: ['meesho'] },
  { name: 'Manufacturing', companies: ['tcs', 'wipro'] },
];

export default function WorkplaceIndexPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        {/* Workplace Index */}
        <div className="bg-white rounded-2xl border border-[#EBEBEB] p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-8 h-8 rounded-lg bg-[#F5F3FF] flex items-center justify-center text-[#8B5CF6] font-bold text-sm">🏆</span>
            <h1 className="text-lg font-bold text-[#111827]">TalentDash Workplace Index</h1>
          </div>
          <p className="text-sm text-[#717171] mb-6">Data-driven rankings of companies, industries and workplaces based on what professionals value the most.</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 pb-6 border-b border-[#EBEBEB]">
            {[
              [`${Object.keys(COMPANY_META).length * 40}+`, 'Companies ranked'],
              ['15M+', 'Verified data points'],
              ['30+', 'Ranking categories'],
              ['100%', 'Transparent methodology'],
            ].map(([stat, label]) => (
              <div key={label}>
                <p className="text-xl font-bold text-[#111827]">{stat}</p>
                <p className="text-xs text-[#9CA3AF]">{label}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-[#111827]">Popular ranking lists</h2>
            <Link href="#" className="text-xs font-semibold text-[#8B5CF6] hover:underline">View all rankings →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
            {RANKING_LISTS.map((list) => (
              <div key={list.title} className="p-4 rounded-lg border border-[#EBEBEB]">
                <p className="text-xs font-semibold text-[#111827] mb-3">{list.title}</p>
                <ol className="space-y-1.5">
                  {list.companies.map((slug, i) => (
                    <li key={slug} className="flex items-center gap-2 text-xs text-[#4B5563]">
                      <span className="w-4 text-[#9CA3AF] font-medium">{i + 1}</span>
                      <CompanyLogo name={COMPANY_META[slug].name} size="sm" />
                      {COMPANY_META[slug].name}
                    </li>
                  ))}
                </ol>
                <Link href="#" className="text-[11px] font-semibold text-[#8B5CF6] hover:underline mt-2 inline-block">View full list →</Link>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-[#111827]">Explore by industry</h2>
            <Link href="#" className="text-xs font-semibold text-[#8B5CF6] hover:underline">View all industries →</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {INDUSTRIES.map((ind) => (
              <div key={ind.name} className="p-3 rounded-lg border border-[#EBEBEB] text-center">
                <p className="text-[11px] font-semibold text-[#111827] mb-2 truncate">{ind.name}</p>
                <div className="flex items-center justify-center gap-1">
                  {ind.companies.map((slug) => (
                    <CompanyLogo key={slug} name={COMPANY_META[slug].name} size="sm" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Offers banner */}
        <div className="bg-white rounded-2xl border border-[#EBEBEB] p-6 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div>
            <p className="text-xs font-semibold text-[#6366F1] uppercase tracking-wider mb-1">Offers</p>
            <h2 className="text-xl font-bold text-[#111827] mb-2">Decode your offer. Know your worth.</h2>
            <p className="text-sm text-[#717171] mb-4">AI-powered insights to evaluate your total compensation and make confident career decisions.</p>
            <div className="grid grid-cols-2 gap-3">
              {[['280K+', 'Offers analyzed'], ['35K+', 'Companies updated'], ['18%', 'Higher offers achieved'], ['100%', 'Private & secure']].map(([s, l]) => (
                <div key={l}>
                  <p className="text-lg font-bold text-[#111827]">{s}</p>
                  <p className="text-[11px] text-[#9CA3AF]">{l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#F9FAFB] rounded-xl p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-[#111827] mb-1">Evaluate your offer in 2 minutes</p>
              <p className="text-xs text-[#717171] mb-4">Upload your offer details and get a complete breakdown of your CTC, benefits, equity and more.</p>
              <Link href="/offers" className="inline-flex px-4 py-2 bg-[#6366F1] text-white text-xs font-semibold rounded-lg hover:bg-[#4F46E5] transition-colors">
                Evaluate my offer
              </Link>
            </div>
            <div className="text-center shrink-0 ml-4">
              <p className="text-3xl font-bold text-[#16A34A]">82</p>
              <p className="text-[10px] text-[#9CA3AF]">Offer Score / 100</p>
            </div>
          </div>
        </div>

        {/* Tools banner */}
        <div className="bg-white rounded-2xl border border-[#EBEBEB] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-xl font-bold text-[#111827]">Powerful tools. Smarter career moves.</h2>
            <Link href="/tools" className="text-sm font-semibold text-[#FF5A5F] hover:underline">View all tools →</Link>
          </div>
          <p className="text-sm text-[#717171] mb-6">Accurate calculators and analyzers to help you plan, grow and negotiate better.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              ['Salary Calculator', 'Calculate your in-hand salary & deductions', '120K+ used'],
              ['Salary Hike Calculator', 'Plan your next hike with confidence', '95K+ used'],
              ['Equity Calculator', 'Calculate RSU/ESOP value & future worth', '80K+ used'],
              ['Offer Comparator', 'Compare multiple offers side by side', '65K+ used'],
              ['Tax Calculator', 'Estimate your taxes & take-home pay', '90K+ used'],
            ].map(([title, desc, used]) => (
              <div key={title} className="p-4 rounded-lg border border-[#EBEBEB]">
                <p className="text-xs font-semibold text-[#111827] mb-1">{title}</p>
                <p className="text-[11px] text-[#717171] mb-2">{desc}</p>
                <p className="text-[10px] text-[#9CA3AF] mb-2">{used}</p>
                <Link href="/tools" className="text-[11px] font-semibold text-[#FF5A5F] hover:underline">Calculate now →</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
