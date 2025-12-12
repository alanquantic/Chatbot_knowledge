import Link from 'next/link';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-3">Sobre Grigori Grabovoi</h3>
            <p className="text-sm text-muted-foreground">
              Matemático, académico y autor conocido por sus enseñanzas sobre
              secuencias numéricas, métodos de concentración y desarrollo armonioso.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3">Navegación</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/libros" className="text-muted-foreground hover:text-primary">
                  Biblioteca de Libros
                </Link>
              </li>
              <li>
                <Link href="/secuencias" className="text-muted-foreground hover:text-primary">
                  Secuencias Numéricas
                </Link>
              </li>
              <li>
                <Link href="/guia" className="text-muted-foreground hover:text-primary">
                  Guía Práctica
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3">Recursos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/webinars" className="text-muted-foreground hover:text-primary">
                  Webinars y Videos
                </Link>
              </li>
              <li>
                <Link href="/favoritos" className="text-muted-foreground hover:text-primary">
                  Mis Favoritos
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          <p className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1 text-center">
            <span>Creado por</span>
            <span className="font-semibold text-purple-600 dark:text-purple-400">Leviathan OS</span>
            <span>para compartir las enseñanzas de Grigori Grabovoi</span>
          </p>
          <p className="mt-2">© {new Date().getFullYear()} Base de Datos Grigori Grabovoi</p>
        </div>
      </div>
    </footer>
  );
}
