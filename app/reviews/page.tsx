import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/config';
import { COMPANY_META } from '@/lib/mock-data';
import CompanyLogo from '@/components/ui/CompanyLogo';

export const metadata: Metadata = {
  title: 'Company Reviews | TalentDash',
  description: 'Real reviews from real professionals — work culture, salaries, and more.',
  alternates: { canonical: `${SITE_URL}/reviews` },
};

const TOP_RATED = [
  { slug: 'google', overall: 4.3, count: '12.4K', workLife: 4.6, compBenefits: 4.5, culture: 4.4, badge: 'Best Work Culture 2026' },
  { slug: 'microsoft', overall: 4.2, count: '9.1K', workLife: 4.3, compBenefits: 4.3, culture: 4.1, badge: 'Top Companies 2026' },
  { slug: 'nvidia', overall: 4.4, count: '6.7K', workLife: 4.1, compBenefits: 4.7, culture: 4.5, badge: 'Most Loved Workplace' },
  { slug: 'amazon', overall: 3.8, count: '24.2K', workLife: 3.5, compBenefits: 3.8, culture: 3.7, badge: 'Trending Choice' },
];

const LATEST_REVIEWS = [
  { slug: 'google', role: 'Software Engineer · Bengaluru', rating: 4.3, time: '2h ago', text: 'Great work culture, amazing colleagues, strong brand value.', tags: { workLife: 4.6, compBenefits: 4.4, culture: 4.4 } },
  { slug: 'microsoft', role: 'Product Manager · Hyderabad', rating: 4.2, time: '5h ago', text: 'Work-life balance, great benefits, supportive management.', tags: { workLife: 4.3, compBenefits: 4.3, culture: 4.1 } },
  { slug: 'amazon', role: 'SDE-II · Bengaluru', rating: 3.8, time: '6h ago', text: 'High compensation, career growth opportunities.', tags: { workLife: 3.5, compBenefits: 3.8, culture: 3.7 } },
];

const TOP_POSITIVES = [
  ['Flexible work hours', 28],
  ['Good work life balance', 24],
  ['Supportive team', 18],
];
const TOP_CONCERNS = [
  ['Long working hours', 32],
  ['High work pressure', 26],
  ['Weekend expectations', 15],
];

function StarRating({ value }: { value: number }) {
  return (
    <span className="text-[#F59E0B] text-xs font-semibold">
      {'★'.repeat(Math.round(value))}{'☆'.repeat(5 - Math.round(value))}
    </span>
  );
}

export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl border border-[#EBEBEB] p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-8 h-8 rounded-lg bg-[#FFFBEB] flex items-center justify-center text-[#F59E0B] font-bold text-sm">★</span>
            <h1 className="text-lg font-bold text-[#111827]">Real reviews from real professionals</h1>
          </div>
          <p className="text-sm text-[#717171] mb-6">Discover honest insights about companies, work culture, salaries, and more.</p>

          {/* Trust stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 pb-6 border-b border-[#EBEBEB]">
            {[
              ['2.4M+', 'Reviews from verified professionals'],
              ['14.7K+', 'Companies reviewed across industries'],
              ['4.1★', 'Avg. satisfaction across all companies'],
              ['96%', 'Verified reviews from real professionals'],
            ].map(([stat, label]) => (
              <div key={label}>
                <p className="text-xl font-bold text-[#111827]">{stat}</p>
                <p className="text-xs text-[#9CA3AF]">{label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Top rated companies */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-[#111827]">Top rated companies</h2>
                <Link href="/companies/google" className="text-xs font-semibold text-[#F59E0B] hover:underline">View all →</Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TOP_RATED.map((c) => {
                  const meta = COMPANY_META[c.slug];
                  return (
                    <Link key={c.slug} href={`/companies/${c.slug}`} className="p-3 rounded-lg border border-[#EBEBEB] hover:border-[#F59E0B] transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <CompanyLogo name={meta.name} size="sm" />
                        <p className="text-sm font-semibold text-[#111827]">{meta.name}</p>
                      </div>
                      <p className="text-sm font-bold text-[#111827] mb-1">{c.overall} <span className="text-[#9CA3AF] text-xs font-normal">({c.count} reviews)</span></p>
                      <div className="space-y-0.5 text-[11px] text-[#717171]">
                        <p>Work Life <span className="float-right font-medium text-[#111827]">{c.workLife}</span></p>
                        <p>Comp & Benefits <span className="float-right font-medium text-[#111827]">{c.compBenefits}</span></p>
                        <p>Culture <span className="float-right font-medium text-[#111827]">{c.culture}</span></p>
                      </div>
                      <span className="inline-block mt-2 px-2 py-0.5 bg-[#FFFBEB] text-[#F59E0B] text-[10px] font-medium rounded-full">{c.badge}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* What professionals say */}
            <div>
              <h2 className="text-sm font-bold text-[#111827] mb-3">What professionals say</h2>
              <div className="flex flex-wrap gap-2">
                {['Great work culture', 'Good WLB', 'Learning & growth', 'Supportive management', 'High compensation', 'Innovative projects', 'Flexible work', 'Career growth', 'Strong brand value', 'Job security'].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 bg-[#F9FAFB] border border-[#EBEBEB] text-[#4B5563] text-xs font-medium rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Latest reviews */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-[#111827]">Latest reviews</h2>
                <Link href="#" className="text-xs font-semibold text-[#F59E0B] hover:underline">View all reviews →</Link>
              </div>
              <div className="space-y-3">
                {LATEST_REVIEWS.map((r, i) => {
                  const meta = COMPANY_META[r.slug];
                  return (
                    <div key={i} className="p-3 rounded-lg border border-[#EBEBEB]">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <CompanyLogo name={meta.name} size="sm" />
                          <div>
                            <p className="text-xs font-semibold text-[#111827]">{meta.name} · {r.role}</p>
                            <p className="text-[10px] text-[#9CA3AF]">{r.time}</p>
                          </div>
                        </div>
                        <StarRating value={r.rating} />
                      </div>
                      <p className="text-xs text-[#4B5563]">{r.text}</p>
                    </div>
                  );
                })}
              </div>
              <Link href="/contribute" className="inline-flex mt-4 px-4 py-2 bg-[#F59E0B] text-white text-xs font-semibold rounded-lg hover:bg-[#D97706] transition-colors">
                Write a review
              </Link>
            </div>

            {/* Review highlights */}
            <div>
              <h2 className="text-sm font-bold text-[#111827] mb-3">Review highlights</h2>
              <div className="p-4 rounded-lg border border-[#EBEBEB] mb-4">
                <p className="text-2xl font-bold text-[#111827]">4.2<span className="text-sm text-[#9CA3AF] font-normal">/5</span></p>
                <StarRating value={4.2} />
                <p className="text-[11px] text-[#9CA3AF] mt-1">Average Work Life Score · Based on 1.2M+ reviews</p>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <p className="text-xs font-semibold text-[#16A34A] mb-1.5">Top positives</p>
                  {TOP_POSITIVES.map(([label, pct]) => (
                    <div key={label} className="flex items-center justify-between text-xs text-[#4B5563] mb-1">
                      <span>{label}</span><span className="font-medium">{pct}%</span>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#DC2626] mb-1.5">Top concerns</p>
                  {TOP_CONCERNS.map(([label, pct]) => (
                    <div key={label} className="flex items-center justify-between text-xs text-[#4B5563] mb-1">
                      <span>{label}</span><span className="font-medium">{pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
