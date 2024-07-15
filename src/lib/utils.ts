import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { LANGUAGE_CURRENCY_MAP } from '@/lib/constant';
import { Rate } from '@/types';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const formatCurrency = (amount: number, locale = 'en', rate: Rate) => {
  const formatter = {
    en: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }),
    vn: new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }),
  }[locale] as Intl.NumberFormat;
  const currency: string =
    LANGUAGE_CURRENCY_MAP[locale as keyof typeof LANGUAGE_CURRENCY_MAP];
  const rateCurrency: number = rate[currency as keyof typeof rate] || 1;
  return formatter.format(amount * rateCurrency);
};
export const transferCurrency = (amount: number, locale = 'en', rate: Rate) => {
  const currency: string =
    LANGUAGE_CURRENCY_MAP[locale as keyof typeof LANGUAGE_CURRENCY_MAP];
  const rateCurrency: number = rate[currency as keyof typeof rate] || 1;
  return amount * rateCurrency;
};

export const formatDateTime = (date: string, locale = 'en') => {
  //from 2024-06-22T12:00:00Z to Wed 1:00pm
  const formatter = {
    en: new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }),
    vn: new Intl.DateTimeFormat('vi-VN', {
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }),
  }[locale] as Intl.DateTimeFormat;
  return formatter.format(new Date(date));
};

export const encryptId = (id: string) => {
  return btoa(id);
};

export const decryptId = (id: string) => {
  return atob(id);
};

export function extractCustomerIdFromUrl(url: string) {
  // Split the URL string by '/'
  const parts = url.split('/');

  // Extract the last part, which represents the customer ID
  const customerId = parts[parts.length - 1];

  return customerId;
}
