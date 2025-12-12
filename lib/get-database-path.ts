import type { Locale } from '@/i18n/locales';

/**
 * Returns the path to the Grabovoi database file based on the locale
 */
export function getDatabasePath(locale: Locale): string {
  return locale === 'en' 
    ? '/data/grabovoi_database_en.json' 
    : '/data/grabovoi_database.json';
}

/**
 * Returns the path to a markdown file based on the locale
 */
export function getMarkdownPath(filename: string, locale: Locale): string {
  if (locale === 'en') {
    // English versions have _en suffix before extension
    const [name, ext] = filename.split('.');
    return `/data/${name}_en.${ext}`;
  }
  return `/data/${filename}`;
}

