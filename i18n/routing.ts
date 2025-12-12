import { defineRouting } from 'next-intl/routing';
import { defaultLocale, locales } from '@/i18n/locales';

export const routing = defineRouting({
  locales: [...locales],
  defaultLocale,
  // Keep existing Spanish URLs working (no prefix), but enable /en/...
  localePrefix: 'as-needed',
});


