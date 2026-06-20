import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Tools | TalentDash',
  description: 'Salary calculator, hike calculator, equity calculator, and offer comparison.',
  alternates: { canonical: `${SITE_URL}/tools` },
};

const TOOLS = [
  { title: 'Salary Calculator', desc: 'Calculate your in-hand salary & deductions', used: '120K+ used', href: '/salaries', color: '#16A34A' },
  { title: 'Salary Hike Calculator', desc: 'Plan your next hike with confidence', used: '95K+ used', href: '/salaries', color: '#0EA5E9' },
  { title: 'Equity Calculator', desc: 'Calculate RSU/ESOP value & future worth', used: '80K+ used', href: '/salaries', color: '#8B5CF6' },
  { title: 'Offer Comparator', desc: 'Compare multiple offers side by side', used: '65K+ used', href: '/compare', color: '#F59E0B' },
  { title: 'Resume Analyzer', desc: 'Get AI feedback to improve your resume', used: '110K+ used', href: '/contribute', color: '#EC4899' },
  { title: 'Tax Calculator', desc: 'Estimate your taxes & take-home pay', used: '90K+ used', href: '/salaries', color: '#10B981' },
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl border border-[#EBEBEB] p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-8 h-8 rounded-lg bg-[#EEF2FF] flex items-center justify-center text-[#6366F1] font-bold text-sm">✦</span>
            <h1 className="text-lg font-bold text-[#111827]">Powerful tools. Smarter career moves.</h1>
          </div>
          <p className="text-sm text-[#717171] mb-6">Accurate calculators and analyzers to help you plan, grow and negotiate better.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOOLS.map((tool) => (
              <Link
                key={tool.title}
                href={tool.href}
                className="p-4 rounded-lg border border-[#EBEBEB] hover:shadow-md transition-all"
              >
                <div className="w-9 h-9 rounded-lg mb-3 flex items-center justify-center" style={{ backgroundColor: `${tool.color}15` }}>
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: tool.color }} />
                </div>
                <p className="text-sm font-semibold text-[#111827] mb-1">{tool.title}</p>
                <p className="text-xs text-[#717171] mb-3">{tool.desc}</p>
                <p className="text-[10px] text-[#9CA3AF] mb-2">{tool.used}</p>
                <span className="text-xs font-semibold" style={{ color: tool.color }}>Calculate now →</span>
              </Link>
            ))}
          </div>

          <p className="text-xs text-[#9CA3AF] mt-6 pt-6 border-t border-[#EBEBEB] text-center">
            All tools are 100% free, secure and based on verified professional data.
          </p>
        </div>
      </div>
    </main>
  );
}
