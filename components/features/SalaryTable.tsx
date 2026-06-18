import Link from 'next/link';
import { SalaryRecord, Currency } from '@/types';
import LevelBadge from '@/components/ui/LevelBadge';
import { formatSalary, slugToName } from '@/lib/utils';

interface SalaryTableProps {
  records: SalaryRecord[];
  displayCurrency: Currency;
  showCompanyLink?: boolean;
}

export default function SalaryTable({ records, displayCurrency, showCompanyLink = true }: SalaryTableProps) {
  if (records.length === 0) return null;

  return (
    <div className="overflow-x-auto rounded-xl border border-[#EBEBEB] bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#EBEBEB] bg-[#F7F7F7]">
            {['Company','Role','Level','Location','Exp','Base','Stock','Total Comp'].map((h) => (
              <th key={h} className={`px-4 py-3 text-left text-xs font-semibold text-[#717171] uppercase tracking-wide whitespace-nowrap ${h === 'Total Comp' ? 'text-right' : ''}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {records.map((r, idx) => (
            <tr key={r.id} className={`border-b border-[#EBEBEB] hover:bg-[#F2F2F2] transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'}`}>
              <td className="px-4 py-3 max-w-[160px]">
                {showCompanyLink ? (
                  <Link href={`/companies/${r.company_slug}`} className="font-medium text-[#222222] hover:text-[#FF5A5F] transition-colors truncate block">
                    {slugToName(r.company_slug)}
                  </Link>
                ) : (
                  <span className="font-medium text-[#222222] truncate block">{slugToName(r.company_slug)}</span>
                )}
              </td>
              <td className="px-4 py-3 max-w-[180px]">
                <span className="text-[#484848] truncate block" title={r.role}>{r.role}</span>
              </td>
              <td className="px-4 py-3"><LevelBadge level={r.level_standardized} /></td>
              <td className="px-4 py-3 text-[#484848] whitespace-nowrap">{r.location}</td>
              <td className="px-4 py-3 text-[#484848] whitespace-nowrap">{r.experience_years} yr{r.experience_years !== 1 ? 's' : ''}</td>
              <td className="px-4 py-3 text-[#484848] whitespace-nowrap">{formatSalary(r.base_salary, r.currency, displayCurrency)}</td>
              <td className="px-4 py-3 text-[#484848] whitespace-nowrap">{r.stock > 0 ? formatSalary(r.stock, r.currency, displayCurrency) : '\u2014'}</td>
              <td className="px-4 py-3 text-right">
                <span className="text-[#0369A1] font-bold text-base whitespace-nowrap">
                  {formatSalary(r.total_compensation, r.currency, displayCurrency)}
                </span>
                {!r.is_verified && <span className="block text-[10px] text-[#717171] font-normal">unverified</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
