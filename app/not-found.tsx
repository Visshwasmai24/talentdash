import Link from 'next/link';
export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F7F7F7] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#EBEBEB] mb-4">404</h1>
        <h2 className="text-2xl font-bold text-[#222222] mb-2">Page not found</h2>
        <p className="text-[#717171] mb-6">The company or page you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/salaries" className="px-6 py-3 bg-[#16A34A] text-white font-semibold rounded-xl hover:bg-[#15803D] transition-colors">
          Browse Salaries
        </Link>
      </div>
    </main>
  );
}
