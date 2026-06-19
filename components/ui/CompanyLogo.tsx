interface CompanyLogoProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

const SIZE_CLASSES: Record<string, string> = {
  sm: 'w-8 h-8 text-xs rounded-md',
  md: 'w-10 h-10 text-sm rounded-lg',
  lg: 'w-14 h-14 text-xl rounded-xl',
};

export default function CompanyLogo({ name, size = 'sm' }: CompanyLogoProps) {
  const initial = name.trim().charAt(0).toUpperCase() || '?';
  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-center justify-center shrink-0 font-bold bg-gray-100 text-gray-500 border border-gray-200 ${SIZE_CLASSES[size]}`}
    >
      {initial}
    </span>
  );
}
