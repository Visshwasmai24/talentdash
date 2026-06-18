'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useTransition, useState, useEffect, useRef } from 'react';
import { Currency, Level } from '@/types';

const LEVELS: Level[] = ['L3', 'L4', 'L5', 'L6', 'SDE-I', 'SDE-II', 'SDE-III', 'Staff', 'Principal', 'IC4', 'IC5'];
const LOCATIONS = ['Bengaluru', 'Mumbai', 'Hyderabad', 'Pune', 'Delhi', 'San Francisco', 'London', 'Remote'];
const ROLES = ['Software Engineer', 'Software Development Engineer', 'Data Scientist', 'Product Manager', 'Data Analyst', 'ML Engineer', 'Staff Engineer', 'Principal Engineer'];

interface FilterBarProps {
  initialCompany?: string;
  initialRole?: string;
  initialLevels?: string[];
  initialLocation?: string;
  initialCurrency?: Currency;
  initialSort?: string;
}

export default function FilterBar({ initialCompany='', initialRole='', initialLevels=[], initialLocation='', initialCurrency='INR', initialSort='total_comp_desc' }: FilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [company, setCompany] = useState(initialCompany);
  const [role, setRole] = useState(initialRole);
  const [selectedLevels, setSelectedLevels] = useState<string[]>(initialLevels);
  const [location, setLocation] = useState(initialLocation);
  const [currency, setCurrency] = useState<Currency>(initialCurrency);
  const [sort, setSort] = useState(initialSort);
  const [levelOpen, setLevelOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const levelRef = useRef<HTMLDivElement>(null);

  const pushParams = useCallback((overrides: Record<string, string | string[]>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('page');
    Object.entries(overrides).forEach(([key, val]) => {
      params.delete(key);
      if (Array.isArray(val)) { val.forEach(v => params.append(key, v)); }
      else if (val) { params.set(key, val); }
    });
    startTransition(() => router.push(`${pathname}?${params.toString()}`));
  }, [pathname, router, searchParams]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => pushParams({ company }), 300);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (levelRef.current && !levelRef.current.contains(e.target as Node)) setLevelOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggleLevel = (level: string) => {
    const next = selectedLevels.includes(level) ? selectedLevels.filter(l => l !== level) : [...selectedLevels, level];
    setSelectedLevels(next);
    pushParams({ level: next });
  };

  const clearAll = () => {
    setCompany(''); setRole(''); setSelectedLevels([]); setLocation(''); setCurrency('INR'); setSort('total_comp_desc');
    router.push(pathname);
  };

  const hasFilters = company || role || selectedLevels.length > 0 || location || currency !== 'INR';

  return (
    <div className="bg-white border border-[#EBEBEB] rounded-xl p-4 mb-6 shadow-sm">
      <div className="flex flex-wrap gap-3 items-end">
        <div className="flex flex-col gap-1 min-w-[180px]">
          <label className="text-xs font-medium text-[#717171] uppercase tracking-wide">Company</label>
          <input type="text" value={company} onChange={e => setCompany(e.target.value)} placeholder="Search company..."
            className="px-3 py-2 text-sm border border-[#EBEBEB] rounded-lg bg-[#F7F7F7] text-[#222222] placeholder-[#717171] focus:outline-none focus:border-[#FF5A5F] focus:bg-white transition-colors" />
        </div>
        <div className="flex flex-col gap-1 min-w-[180px]">
          <label className="text-xs font-medium text-[#717171] uppercase tracking-wide">Role</label>
          <select value={role} onChange={e => { setRole(e.target.value); pushParams({ role: e.target.value }); }}
            className="px-3 py-2 text-sm border border-[#EBEBEB] rounded-lg bg-[#F7F7F7] text-[#222222] focus:outline-none focus:border-[#FF5A5F] focus:bg-white transition-colors">
            <option value="">All Roles</option>
            {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1 min-w-[160px] relative" ref={levelRef}>
          <label className="text-xs font-medium text-[#717171] uppercase tracking-wide">Level</label>
          <button onClick={() => setLevelOpen(o => !o)}
            className="px-3 py-2 text-sm border border-[#EBEBEB] rounded-lg bg-[#F7F7F7] text-left text-[#222222] focus:outline-none focus:border-[#FF5A5F] focus:bg-white transition-colors flex justify-between items-center">
            <span className="truncate">{selectedLevels.length ? selectedLevels.join(', ') : 'All Levels'}</span>
            <span className="text-[#717171] ml-1">&#9662;</span>
          </button>
          {levelOpen && (
            <div className="absolute top-full mt-1 z-20 bg-white border border-[#EBEBEB] rounded-xl shadow-lg p-3 min-w-[200px] grid grid-cols-2 gap-1">
              {LEVELS.map(l => (
                <label key={l} className="flex items-center gap-2 text-sm text-[#484848] cursor-pointer hover:text-[#222222] py-1">
                  <input type="checkbox" checked={selectedLevels.includes(l)} onChange={() => toggleLevel(l)} className="accent-[#FF5A5F]" />
                  {l}
                </label>
              ))}
              <button onClick={() => { setSelectedLevels([]); pushParams({ level: [] }); setLevelOpen(false); }}
                className="col-span-2 mt-1 text-xs text-[#FF5A5F] font-medium text-center py-1 hover:underline">Clear levels</button>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1 min-w-[150px]">
          <label className="text-xs font-medium text-[#717171] uppercase tracking-wide">Location</label>
          <select value={location} onChange={e => { setLocation(e.target.value); pushParams({ location: e.target.value }); }}
            className="px-3 py-2 text-sm border border-[#EBEBEB] rounded-lg bg-[#F7F7F7] text-[#222222] focus:outline-none focus:border-[#FF5A5F] focus:bg-white transition-colors">
            <option value="">All Locations</option>
            {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-[#717171] uppercase tracking-wide">Currency</label>
          <div className="flex rounded-lg border border-[#EBEBEB] overflow-hidden">
            {(['INR', 'USD'] as Currency[]).map(c => (
              <button key={c} onClick={() => { setCurrency(c); pushParams({ currency: c }); }}
                className={`px-4 py-2 text-sm font-medium transition-colors ${currency === c ? 'bg-[#FF5A5F] text-white' : 'bg-[#F7F7F7] text-[#484848] hover:bg-[#F2F2F2]'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1 min-w-[160px]">
          <label className="text-xs font-medium text-[#717171] uppercase tracking-wide">Sort By</label>
          <select value={sort} onChange={e => { setSort(e.target.value); pushParams({ sort: e.target.value }); }}
            className="px-3 py-2 text-sm border border-[#EBEBEB] rounded-lg bg-[#F7F7F7] text-[#222222] focus:outline-none focus:border-[#FF5A5F] focus:bg-white transition-colors">
            <option value="total_comp_desc">Total Comp ↓</option>
            <option value="total_comp_asc">Total Comp ↑</option>
            <option value="date_desc">Newest First</option>
          </select>
        </div>
        {hasFilters && (
          <button onClick={clearAll} className="px-4 py-2 text-sm font-medium text-[#FF5A5F] border border-[#FF5A5F]/30 rounded-lg hover:bg-[#FF5A5F]/5 transition-colors self-end">
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}
