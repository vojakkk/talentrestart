import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Globe, ChevronDown, LogOut, User, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const languageLabels: Record<Language, string> = {
  cs: 'Čeština',
  en: 'English',
  de: 'Deutsch',
};

const languageFlags: Record<Language, string> = {
  cs: '🇨🇿',
  en: '🇬🇧',
  de: '🇩🇪',
};

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const location = useLocation();

  const role = user?.user_metadata?.role || user?.user_metadata?.user_role || user?.user_metadata?.account_type;

  const navLinks = [
    // Home link changes based on login status
    {
      href: '/',
      label: user ? (role === 'athlete' ? t('header.myCareer') : t('header.overview')) : t('nav.home')
    },
    // Only show Athletes link if not logged in OR logged in as athlete
    ...(!user || role === 'athlete' ? [{
      href: '/athletes',
      label: user ? t('header.careerTips') : t('nav.athletes')
    }] : []),
    // Only show Employers and Pricing links if not logged in OR logged in as employer
    ...(!user || role === 'employer' ? [
      { href: '/employers', label: t('nav.employers') },
      { href: '/pricing', label: t('nav.pricing') }
    ] : []),
    ...(user ? [{ href: '/blog', label: t('nav.blog') }] : []),
    { href: '/contact', label: t('nav.contact') },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border transition-all duration-300">
      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group transition-transform active:scale-95">
          <span className="text-2xl md:text-3xl font-black tracking-tighter">
            <span className="text-talent">Talent</span>
            <span className="text-restart group-hover:text-talent transition-colors">Restart</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-muted/30 p-1 rounded-2xl border border-border/50">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200",
                isActive(link.href)
                  ? "bg-background text-talent shadow-sm scale-105"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/50"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-10 w-10 md:w-auto md:px-3 rounded-xl gap-2 hover:bg-muted/50">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className="hidden md:inline font-bold">{languageFlags[language]}</span>
                <ChevronDown className="hidden md:inline h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-2xl border-2 p-2 min-w-[150px]">
              {(Object.keys(languageLabels) as Language[]).map((lang) => (
                <DropdownMenuItem
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={cn(
                    "gap-3 rounded-xl p-3 font-medium transition-colors cursor-pointer",
                    language === lang ? "bg-talent/10 text-talent" : "hover:bg-muted"
                  )}
                >
                  <span className="text-lg">{languageFlags[lang]}</span>
                  <span>{languageLabels[lang]}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-xl hover:bg-muted/50"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? t('theme.dark') : t('theme.light')}
          >
            {theme === 'light' ? (
              <Moon className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Sun className="h-4 w-4 text-yellow-500" />
            )}
          </Button>

          {/* Auth Display */}
          <div className="flex items-center gap-3 border-l border-border pl-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="talent" size="icon" className="h-10 w-10 rounded-xl shadow-lg shadow-talent/20">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-2xl border-2 p-2 min-w-[200px]">
                  <DropdownMenuLabel className="p-3">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold">{t('header.loggedInAs')}</p>
                    <p className="font-bold truncate">{user.email}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="p-3 rounded-xl gap-3 font-medium cursor-pointer">
                    <Link to="/dashboard" className="flex items-center gap-3 w-full">
                      <LayoutDashboard className="h-4 w-4" />
                      {t('header.myProfile')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => signOut()}
                    className="p-3 rounded-xl gap-3 font-medium cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
                  >
                    <LogOut className="h-4 w-4" />
                    {t('header.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="hidden md:flex rounded-xl font-bold" asChild>
                  <Link to="/login">{t('nav.login')}</Link>
                </Button>
                <Button variant="talent" size="sm" className="rounded-xl font-bold shadow-md shadow-talent/20" asChild>
                  <Link to="/signup">{t('nav.signup')}</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden rounded-xl h-10 w-10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-background/95 backdrop-blur-xl z-50 animate-fade-in overflow-y-auto">
          <nav className="container py-8 flex flex-col gap-4">
            {navLinks.map((link, idx) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "p-5 rounded-2xl text-lg font-bold transition-all flex items-center justify-between border border-transparent animate-fade-up",
                  isActive(link.href)
                    ? "bg-talent/10 text-talent border-talent/20"
                    : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
                )}
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                {link.label}
                <ChevronDown className="-rotate-90 h-4 w-4 opacity-30" />
              </Link>
            ))}

            <div className="flex flex-col gap-3 pt-6 border-t border-border mt-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              {!user ? (
                <>
                  <Button variant="outline" className="h-14 rounded-2xl font-bold text-lg" asChild>
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      {t('nav.login')}
                    </Link>
                  </Button>
                  <Button variant="talent" className="h-14 rounded-2xl font-bold text-lg shadow-lg" asChild>
                    <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                      {t('nav.signup')}
                    </Link>
                  </Button>
                </>
              ) : (
                <Button
                  variant="destructive"
                  className="h-14 rounded-2xl font-bold text-lg"
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  {t('header.logout')}
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
