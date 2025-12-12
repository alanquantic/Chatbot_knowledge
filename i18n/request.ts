import { getRequestConfig } from 'next-intl/server';
import type { AbstractIntlMessages } from 'next-intl';
import { defaultLocale, isLocale, type Locale } from '@/i18n/locales';

type MessagesModule = { default: AbstractIntlMessages };

const messageLoaders: Record<Locale, () => Promise<MessagesModule>> = {
  es: async () => import('@/messages/es.json'),
  en: async () => import('@/messages/en.json'),
};

function resolveLocale(requested: string | undefined): Locale {
  if (!requested) return defaultLocale;
  if (!isLocale(requested)) {
    throw new Error(`Unsupported locale: ${requested}`);
  }
  return requested;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;

  // If middleware is configured correctly, this should be either a supported locale
  // or undefined (default locale without prefix).
  const locale = resolveLocale(requested);

  const messages = (await messageLoaders[locale]()).default;

  return { locale, messages };
});


