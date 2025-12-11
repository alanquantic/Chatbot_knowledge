"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  BookOpen, 
  Hash, 
  Video, 
  Microscope, 
  Heart,
  BookMarked,
  ChevronRight,
  ChevronLeft,
  Check,
  X
} from 'lucide-react';
import { SequenceSphere } from '@/components/sequence-sphere';

const tourSteps = [
  {
    title: '¡Bienvenido a la Plataforma Grabovoi!',
    description: 'Tu portal completo para las enseñanzas de Grigori Grabovoi. Aquí encontrarás secuencias numéricas, libros, webinars y herramientas prácticas.',
    icon: Sparkles,
    gradient: 'from-purple-500 to-pink-500',
    features: [
      '162 secuencias numéricas organizadas',
      '20 libros digitalizados y analizados',
      '10 webinars educativos',
      'Dispositivo PRK-1U integrado',
    ],
  },
  {
    title: 'Secuencias Numéricas',
    description: 'Accede a 162 secuencias organizadas en 8 categorías: salud, abundancia, amor, desarrollo espiritual y más.',
    icon: Hash,
    gradient: 'from-blue-500 to-cyan-500',
    demo: (
      <div className="flex justify-center gap-4 my-6">
        <SequenceSphere sequence="741" size="md" />
        <SequenceSphere sequence="1814321" size="md" />
        <SequenceSphere sequence="71427321893" size="md" />
      </div>
    ),
    features: [
      'Búsqueda y filtros avanzados',
      'Favoritos personalizados',
      'Visualización en esferas 3D',
      'Información detallada de fuentes',
    ],
  },
  {
    title: 'Biblioteca Digital',
    description: 'Explora 20 libros de Grigori Grabovoi con análisis profundo, estructuras de capítulos y conexiones entre obras.',
    icon: BookOpen,
    gradient: 'from-green-500 to-emerald-500',
    features: [
      'Libros completos digitalizados',
      'Análisis por IA de contenido',
      'Conexiones entre libros',
      'Ejercicios prácticos extraídos',
    ],
  },
  {
    title: 'Dispositivo PRK-1U',
    description: 'Conoce el dispositivo oficial de Grabovoi con protocolos, ejercicios y acceso directo a la plataforma de práctica.',
    icon: Microscope,
    gradient: 'from-orange-500 to-red-500',
    features: [
      'Guía completa de uso',
      'Protocolos de concentración',
      'Acceso a plataforma oficial',
      'Ejercicios estructurados',
    ],
  },
  {
    title: 'Herramientas Personales',
    description: 'Guarda tus favoritos, lleva un diario de manifestaciones y accede a diseños visuales para tus prácticas.',
    icon: Heart,
    gradient: 'from-pink-500 to-rose-500',
    features: [
      'Sistema de favoritos',
      'Diario con análisis IA',
      'Diseños personalizados',
      'Seguimiento de progreso',
    ],
  },
  {
    title: '¡Comienza tu Viaje!',
    description: 'Todo está listo. Explora la plataforma y comienza a trabajar con las enseñanzas de Grabovoi.',
    icon: Check,
    gradient: 'from-violet-500 to-purple-500',
    cta: true,
  },
];

export default function BienvenidaPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  const step = tourSteps[currentStep];
  const Icon = step?.icon;

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    // Set a flag in localStorage to not show welcome again
    if (typeof window !== 'undefined') {
      localStorage.setItem('grabovoi_welcome_seen', 'true');
    }
    router.push('/');
  };

  const handleSkip = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('grabovoi_welcome_seen', 'true');
    }
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Skip Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleSkip}
        className="absolute top-4 right-4"
      >
        <X className="h-4 w-4 mr-2" />
        Saltar tour
      </Button>

      <div className="w-full max-w-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden shadow-2xl">
              {/* Progress Bar */}
              <div className="h-2 bg-muted">
                <div
                  className={`h-full bg-gradient-to-r ${step?.gradient} transition-all duration-300`}
                  style={{ width: `${((currentStep + 1) / tourSteps.length) * 100}%` }}
                />
              </div>

              <CardHeader className="space-y-4">
                {/* Icon */}
                <div className="flex justify-center">
                  <div className={`h-20 w-20 rounded-full bg-gradient-to-br ${step?.gradient} flex items-center justify-center`}>
                    {Icon && <Icon className="h-10 w-10 text-white" />}
                  </div>
                </div>

                {/* Title */}
                <CardTitle className="text-3xl text-center">
                  {step?.title}
                </CardTitle>

                {/* Description */}
                <CardDescription className="text-center text-base">
                  {step?.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6 pb-8">
                {/* Demo Component */}
                {step?.demo && step.demo}

                {/* Features List */}
                {step?.features && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {step.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50"
                      >
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* CTA Buttons for last step */}
                {step?.cta && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => router.push('/guia')}
                      className="w-full"
                    >
                      <BookMarked className="h-5 w-5 mr-2" />
                      Guía Rápida
                    </Button>
                    <Button
                      size="lg"
                      onClick={() => router.push('/secuencias')}
                      className={`w-full bg-gradient-to-r ${step.gradient} hover:opacity-90`}
                    >
                      <Hash className="h-5 w-5 mr-2" />
                      Ver Secuencias
                    </Button>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex items-center justify-between pt-6">
                  <Button
                    variant="outline"
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Anterior
                  </Button>

                  {/* Step Indicators */}
                  <div className="flex gap-2">
                    {tourSteps.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentStep(index)}
                        className={`h-2 rounded-full transition-all ${
                          index === currentStep 
                            ? 'w-8 bg-primary' 
                            : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                        }`}
                        aria-label={`Ir al paso ${index + 1}`}
                      />
                    ))}
                  </div>

                  <Button
                    onClick={handleNext}
                    className={currentStep === tourSteps.length - 1 ? `bg-gradient-to-r ${step?.gradient}` : ''}
                  >
                    {currentStep === tourSteps.length - 1 ? 'Comenzar' : 'Siguiente'}
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
