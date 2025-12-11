"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PageLayout } from '@/components/page-layout';
import { WelcomeBanner } from '@/components/welcome-banner';
import { formatSequence } from '@/lib/utils';
import { SequenceSphere } from '@/components/sequence-sphere';
import {
  BookOpen,
  Hash,
  BookMarked,
  Video,
  Sparkles,
  Heart,
  Shield,
  Zap,
} from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: BookOpen,
      title: '20 Obras Fundamentales',
      description: 'Acceso completo a la biblioteca de libros con información detallada de cada obra.',
      href: '/libros',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Hash,
      title: '162 Secuencias Numéricas',
      description: 'Catálogo organizado por 8 categorías: salud, abundancia, amor y más.',
      href: '/secuencias',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: BookMarked,
      title: 'Guía Práctica Completa',
      description: 'Métodos, ejercicios paso a paso y recomendaciones para aplicar las enseñanzas.',
      href: '/guia',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Video,
      title: '10 Webinars Analizados',
      description: 'Contenido de webinars con enseñanzas clave y ejercicios prácticos.',
      href: '/webinars',
      color: 'from-orange-500 to-red-500',
    },
  ];

  const topSequences = [
    { code: '741', purpose: 'Solución inmediata', category: 'Manifestación' },
    { code: '1814321', purpose: 'Salud perfecta general', category: 'Salud' },
    { code: '71427321893', purpose: 'Prosperidad infinita', category: 'Abundancia' },
    { code: '2145432', purpose: 'Rejuvenecimiento', category: 'Belleza' },
    { code: '888 412 1289018', purpose: 'Amor incondicional', category: 'Amor' },
  ];

  return (
    <PageLayout>
        <WelcomeBanner />
        
        {/* Hero Section - CON EFECTOS CÓSMICOS */}
        <section className="relative overflow-hidden py-20 bg-gradient-cosmic">
          {/* Fondo animado con mesh gradient */}
          <div className="absolute inset-0 bg-mesh-gradient opacity-30 blur-3xl animate-gradient-x"></div>
          
          {/* Contenido */}
          <div className="relative z-10 container mx-auto max-w-7xl px-4">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-block mb-4 animate-fade-in-down">
                <div className="flex items-center space-x-2 glass-card text-white rounded-full px-4 py-2">
                  <Sparkles className="h-4 w-4 animate-glow" />
                  <span className="text-sm font-medium">Base de Datos Completa</span>
                </div>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.8)] animate-fade-in-up leading-tight">
                Grigori Grabovoi
              </h1>
              
              <p className="text-xl md:text-3xl text-white font-medium mb-8 animate-fade-in-up drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]" style={{animationDelay: '0.2s'}}>
                Explora las enseñanzas sobre secuencias numéricas, métodos de concentración
                y desarrollo armonioso ✨
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in" style={{animationDelay: '0.4s'}}>
                <Link href="/secuencias">
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg px-8 py-6 hover-lift shadow-2xl">
                    <Hash className="mr-2 h-6 w-6" />
                    Explorar Secuencias
                  </Button>
                </Link>
                <Link href="/guia">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-3 border-white bg-white text-purple-700 hover:bg-purple-50 backdrop-blur-sm font-bold text-lg px-8 py-6 shadow-xl">
                    <BookMarked className="mr-2 h-6 w-6" />
                    Guía Práctica
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* About Section - CON EFECTOS DE GLASSMORPHISM */}
        <section className="relative py-16 bg-gradient-aurora">
          {/* Fondo con patrón de estrellas */}
          <div className="absolute inset-0 bg-stars opacity-10"></div>
          
          <div className="relative z-10 container mx-auto max-w-7xl px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center text-white drop-shadow-[0_2px_20px_rgba(255,255,255,0.3)]">Sobre Grigori Grabovoi</h2>
              
              <Card className="glass-card hover-lift border-2 border-white/30">
                <CardContent className="pt-6">
                  <p className="text-white text-lg leading-relaxed mb-4">
                    <strong className="text-white font-bold text-xl">Grigori Petrovich Grabovoi</strong> (nacido el 14 de noviembre de 1963)
                    es un matemático, académico y autor ruso-kazajo conocido mundialmente por sus
                    enseñanzas sobre secuencias numéricas para sanación, métodos de concentración
                    y desarrollo armonioso.
                  </p>
                  <p className="text-white text-lg leading-relaxed mb-4">
                    Ha dedicado su vida al desarrollo de tecnologías de salvación y desarrollo
                    eterno. Su doctrina se centra en la &quot;Salvación General y el Desarrollo
                    Armonioso&quot;, enfatizando que cada persona puede ser dueña de su destino mediante
                    el control consciente de los eventos de la vida.
                  </p>
                  
                  {/* Estadísticas con efectos de glow */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    <div className="text-center p-6 glass-card rounded-xl hover-scale cursor-pointer glow-cosmic border-2 border-cosmic-400/50">
                      <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-cosmic-500 to-purple-600 rounded-full flex items-center justify-center animate-glow shadow-xl">
                        <BookOpen className="h-10 w-10 text-white" />
                      </div>
                      <div className="text-5xl font-bold text-white mb-2 drop-shadow-lg">20+</div>
                      <div className="text-base font-semibold text-white">Libros Publicados</div>
                    </div>
                    
                    <div className="text-center p-6 glass-card rounded-xl hover-scale cursor-pointer glow-aurora border-2 border-aurora-400/50">
                      <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-aurora-500 to-cyan-600 rounded-full flex items-center justify-center animate-glow shadow-xl">
                        <Hash className="h-10 w-10 text-white" />
                      </div>
                      <div className="text-5xl font-bold text-white mb-2 drop-shadow-lg">162</div>
                      <div className="text-base font-semibold text-white">Secuencias Numéricas</div>
                    </div>
                    
                    <div className="text-center p-6 glass-card rounded-xl hover-scale cursor-pointer glow-divine border-2 border-divine-400/50">
                      <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-divine-500 to-yellow-600 rounded-full flex items-center justify-center animate-glow shadow-xl">
                        <Zap className="h-10 w-10 text-white" />
                      </div>
                      <div className="text-5xl font-bold text-white mb-2 drop-shadow-lg">8</div>
                      <div className="text-base font-semibold text-white">Categorías de Aplicación</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section - CON HOVER EFFECTS */}
        <section className="py-20 bg-background">
          <div className="container mx-auto max-w-7xl px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Explora la Base de Datos
            </h2>
            <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Acceso completo a libros, secuencias, guías prácticas y webinars
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features?.map?.((feature, index) => {
                const Icon = feature?.icon;
                return (
                  <Link key={index} href={feature?.href ?? '#'}>
                    <Card className="h-full hover-lift card-interactive cursor-pointer group border-2 hover:border-cosmic-500">
                      <CardHeader>
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature?.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform animate-glow`}>
                          {Icon && <Icon className="h-7 w-7 text-white" />}
                        </div>
                        <CardTitle className="text-xl group-hover:text-cosmic-600 transition-colors">
                          {feature?.title}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {feature?.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                );
              }) ?? null}
            </div>
          </div>
        </section>

        {/* Top Sequences - CON EFECTOS DE GLOW */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto max-w-7xl px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Top 5 Secuencias Esenciales
            </h2>
            <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto font-medium">
              Las secuencias más poderosas para transformar tu vida ✨
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {topSequences?.map?.((seq, index) => (
                <div key={index} className="flex flex-col items-center gap-4">
                  <SequenceSphere sequence={seq?.code ?? ''} size="xl" />
                  <div className="text-center space-y-2">
                    <div className="text-sm font-bold px-3 py-1.5 rounded-full bg-gradient-to-r from-cosmic-500 to-purple-600 text-white shadow-md inline-block">
                      {seq?.category}
                    </div>
                    <p className="text-base font-semibold text-foreground px-2">
                      {seq?.purpose}
                    </p>
                  </div>
                </div>
              )) ?? null}
            </div>
            
            <div className="text-center mt-12">
              <Link href="/secuencias">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white hover-scale shadow-2xl text-lg px-8 py-6 font-bold">
                  Ver Todas las Secuencias
                  <Hash className="ml-2 h-6 w-6" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section - CON EFECTOS DIVINOS */}
        <section className="relative py-20 bg-gradient-divine overflow-hidden">
          {/* Fondo animado */}
          <div className="absolute inset-0 bg-mesh-gradient opacity-20 blur-3xl animate-gradient-y"></div>
          
          {/* Contenido */}
          <div className="relative z-10 container mx-auto max-w-4xl px-4 text-center">
            <div className="inline-block mb-6 animate-float">
              <Sparkles className="h-16 w-16 text-white mx-auto drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]" />
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-[0_2px_20px_rgba(255,255,255,0.3)]">
              Comienza Tu Viaje de Transformación ✨
            </h2>
            
            <p className="text-xl md:text-2xl mb-12 text-white font-medium max-w-2xl mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
              Inicia sesión para guardar tus secuencias y libros favoritos, y accede a una
              experiencia personalizada para tu desarrollo espiritual.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/login">
                <Button size="lg" className="w-full sm:w-auto bg-white text-yellow-700 hover:bg-yellow-50 hover-lift shadow-2xl text-lg px-8 py-6 font-bold">
                  <Shield className="mr-2 h-6 w-6" />
                  Iniciar Sesión
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-3 border-white bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm text-lg px-8 py-6 font-bold shadow-xl">
                  <Sparkles className="mr-2 h-6 w-6" />
                  Crear Cuenta
                </Button>
              </Link>
            </div>
          </div>
        </section>
    </PageLayout>
  );
}
