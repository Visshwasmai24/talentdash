import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="bg-white border-b border-[#EBEBEB] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-[#FF5A5F] font-bold text-xl tracking-tight">Talent</span>
              <span className="text-[#222222] font-bold text-xl tracking-tight">Dash</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/salaries" className="text-[13px] font-medium text-[#484848] hover:text-[#222222] transition-colors">
                Salaries
              </Link>
              <Link href="/companies/google" className="text-[13px] font-medium text-[#484848] hover:text-[#222222] transition-colors">
                Companies
              </Link>
              <Link href="/compare" className="text-[13px] font-medium text-[#484848] hover:text-[#222222] transition-colors">
                Compare
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/salaries"
              className="hidden sm:inline-flex items-center px-4 py-1.5 text-[13px] font-medium text-white bg-[#FF5A5F] rounded-lg hover:bg-[#e5484d] transition-colors"
            >
              Add Salary
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
