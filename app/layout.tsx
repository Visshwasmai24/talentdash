import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { SITE_URL } from '@/lib/config';

export const metadata: Metadata = {
  title: 'TalentDash — Salary data you can act on.',
  description: 'Discover real salary insights, read reviews, prepare for interviews, and find the right opportunities — all in one place.',
  metadataBase: new URL(SITE_URL),
  openGraph: { siteName: 'TalentDash', type: 'website' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#F7F7F7] font-sans antialiased">
        {/* Top navbar */}
        <header className="bg-white border-b border-[#EBEBEB] sticky top-0 z-40">
          {/* Main nav row */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 font-bold text-[#1a1a1a] text-lg tracking-tight shrink-0">
                <span className="w-7 h-7 bg-[#00A67E] rounded-lg flex items-center justify-center text-white text-sm font-bold">D</span>
                <span>TalentDash</span>
              </Link>

              {/* Center nav links */}
              <nav className="hidden md:flex items-center gap-1">
                {[
                  { href: '/salaries', label: 'Salaries' },
                  { href: '/compare', label: 'Compare' },
                  { href: '/reviews', label: 'Reviews' },
                  { href: '/interviews', label: 'Interviews' },
                  { href: '/companies/google', label: 'Companies' },
                  { href: '/jobs', label: 'Jobs' },
                  { href: '/community', label: 'Forum' },
                  { href: '/offers', label: 'Offers' },
                  { href: '/tools', label: 'Tools' },
                ].map(({ href, label }) => (
                  <Link key={href} href={href}
                    className="px-3 py-1.5 text-sm font-medium text-[#484848] rounded-lg hover:bg-[#F7F7F7] hover:text-[#1a1a1a] transition-colors whitespace-nowrap">
                    {label}
                  </Link>
                ))}
              </nav>

              {/* Right actions */}
              <div className="flex items-center gap-2 shrink-0">
                <Link href="/contribute" className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-[#484848] hover:text-[#1a1a1a] transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                  Contribute
                </Link>
                <Link href="/login" className="px-3 py-1.5 text-sm font-medium text-[#484848] hover:text-[#1a1a1a] transition-colors">Log in</Link>
                <Link href="/signup" className="px-4 py-1.5 text-sm font-semibold bg-[#00A67E] text-white rounded-lg hover:bg-[#008f6c] transition-colors">Sign up</Link>
              </div>
            </div>
          </div>
        </header>

        {children}

        <footer className="border-t border-[#EBEBEB] bg-white mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              {[
                { title: 'Explore', links: [['Salaries', '/salaries'], ['Reviews', '/reviews'], ['Interviews', '/interviews'], ['Companies', '/companies/google']] },
                { title: 'Tools', links: [['Salary Calculator', '/tools'], ['Hike Calculator', '/tools'], ['Equity Calculator', '/tools'], ['Compare Offers', '/compare']] },
                { title: 'Community', links: [['Forum', '/community'], ['Trending Topics', '/community'], ['Contribute Data', '/contribute']] },
                { title: 'Company', links: [['About', '/about'], ['Blog', '/blog'], ['Careers', '/careers'], ['Privacy', '/privacy']] },
              ].map(section => (
                <div key={section.title}>
                  <h3 className="text-xs font-semibold text-[#222222] uppercase tracking-wider mb-3">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.links.map(([label, href]) => (
                      <li key={label}><Link href={href} className="text-sm text-[#717171] hover:text-[#00A67E] transition-colors">{label}</Link></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="border-t border-[#EBEBEB] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 font-bold text-[#1a1a1a]">
                <span className="w-6 h-6 bg-[#00A67E] rounded-md flex items-center justify-center text-white text-xs font-bold">D</span>
                TalentDash
              </div>
              <p className="text-sm text-[#717171]">© 2025 TalentDash · Career intelligence platform · 100% Anonymous · 100% Free</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
