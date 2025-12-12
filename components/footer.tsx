"use client";

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-3">{t('aboutTitle')}</h3>
            <p className="text-sm text-muted-foreground">{t('aboutText')}</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3">{t('navigationTitle')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link href="/libros" className="text-muted-foreground hover:text-primary">
                  {t('library')}
                </Link>
              </li>
              <li>
                <Link href="/secuencias" className="text-muted-foreground hover:text-primary">
                  {t('numericSequences')}
                </Link>
              </li>
              <li>
                <Link href="/guia" className="text-muted-foreground hover:text-primary">
                  {t('practicalGuide')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3">{t('resourcesTitle')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/webinars" className="text-muted-foreground hover:text-primary">
                  {t('webinars')}
                </Link>
              </li>
              <li>
                <Link href="/favoritos" className="text-muted-foreground hover:text-primary">
                  {t('myFavorites')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          <p className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1 text-center">
            <span>{t('createdBy')}</span>
            <span className="font-semibold text-purple-600 dark:text-purple-400">Leviathan OS</span>
            <span>{t('forSharing')}</span>
          </p>
          <p className="mt-2">{t('copyright', { year })}</p>
        </div>
      </div>
    </footer>
  );
}
