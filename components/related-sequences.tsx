"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SequenceSphere } from '@/components/sequence-sphere';
import { FavoriteButton } from '@/components/favorite-button';
import { Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Sequence {
  secuencia: string;
  proposito: string;
  fuente: string;
  categoria: string;
}

interface RelatedSequencesProps {
  currentSequence: string;
  category: string;
  allSequences: Sequence[];
  maxItems?: number;
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

export function RelatedSequences({ 
  currentSequence, 
  category, 
  allSequences, 
  maxItems = 3 
}: RelatedSequencesProps) {
  const t = useTranslations('relatedSequences');
  const tCat = useTranslations('sequences.categories');

  const getCategoryName = (key: string): string => {
    return tCat(key as any) || key;
  };

  // Filter sequences by same category, excluding the current one
  const relatedSequences = allSequences
    ?.filter?.(seq => 
      seq?.categoria === category && 
      seq?.secuencia !== currentSequence
    )
    ?.slice?.(0, maxItems) ?? [];

  if (relatedSequences.length === 0) {
    return null;
  }

  return (
    <Card className="mt-8 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <span>{t('title')}</span>
        </CardTitle>
        <CardDescription>
          {t('moreFrom')} {categoryIcons?.[category]} {getCategoryName(category)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedSequences?.map?.((seq, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <Badge variant="secondary" className="text-xs">
                    {categoryIcons?.[seq?.categoria] ?? ''} {getCategoryName(seq?.categoria)}
                  </Badge>
                  <FavoriteButton itemType="sequence" itemId={seq?.secuencia} />
                </div>
                <div className="flex justify-center my-4">
                  <SequenceSphere sequence={seq?.secuencia ?? ''} size="md" />
                </div>
                <CardDescription className="text-sm text-center mt-4">
                  {seq?.proposito}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground text-center">
                  <strong>{t('source')}:</strong> {seq?.fuente}
                </div>
              </CardContent>
            </Card>
          )) ?? null}
        </div>
      </CardContent>
    </Card>
  );
}
