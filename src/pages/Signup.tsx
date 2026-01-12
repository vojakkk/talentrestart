import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2, AlertCircle, Loader2, UserPlus, ArrowLeft, ShieldCheck } from 'lucide-react';

const Signup: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  // Read initial role from URL: ?role=employer
  const initialRole = searchParams.get('role') === 'employer' ? 'employer' : 'athlete';
  const [role, setRole] = useState<'athlete' | 'employer'>(initialRole);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;

    if (password !== confirmPassword) {
      toast({
        title: 'Chyba',
        description: 'Hesla se neshodují.',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    try {
      // 1. Sign up user
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            role: role,
            user_role: role,
            account_type: role,
          },
        },
      });

      if (signUpError) throw signUpError;

      if (data.user) {
        // 2. Create profile entry manually
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              first_name: firstName,
              last_name: lastName,
              role: role,
              user_role: role,
              account_type: role,
            },
          ]);

        if (profileError) {
          console.error('Profile creation error:', profileError);
        }

        setIsSuccess(true);
        toast({
          title: 'Registrace úspěšná!',
          description: 'Zkontrolujte svůj e-mail pro potvrzení účtu.',
        });
      }
    } catch (error: any) {
      toast({
        title: 'Registrace selhala',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center animate-fade-in bg-background">
        <div className="w-24 h-24 bg-talent-light rounded-full flex items-center justify-center mb-8 shadow-glow-talent rotate-6">
          <CheckCircle2 className="w-12 h-12 text-talent" />
        </div>
        <h2 className="text-4xl font-black mb-4">Účet byl vytvořen!</h2>
        <p className="text-muted-foreground text-xl max-w-sm mb-10 font-medium">
          Poslali jsme vám potvrzovací e-mail. Klikněte prosím na odkaz v e-mailu pro aktivaci účtu.
        </p>
        <Button variant="talent" size="xl" className="h-16 px-12 rounded-2xl text-lg font-black shadow-xl" asChild>
          <Link to="/login">Přejít na přihlášení</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background py-20 px-4">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-[-5%] right-[-5%] w-[50%] h-[50%] bg-talent/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[50%] h-[50%] bg-restart/5 rounded-full blur-[150px]" />
      </div>

      <div className="w-full max-w-lg relative z-10">
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-talent transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest text-xs">Zpět na úvod</span>
        </Link>

        {/* Signup Card */}
        <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-[3rem] p-10 lg:p-12 shadow-2xl animate-fade-up">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black mb-3">Vytvořit účet</h1>
            <p className="text-muted-foreground font-medium">{t('signup.subtitle')}</p>
          </div>

          <div className="mb-10 p-2 bg-muted/30 rounded-[1.5rem] flex gap-2">
            <button
              type="button"
              onClick={() => setRole('athlete')}
              className={cn(
                "flex-1 py-4 px-4 rounded-[1.2rem] text-sm font-black transition-all duration-300 uppercase tracking-widest",
                role === 'athlete'
                  ? "bg-talent text-white shadow-lg shadow-talent/20 scale-[1.02]"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/10"
              )}
            >
              {t('signup.athlete')}
            </button>
            <button
              type="button"
              onClick={() => setRole('employer')}
              className={cn(
                "flex-1 py-4 px-4 rounded-[1.2rem] text-sm font-black transition-all duration-300 uppercase tracking-widest",
                role === 'employer'
                  ? "bg-restart text-white shadow-lg shadow-restart/20 scale-[1.02]"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/10"
              )}
            >
              {t('signup.employer')}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">{t('signup.firstName')}</Label>
                <Input name="firstName" required className="rounded-2xl h-14 bg-muted/30 border-border/50 focus:border-talent transition-all" placeholder="Jan" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">{t('signup.lastName')}</Label>
                <Input name="lastName" required className="rounded-2xl h-14 bg-muted/30 border-border/50 focus:border-talent transition-all" placeholder="Novák" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">{t('signup.email')}</Label>
              <Input name="email" type="email" required className="rounded-2xl h-14 bg-muted/30 border-border/50 focus:border-talent transition-all" placeholder="email@example.com" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">{t('signup.password')}</Label>
                <Input name="password" type="password" required className="rounded-2xl h-14 bg-muted/30 border-border/50 focus:border-talent transition-all" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Potvrdit</Label>
                <Input name="confirmPassword" type="password" required className="rounded-2xl h-14 bg-muted/30 border-border/50 focus:border-talent transition-all" placeholder="••••••••" />
              </div>
            </div>

            <Button
              type="submit"
              variant={role === 'athlete' ? 'talent' : 'restart'}
              size="xl"
              className="w-full h-16 rounded-2xl text-lg font-black shadow-xl transition-all active:scale-95 mt-4"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : (role === 'athlete' ? t('signup.submitAthlete') : t('signup.submitEmployer'))}
            </Button>

            <p className="text-center text-sm text-muted-foreground pt-4 font-medium">
              {t('signup.hasAccount')}{' '}
              <Link to="/login" className="text-talent hover:underline font-black ml-1 transition-colors">
                {t('signup.loginLink')}
              </Link>
            </p>
          </form>
        </div>

        {/* Security Info */}
        <div className="mt-8 flex justify-center items-center gap-2 text-muted-foreground/40 font-bold uppercase tracking-widest text-[10px]">
          <ShieldCheck className="w-4 h-4" />
          Bezpečné šifrování dat přes Supabase
        </div>
      </div>
    </div>
  );
};

export default Signup;
