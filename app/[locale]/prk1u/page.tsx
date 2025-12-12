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
import { useTranslations } from 'next-intl';

export default function PRK1UPage() {
  const t = useTranslations('prk1u');
  
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
            {t('title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      {/* Introduction */}
      <Card className="border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-600" />
            {t('whatIs')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: t.raw('whatIsDesc') }} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="flex items-start gap-3 p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg">
              <Target className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">{t('features.eventControl')}</h4>
                <p className="text-sm text-muted-foreground">
                  {t('features.eventControlDesc')}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg">
              <Heart className="h-5 w-5 text-pink-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">{t('features.healthRestoration')}</h4>
                <p className="text-sm text-muted-foreground">
                  {t('features.healthRestorationDesc')}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg">
              <Brain className="h-5 w-5 text-indigo-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">{t('features.clairvoyance')}</h4>
                <p className="text-sm text-muted-foreground">
                  {t('features.clairvoyanceDesc')}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg">
              <Sparkles className="h-5 w-5 text-yellow-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">{t('features.eternalLife')}</h4>
                <p className="text-sm text-muted-foreground">
                  {t('features.eternalLifeDesc')}
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
                {t('practiceNow')}
              </h3>
              <p className="text-muted-foreground mb-4">
                {t('practiceNowDesc')}
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  {t('interactiveInterface')}
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  {t('guidedExercises')}
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  {t('free')}
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
                <span className="text-lg">{t('accessPlatform')}</span>
                <ExternalLink className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-green-200 dark:border-green-800">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div className="p-3 bg-white/60 dark:bg-gray-900/60 rounded-lg">
                <Sparkles className="h-6 w-6 text-pink-600 mx-auto mb-2" />
                <p className="text-xs font-semibold">{t('quickAccess.rejuvenation')}</p>
              </div>
              <div className="p-3 bg-white/60 dark:bg-gray-900/60 rounded-lg">
                <Target className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="text-xs font-semibold">{t('quickAccess.eventControl')}</p>
              </div>
              <div className="p-3 bg-white/60 dark:bg-gray-900/60 rounded-lg">
                <Eye className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <p className="text-xs font-semibold">{t('quickAccess.clairvoyance')}</p>
              </div>
              <div className="p-3 bg-white/60 dark:bg-gray-900/60 rounded-lg">
                <Brain className="h-6 w-6 text-indigo-600 mx-auto mb-2" />
                <p className="text-xs font-semibold">{t('quickAccess.forecast')}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Tabs */}
      <Tabs defaultValue="funcionamiento" className="mt-8">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-7">
          <TabsTrigger value="funcionamiento">{t('tabs.operation')}</TabsTrigger>
          <TabsTrigger value="versiones">{t('tabs.versions')}</TabsTrigger>
          <TabsTrigger value="metodos">{t('tabs.methods')}</TabsTrigger>
          <TabsTrigger value="instrucciones">{t('tabs.instructions')}</TabsTrigger>
          <TabsTrigger value="protocolos">{t('tabs.protocols')}</TabsTrigger>
          <TabsTrigger value="adquisicion">{t('tabs.acquisition')}</TabsTrigger>
          <TabsTrigger value="practica" className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30">
            <span className="flex items-center gap-1">
              <Zap className="h-4 w-4" />
              {t('tabs.practice')}
            </span>
          </TabsTrigger>
        </TabsList>

        {/* Funcionamiento */}
        <TabsContent value="funcionamiento" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-600" />
                {t('operation.title')}
              </CardTitle>
              <CardDescription>
                {t('operation.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">{t('operation.fundamental')}</h3>
                <p className="text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: t.raw('operation.fundamentalDesc') }} />
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-4">{t('operation.process')}</h3>
                <div className="space-y-4">
                  {[
                    { step: `1. ${t('operation.steps.capture')}`, desc: t('operation.steps.captureDesc'), color: 'text-blue-600' },
                    { step: `2. ${t('operation.steps.amplification')}`, desc: t('operation.steps.amplificationDesc'), color: 'text-purple-600' },
                    { step: `3. ${t('operation.steps.potentiation')}`, desc: t('operation.steps.potentiationDesc'), color: 'text-pink-600' },
                    { step: `4. ${t('operation.steps.return')}`, desc: t('operation.steps.returnDesc'), color: 'text-green-600' },
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
                <h3 className="font-semibold text-lg mb-4">{t('operation.components')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: t('operation.componentsList.optical.name'), desc: t('operation.componentsList.optical.desc') },
                    { name: t('operation.componentsList.internal.name'), desc: t('operation.componentsList.internal.desc') },
                    { name: t('operation.componentsList.microelectronic.name'), desc: t('operation.componentsList.microelectronic.desc') },
                    { name: t('operation.componentsList.plates.name'), desc: t('operation.componentsList.plates.desc') },
                    { name: t('operation.componentsList.ai.name'), desc: t('operation.componentsList.ai.desc') },
                    { name: t('operation.componentsList.eternity.name'), desc: t('operation.componentsList.eternity.desc') },
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
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">{t('operation.range')}</h4>
                    <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
                      <li dangerouslySetInnerHTML={{ __html: `• ${t('operation.rangeItems.physical')}` }} />
                      <li dangerouslySetInnerHTML={{ __html: `• ${t('operation.rangeItems.sleep')}` }} />
                      <li>• {t('operation.rangeItems.always')}</li>
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
                  {t('versions.physical.title')}
                </CardTitle>
                <CardDescription>{t('versions.physical.subtitle')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">{t('versions.physical.features')}</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>✓ {t('versions.physical.list.lenses')}</li>
                    <li>✓ {t('versions.physical.list.numbers')}</li>
                    <li>✓ {t('versions.physical.list.unlimited')}</li>
                    <li>✓ {t('versions.physical.list.people')}</li>
                    <li>✓ {t('versions.physical.list.radius')}</li>
                    <li dangerouslySetInnerHTML={{ __html: `✓ ${t('versions.physical.list.passive')}` }} />
                  </ul>
                </div>
                <Separator />
                <div>
                  <Badge variant="secondary" className="mb-2">{t('versions.physical.license')}</Badge>
                  <p className="text-xl font-bold text-purple-600">{t('versions.physical.price')}</p>
                  <p className="text-xs text-muted-foreground">{t('versions.physical.priceNote')}</p>
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
                  {t('versions.online.title')}
                </CardTitle>
                <CardDescription>{t('versions.online.subtitle')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">{t('versions.online.features')}</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>✓ {t('versions.online.list.access')}</li>
                    <li>✓ {t('versions.online.list.realtime')}</li>
                    <li>✓ {t('versions.online.list.config')}</li>
                    <li dangerouslySetInnerHTML={{ __html: `✓ ${t('versions.online.list.medical')}` }} />
                    <li>✓ {t('versions.online.list.trial')}</li>
                    <li>✓ {t('versions.online.list.noInvestment')}</li>
                  </ul>
                </div>
                <Separator />
                <div>
                  <Badge className="mb-2 bg-green-600">{t('versions.online.badge')}</Badge>
                  <p className="text-xl font-bold text-blue-600">{t('versions.online.price')}</p>
                  <p className="text-xs text-muted-foreground">{t('versions.online.priceNote')}</p>
                </div>
              </CardContent>
            </Card>

            {/* PRK-1UM Avanzado */}
            <Card className="border-yellow-200 dark:border-yellow-800 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-yellow-600" />
                  {t('versions.advanced.title')}
                </CardTitle>
                <CardDescription>{t('versions.advanced.subtitle')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 rounded-lg p-3 mb-4">
                  <p className="font-bold text-yellow-900 dark:text-yellow-100 text-center">
                    {t('versions.advanced.power')}
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">{t('versions.advanced.features')}</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>✓ {t('versions.advanced.list.laser')}</li>
                    <li>✓ {t('versions.advanced.list.oled')}</li>
                    <li>✓ {t('versions.advanced.list.ai')}</li>
                    <li>✓ {t('versions.advanced.list.portable')}</li>
                    <li>✓ {t('versions.advanced.list.battery')}</li>
                    <li>✓ {t('versions.advanced.list.updatable')}</li>
                  </ul>
                </div>
                <Separator />
                <div>
                  <Badge variant="secondary" className="mb-2">{t('versions.advanced.license')}</Badge>
                  <p className="text-xl font-bold text-orange-600">{t('versions.advanced.price')}</p>
                  <p className="text-xs text-muted-foreground">{t('versions.advanced.priceNote')}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Métodos */}
        <TabsContent value="metodos" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('methods.title')}</CardTitle>
              <CardDescription>
                {t('methods.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {[
                  {
                    name: t('methods.method1.name'),
                    icon: '🔮',
                    uso: t('methods.method1.use'),
                    direccion: t('methods.method1.direction'),
                    pasos: t.raw('methods.method1.steps') as string[],
                    duracion: t('methods.method1.duration'),
                    color: 'border-blue-200 dark:border-blue-800'
                  },
                  {
                    name: t('methods.method2.name'),
                    icon: '⏮️',
                    uso: t('methods.method2.use'),
                    direccion: t('methods.method2.direction'),
                    pasos: t.raw('methods.method2.steps') as string[],
                    duracion: t('methods.method2.duration'),
                    color: 'border-purple-200 dark:border-purple-800'
                  },
                  {
                    name: t('methods.method3.name'),
                    icon: '🔢',
                    uso: t('methods.method3.use'),
                    direccion: t('methods.method3.direction'),
                    pasos: t.raw('methods.method3.steps') as string[],
                    duracion: t('methods.method3.duration'),
                    extra: t('methods.method3.extra'),
                    color: 'border-green-200 dark:border-green-800'
                  },
                  {
                    name: t('methods.method4.name'),
                    icon: '🎯',
                    uso: t('methods.method4.use'),
                    direccion: t('methods.method4.direction'),
                    pasos: t.raw('methods.method4.steps') as string[],
                    duracion: t('methods.method4.duration'),
                    extra: t('methods.method4.extra'),
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
                        <p className="text-sm font-semibold">↻ {t('methods.direction')}: <span className="font-normal">{metodo.direccion}</span></p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3">{t('methods.stepsLabel')}</h4>
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
                        <span className="text-sm font-semibold">{t('methods.durationLabel')}</span>
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
                {t('instructions.guideTitle')}
              </CardTitle>
              <CardDescription>
                {t('instructions.guideSubtitle')}
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Paso 1: Conexión Inicial */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Circle className="h-5 w-5 text-purple-600" />
                {t('instructions.step1.title')}
              </CardTitle>
              <CardDescription>{t('instructions.step1.subtitle')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2">{t('instructions.step1.circular')}</h4>
                    <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: t.raw('instructions.step1.circularDesc') }} />
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2">{t('instructions.step1.contact')}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {t('instructions.step1.contactDesc')}
                    </p>
                    <div className="bg-white dark:bg-gray-900 p-3 rounded-lg border-l-4 border-purple-600">
                      <p className="text-sm font-semibold italic text-purple-700 dark:text-purple-300">
                        {t('instructions.step1.phrase')}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {t('instructions.step1.contactNote')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2">{t('instructions.step1.confirmation')}</h4>
                    <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: t.raw('instructions.step1.confirmationDesc') }} />
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
                {t('instructions.step2.title')}
              </CardTitle>
              <CardDescription>{t('instructions.step2.subtitle')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <ArrowRight className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{t('instructions.step2.createSphere')}</h4>
                    <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: t.raw('instructions.step2.createSphereDesc') }} />
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <ArrowRight className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{t('instructions.step2.placeObjective')}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t('instructions.step2.placeObjectiveDesc')}
                    </p>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1 ml-4">
                      {(t.raw('instructions.step2.placeObjectiveList') as string[]).map((item, i) => (
                        <li key={i} dangerouslySetInnerHTML={{ __html: `• ${item}` }} />
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <ArrowRight className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1 text-green-700 dark:text-green-300">{t('instructions.step2.positiveViz')}</h4>
                    <div className="bg-green-50 dark:bg-green-950/30 p-3 rounded-lg border-l-4 border-green-600 mt-2">
                      <p className="text-sm font-semibold text-green-900 dark:text-green-100" dangerouslySetInnerHTML={{ __html: t.raw('instructions.step2.positiveVizDesc') }} />
                      <p className="text-sm text-green-800 dark:text-green-200 mt-1">
                        {t('instructions.step2.positiveVizDont')}<br />
                        {t('instructions.step2.positiveVizDo')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <ArrowRight className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{t('instructions.step2.concentration')}</h4>
                    <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: t.raw('instructions.step2.concentrationDesc') }} />
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <ArrowRight className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{t('instructions.step2.conviction')}</h4>
                    <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: t.raw('instructions.step2.convictionDesc') }} />
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
                {t('instructions.exercises.title')}
              </CardTitle>
              <CardDescription>{t('instructions.exercises.subtitle')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                
                {/* Ejercicio 1: Rejuvenecimiento */}
                <Card className="border-2 border-pink-200 dark:border-pink-800">
                  <CardHeader className="bg-pink-50 dark:bg-pink-950/20">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Sparkles className="h-5 w-5 text-pink-600" />
                      {t('instructions.exercises.rejuvenation.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-3">
                    <div className="bg-pink-50 dark:bg-pink-950/30 p-3 rounded-lg border-l-4 border-pink-600">
                      <p className="text-sm font-semibold mb-1">{t('instructions.exercises.rejuvenation.preparation')}</p>
                      <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: t.raw('instructions.exercises.rejuvenation.preparationDesc') }} />
                    </div>
                    
                    <div>
                      <p className="text-sm font-semibold mb-2">{t('instructions.exercises.rejuvenation.objective')}</p>
                      <p className="text-sm text-muted-foreground mb-3" dangerouslySetInnerHTML={{ __html: t.raw('instructions.exercises.rejuvenation.objectiveDesc') }} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold mb-2">{t('instructions.exercises.rejuvenation.stepsLabel')}</p>
                      <ol className="text-sm text-muted-foreground space-y-2 ml-4">
                        {(t.raw('instructions.exercises.rejuvenation.steps') as string[]).map((step, i) => (
                          <li key={i}>{i + 1}. {step}</li>
                        ))}
                      </ol>
                    </div>

                    <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <p className="text-sm" dangerouslySetInnerHTML={{ __html: t.raw('instructions.exercises.rejuvenation.durationNote') }} />
                    </div>
                  </CardContent>
                </Card>

                {/* Ejercicio 2: Control de Eventos */}
                <Card className="border-2 border-green-200 dark:border-green-800">
                  <CardHeader className="bg-green-50 dark:bg-green-950/20">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Target className="h-5 w-5 text-green-600" />
                      {t('instructions.exercises.eventControl.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-3">
                    <div className="bg-green-50 dark:bg-green-950/30 p-3 rounded-lg border-l-4 border-green-600">
                      <p className="text-sm font-semibold mb-1">{t('instructions.exercises.eventControl.preparation')}</p>
                      <p className="text-sm text-muted-foreground">{t('instructions.exercises.eventControl.preparationDesc')}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-semibold mb-2">{t('instructions.exercises.eventControl.objective')}</p>
                      <p className="text-sm text-muted-foreground mb-3">{t('instructions.exercises.eventControl.objectiveDesc')}</p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold mb-2">{t('instructions.exercises.eventControl.stepsLabel')}</p>
                      <ol className="text-sm text-muted-foreground space-y-2 ml-4">
                        {(t.raw('instructions.exercises.eventControl.steps') as string[]).map((step, i) => (
                          <li key={i}>{i + 1}. {step}</li>
                        ))}
                      </ol>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                      <p className="text-sm font-semibold mb-1">{t('instructions.exercises.eventControl.exampleTitle')}</p>
                      <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: t.raw('instructions.exercises.eventControl.exampleDesc') }} />
                    </div>
                  </CardContent>
                </Card>

                {/* Ejercicio 3: Clarividencia */}
                <Card className="border-2 border-purple-200 dark:border-purple-800">
                  <CardHeader className="bg-purple-50 dark:bg-purple-950/20">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Eye className="h-5 w-5 text-purple-600" />
                      {t('instructions.exercises.clairvoyance.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-3">
                    <div className="bg-purple-50 dark:bg-purple-950/30 p-3 rounded-lg border-l-4 border-purple-600">
                      <p className="text-sm font-semibold mb-1">{t('instructions.exercises.clairvoyance.preparation')}</p>
                      <p className="text-sm text-muted-foreground">{t('instructions.exercises.clairvoyance.preparationDesc')}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-semibold mb-2">{t('instructions.exercises.clairvoyance.objective')}</p>
                      <p className="text-sm text-muted-foreground mb-3" dangerouslySetInnerHTML={{ __html: t.raw('instructions.exercises.clairvoyance.objectiveDesc') }} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold mb-2">{t('instructions.exercises.clairvoyance.stepsLabel')}</p>
                      <ol className="text-sm text-muted-foreground space-y-2 ml-4">
                        {(t.raw('instructions.exercises.clairvoyance.steps') as string[]).map((step, i) => (
                          <li key={i}>{i + 1}. {step}</li>
                        ))}
                      </ol>
                    </div>

                    <div className="bg-indigo-50 dark:bg-indigo-950/20 p-3 rounded-lg border border-indigo-200 dark:border-indigo-800">
                      <p className="text-sm" dangerouslySetInnerHTML={{ __html: t.raw('instructions.exercises.clairvoyance.note') }} />
                    </div>
                  </CardContent>
                </Card>

                {/* Ejercicio 4: Pronóstico de Control */}
                <Card className="border-2 border-indigo-200 dark:border-indigo-800">
                  <CardHeader className="bg-indigo-50 dark:bg-indigo-950/20">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Brain className="h-5 w-5 text-indigo-600" />
                      {t('instructions.exercises.forecast.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-3">
                    <div className="bg-indigo-50 dark:bg-indigo-950/30 p-3 rounded-lg border-l-4 border-indigo-600">
                      <p className="text-sm font-semibold mb-1">{t('instructions.exercises.forecast.preparation')}</p>
                      <p className="text-sm text-muted-foreground">{t('instructions.exercises.forecast.preparationDesc')}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-semibold mb-2">{t('instructions.exercises.forecast.objective')}</p>
                      <p className="text-sm text-muted-foreground mb-3" dangerouslySetInnerHTML={{ __html: t.raw('instructions.exercises.forecast.objectiveDesc') }} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold mb-2">{t('instructions.exercises.forecast.stepsLabel')}</p>
                      <ol className="text-sm text-muted-foreground space-y-2 ml-4">
                        {(t.raw('instructions.exercises.forecast.steps') as string[]).map((step, i) => (
                          <li key={i} dangerouslySetInnerHTML={{ __html: `${i + 1}. ${step}` }} />
                        ))}
                      </ol>
                    </div>

                    <div className="bg-cyan-50 dark:bg-cyan-950/20 p-3 rounded-lg border border-cyan-200 dark:border-cyan-800">
                      <p className="text-sm" dangerouslySetInnerHTML={{ __html: t.raw('instructions.exercises.forecast.note') }} />
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
                {t('instructions.recommendations.title')}
              </CardTitle>
              <CardDescription>{t('instructions.recommendations.subtitle')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="flex items-start gap-3 p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg">
                  <Eye className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">{t('instructions.recommendations.visual.title')}</h4>
                    <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: t.raw('instructions.recommendations.visual.desc') }} />
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg">
                  <Smile className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">{t('instructions.recommendations.rest.title')}</h4>
                    <p className="text-sm text-muted-foreground">{t('instructions.recommendations.rest.desc')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg">
                  <Focus className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">{t('instructions.recommendations.noTension.title')}</h4>
                    <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: t.raw('instructions.recommendations.noTension.desc') }} />
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg">
                  <Palette className="h-5 w-5 text-pink-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">{t('instructions.recommendations.creativity.title')}</h4>
                    <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: t.raw('instructions.recommendations.creativity.desc') }} />
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg">
                  <Sparkles className="h-5 w-5 text-yellow-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">{t('instructions.recommendations.positivity.title')}</h4>
                    <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: t.raw('instructions.recommendations.positivity.desc') }} />
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg">
                  <Calendar className="h-5 w-5 text-indigo-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">{t('instructions.recommendations.regular.title')}</h4>
                    <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: t.raw('instructions.recommendations.regular.desc') }} />
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
                {t('instructions.protocol.title')}
              </CardTitle>
              <CardDescription>
                {t('instructions.protocol.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {t('instructions.protocol.intro')}
                </p>

                <div className="space-y-3">
                  {[
                    { num: 1, titulo: t('instructions.protocol.controls.c1.title'), desc: t('instructions.protocol.controls.c1.desc'), que: t('instructions.protocol.controls.c1.what') },
                    { num: 2, titulo: t('instructions.protocol.controls.c2.title'), desc: t('instructions.protocol.controls.c2.desc'), que: t('instructions.protocol.controls.c2.what') },
                    { num: 3, titulo: t('instructions.protocol.controls.c3.title'), desc: t('instructions.protocol.controls.c3.desc'), que: t('instructions.protocol.controls.c3.what') },
                    { num: 4, titulo: t('instructions.protocol.controls.c4.title'), desc: t('instructions.protocol.controls.c4.desc'), que: t('instructions.protocol.controls.c4.what') }
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
                            <strong>{t('instructions.protocol.whatToDo')}</strong> {control.que}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 mt-4">
                  <p className="text-sm" dangerouslySetInnerHTML={{ __html: t.raw('instructions.protocol.note') }} />
                </div>
              </div>
            </CardContent>
          </Card>

        </TabsContent>

        {/* Protocolos */}
        <TabsContent value="protocolos" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('protocols.title')}</CardTitle>
              <CardDescription>
                {t('protocols.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: t('protocols.list.physicalHealing.title'), icon: Heart, color: 'text-pink-600', bgColor: 'bg-pink-50 dark:bg-pink-950/20', duracion: t('protocols.list.physicalHealing.duration'), secuencias: ['1814321', '148543293', '8143421'], frecuencia: t('protocols.list.physicalHealing.frequency') },
                  { title: t('protocols.list.emotionalHealing.title'), icon: Heart, color: 'text-purple-600', bgColor: 'bg-purple-50 dark:bg-purple-950/20', duracion: t('protocols.list.emotionalHealing.duration'), secuencias: ['1888948', '8941254', '1001105010'], frecuencia: t('protocols.list.emotionalHealing.frequency') },
                  { title: t('protocols.list.prosperity.title'), icon: TrendingUp, color: 'text-green-600', bgColor: 'bg-green-50 dark:bg-green-950/20', duracion: t('protocols.list.prosperity.duration'), secuencias: ['71427321893', '741', '5207418'], frecuencia: t('protocols.list.prosperity.frequency') },
                  { title: t('protocols.list.spiritualDev.title'), icon: Sparkles, color: 'text-indigo-600', bgColor: 'bg-indigo-50 dark:bg-indigo-950/20', duracion: t('protocols.list.spiritualDev.duration'), secuencias: ['11981', '1454814', '1488541'], frecuencia: t('protocols.list.spiritualDev.frequency') },
                  { title: t('protocols.list.rejuvenation.title'), icon: Sparkles, color: 'text-yellow-600', bgColor: 'bg-yellow-50 dark:bg-yellow-950/20', duracion: t('protocols.list.rejuvenation.duration'), secuencias: ['2145432', '5894291', '148543293'], frecuencia: t('protocols.list.rejuvenation.frequency') },
                  { title: t('protocols.list.fastManifestation.title'), icon: Target, color: 'text-orange-600', bgColor: 'bg-orange-50 dark:bg-orange-950/20', duracion: t('protocols.list.fastManifestation.duration'), secuencias: ['741', '333', '888'], frecuencia: t('protocols.list.fastManifestation.frequency') },
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
                          <p className="text-xs font-semibold mb-3 text-center">{t('protocols.keySequences')}</p>
                          <div className="flex flex-wrap justify-center gap-3">
                            {protocolo.secuencias.map((seq, sIndex) => (
                              <SequenceSphere key={sIndex} sequence={seq} size="sm" />
                            ))}
                          </div>
                        </div>
                        <div className="pt-2 border-t">
                          <p className="text-xs text-muted-foreground">
                            <strong>{t('protocols.frequency')}</strong> {protocolo.frecuencia}
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
                  {t('protocols.routines.title')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { time: t('protocols.routines.morning.time'), duration: t('protocols.routines.morning.duration'), focus: t('protocols.routines.morning.focus') },
                    { time: t('protocols.routines.afternoon.time'), duration: t('protocols.routines.afternoon.duration'), focus: t('protocols.routines.afternoon.focus') },
                    { time: t('protocols.routines.night.time'), duration: t('protocols.routines.night.duration'), focus: t('protocols.routines.night.focus') },
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
              <CardTitle>{t('acquisition.title')}</CardTitle>
              <CardDescription>
                {t('acquisition.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: t('acquisition.options.physical.title'), price: t('acquisition.options.physical.price'), subtitle: t('acquisition.options.physical.subtitle'), features: t.raw('acquisition.options.physical.features') as string[], link: 'www.prk-1u.com', color: 'border-purple-200 dark:border-purple-800' },
                  { title: t('acquisition.options.online.title'), price: t('acquisition.options.online.price'), subtitle: t('acquisition.options.online.subtitle'), features: t.raw('acquisition.options.online.features') as string[], link: 'www.prk-1u.com', badge: t('acquisition.options.online.badge'), color: 'border-blue-200 dark:border-blue-800' },
                  { title: t('acquisition.options.advanced.title'), price: t('acquisition.options.advanced.price'), subtitle: t('acquisition.options.advanced.subtitle'), features: t.raw('acquisition.options.advanced.features') as string[], link: 'www.prk-1u.com', badge: t('acquisition.options.advanced.badge'), color: 'border-yellow-200 dark:border-yellow-800' },
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
                        {t('acquisition.moreInfo')}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-4">{t('acquisition.resources.title')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: t('acquisition.resources.educenter.name'), url: 'educenter.grigori-grabovoi.world', desc: t('acquisition.resources.educenter.desc') },
                    { name: t('acquisition.resources.academy.name'), url: 'www.grigori-grabovoi.academy', desc: t('acquisition.resources.academy.desc') },
                    { name: t('acquisition.resources.prk1uEdu.name'), url: 'edu.grabovoi.tech', desc: t('acquisition.resources.prk1uEdu.desc') },
                    { name: t('acquisition.resources.global.name'), url: 'globalgrigorigrabovoi.com', desc: t('acquisition.resources.global.desc') },
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
                    <h4 className="font-semibold text-amber-900 dark:text-amber-100">{t('acquisition.warnings.title')}</h4>
                    <ul className="text-sm text-amber-800 dark:text-amber-200 space-y-1">
                      <li dangerouslySetInnerHTML={{ __html: `• ${t('acquisition.warnings.notMedical')}` }} />
                      <li dangerouslySetInnerHTML={{ __html: `• ${t('acquisition.warnings.noReplace')}` }} />
                      <li>• {t('acquisition.warnings.experimental')}</li>
                      <li>• {t('acquisition.warnings.noGuarantee')}</li>
                      <li>• {t('acquisition.warnings.commitment')}</li>
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
                      {t('practice.platformTitle')}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {t('practice.platformSubtitle')}
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
                  <span>{t('practice.openNewTab')}</span>
                </a>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative w-full bg-gray-100 dark:bg-gray-900" style={{ height: 'calc(100vh - 300px)', minHeight: '600px' }}>
                <iframe
                  src="https://grigori-grabovoi.tech/online-test"
                  className="absolute inset-0 w-full h-full border-0"
                  title={t('practice.iframeTitle')}
                  allow="fullscreen"
                  loading="lazy"
                />
              </div>
              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-t border-green-200 dark:border-green-800">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-center text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles className="h-4 w-4 text-pink-600" />
                    <span className="font-medium">{t('quickAccess.rejuvenation')}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Target className="h-4 w-4 text-green-600" />
                    <span className="font-medium">{t('quickAccess.eventControl')}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Eye className="h-4 w-4 text-purple-600" />
                    <span className="font-medium">{t('quickAccess.clairvoyance')}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Brain className="h-4 w-4 text-indigo-600" />
                    <span className="font-medium">{t('quickAccess.forecast')}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Optimal State */}
      <Card className="mt-8 border-yellow-200 dark:border-yellow-800 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="h-6 w-6 text-yellow-600" />
            {t('emotionalState')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4 py-6">
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600">
              {t('emotionalWords')}
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: t.raw('emotionalDesc') }} />
          </div>
        </CardContent>
      </Card>
      </div>
    </PageLayout>
  );
}
