"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  Hash,
  BookMarked,
  Video,
  Heart,
  LogOut,
  LogIn,
  Home,
  Sun,
  Moon,
  Microscope,
  Palette,
  NotebookPen,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession() || {};
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { href: '/', label: 'Inicio', icon: Home },
    { href: '/libros', label: 'Libros', icon: BookOpen },
    { href: '/secuencias', label: 'Secuencias', icon: Hash },
    { href: '/guia', label: 'Guía Práctica', icon: BookMarked },
    { href: '/prk1u', label: 'PRK-1U', icon: Microscope },
    { href: '/webinars', label: 'Webinars', icon: Video },
    { href: '/disenos', label: 'Diseños', icon: Palette },
  ];

  if (session?.user) {
    navItems.push({ href: '/diario', label: 'Diario', icon: NotebookPen });
    navItems.push({ href: '/favoritos', label: 'Favoritos', icon: Heart });
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 p-2">
              <span className="text-xl font-bold text-white">GG</span>
            </div>
            <span className="hidden font-bold text-lg sm:inline-block">
              Grigori Grabovoi
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems?.map?.((item) => {
              const Icon = item?.icon;
              const isActive = pathname === item?.href;
              return (
                <Link key={item?.href} href={item?.href ?? '#'}>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    <span>{item?.label}</span>
                  </Button>
                </Link>
              );
            }) ?? null}
          </div>

          <div className="flex items-center space-x-2">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            )}

            {session?.user ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Salir</span>
              </Button>
            ) : (
              <Link href="/auth/login">
                <Button size="sm" className="flex items-center space-x-2">
                  <LogIn className="h-4 w-4" />
                  <span className="hidden sm:inline">Iniciar Sesión</span>
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden pb-3 flex flex-wrap gap-1">
          {navItems?.map?.((item) => {
            const Icon = item?.icon;
            const isActive = pathname === item?.href;
            return (
              <Link key={item?.href} href={item?.href ?? '#'}>
                <Button
                  variant={isActive ? 'default' : 'ghost'}
                  size="sm"
                  className="flex items-center space-x-1 text-xs"
                >
                  {Icon && <Icon className="h-3 w-3" />}
                  <span>{item?.label}</span>
                </Button>
              </Link>
            );
          }) ?? null}
        </div>
      </div>
    </nav>
  );
}
