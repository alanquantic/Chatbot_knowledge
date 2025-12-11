"use client";

import { PageLayout } from '@/components/page-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Zap, Star, Palette, Code } from 'lucide-react';

export default function DisenosPage() {
  return (
    <PageLayout>
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          {/* Hero Section con gradiente animado */}
          <div className="text-center mb-16 relative">
            <div className="absolute inset-0 bg-mesh-gradient opacity-20 blur-3xl animate-gradient-x"></div>
            <div className="relative z-10">
              <h1 className="text-5xl font-bold mb-4 text-gradient-cosmic animate-fade-in-down">
                🎨 Galería de Diseños Únicos
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up">
                Explora todos los efectos visuales y estilos personalizados disponibles para hacer tu app única
              </p>
            </div>
          </div>

          {/* Banner Explicativo */}
          <Card className="mb-12 border-2 border-purple-500/50 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Sparkles className="h-6 w-6 text-purple-600" />
                ℹ️ ¿Qué es esta página?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-base">
                <p className="flex items-start gap-2">
                  <span className="text-2xl">📖</span>
                  <span><strong>Galería de Referencia:</strong> Esta es una galería visual que muestra todos los estilos, efectos y animaciones personalizadas que ya están integradas en la aplicación.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-2xl">✨</span>
                  <span><strong>Estilos Activos:</strong> Todos estos efectos ya están funcionando en las diferentes secciones de la app (secuencias, libros, diario, etc.).</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-2xl">🎮</span>
                  <span><strong>Demos Interactivas:</strong> Haz clic en los botones para ver demostraciones de cómo funcionan los efectos. Los botones tienen mensajes de ejemplo.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-2xl">👨‍💻</span>
                  <span><strong>Para Desarrolladores:</strong> Si eres desarrollador, puedes copiar las clases CSS mostradas (ej: <code className="bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded">bg-gradient-cosmic</code>) para usar estos estilos en nuevos componentes.</span>
                </p>
              </div>
              
              <div className="mt-6 p-4 bg-purple-100 dark:bg-purple-900/30 rounded-lg border border-purple-300 dark:border-purple-700">
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Cómo Usar Esta Galería:
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li><strong>Explora</strong> cada sección para ver los diferentes efectos visuales disponibles</li>
                  <li><strong>Observa</strong> cómo se ven los gradientes, animaciones, efectos de vidrio, etc.</li>
                  <li><strong>Haz clic</strong> en los botones interactivos para ver las demos en acción</li>
                  <li><strong>Lee</strong> los códigos de ejemplo (en gris) debajo de cada efecto</li>
                  <li><strong>Recuerda:</strong> Estos estilos ya están aplicados en toda la app, ¡solo disfrútalos! 🎨</li>
                </ol>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <Button 
                  className="bg-gradient-cosmic text-white"
                  onClick={() => alert('👋 ¡Hola! Esta es una demo interactiva.\n\nEsta galería muestra todos los estilos visuales que ya están activos en la app.\n\nPuedes hacer clic en cualquier botón para ver cómo funcionan los efectos.\n\n¡Explora cada sección! 🎨')}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Probar Demo
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
                  Ver Ejemplos de Código
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Sección 1: Gradientes */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <Palette className="w-8 h-8 text-cosmic-500" />
              1. Gradientes Cósmicos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="h-48 rounded-xl bg-gradient-cosmic flex items-center justify-center text-white font-bold text-xl shadow-xl">
                Cósmico
              </div>
              <div className="h-48 rounded-xl bg-gradient-aurora flex items-center justify-center text-white font-bold text-xl shadow-xl">
                Aurora
              </div>
              <div className="h-48 rounded-xl bg-gradient-spiritual flex items-center justify-center text-white font-bold text-xl shadow-xl">
                Espiritual
              </div>
              <div className="h-48 rounded-xl bg-gradient-divine flex items-center justify-center text-white font-bold text-xl shadow-xl">
                Divino
              </div>
              <div className="h-48 rounded-xl bg-gradient-mystical flex items-center justify-center text-gray-800 font-bold text-xl shadow-xl">
                Místico
              </div>
              <div className="h-48 rounded-xl bg-mesh-gradient flex items-center justify-center text-white font-bold text-xl shadow-xl">
                Mesh Gradient
              </div>
            </div>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm font-mono">
                <Code className="inline w-4 h-4 mr-2" />
                Usa: <code className="bg-background px-2 py-1 rounded">bg-gradient-cosmic</code>,{' '}
                <code className="bg-background px-2 py-1 rounded">bg-gradient-aurora</code>, etc.
              </p>
            </div>
          </section>

          {/* Sección 2: Efectos de Glassmorphism */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-aurora-500" />
              2. Glassmorphism (Vidrio Esmerilado)
            </h2>
            <div className="relative h-96 rounded-xl bg-gradient-aurora p-8 overflow-hidden">
              <div className="absolute inset-0 bg-stars opacity-20"></div>
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-card hover-lift">
                  <CardHeader>
                    <CardTitle className="text-white">Tarjeta de Vidrio 1</CardTitle>
                    <CardDescription className="text-gray-200">
                      Efecto de vidrio esmerilado con transparencia
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/90">Este diseño usa backdrop-filter: blur() para crear un efecto de vidrio moderno y elegante.</p>
                  </CardContent>
                </Card>
                <Card className="glass-card hover-lift">
                  <CardHeader>
                    <CardTitle className="text-white">Tarjeta de Vidrio 2</CardTitle>
                    <CardDescription className="text-gray-200">
                      Perfecto para overlays y modales
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30" onClick={() => alert('¡Efecto Glassmorphism! 🪟')}>
                      Botón de Vidrio
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm font-mono">
                <Code className="inline w-4 h-4 mr-2" />
                Usa: <code className="bg-background px-2 py-1 rounded">glass-card</code>
              </p>
            </div>
          </section>

          {/* Sección 3: Efectos de Glow (Brillo) */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <Zap className="w-8 h-8 text-yellow-500" />
              3. Efectos de Brillo (Glow)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="glow-cosmic hover-glow text-center p-8">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 bg-cosmic-500 rounded-full flex items-center justify-center animate-glow">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle>Brillo Cósmico</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Efecto de brillo violeta místico</p>
                  <code className="text-xs mt-2 block">glow-cosmic</code>
                </CardContent>
              </Card>
              <Card className="glow-aurora hover-glow text-center p-8">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 bg-aurora-500 rounded-full flex items-center justify-center animate-glow">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle>Brillo Aurora</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Efecto de brillo cyan celestial</p>
                  <code className="text-xs mt-2 block">glow-aurora</code>
                </CardContent>
              </Card>
              <Card className="glow-divine hover-glow text-center p-8">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 bg-divine-500 rounded-full flex items-center justify-center animate-glow">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle>Brillo Divino</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Efecto de brillo magenta radiante</p>
                  <code className="text-xs mt-2 block">glow-divine</code>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Sección 4: Animaciones */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <Star className="w-8 h-8 text-divine-500" />
              4. Animaciones Personalizadas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center p-6 animate-fade-in-up">
                <div className="mb-4">⬆️</div>
                <CardTitle className="text-lg mb-2">Fade In Up</CardTitle>
                <code className="text-xs">animate-fade-in-up</code>
              </Card>
              <Card className="text-center p-6 animate-fade-in-down">
                <div className="mb-4">⬇️</div>
                <CardTitle className="text-lg mb-2">Fade In Down</CardTitle>
                <code className="text-xs">animate-fade-in-down</code>
              </Card>
              <Card className="text-center p-6 animate-scale-in">
                <div className="mb-4">🔍</div>
                <CardTitle className="text-lg mb-2">Scale In</CardTitle>
                <code className="text-xs">animate-scale-in</code>
              </Card>
              <Card className="text-center p-6">
                <div className="mb-4 floating">🎈</div>
                <CardTitle className="text-lg mb-2">Floating</CardTitle>
                <code className="text-xs">floating</code>
              </Card>
            </div>
          </section>

          {/* Sección 5: Textos con Gradiente */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">5. Textos con Gradiente</h2>
            <div className="space-y-6">
              <div className="text-6xl font-bold text-gradient text-center">
                Texto Gradiente Básico
              </div>
              <div className="text-5xl font-bold text-gradient-cosmic text-center">
                Texto Cósmico
              </div>
              <div className="text-5xl font-bold text-gradient-aurora text-center">
                Texto Aurora
              </div>
            </div>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm font-mono">
                <Code className="inline w-4 h-4 mr-2" />
                Usa: <code className="bg-background px-2 py-1 rounded">text-gradient</code>,{' '}
                <code className="bg-background px-2 py-1 rounded">text-gradient-cosmic</code>, etc.
              </p>
            </div>
          </section>

          {/* Sección 6: Tarjetas Interactivas */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">6. Tarjetas Interactivas con Hover</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover-lift cursor-pointer">
                <CardHeader>
                  <CardTitle>Hover Lift</CardTitle>
                  <CardDescription>Se eleva al pasar el mouse</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Pasa el mouse por encima para ver el efecto</p>
                  <code className="text-xs block mt-2">hover-lift</code>
                </CardContent>
              </Card>
              <Card className="hover-scale cursor-pointer">
                <CardHeader>
                  <CardTitle>Hover Scale</CardTitle>
                  <CardDescription>Aumenta de tamaño</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Pasa el mouse por encima para ver el efecto</p>
                  <code className="text-xs block mt-2">hover-scale</code>
                </CardContent>
              </Card>
              <Card className="card-interactive cursor-pointer">
                <CardHeader>
                  <CardTitle>Card Interactive</CardTitle>
                  <CardDescription>Combinación de efectos</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Pasa el mouse por encima para ver el efecto</p>
                  <code className="text-xs block mt-2">card-interactive</code>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Sección 7: Botones Personalizados */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">7. Botones con Efectos Especiales</h2>
            <p className="text-muted-foreground mb-6">
              👆 <strong>Haz clic en cada botón</strong> para ver una demo interactiva del efecto
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-gradient-cosmic text-white hover:opacity-90" onClick={() => alert('🌌 GRADIENTE CÓSMICO\n\nEste botón usa:\nclassName="bg-gradient-cosmic"\n\nPerfecto para acciones importantes con tema espacial.')}>
                🌌 Botón Cósmico
              </Button>
              <Button className="bg-gradient-aurora text-white hover:opacity-90" onClick={() => alert('🌈 GRADIENTE AURORA\n\nEste botón usa:\nclassName="bg-gradient-aurora"\n\nIdeal para acciones positivas y de transformación.')}>
                🌈 Botón Aurora
              </Button>
              <Button className="bg-gradient-divine text-white hover:opacity-90" onClick={() => alert('🌟 GRADIENTE DIVINO\n\nEste botón usa:\nclassName="bg-gradient-divine"\n\nPerfecto para acciones espirituales o de alta importancia.')}>
                🌟 Botón Divino
              </Button>
              <Button className="animate-border bg-transparent text-white hover:scale-105 transition-transform" onClick={() => alert('🎨 BORDE ANIMADO\n\nEste botón usa:\nclassName="animate-border"\n\n¡Observa cómo el borde se mueve! Ideal para llamar la atención.')}>
                🎨 Botón Animado
              </Button>
              <Button className="relative overflow-hidden group" onClick={() => alert('⚡ EFECTO SHIMMER\n\nEste botón incluye una capa con efecto shimmer.\n\nPasa el mouse sobre él para ver el brillo moverse. ¡Muy elegante!')}>
                <span className="relative z-10">⚡ Hover Shimmer</span>
                <div className="absolute inset-0 shimmer animate-shimmer"></div>
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg" onClick={() => alert('💜 GRADIENTE PÚRPURA-ROSA\n\nEste botón usa:\nclassName="bg-gradient-to-r from-purple-600 to-pink-600"\n\nEs el mismo estilo del botón de búsqueda en /secuencias')}>
                💜 Estilo Secuencias
              </Button>
            </div>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm">
                <Sparkles className="inline w-4 h-4 mr-2 text-purple-600" />
                <strong>Tip:</strong> Estos botones ya están en uso en diferentes partes de la app. Por ejemplo, el botón "Buscar" en la sección de Secuencias usa el gradiente púrpura-rosa.
              </p>
            </div>
          </section>

          {/* Sección 8: Badges con Estilo */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">8. Badges Personalizados</h2>
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-cosmic-500 text-white">Cósmico</Badge>
              <Badge className="bg-aurora-500 text-white">Aurora</Badge>
              <Badge className="bg-divine-500 text-white">Divino</Badge>
              <Badge className="bg-gradient-cosmic text-white">Gradiente</Badge>
              <Badge className="glass-card text-white">Vidrio</Badge>
              <Badge className="glow-cosmic">Con Brillo</Badge>
              <Badge className="animate-pulse-slow bg-primary">Pulsante</Badge>
            </div>
          </section>

          {/* Guía de Uso */}
          <section className="mb-16">
            <Card className="bg-gradient-cosmic text-white">
              <CardHeader>
                <CardTitle className="text-2xl">📚 Guía Rápida de Uso</CardTitle>
                <CardDescription className="text-gray-200">
                  Cómo aplicar estos efectos en tus componentes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-bold mb-2">1. Gradientes de Fondo:</h3>
                  <code className="bg-white/10 px-3 py-1 rounded block">
                    {`<div className="bg-gradient-cosmic">...</div>`}
                  </code>
                </div>
                <div>
                  <h3 className="font-bold mb-2">2. Efectos de Vidrio:</h3>
                  <code className="bg-white/10 px-3 py-1 rounded block">
                    {`<Card className="glass-card">...</Card>`}
                  </code>
                </div>
                <div>
                  <h3 className="font-bold mb-2">3. Brillo y Glow:</h3>
                  <code className="bg-white/10 px-3 py-1 rounded block">
                    {`<Button className="glow-cosmic">...</Button>`}
                  </code>
                </div>
                <div>
                  <h3 className="font-bold mb-2">4. Animaciones:</h3>
                  <code className="bg-white/10 px-3 py-1 rounded block">
                    {`<div className="animate-fade-in-up">...</div>`}
                  </code>
                </div>
                <div>
                  <h3 className="font-bold mb-2">5. Texto con Gradiente:</h3>
                  <code className="bg-white/10 px-3 py-1 rounded block">
                    {`<h1 className="text-gradient-cosmic">...</h1>`}
                  </code>
                </div>
                <div>
                  <h3 className="font-bold mb-2">6. Hover Effects:</h3>
                  <code className="bg-white/10 px-3 py-1 rounded block">
                    {`<Card className="hover-lift">...</Card>`}
                  </code>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Paleta de Colores */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">9. Paleta de Colores Personalizada</h2>
            <div className="space-y-6">
              {/* Cosmic Colors */}
              <div>
                <h3 className="font-semibold mb-3 text-lg">Colores Cósmicos (cosmic-)</h3>
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
                <h3 className="font-semibold mb-3 text-lg">Colores Aurora (aurora-)</h3>
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
                <h3 className="font-semibold mb-3 text-lg">Colores Divinos (divine-)</h3>
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

          {/* CTA Final */}
          <section className="text-center py-12">
            <Card className="glass-card border-2 border-cosmic-500 animate-border-glow">
              <CardHeader>
                <CardTitle className="text-3xl text-gradient-cosmic">
                  ✨ ¡Haz Tu App Única!
                </CardTitle>
                <CardDescription className="text-lg">
                  Combina estos efectos para crear experiencias visuales memorables
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Todos estos efectos están disponibles en tu configuración de Tailwind CSS
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Button className="bg-gradient-cosmic text-white hover:opacity-90" onClick={() => alert('Configuración de Tailwind CSS para diseños personalizados')}>
                    Ver Configuración
                  </Button>
                  <Button variant="outline" className="hover-lift" onClick={() => alert('Consulta tailwind.config.ts y globals.css para la documentación completa')}>
                    Documentación
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