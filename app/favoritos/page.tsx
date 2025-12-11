"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatSequence } from '@/lib/utils';
import { SequenceSphere } from '@/components/sequence-sphere';
import { Heart, BookOpen, Hash, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface Favorite {
  id: string;
  itemType: string;
  itemId: string;
  createdAt: string;
  data?: any;
}

export default function FavoritosPage() {
  const { data: session, status } = useSession() || {};
  const router = useRouter();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [database, setDatabase] = useState<any>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    } else if (status === 'authenticated') {
      loadFavorites();
      loadDatabase();
    }
  }, [status]);

  const loadDatabase = async () => {
    try {
      const response = await fetch('/data/grabovoi_database.json');
      const data = await response.json();
      setDatabase(data);
    } catch (error) {
      console.error('Error loading database:', error);
    }
  };

  const loadFavorites = async () => {
    try {
      const response = await fetch('/api/favorites');
      if (response.ok) {
        const data = await response.json();
        setFavorites(data ?? []);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (itemType: string, itemId: string) => {
    try {
      const response = await fetch(
        `/api/favorites?itemType=${itemType}&itemId=${itemId}`,
        { method: 'DELETE' }
      );
      if (response.ok) {
        setFavorites(favorites?.filter?.(f => !(f?.itemType === itemType && f?.itemId === itemId)) ?? []);
      }
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const getFavoriteData = (favorite: Favorite) => {
    if (!database) return null;

    if (favorite?.itemType === 'book') {
      return database?.libros?.find?.((b: any) => b?.id === Number(favorite?.itemId));
    } else if (favorite?.itemType === 'sequence') {
      for (const [categoria, secuencias] of Object.entries(database?.secuencias_numericas_organizadas ?? {})) {
        const found = (secuencias as any)?.find?.((s: any) => s?.secuencia === favorite?.itemId);
        if (found) {
          return { ...found, categoria };
        }
      }
    }
    return null;
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Cargando favoritos...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const bookFavorites = favorites?.filter?.(f => f?.itemType === 'book') ?? [];
  const sequenceFavorites = favorites?.filter?.(f => f?.itemType === 'sequence') ?? [];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container mx-auto max-w-7xl px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 flex items-center space-x-2">
              <Heart className="h-10 w-10 text-red-500 fill-red-500" />
              <span>Mis Favoritos</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Tus libros y secuencias guardados
            </p>
          </div>

          {/* Empty State */}
          {favorites?.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No tienes favoritos aún</h3>
                <p className="text-muted-foreground mb-6">
                  Explora libros y secuencias para agregarlos a tus favoritos
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/libros">
                    <Button>
                      <BookOpen className="mr-2 h-4 w-4" />
                      Explorar Libros
                    </Button>
                  </Link>
                  <Link href="/secuencias">
                    <Button variant="outline">
                      <Hash className="mr-2 h-4 w-4" />
                      Explorar Secuencias
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              {/* Favorite Books */}
              {bookFavorites?.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                    <BookOpen className="h-6 w-6 text-primary" />
                    <span>Libros ({bookFavorites?.length})</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {bookFavorites?.map?.((fav) => {
                      const book = getFavoriteData(fav);
                      if (!book) return null;
                      return (
                        <Card key={fav?.id} className="hover:shadow-lg transition-shadow">
                          <CardHeader>
                            <div className="flex items-start justify-between mb-2">
                              <Badge variant="secondary">{book?.categoria}</Badge>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeFavorite('book', fav?.itemId)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                            <CardTitle className="text-lg">{book?.titulo_espanol}</CardTitle>
                            <CardDescription className="text-sm">
                              Año: {book?.año}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <Link href={`/libros/${book?.id}`}>
                              <Button className="w-full" variant="outline">
                                Ver Detalles
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>
                      );
                    }) ?? null}
                  </div>
                </div>
              )}

              {/* Favorite Sequences */}
              {sequenceFavorites?.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                    <Hash className="h-6 w-6 text-primary" />
                    <span>Secuencias ({sequenceFavorites?.length})</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sequenceFavorites?.map?.((fav) => {
                      const sequence = getFavoriteData(fav);
                      if (!sequence) return null;
                      return (
                        <Card key={fav?.id} className="hover:shadow-lg transition-shadow">
                          <CardHeader>
                            <div className="flex items-start justify-between mb-4">
                              <Badge variant="secondary" className="text-xs">
                                {sequence?.categoria}
                              </Badge>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeFavorite('sequence', fav?.itemId)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                            <div className="flex justify-center my-4">
                              <SequenceSphere sequence={sequence?.secuencia ?? ''} size="lg" />
                            </div>
                            <CardDescription className="text-sm text-center mt-4">
                              {sequence?.proposito}
                            </CardDescription>
                          </CardHeader>
                        </Card>
                      );
                    }) ?? null}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
