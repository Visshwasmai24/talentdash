import Link from 'next/link';

const NAV_LINKS = [
  { href: '/companies/google', label: 'Companies' },
  { href: '/salaries', label: 'Salaries' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/interviews', label: 'Interviews' },
  { href: '/jobs', label: 'Jobs' },
  { href: '/community', label: 'Forum' },
  { href: '/offers', label: 'Offers' },
  { href: '/tools', label: 'Tools' },
  { href: '/workplace-index', label: 'Brands' },
];

export function Navbar() {
  return (
    <nav className="bg-white border-b border-[#EBEBEB] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <span className="w-7 h-7 bg-[#FF5A5F] rounded-md flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
                  <path d="M12 2L2 12l10 10 10-10L12 2zm0 4.83L17.17 12 12 17.17 6.83 12 12 6.83z" />
                </svg>
              </span>
              <span className="font-bold text-lg tracking-tight text-[#111827]">TalentDash</span>
            </Link>
            <div className="hidden lg:flex items-center gap-6">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-[14px] font-medium text-[#4B5563] hover:text-[#111827] transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/contribute"
              className="hidden md:inline-flex items-center gap-1.5 text-[14px] font-medium text-[#4B5563] hover:text-[#111827] transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 10-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
              Contribute
            </Link>
            <Link
              href="/contribute"
              className="hidden md:inline-flex items-center gap-1.5 text-[14px] font-medium text-[#4B5563] hover:text-[#111827] transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7h-4V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2H4a1 1 0 00-1 1v11a1 1 0 001 1h16a1 1 0 001-1V8a1 1 0 00-1-1zM10 5h4v2h-4z" />
              </svg>
              Employer
            </Link>
            <Link
              href="/login"
              className="hidden sm:inline-flex items-center gap-1.5 text-[14px] font-medium text-[#4B5563] hover:text-[#111827] transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h11m-4 5v1a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h6a2 2 0 012 2v1" />
              </svg>
              Log in
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center px-4 py-2 text-[14px] font-semibold text-white bg-[#FF5A5F] rounded-lg hover:bg-[#e0484d] transition-colors"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
