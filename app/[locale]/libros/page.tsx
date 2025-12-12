"use client";

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FavoriteButton } from '@/components/favorite-button';
import { Search, BookOpen, Calendar, Building2 } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { getDatabasePath } from '@/lib/get-database-path';
import type { Locale } from '@/i18n/locales';

interface Book {
  id: number;
  titulo_espanol: string;
  año: number;
  categoria: string;
  resumen: string;
  editorial?: string;
  paginas?: number;
}

export default function LibrosPage() {
  const t = useTranslations('books');
  const locale = useLocale() as Locale;
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBooks();
  }, [locale]);

  const loadBooks = async () => {
    try {
      const dbPath = getDatabasePath(locale);
      const response = await fetch(dbPath);
      const data = await response.json();
      setBooks(data?.libros ?? []);
    } catch (error) {
      console.error('Error loading books:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', ...new Set(books?.map?.(book => book?.categoria) ?? [])];

  const filteredBooks = books?.filter?.(book => {
    const matchesSearch = book?.titulo_espanol
      ?.toLowerCase?.()
      ?.includes?.(searchTerm?.toLowerCase?.() ?? '') ?? false;
    const matchesCategory = selectedCategory === 'all' || book?.categoria === selectedCategory;
    return matchesSearch && matchesCategory;
  }) ?? [];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container mx-auto max-w-7xl px-4">
          <Breadcrumbs />
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {t('title')}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t('subtitle')}
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories?.map?.(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === 'all' ? t('allCategories') : category}
                </Button>
              )) ?? null}
            </div>
          </div>

          {/* Books Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">{t('loading')}</p>
            </div>
          ) : filteredBooks?.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">{t('empty')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks?.map?.(book => (
                <Card key={book?.id} className="hover:shadow-lg transition-shadow flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary">{book?.categoria}</Badge>
                      <FavoriteButton itemType="book" itemId={String(book?.id)} />
                    </div>
                    <CardTitle className="text-xl">{book?.titulo_espanol}</CardTitle>
                    <div className="flex flex-col space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-3 w-3" />
                        <span>{book?.año}</span>
                      </div>
                      {book?.editorial && (
                        <div className="flex items-center space-x-2">
                          <Building2 className="h-3 w-3" />
                          <span>{book?.editorial}</span>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-sm text-muted-foreground line-clamp-4 mb-4">
                      {book?.resumen}
                    </p>
                    <Link href={`/libros/${book?.id}`} className="mt-auto">
                      <Button className="w-full" variant="outline">
                        {t('viewDetails')}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )) ?? null}
            </div>
          )}

          {/* Stats */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            {t('stats', { shown: filteredBooks?.length ?? 0, total: books?.length ?? 0 })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
