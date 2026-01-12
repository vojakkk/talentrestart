import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Briefcase, Sparkles, ChevronRight, TrendingUp, Target, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import heroAthlete from '@/assets/hero-athlete-clean.png';
import athleteDashboardHero from '@/assets/athlete-dashboard-hero.png';
import employerDashboardHero from '@/assets/employer-dashboard-hero.png';
import tomasEliska from '@/assets/tomas-eliska.png';

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  const role = user?.user_metadata?.role || user?.user_metadata?.user_role || user?.user_metadata?.account_type;
  const firstName = user?.user_metadata?.first_name || 'User';
  const isAthlete = role === 'athlete';

  // Determine which hero image to use
  const heroImage = user
    ? (isAthlete ? athleteDashboardHero : employerDashboardHero)
    : heroAthlete;

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt={user ? (isAthlete ? "Career Development" : "Talent Recruitment") : "Professional Athlete"}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 py-20">
        <div className="max-w-2xl">
          {user ? (
            // Logged-in user content
            <>
              <div className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6",
                isAthlete ? "bg-talent/90 text-white" : "bg-restart/90 text-white"
              )}>
                {isAthlete ? <Award className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                {isAthlete ? 'Vaše kariérní cesta' : 'Talent Dashboard'}
              </div>

              <h1 className="text-display-sm md:text-display-lg font-black mb-6 animate-fade-up">
                {isAthlete ? (
                  <>
                    <span className="block">Vítejte zpět, {firstName}!</span>
                    <span className="block text-gradient-brand">Vaše příští výzva čeká</span>
                  </>
                ) : (
                  <>
                    <span className="block">Vítejte, {firstName}</span>
                    <span className="block text-gradient-brand">Objevte další talenty</span>
                  </>
                )}
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-up stagger-1 opacity-0">
                {isAthlete
                  ? 'Pokračujte ve své kariérní transformaci s podporou AI asistenta a personalizovaných doporučení.'
                  : 'Přístup k exkluzivní databázi talentovaných sportovců připravených na novou výzvu v byznysu.'}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-up stagger-2 opacity-0">
                <Button variant="hero-primary" size="xl" asChild>
                  <Link to="/dashboard">
                    {isAthlete ? 'Můj Profil & Příležitosti' : 'Prohlížet Kandidáty'}
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="hero-secondary" size="xl" asChild>
                  <Link to={isAthlete ? "/athletes" : "/blog"}>
                    {isAthlete ? 'Kariérní Tipy' : 'Příběhy Úspěchu'}
                  </Link>
                </Button>
              </div>

              {/* Quick Stats for logged-in users */}
              <div className="grid grid-cols-3 gap-4 mt-12 animate-fade-up stagger-3 opacity-0">
                {isAthlete ? (
                  <>
                    <div className="bg-background/60 backdrop-blur-sm rounded-2xl p-4 border border-border/50">
                      <div className="text-2xl font-black text-talent">85%</div>
                      <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Profil síla</div>
                    </div>
                    <div className="bg-background/60 backdrop-blur-sm rounded-2xl p-4 border border-border/50">
                      <div className="text-2xl font-black text-foreground">3</div>
                      <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Nové shody</div>
                    </div>
                    <div className="bg-background/60 backdrop-blur-sm rounded-2xl p-4 border border-border/50">
                      <div className="text-2xl font-black text-foreground">12</div>
                      <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Zobrazení</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-background/60 backdrop-blur-sm rounded-2xl p-4 border border-border/50">
                      <div className="text-2xl font-black text-restart">1,500+</div>
                      <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Talenti</div>
                    </div>
                    <div className="bg-background/60 backdrop-blur-sm rounded-2xl p-4 border border-border/50">
                      <div className="text-2xl font-black text-foreground">94%</div>
                      <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Úspěšnost</div>
                    </div>
                    <div className="bg-background/60 backdrop-blur-sm rounded-2xl p-4 border border-border/50">
                      <div className="text-2xl font-black text-foreground">+12</div>
                      <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Dnes</div>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            // Non-logged-in user content (original)
            <>
              <h1 className="text-display-sm md:text-display-lg font-black mb-6 animate-fade-up">
                <span className="block">{t('hero.headline')}</span>
                <span className="block text-gradient-brand">{t('hero.headline2')}</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-up stagger-1 opacity-0">
                {t('hero.subheadline')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-up stagger-2 opacity-0">
                <Button variant="hero-primary" size="xl" asChild>
                  <Link to="/signup?role=athlete">
                    {t('hero.cta.athlete')}
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="hero-secondary" size="xl" asChild>
                  <Link to="/signup?role=employer">
                    {t('hero.cta.employer')}
                  </Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

const StorySection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 md:py-32 bg-white dark:bg-background overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Single High-Impact Image */}
          <div className="relative order-2 lg:order-1 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[500px]">
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white dark:border-muted animate-fade-in aspect-[4/5]">
                <img
                  src={tomasEliska}
                  alt="Tomáš and Eliška"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>

              {/* Decorative brand accents */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-talent/10 rounded-full blur-3xl -z-10" />
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-restart/5 rounded-full blur-[80px] -z-10" />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-8">
            <h2 className="text-display-sm md:text-display-md font-black leading-[1.1] animate-fade-up">
              {t('story.title')}
            </h2>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p className="animate-fade-up stagger-1 opacity-0">
                {t('story.paragraph1')}
              </p>
              <p className="animate-fade-up stagger-2 opacity-0">
                {t('story.paragraph2')}
              </p>

              <div className="p-8 rounded-3xl bg-muted/40 border-l-[6px] border-talent animate-fade-up stagger-3 opacity-0 shadow-sm">
                <p className="text-foreground text-xl font-bold mb-4">
                  {t('story.paragraph3')}
                </p>
                <p className="text-foreground font-medium opacity-90">
                  {t('story.paragraph4')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturesSection: React.FC = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const role = user?.user_metadata?.role || user?.user_metadata?.user_role || user?.user_metadata?.account_type;

  const features = [
    {
      id: 'athlete',
      icon: Users,
      title: language === 'cs' ? 'Pro sportovce' : language === 'de' ? 'Für Sportler' : 'For Athletes',
      description: language === 'cs'
        ? 'Vytvořte si profil zdarma a propojte se s zaměstnavateli, kteří oceňují sportovní zkušenosti.'
        : language === 'de'
          ? 'Erstellen Sie ein kostenloses Profil und verbinden Sie sich mit Arbeitgebern, die sportliche Erfahrung schätzen.'
          : 'Create a free profile and connect with employers who value athletic experience.',
      cta: t('hero.cta.athlete'),
      href: '/athletes',
      variant: 'talent' as const,
    },
    {
      id: 'employer',
      icon: Briefcase,
      title: language === 'cs' ? 'Pro zaměstnavatele' : language === 'de' ? 'Für Arbeitgeber' : 'For Employers',
      description: language === 'cs'
        ? 'Najděte disciplinované, vytrvalé kandidáty s prokázanými schopnostmi pracovat pod tlakem.'
        : language === 'de'
          ? 'Finden Sie disziplinierte, ausdauernde Kandidaten mit nachgewiesener Belastbarkeit.'
          : 'Find disciplined, resilient candidates with proven ability to perform under pressure.',
      cta: t('hero.cta.employer'),
      href: '/employers',
      variant: 'restart' as const,
    },
    {
      id: 'ai',
      icon: Sparkles,
      title: language === 'cs' ? 'AI Asistence' : 'AI Assistance',
      description: language === 'cs'
        ? 'Naše AI vám pomůže přeložit sportovní úspěchy do profesního jazyka a vylepšit váš životopis.'
        : language === 'de'
          ? 'Unsere KI hilft Ihnen, sportliche Erfolge in berufliche Sprache zu übersetzen.'
          : 'Our AI helps translate athletic achievements into professional language and improve your CV.',
      cta: language === 'cs' ? 'Zjistit více' : language === 'de' ? 'Mehr erfahren' : 'Learn more',
      href: '/athletes',
      variant: 'default' as const,
    },
  ];

  // Filter features based on role
  const filteredFeatures = features.filter(f => {
    if (!user) return true;
    if (role === 'athlete') return f.id !== 'employer';
    if (role === 'employer') return f.id !== 'athlete';
    return true;
  });

  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-display-sm md:text-display-md font-black mb-4">
            {language === 'cs' ? 'Jak to funguje' : language === 'de' ? 'So funktioniert es' : 'How it works'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === 'cs'
              ? 'Jednoduchý proces pro sportovce i zaměstnavatele'
              : language === 'de'
                ? 'Ein einfacher Prozess für Sportler und Arbeitgeber'
                : 'A simple process for both athletes and employers'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {filteredFeatures.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-card border border-border rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 ${feature.variant === 'talent'
                ? 'bg-talent-light text-talent'
                : feature.variant === 'restart'
                  ? 'bg-restart-light text-restart'
                  : 'bg-accent text-accent-foreground'
                }`}>
                <feature.icon className="h-7 w-7" />
              </div>

              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground mb-6">{feature.description}</p>

              <Button variant={feature.variant} size="sm" asChild>
                <Link to={feature.href}>
                  {feature.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BlogPreviewSection: React.FC = () => {
  const { language } = useLanguage();
  const { user } = useAuth();

  if (!user) return null;

  const previews = [
    {
      id: 'maraton-v-byznysu',
      title: language === 'cs' ? 'Z maratonu do byznysu' : 'From Marathon to Business',
      image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 'kapitanka-na-lodi',
      title: language === 'cs' ? 'Kapitánka v kanceláři' : 'Captain in the Office',
      image: 'https://images.unsplash.com/photo-1594470117722-14589d60bd33?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 'hokejova-houzevnatost',
      title: language === 'cs' ? 'Hokejová houževnatost' : 'Hockey Resilience',
      image: 'https://images.unsplash.com/photo-1515703407324-5f753eed2349?auto=format&fit=crop&q=80&w=400',
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              {language === 'cs' ? 'Příběhy úspěšných' : 'Success Stories'}
            </h2>
            <p className="text-muted-foreground font-medium max-w-lg">
              {language === 'cs'
                ? 'Inspirujte se sportovci, kteří už svůj restart úspěšně zvládli.'
                : 'Be inspired by athletes who have already successfully managed their restart.'}
            </p>
          </div>
          <Button variant="outline" className="rounded-xl border-2 font-bold" asChild>
            <Link to="/blog">{language === 'cs' ? 'Všechny příběhy' : 'All stories'}</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {previews.map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`} className="group block space-y-4">
              <div className="aspect-[4/3] rounded-[2rem] overflow-hidden border border-border">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <h3 className="text-xl font-black group-hover:text-talent transition-colors flex items-center justify-between">
                {post.title}
                <ChevronRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-talent" />
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection: React.FC = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-talent/10 via-background to-restart/10">
      <div className="container text-center">
        <h2 className="text-display-sm md:text-display-md font-black mb-6">
          {language === 'cs'
            ? 'Připraveni na nový začátek?'
            : language === 'de'
              ? 'Bereit für einen Neuanfang?'
              : 'Ready for a new start?'}
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
          {language === 'cs'
            ? 'Připojte se k tisícům sportovců, kteří našli novou kariéru díky Talent Restart.'
            : language === 'de'
              ? 'Schließen Sie sich Tausenden von Sportlern an, die dank Talent Restart eine neue Karriere gefunden haben.'
              : 'Join thousands of athletes who found new careers through Talent Restart.'}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {user ? (
            <Button variant="hero-primary" size="xl" asChild>
              <Link to="/dashboard">
                Moje nástěnka
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          ) : (
            <>
              <Button variant="hero-primary" size="xl" asChild>
                <Link to="/signup">
                  {t('nav.signup')}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="hero-secondary" size="xl" asChild>
                <Link to="/contact">
                  {t('nav.contact')}
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

const Index: React.FC = () => {
  return (
    <div className="bg-background">
      <HeroSection />
      <StorySection />
      <FeaturesSection />
      <BlogPreviewSection />
      <CTASection />
    </div>
  );
};

export default Index;
