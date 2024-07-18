import '@/styles/globals.css';

import { PropsWithChildren } from 'react';
import { LanguageProvider } from '@inlang/paraglide-next';
import type { Metadata } from 'next';

import AppSettings from '@/components/AppSettings';
import StoreProvider from '@/components/store-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { env } from '@/env.mjs';
import { fonts } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import * as m from '@/paraglide/messages.js';
import { languageTag } from '@/paraglide/runtime.js';

const siteConfig = {
  title: m.meta_title,
  description: m.meta_description,
  keywords: () => [
    m.meta_keyword_nextjs(),
    m.meta_keyword_react(),
    m.meta_keyword_nextjs_starter(),
    m.meta_keyword_tailwindcss(),
    m.meta_keyword_typescript(),
    m.meta_keyword_shadcn_ui(),
  ],
  url: () => env.APP_URL,
};

export const generateMetadata = (): Metadata => ({
  metadataBase: new URL(siteConfig.url()),
  title: {
    default: siteConfig.title(),
    template: `%s | ${siteConfig.title()}`,
  },
  description: siteConfig.description(),
  keywords: siteConfig.keywords(),
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  openGraph: {
    url: siteConfig.url(),
    title: siteConfig.title(),
    description: siteConfig.description(),
    siteName: siteConfig.title(),
    images: '/opengraph-image.png',
    type: 'website',
    locale: languageTag(),
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title(),
    description: siteConfig.description(),
    images: '/opengraph-image.png',
  },
});

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <LanguageProvider>
      <html lang={languageTag()} suppressHydrationWarning>
        <body className={cn('w-vw h-svh min-h-svh font-sans', fonts)}>
          <StoreProvider>
            <ThemeProvider attribute="class">
              <main className="container ">{children}</main>
              <AppSettings />
              <Toaster />
            </ThemeProvider>
          </StoreProvider>
        </body>
      </html>
    </LanguageProvider>
  );
};

export default RootLayout;
