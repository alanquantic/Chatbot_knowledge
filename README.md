# 🌟 Base de Datos Grigori Grabovoi

Aplicación web interactiva completa con la base de datos de las enseñanzas de Grigori Grabovoi: biografía, libros, secuencias numéricas, guía práctica, webinars y dispositivo PRK-1U.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC?logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-6.7-2D3748?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?logo=postgresql)

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [API Endpoints](#-api-endpoints)
- [Base de Datos](#-base-de-datos)

## ✨ Características

### 📚 Biblioteca de Libros
- **20+ obras fundamentales** de Grigori Grabovoi
- Búsqueda y filtrado por categoría
- Información detallada de cada libro (año, editorial, páginas, resumen)
- Sistema de favoritos para usuarios autenticados

### 🔢 Catálogo de Secuencias Numéricas
- **162+ secuencias numéricas** organizadas en 8 categorías:
  - 💊 Salud Física
  - 🧠 Salud Mental y Emocional
  - 💰 Abundancia y Prosperidad
  - ❤️ Relaciones y Amor
  - 🌌 Desarrollo Espiritual
  - ✨ Manifestación General
  - 🌸 Rejuvenecimiento y Belleza
  - 🛡️ Protección y Armonización
- Búsqueda por propósito o número
- Visualización con esferas interactivas animadas
- Top 5 secuencias esenciales destacadas

### 📖 Guía Práctica Completa
- Métodos de concentración paso a paso
- Ejercicios prácticos detallados
- Recomendaciones para aplicar las enseñanzas
- Guías descargables en formato Markdown

### 🎥 Webinars Analizados
- **10+ webinars** con contenido resumido
- Enseñanzas clave extraídas
- Ejercicios prácticos de cada sesión

### 🔬 Dispositivo PRK-1U
- Información completa sobre el dispositivo tecnológico
- Guía de acceso a la plataforma oficial
- Modos de uso y beneficios
- Instrucciones de configuración

### 📓 Diario de Manifestaciones
- Registro de prácticas diarias
- Seguimiento de secuencias utilizadas
- Métricas de estado emocional (antes/después)
- **Sistema de gamificación**:
  - Niveles y experiencia (XP)
  - Rachas de práctica consecutiva
  - Estadísticas detalladas
- **Análisis con Inteligencia Artificial**:
  - Insights personalizados
  - Sugerencias basadas en patrones
  - Resúmenes de progreso

### 💬 Asistente Virtual (Chatbot)
- Chatbot integrado con Abacus.ai
- Experto en enseñanzas de Grabovoi
- Respuestas contextualizadas

### 🔐 Sistema de Autenticación
- Registro e inicio de sesión con credenciales
- Autenticación segura con NextAuth.js
- Sesiones basadas en JWT
- Protección de rutas para contenido exclusivo

### 🎨 Interfaz de Usuario
- **Diseño moderno** con efectos glassmorphism
- Gradientes cósmicos y animaciones fluidas
- Tema claro/oscuro automático
- Totalmente responsive (móvil, tablet, desktop)
- Transiciones de página suaves con Framer Motion

## 🛠 Tecnologías

### Frontend
- **Next.js 14** - Framework React con App Router
- **TypeScript 5.2** - Tipado estático
- **Tailwind CSS 3.3** - Estilos utilitarios
- **Radix UI** - Componentes accesibles
- **Framer Motion** - Animaciones
- **Lucide React** - Iconografía
- **shadcn/ui** - Sistema de componentes

### Backend
- **Next.js API Routes** - Endpoints serverless
- **NextAuth.js 4.24** - Autenticación
- **Prisma 6.7** - ORM para base de datos
- **bcryptjs** - Encriptación de contraseñas
- **Zod** - Validación de schemas

### Base de Datos
- **PostgreSQL** - Base de datos relacional
- **Prisma Client** - Cliente tipado

### Herramientas
- **ESLint** - Linting de código
- **Prettier** - Formateo de código
- **tsx** - Ejecución de TypeScript

## 📁 Estructura del Proyecto

```
grabovoi_app/nextjs_space/
├── app/                          # App Router de Next.js
│   ├── api/                      # API Routes
│   │   ├── auth/[...nextauth]/   # Autenticación NextAuth
│   │   ├── favorites/            # CRUD de favoritos
│   │   ├── journal/              # Diario de manifestaciones
│   │   │   ├── analyze/          # Análisis con IA
│   │   │   └── stats/            # Estadísticas de usuario
│   │   └── signup/               # Registro de usuarios
│   ├── auth/                     # Páginas de autenticación
│   │   ├── login/                # Inicio de sesión
│   │   └── signup/               # Registro
│   ├── bienvenida/               # Página de bienvenida
│   ├── diario/                   # Diario de manifestaciones
│   ├── disenos/                  # Página de diseños
│   ├── favoritos/                # Favoritos del usuario
│   ├── guia/                     # Guía práctica
│   ├── libros/                   # Catálogo de libros
│   │   └── [id]/                 # Detalle de libro
│   ├── prk1u/                    # Información PRK-1U
│   ├── secuencias/               # Catálogo de secuencias
│   ├── webinars/                 # Webinars
│   ├── globals.css               # Estilos globales
│   ├── layout.tsx                # Layout principal
│   └── page.tsx                  # Página de inicio
├── components/                   # Componentes React
│   ├── ui/                       # Componentes shadcn/ui (50+)
│   ├── breadcrumbs.tsx           # Navegación breadcrumb
│   ├── chatbot-button.tsx        # Botón del chatbot
│   ├── chatbot-widget.tsx        # Widget del chatbot
│   ├── favorite-button.tsx       # Botón de favoritos
│   ├── footer.tsx                # Pie de página
│   ├── navbar.tsx                # Barra de navegación
│   ├── page-layout.tsx           # Layout de páginas
│   ├── providers.tsx             # Providers de contexto
│   ├── sequence-sphere.tsx       # Esfera animada de secuencias
│   └── welcome-banner.tsx        # Banner de bienvenida
├── lib/                          # Utilidades y configuración
│   ├── auth-options.ts           # Configuración NextAuth
│   ├── db.ts                     # Cliente Prisma
│   ├── types.ts                  # Tipos TypeScript
│   └── utils.ts                  # Funciones utilitarias
├── prisma/
│   └── schema.prisma             # Schema de base de datos
├── public/
│   └── data/                     # Datos estáticos JSON/MD
│       ├── grabovoi_database.json
│       ├── GUIA_COMPLETA_PRK1U.md
│       ├── GUIA_RAPIDA_GRABOVOI.md
│       ├── INDICE_RAPIDO_POR_NECESIDAD.md
│       └── LISTA_COMPLETA_SECUENCIAS.md
├── scripts/
│   └── seed.ts                   # Seed de base de datos
├── types/
│   └── next-auth.d.ts            # Tipos extendidos NextAuth
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 🚀 Instalación

### Prerrequisitos

- Node.js 18+ 
- npm o yarn
- PostgreSQL 15+

### Pasos

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd grabovoi_app/nextjs_space
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
```

4. **Configurar base de datos**
```bash
npx prisma generate
npx prisma db push
```

5. **Iniciar en desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## ⚙️ Configuración

### Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
# Base de datos PostgreSQL
DATABASE_URL="postgresql://usuario:password@localhost:5432/grabovoi_db?schema=public"

# NextAuth.js
NEXTAUTH_SECRET="tu-secreto-seguro-de-32-caracteres-minimo"
NEXTAUTH_URL="http://localhost:3000"

# OpenAI (para análisis IA + chatbot)
OPENAI_API_KEY="tu-api-key"
```

## 🟣 Neon + Vercel (DB vacía)

Si apuntas `DATABASE_URL` a una **base vacía**, necesitas aplicar migraciones antes de usar `/api/signup`, login, diario o favoritos.

- **Local**:
  - `npx prisma migrate dev --name init`
- **Vercel**:
  - El proyecto ya incluye el script `vercel-build` que ejecuta:
    - `prisma migrate deploy`
    - `next build`
  - Asegúrate de configurar `DATABASE_URL` (idealmente **pooled** para serverless) en Vercel.

### Generar NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

## 📖 Uso

### Navegación Principal

| Ruta | Descripción |
|------|-------------|
| `/` | Página de inicio con resumen |
| `/libros` | Catálogo de 20+ libros |
| `/secuencias` | 162+ secuencias numéricas |
| `/guia` | Guía práctica completa |
| `/webinars` | Webinars analizados |
| `/prk1u` | Información dispositivo PRK-1U |
| `/diario` | Diario de manifestaciones (auth) |
| `/favoritos` | Favoritos guardados (auth) |

### Funciones de Usuario

1. **Explorar sin cuenta**: Acceso a libros, secuencias, guías y webinars
2. **Crear cuenta**: Desbloquea favoritos y diario de manifestaciones
3. **Usar el diario**: Registra prácticas y obtén análisis con IA

## 🔌 API Endpoints

### Autenticación
- `POST /api/auth/[...nextauth]` - NextAuth handlers
- `POST /api/signup` - Registro de usuario

### Favoritos
- `GET /api/favorites` - Obtener favoritos del usuario
- `POST /api/favorites` - Agregar favorito
- `DELETE /api/favorites` - Eliminar favorito

### Diario
- `GET /api/journal` - Obtener entradas del diario
- `POST /api/journal` - Crear nueva entrada
- `DELETE /api/journal/[id]` - Eliminar entrada
- `GET /api/journal/stats` - Estadísticas del usuario
- `POST /api/journal/analyze` - Análisis con IA

## 🗃️ Base de Datos

### Modelos Prisma

```prisma
User            # Usuarios registrados
Account         # Cuentas OAuth (NextAuth)
Session         # Sesiones activas
VerificationToken # Tokens de verificación
Favorite        # Libros/secuencias favoritas
JournalEntry    # Entradas del diario
UserStats       # Estadísticas y gamificación
```

### Esquema de Gamificación

- **Experiencia (XP)**: Ganada por cada práctica registrada
- **Niveles**: Calculados por XP acumulada
- **Rachas**: Días consecutivos de práctica
- **Estadísticas**: Total prácticas, minutos, mejoras de ánimo

## 📄 Licencia

Este proyecto es de uso educativo y está basado en las enseñanzas públicas de Grigori Grabovoi.

---

Desarrollado con 💜 para la comunidad de estudiantes de las enseñanzas de Grigori Grabovoi

