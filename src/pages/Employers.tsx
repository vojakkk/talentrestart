import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Sparkles, Shield, BarChart, Award, Briefcase, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const Employers: React.FC = () => {
  const { t, language, currency } = useLanguage();

  const benefits = [
    {
      icon: Users,
      title: language === 'cs' ? 'Kvalitní kandidáti' : language === 'de' ? 'Qualitätskandidaten' : 'Quality candidates',
      description: language === 'cs'
        ? 'Sportovci přinášejí disciplínu, týmovou práci a schopnost pracovat pod tlakem.'
        : language === 'de'
          ? 'Sportler bringen Disziplin, Teamarbeit und die Fähigkeit, unter Druck zu arbeiten.'
          : 'Athletes bring discipline, teamwork, and ability to perform under pressure.',
      color: 'bg-restart/10 text-restart'
    },
    {
      icon: Sparkles,
      title: language === 'cs' ? 'AI asistent' : language === 'de' ? 'KI-Assistent' : 'AI Assistant',
      description: language === 'cs'
        ? 'Náš AI vám pomůže napsat lepší popisy práce a rychle shrnout profily kandidátů.'
        : language === 'de'
          ? 'Unsere KI hilft Ihnen, bessere Stellenbeschreibungen zu schreiben und Kandidatenprofile schnell zusammenzufassen.'
          : 'Our AI helps you write better job descriptions and quickly summarize candidate profiles.',
      color: 'bg-talent/10 text-talent'
    },
    {
      icon: Shield,
      title: language === 'cs' ? 'Ověření sportovci' : language === 'de' ? 'Verifizierte Sportler' : 'Verified athletes',
      description: language === 'cs'
        ? 'Každý profil je ověřen, abyste věděli, že máte před sebou skutečné sportovce.'
        : language === 'de'
          ? 'Jedes Profil ist verifiziert, damit Sie wissen, dass Sie echte Sportler vor sich haben.'
          : 'Every profile is verified so you know you\'re dealing with real athletes.',
      color: 'bg-muted text-foreground'
    },
  ];

  const stats = [
    { label: 'Ověřených talentů', value: '1,500+' },
    { label: 'Úspěšnost spojení', value: '94%' },
    { label: 'Ušetřený čas', value: '45%' },
  ];

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative py-28 md:py-40 overflow-hidden bg-muted/30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.05),transparent)] -z-10" />

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-background">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000"
                  alt="Professional office meeting"
                  className="w-full h-full object-cover aspect-[4/3]"
                />
              </div>
              {/* Floating Stat Card */}
              <div className="absolute -top-10 -right-10 bg-white dark:bg-card p-8 rounded-3xl shadow-xl border border-border animate-fade-up z-20">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Nábor dokončen</span>
                  <span className="text-3xl font-black text-talent">3.5x rychleji</span>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-restart/10 text-restart text-sm font-bold uppercase tracking-widest">
                <Briefcase className="w-4 h-4" />
                Partner v náboru
              </div>

              <h1 className="text-display-md md:text-display-lg font-black leading-tight">
                {language === 'cs'
                  ? 'Najděte kandidáty, kteří vědí, co je'
                  : 'Find candidates who know what'}
                <span className="block text-gradient-brand">{language === 'cs' ? 'skutečný výkon' : 'true performance means'}</span>
              </h1>

              <p className="text-xl text-muted-foreground font-medium leading-relaxed max-w-xl">
                {language === 'cs'
                  ? 'Sportovci trénují roky, aby dosáhli špičkových výsledků. Přiveďte tuhle vítěznou mentalitu do své firmy.'
                  : 'Athletes train for years for peak performance. Bring that winning mentality to your company.'}
              </p>

              <div className="flex flex-col sm:flex-row gap-5 pt-4">
                <Button variant="restart" size="xl" className="h-16 px-10 rounded-2xl text-lg shadow-xl shadow-restart/20" asChild>
                  <Link to="/pricing">
                    {t('nav.pricing')}
                    <ArrowRight className="ml-2 h-6 w-6" />
                  </Link>
                </Button>
                <Button variant="ghost" size="xl" className="h-16 px-10 rounded-2xl text-lg font-bold" asChild>
                  <Link to="/contact">
                    Nezávazná konzultace
                  </Link>
                </Button>
              </div>

              <div className="flex items-center gap-10 pt-8 border-t border-border/50">
                {stats.map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-2xl font-black">{stat.value}</span>
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-tighter">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group relative bg-card border border-border/50 rounded-3xl p-10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-fade-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className={cn("inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-8 group-hover:scale-110 transition-transform duration-500", benefit.color)}>
                  <benefit.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-black mb-4 tracking-tight">{benefit.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed font-medium">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Features */}
      <section className="py-24 bg-muted/50 border-y border-border/50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <h2 className="text-3xl md:text-5xl font-black">{language === 'cs' ? 'Budoucnost náboru je v disciplíně' : 'The future of hiring is in discipline'}</h2>
            <div className="grid sm:grid-cols-2 gap-8 text-left p-10 bg-background rounded-[2rem] border border-border shadow-xl">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-talent/10 rounded-xl flex items-center justify-center text-talent">
                  <Zap className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold">Rychlá integrace</h4>
                <p className="text-muted-foreground font-medium">Naše platforma se propojí s vaším stávajícím HR procesem během jediného dne.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-restart/10 rounded-xl flex items-center justify-center text-restart">
                  <BarChart className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold">Datová analýza</h4>
                <p className="text-muted-foreground font-medium">Sledujte metriky svých inzerátů a kvalitu kandidátů v reálném čase přes přehledný dashboard.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-40">
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-talent/10 text-talent text-sm font-bold uppercase tracking-widest mb-8">
            <Award className="w-4 h-4" />
            Vybírejte si ty nejlepší
          </div>
          <h2 className="text-display-sm md:text-display-md font-black mb-12">Připraveni proměnit svůj tým?</h2>
          <div className="flex justify-center gap-6">
            <Button variant="restart" size="xl" className="h-16 px-12 rounded-2xl text-lg font-black shadow-xl" asChild>
              <Link to="/pricing">Zobrazit ceník služeb</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Employers;
