import Link from 'next/link';
import { Metadata } from 'next';
import { SALARY_RECORDS, COMPANY_META } from '@/lib/mock-data';
import { formatSalary, computeMedian } from '@/lib/utils';
import { SITE_URL } from '@/lib/config';
import CompanyLogo from '@/components/ui/CompanyLogo';
import MiniSparkline from '@/components/features/MiniSparkline';

export const metadata: Metadata = {
  title: 'TalentDash — Salary data you can act on.',
  description: 'Explore salaries, read real reviews, prepare for interviews, and find the right opportunities — all in one place.',
  alternates: { canonical: SITE_URL },
  openGraph: { title: 'TalentDash — Salary data you can act on.', url: SITE_URL },
};

const TRENDING_SEARCHES = ['Software Engineer', 'Data Scientist', 'Product Manager', 'Marketing Manager', 'Remote Jobs'];

const EXPLORE_CATEGORIES = [
  { label: 'Salaries', desc: 'Compare pay by role, company, city and experience.', href: '/salaries', color: '#16A34A' },
  { label: 'Reviews', desc: 'Discover what employees say about companies.', href: '/reviews', color: '#F59E0B' },
  { label: 'Interviews', desc: 'Practice real questions and interview experiences.', href: '/interviews', color: '#8B5CF6' },
  { label: 'Jobs', desc: 'Find the right opportunities, remote or on-site.', href: '/jobs', color: '#EC4899' },
  { label: 'Offers', desc: 'Compare offers, salary, bonus, equity and more.', href: '/offers', color: '#0EA5E9' },
  { label: 'Community', desc: 'Ask questions, join and learn from others.', href: '/community', color: '#10B981' },
];

export default function HomePage() {
  const totalRecords = SALARY_RECORDS.length;
  const companyCount = Object.keys(COMPANY_META).length;

  // Average salary (India, INR records) for the hero stat card
  const inrRecords = SALARY_RECORDS.filter((r) => r.currency === 'INR');
  const avgIndia = Math.round(inrRecords.reduce((sum, r) => sum + r.total_compensation, 0) / inrRecords.length);

  // Top paying companies by median total comp
  const topPaying = Object.values(COMPANY_META)
    .map((c) => {
      const recs = SALARY_RECORDS.filter((r) => r.company_slug === c.slug);
      const median = computeMedian(recs.map((r) => r.total_compensation));
      const currency = recs[0]?.currency || 'INR';
      return { ...c, median, currency, count: recs.length };
    })
    .sort((a, b) => {
      // normalize roughly to INR for ranking purposes only
      const aN = a.currency === 'USD' ? a.median * 83.5 : a.median;
      const bN = b.currency === 'USD' ? b.median * 83.5 : b.median;
      return bN - aN;
    })
    .slice(0, 5);

  // Top roles by median total comp
  const roleSet = Array.from(new Set(SALARY_RECORDS.map((r) => r.role)));
  const topRoles = roleSet
    .map((role) => {
      const recs = SALARY_RECORDS.filter((r) => r.role === role && r.currency === 'INR');
      if (recs.length === 0) return null;
      const median = computeMedian(recs.map((r) => r.total_compensation));
      return { role, median, count: recs.length };
    })
    .filter((r): r is { role: string; median: number; count: number } => r !== null)
    .sort((a, b) => b.median - a.median)
    .slice(0, 5);

  return (
    <main className="min-h-screen bg-[#F7F7F7]">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#F0FDF4] to-[#F7F7F7] border-b border-[#EBEBEB]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-5xl font-bold text-[#111827] mb-3 leading-tight">
            Salary data you can <span className="text-[#16A34A]">act on</span>
          </h1>
          <p className="text-lg text-[#4B5563] mb-8 max-w-2xl mx-auto">
            Structured, normalised, level-aware compensation data across top Indian and global tech companies.
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            <Link
              href="/salaries"
              className="px-6 py-3 bg-[#16A34A] text-white text-sm font-semibold rounded-xl hover:bg-[#15803D] transition-colors w-full sm:w-auto text-center"
            >
              Explore Salaries
            </Link>
            <Link
              href="/compare"
              className="px-6 py-3 bg-white text-[#111827] text-sm font-semibold rounded-xl border border-[#EBEBEB] hover:border-[#16A34A] hover:text-[#16A34A] transition-colors w-full sm:w-auto text-center"
            >
              Compare Offers
            </Link>
          </div>

          {/* Trending searches */}
          <div className="flex items-center justify-center gap-2 mt-2 flex-wrap text-sm">
            <span className="text-[#9CA3AF]">Trending:</span>
            {TRENDING_SEARCHES.map((t) => (
              <Link
                key={t}
                href={`/salaries?role=${encodeURIComponent(t)}`}
                className="px-3 py-1 bg-white border border-[#EBEBEB] rounded-full text-[#4B5563] hover:border-[#16A34A] hover:text-[#16A34A] transition-colors"
              >
                {t}
              </Link>
            ))}
          </div>

          {/* Trust stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 text-left max-w-3xl mx-auto">
            {[
              { icon: 'shield', label: 'Verified & Trusted', sub: 'Real data, real people' },
              { icon: 'users', label: `${(totalRecords * 11).toLocaleString()}+ Users`, sub: 'Across the globe' },
              { icon: 'building', label: `${companyCount}+ Companies`, sub: 'Researched & reviewed' },
              { icon: 'lock', label: '100% Free', sub: 'No hidden charges' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-[#F0FDF4] flex items-center justify-center shrink-0">
                  <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#111827]">{s.label}</p>
                  <p className="text-xs text-[#9CA3AF]">{s.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Career Intelligence Hub */}
        <section>
          <p className="text-xs font-semibold text-[#16A34A] uppercase tracking-wider mb-1">Career Intelligence Hub</p>
          <h2 className="text-2xl font-bold text-[#111827] mb-1">Explore the world of work</h2>
          <p className="text-sm text-[#717171] mb-6">Real salary data, honest reviews, interview experiences and insider insights.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Compensation Intelligence */}
            <div className="bg-white rounded-xl border border-[#EBEBEB] p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-[#F0FDF4] flex items-center justify-center text-[#16A34A] text-xs font-bold">₹</span>
                  <h3 className="font-bold text-[#111827] text-sm">Compensation Intelligence</h3>
                </div>
              </div>
              <p className="text-xs text-[#717171] mb-3">Explore real salary data and trends across roles, companies and cities.</p>
              <div className="flex items-end justify-between mb-3">
                <div>
                  <p className="text-xl font-bold text-[#111827]">{formatSalary(avgIndia, 'INR', 'INR')}</p>
                  <p className="text-xs text-[#16A34A] font-medium">↑ 12% vs last year</p>
                </div>
                <MiniSparkline points={[20, 24, 22, 28, 26, 32, 30, 36]} color="#16A34A" />
              </div>
              <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                {topPaying.slice(0, 5).map((c) => (
                  <Link key={c.slug} href={`/companies/${c.slug}`}>
                    <CompanyLogo name={c.name} size="sm" />
                  </Link>
                ))}
              </div>
              <Link href="/salaries" className="text-xs font-semibold text-[#16A34A] hover:underline">Explore salaries →</Link>
            </div>

            {/* Company Reviews & Culture */}
            <div className="bg-white rounded-xl border border-[#EBEBEB] p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-7 h-7 rounded-lg bg-[#FFFBEB] flex items-center justify-center text-[#F59E0B] text-xs font-bold">★</span>
                <h3 className="font-bold text-[#111827] text-sm">Company Reviews & Culture</h3>
              </div>
              <p className="text-xs text-[#717171] mb-3">Read honest reviews and discover what workplace culture really feels like.</p>
              <div className="flex items-center gap-4 mb-3">
                <div>
                  <p className="text-xl font-bold text-[#111827]">4.2 ★★★★☆</p>
                  <p className="text-xs text-[#9CA3AF]">Overall rating</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-[#111827]">72%</p>
                  <p className="text-xs text-[#9CA3AF]">Recommend to a friend</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 mb-3">
                {topPaying.slice(0, 4).map((c) => (
                  <Link key={c.slug} href={`/companies/${c.slug}`}>
                    <CompanyLogo name={c.name} size="sm" />
                  </Link>
                ))}
              </div>
              <Link href="/reviews" className="text-xs font-semibold text-[#F59E0B] hover:underline">Explore reviews →</Link>
            </div>

            {/* Interview Experiences */}
            <div className="bg-white rounded-xl border border-[#EBEBEB] p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-7 h-7 rounded-lg bg-[#F5F3FF] flex items-center justify-center text-[#8B5CF6] text-xs font-bold">?</span>
                <h3 className="font-bold text-[#111827] text-sm">Interview Experiences</h3>
              </div>
              <p className="text-xs text-[#717171] mb-3">Practice real interview questions shared by verified candidates.</p>
              <div className="flex items-end justify-between mb-3">
                <div className="flex flex-wrap gap-1.5">
                  {['System Design', 'SQL', 'Product Sense'].map((t) => (
                    <span key={t} className="px-2 py-0.5 bg-[#F5F3FF] text-[#8B5CF6] text-[10px] font-medium rounded-full">{t}</span>
                  ))}
                </div>
                <MiniSparkline points={[12, 18, 16, 22, 28, 24, 30, 34]} color="#8B5CF6" />
              </div>
              <Link href="/interviews" className="text-xs font-semibold text-[#8B5CF6] hover:underline">Explore interviews →</Link>
            </div>

            {/* Offers & Negotiation */}
            <div className="bg-white rounded-xl border border-[#EBEBEB] p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-7 h-7 rounded-lg bg-[#F0F9FF] flex items-center justify-center text-[#0EA5E9] text-xs font-bold">$</span>
                <h3 className="font-bold text-[#111827] text-sm">Offers & Negotiation</h3>
              </div>
              <p className="text-xs text-[#717171] mb-3">See real offers and learn negotiation strategies that work.</p>
              <div className="flex items-center gap-4 mb-3">
                <div>
                  <p className="text-xl font-bold text-[#111827]">{formatSalary(computeMedian(SALARY_RECORDS.filter(r=>r.currency==='INR').map(r=>r.total_compensation)), 'INR', 'INR')}</p>
                  <p className="text-xs text-[#9CA3AF]">Median offer · SDE-II</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-[#111827]">63%</p>
                  <p className="text-xs text-[#9CA3AF]">Negotiate successfully</p>
                </div>
              </div>
              <Link href="/offers" className="text-xs font-semibold text-[#0EA5E9] hover:underline">Explore offers →</Link>
            </div>

            {/* Community Discussions */}
            <div className="bg-white rounded-xl border border-[#EBEBEB] p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-7 h-7 rounded-lg bg-[#ECFDF5] flex items-center justify-center text-[#10B981] text-xs font-bold">@</span>
                <h3 className="font-bold text-[#111827] text-sm">Community Discussions</h3>
              </div>
              <p className="text-xs text-[#717171] mb-3">Join conversations, ask questions and learn from each other.</p>
              <div className="bg-[#F9FAFB] rounded-lg p-3 mb-3">
                <p className="text-xs font-medium text-[#111827]">&quot;How is the work-life balance at top-tier companies?&quot;</p>
                <p className="text-[10px] text-[#9CA3AF] mt-1">142 replies · 3h ago</p>
              </div>
              <Link href="/community" className="text-xs font-semibold text-[#10B981] hover:underline">Explore community →</Link>
            </div>

            {/* Top paying companies (filler tile to complete 2x3) */}
            <div className="bg-white rounded-xl border border-[#EBEBEB] p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-7 h-7 rounded-lg bg-[#FEF2F2] flex items-center justify-center text-[#EF4444] text-xs font-bold">↑</span>
                <h3 className="font-bold text-[#111827] text-sm">Top Paying Companies</h3>
              </div>
              <ul className="space-y-2">
                {topPaying.slice(0, 3).map((c) => (
                  <li key={c.slug} className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2 text-[#4B5563] font-medium">
                      <CompanyLogo name={c.name} size="sm" /> {c.name}
                    </span>
                    <span className="font-bold text-[#111827]">{formatSalary(c.median, c.currency, c.currency)}</span>
                  </li>
                ))}
              </ul>
              <Link href="/salaries" className="text-xs font-semibold text-[#EF4444] hover:underline mt-3 inline-block">View all companies →</Link>
            </div>
          </div>
        </section>

        {/* Top roles by median comp */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#111827]">Top Roles by Median Compensation</h2>
            <Link href="/salaries" className="text-sm font-medium text-[#16A34A] hover:underline">View all salaries →</Link>
          </div>
          <div className="bg-white rounded-xl border border-[#EBEBEB] overflow-hidden shadow-sm">
            {topRoles.map((r, i) => (
              <div
                key={r.role}
                className={`flex items-center justify-between px-6 py-4 ${i < topRoles.length - 1 ? 'border-b border-[#EBEBEB]' : ''} hover:bg-[#F9FAFB] transition-colors`}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <span className="text-lg font-bold text-[#E5E7EB] w-6 shrink-0">#{i + 1}</span>
                  <div className="min-w-0">
                    <p className="font-semibold text-[#111827] truncate">{r.role}</p>
                    <p className="text-sm text-[#717171] truncate">{r.count} records · India</p>
                  </div>
                </div>
                <p className="text-xl font-bold text-[#0369A1] shrink-0 ml-4">{formatSalary(r.median, 'INR', 'INR')}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Explore by category */}
        <section>
          <h2 className="text-2xl font-bold text-[#111827] mb-1">Explore by what matters to you</h2>
          <p className="text-sm text-[#717171] mb-6">Jump into the areas that are most important for your career journey.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {EXPLORE_CATEGORIES.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="bg-white rounded-xl border border-[#EBEBEB] p-4 hover:shadow-md transition-all"
              >
                <div className="w-9 h-9 rounded-lg mb-3 flex items-center justify-center" style={{ backgroundColor: `${cat.color}15` }}>
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                </div>
                <p className="text-sm font-semibold text-[#111827] mb-1">{cat.label}</p>
                <p className="text-xs text-[#717171] leading-snug">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Bottom trust bar */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#EBEBEB]">
          {[
            ['100% Anonymous', 'Your privacy is our priority'],
            ['Verified Submissions', 'Community-verified content'],
            ['Millions of Professionals', 'From 190+ countries'],
            ['Updated in Real-time', 'Always fresh, always relevant'],
          ].map(([title, sub]) => (
            <div key={title} className="text-center">
              <p className="text-sm font-semibold text-[#111827]">{title}</p>
              <p className="text-xs text-[#9CA3AF]">{sub}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
