"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Link, useRouter } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function LoginPage() {
  const router = useRouter();
  const t = useTranslations('auth.login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(t('errors.invalidCredentials'));
      } else {
        router.push('/');
        router.refresh();
      }
    } catch (err) {
      setError(t('errors.generic'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-purple-950 dark:via-gray-900 dark:to-blue-950 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-4">
            <div className="rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 p-3">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold">Grigori Grabovoi</span>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('title')}</CardTitle>
            <CardDescription>
              {t('subtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">{t('email.label')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('email.placeholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t('password.label')}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('submit.loading')}
                  </>
                ) : (
                  t('submit.label')
                )}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                {t('noAccount')}{' '}
                <Link href="/auth/signup" className="text-primary hover:underline">
                  {t('signupLink')}
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
            {t('backHome')}
          </Link>
        </div>
      </div>
    </div>
  );
}
