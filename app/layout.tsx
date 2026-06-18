import type { Metadata } from 'next';

import './globals.css';
import { SITE_URL } from '@/lib/config';
import Link from 'next/link';



export const metadata: Metadata = {
  title: 'TalentDash — Career Intelligence for India',
  description: 'Structured, comparable, decision-ready salary data. Verified compensation for software engineers, PMs, and data scientists across top Indian and global tech companies.',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    siteName: 'TalentDash',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href={SITE_URL} />
      </head>
      <body className="bg-[#F7F7F7] font-sans antialiased">
        <nav className="bg-white border-b border-[#EBEBEB] sticky top-0 z-30 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14">
              <Link href="/" className="flex items-center gap-2 font-bold text-[#222222] text-lg tracking-tight">
                <span className="text-[#FF5A5F]">Talent</span>Dash
              </Link>
              <div className="flex items-center gap-1">
                {[
                  { href: '/salaries', label: 'Salaries' },
                  { href: '/companies/google', label: 'Companies' },
                  { href: '/compare', label: 'Compare' },
                ].map(({ href, label }) => (
                  <Link key={href} href={href}
                    className="px-4 py-2 text-sm font-medium text-[#484848] rounded-lg hover:bg-[#F7F7F7] hover:text-[#222222] transition-colors">
                    {label}
                  </Link>
                ))}
                <Link href="/salaries"
                  className="ml-2 px-4 py-2 text-sm font-semibold bg-[#FF5A5F] text-white rounded-lg hover:bg-[#e05055] transition-colors">
                  Explore Data
                </Link>
              </div>
            </div>
          </div>
        </nav>
        {children}
        <footer className="border-t border-[#EBEBEB] bg-white mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-[#717171]">
            <p>© 2025 TalentDash · Career intelligence for India · Data updated regularly</p>
            <p className="mt-1 text-xs text-[#717171]">Salary data is crowdsourced and independently verified. All figures in annual gross.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
