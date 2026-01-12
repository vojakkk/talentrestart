import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { LogIn, Loader2, ShieldCheck, ArrowLeft, Trophy, Briefcase, Sparkles, TrendingUp } from 'lucide-react';
import athleteLoginHero from '@/assets/athlete-login-hero.png';
import employerLoginHero from '@/assets/employer-login-hero.png';

const Login: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<'athlete' | 'employer'>('athlete');

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
        title: isAthlete ? '🏆 Vítejte zpět, šampióne!' : '🎯 Vítejte zpět!',
        description: isAthlete
          ? 'Vaše kariérní cesta pokračuje. Pojďme najít vaši příští výzvu!'
          : 'Připraveni objevit další talenty? Začněme!',
      });
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: 'Chyba přihlášení',
        description: error.message === 'Invalid login credentials'
          ? 'Nesprávný e-mail nebo heslo. Zkuste to prosím znovu.'
          : error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isAthlete = role === 'athlete';
  const themeColor = isAthlete ? 'talent' : 'restart';
  const themeGradient = isAthlete
    ? 'from-talent to-talent-light'
    : 'from-restart to-restart-light';

  return (
    <div className="min-h-screen grid lg:grid-cols-2 relative overflow-hidden bg-background">
      {/* Hero Image Section - Left Side */}
      <div className="hidden lg:block relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent z-10" />
        <img
          src={isAthlete ? athleteLoginHero : employerLoginHero}
          alt={isAthlete ? "Athlete transitioning to business" : "Professional employer team"}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
          style={{
            filter: 'brightness(0.9) contrast(1.1)',
          }}
        />

        {/* Hero Content Overlay */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-16 text-white">
          <div className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6 w-fit transition-all duration-500",
            isAthlete ? "bg-talent/90 text-white" : "bg-restart/90 text-white"
          )}>
            {isAthlete ? <Trophy className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
            {isAthlete ? 'Talent Restart Platform' : 'Employer Portal'}
          </div>

          <h2 className="text-5xl font-black mb-4 leading-tight max-w-lg">
            {isAthlete
              ? 'Vaše sportovní disciplína je vaše konkurenční výhoda'
              : 'Najděte kandidáty s vítěznou mentalitou'}
          </h2>

          <p className="text-xl text-white/90 font-medium max-w-md leading-relaxed">
            {isAthlete
              ? 'Připojte se k platformě, která rozumí hodnotě vaší sportovní kariéry a pomůže vám najít práci, kde zazáříte.'
              : 'Získejte přístup k exkluzivní databázi talentovaných sportovců připravených na novou výzvu v byznysu.'}
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-3 mt-8">
            {isAthlete ? (
              <>
                <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-bold border border-white/20">
                  ✨ AI Kariérní asistent
                </div>
                <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-bold border border-white/20">
                  🎯 Cílené příležitosti
                </div>
                <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-bold border border-white/20">
                  🚀 Rychlý start
                </div>
              </>
            ) : (
              <>
                <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-bold border border-white/20">
                  💎 Ověření kandidáti
                </div>
                <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-bold border border-white/20">
                  📊 Smart Analytics
                </div>
                <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-bold border border-white/20">
                  ⚡ AI nástroje
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Login Form Section - Right Side */}
      <div className="flex items-center justify-center relative py-12 px-4 lg:px-8">
        {/* Dynamic Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 transition-colors duration-1000">
          <div className={cn(
            "absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] animate-pulse transition-colors duration-1000",
            isAthlete ? "bg-talent/5" : "bg-restart/5"
          )} />
          <div className={cn(
            "absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] animate-pulse transition-colors duration-1000",
            isAthlete ? "bg-talent/5" : "bg-restart/5"
          )} style={{ animationDelay: '2s' }} />
        </div>

        <div className="w-full max-w-md relative z-10">
          {/* Back to Home Link */}
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-bold uppercase tracking-widest text-xs">Zpět na úvod</span>
          </Link>

          {/* Login Card */}
          <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-[2.5rem] p-10 shadow-2xl shadow-black/5 animate-fade-up overflow-hidden relative">

            {/* Top Decorative Line */}
            <div className={cn(
              "absolute top-0 left-0 w-full h-1 bg-gradient-to-r transition-all duration-500",
              themeGradient
            )} />

            <div className="text-center mb-8">
              {/* Role Switcher */}
              <div className="mb-8 p-1.5 bg-muted/40 rounded-[1.2rem] flex relative backdrop-blur-sm border border-white/5">
                <button
                  type="button"
                  onClick={() => setRole('athlete')}
                  className={cn(
                    "flex-1 py-3 px-4 rounded-[1rem] text-xs font-black transition-all duration-300 uppercase tracking-widest flex items-center justify-center gap-2",
                    isAthlete
                      ? "bg-background text-talent shadow-lg scale-[1.02] ring-1 ring-black/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  )}
                >
                  <Trophy className="w-4 h-4" />
                  Sportovec
                </button>
                <button
                  type="button"
                  onClick={() => setRole('employer')}
                  className={cn(
                    "flex-1 py-3 px-4 rounded-[1rem] text-xs font-black transition-all duration-300 uppercase tracking-widest flex items-center justify-center gap-2",
                    !isAthlete
                      ? "bg-background text-restart shadow-lg scale-[1.02] ring-1 ring-black/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  )}
                >
                  <Briefcase className="w-4 h-4" />
                  Partner
                </button>
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl font-black tracking-tight text-foreground">
                  {isAthlete ? 'Vítejte zpět!' : 'Vítejte, Partneři!'}
                </h1>
                <p className="text-muted-foreground font-medium text-base leading-relaxed">
                  {isAthlete
                    ? 'Přihlaste se a pokračujte ve své kariérní transformaci s podporou AI asistenta'
                    : 'Přístup k nejlepším talentům je jen pár kliků daleko'}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground ml-1">
                    E-mailová adresa
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={cn(
                      "rounded-2xl border-border/50 bg-muted/30 px-5 h-14 transition-all text-base",
                      "focus:bg-background focus:ring-0",
                      isAthlete ? "focus:border-talent" : "focus:border-restart"
                    )}
                    placeholder="vas.email@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-1">
                    <Label htmlFor="password" className="text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground">
                      Heslo
                    </Label>
                    <Link
                      to="/forgot-password"
                      className={cn(
                        "text-[10px] uppercase tracking-widest font-black hover:underline transition-colors",
                        isAthlete ? "text-talent" : "text-restart"
                      )}
                    >
                      Zapomněli jste?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className={cn(
                      "rounded-2xl border-border/50 bg-muted/30 px-5 h-14 transition-all text-base",
                      "focus:bg-background focus:ring-0",
                      isAthlete ? "focus:border-talent" : "focus:border-restart"
                    )}
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <Button
                type="submit"
                size="xl"
                className={cn(
                  "w-full h-16 rounded-2xl text-lg font-black shadow-xl transition-all duration-300 hover:scale-[1.02]",
                  isAthlete
                    ? "bg-talent hover:bg-talent-hover shadow-talent/20"
                    : "bg-restart hover:bg-restart-hover shadow-restart/20"
                )}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin w-5 h-5" />
                    Přihlašování...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Přihlásit se
                    <LogIn className="w-5 h-5 ml-1" />
                  </span>
                )}
              </Button>

            </form>
          </div>

          {/* Security Badge */}
          <div className="mt-8 flex justify-center items-center gap-2 text-muted-foreground/40 font-bold uppercase tracking-widest text-[10px]">
            <ShieldCheck className="w-4 h-4" />
            256-bit šifrování • Zabezpečený přístup
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
