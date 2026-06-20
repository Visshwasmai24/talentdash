import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/config';
import { COMPANY_META } from '@/lib/mock-data';
import CompanyLogo from '@/components/ui/CompanyLogo';

export const metadata: Metadata = {
  title: 'Community Forum | TalentDash',
  description: 'Anonymous professional discussions on compensation, culture, and careers.',
  alternates: { canonical: `${SITE_URL}/community` },
};

const TRENDING_DISCUSSIONS = [
  { slug: 'amazon', title: 'Amazon SDE-2 salary hike 2026 — What are you expecting?', replies: 309, time: '1h ago', tag: 'Hot' },
  { slug: 'google', title: 'Google L4 hiring bar — Is it really that high in 2026?', replies: 246, time: '2h ago', tag: 'Hot' },
  { slug: 'microsoft', title: 'Microsoft return to office mandate — How\u2019s it going?', replies: 182, time: '3h ago', tag: 'Trending' },
  { slug: 'meta', title: 'Meta E5 performance review experiences', replies: 99, time: '4h ago', tag: 'Trending' },
  { slug: 'google', title: 'Apple PM salary band leaked — Real numbers?', replies: 87, time: '5h ago', tag: 'Hot' },
];

const POPULAR_COMMUNITIES = [
  ['Software Engineering', '1.2M members'],
  ['Product Management', '680K members'],
  ['Data Science', '76K members'],
  ['MBA / Business', '64K members'],
  ['Startups', '42K members'],
];

const TOP_CONTRIBUTORS = [
  ['Arjun R.', 'Top 1%', '2.4K replies'],
  ['Priya S.', 'Top 1%', '1.8K replies'],
  ['Karthik M.', 'Top 1%', '1.2K replies'],
  ['Neha T.', 'Top 1%', '980 replies'],
  ['Rohit P.', 'Top 1%', '875 replies'],
];

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl border border-[#EBEBEB] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#ECFDF5] flex items-center justify-center text-[#10B981] font-bold text-sm">@</span>
              <h1 className="text-lg font-bold text-[#111827]">What professionals are discussing</h1>
            </div>
            <Link href="#" className="text-xs font-semibold text-[#10B981] hover:underline">View discussions →</Link>
          </div>
          <p className="text-sm text-[#717171] mb-6">Real conversations. Real insights. From verified professionals.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
            {TRENDING_DISCUSSIONS.slice(0, 3).map((d, i) => {
              const meta = COMPANY_META[d.slug];
              return (
                <div key={i} className="p-4 rounded-lg border border-[#EBEBEB]">
                  <div className="flex items-center gap-2 mb-2">
                    <CompanyLogo name={meta.name} size="sm" />
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${d.tag === 'Hot' ? 'bg-[#FEF2F2] text-[#DC2626]' : 'bg-[#FFFBEB] text-[#F59E0B]'}`}>{d.tag}</span>
                  </div>
                  <p className="text-xs font-medium text-[#111827] mb-2 leading-snug">{d.title}</p>
                  <p className="text-[10px] text-[#9CA3AF]">{d.replies} replies · {d.time}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Trending now */}
            <div>
              <h2 className="text-sm font-bold text-[#111827] mb-3">Trending now</h2>
              <ol className="space-y-2.5">
                {TRENDING_DISCUSSIONS.map((d, i) => (
                  <li key={i} className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2 min-w-0">
                      <span className="text-[#9CA3AF] font-medium w-4 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                      <CompanyLogo name={COMPANY_META[d.slug].name} size="sm" />
                      <span className="text-[#4B5563] truncate">{d.title}</span>
                    </span>
                    <span className={`shrink-0 ml-2 text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${d.tag === 'Hot' ? 'bg-[#FEF2F2] text-[#DC2626]' : 'bg-[#FFFBEB] text-[#F59E0B]'}`}>{d.tag}</span>
                  </li>
                ))}
              </ol>
              <Link href="#" className="text-xs font-semibold text-[#10B981] hover:underline mt-3 inline-block">View all trending discussions →</Link>
            </div>

            {/* Popular communities */}
            <div>
              <h2 className="text-sm font-bold text-[#111827] mb-3">Popular communities</h2>
              <ul className="space-y-2.5">
                {POPULAR_COMMUNITIES.map(([name, members]) => (
                  <li key={name} className="flex items-center justify-between text-xs">
                    <span className="text-[#4B5563] font-medium">{name}</span>
                    <span className="flex items-center gap-2">
                      <span className="text-[#9CA3AF]">{members}</span>
                      <Link href="#" className="text-[#10B981] font-semibold hover:underline">Join</Link>
                    </span>
                  </li>
                ))}
              </ul>
              <Link href="#" className="text-xs font-semibold text-[#10B981] hover:underline mt-3 inline-block">Explore all communities →</Link>
            </div>

            {/* Top contributors */}
            <div>
              <h2 className="text-sm font-bold text-[#111827] mb-3">Top contributors</h2>
              <ol className="space-y-2.5">
                {TOP_CONTRIBUTORS.map(([name, badge, replies], i) => (
                  <li key={name} className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2">
                      <span className="text-[#9CA3AF] font-medium w-4">{String(i + 1).padStart(2, '0')}</span>
                      <span className="w-6 h-6 rounded-full bg-[#F3F4F6] flex items-center justify-center text-[10px] font-bold text-[#717171]">{name.charAt(0)}</span>
                      <span className="text-[#4B5563] font-medium">{name}</span>
                      <span className="text-[10px] text-[#10B981] font-semibold">★ {badge}</span>
                    </span>
                    <span className="text-[#9CA3AF] shrink-0">{replies}</span>
                  </li>
                ))}
              </ol>
              <Link href="#" className="text-xs font-semibold text-[#10B981] hover:underline mt-3 inline-block">See all contributors →</Link>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6 pt-6 border-t border-[#EBEBEB]">
            <p className="text-xs text-[#717171]">Share your experience. Help millions make better career decisions.</p>
            <Link href="/contribute" className="inline-flex px-4 py-2 bg-[#10B981] text-white text-xs font-semibold rounded-lg hover:bg-[#059669] transition-colors">
              Start a discussion
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
