"use client";

import { PageLayout } from '@/components/page-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Zap, Star, Palette, Code } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function DisenosPage() {
  const t = useTranslations('designs');

  return (
    <PageLayout>
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          {/* Hero Section with animated gradient */}
          <div className="text-center mb-16 relative">
            <div className="absolute inset-0 bg-mesh-gradient opacity-20 blur-3xl animate-gradient-x"></div>
            <div className="relative z-10">
              <h1 className="text-5xl font-bold mb-4 text-gradient-cosmic animate-fade-in-down">
                {t('title')}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up">
                {t('subtitle')}
              </p>
            </div>
          </div>

          {/* Explanatory Banner */}
          <Card className="mb-12 border-2 border-purple-500/50 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Sparkles className="h-6 w-6 text-purple-600" />
                {t('whatIsThis')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-base">
                <p className="flex items-start gap-2">
                  <span className="text-2xl">📖</span>
                  <span><strong>{t('referenceGallery')}</strong> {t('referenceGalleryDesc')}</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-2xl">✨</span>
                  <span><strong>{t('activeStyles')}</strong> {t('activeStylesDesc')}</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-2xl">🎮</span>
                  <span><strong>{t('interactiveDemos')}</strong> {t('interactiveDemosDesc')}</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-2xl">👨‍💻</span>
                  <span><strong>{t('forDevelopers')}</strong> {t('forDevelopersDesc')}</span>
                </p>
              </div>
              
              <div className="mt-6 p-4 bg-purple-100 dark:bg-purple-900/30 rounded-lg border border-purple-300 dark:border-purple-700">
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  {t('howToUse')}
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>{t('howToUseSteps.s1')}</li>
                  <li>{t('howToUseSteps.s2')}</li>
                  <li>{t('howToUseSteps.s3')}</li>
                  <li>{t('howToUseSteps.s4')}</li>
                  <li>{t('howToUseSteps.s5')}</li>
                </ol>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <Button 
                  className="bg-gradient-cosmic text-white"
                  onClick={() => alert(t('tryDemoAlert'))}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  {t('tryDemo')}
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    const element = document.querySelector('[class*="text-gradient"]');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }}
                >
                  <Code className="h-4 w-4 mr-2" />
                  {t('viewCodeExamples')}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Section 1: Gradients */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <Palette className="w-8 h-8 text-cosmic-500" />
              {t('sections.cosmicGradients')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="h-48 rounded-xl bg-gradient-cosmic flex items-center justify-center text-white font-bold text-xl shadow-xl">
                {t('gradients.cosmic')}
              </div>
              <div className="h-48 rounded-xl bg-gradient-aurora flex items-center justify-center text-white font-bold text-xl shadow-xl">
                {t('gradients.aurora')}
              </div>
              <div className="h-48 rounded-xl bg-gradient-spiritual flex items-center justify-center text-white font-bold text-xl shadow-xl">
                {t('gradients.spiritual')}
              </div>
              <div className="h-48 rounded-xl bg-gradient-divine flex items-center justify-center text-white font-bold text-xl shadow-xl">
                {t('gradients.divine')}
              </div>
              <div className="h-48 rounded-xl bg-gradient-mystical flex items-center justify-center text-gray-800 font-bold text-xl shadow-xl">
                {t('gradients.mystical')}
              </div>
              <div className="h-48 rounded-xl bg-mesh-gradient flex items-center justify-center text-white font-bold text-xl shadow-xl">
                {t('gradients.mesh')}
              </div>
            </div>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm font-mono">
                <Code className="inline w-4 h-4 mr-2" />
                {t('gradients.codeHint')} <code className="bg-background px-2 py-1 rounded">bg-gradient-cosmic</code>,{' '}
                <code className="bg-background px-2 py-1 rounded">bg-gradient-aurora</code>, etc.
              </p>
            </div>
          </section>

          {/* Section 2: Glassmorphism Effects */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-aurora-500" />
              {t('sections.glassmorphism')}
            </h2>
            <div className="relative h-96 rounded-xl bg-gradient-aurora p-8 overflow-hidden">
              <div className="absolute inset-0 bg-stars opacity-20"></div>
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-card hover-lift">
                  <CardHeader>
                    <CardTitle className="text-white">{t('glassmorphism.card1Title')}</CardTitle>
                    <CardDescription className="text-gray-200">
                      {t('glassmorphism.card1Desc')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/90">{t('glassmorphism.card1Content')}</p>
                  </CardContent>
                </Card>
                <Card className="glass-card hover-lift">
                  <CardHeader>
                    <CardTitle className="text-white">{t('glassmorphism.card2Title')}</CardTitle>
                    <CardDescription className="text-gray-200">
                      {t('glassmorphism.card2Desc')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30" onClick={() => alert(t('glassmorphism.glassButtonAlert'))}>
                      {t('glassmorphism.glassButton')}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm font-mono">
                <Code className="inline w-4 h-4 mr-2" />
                {t('gradients.codeHint')} <code className="bg-background px-2 py-1 rounded">glass-card</code>
              </p>
            </div>
          </section>

          {/* Section 3: Glow Effects */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <Zap className="w-8 h-8 text-yellow-500" />
              {t('sections.glowEffects')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="glow-cosmic hover-glow text-center p-8">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 bg-cosmic-500 rounded-full flex items-center justify-center animate-glow">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle>{t('glow.cosmic')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{t('glow.cosmicDesc')}</p>
                  <code className="text-xs mt-2 block">glow-cosmic</code>
                </CardContent>
              </Card>
              <Card className="glow-aurora hover-glow text-center p-8">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 bg-aurora-500 rounded-full flex items-center justify-center animate-glow">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle>{t('glow.aurora')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{t('glow.auroraDesc')}</p>
                  <code className="text-xs mt-2 block">glow-aurora</code>
                </CardContent>
              </Card>
              <Card className="glow-divine hover-glow text-center p-8">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 bg-divine-500 rounded-full flex items-center justify-center animate-glow">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle>{t('glow.divine')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{t('glow.divineDesc')}</p>
                  <code className="text-xs mt-2 block">glow-divine</code>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Section 4: Animations */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <Star className="w-8 h-8 text-divine-500" />
              {t('sections.animations')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center p-6 animate-fade-in-up">
                <div className="mb-4">⬆️</div>
                <CardTitle className="text-lg mb-2">{t('animations.fadeInUp')}</CardTitle>
                <code className="text-xs">animate-fade-in-up</code>
              </Card>
              <Card className="text-center p-6 animate-fade-in-down">
                <div className="mb-4">⬇️</div>
                <CardTitle className="text-lg mb-2">{t('animations.fadeInDown')}</CardTitle>
                <code className="text-xs">animate-fade-in-down</code>
              </Card>
              <Card className="text-center p-6 animate-scale-in">
                <div className="mb-4">🔍</div>
                <CardTitle className="text-lg mb-2">{t('animations.scaleIn')}</CardTitle>
                <code className="text-xs">animate-scale-in</code>
              </Card>
              <Card className="text-center p-6">
                <div className="mb-4 floating">🎈</div>
                <CardTitle className="text-lg mb-2">{t('animations.floating')}</CardTitle>
                <code className="text-xs">floating</code>
              </Card>
            </div>
          </section>

          {/* Section 5: Gradient Texts */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">{t('sections.gradientTexts')}</h2>
            <div className="space-y-6">
              <div className="text-6xl font-bold text-gradient text-center">
                {t('gradientTexts.basic')}
              </div>
              <div className="text-5xl font-bold text-gradient-cosmic text-center">
                {t('gradientTexts.cosmic')}
              </div>
              <div className="text-5xl font-bold text-gradient-aurora text-center">
                {t('gradientTexts.aurora')}
              </div>
            </div>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm font-mono">
                <Code className="inline w-4 h-4 mr-2" />
                {t('gradients.codeHint')} <code className="bg-background px-2 py-1 rounded">text-gradient</code>,{' '}
                <code className="bg-background px-2 py-1 rounded">text-gradient-cosmic</code>, etc.
              </p>
            </div>
          </section>

          {/* Section 6: Interactive Cards */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">{t('sections.interactiveCards')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover-lift cursor-pointer">
                <CardHeader>
                  <CardTitle>{t('interactiveCards.hoverLift')}</CardTitle>
                  <CardDescription>{t('interactiveCards.hoverLiftDesc')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{t('interactiveCards.hoverLiftHint')}</p>
                  <code className="text-xs block mt-2">hover-lift</code>
                </CardContent>
              </Card>
              <Card className="hover-scale cursor-pointer">
                <CardHeader>
                  <CardTitle>{t('interactiveCards.hoverScale')}</CardTitle>
                  <CardDescription>{t('interactiveCards.hoverScaleDesc')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{t('interactiveCards.hoverLiftHint')}</p>
                  <code className="text-xs block mt-2">hover-scale</code>
                </CardContent>
              </Card>
              <Card className="card-interactive cursor-pointer">
                <CardHeader>
                  <CardTitle>{t('interactiveCards.cardInteractive')}</CardTitle>
                  <CardDescription>{t('interactiveCards.cardInteractiveDesc')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{t('interactiveCards.hoverLiftHint')}</p>
                  <code className="text-xs block mt-2">card-interactive</code>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Section 7: Custom Buttons */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">{t('sections.specialButtons')}</h2>
            <p className="text-muted-foreground mb-6" dangerouslySetInnerHTML={{ __html: t('buttons.clickToSeeDemo') }} />
            <div className="flex flex-wrap gap-4">
              <Button className="bg-gradient-cosmic text-white hover:opacity-90" onClick={() => alert(t('buttons.cosmicAlert'))}>
                {t('buttons.cosmicBtn')}
              </Button>
              <Button className="bg-gradient-aurora text-white hover:opacity-90" onClick={() => alert(t('buttons.auroraAlert'))}>
                {t('buttons.auroraBtn')}
              </Button>
              <Button className="bg-gradient-divine text-white hover:opacity-90" onClick={() => alert(t('buttons.divineAlert'))}>
                {t('buttons.divineBtn')}
              </Button>
              <Button className="animate-border bg-transparent text-white hover:scale-105 transition-transform" onClick={() => alert(t('buttons.animatedAlert'))}>
                {t('buttons.animatedBtn')}
              </Button>
              <Button className="relative overflow-hidden group" onClick={() => alert(t('buttons.shimmerAlert'))}>
                <span className="relative z-10">{t('buttons.shimmerBtn')}</span>
                <div className="absolute inset-0 shimmer animate-shimmer"></div>
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg" onClick={() => alert(t('buttons.sequencesAlert'))}>
                {t('buttons.sequencesBtn')}
              </Button>
            </div>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm" dangerouslySetInnerHTML={{ __html: `<span class="inline-flex"><svg class="w-4 h-4 mr-2 text-purple-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg></span>${t('buttons.tip')}` }} />
            </div>
          </section>

          {/* Section 8: Styled Badges */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">{t('sections.customBadges')}</h2>
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-cosmic-500 text-white">{t('badges.cosmic')}</Badge>
              <Badge className="bg-aurora-500 text-white">{t('badges.aurora')}</Badge>
              <Badge className="bg-divine-500 text-white">{t('badges.divine')}</Badge>
              <Badge className="bg-gradient-cosmic text-white">{t('badges.gradient')}</Badge>
              <Badge className="glass-card text-white">{t('badges.glass')}</Badge>
              <Badge className="glow-cosmic">{t('badges.glow')}</Badge>
              <Badge className="animate-pulse-slow bg-primary">{t('badges.pulsing')}</Badge>
            </div>
          </section>

          {/* Usage Guide */}
          <section className="mb-16">
            <Card className="bg-gradient-cosmic text-white">
              <CardHeader>
                <CardTitle className="text-2xl">{t('quickGuide')}</CardTitle>
                <CardDescription className="text-gray-200">
                  {t('quickGuideSubtitle')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-bold mb-2">{t('quickGuideSteps.backgrounds')}</h3>
                  <code className="bg-white/10 px-3 py-1 rounded block">
                    {`<div className="bg-gradient-cosmic">...</div>`}
                  </code>
                </div>
                <div>
                  <h3 className="font-bold mb-2">{t('quickGuideSteps.glass')}</h3>
                  <code className="bg-white/10 px-3 py-1 rounded block">
                    {`<Card className="glass-card">...</Card>`}
                  </code>
                </div>
                <div>
                  <h3 className="font-bold mb-2">{t('quickGuideSteps.glow')}</h3>
                  <code className="bg-white/10 px-3 py-1 rounded block">
                    {`<Button className="glow-cosmic">...</Button>`}
                  </code>
                </div>
                <div>
                  <h3 className="font-bold mb-2">{t('quickGuideSteps.animations')}</h3>
                  <code className="bg-white/10 px-3 py-1 rounded block">
                    {`<div className="animate-fade-in-up">...</div>`}
                  </code>
                </div>
                <div>
                  <h3 className="font-bold mb-2">{t('quickGuideSteps.textGradient')}</h3>
                  <code className="bg-white/10 px-3 py-1 rounded block">
                    {`<h1 className="text-gradient-cosmic">...</h1>`}
                  </code>
                </div>
                <div>
                  <h3 className="font-bold mb-2">{t('quickGuideSteps.hover')}</h3>
                  <code className="bg-white/10 px-3 py-1 rounded block">
                    {`<Card className="hover-lift">...</Card>`}
                  </code>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Color Palette */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">{t('sections.colorPalette')}</h2>
            <div className="space-y-6">
              {/* Cosmic Colors */}
              <div>
                <h3 className="font-semibold mb-3 text-lg">{t('colorPalette.cosmic')}</h3>
                <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                  {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                    <div key={shade} className="text-center">
                      <div className={`h-16 rounded-lg bg-cosmic-${shade} border border-border`}></div>
                      <p className="text-xs mt-1">{shade}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Aurora Colors */}
              <div>
                <h3 className="font-semibold mb-3 text-lg">{t('colorPalette.aurora')}</h3>
                <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                  {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                    <div key={shade} className="text-center">
                      <div className={`h-16 rounded-lg bg-aurora-${shade} border border-border`}></div>
                      <p className="text-xs mt-1">{shade}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Divine Colors */}
              <div>
                <h3 className="font-semibold mb-3 text-lg">{t('colorPalette.divine')}</h3>
                <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                  {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                    <div key={shade} className="text-center">
                      <div className={`h-16 rounded-lg bg-divine-${shade} border border-border`}></div>
                      <p className="text-xs mt-1">{shade}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="text-center py-12">
            <Card className="glass-card border-2 border-cosmic-500 animate-border-glow">
              <CardHeader>
                <CardTitle className="text-3xl text-gradient-cosmic">
                  {t('makeAppUnique')}
                </CardTitle>
                <CardDescription className="text-lg">
                  {t('makeAppUniqueSubtitle')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  {t('allEffectsAvailable')}
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Button className="bg-gradient-cosmic text-white hover:opacity-90" onClick={() => alert(t('viewConfigAlert'))}>
                    {t('viewConfig')}
                  </Button>
                  <Button variant="outline" className="hover-lift" onClick={() => alert(t('documentationAlert'))}>
                    {t('documentation')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}