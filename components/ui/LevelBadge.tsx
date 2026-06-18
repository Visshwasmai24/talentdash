import { Level } from '@/types';
import { LEVEL_COLORS } from '@/lib/config';

interface LevelBadgeProps {
  level: Level;
  size?: 'sm' | 'md';
}

export default function LevelBadge({ level, size = 'sm' }: LevelBadgeProps) {
  const colorClass = LEVEL_COLORS[level] || 'bg-gray-100 text-gray-600 border-gray-200';
  const sizeClass = size === 'md' ? 'px-3 py-1 text-sm' : 'px-2 py-0.5 text-xs';
  return (
    <span className={`inline-flex items-center font-medium rounded-full border ${colorClass} ${sizeClass} whitespace-nowrap`}>
      {level}
    </span>
  );
}
