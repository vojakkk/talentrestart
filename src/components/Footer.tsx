import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const currentYear = new Date().getFullYear();

  const role = user?.user_metadata?.role || user?.user_metadata?.user_role || user?.user_metadata?.account_type;

  return (
    <footer className="bg-muted/30 border-t border-border mt-20">
      {/* Upper Footer - Links & Brand */}
      <div className="container pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="text-3xl font-black tracking-tighter">
                <span className="text-talent">Talent</span>
                <span className="text-restart group-hover:text-talent transition-colors">Restart</span>
              </span>
            </Link>
            <p className="text-muted-foreground font-medium leading-relaxed max-w-xs">
              {language === 'cs'
                ? 'První platforma v ČR propojující disciplínu sportovců s příležitostmi ve světě byznysu.'
                : 'The first platform in CZ connecting athlete discipline with business world opportunities.'}
            </p>
            <div className="flex items-center gap-4 pt-2">
              {[Linkedin, Instagram, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-talent hover:border-talent transition-all shadow-sm">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Athletes Links */}
          {(!user || role === 'athlete') && (
            <div className="space-y-6">
              <h4 className="text-sm font-black uppercase tracking-[0.2em] text-foreground">Pro Sportovce</h4>
              <ul className="space-y-4">
                <li>
                  <Link to="/athletes" className="text-muted-foreground hover:text-talent font-medium transition-colors flex items-center gap-2 group">
                    {t('hero.cta.athlete')}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-all" />
                  </Link>
                </li>
                <li>
                  <Link to="/signup?role=athlete" className="text-muted-foreground hover:text-talent font-medium transition-colors">Vytvořit profil</Link>
                </li>
                <li>
                  <Link to="/contact" className="text-muted-foreground hover:text-talent font-medium transition-colors">Kariérní poradenství</Link>
                </li>
                <li>
                  <Link to="/blog" className="text-muted-foreground hover:text-talent font-medium transition-colors">Příběhy sportovců</Link>
                </li>
              </ul>
            </div>
          )}

          {/* Employers Links */}
          {(!user || role === 'employer') && (
            <div className="space-y-6">
              <h4 className="text-sm font-black uppercase tracking-[0.2em] text-foreground">Pro Firmy</h4>
              <ul className="space-y-4">
                <li>
                  <Link to="/employers" className="text-muted-foreground hover:text-restart font-medium transition-colors flex items-center gap-2 group">
                    {t('hero.cta.employer')}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-all" />
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-muted-foreground hover:text-restart font-medium transition-colors">{t('nav.pricing')}</Link>
                </li>
                <li>
                  <Link to="/contact" className="text-muted-foreground hover:text-restart font-medium transition-colors">Firemní řešení</Link>
                </li>
              </ul>
            </div>
          )}

          {/* Contact Column */}
          <div className="space-y-6">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-foreground">Kontakt</h4>
            <ul className="space-y-4 text-muted-foreground font-medium">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-talent" />
                <a href="mailto:talentrestart@gmail.com" className="hover:text-foreground transition-colors">talentrestart@gmail.com</a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-restart" />
                <span>Praha, Česká republika</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer - Copyright & Legal */}
      <div className="border-t border-border py-8 bg-background/50">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground/60 uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" />
            © {currentYear} Talent Restart. Všechna práva vyhrazena.
          </div>

          <div className="flex gap-8 text-xs font-black uppercase tracking-widest text-muted-foreground/60">
            <Link to="#" className="hover:text-talent transition-colors">Ochrana soukromí</Link>
            <Link to="#" className="hover:text-talent transition-colors">Obchodní podmínky</Link>
            <Link to="#" className="hover:text-talent transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
