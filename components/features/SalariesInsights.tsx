import Link from 'next/link';
import { SALARY_RECORDS, COMPANY_META } from '@/lib/mock-data';
import { computeMedian, formatSalary } from '@/lib/utils';
import CompanyLogo from '@/components/ui/CompanyLogo';
import MiniSparkline from './MiniSparkline';

const HEATMAP_ROLES = ['Software Engineer', 'Product Manager', 'Data Scientist', 'Data Analyst'];
const HEATMAP_LOCATIONS = ['Bengaluru', 'Hyderabad', 'Mumbai', 'Pune', 'San Francisco'];

function heatColor(value: number, min: number, max: number): string {
  if (!value) return '#F3F4F6';
  const pct = max === min ? 0.5 : (value - min) / (max - min);
  if (pct > 0.75) return '#16A34A';
  if (pct > 0.5) return '#84CC16';
  if (pct > 0.25) return '#F59E0B';
  return '#FCA5A5';
}

export default function SalariesInsights() {
  const inrRecords = SALARY_RECORDS.filter((r) => r.currency === 'INR');

  const topPaying = Object.values(COMPANY_META)
    .map((c) => {
      const recs = SALARY_RECORDS.filter((r) => r.company_slug === c.slug);
      const median = computeMedian(recs.map((r) => r.total_compensation));
      const currency = recs[0]?.currency || 'INR';
      return { ...c, median, currency, count: recs.length };
    })
    .sort((a, b) => {
      const aN = a.currency === 'USD' ? a.median * 83.5 : a.median;
      const bN = b.currency === 'USD' ? b.median * 83.5 : b.median;
      return bN - aN;
    })
    .slice(0, 5);

  const roleSet = Array.from(new Set(SALARY_RECORDS.map((r) => r.role)));
  const topRoles = roleSet
    .map((role) => {
      const recs = SALARY_RECORDS.filter((r) => r.role === role && r.currency === 'INR');
      if (recs.length === 0) return null;
      return { role, median: computeMedian(recs.map((r) => r.total_compensation)), count: recs.length };
    })
    .filter((r): r is { role: string; median: number; count: number } => r !== null)
    .sort((a, b) => b.median - a.median)
    .slice(0, 5);

  // Heatmap matrix
  const heatmapData = HEATMAP_ROLES.map((role) =>
    HEATMAP_LOCATIONS.map((loc) => {
      const recs = SALARY_RECORDS.filter((r) => r.role === role && r.location === loc);
      return recs.length ? computeMedian(recs.map((r) => r.total_compensation)) : 0;
    })
  );
  const flatValues = heatmapData.flat().filter((v) => v > 0);
  const minVal = Math.min(...flatValues, 0);
  const maxVal = Math.max(...flatValues, 1);

  // Salary by experience buckets
  const expBuckets = [
    { label: '0-2 yrs', min: 0, max: 2 },
    { label: '3-5 yrs', min: 3, max: 5 },
    { label: '6-9 yrs', min: 6, max: 9 },
    { label: '10+ yrs', min: 10, max: 99 },
  ];
  const expData = expBuckets.map((b) => {
    const recs = inrRecords.filter((r) => r.experience_years >= b.min && r.experience_years <= b.max);
    return { ...b, median: recs.length ? computeMedian(recs.map((r) => r.total_compensation)) : 0, count: recs.length };
  });
  const maxExpMedian = Math.max(...expData.map((d) => d.median), 1);

  return (
    <div className="bg-white rounded-2xl border border-[#EBEBEB] p-6 mb-8 shadow-sm">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-8 h-8 rounded-lg bg-[#F0FDF4] flex items-center justify-center text-[#16A34A] font-bold text-sm">$</span>
        <h2 className="text-lg font-bold text-[#111827]">Real salary insights. Real career growth.</h2>
      </div>
      <p className="text-sm text-[#717171] mb-6">Explore verified compensation data from professionals around the world.</p>

      {/* Trust stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8 pb-6 border-b border-[#EBEBEB]">
        {[
          [`${SALARY_RECORDS.length}+`, 'Salary data points'],
          [`${Object.keys(COMPANY_META).length}+`, 'Companies'],
          [`${roleSet.length}+`, 'Job titles'],
          ['18%', 'YoY salary growth'],
          ['100%', 'Verified & anonymous'],
        ].map(([stat, label]) => (
          <div key={label}>
            <p className="text-xl font-bold text-[#111827]">{stat}</p>
            <p className="text-xs text-[#9CA3AF]">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Top paying companies */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-[#111827]">Top paying companies</h3>
            <Link href="/companies/google" className="text-xs font-semibold text-[#16A34A] hover:underline">View all companies →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {topPaying.map((c) => (
              <Link
                key={c.slug}
                href={`/companies/${c.slug}`}
                className="flex items-center gap-3 p-3 rounded-lg border border-[#EBEBEB] hover:border-[#16A34A] transition-colors"
              >
                <CompanyLogo name={c.name} size="md" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#111827] truncate">{c.name}</p>
                  <p className="text-xs text-[#9CA3AF]">{formatSalary(c.median, c.currency, c.currency)} avg.</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Salary heatmap by role & location */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-[#111827]">Salary heatmap by role & location</h3>
            <Link href="#" className="text-xs font-semibold text-[#16A34A] hover:underline">View full heatmap →</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-separate border-spacing-1">
              <thead>
                <tr>
                  <th className="text-left text-[10px] text-[#9CA3AF] font-medium pb-1"> </th>
                  {HEATMAP_LOCATIONS.map((loc) => (
                    <th key={loc} className="text-[10px] text-[#9CA3AF] font-medium pb-1 px-1">{loc.slice(0, 3)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {HEATMAP_ROLES.map((role, ri) => (
                  <tr key={role}>
                    <td className="text-[11px] font-medium text-[#4B5563] pr-2 whitespace-nowrap">{role.split(' ')[0]}</td>
                    {heatmapData[ri].map((val, ci) => (
                      <td key={ci} className="p-0">
                        <div
                          className="rounded-md h-9 flex items-center justify-center text-[10px] font-semibold text-white"
                          style={{ backgroundColor: heatColor(val, minVal, maxVal) }}
                          title={val ? formatSalary(val, 'INR', 'INR') : 'No data'}
                        >
                          {val ? formatSalary(val, 'INR', 'INR').replace('₹', '') : '—'}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center gap-1.5 mt-2 text-[10px] text-[#9CA3AF]">
              <span>Lowest</span>
              <span className="w-3 h-3 rounded-sm bg-[#FCA5A5]" />
              <span className="w-3 h-3 rounded-sm bg-[#F59E0B]" />
              <span className="w-3 h-3 rounded-sm bg-[#84CC16]" />
              <span className="w-3 h-3 rounded-sm bg-[#16A34A]" />
              <span>Highest</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top roles by median comp */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-[#111827]">Top roles by median compensation</h3>
          </div>
          <div className="space-y-3">
            {topRoles.map((r) => (
              <div key={r.role} className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-xs font-medium text-[#4B5563] truncate">{r.role}</p>
                  <MiniSparkline points={[10, 14, 12, 18, 16, 22, 20]} color="#16A34A" width={90} height={20} />
                </div>
                <p className="text-sm font-bold text-[#111827] shrink-0 ml-2">{formatSalary(r.median, 'INR', 'INR')}</p>
              </div>
            ))}
          </div>
          <Link href="/salaries" className="text-xs font-semibold text-[#16A34A] hover:underline mt-3 inline-block">View all roles & salary trends →</Link>
        </div>

        {/* Salary by experience */}
        <div>
          <h3 className="text-sm font-bold text-[#111827] mb-3">Salary by experience (all roles)</h3>
          <div className="space-y-2.5">
            {expData.map((d) => (
              <div key={d.label} className="flex items-center gap-3">
                <span className="text-xs text-[#717171] w-14 shrink-0">{d.label}</span>
                <div className="flex-1 h-2.5 bg-[#F3F4F6] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#8B5CF6] rounded-full"
                    style={{ width: `${Math.max(6, (d.median / maxExpMedian) * 100)}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-[#111827] w-16 text-right shrink-0">
                  {d.median ? formatSalary(d.median, 'INR', 'INR') : '—'}
                </span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-[#9CA3AF] mt-3">Professionals with 5+ years of experience earn 2.2x more than those just starting out.</p>
        </div>

        {/* Explore salaries by */}
        <div>
          <h3 className="text-sm font-bold text-[#111827] mb-3">Explore salaries by</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              ['Role', '/salaries'],
              ['Company', '/companies/google'],
              ['Location', '/salaries'],
              ['Experience', '/salaries'],
              ['Industry', '/salaries'],
              ['Compare', '/compare'],
            ].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="px-3 py-2 text-xs font-medium text-[#4B5563] border border-[#EBEBEB] rounded-lg hover:border-[#16A34A] hover:text-[#16A34A] transition-colors text-center"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
