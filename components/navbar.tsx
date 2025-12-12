"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  BookOpen,
  Hash,
  BookMarked,
  Video,
  Heart,
  LogOut,
  LogIn,
  Home,
  Menu,
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
        <div className="flex min-h-16 items-center gap-3 py-2 lg:py-0">
          <Link href="/" className="flex shrink-0 items-center space-x-2 lg:flex-col lg:items-start lg:space-x-0 lg:space-y-1 xl:flex-row xl:items-center xl:space-x-2 xl:space-y-0">
            <div className="rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 p-1.5 sm:p-2">
              <span className="text-lg sm:text-xl font-bold text-white">GG</span>
            </div>
            <span className="hidden max-w-[10rem] truncate font-bold text-sm sm:text-base lg:text-xs xl:text-lg sm:inline-block">
              Grigori Grabovoi
            </span>
          </Link>

          {/* Desktop menu: no horizontal scrolling; collapse earlier on smaller widths */}
          <div className="hidden lg:flex flex-1 min-w-0 items-center justify-center gap-1 px-1">
            {navItems?.map?.((item) => {
              const Icon = item?.icon;
              const isActive = pathname === item?.href;
              return (
                <Link key={item?.href} href={item?.href ?? '#'}>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    size="sm"
                    className="flex items-center space-x-1 px-2 text-xs 2xl:space-x-2 2xl:px-3 2xl:text-sm"
                  >
                    {Icon && <Icon className="h-4 w-4 2xl:h-4 2xl:w-4" />}
                    <span>{item?.label}</span>
                  </Button>
                </Link>
              );
            }) ?? null}
          </div>

          <div className="flex shrink-0 items-center space-x-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="p-4 pt-10 overflow-y-auto">
                <div className="flex flex-col gap-1">
                  {navItems?.map?.((item) => {
                    const Icon = item?.icon;
                    const isActive = pathname === item?.href;
                    return (
                      <SheetClose asChild key={item?.href}>
                        <Link href={item?.href ?? '#'}>
                          <Button
                            variant={isActive ? 'default' : 'ghost'}
                            size="sm"
                            className="w-full justify-start"
                          >
                            {Icon && <Icon className="mr-2 h-4 w-4" />}
                            <span>{item?.label}</span>
                          </Button>
                        </Link>
                      </SheetClose>
                    );
                  }) ?? null}
                </div>
              </SheetContent>
            </Sheet>

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
      </div>
    </nav>
  );
}
