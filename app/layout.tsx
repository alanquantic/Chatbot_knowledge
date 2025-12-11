import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import { ChatbotButton } from '@/components/chatbot-button';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Base de Datos Grigori Grabovoi - Enseñanzas y Secuencias Numéricas',
  description: 'Aplicación web interactiva completa con la base de datos de Grigori Grabovoi: biografía, libros, secuencias numéricas, guía práctica y webinars.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <ChatbotButton />
        </Providers>
      </body>
    </html>
  );
}
