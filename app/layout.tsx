import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { SITE_URL } from '@/lib/config';
import { Navbar } from '@/components/ui/Navbar';

export const metadata: Metadata = {
  title: 'TalentDash — Explore. Compare. Grow.',
  description: 'Explore salaries, read real reviews, prepare for interviews, and find the right opportunities — all in one place.',
  metadataBase: new URL(SITE_URL),
  openGraph: { siteName: 'TalentDash', type: 'website' },
};

const FOOTER_SECTIONS: { title: string; links: [string, string][] }[] = [
  {
    title: 'Explore',
    links: [
      ['Salaries', '/salaries'],
      ['Reviews', '/reviews'],
      ['Interviews', '/interviews'],
      ['Companies', '/companies/google'],
      ['Jobs', '/jobs'],
    ],
  },
  {
    title: 'Tools',
    links: [
      ['Salary Calculator', '/tools'],
      ['Hike Calculator', '/tools'],
      ['Equity Calculator', '/tools'],
      ['Offer Comparator', '/compare'],
      ['Resume Analyzer', '/tools'],
    ],
  },
  {
    title: 'Community',
    links: [
      ['Forum', '/community'],
      ['Trending Topics', '/community'],
      ['Workplace Index', '/workplace-index'],
      ['Contribute Data', '/contribute'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['Offers & Negotiation', '/offers'],
      ['Brands', '/workplace-index'],
      ['Log in', '/login'],
      ['Sign up', '/signup'],
    ],
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#F7F7F7] font-sans antialiased">
        <Navbar />

        {children}

        <footer className="border-t border-[#EBEBEB] bg-white mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
              {FOOTER_SECTIONS.map((section) => (
                <div key={section.title}>
                  <h3 className="text-xs font-semibold text-[#111827] uppercase tracking-wider mb-3">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.links.map(([label, href]) => (
                      <li key={label}>
                        <Link href={href} className="text-sm text-[#717171] hover:text-[#16A34A] transition-colors">
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="border-t border-[#EBEBEB] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 font-bold text-[#111827]">
                <span className="w-6 h-6 bg-[#FF5A5F] rounded-md flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white" fill="currentColor">
                    <path d="M12 2L2 12l10 10 10-10L12 2zm0 4.83L17.17 12 12 17.17 6.83 12 12 6.83z" />
                  </svg>
                </span>
                TalentDash
              </div>
              <p className="text-sm text-[#717171]">© 2026 TalentDash · Explore. Compare. Grow.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
