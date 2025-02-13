'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle2 } from 'lucide-react';
import LayoutSidebar from '@/components/layout-sidebar';
import Image from 'next/image';
import Link from 'next/link';
import supabaseClient from '@/lib/supabase-client';
import { useTranslations } from 'next-intl';

type ForgotPasswordFormInputs = {
  email: string;
};

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const t = useTranslations();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordFormInputs>();

  const onSubmit = async (input: ForgotPasswordFormInputs) => {
    setIsLoading(true);
    try {
      const { error } = await supabaseClient.auth.resetPasswordForEmail(input.email, {
        redirectTo: new URL('/change-password', window.location.origin).toString(),
      });

      if (error) throw error;

      setIsSuccess(true);
      reset();
    } catch (error) {
      console.error(error);
      setError('root.serverError', {
        message: error instanceof Error ? error.message : t('auth.resetPassword.sendError'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LayoutSidebar
      containerClassName="bg-muted/50"
      contentClassName="flex w-full h-full items-center justify-center"
    >
      <Card className="max-w-md w-full">
        <CardHeader className="flex justify-center items-center gap-4">
          <Image src="/images/logo.svg" alt={t('common.logo')} width={150} height={100} />
          <CardTitle className="text-center text-lg font-extrabold">
            {t('auth.resetPassword.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isSuccess ? (
            <div className="space-y-6">
              <Alert className="border-green-500 bg-green-50">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <AlertDescription className="text-green-700 ml-2">
                  {t('auth.resetPassword.successMessage')}
                </AlertDescription>
              </Alert>
              <div className="text-center">
                <Link
                  href="/auth/login"
                  className="text-sm font-medium text-primary hover:text-primary/80"
                >
                  {t('auth.resetPassword.returnToLogin')}
                </Link>
              </div>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t('auth.emailLabel')}</Label>
                  <Input
                    {...register('email', {
                      required: t('auth.emailRequired'),
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: t('auth.emailInvalid'),
                      },
                    })}
                    id="email"
                    type="email"
                    placeholder={t('auth.resetPassword.emailPlaceholder')}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('auth.resetPassword.sendingButton')}
                  </>
                ) : (
                  t('auth.resetPassword.sendButton')
                )}
              </Button>

              {errors.root?.serverError && (
                <Alert variant="destructive">
                  <AlertDescription>{errors.root.serverError.message}</AlertDescription>
                </Alert>
              )}

              <div className="text-center">
                <Link
                  href="/auth/login"
                  className="text-sm font-medium text-primary hover:text-primary/80"
                >
                  {t('auth.resetPassword.backToLogin')}
                </Link>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </LayoutSidebar>
  );
}
