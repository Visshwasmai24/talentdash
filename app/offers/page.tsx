import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Offers & Negotiation | TalentDash',
  description: 'Decode your offer and know your worth with AI-powered insights. Coming soon.',
  alternates: { canonical: `${SITE_URL}/offers` },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#F7F7F7] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center" style={{ backgroundColor: '#0EA5E915' }}>
          <span className="w-4 h-4 rounded-full" style={{ backgroundColor: '#0EA5E9' }} />
        </div>
        <h1 className="text-2xl font-bold text-[#1a1a1a] mb-2">Offers & Negotiation</h1>
        <p className="text-[#717171] mb-6">Decode your offer and know your worth with AI-powered insights. Coming soon.</p>
        <Link href="/salaries" className="inline-flex px-6 py-3 bg-[#00A67E] text-white font-semibold rounded-xl hover:bg-[#008f6c] transition-colors">
          Explore Salaries Instead
        </Link>
      </div>
    </main>
  );
}
