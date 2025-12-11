"use client";

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
}

const pathToLabel: Record<string, string> = {
  '': 'Inicio',
  'secuencias': 'Secuencias Numéricas',
  'libros': 'Biblioteca',
  'guia': 'Guía Práctica',
  'webinars': 'Webinars',
  'prk1u': 'Dispositivo PRK-1U',
  'favoritos': 'Favoritos',
  'diario': 'Diario Personal',
  'disenos': 'Diseños',
  'auth': 'Autenticación',
  'login': 'Iniciar Sesión',
  'signup': 'Registrarse',
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const pathname = usePathname();
  
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
  if (paths.length === 0) return null;

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <Link 
        href="/" 
        className="hover:text-foreground transition-colors flex items-center"
      >
        <Home className="h-4 w-4" />
      </Link>
      {paths?.map?.((path, index) => {
        const href = '/' + paths.slice(0, index + 1).join('/');
        const isLast = index === paths.length - 1;
        const label = pathToLabel?.[path] ?? path;

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
