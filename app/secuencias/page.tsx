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
import { formatSequence } from '@/lib/utils';
import { SequenceSphere } from '@/components/sequence-sphere';
import { SequenceSkeletonGrid } from '@/components/sequence-skeleton';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Search, Hash, Sparkles, Info } from 'lucide-react';

interface Sequence {
  secuencia: string;
  proposito: string;
  fuente: string;
  categoria: string;
}

const categoryIcons: Record<string, string> = {
  'salud_fisica': '💊',
  'salud_mental_emocional': '🧠',
  'abundancia_prosperidad': '💰',
  'relaciones_amor': '❤️',
  'desarrollo_espiritual': '🌌',
  'manifestacion_general': '✨',
  'rejuvenecimiento_belleza': '🌸',
  'proteccion_armonizacion': '🛡️',
};

const categoryNames: Record<string, string> = {
  'salud_fisica': 'Salud Física',
  'salud_mental_emocional': 'Salud Mental y Emocional',
  'abundancia_prosperidad': 'Abundancia y Prosperidad',
  'relaciones_amor': 'Relaciones y Amor',
  'desarrollo_espiritual': 'Desarrollo Espiritual',
  'manifestacion_general': 'Manifestación General',
  'rejuvenecimiento_belleza': 'Rejuvenecimiento y Belleza',
  'proteccion_armonizacion': 'Protección y Armonización',
};

export default function SecuenciasPage() {
  const [sequences, setSequences] = useState<Sequence[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSequences();
  }, []);

  const loadSequences = async () => {
    try {
      const response = await fetch('/data/grabovoi_database.json');
      const data = await response.json();
      
      // Flatten sequences from all categories
      const allSequences: Sequence[] = [];
      Object.entries(data?.secuencias_numericas_organizadas ?? {})?.forEach?.(([categoria, seqsObj]: [string, any]) => {
        // Convert object to array using Object.values()
        const seqsArray = Object.values(seqsObj || {});
        seqsArray?.forEach?.((seq: any) => {
          allSequences.push({
            ...seq,
            categoria,
          });
        });
      });
      
      setSequences(allSequences);
    } catch (error) {
      console.error('Error loading sequences:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', ...Object.keys(categoryNames)];

  const filteredSequences = sequences?.filter?.(seq => {
    const matchesSearch = 
      seq?.proposito?.toLowerCase?.()?.includes?.(searchTerm?.toLowerCase?.() ?? '') ||
      seq?.secuencia?.includes?.(searchTerm ?? '');
    const matchesCategory = selectedCategory === 'all' || seq?.categoria === selectedCategory;
    return matchesSearch && matchesCategory;
  }) ?? [];

  const topSequences = [
    { secuencia: '741', proposito: 'Solución inmediata', categoria: 'manifestacion_general', tooltip: 'Úsala cuando necesites resolver cualquier situación urgente' },
    { secuencia: '1814321', proposito: 'Salud perfecta general', categoria: 'salud_fisica', tooltip: 'Para mantenimiento y optimización de tu salud integral' },
    { secuencia: '71427321893', proposito: 'Prosperidad infinita', categoria: 'abundancia_prosperidad', tooltip: 'Atrae abundancia económica y material a tu vida' },
    { secuencia: '2145432', proposito: 'Rejuvenecimiento general', categoria: 'rejuvenecimiento_belleza', tooltip: 'Restaura y mantiene tu juventud y vitalidad' },
    { secuencia: '888 412 1289018', proposito: 'Amor incondicional', categoria: 'relaciones_amor', tooltip: 'Desarrolla y fortalece relaciones basadas en amor puro' },
  ];

  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 py-8">
        <div className="container mx-auto max-w-7xl px-4">
          <Breadcrumbs />
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Secuencias Numéricas
            </h1>
            <p className="text-muted-foreground text-lg">
              Catálogo completo de 187 secuencias organizadas en 8 categorías
            </p>
          </div>

          {/* Top 5 Essential Sequences */}
          <Card className="mb-8 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <span>Top 5 Secuencias Esenciales</span>
              </CardTitle>
              <CardDescription>Las secuencias más importantes para comenzar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {topSequences?.map?.((seq, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <div className="flex flex-col items-center gap-3 cursor-help">
                        <SequenceSphere sequence={seq?.secuencia ?? ''} size="lg" />
                        <div className="text-center space-y-1">
                          <div className="text-xs text-muted-foreground">
                            {categoryIcons?.[seq?.categoria] ?? ''} {categoryNames?.[seq?.categoria]}
                          </div>
                          <p className="text-sm font-medium">{seq?.proposito}</p>
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{seq?.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                )) ?? null}
              </div>
            </CardContent>
          </Card>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Buscar por propósito o número..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      // Search is already reactive, but this provides feedback
                      e.currentTarget.blur();
                    }
                  }}
                  className="pl-10"
                />
              </div>
              {searchTerm && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setSearchTerm('')}
                  className="shrink-0"
                  title="Limpiar búsqueda"
                >
                  <span className="sr-only">Limpiar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </Button>
              )}
              <Button
                variant="default"
                className="shrink-0 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                onClick={() => {
                  // Search is already reactive, but this provides visual feedback
                  if (filteredSequences?.length === 0) {
                    // Could show a toast or message here
                  }
                }}
              >
                <Search className="h-4 w-4 mr-2" />
                Buscar
              </Button>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>
                {searchTerm ? (
                  <>
                    Mostrando <strong className="text-foreground">{filteredSequences?.length}</strong> de {sequences?.length} secuencias
                  </>
                ) : (
                  <>Total: <strong className="text-foreground">{sequences?.length}</strong> secuencias</>
                )}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories?.map?.(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="flex items-center space-x-1"
                >
                  {category !== 'all' && <span>{categoryIcons?.[category] ?? ''}</span>}
                  <span>{category === 'all' ? 'Todas' : categoryNames?.[category]}</span>
                </Button>
              )) ?? null}
            </div>
          </div>

          {/* Sequences Grid */}
          {loading ? (
            <SequenceSkeletonGrid count={9} />
          ) : filteredSequences?.length === 0 ? (
            <div className="text-center py-12">
              <Hash className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No se encontraron secuencias</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSequences?.map?.((seq, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <Badge variant="secondary" className="text-xs">
                        {categoryIcons?.[seq?.categoria] ?? ''} {categoryNames?.[seq?.categoria]}
                      </Badge>
                      <FavoriteButton itemType="sequence" itemId={seq?.secuencia} />
                    </div>
                    <div className="flex justify-center my-4">
                      <SequenceSphere sequence={seq?.secuencia ?? ''} size="lg" />
                    </div>
                    <CardDescription className="text-sm text-center mt-4">{seq?.proposito}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground text-center">
                      <strong>Fuente:</strong> {seq?.fuente}
                    </div>
                  </CardContent>
                </Card>
              )) ?? null}
            </div>
          )}

          {/* Stats */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            Mostrando {filteredSequences?.length ?? 0} de {sequences?.length ?? 0} secuencias
          </div>
        </div>
      </main>
      <Footer />
    </div>
    </TooltipProvider>
  );
}
