interface MiniSparklineProps {
  points: number[];
  color: string;
  width?: number;
  height?: number;
}

export default function MiniSparkline({ points, color, width = 120, height = 36 }: MiniSparklineProps) {
  if (points.length === 0) return null;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const stepX = width / (points.length - 1 || 1);

  const coords = points.map((p, i) => {
    const x = i * stepX;
    const y = height - ((p - min) / range) * (height - 4) - 2;
    return [x, y];
  });

  const linePath = coords.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  const areaPath = `${linePath} L ${width} ${height} L 0 ${height} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} className="overflow-visible">
      <path d={areaPath} fill={color} opacity={0.12} />
      <path d={linePath} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={coords[coords.length - 1][0]} cy={coords[coords.length - 1][1]} r={3} fill={color} />
    </svg>
  );
}
