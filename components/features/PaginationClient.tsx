'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface Props { page: number; totalPages: number; total: number; limit: number; }

export default function PaginationClient({ page, totalPages, total, limit }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  const go = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(p));
    router.push(`${pathname}?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between py-4 border-t border-[#EBEBEB] mt-0">
      <p className="text-sm text-[#717171]">
        Showing <span className="font-medium text-[#222222]">{start}–{end}</span> of <span className="font-medium text-[#222222]">{total}</span> records
      </p>
      <div className="flex items-center gap-2">
        <button onClick={() => go(page - 1)} disabled={page === 1}
          className="px-4 py-2 text-sm font-medium rounded-lg border border-[#EBEBEB] bg-white text-[#484848] hover:bg-[#F2F2F2] disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
          Previous
        </button>
        <span className="text-sm text-[#717171] px-2">Page {page} of {totalPages}</span>
        <button onClick={() => go(page + 1)} disabled={page === totalPages}
          className="px-4 py-2 text-sm font-medium rounded-lg border border-[#EBEBEB] bg-white text-[#484848] hover:bg-[#F2F2F2] disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
          Next
        </button>
      </div>
    </div>
  );
}
