import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { Providers } from '@/components/providers';
import { ChatbotButton } from '@/components/chatbot-button';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Locale } from '@/i18n/locales';

const inter = Inter({ subsets: ['latin'] });

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams(): Array<{ locale: string }> {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('title'),
    description: t('description'),
    icons: {
      icon: '/favicon.svg',
      shortcut: '/favicon.svg',
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
            <ChatbotButton />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}

