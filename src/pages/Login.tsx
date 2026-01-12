import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { LogIn, Loader2, ShieldCheck, ArrowLeft } from 'lucide-react';

const Login: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: 'Vítejte zpět!',
        description: 'Přihlášení proběhlo úspěšně.',
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: 'Chyba přihlášení',
        description: error.message === 'Invalid login credentials'
          ? 'Nesprávný e-mail nebo heslo.'
          : error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background py-12 px-4">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-talent/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-restart/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Back to Home Link */}
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-talent transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest text-xs">Zpět na úvod</span>
        </Link>

        {/* Login Card */}
        <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-[2.5rem] p-10 shadow-2xl shadow-talent/5 animate-fade-up">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-talent to-restart rounded-3xl mb-6 shadow-xl rotate-3">
              <LogIn className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-black mb-3">Vítejte zpět</h1>
            <p className="text-muted-foreground font-medium">{t('login.subtitle')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground ml-1">
                  {t('login.email')}
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="rounded-2xl border-border/50 bg-muted/30 focus:bg-background focus:border-talent px-5 h-14 transition-all text-base"
                  placeholder="name@example.com"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <Label htmlFor="password" className="text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground">
                    {t('login.password')}
                  </Label>
                  <Link to="/forgot-password" className="text-[10px] uppercase tracking-widest text-talent font-black hover:underline">Zapomenuté heslo?</Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="rounded-2xl border-border/50 bg-muted/30 focus:bg-background focus:border-talent px-5 h-14 transition-all text-base"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button type="submit" variant="talent" size="xl" className="w-full h-16 rounded-2xl text-lg font-black shadow-xl shadow-talent/20 animate-fade-up stagger-1" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : (
                <span className="flex items-center gap-2">
                  {t('login.submit')}
                  <LogIn className="w-5 h-5 ml-1" />
                </span>
              )}
            </Button>

            <div className="pt-6 border-t border-border/50 text-center">
              <p className="text-sm text-muted-foreground font-medium">
                {t('login.noAccount')}{' '}
                <Link to="/signup" className="text-talent hover:underline font-black ml-1">
                  {t('login.signupLink')}
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Security Badge */}
        <div className="mt-8 flex justify-center items-center gap-2 text-muted-foreground/40 font-bold uppercase tracking-widest text-[10px]">
          <ShieldCheck className="w-4 h-4" />
          Zabezpečený přístup přes Supabase
        </div>
      </div>
    </div>
  );
};

export default Login;
