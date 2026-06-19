'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SALARY_RECORDS } from '@/lib/mock-data';
import { SalaryRecord, Currency } from '@/types';
import { formatSalary, formatDelta, slugToName, convertAmount } from '@/lib/utils';
import LevelBadge from '@/components/ui/LevelBadge';

function CompareContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const c1 = searchParams.get('c1');
  const defaultS1 = searchParams.get('s1') || (c1 ? SALARY_RECORDS.find(r => r.company_slug === c1)?.id || '' : '');
  const [s1, setS1] = useState(defaultS1);
  const [s2, setS2] = useState(searchParams.get('s2') || '');
  const [currency, setCurrency] = useState<Currency>('INR');

  const rec1 = SALARY_RECORDS.find(r => r.id === s1);
  const rec2 = SALARY_RECORDS.find(r => r.id === s2);

  useEffect(() => {
    const params = new URLSearchParams();
    if (s1) params.set('s1', s1);
    if (s2) params.set('s2', s2);
    router.replace(`/compare?${params.toString()}`, { scroll: false });
  }, [s1, s2, router]);

  const delta = rec1 && rec2 ? {
    base: convertAmount(rec1.base_salary, rec1.currency, currency) - convertAmount(rec2.base_salary, rec2.currency, currency),
    bonus: convertAmount(rec1.bonus, rec1.currency, currency) - convertAmount(rec2.bonus, rec2.currency, currency),
    stock: convertAmount(rec1.stock, rec1.currency, currency) - convertAmount(rec2.stock, rec2.currency, currency),
    tc: convertAmount(rec1.total_compensation, rec1.currency, currency) - convertAmount(rec2.total_compensation, rec2.currency, currency),
    exp: rec1.experience_years - rec2.experience_years,
  } : null;

  const winner = delta ? (delta.tc > 0 ? 'left' : delta.tc < 0 ? 'right' : 'tie') : null;

  const rows: { label: string; key: keyof SalaryRecord; format?: (v: string & number, r: SalaryRecord) => string }[] = [
    { label: 'Company', key: 'company_slug', format: (v) => slugToName(v) },
    { label: 'Role', key: 'role' },
    { label: 'Location', key: 'location' },
    { label: 'Experience', key: 'experience_years', format: (v) => `${v} yrs` },
    { label: 'Base Salary', key: 'base_salary', format: (v, r) => formatSalary(v, r.currency, currency) },
    { label: 'Bonus', key: 'bonus', format: (v, r) => v > 0 ? formatSalary(v, r.currency, currency) : '—' },
    { label: 'Stock (RSU)', key: 'stock', format: (v, r) => v > 0 ? formatSalary(v, r.currency, currency) : '—' },
    { label: 'Total Comp', key: 'total_compensation', format: (v, r) => formatSalary(v, r.currency, currency) },
  ];

  const numericDeltas: Record<string, number | null> = delta ? {
    'Base Salary': delta.base, 'Bonus': delta.bonus, 'Stock (RSU)': delta.stock,
    'Total Comp': delta.tc, 'Experience': delta.exp,
  } : {};

  return (
    <main className="min-h-screen bg-[#F7F7F7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#222222] mb-1">Compare Offers</h1>
          <p className="text-[#717171]">Select two salary records to compare side-by-side</p>
        </div>

        {/* Currency toggle */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-sm font-medium text-[#717171]">Display in:</span>
          <div className="flex rounded-lg border border-[#EBEBEB] overflow-hidden">
            {(['INR','USD'] as Currency[]).map(c => (
              <button key={c} onClick={() => setCurrency(c)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${currency === c ? 'bg-[#00A67E] text-white' : 'bg-white text-[#484848] hover:bg-[#F2F2F2]'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {[{ id: s1, setId: setS1, label: 'Record A', side: 'left' }, { id: s2, setId: setS2, label: 'Record B', side: 'right' }].map(({ id, setId, label, side }) => (
            <div key={side} className="bg-white rounded-xl border border-[#EBEBEB] p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-[#484848] uppercase tracking-wide">{label}</h2>
                {winner === side && (
                  <span className="px-3 py-1 bg-[#0369A1] text-white text-xs font-semibold rounded-full">Higher TC</span>
                )}
              </div>
              <select value={id} onChange={e => setId(e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-[#EBEBEB] rounded-lg bg-[#F7F7F7] text-[#222222] focus:outline-none focus:border-[#FF5A5F] focus:bg-white transition-colors">
                <option value="">— Select a record —</option>
                {SALARY_RECORDS.map(r => (
                  <option key={r.id} value={r.id}>
                    {slugToName(r.company_slug)} · {r.role} · {r.level_standardized} · {r.location}
                  </option>
                ))}
              </select>
              {SALARY_RECORDS.find(r => r.id === id) && (() => {
                const rec = SALARY_RECORDS.find(r => r.id === id)!;
                return (
                  <div className="mt-3 pt-3 border-t border-[#EBEBEB]">
                    <div className="flex items-center gap-2 mb-2">
                      <LevelBadge level={rec.level_standardized} size="md" />
                      <span className="text-xs text-[#717171]">{rec.experience_years} yrs exp · {rec.location}</span>
                    </div>
                    <p className="text-2xl font-bold text-[#0369A1]">{formatSalary(rec.total_compensation, rec.currency, currency)}</p>
                    <p className="text-xs text-[#717171]">Total Compensation</p>
                  </div>
                );
              })()}
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        {rec1 && rec2 && (
          <div className="bg-white rounded-xl border border-[#EBEBEB] shadow-sm overflow-hidden">
            <div className="grid grid-cols-4 bg-[#F7F7F7] border-b border-[#EBEBEB]">
              {['Field', 'Record A', 'Difference', 'Record B'].map(h => (
                <div key={h} className="px-5 py-3 text-xs font-semibold text-[#717171] uppercase tracking-wide">{h}</div>
              ))}
            </div>
            {rows.map((row, i) => {
              const v1 = rec1[row.key] as string & number;
              const v2 = rec2[row.key] as string & number;
              const d = numericDeltas[row.label] ?? null;
              const fmt1 = row.format ? row.format(v1, rec1) : String(v1);
              const fmt2 = row.format ? row.format(v2, rec2) : String(v2);
              const isTC = row.label === 'Total Comp';

              return (
                <div key={row.key} className={`grid grid-cols-4 border-b border-[#EBEBEB] ${i % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'}`}>
                  <div className="px-5 py-3 text-sm font-medium text-[#717171]">{row.label}</div>
                  <div className={`px-5 py-3 text-sm font-medium ${isTC ? 'text-[#0369A1] font-bold text-base' : 'text-[#222222]'} ${winner === 'left' && isTC ? 'text-[#008A05]' : ''}`}>
                    {fmt1}
                  </div>
                  <div className="px-5 py-3 text-sm font-medium">
                    {d !== null ? (
                      <span className={`font-semibold ${d > 0 ? 'text-[#008A05]' : d < 0 ? 'text-[#D93025]' : 'text-[#717171]'}`}>
                        {d === 0 ? '—' : formatDelta(d, currency)}
                      </span>
                    ) : '—'}
                  </div>
                  <div className={`px-5 py-3 text-sm font-medium ${isTC ? 'text-[#0369A1] font-bold text-base' : 'text-[#222222]'} ${winner === 'right' && isTC ? 'text-[#008A05]' : ''}`}>
                    {fmt2}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {(!rec1 || !rec2) && (
          <div className="bg-white rounded-xl border border-[#EBEBEB] p-16 text-center shadow-sm">
            <p className="text-[#484848] text-lg font-medium mb-2">Select two records above to compare</p>
            <p className="text-[#717171]">The delta column shows the difference between Record A and Record B</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default function ComparePage() {
  return <Suspense><CompareContent /></Suspense>;
}
