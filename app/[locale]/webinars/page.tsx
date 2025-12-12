"use client";

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Video, ExternalLink, Clock, User } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { getDatabasePath } from '@/lib/get-database-path';
import type { Locale } from '@/i18n/locales';

interface Webinar {
  numero: number;
  titulo: string;
  presentador?: string;
  duracion?: string;
  enlace_youtube?: string;
  temas_principales?: string[];
  ensenanzas_clave?: string[];
  ejercicios_practicos?: string[];
}

export default function WebinarsPage() {
  const t = useTranslations('webinars');
  const locale = useLocale() as Locale;
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWebinars();
  }, [locale]);

  const loadWebinars = async () => {
    try {
      const dbPath = getDatabasePath(locale);
      const response = await fetch(dbPath);
      const data = await response.json();
      setWebinars(data?.webinars_youtube ?? []);
    } catch (error) {
      console.error('Error loading webinars:', error);
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
            <p className="text-muted-foreground">{t('loading')}</p>
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
        <div className="container mx-auto max-w-7xl px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
            <p className="text-muted-foreground text-lg">
              {t('subtitle')}
            </p>
          </div>

          {/* Webinars List */}
          <div className="space-y-6">
            {webinars?.map?.((webinar, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge>Webinar {webinar?.numero}</Badge>
                        {webinar?.duracion && (
                          <Badge variant="outline" className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{webinar?.duracion}</span>
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-2xl mb-2">{webinar?.titulo}</CardTitle>
                      {webinar?.presentador && (
                        <CardDescription className="flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span>{webinar?.presentador}</span>
                        </CardDescription>
                      )}
                    </div>
                    {webinar?.enlace_youtube && (
                      <a
                        href={webinar?.enlace_youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0"
                      >
                        <Button className="w-full md:w-auto">
                          <Video className="mr-2 h-4 w-4" />
                          {t('watchOnYoutube')}
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </a>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Main Topics */}
                    {webinar?.temas_principales && webinar?.temas_principales?.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted-foreground">
                          {t('mainTopics')}
                        </h3>
                        <ul className="space-y-1">
                          {webinar?.temas_principales?.map?.((tema, tIndex) => (
                            <li key={tIndex} className="flex items-start space-x-2 text-sm">
                              <span className="text-primary mt-1">•</span>
                              <span className="text-muted-foreground">{tema}</span>
                            </li>
                          )) ?? null}
                        </ul>
                      </div>
                    )}

                    {/* Key Teachings */}
                    {webinar?.ensenanzas_clave && webinar?.ensenanzas_clave?.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted-foreground">
                          {t('keyTeachings')}
                        </h3>
                        <ul className="space-y-1">
                          {webinar?.ensenanzas_clave?.map?.((ensenanza, eIndex) => (
                            <li key={eIndex} className="flex items-start space-x-2 text-sm">
                              <span className="text-primary mt-1">✓</span>
                              <span className="text-muted-foreground">{ensenanza}</span>
                            </li>
                          )) ?? null}
                        </ul>
                      </div>
                    )}

                    {/* Practical Exercises */}
                    {webinar?.ejercicios_practicos && webinar?.ejercicios_practicos?.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted-foreground">
                          {t('practicalExercises')}
                        </h3>
                        <div className="space-y-3">
                          {webinar?.ejercicios_practicos?.map?.((ejercicio: any, exIndex: number) => (
                            <div key={exIndex} className="p-4 bg-muted/50 rounded-lg">
                              <h4 className="font-semibold text-sm mb-2">{ejercicio?.nombre}</h4>
                              {ejercicio?.pasos && ejercicio?.pasos?.length > 0 && (
                                <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                                  {ejercicio?.pasos?.map?.((paso: string, pIndex: number) => (
                                    <li key={pIndex}>{paso}</li>
                                  )) ?? null}
                                </ol>
                              )}
                            </div>
                          )) ?? null}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )) ?? null}
          </div>

          {/* Stats */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            {t('total', { count: webinars?.length ?? 0 })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
