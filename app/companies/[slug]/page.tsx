import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { COMPANY_META, getAllSlugs, getRecordsBySlug } from '@/lib/mock-data';
import { SITE_URL } from '@/lib/config';
import { computeMedian, computeLevelDistribution, formatSalary } from '@/lib/utils';
import LevelBadge from '@/components/ui/LevelBadge';
import SalaryTable from '@/components/features/SalaryTable';

interface PageProps { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const meta = COMPANY_META[slug];
  if (!meta) return {};
  return {
    title: `${meta.name} Salaries & Reviews — ${meta.industry} | TalentDash`,
    description: `Verified salary data, level distribution and compensation insights for ${meta.name}. Browse ${getRecordsBySlug(slug).length} records.`,
    alternates: { canonical: `${SITE_URL}/companies/${slug}` },
    openGraph: { title: `${meta.name} Salaries | TalentDash`, url: `${SITE_URL}/companies/${slug}` },
  };
}

const LEVEL_BAR_COLORS: Record<string, string> = {
  L3: 'bg-slate-400', 'SDE-I': 'bg-slate-400', IC4: 'bg-slate-400',
  L4: 'bg-blue-500', 'SDE-II': 'bg-blue-500',
  L5: 'bg-indigo-500', 'SDE-III': 'bg-indigo-500', IC5: 'bg-indigo-500',
  L6: 'bg-purple-500', Staff: 'bg-purple-500',
  Principal: 'bg-[#1e3a5f]',
};

export default async function CompanyPage({ params }: PageProps) {
  const { slug } = await params;
  const meta = COMPANY_META[slug];
  if (!meta) notFound();

  const records = getRecordsBySlug(slug).sort((a, b) => b.total_compensation - a.total_compensation);
  const medianTC = computeMedian(records.map(r => r.total_compensation));
  const dist = computeLevelDistribution(records);
  const total = records.length;
  const minTC = records.length ? records[records.length - 1].total_compensation : 0;
  const maxTC = records.length ? records[0].total_compensation : 0;
  const primaryCurrency = records[0]?.currency || 'INR';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: meta.name,
    url: `${SITE_URL}/companies/${slug}`,
    foundingDate: meta.founded_year?.toString(),
    numberOfEmployees: { '@type': 'QuantitativeValue', description: meta.headcount_range },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-[#717171] mb-6">
            <Link href="/salaries" className="hover:text-[#FF5A5F] transition-colors">Salaries</Link>
            <span>/</span>
            <Link href="/salaries" className="hover:text-[#FF5A5F] transition-colors">Companies</Link>
            <span>/</span>
            <span className="text-[#222222] font-medium">{meta.name}</span>
          </div>

          {/* Company Header */}
          <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 mb-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-[#222222] mb-2">{meta.name}</h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-[#717171]">
                  <span className="bg-[#F7F7F7] border border-[#EBEBEB] rounded-full px-3 py-1 font-medium text-[#484848]">{meta.industry}</span>
                  {meta.founded_year && <span>Founded {meta.founded_year}</span>}
                  <span>{meta.headcount_range} employees</span>
                  <span>{meta.headquarters}</span>
                </div>
              </div>
              <Link href={`/compare?c1=${slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF5A5F] text-white text-sm font-semibold rounded-lg hover:bg-[#e05055] transition-colors whitespace-nowrap self-start">
                Compare
              </Link>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Median Total Comp', value: formatSalary(medianTC, primaryCurrency, primaryCurrency), accent: true },
              { label: 'Min TC', value: formatSalary(minTC, primaryCurrency, primaryCurrency) },
              { label: 'Max TC', value: formatSalary(maxTC, primaryCurrency, primaryCurrency) },
              { label: 'Records', value: String(total) },
            ].map(s => (
              <div key={s.label} className={`bg-white rounded-xl border p-5 shadow-sm ${s.accent ? 'border-[#FF5A5F]/30' : 'border-[#EBEBEB]'}`}>
                <p className="text-xs font-medium text-[#717171] uppercase tracking-wide mb-1">{s.label}</p>
                <p className={`text-2xl font-bold ${s.accent ? 'text-[#FF5A5F]' : 'text-[#222222]'}`}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Level Distribution */}
          {total > 0 && (
            <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 mb-6 shadow-sm">
              <h2 className="text-lg font-semibold text-[#222222] mb-4">Level Distribution</h2>
              <div className="flex rounded-full overflow-hidden h-4 mb-3">
                {Object.entries(dist).map(([level, count]) => (
                  <div
                    key={level}
                    className={`${LEVEL_BAR_COLORS[level] || 'bg-gray-400'} transition-all`}
                    style={{ width: `${(count / total) * 100}%` }}
                    title={`${level}: ${count} records (${Math.round((count / total) * 100)}%)`}
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                {Object.entries(dist).map(([level, count]) => (
                  <div key={level} className="flex items-center gap-1.5">
                    <LevelBadge level={level as import('@/types').Level} size="sm" />
                    <span className="text-xs text-[#717171]">{count} ({Math.round((count / total) * 100)}%)</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Salary Table */}
          <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[#222222] mb-4">All Salary Records ({total})</h2>
            {records.length > 0 ? (
              <SalaryTable records={records} displayCurrency={primaryCurrency} showCompanyLink={false} />
            ) : (
              <p className="text-[#717171] text-center py-8">No salary records available yet.</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
