"use client";

import { Link } from '@/i18n/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { usePathname } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const pathname = usePathname();
  const t = useTranslations('breadcrumbs');
  const locale = useLocale();

  const getPathLabel = (path: string): string => {
    const labels: Record<string, string> = {
      '': t('home'),
      'es': t('home'),
      'en': t('home'),
      'secuencias': t('sequences'),
      'libros': t('books'),
      'guia': t('guide'),
      'webinars': t('webinars'),
      'prk1u': t('prk1u'),
      'favoritos': t('favorites'),
      'diario': t('journal'),
      'disenos': t('designs'),
      'auth': t('auth'),
      'login': t('login'),
      'signup': t('signup'),
      'bienvenida': t('welcome'),
    };
    return labels[path] ?? path;
  };
  
  // If custom items are provided, use them
  if (items) {
    return (
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
        <Link 
          href="/" 
          className="hover:text-foreground transition-colors flex items-center"
        >
          <Home className="h-4 w-4" />
        </Link>
        {items?.map?.((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <ChevronRight className="h-4 w-4" />
            {index === items.length - 1 ? (
              <span className="font-medium text-foreground">{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-foreground transition-colors">
                {item.label}
              </Link>
            )}
          </div>
        )) ?? null}
      </nav>
    );
  }

  // Auto-generate breadcrumbs from pathname
  const paths = pathname?.split('/')?.filter(Boolean) ?? [];
  // Filter out locale prefixes
  const filteredPaths = paths.filter(p => p !== 'es' && p !== 'en');
  if (filteredPaths.length === 0) return null;

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <Link 
        href="/" 
        className="hover:text-foreground transition-colors flex items-center"
      >
        <Home className="h-4 w-4" />
      </Link>
      {filteredPaths?.map?.((path, index) => {
        const href = '/' + filteredPaths.slice(0, index + 1).join('/');
        const isLast = index === filteredPaths.length - 1;
        const label = getPathLabel(path);

        return (
          <div key={path + index} className="flex items-center space-x-2">
            <ChevronRight className="h-4 w-4" />
            {isLast ? (
              <span className="font-medium text-foreground">{label}</span>
            ) : (
              <Link href={href} className="hover:text-foreground transition-colors">
                {label}
              </Link>
            )}
          </div>
        );
      }) ?? null}
    </nav>
  );
}
