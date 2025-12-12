"use client";

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { BookMarked, Sparkles, AlertCircle, Heart, Lightbulb, Info } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { getDatabasePath } from '@/lib/get-database-path';
import type { Locale } from '@/i18n/locales';

interface Metodo {
  nombre: string;
  nivel: string;
  descripcion: string;
  pasos: string[];
}

interface Ejercicio {
  numero: number;
  titulo: string;
  nivel: string;
  secuencia: string;
  duracion: string;
  tiempo_recomendado: string;
  pasos: string[];
  tip?: string;
}

export default function GuiaPage() {
  const t = useTranslations('guide');
  const locale = useLocale() as Locale;
  const [guia, setGuia] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGuia();
  }, [locale]);

  const loadGuia = async () => {
    try {
      const dbPath = getDatabasePath(locale);
      const response = await fetch(dbPath);
      const data = await response.json();
      setGuia(data?.guia_practica ?? null);
    } catch (error) {
      console.error('Error loading guia:', error);
    } finally {
      setLoading(false);
    }
  };

  const explicarNivel = (nivel: string) => {
    const levelKey = nivel === 'Todos los niveles' ? 'allLevels' 
      : nivel === 'Principiante' ? 'beginner'
      : nivel === 'Intermedio' ? 'intermediate'
      : nivel === 'Avanzado' ? 'advanced'
      : null;
    
    const mensaje = levelKey 
      ? t(`levels.${levelKey}Desc` as any)
      : `ℹ️ NIVEL: ${nivel}\n\nEste es un indicador del nivel de dificultad o experiencia recomendada para este método o ejercicio.`;
    alert(mensaje);
  };

  const getLevelLabel = (nivel: string): string => {
    if (nivel === 'Todos los niveles') return t('levels.allLevels');
    if (nivel === 'Principiante') return t('levels.beginner');
    if (nivel === 'Intermedio') return t('levels.intermediate');
    if (nivel === 'Avanzado') return t('levels.advanced');
    return nivel;
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
        <div className="container mx-auto max-w-5xl px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
            <p className="text-muted-foreground text-lg">
              {t('subtitle')}
            </p>
          </div>

          {/* Fundamental Concepts */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <span>{t('fundamentalConcepts')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {guia?.conceptos_fundamentales?.map?.((concepto: any, index: number) => (
                <div key={index}>
                  <h3 className="font-bold text-lg mb-2">{concepto?.titulo}</h3>
                  <p className="text-muted-foreground leading-relaxed">{concepto?.descripcion}</p>
                  {index < (guia?.conceptos_fundamentales?.length ?? 0) - 1 && (
                    <Separator className="mt-4" />
                  )}
                </div>
              )) ?? null}
            </CardContent>
          </Card>

          {/* How to Pronounce */}
          <Card className="mb-6 bg-blue-50 dark:bg-blue-950">
            <CardHeader>
              <CardTitle>{t('howToPronounce')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {guia?.como_pronunciar?.descripcion}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-background rounded-lg">
                  <div className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">
                    ✅ {t('correct')}
                  </div>
                  <p className="text-sm">{guia?.como_pronunciar?.correcto}</p>
                </div>
                <div className="p-4 bg-background rounded-lg">
                  <div className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">
                    ❌ {t('incorrect')}
                  </div>
                  <p className="text-sm">{guia?.como_pronunciar?.incorrecto}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                {guia?.como_pronunciar?.nota}
              </p>
            </CardContent>
          </Card>

          {/* Application Methods */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{t('applicationMethods')}</CardTitle>
              <CardDescription>{t('applicationMethodsSubtitle')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Active Methods */}
                <div>
                  <h3 className="font-bold text-lg mb-4">{t('activeMethods')}</h3>
                  <div className="space-y-4">
                    {guia?.metodos_aplicacion?.metodos_activos?.map?.((metodo: Metodo, index: number) => (
                      <Card key={index}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{metodo?.nombre}</CardTitle>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="gap-1 text-xs"
                              onClick={() => explicarNivel(metodo?.nivel)}
                            >
                              <Info className="h-3 w-3" />
                              {getLevelLabel(metodo?.nivel)}
                            </Button>
                          </div>
                          <CardDescription>{metodo?.descripcion}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ol className="list-decimal list-inside space-y-2">
                            {metodo?.pasos?.map?.((paso: string, pIndex: number) => (
                              <li key={pIndex} className="text-sm text-muted-foreground">{paso}</li>
                            )) ?? null}
                          </ol>
                        </CardContent>
                      </Card>
                    )) ?? null}
                  </div>
                </div>

                <Separator />

                {/* Passive Methods */}
                <div>
                  <h3 className="font-bold text-lg mb-4">{t('passiveMethods')}</h3>
                  <div className="space-y-4">
                    {guia?.metodos_aplicacion?.metodos_pasivos?.map?.((metodo: Metodo, index: number) => (
                      <Card key={index}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-lg">{metodo?.nombre}</CardTitle>
                              <CardDescription>{metodo?.descripcion}</CardDescription>
                            </div>
                            {metodo?.nivel && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="gap-1 text-xs ml-4"
                                onClick={() => explicarNivel(metodo?.nivel)}
                              >
                                <Info className="h-3 w-3" />
                                {getLevelLabel(metodo?.nivel)}
                              </Button>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <ul className="list-disc list-inside space-y-2">
                            {metodo?.pasos?.map?.((paso: string, pIndex: number) => (
                              <li key={pIndex} className="text-sm text-muted-foreground">{paso}</li>
                            )) ?? null}
                          </ul>
                        </CardContent>
                      </Card>
                    )) ?? null}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Basic Exercises */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{t('basicExercises')}</CardTitle>
              <CardDescription>{t('basicExercisesSubtitle')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {guia?.ejercicios_basicos?.map?.((ejercicio: Ejercicio, index: number) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <Badge variant="outline" className="mb-2">{t('exercise')} {ejercicio?.numero}</Badge>
                          <CardTitle className="text-xl mb-3">{ejercicio?.titulo}</CardTitle>
                          <div className="flex flex-col space-y-1 text-sm text-muted-foreground">
                            <div><strong>{t('sequence')}:</strong> <span className="font-mono text-primary">{ejercicio?.secuencia}</span></div>
                            <div><strong>{t('duration')}:</strong> {ejercicio?.duracion}</div>
                            <div><strong>{t('recommendedTime')}:</strong> {ejercicio?.tiempo_recomendado}</div>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="gap-1 text-xs shrink-0"
                          onClick={() => explicarNivel(ejercicio?.nivel)}
                        >
                          <Info className="h-3 w-3" />
                          {getLevelLabel(ejercicio?.nivel)}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-semibold mb-2">{t('steps')}:</h4>
                      <ol className="list-decimal list-inside space-y-2 mb-4">
                        {ejercicio?.pasos?.map?.((paso: string, pIndex: number) => (
                          <li key={pIndex} className="text-sm text-muted-foreground">{paso}</li>
                        )) ?? null}
                      </ol>
                      {ejercicio?.tip && (
                        <div className="p-3 bg-amber-50 dark:bg-amber-950 rounded-lg">
                          <div className="flex items-start space-x-2">
                            <Lightbulb className="h-4 w-4 text-amber-600 mt-0.5" />
                            <div>
                              <strong className="text-sm text-amber-900 dark:text-amber-100">{t('tip')}:</strong>
                              <p className="text-sm text-amber-800 dark:text-amber-200">{ejercicio?.tip}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )) ?? null}
              </div>
            </CardContent>
          </Card>

          {/* Optimal Mental State */}
          <Card className="mb-6 bg-purple-50 dark:bg-purple-950">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-primary" />
                <span>{t('optimalMentalState')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {guia?.estado_mental_optimo?.estados?.map?.((estado: any, index: number) => (
                <div key={index}>
                  <h3 className="font-bold text-lg mb-2">
                    {estado?.emoji} {estado?.nombre}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">{estado?.descripcion}</p>
                  <ul className="list-disc list-inside space-y-1">
                    {estado?.practicas?.map?.((practica: string, pIndex: number) => (
                      <li key={pIndex} className="text-sm text-muted-foreground">{practica}</li>
                    )) ?? null}
                  </ul>
                  {index < (guia?.estado_mental_optimo?.estados?.length ?? 0) - 1 && (
                    <Separator className="mt-4" />
                  )}
                </div>
              )) ?? null}
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                <span>{t('importantRecommendations')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {guia?.recomendaciones?.map?.((rec: any, index: number) => (
                  <div key={index}>
                    <h3 className="font-bold mb-2">{rec?.titulo}</h3>
                    <p className="text-sm text-muted-foreground">{rec?.descripcion}</p>
                    {index < (guia?.recomendaciones?.length ?? 0) - 1 && (
                      <Separator className="mt-4" />
                    )}
                  </div>
                )) ?? null}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
