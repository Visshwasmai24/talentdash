import { CURRENCY_CONVERSION } from './config';
import { Currency, SalaryRecord } from '@/types';

export function formatINR(paise: number): string {
  const rupees = paise / 100;
  if (rupees >= 10000000) {
    const crore = rupees / 10000000;
    return `\u20b9${crore % 1 === 0 ? crore.toFixed(0) : crore.toFixed(2)} Cr`;
  }
  if (rupees >= 100000) {
    const lakh = rupees / 100000;
    return `\u20b9${lakh % 1 === 0 ? lakh.toFixed(0) : lakh.toFixed(2)} L`;
  }
  return `\u20b9${rupees.toLocaleString('en-IN')}`;
}

export function formatUSD(cents: number): string {
  const dollars = cents / 100;
  return `$${dollars.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
}

export function formatSalary(amount: number, currency: Currency, displayCurrency: Currency): string {
  if (!amount || amount === 0) return '\u2014';
  if (currency === displayCurrency) {
    return currency === 'INR' ? formatINR(amount) : formatUSD(amount);
  }
  if (currency === 'INR' && displayCurrency === 'USD') {
    const usdCents = Math.round((amount / 100) * CURRENCY_CONVERSION.INR_TO_USD * 100);
    return formatUSD(usdCents);
  }
  if (currency === 'USD' && displayCurrency === 'INR') {
    const inrPaise = Math.round((amount / 100) * CURRENCY_CONVERSION.USD_TO_INR * 100);
    return formatINR(inrPaise);
  }
  return currency === 'INR' ? formatINR(amount) : formatUSD(amount);
}

export function formatDelta(delta: number, currency: Currency): string {
  if (delta === 0) return '\u2014';
  const abs = Math.abs(delta);
  const sign = delta > 0 ? '+' : '-';
  const formatted = currency === 'INR' ? formatINR(abs) : formatUSD(abs);
  return `${sign}${formatted}`;
}
export function convertAmount(amount: number, fromCurrency: Currency, toCurrency: Currency): number {
  if (fromCurrency === toCurrency) return amount;
  if (fromCurrency === 'INR' && toCurrency === 'USD') {
    return Math.round((amount / 100) * CURRENCY_CONVERSION.INR_TO_USD * 100);
  }
  if (fromCurrency === 'USD' && toCurrency === 'INR') {
    return Math.round((amount / 100) * CURRENCY_CONVERSION.USD_TO_INR * 100);
  }
  return amount;
}
export function computeMedian(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
}

export function computeLevelDistribution(records: SalaryRecord[]): Record<string, number> {
  return records.reduce((acc, r) => {
    acc[r.level_standardized] = (acc[r.level_standardized] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}

export function slugToName(slug: string): string {
  const overrides: Record<string, string> = {
    google: 'Google',
    amazon: 'Amazon',
    meta: 'Meta',
    microsoft: 'Microsoft',
    flipkart: 'Flipkart',
    meesho: 'Meesho',
    nvidia: 'NVIDIA',
    tcs: 'TCS',
    infosys: 'Infosys',
    wipro: 'Wipro',
    razorpay: 'Razorpay',
    zepto: 'Zepto',
    swiggy: 'Swiggy',
    zomato: 'Zomato',
    phonepe: 'PhonePe',
    paytm: 'Paytm',
  };
  return overrides[slug] || slug.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}
