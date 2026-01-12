import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Target, Users, TrendingUp, CheckCircle, Sparkles, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import heroAthlete from '@/assets/hero-athlete-clean.png';

const Athletes: React.FC = () => {
  const { t, language } = useLanguage();

  const benefits = [
    {
      icon: Award,
      title: language === 'cs' ? 'Oceníme vaše úspěchy' : language === 'de' ? 'Wir schätzen Ihre Erfolge' : 'We value your achievements',
      description: language === 'cs'
        ? 'Sportovní kariéra není prázdné místo v životopise - je to důkaz disciplíny a vytrvalosti.'
        : language === 'de'
          ? 'Eine Sportkarriere ist keine Lücke im Lebenslauf - sie ist ein Beweis für Disziplin und Ausdauer.'
          : 'An athletic career isn\'t a resume gap - it\'s proof of discipline and perseverance.',
      color: 'bg-talent/10 text-talent'
    },
    {
      icon: Target,
      title: language === 'cs' ? 'Cílené příležitosti' : language === 'de' ? 'Gezielte Möglichkeiten' : 'Targeted opportunities',
      description: language === 'cs'
        ? 'Zaměstnavatelé na naší platformě aktivně hledají sportovce a rozumí jejich hodnotě.'
        : language === 'de'
          ? 'Arbeitgeber auf unserer Plattform suchen aktiv nach Sportlern und verstehen ihren Wert.'
          : 'Employers on our platform actively seek athletes and understand their value.',
      color: 'bg-restart/10 text-restart'
    },
    {
      icon: TrendingUp,
      title: language === 'cs' ? 'AI kariérní asistent' : language === 'de' ? 'KI-Karriereassistent' : 'AI Career Assistant',
      description: language === 'cs'
        ? 'Náš AI vám pomůže přeložit sportovní dovednosti do profesního jazyka.'
        : language === 'de'
          ? 'Unsere KI hilft Ihnen, sportliche Fähigkeiten in berufliche Sprache zu übersetzen.'
          : 'Our AI helps you translate athletic skills into professional language.',
      color: 'bg-muted text-foreground'
    },
  ];

  const features = [
    language === 'cs' ? 'Profil zdarma navždy' : language === 'de' ? 'Profil für immer kostenlos' : 'Profile free forever',
    language === 'cs' ? 'AI vylepšení životopisu' : language === 'de' ? 'KI-Lebenslaufverbesserung' : 'AI CV improvement',
    language === 'cs' ? 'Přímé přihlášky na pozice' : language === 'de' ? 'Direkte Bewerbungen' : 'Direct job applications',
    language === 'cs' ? 'Sledování stavu přihlášek' : language === 'de' ? 'Bewerbungsverfolgung' : 'Application status tracking',
    language === 'cs' ? 'Personalizovaná doporučení' : language === 'de' ? 'Personalisierte Empfehlungen' : 'Personalized recommendations',
  ];

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative py-28 md:py-48 overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-talent/5 -skew-x-12 translate-x-1/4 -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-restart/5 rounded-full blur-[100px] -z-10" />

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-2xl animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-talent/10 text-talent text-sm font-bold uppercase tracking-widest mb-8">
                <Rocket className="w-4 h-4" />
                Váš nový začátek
              </div>

              <h1 className="text-display-md md:text-display-lg font-black mb-8 leading-[1.05]">
                <span className="block">{language === 'cs' ? 'Vaše sportovní kariéra' : 'Your athletic career'}</span>
                <span className="block text-gradient-brand mt-1">{language === 'cs' ? 'má obrovskou hodnotu' : 'has enormous value'}</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-10 leading-relaxed font-medium">
                {language === 'cs'
                  ? 'Talent Restart je první pracovní portál v ČR, který chápe, že disciplína na hřišti se promítá do úspěchu v práci.'
                  : 'Talent Restart is the first job portal in CZ that understands discipline on the field translates to success at work.'}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 bg-muted/40 p-4 rounded-2xl border border-border/50 animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-talent/20 flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-talent" />
                    </div>
                    <span className="font-bold text-sm tracking-tight">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Button variant="talent" size="xl" className="h-16 px-10 rounded-2xl text-lg shadow-xl shadow-talent/20" asChild>
                  <Link to="/signup?role=athlete">
                    {t('hero.cta.athlete')}
                    <ArrowRight className="ml-2 h-6 w-6" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative animate-fade-in stagger-2 opacity-0">
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white dark:border-muted-foreground/20 aspect-square lg:aspect-[4/5]">
                <img
                  src={heroAthlete}
                  alt="Elite Athlete"
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-10 -left-10 bg-white dark:bg-card p-6 rounded-3xl shadow-2xl border border-border animate-float z-20 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-restart rounded-2xl flex items-center justify-center text-white">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-foreground">100%</div>
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Podpora komunity</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 md:py-32 bg-surface-sunken">
        <div className="container">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-display-sm md:text-display-md font-black mb-6">
              Proč zvolit <span className="text-talent">Talent Restart?</span>
            </h2>
            <p className="text-xl text-muted-foreground font-medium">
              S námi nepíšete jen životopis, ale vyprávíte příběh svého úspěchu.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group bg-card border border-border/50 rounded-3xl p-10 hover:shadow-2xl hover:shadow-talent/5 transition-all duration-500 animate-fade-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className={cn("inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-8 group-hover:rotate-6 transition-transform duration-500", benefit.color)}>
                  <benefit.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-black mb-4 tracking-tight">{benefit.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed font-medium">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-40">
        <div className="container text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-display-sm md:text-display-lg font-black mb-8 leading-tight">
              {language === 'cs' ? 'Začněte svou novou etapu ještě dnes' : 'Start your new chapter today'}
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
              Registrace trvá méně než 2 minuty. Připojte se k exkluzivní síti sportovců a elitních zaměstnavatelů.
            </p>
            <Button variant="talent" size="xl" className="h-16 px-12 rounded-2xl text-lg font-black shadow-xl" asChild>
              <Link to="/signup?role=athlete">
                Vytvořit si profil zdarma
                <ArrowRight className="ml-2 h-6 w-6" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Athletes;
