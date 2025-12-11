"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FavoriteButton } from '@/components/favorite-button';
import { ArrowLeft, Calendar, Building2, BookOpen, Sparkles, Hash } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { formatSequence } from '@/lib/utils';
import { SequenceSphere } from '@/components/sequence-sphere';

interface Sequence {
  secuencia: string;
  proposito: string;
}

interface Book {
  id: number;
  titulo_espanol: string;
  titulo_original?: string;
  año: number;
  categoria: string;
  resumen: string;
  editorial?: string;
  isbn?: string;
  paginas?: number;
  conceptos_clave?: string[];
  secuencias_destacadas?: Sequence[];
  aplicacion_practica?: string;
  idiomas_disponibles?: string[];
}

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBook();
  }, [params?.id]);

  const loadBook = async () => {
    try {
      const response = await fetch('/data/grabovoi_database.json');
      const data = await response.json();
      const foundBook = data?.libros?.find?.((b: any) => b?.id === Number(params?.id)) ?? null;
      setBook(foundBook);
    } catch (error) {
      console.error('Error loading book:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Cargando libro...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">Libro no encontrado</h2>
            <Button onClick={() => router.push('/libros')} className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a la biblioteca
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container mx-auto max-w-5xl px-4">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => router.push('/libros')}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a la biblioteca
          </Button>

          {/* Header */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-2">
                  <Badge variant="secondary" className="mb-2">{book?.categoria}</Badge>
                  <h1 className="text-3xl md:text-4xl font-bold">{book?.titulo_espanol}</h1>
                  {book?.titulo_original && (
                    <p className="text-lg text-muted-foreground italic">{book?.titulo_original}</p>
                  )}
                </div>
                <FavoriteButton itemType="book" itemId={String(book?.id)} variant="outline" />
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {book?.año && (
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{book?.año}</span>
                  </div>
                )}
                {book?.editorial && (
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-4 w-4" />
                    <span>{book?.editorial}</span>
                  </div>
                )}
                {book?.paginas && (
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4" />
                    <span>{book?.paginas} páginas</span>
                  </div>
                )}
              </div>

              {book?.isbn && (
                <p className="text-sm text-muted-foreground mt-2">ISBN: {book?.isbn}</p>
              )}
            </CardHeader>
          </Card>

          {/* Resumen */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <span>Resumen</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {book?.resumen}
              </p>
            </CardContent>
          </Card>

          {/* Conceptos Clave */}
          {book?.conceptos_clave && book?.conceptos_clave?.length > 0 && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Conceptos Clave</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {book?.conceptos_clave?.map?.((concepto, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-muted-foreground">{concepto}</span>
                    </li>
                  )) ?? null}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Secuencias Destacadas */}
          {book?.secuencias_destacadas && book?.secuencias_destacadas?.length > 0 && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Hash className="h-5 w-5 text-primary" />
                  <span>Secuencias Destacadas</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {book?.secuencias_destacadas?.map?.((seq, index) => (
                    <div key={index} className="flex flex-col items-center gap-4 p-4">
                      <SequenceSphere sequence={seq?.secuencia ?? ''} size="lg" />
                      <p className="text-sm text-muted-foreground text-center">{seq?.proposito}</p>
                    </div>
                  )) ?? null}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Aplicación Práctica */}
          {book?.aplicacion_practica && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Aplicación Práctica</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {book?.aplicacion_practica}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Idiomas Disponibles */}
          {book?.idiomas_disponibles && book?.idiomas_disponibles?.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Idiomas Disponibles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {book?.idiomas_disponibles?.map?.((idioma, index) => (
                    <Badge key={index} variant="outline">{idioma}</Badge>
                  )) ?? null}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
