"use client";

import { PageLayout } from '@/components/page-layout';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Microscope,
  Lightbulb,
  Sparkles,
  Target,
  Clock,
  Heart,
  Brain,
  TrendingUp,
  Shield,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  BookOpen,
  Eye,
  Circle,
  ArrowRight,
  Zap,
  Smile,
  Focus,
  Palette,
  Calendar,
  FileText,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { formatSequence } from '@/lib/utils';
import { SequenceSphere } from '@/components/sequence-sphere';

export default function PRK1UPage() {
  return (
    <PageLayout>
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <Breadcrumbs />
        
        {/* Header */}
        <div className="mb-12 text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 text-white">
              <Microscope className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
            Dispositivo PRK-1U
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tecnología Revolucionaria para el Desarrollo de Concentraciones
          </p>
        </div>
      {/* Introducción */}
      <Card className="border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-600" />
            ¿Qué es el PRK-1U?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg leading-relaxed">
            El <strong>PRK-1U</strong> es un dispositivo tecnológico revolucionario desarrollado por el Dr. Grigori Grabovoi,
            basado en sus patentes científicas registradas. Es una herramienta única en el mundo diseñada para{' '}
            <strong className="text-purple-600 dark:text-purple-400">amplificar las concentraciones mentales</strong> del usuario.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="flex items-start gap-3 p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg">
              <Target className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">Control de Eventos</h4>
                <p className="text-sm text-muted-foreground">
                  Facilita el control consciente de eventos y la manifestación de objetivos
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg">
              <Heart className="h-5 w-5 text-pink-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">Restauración de Salud</h4>
                <p className="text-sm text-muted-foreground">
                  Normalización de funciones corporales y regeneración celular
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg">
              <Brain className="h-5 w-5 text-indigo-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">Desarrollo de Clarividencia</h4>
                <p className="text-sm text-muted-foreground">
                  Expansión de conciencia y capacidades perceptivas
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg">
              <Sparkles className="h-5 w-5 text-yellow-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">Vida Eterna</h4>
                <p className="text-sm text-muted-foreground">
                  Objetivo final: desarrollo armonioso y vida eterna
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Acceso Directo a Plataforma de Práctica */}
      <Card className="mt-8 border-2 border-green-500 dark:border-green-600 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950/30 dark:via-emerald-950/30 dark:to-teal-950/30 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <div className="p-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg">
                <Zap className="h-10 w-10" />
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400">
                ¡Practica Ahora en Nuestra Plataforma Online!
              </h3>
              <p className="text-muted-foreground mb-4">
                Accede a nuestro simulador interactivo del PRK-1U y comienza a realizar los 4 ejercicios fundamentales de manera guiada en tiempo real.
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Interfaz Interactiva
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Ejercicios Guiados
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Gratis
                </span>
              </div>
            </div>

            <div className="flex-shrink-0">
              <a
                href="https://grigori-grabovoi.tech/online-test"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <span className="text-lg">Acceder a Plataforma</span>
                <ExternalLink className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-green-200 dark:border-green-800">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div className="p-3 bg-white/60 dark:bg-gray-900/60 rounded-lg">
                <Sparkles className="h-6 w-6 text-pink-600 mx-auto mb-2" />
                <p className="text-xs font-semibold">Rejuvenecimiento</p>
              </div>
              <div className="p-3 bg-white/60 dark:bg-gray-900/60 rounded-lg">
                <Target className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="text-xs font-semibold">Control de Eventos</p>
              </div>
              <div className="p-3 bg-white/60 dark:bg-gray-900/60 rounded-lg">
                <Eye className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <p className="text-xs font-semibold">Clarividencia</p>
              </div>
              <div className="p-3 bg-white/60 dark:bg-gray-900/60 rounded-lg">
                <Brain className="h-6 w-6 text-indigo-600 mx-auto mb-2" />
                <p className="text-xs font-semibold">Pronóstico</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs principales */}
      <Tabs defaultValue="funcionamiento" className="mt-8">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-7">
          <TabsTrigger value="funcionamiento">Funcionamiento</TabsTrigger>
          <TabsTrigger value="versiones">Versiones</TabsTrigger>
          <TabsTrigger value="metodos">Métodos</TabsTrigger>
          <TabsTrigger value="instrucciones">Instrucciones</TabsTrigger>
          <TabsTrigger value="protocolos">Protocolos</TabsTrigger>
          <TabsTrigger value="adquisicion">Adquisición</TabsTrigger>
          <TabsTrigger value="practica" className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30">
            <span className="flex items-center gap-1">
              <Zap className="h-4 w-4" />
              Práctica Online
            </span>
          </TabsTrigger>
        </TabsList>

        {/* Funcionamiento */}
        <TabsContent value="funcionamiento" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-600" />
                Cómo Funciona el PRK-1U
              </CardTitle>
              <CardDescription>
                Base científica y principios de operación
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Principio Fundamental</h3>
                <p className="text-muted-foreground leading-relaxed">
                  El dispositivo opera sobre el principio de que el <strong>pensamiento humano emite una señal
                  luminosa débil (bioseñal)</strong> que puede existir en dos estados cuánticos simultáneamente.
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-4">Proceso Tecnológico</h3>
                <div className="space-y-4">
                  {[
                    {
                      step: '1. Captura',
                      desc: 'Cuando concentras tu pensamiento en el PRK-1U, la radiación del pensamiento (que incluye tu objetivo) se dirige a las lentes del dispositivo',
                      color: 'text-blue-600'
                    },
                    {
                      step: '2. Amplificación',
                      desc: 'El dispositivo procesa estas señales a través de transmisiones ópticas de luz',
                      color: 'text-purple-600'
                    },
                    {
                      step: '3. Potenciación',
                      desc: 'Agrega campos electromagnéticos mediante componentes microelectrónicos',
                      color: 'text-pink-600'
                    },
                    {
                      step: '4. Devolución',
                      desc: 'La bioseñal amplificada es devuelta al usuario, intensificando el impacto sobre los eventos',
                      color: 'text-green-600'
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm`}>
                        {index + 1}
                      </div>
                      <div>
                        <h4 className={`font-semibold mb-1 ${item.color}`}>{item.step}</h4>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-4">Componentes Principales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'Sistema Óptico de Tres Lentes', desc: 'En la parte superior, de diferentes diámetros' },
                    { name: 'Unidad Óptica Interna', desc: 'Para concentraciones de eventos pasados' },
                    { name: 'Componentes Microelectrónicos', desc: 'Generan campos electromagnéticos' },
                    { name: 'Placas Metálicas con Números', desc: 'Para trabajar con secuencias numéricas (0-9)' },
                    { name: 'Inteligencia Artificial Mecánica', desc: 'Adapta el dispositivo según la carga' },
                    { name: 'Materia de Eternidad', desc: 'Influencia positiva en individuo y entorno' },
                  ].map((component, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:border-purple-400 transition-colors">
                      <h4 className="font-semibold mb-2">{component.name}</h4>
                      <p className="text-sm text-muted-foreground">{component.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Rango de Acción</h4>
                    <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
                      <li>• <strong>Dispositivo físico</strong>: 25 metros alrededor de su ubicación</li>
                      <li>• Continúa interactuando con tu bioseñal <strong>incluso cuando duermes</strong></li>
                      <li>• Funciona 24/7 cuando está encendido</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Versiones */}
        <TabsContent value="versiones" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* PRK-1U Físico */}
            <Card className="border-purple-200 dark:border-purple-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Microscope className="h-5 w-5 text-purple-600" />
                  PRK-1U Físico
                </CardTitle>
                <CardDescription>Versión original del dispositivo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Características:</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>✓ Tres lentes ópticas superiores</li>
                    <li>✓ Números del 0-9 en placas metálicas</li>
                    <li>✓ Operación continua sin límites</li>
                    <li>✓ Configuración para hasta 8 personas</li>
                    <li>✓ Radio de 25 metros</li>
                    <li>✓ <strong>Normalización pasiva 24/7</strong></li>
                  </ul>
                </div>
                <Separator />
                <div>
                  <Badge variant="secondary" className="mb-2">Sublicencia 4 años</Badge>
                  <p className="text-xl font-bold text-purple-600">€11,050</p>
                  <p className="text-xs text-muted-foreground">(aprox. IVA incluido)</p>
                </div>
              </CardContent>
            </Card>

            {/* PRK-1U Online */}
            <Card className="border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  PRK-1U Online
                </CardTitle>
                <CardDescription>Acceso remoto vía IVIDEON</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Características:</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>✓ Acceso 24/7 desde cualquier lugar</li>
                    <li>✓ Visualización en tiempo real</li>
                    <li>✓ Configuración personalizada</li>
                    <li>✓ <strong>Dispositivos médicos gratuitos</strong></li>
                    <li>✓ Prueba gratuita 2 días</li>
                    <li>✓ No requiere inversión inicial</li>
                  </ul>
                </div>
                <Separator />
                <div>
                  <Badge className="mb-2 bg-green-600">Prueba Gratis</Badge>
                  <p className="text-xl font-bold text-blue-600">Variable</p>
                  <p className="text-xs text-muted-foreground">Dispositivos médicos disponibles gratis</p>
                </div>
              </CardContent>
            </Card>

            {/* PRK-1UM Avanzado */}
            <Card className="border-yellow-200 dark:border-yellow-800 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-yellow-600" />
                  PRK-1UM Avanzado
                </CardTitle>
                <CardDescription>Nueva Generación</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 rounded-lg p-3 mb-4">
                  <p className="font-bold text-yellow-900 dark:text-yellow-100 text-center">
                    ⚡ 700x Más Potente ⚡
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Características:</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>✓ Láser dual inteligente</li>
                    <li>✓ Pantalla OLED digital</li>
                    <li>✓ IA mejorada</li>
                    <li>✓ Portátil (20×16×6.5 cm)</li>
                    <li>✓ Batería interna</li>
                    <li>✓ Actualizable por software</li>
                  </ul>
                </div>
                <Separator />
                <div>
                  <Badge variant="secondary" className="mb-2">Sublicencia 4 años</Badge>
                  <p className="text-xl font-bold text-orange-600">€10,050</p>
                  <p className="text-xs text-muted-foreground">(aprox. IVA incluido)</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Métodos */}
        <TabsContent value="metodos" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Métodos de Concentración con PRK-1U</CardTitle>
              <CardDescription>
                Cuatro métodos principales para trabajar con el dispositivo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {[
                  {
                    name: 'Método 1: Presente y Futuro',
                    icon: '🔮',
                    uso: 'Para eventos actuales o que deseas materializar en el futuro',
                    direccion: 'Movimiento ANTIHORARIO ↺ (menor a mayor diámetro)',
                    pasos: [
                      'Definir y visualizar objetivo claramente',
                      'Concentración en lente menor',
                      'Insertar objetivo mentalmente en la lente',
                      'Movimiento antihorario por todas las lentes',
                      'Repetir 3-12 ciclos',
                      'Observar sensaciones y documentar',
                    ],
                    duracion: 'Mínimo 8 min, ideal 20 min, óptimo 1 hora+',
                    color: 'border-blue-200 dark:border-blue-800'
                  },
                  {
                    name: 'Método 2: Eventos Pasados',
                    icon: '⏮️',
                    uso: 'Para normalizar, sanar o transformar eventos del pasado',
                    direccion: 'Movimiento HORARIO ↻ (menor a mayor diámetro)',
                    pasos: [
                      'Identificar evento pasado a normalizar',
                      'Visualizar versión transformada y armoniosa',
                      'Sintonizar con unidad óptica interna',
                      'Movimiento horario por las lentes',
                      'Sentir la normalización del evento',
                      'Agradecer por la transformación',
                    ],
                    duracion: '20-30 minutos para eventos significativos',
                    color: 'border-purple-200 dark:border-purple-800'
                  },
                  {
                    name: 'Método 3: Secuencias Numéricas',
                    icon: '🔢',
                    uso: 'Combinar secuencias de Grabovoi con lentes del PRK-1U',
                    direccion: 'Concentración en dígito + lente adyacente',
                    pasos: [
                      'Seleccionar secuencia apropiada',
                      'Visualizar primer dígito (plata, 3D, en movimiento)',
                      'Localizar dígito en placas metálicas',
                      'Concentración doble (dígito + lente adyacente)',
                      'Insertar dígito mentalmente en lente',
                      'Repetir secuencia completa 3-7 veces',
                    ],
                    duracion: 'Variable según secuencia',
                    extra: '💡 Potenciación: Agregar fecha actual (DDMMAAAA) intensifica el efecto',
                    color: 'border-green-200 dark:border-green-800'
                  },
                  {
                    name: 'Método 4: Objetivo Puro',
                    icon: '🎯',
                    uso: 'Método directo sin secuencias numéricas',
                    direccion: 'Movimiento ANTIHORARIO con objetivo visualizado',
                    pasos: [
                      'Definir y escribir objetivo claramente',
                      'Visualización detallada (imágenes, emociones)',
                      'Concentración en lente menor',
                      'Insertar visualización completa en lente',
                      'Mover hacia izquierda (antihorario)',
                      'Mantener visualización constante',
                      'Finalizar con agradecimiento',
                    ],
                    duracion: 'Flexible',
                    extra: '✅ Ideal para principiantes',
                    color: 'border-yellow-200 dark:border-yellow-800'
                  },
                ].map((metodo, index) => (
                  <Card key={index} className={`${metodo.color}`}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <span className="text-3xl">{metodo.icon}</span>
                        <div>
                          <div>{metodo.name}</div>
                          <CardDescription className="mt-1">{metodo.uso}</CardDescription>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="text-sm font-semibold">↻ Dirección: <span className="font-normal">{metodo.direccion}</span></p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3">Pasos:</h4>
                        <div className="space-y-2">
                          {metodo.pasos.map((paso, pIndex) => (
                            <div key={pIndex} className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold">
                                {pIndex + 1}
                              </div>
                              <p className="text-sm text-muted-foreground pt-0.5">{paso}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-semibold">Duración:</span>
                        <span className="text-sm text-muted-foreground">{metodo.duracion}</span>
                      </div>

                      {metodo.extra && (
                        <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                          <p className="text-sm text-yellow-900 dark:text-yellow-100">{metodo.extra}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Instrucciones Prácticas */}
        <TabsContent value="instrucciones" className="space-y-6 mt-6">
          
          {/* Alerta introductoria */}
          <Card className="border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                <BookOpen className="h-6 w-6" />
                Guía Práctica de Uso del PRK-1U
              </CardTitle>
              <CardDescription>
                Instrucciones paso a paso para conectar con el dispositivo y realizar los 4 ejercicios fundamentales
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Paso 1: Conexión Inicial */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Circle className="h-5 w-5 text-purple-600" />
                Paso 1: Cómo Conectar con el Dispositivo
              </CardTitle>
              <CardDescription>Establece la conexión consciente con el PRK-1U</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2">Movimiento Circular</h4>
                    <p className="text-sm text-muted-foreground">
                      Realiza un movimiento circular con la mirada, concentrándote desde la lente de menor diámetro 
                      en sentido <strong>contrario a las agujas del reloj</strong> hacia la lente más grande.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2">Establecer Contacto</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Dirige tu mirada a la lente pequeña y di:
                    </p>
                    <div className="bg-white dark:bg-gray-900 p-3 rounded-lg border-l-4 border-purple-600">
                      <p className="text-sm font-semibold italic text-purple-700 dark:text-purple-300">
                        "Estoy desarrollando las concentraciones de la vida eterna"
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Luego ve a la segunda lente y a la tercera, repitiendo la frase y moviendo la mirada en círculo 
                      por encima de las lentes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2">Confirmación de Conexión</h4>
                    <p className="text-sm text-muted-foreground">
                      Continúa hasta que <strong>sientas</strong> que te has conectado con el dispositivo y, a través de él, 
                      con la estructura de la Eternidad. Esta sensación es única para cada persona.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Paso 2: Trabajar con Objetivos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                Paso 2: Cómo Trabajar con tus Objetivos
              </CardTitle>
              <CardDescription>Técnica de la Esfera Mental para manifestación</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <ArrowRight className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">1. Crear la Esfera</h4>
                    <p className="text-sm text-muted-foreground">
                      Genera mentalmente una <strong>esfera de luz</strong> delante de ti. Esta será el contenedor de tu objetivo.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <ArrowRight className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">2. Colocar el Objetivo</h4>
                    <p className="text-sm text-muted-foreground">
                      Coloca dentro de la esfera tu objetivo, representado como:
                    </p>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1 ml-4">
                      <li>• Una <strong>imagen visual</strong> (estática o dinámica)</li>
                      <li>• O simplemente la <strong>información</strong> formulada de manera breve y concisa</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <ArrowRight className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1 text-green-700 dark:text-green-300">3. Visualización Positiva ⚠️ IMPORTANTE</h4>
                    <div className="bg-green-50 dark:bg-green-950/30 p-3 rounded-lg border-l-4 border-green-600 mt-2">
                      <p className="text-sm font-semibold text-green-900 dark:text-green-100">
                        Siempre imagina el objetivo <span className="underline">YA LOGRADO</span>
                      </p>
                      <p className="text-sm text-green-800 dark:text-green-200 mt-1">
                        ❌ NO visualices la situación negativa actual<br />
                        ✅ SÍ visualiza la realidad ideal del futuro que deseas crear
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <ArrowRight className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">4. Concentración</h4>
                    <p className="text-sm text-muted-foreground">
                      Coloca la esfera en el interior de la <strong>lente pequeña</strong> del dispositivo. 
                      Concéntrate en el objetivo como una realidad ya lograda, manteniendo la atención.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <ArrowRight className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">5. Convicción</h4>
                    <p className="text-sm text-muted-foreground">
                      Mantén la convicción de que con esta acción <strong>ya se está creando</strong> esa realidad, 
                      que solo hará falta reforzarla con concentraciones sucesivas.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Los 4 Ejercicios Fundamentales */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                Los 4 Ejercicios Fundamentales
              </CardTitle>
              <CardDescription>Protocolo oficial de Grigori Grabovoi para el desarrollo integral</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                
                {/* Ejercicio 1: Rejuvenecimiento */}
                <Card className="border-2 border-pink-200 dark:border-pink-800">
                  <CardHeader className="bg-pink-50 dark:bg-pink-950/20">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Sparkles className="h-5 w-5 text-pink-600" />
                      Ejercicio 1: Rejuvenecimiento
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-3">
                    <div className="bg-pink-50 dark:bg-pink-950/30 p-3 rounded-lg border-l-4 border-pink-600">
                      <p className="text-sm font-semibold mb-1">📸 Preparación:</p>
                      <p className="text-sm text-muted-foreground">
                        Lleva una foto tuya de tu juventud, en un momento en que eras <strong>feliz</strong> y estabas bien 
                        tanto física como emocionalmente. No es simplemente una foto "bonita", sino una que capture 
                        un <strong>estado de plenitud</strong>.
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-semibold mb-2">🎯 Objetivo:</p>
                      <p className="text-sm text-muted-foreground mb-3">
                        Volver a esa edad - no necesariamente en aspecto externo, sino más bien al 
                        <strong> estado de la juventud</strong> en general.
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold mb-2">📋 Pasos:</p>
                      <ol className="text-sm text-muted-foreground space-y-2 ml-4">
                        <li>1. Observa tu foto de juventud</li>
                        <li>2. Genera la esfera mental delante de ti</li>
                        <li>3. Coloca dentro la imagen de tu juventud plena</li>
                        <li>4. Sitúa la esfera en la lente pequeña</li>
                        <li>5. Concéntrate en la imagen y el pensamiento de rejuvenecimiento</li>
                        <li>6. Realiza los giros con la mirada por encima de las lentes</li>
                        <li>7. Mantén la concentración hasta que sientas que es suficiente</li>
                      </ol>
                    </div>

                    <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <p className="text-sm">
                        <strong>⏱️ Duración:</strong> La duración nunca está determinada. Con la práctica, 
                        tus sensaciones internas indicarán cuándo finalizar.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Ejercicio 2: Control de Eventos */}
                <Card className="border-2 border-green-200 dark:border-green-800">
                  <CardHeader className="bg-green-50 dark:bg-green-950/20">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Target className="h-5 w-5 text-green-600" />
                      Ejercicio 2: Control de Eventos
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-3">
                    <div className="bg-green-50 dark:bg-green-950/30 p-3 rounded-lg border-l-4 border-green-600">
                      <p className="text-sm font-semibold mb-1">🎯 Preparación:</p>
                      <p className="text-sm text-muted-foreground">
                        Define claramente tu objetivo: sanación, cambio de trabajo, mejora de relaciones, etc.
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-semibold mb-2">🎯 Objetivo:</p>
                      <p className="text-sm text-muted-foreground mb-3">
                        Manifestar o acercar el evento deseado trabajando desde tu interior.
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold mb-2">📋 Pasos:</p>
                      <ol className="text-sm text-muted-foreground space-y-2 ml-4">
                        <li>1. Define tu objetivo con claridad</li>
                        <li>2. Genera la esfera mental delante de ti</li>
                        <li>3. Coloca tu objetivo dentro (imagen o información)</li>
                        <li>4. Asegúrate de visualizar el resultado POSITIVO ya logrado</li>
                        <li>5. Sitúa la esfera en la lente pequeña</li>
                        <li>6. Realiza los giros con la mirada</li>
                        <li>7. Mantén la concentración con convicción</li>
                        <li>8. Si pierdes la concentración, descansa y retoma</li>
                      </ol>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                      <p className="text-sm font-semibold mb-1">💡 Ejemplo Práctico:</p>
                      <p className="text-sm text-muted-foreground">
                        Para sanar un problema hepático: <strong>NO</strong> visualices el hígado enfermo, 
                        sino un <strong>hígado perfecto funcionando bien</strong>. Puedes incluir imágenes dinámicas 
                        como tú comiendo alimentos que ahora no toleras.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Ejercicio 3: Clarividencia */}
                <Card className="border-2 border-purple-200 dark:border-purple-800">
                  <CardHeader className="bg-purple-50 dark:bg-purple-950/20">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Eye className="h-5 w-5 text-purple-600" />
                      Ejercicio 3: Clarividencia de Control
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-3">
                    <div className="bg-purple-50 dark:bg-purple-950/30 p-3 rounded-lg border-l-4 border-purple-600">
                      <p className="text-sm font-semibold mb-1">👁️ Preparación:</p>
                      <p className="text-sm text-muted-foreground">
                        Elige un lugar donde hayas estado recientemente: una tienda, teatro, casa de un amigo, etc.
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-semibold mb-2">🎯 Objetivo:</p>
                      <p className="text-sm text-muted-foreground mb-3">
                        Desarrollar tu capacidad de <strong>visión espiritual</strong> viendo lo que no está 
                        delante de tus ojos físicos.
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold mb-2">📋 Pasos:</p>
                      <ol className="text-sm text-muted-foreground space-y-2 ml-4">
                        <li>1. Rememora la imagen COMPLETA del lugar elegido</li>
                        <li>2. Visualiza hasta el menor detalle</li>
                        <li>3. Genera la esfera mental</li>
                        <li>4. Coloca dentro tu objetivo: "Desarrollo de mi clarividencia"</li>
                        <li>5. Sitúa la esfera en la lente pequeña</li>
                        <li>6. Mientras visualizas el lugar, realiza los giros con la mirada</li>
                        <li>7. Mantén la práctica hasta que sientas conexión</li>
                      </ol>
                    </div>

                    <div className="bg-indigo-50 dark:bg-indigo-950/20 p-3 rounded-lg border border-indigo-200 dark:border-indigo-800">
                      <p className="text-sm">
                        <strong>💎 Nota:</strong> Es un ejercicio de la visión espiritual. No se trata de 
                        <strong> recordar</strong>, sino de <strong>VER</strong> con los ojos internos.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Ejercicio 4: Pronóstico de Control */}
                <Card className="border-2 border-indigo-200 dark:border-indigo-800">
                  <CardHeader className="bg-indigo-50 dark:bg-indigo-950/20">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Brain className="h-5 w-5 text-indigo-600" />
                      Ejercicio 4: Pronóstico de Control
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-3">
                    <div className="bg-indigo-50 dark:bg-indigo-950/30 p-3 rounded-lg border-l-4 border-indigo-600">
                      <p className="text-sm font-semibold mb-1">🔮 Preparación:</p>
                      <p className="text-sm text-muted-foreground">
                        Prepárate para expandir tu conciencia hacia el futuro lejano.
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-semibold mb-2">🎯 Objetivo:</p>
                      <p className="text-sm text-muted-foreground mb-3">
                        Desarrollar la capacidad de pronóstico de control visualizando tu vida en la <strong>eternidad</strong>.
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold mb-2">📋 Pasos:</p>
                      <ol className="text-sm text-muted-foreground space-y-2 ml-4">
                        <li>1. Imagínate dentro de <strong>mil años</strong> (o un millón)</li>
                        <li>2. Visualiza cómo es tu vida en ese tiempo</li>
                        <li>3. Define: ¿A qué te dedicas?</li>
                        <li>4. ¿Qué familia y trabajo tienes?</li>
                        <li>5. ¿Cómo es tu entorno?</li>
                        <li>6. ¿Qué objetivos tienes en la vida eterna?</li>
                        <li>7. Genera la esfera con tu objetivo: "Desarrollo de pronóstico de control"</li>
                        <li>8. Mientras visualizas, realiza los giros con la mirada</li>
                        <li>9. Mantén la concentración en tu futuro eterno</li>
                      </ol>
                    </div>

                    <div className="bg-cyan-50 dark:bg-cyan-950/20 p-3 rounded-lg border border-cyan-200 dark:border-cyan-800">
                      <p className="text-sm">
                        <strong>✨ Nota:</strong> Este ejercicio <strong>expande tu conciencia temporal</strong> y 
                        te conecta con tu naturaleza eterna.
                      </p>
                    </div>
                  </CardContent>
                </Card>

              </div>
            </CardContent>
          </Card>

          {/* Recomendaciones Importantes */}
          <Card className="border-orange-200 dark:border-orange-800 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
                <AlertCircle className="h-6 w-6" />
                Recomendaciones Importantes
              </CardTitle>
              <CardDescription>Consejos esenciales para una práctica efectiva</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="flex items-start gap-3 p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg">
                  <Eye className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Conexión Visual</h4>
                    <p className="text-sm text-muted-foreground">
                      La conexión entre el aparato y tu consciencia se da a través de la <strong>MIRADA</strong>. 
                      No se puede trabajar con los ojos cerrados.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg">
                  <Smile className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Descanso Visual</h4>
                    <p className="text-sm text-muted-foreground">
                      Entrena tus ojos para que no se cansen rápido. Si se cansan, puedes mirar a través del 
                      dispositivo sin fijar la mirada, o descansar completamente.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg">
                  <Focus className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Sin Tensión</h4>
                    <p className="text-sm text-muted-foreground">
                      Trabaja <strong>sin tensión corporal ni ocular</strong>. Si el cansancio es notorio, 
                      levántate, muévete y luego retoma el trabajo.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg">
                  <Palette className="h-5 w-5 text-pink-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Creatividad</h4>
                    <p className="text-sm text-muted-foreground">
                      Utiliza toda tu creatividad al formular tus objetivos. Las <strong>imágenes dinámicas</strong> son 
                      más poderosas que las estáticas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg">
                  <Sparkles className="h-5 w-5 text-yellow-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Positividad</h4>
                    <p className="text-sm text-muted-foreground">
                      No partas del "problema" que tienes, sino de la <strong>realidad ideal del futuro</strong> que 
                      quieres crear con la luz de tu pensamiento.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg">
                  <Calendar className="h-5 w-5 text-indigo-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Práctica Regular</h4>
                    <p className="text-sm text-muted-foreground">
                      Refuerza tus objetivos con <strong>concentraciones sucesivas</strong>. La constancia es 
                      clave para la manifestación.
                    </p>
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>

          {/* Protocolo Oficial de Prueba */}
          <Card className="border-gray-300 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-gray-600" />
                Protocolo Oficial de Prueba (48 horas)
              </CardTitle>
              <CardDescription>
                Protocolo diseñado por Grigori Grabovoi para medir sistemáticamente el desarrollo de tus capacidades
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Este es el protocolo oficial para probar el dispositivo PRK-1U de manera estructurada durante 48 horas:
                </p>

                <div className="space-y-3">
                  {[
                    {
                      num: 1,
                      titulo: "Control de Rejuvenecimiento",
                      desc: "Desarrollo de las concentraciones por la vida eterna para el rejuvenecimiento",
                      que: "Realiza el ejercicio de rejuvenecimiento antes y después de usar el dispositivo. Anota las diferencias en tu experiencia."
                    },
                    {
                      num: 2,
                      titulo: "Control de Eventos",
                      desc: "Desarrollo de las concentraciones por la vida eterna para ajustar a la norma diferentes eventos",
                      que: "Trabaja con un evento específico que deseas manifestar. Compara tu capacidad de concentración antes y después."
                    },
                    {
                      num: 3,
                      titulo: "Control de Clarividencia",
                      desc: "Desarrollo de las concentraciones por la vida eterna para el desarrollo de la clarividencia directiva",
                      que: "Practica ver lugares remotos con claridad. Nota si tu visión interna se vuelve más nítida."
                    },
                    {
                      num: 4,
                      titulo: "Control de Pronóstico",
                      desc: "Desarrollo de las concentraciones por la vida eterna para el desarrollo de la capacidad de pronóstico directivo",
                      que: "Visualiza tu futuro eterno. Observa si la conexión con tu yo futuro se intensifica."
                    }
                  ].map((control) => (
                    <div key={control.num} className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-800">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-600 text-white flex items-center justify-center font-bold text-sm">
                          {control.num}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{control.titulo}</h4>
                          <p className="text-sm text-muted-foreground italic mb-2">{control.desc}</p>
                          <p className="text-sm text-muted-foreground">
                            <strong>Qué hacer:</strong> {control.que}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 mt-4">
                  <p className="text-sm">
                    <strong>📝 Nota:</strong> Puedes llevar un diario de tu experiencia durante las 48 horas, 
                    anotando sensaciones, cambios percibidos y resultados obtenidos en cada uno de los 4 controles.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

        </TabsContent>

        {/* Protocolos */}
        <TabsContent value="protocolos" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Protocolos Específicos con PRK-1U</CardTitle>
              <CardDescription>
                Guías detalladas para diferentes objetivos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Sanación Física',
                    icon: Heart,
                    color: 'text-pink-600',
                    bgColor: 'bg-pink-50 dark:bg-pink-950/20',
                    duracion: '30 minutos',
                    secuencias: ['1814321', '148543293', '8143421'],
                    frecuencia: 'Diaria 40 días mínimo'
                  },
                  {
                    title: 'Sanación Emocional',
                    icon: Heart,
                    color: 'text-purple-600',
                    bgColor: 'bg-purple-50 dark:bg-purple-950/20',
                    duracion: '30 minutos',
                    secuencias: ['1888948', '8941254', '1001105010'],
                    frecuencia: 'Diaria 21 días'
                  },
                  {
                    title: 'Prosperidad',
                    icon: TrendingUp,
                    color: 'text-green-600',
                    bgColor: 'bg-green-50 dark:bg-green-950/20',
                    duracion: '30 minutos',
                    secuencias: ['71427321893', '741', '5207418'],
                    frecuencia: 'Diaria en la mañana'
                  },
                  {
                    title: 'Desarrollo Espiritual',
                    icon: Sparkles,
                    color: 'text-indigo-600',
                    bgColor: 'bg-indigo-50 dark:bg-indigo-950/20',
                    duracion: '40 minutos',
                    secuencias: ['11981', '1454814', '1488541'],
                    frecuencia: 'Diaria, misma hora'
                  },
                  {
                    title: 'Rejuvenecimiento',
                    icon: Sparkles,
                    color: 'text-yellow-600',
                    bgColor: 'bg-yellow-50 dark:bg-yellow-950/20',
                    duracion: '30 minutos',
                    secuencias: ['2145432', '5894291', '148543293'],
                    frecuencia: '2 veces al día'
                  },
                  {
                    title: 'Manifestación Rápida',
                    icon: Target,
                    color: 'text-orange-600',
                    bgColor: 'bg-orange-50 dark:bg-orange-950/20',
                    duracion: '30 minutos',
                    secuencias: ['741', '333', '888'],
                    frecuencia: '3 veces al día'
                  },
                ].map((protocolo, index) => {
                  const Icon = protocolo.icon;
                  return (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader className={protocolo.bgColor}>
                        <CardTitle className="flex items-center gap-2">
                          <Icon className={`h-5 w-5 ${protocolo.color}`} />
                          {protocolo.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6 space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">
                            <Clock className="inline h-3 w-3 mr-1" />
                            {protocolo.duracion}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold mb-3 text-center">Secuencias Clave:</p>
                          <div className="flex flex-wrap justify-center gap-3">
                            {protocolo.secuencias.map((seq, sIndex) => (
                              <SequenceSphere key={sIndex} sequence={seq} size="sm" />
                            ))}
                          </div>
                        </div>
                        <div className="pt-2 border-t">
                          <p className="text-xs text-muted-foreground">
                            <strong>Frecuencia:</strong> {protocolo.frecuencia}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-purple-600" />
                  Rutinas Diarias
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { time: 'Mañana', duration: '15-20 min', focus: 'Activación, salud, prosperidad, alegría' },
                    { time: 'Tarde', duration: '10-15 min', focus: 'Mantenimiento, corrección de eventos' },
                    { time: 'Noche', duration: '20-30 min', focus: 'Integración, regeneración, programación' },
                  ].map((rutina, index) => (
                    <div key={index} className="p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg">
                      <h4 className="font-semibold mb-2">{rutina.time}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{rutina.duration}</p>
                      <p className="text-xs text-muted-foreground">{rutina.focus}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Adquisición */}
        <TabsContent value="adquisicion" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Cómo Adquirir el PRK-1U</CardTitle>
              <CardDescription>
                Información sobre costos, requisitos y contacto
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'PRK-1U Físico',
                    price: '€11,050',
                    subtitle: 'Sublicencia 4 años',
                    features: [
                      'Dispositivo físico',
                      'Acceso remoto online',
                      'Recursos educativos',
                      'Soporte técnico',
                      'Experiencia Inmersiva (obligatoria)',
                    ],
                    link: 'www.prk-1u.com',
                    color: 'border-purple-200 dark:border-purple-800'
                  },
                  {
                    title: 'PRK-1U Online',
                    price: 'Variable',
                    subtitle: 'Acceso remoto vía IVIDEON',
                    features: [
                      'Acceso 24/7 desde cualquier lugar',
                      'Dispositivos médicos gratuitos',
                      'Prueba gratis 2 días',
                      'Sin inversión inicial',
                      'Configuración personalizada',
                    ],
                    link: 'www.prk-1u.com',
                    badge: 'Prueba Gratis',
                    color: 'border-blue-200 dark:border-blue-800'
                  },
                  {
                    title: 'PRK-1UM Avanzado',
                    price: '€10,050',
                    subtitle: 'Sublicencia 4 años',
                    features: [
                      '700x más potente',
                      'Portátil y compacto',
                      'Pantalla OLED',
                      'Actualizable por software',
                      'Experiencia Inmersiva (obligatoria)',
                    ],
                    link: 'www.prk-1u.com',
                    badge: '⚡ Más Potente',
                    color: 'border-yellow-200 dark:border-yellow-800'
                  },
                ].map((option, index) => (
                  <Card key={index} className={option.color}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{option.title}</CardTitle>
                        {option.badge && (
                          <Badge className="bg-green-600">{option.badge}</Badge>
                        )}
                      </div>
                      <CardDescription>{option.subtitle}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-3xl font-bold text-primary">{option.price}</p>
                      </div>
                      <ul className="space-y-2">
                        {option.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <a
                        href={`https://${option.link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-primary hover:underline pt-4"
                      >
                        Más información
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-4">Recursos Educativos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'Educenter', url: 'educenter.grigori-grabovoi.world', desc: 'Cursos y seminarios oficiales' },
                    { name: 'Grigori Grabovoi Academy', url: 'www.grigori-grabovoi.academy', desc: 'Academia internacional' },
                    { name: 'PRK-1U Education', url: 'edu.grabovoi.tech', desc: 'Educación especializada en PRK-1U' },
                    { name: 'Global Grigori Grabovoi', url: 'globalgrigorigrabovoi.com', desc: 'Comunidad global' },
                  ].map((resource, index) => (
                    <a
                      key={index}
                      href={`https://${resource.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 border rounded-lg hover:border-primary transition-colors group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold group-hover:text-primary transition-colors">{resource.name}</h4>
                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{resource.desc}</p>
                      <p className="text-xs text-primary font-mono">{resource.url}</p>
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
                  <div className="space-y-2">
                    <h4 className="font-semibold text-amber-900 dark:text-amber-100">Notas Importantes</h4>
                    <ul className="text-sm text-amber-800 dark:text-amber-200 space-y-1">
                      <li>• El PRK-1U <strong>NO es un dispositivo médico</strong> y no cura ni diagnostica enfermedades</li>
                      <li>• <strong>NO reemplaza atención médica</strong> profesional</li>
                      <li>• Uso experimental para desarrollo personal y educación</li>
                      <li>• Resultados no garantizados - experiencia varía según individuo</li>
                      <li>• Compromiso y práctica constante requeridos</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Práctica Online */}
        <TabsContent value="practica" className="mt-6">
          <Card className="border-2 border-green-500 dark:border-green-600 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                    <Zap className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400">
                      Plataforma de Práctica Interactiva
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Simulador completo del PRK-1U con los 4 ejercicios fundamentales
                    </p>
                  </div>
                </div>
                <a
                  href="https://grigori-grabovoi.tech/online-test"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Abrir en Nueva Pestaña</span>
                </a>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative w-full bg-gray-100 dark:bg-gray-900" style={{ height: 'calc(100vh - 300px)', minHeight: '600px' }}>
                <iframe
                  src="https://grigori-grabovoi.tech/online-test"
                  className="absolute inset-0 w-full h-full border-0"
                  title="Plataforma de Práctica PRK-1U"
                  allow="fullscreen"
                  loading="lazy"
                />
              </div>
              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-t border-green-200 dark:border-green-800">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-center text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles className="h-4 w-4 text-pink-600" />
                    <span className="font-medium">Rejuvenecimiento</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Target className="h-4 w-4 text-green-600" />
                    <span className="font-medium">Control de Eventos</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Eye className="h-4 w-4 text-purple-600" />
                    <span className="font-medium">Clarividencia</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Brain className="h-4 w-4 text-indigo-600" />
                    <span className="font-medium">Pronóstico</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Estado Óptimo */}
      <Card className="mt-8 border-yellow-200 dark:border-yellow-800 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="h-6 w-6 text-yellow-600" />
            Estado Emocional Óptimo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4 py-6">
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600">
              Alegría • Luz • Amor
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Este estado emocional produce <strong>la luz más fuerte para la manifestación</strong>.
              Cultiva estos sentimientos durante tus concentraciones para amplificar exponencialmente la efectividad del PRK-1U.
            </p>
          </div>
        </CardContent>
      </Card>
      </div>
    </PageLayout>
  );
}
