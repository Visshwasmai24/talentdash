import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Log in | TalentDash',
  description: 'Log in to your TalentDash account.',
  alternates: { canonical: `${SITE_URL}/login` },
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F7] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border border-[#EBEBEB] shadow-sm p-8 max-w-sm w-full text-center">
        <span className="w-12 h-12 bg-[#16A34A] rounded-xl inline-flex items-center justify-center mb-4">
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor"><path d="M12 2L2 12l10 10 10-10L12 2zm0 4.83L17.17 12 12 17.17 6.83 12 12 6.83z" /></svg>
        </span>
        <h1 className="text-xl font-bold text-[#111827] mb-1">Welcome back</h1>
        <p className="text-sm text-[#717171] mb-6">Log in to access your saved salaries, reviews, and comparisons.</p>
        <input type="email" placeholder="Email address" className="w-full px-4 py-2.5 border border-[#EBEBEB] rounded-lg text-sm mb-3" disabled />
        <input type="password" placeholder="Password" className="w-full px-4 py-2.5 border border-[#EBEBEB] rounded-lg text-sm mb-4" disabled />
        <button className="w-full px-4 py-2.5 bg-[#16A34A] text-white text-sm font-semibold rounded-lg opacity-60 cursor-not-allowed" disabled>
          Log in
        </button>
        <p className="text-xs text-[#9CA3AF] mt-4">Authentication isn&apos;t wired up yet. <Link href="/" className="text-[#16A34A] font-medium hover:underline">Back to home</Link></p>
      </div>
    </main>
  );
}
