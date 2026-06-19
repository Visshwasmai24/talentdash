import { Metadata } from 'next';
import { SITE_URL } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Compare Tech Salaries Side-by-Side | TalentDash',
  description: 'Compare two verified salary records side-by-side — base, bonus, stock, and total compensation deltas across top tech companies.',
  alternates: { canonical: `${SITE_URL}/compare` },
  openGraph: {
    title: 'Compare Tech Salaries | TalentDash',
    description: 'Side-by-side compensation comparison tool for tech salaries in India and globally.',
    url: `${SITE_URL}/compare`,
  },
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return children;
}
