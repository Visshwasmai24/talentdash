import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Contribute Your Data | TalentDash',
  description: 'Help thousands of professionals by sharing your salary anonymously. Coming soon.',
  alternates: { canonical: `${SITE_URL}/contribute` },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#F7F7F7] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center" style={{ backgroundColor: '#FF5A5F15' }}>
          <span className="w-4 h-4 rounded-full" style={{ backgroundColor: '#FF5A5F' }} />
        </div>
        <h1 className="text-2xl font-bold text-[#1a1a1a] mb-2">Contribute Your Data</h1>
        <p className="text-[#717171] mb-6">Help thousands of professionals by sharing your salary anonymously. Coming soon.</p>
        <Link href="/salaries" className="inline-flex px-6 py-3 bg-[#FF5A5F] text-white font-semibold rounded-xl hover:bg-[#e0484d] transition-colors">
          Explore Salaries Instead
        </Link>
      </div>
    </main>
  );
}
