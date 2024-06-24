import { env } from '@/env.mjs';
import * as m from '@/paraglide/messages';
import { AccountColor, AccountSubtype } from '@/types/account';
import { CategoryGroupMap, TCategoryGroup } from '@/types/transaction';

export const siteConfig = {
  title: m.meta_title,
  description: m.meta_description,
  keywords: () => [
    m.meta_keyword_nextjs(),
    m.meta_keyword_react(),
    m.meta_keyword_nextjs_starter(),
    m.meta_keyword_nextjs_boilerplate(),
    m.meta_keyword_starter_template(),
    m.meta_keyword_tailwindcss(),
    m.meta_keyword_typescript(),
    m.meta_keyword_shadcn_ui(),
    m.meta_keyword_next_auth(),
    m.meta_keyword_prisma(),
  ],
  url: () => env.APP_URL,
  googleSiteVerificationId: () => env.GOOGLE_SITE_VERIFICATION_ID || '',
};

const CATEGORY_GROUP_MAP: CategoryGroupMap = {
  'Food and Drink': 'Food and booze',
  Travel: 'Savings',
  Transfer: 'Savings',
  Shopping: 'Savings',
  Food: 'Food and booze',
  Housing: 'Savings',
  Utilities: 'Savings',
  Salary: 'Savings',
  Groceries: 'Food and booze',
  Subscription: 'Subscriptions',
  Income: 'Savings',
  Rent: 'Savings',
  Deposit: 'Savings',
  Withdrawal: 'Savings',
  Interest: 'Savings',
  Payment: 'Savings',
  'Credit Card': 'Savings',
  Loan: 'Savings',
  Investment: 'Savings',
  Other: 'Savings',
};
const CATEGORY_GROUP_COLOR = {
  Subscriptions: '#175CD3',
  'Food and booze': '#C11574',
  Savings: '#027A48',
};

const LANGUAGE_TAGS = {
  English: 'en',
  Vietnamese: 'vn',
};
const LANGUAGE_CURRENCY_MAP = {
  en: 'USD',
  vn: 'VND',
};

const ACCOUNT_COLOR_VARIANTS: Record<AccountColor, string> = {
  red: 'text-red-500 border-red-500 bg-red-100',
  green: 'text-green-500 border-green-500 bg-green-100',
  blue: 'text-blue-500 border-blue-500 bg-blue-100',
  yellow: 'text-yellow-500 border-yellow-500 bg-yellow-100',
  purple: 'text-purple-500 border-purple-500 bg-purple-100',
  pink: 'text-pink-500 border-pink-500 bg-pink-100',
  indigo: 'text-indigo-500 border-indigo-500 bg-indigo-100',
  cyan: 'text-cyan-500 border-cyan-500 bg-cyan-100',
  teal: 'text-teal-500 border-teal-500 bg-teal-100',
  gray: 'text-gray-500 border-gray-500 bg-gray-100',
};

const ACCOUNT_COLOR_VARIANTS_BACKGROUND: Record<AccountColor, string> = {
  red: 'bg-red-500',
  green: 'bg-green-500',
  blue: 'bg-blue-500',
  yellow: 'bg-yellow-500',
  purple: 'bg-purple-500',
  pink: 'bg-pink-500',
  indigo: 'bg-indigo-500',
  cyan: 'bg-cyan-500',
  teal: 'bg-teal-500',
  gray: 'bg-gray-500',
};
const ACCOUNT_SUBTYPES_COLOR_VARIANTS: Record<AccountSubtype, string> = {
  checking: 'text-blue-500 border-blue-500 bg-blue-100',
  savings: 'text-green-500 border-green-500 bg-green-100',
  'credit card': 'text-red-500 border-red-500 bg-red-100',
  'line of credit': 'text-yellow-500 border-yellow-500 bg-yellow-100',
  mortgage: 'text-purple-500 border-purple-500 bg-purple-100',
  auto: 'text-pink-500 border-pink-500 bg-pink-100',
  personal: 'text-indigo-500 border-indigo-500 bg-indigo-100',
  student: 'text-cyan-500 border-cyan-500 bg-cyan-100',
  investment: 'text-teal-500 border-teal-500 bg-teal-100',
  other: 'text-gray-500 border-gray-500 bg-gray-100',
};

const ACCOUNT_SUBTYPES_LABLES: Record<AccountSubtype, string> = {
  checking: m.account_subtype_checking(),
  savings: m.account_subtype_savings(),
  'credit card': m.account_subtype_credit_card(),
  'line of credit': m.account_subtype_line_of_credit(),
  mortgage: m.account_subtype_mortgage(),
  auto: m.account_subtype_auto(),
  personal: m.account_subtype_personal(),
  student: m.account_subtype_student(),
  investment: m.account_subtype_investment(),
  other: m.account_subtype_other(),
};
const TRANSACTION_CATEGORY_COLOR_VARIANTS: Record<TCategoryGroup, string> = {
  'Food and booze': 'text-[#C11574] border-[#C11574] bg-[#C115740e]',
  Subscriptions: 'text-[#175CD3] border-[#175CD3] bg-[#175CD30e]',
  Savings: 'text-[#027A48] border-[#027A48] bg-[#027A480e]',
};
export {
  CATEGORY_GROUP_MAP,
  CATEGORY_GROUP_COLOR,
  LANGUAGE_TAGS,
  LANGUAGE_CURRENCY_MAP,
  ACCOUNT_COLOR_VARIANTS,
  ACCOUNT_COLOR_VARIANTS_BACKGROUND,
  ACCOUNT_SUBTYPES_COLOR_VARIANTS,
  ACCOUNT_SUBTYPES_LABLES,
  TRANSACTION_CATEGORY_COLOR_VARIANTS,
};
