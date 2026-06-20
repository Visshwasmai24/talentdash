import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/config';
import { COMPANY_META } from '@/lib/mock-data';
import CompanyLogo from '@/components/ui/CompanyLogo';

export const metadata: Metadata = {
  title: 'Interview Questions & Experiences | TalentDash',
  description: 'Real interview questions from real candidates, shared by verified professionals.',
  alternates: { canonical: `${SITE_URL}/interviews` },
};

const RECENT_QUESTIONS = [
  { slug: 'google', role: 'Software Engineer', q: 'Given a binary tree, serialize and deserialize it. How would you design the serialization method?', tags: ['Algorithms', 'Binary Tree', 'Design'], difficulty: 'Easy', answers: 128, time: '2h ago' },
  { slug: 'microsoft', role: 'Product Manager', q: 'How would you improve customer retention for Microsoft 365? Walk me through your approach.', tags: ['Product Sense', 'Metrics', 'Strategy'], difficulty: 'Medium', answers: 96, time: '3h ago' },
  { slug: 'amazon', role: 'SDE-II', q: 'Design a rate limiter. How would you handle distributed systems and ensure scalability?', tags: ['System Design', 'Scalability'], difficulty: 'Hard', answers: 64, time: '4h ago' },
  { slug: 'nvidia', role: 'Data Analyst', q: 'How would you analyze App Store performance and suggest data-driven improvements?', tags: ['SQL', 'Analytics', 'Data Visualization'], difficulty: 'Medium', answers: 52, time: '5h ago' },
  { slug: 'meta', role: 'Product Designer', q: 'Redesign the Facebook Events creation flow to improve user engagement. What would you do?', tags: ['Product Design', 'UX', 'User Research'], difficulty: 'Medium', answers: 41, time: '6h ago' },
];

const ROLES_BY_POPULARITY = [
  { role: 'Software Engineer', count: '12.4K', latest: 'Implement LRU Cache in O(1) time complexity', trend: '+18%', companies: ['google', 'amazon', 'meta'] },
  { role: 'Product Manager', count: '8.7K', latest: 'How would you launch a new payments feature?', trend: '+14%', companies: ['amazon', 'google', 'microsoft'] },
  { role: 'Data Analyst', count: '6.3K', latest: 'Analyze sales performance and identify trends', trend: '+22%', companies: ['amazon', 'microsoft', 'google'] },
  { role: 'Product Designer', count: '4.1K', latest: 'Improve the checkout flow for better conversion', trend: '+16%', companies: ['google', 'meta'] },
];

const TRENDING_TOPICS = [
  ['System Design', '2.4K questions'],
  ['Algorithms', '1.9K questions'],
  ['SQL', '1.6K questions'],
  ['Behavioral', '1.5K questions'],
  ['Product Sense', '1.2K questions'],
  ['Data Structures', '987 questions'],
  ['API Design', '876 questions'],
  ['Case Studies', '745 questions'],
  ['Machine Learning', '454 questions'],
];

const difficultyColor: Record<string, string> = {
  Easy: 'text-[#16A34A]',
  Medium: 'text-[#F59E0B]',
  Hard: 'text-[#DC2626]',
};

export default function InterviewsPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl border border-[#EBEBEB] p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#F5F3FF] flex items-center justify-center text-[#8B5CF6] font-bold text-sm">?</span>
              <h1 className="text-lg font-bold text-[#111827]">Real interview questions from real candidates</h1>
            </div>
          </div>
          <p className="text-sm text-[#717171] mb-6">Recent interview experiences shared by verified professionals.</p>

          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-[#111827]">Recent questions asked</h2>
            <Link href="#" className="text-xs font-semibold text-[#8B5CF6] hover:underline">View all →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-2">
            {RECENT_QUESTIONS.map((item, i) => {
              const meta = COMPANY_META[item.slug];
              return (
                <div key={i} className="p-4 rounded-lg border border-[#EBEBEB] flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <CompanyLogo name={meta.name} size="sm" />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#111827] truncate">{meta.name}</p>
                      <p className="text-[10px] text-[#9CA3AF]">{item.role} · {item.time}</p>
                    </div>
                  </div>
                  <p className="text-xs text-[#4B5563] mb-3 flex-1">{item.q}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 bg-[#F5F3FF] text-[#8B5CF6] text-[10px] font-medium rounded-full">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className={`font-semibold ${difficultyColor[item.difficulty]}`}>{item.difficulty}</span>
                    <span className="text-[#9CA3AF]">{item.answers} answers</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Browse by role */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-[#EBEBEB] p-6 shadow-sm">
            <h2 className="text-sm font-bold text-[#111827] mb-1">Browse questions by role</h2>
            <p className="text-xs text-[#9CA3AF] mb-4">Popular roles across engineering, product, data, design, sales and operations.</p>
            <div className="space-y-3">
              {ROLES_BY_POPULARITY.map((r) => (
                <div key={r.role} className="flex items-center justify-between p-3 rounded-lg border border-[#EBEBEB]">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-[#111827]">{r.role}</p>
                      <span className="text-xs text-[#9CA3AF]">{r.count} questions</span>
                    </div>
                    <p className="text-xs text-[#717171] truncate">Latest: {r.latest}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-3">
                    <div className="flex items-center -space-x-1.5">
                      {r.companies.map((slug) => (
                        <CompanyLogo key={slug} name={COMPANY_META[slug].name} size="sm" />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-[#16A34A]">{r.trend}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link href="#" className="text-xs font-semibold text-[#8B5CF6] hover:underline mt-4 inline-block">View all roles and questions →</Link>
          </div>

          {/* Trending topics + share */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-[#EBEBEB] p-6 shadow-sm">
              <h2 className="text-sm font-bold text-[#111827] mb-3">Trending interview topics</h2>
              <div className="grid grid-cols-1 gap-2">
                {TRENDING_TOPICS.map(([topic, count]) => (
                  <div key={topic} className="flex items-center justify-between text-xs">
                    <span className="font-medium text-[#4B5563]">{topic}</span>
                    <span className="text-[#9CA3AF]">{count}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-[#EBEBEB] p-6 shadow-sm">
              <h2 className="text-sm font-bold text-[#111827] mb-2">Share your interview experience</h2>
              <p className="text-xs text-[#717171] mb-4">Help other professionals by sharing the questions you were asked in your interview.</p>
              <Link href="/contribute" className="inline-flex px-4 py-2 bg-[#8B5CF6] text-white text-xs font-semibold rounded-lg hover:bg-[#7C3AED] transition-colors">
                Submit interview questions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
