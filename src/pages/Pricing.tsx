import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Star, ShieldCheck, Zap, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const Pricing: React.FC = () => {
  const { t, currency, language } = useLanguage();

  const plans = [
    {
      name: t('pricing.standard'),
      priceMonthly: currency === 'CZK' ? '2 404 Kč' : '99 €',
      priceYearly: currency === 'CZK' ? '28 852 Kč' : '1 188 €',
      description: language === 'cs' ? 'Ideální pro malé firmy začínající s náborem sportovců.' : 'Ideal for small companies starting with athlete recruitment.',
      features: [
        t('pricing.features.jobs'),
        t('pricing.features.applicants'),
        t('pricing.features.ai'),
        language === 'cs' ? 'Základní podpora' : 'Basic support',
      ],
      highlighted: false,
      cta: t('pricing.cta'),
      variant: 'restart-outline' as const,
    },
    {
      name: t('pricing.pro'),
      priceMonthly: currency === 'CZK' ? '4 833 Kč' : '199 €',
      priceYearly: currency === 'CZK' ? '57 996 Kč' : '2 388 €',
      description: language === 'cs' ? 'Pro firmy, které to s budováním elitních týmů myslí vážně.' : 'For companies serious about building elite teams.',
      features: [
        t('pricing.features.jobs'),
        t('pricing.features.applicants'),
        t('pricing.features.ai'),
        t('pricing.features.support'),
        t('pricing.features.analytics'),
        t('pricing.features.branding'),
        language === 'cs' ? 'Prioritní přístup k talentům' : 'Priority talent access',
      ],
      highlighted: true,
      cta: language === 'cs' ? 'Získat Pro verzi' : 'Get Pro Version',
      variant: 'talent' as const,
    },
  ];

  return (
    <div className="bg-background">
      {/* Header section with background blur */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-talent/5 rounded-full blur-[120px] -z-10" />

        <div className="container relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-talent/10 text-talent text-sm font-bold uppercase tracking-widest mb-8 animate-fade-up">
            <Zap className="w-4 h-4" />
            {t('pricing.transparent')}
          </div>

          <h1 className="text-display-md md:text-display-lg font-black mb-6 leading-tight animate-fade-up">
            {t('pricing.title')}
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-medium animate-fade-up stagger-1">
            {t('pricing.subtitle')}
          </p>

          <div className="inline-flex items-center gap-4 p-4 rounded-[2rem] bg-muted/50 border border-border animate-fade-up stagger-2">
            <div className="w-10 h-10 rounded-full bg-white dark:bg-card flex items-center justify-center text-talent shadow-md">
              <Heart className="w-5 h-5 fill-talent" />
            </div>
            <p className="font-bold text-foreground">
              {t('pricing.athletesFree')}
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-32">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={cn(
                  "relative flex flex-col bg-card border rounded-[2.5rem] p-10 lg:p-12 transition-all duration-500 animate-fade-up",
                  plan.highlighted
                    ? "border-talent shadow-2xl shadow-talent/10 ring-4 ring-talent/5 scale-[1.02]"
                    : "border-border hover:border-muted-foreground/30 shadow-xl"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.highlighted && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-talent text-white text-xs font-black uppercase tracking-[0.2em] px-6 py-2 rounded-full shadow-lg">
                    {t('pricing.popular')}
                  </div>
                )}

                <div className="mb-10">
                  <h3 className="text-3xl font-black mb-3">{plan.name}</h3>
                  <p className="text-muted-foreground font-medium leading-relaxed">{plan.description}</p>
                </div>

                <div className="mb-12">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black tracking-tighter">{plan.priceMonthly}</span>
                    <span className="text-muted-foreground font-bold">/ {t('pricing.perMonth')}</span>
                  </div>
                  <p className="text-sm text-muted-foreground font-bold mt-2 uppercase tracking-widest opacity-60">
                    {plan.priceYearly} / {t('pricing.perYear')}
                  </p>
                </div>

                <div className="flex-grow">
                  <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-6">{language === 'cs' ? 'Co je zahrnuto:' : 'What is included:'}</p>
                  <ul className="space-y-5 mb-12">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-4">
                        <div className={cn(
                          "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5",
                          plan.highlighted ? "bg-talent/20 text-talent" : "bg-muted text-muted-foreground"
                        )}>
                          <Check className="h-4 w-4" strokeWidth={3} />
                        </div>
                        <span className="text-foreground font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  variant={plan.variant}
                  size="xl"
                  className={cn(
                    "w-full h-16 rounded-2xl text-lg font-black transition-all active:scale-95",
                    plan.highlighted ? "shadow-xl shadow-talent/20" : "hover:bg-muted"
                  )}
                  asChild
                >
                  <Link to="/signup?role=employer">
                    {plan.cta}
                    <ArrowRight className="ml-2 h-6 w-6" />
                  </Link>
                </Button>

                <p className="text-center text-xs font-bold text-muted-foreground mt-6 uppercase tracking-widest opacity-50">
                  {t('pricing.noFees')}
                </p>
              </div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-border/50 max-w-5xl mx-auto">
            {[
              { icon: ShieldCheck, label: t('pricing.secure') },
              { icon: Star, label: t('pricing.support') },
              { icon: Zap, label: t('pricing.instant') },
              { icon: Zap, label: t('pricing.fair') },
            ].map((badge, i) => (
              <div key={i} className="flex flex-col items-center gap-3 text-center opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                <badge.icon className="w-6 h-6 text-muted-foreground" />
                <span className="text-xs font-black uppercase tracking-widest">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
