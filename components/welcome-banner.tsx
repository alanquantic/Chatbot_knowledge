"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, Sparkles, ArrowRight } from 'lucide-react';

export function WelcomeBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user has seen the welcome banner
    const hasSeenWelcome = localStorage.getItem('grabovoi_welcome_seen');
    if (!hasSeenWelcome) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleStartTour = () => {
    router.push('/bienvenida');
  };

  const handleDismiss = () => {
    localStorage.setItem('grabovoi_welcome_seen', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-x-0 top-28 z-50 flex justify-center px-3 sm:top-20 sm:px-4"
        >
          <Card className="relative w-full max-w-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 shadow-2xl">
            <CardContent className="p-4 sm:p-6">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-1 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-start sm:gap-0 sm:space-x-4">
                <div className="flex-shrink-0 sm:mt-1">
                  <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                    <Sparkles className="h-6 w-6" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold mb-2">
                    ¡Bienvenido a la Plataforma Grabovoi!
                  </h3>
                  <p className="text-sm sm:text-base text-white/90 mb-4">
                    Descubre 162 secuencias numéricas, 20 libros, webinars y herramientas prácticas. 
                    ¿Te gustaría hacer un tour rápido?
                  </p>
                  
                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Button
                      onClick={handleStartTour}
                      size="sm"
                      className="w-full bg-white text-purple-600 hover:bg-white/90 sm:w-auto"
                    >
                      Hacer el tour
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                    <Button
                      onClick={handleDismiss}
                      size="sm"
                      variant="ghost"
                      className="w-full text-white hover:bg-white/20 sm:w-auto"
                    >
                      No mostrar de nuevo
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
