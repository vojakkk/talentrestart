import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'cs' | 'en' | 'de';
export type Currency = 'CZK' | 'EUR';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  cs: {
    // Navigation
    'nav.home': 'Domů',
    'nav.athletes': 'Pro sportovce',
    'nav.employers': 'Pro zaměstnavatele',
    'nav.pricing': 'Ceník',
    'nav.contact': 'Kontakt',
    'nav.blog': 'Příběhy',
    'nav.login': 'Přihlásit se',
    'nav.signup': 'Registrace',

    // Hero
    'hero.headline': '98 % českých sportovců nikdy nepůjde do profi.',
    'hero.headline2': 'My jim dáváme kariérní restart.',
    'hero.subheadline': 'První pracovní portál v České republice, který propojuje sportovní talent s reálnými pracovními příležitostmi.',
    'hero.cta.athlete': 'Vytvořit profil zdarma',
    'hero.cta.employer': 'Najít sportovní talenty',

    // Story section
    'story.title': 'Když skončí sport, život nekončí.',
    'story.paragraph1': 'Tomáš trénoval šest dní v týdnu. Zranění rozhodlo za něj.',
    'story.paragraph2': 'Eliška vedla tým jako kapitánka. Po kariéře slyšela, že „nemá praxi".',
    'story.paragraph3': 'Talent Restart vznikl proto, aby sportovci nemuseli začínat od nuly.',
    'story.paragraph4': 'Disciplína, vytrvalost a odpovědnost mají hodnotu i mimo stadion.',

    // Pricing
    'pricing.title': 'Ceník pro zaměstnavatele',
    'pricing.subtitle': 'Vyberte si plán, který vám vyhovuje',
    'pricing.standard': 'Standard Pack',
    'pricing.pro': 'Pro Pack',
    'pricing.monthly': 'měsíčně',
    'pricing.yearly': 'ročně',
    'pricing.perMonth': 'měsíc',
    'pricing.perYear': 'rok',
    'pricing.cta': 'Začít nyní',
    'pricing.features.jobs': 'Neomezené nabídky práce',
    'pricing.features.applicants': 'Přístup k profilům sportovců',
    'pricing.features.ai': 'AI asistent pro popisy práce',
    'pricing.features.support': 'Prioritní podpora',
    'pricing.features.analytics': 'Pokročilá analytika',
    'pricing.features.branding': 'Firemní branding',

    // Contact
    'contact.title': 'Kontaktujte nás',
    'contact.subtitle': 'Máte dotaz? Rádi vám pomůžeme.',
    'contact.name': 'Jméno a příjmení',
    'contact.email': 'E-mail',
    'contact.phone': 'Telefon',
    'contact.role': 'Jsem',
    'contact.role.employer': 'Zaměstnavatel',
    'contact.role.athlete': 'Sportovec',
    'contact.role.club': 'Klub',
    'contact.role.university': 'Univerzita',
    'contact.role.other': 'Jiné',
    'contact.organization': 'Název organizace',
    'contact.subject': 'Předmět',
    'contact.subject.hiring': 'Nábor',
    'contact.subject.partnership': 'Partnerství',
    'contact.subject.support': 'Podpora',
    'contact.subject.general': 'Obecný dotaz',
    'contact.message': 'Zpráva',
    'contact.gdpr': 'Souhlasím se zpracováním osobních údajů',
    'contact.submit': 'Odeslat zprávu',
    'contact.success': 'Děkujeme za zprávu. Ozveme se vám co nejdříve.',

    // Login
    'login.subtitle': 'Přihlaste se ke svému účtu',
    'login.email': 'E-mail',
    'login.password': 'Heslo',
    'login.submit': 'Přihlásit se',
    'login.noAccount': 'Nemáte účet?',
    'login.signupLink': 'Zaregistrujte se',

    // Signup
    'signup.subtitle': 'Vytvořte si nový účet',
    'signup.athlete': 'Sportovec',
    'signup.employer': 'Zaměstnavatel',
    'signup.firstName': 'Jméno',
    'signup.lastName': 'Příjmení',
    'signup.email': 'E-mail',
    'signup.password': 'Heslo',
    'signup.confirmPassword': 'Potvrdit heslo',
    'signup.submitAthlete': 'Vytvořit profil sportovce',
    'signup.submitEmployer': 'Vytvořit účet zaměstnavatele',
    'signup.hasAccount': 'Již máte účet?',
    'signup.loginLink': 'Přihlaste se',

    // Footer
    'footer.rights': 'Všechna práva vyhrazena.',


    // Theme
    'theme.light': 'Denní režim',
    'theme.dark': 'Noční režim',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.athletes': 'For Athletes',
    'nav.employers': 'For Employers',
    'nav.pricing': 'Pricing',
    'nav.contact': 'Contact',
    'nav.blog': 'Stories',
    'nav.login': 'Log in',
    'nav.signup': 'Sign up',

    // Hero
    'hero.headline': '98% of Czech athletes will never go pro.',
    'hero.headline2': 'We give them a career restart.',
    'hero.subheadline': 'The first job portal in the Czech Republic connecting athletic talent with real career opportunities.',
    'hero.cta.athlete': 'Create profile for free',
    'hero.cta.employer': 'Find athletic talents',

    // Story section
    'story.title': 'When sport ends, life doesn\'t.',
    'story.paragraph1': 'Tomáš trained six days a week. An injury decided for him.',
    'story.paragraph2': 'Eliška led her team as captain. After her career, she heard she "lacks experience".',
    'story.paragraph3': 'Talent Restart was created so athletes don\'t have to start from zero.',
    'story.paragraph4': 'Discipline, perseverance, and responsibility have value beyond the stadium.',

    // Pricing
    'pricing.title': 'Pricing for Employers',
    'pricing.subtitle': 'Choose the plan that suits you',
    'pricing.standard': 'Standard Pack',
    'pricing.pro': 'Pro Pack',
    'pricing.monthly': 'monthly',
    'pricing.yearly': 'yearly',
    'pricing.perMonth': 'month',
    'pricing.perYear': 'year',
    'pricing.cta': 'Get started',
    'pricing.features.jobs': 'Unlimited job postings',
    'pricing.features.applicants': 'Access to athlete profiles',
    'pricing.features.ai': 'AI assistant for job descriptions',
    'pricing.features.support': 'Priority support',
    'pricing.features.analytics': 'Advanced analytics',
    'pricing.features.branding': 'Company branding',

    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Have a question? We\'re happy to help.',
    'contact.name': 'Full name',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.role': 'I am a',
    'contact.role.employer': 'Employer',
    'contact.role.athlete': 'Athlete',
    'contact.role.club': 'Club',
    'contact.role.university': 'University',
    'contact.role.other': 'Other',
    'contact.organization': 'Organization name',
    'contact.subject': 'Subject',
    'contact.subject.hiring': 'Hiring',
    'contact.subject.partnership': 'Partnership',
    'contact.subject.support': 'Support',
    'contact.subject.general': 'General inquiry',
    'contact.message': 'Message',
    'contact.gdpr': 'I agree to the processing of personal data',
    'contact.submit': 'Send message',
    'contact.success': 'Thank you for your message. We will get back to you soon.',

    // Login
    'login.subtitle': 'Sign in to your account',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.submit': 'Log in',
    'login.noAccount': 'Don\'t have an account?',
    'login.signupLink': 'Sign up',

    // Signup
    'signup.subtitle': 'Create a new account',
    'signup.athlete': 'Athlete',
    'signup.employer': 'Employer',
    'signup.firstName': 'First name',
    'signup.lastName': 'Last name',
    'signup.email': 'Email',
    'signup.password': 'Password',
    'signup.confirmPassword': 'Confirm password',
    'signup.submitAthlete': 'Create athlete profile',
    'signup.submitEmployer': 'Create employer account',
    'signup.hasAccount': 'Already have an account?',
    'signup.loginLink': 'Log in',

    // Footer
    'footer.rights': 'All rights reserved.',


    // Theme
    'theme.light': 'Day mode',
    'theme.dark': 'Night mode',
  },
  de: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.athletes': 'Für Sportler',
    'nav.employers': 'Für Arbeitgeber',
    'nav.pricing': 'Preise',
    'nav.contact': 'Kontakt',
    'nav.blog': 'Geschichten',
    'nav.login': 'Anmelden',
    'nav.signup': 'Registrieren',

    // Hero
    'hero.headline': '98% der tschechischen Sportler werden nie Profis.',
    'hero.headline2': 'Wir geben ihnen einen Karriere-Neustart.',
    'hero.subheadline': 'Das erste Jobportal in der Tschechischen Republik, das sportliche Talente mit echten Karrieremöglichkeiten verbindet.',
    'hero.cta.athlete': 'Profil kostenlos erstellen',
    'hero.cta.employer': 'Sportliche Talente finden',

    // Story section
    'story.title': 'Wenn der Sport endet, endet das Leben nicht.',
    'story.paragraph1': 'Tomáš trainierte sechs Tage die Woche. Eine Verletzung entschied für ihn.',
    'story.paragraph2': 'Eliška führte ihr Team als Kapitänin. Nach ihrer Karriere hörte sie, dass sie "keine Erfahrung" habe.',
    'story.paragraph3': 'Talent Restart wurde geschaffen, damit Sportler nicht bei null anfangen müssen.',
    'story.paragraph4': 'Disziplin, Ausdauer und Verantwortung haben auch jenseits des Stadions Wert.',

    // Pricing
    'pricing.title': 'Preise für Arbeitgeber',
    'pricing.subtitle': 'Wählen Sie den Plan, der zu Ihnen passt',
    'pricing.standard': 'Standard Paket',
    'pricing.pro': 'Pro Paket',
    'pricing.monthly': 'monatlich',
    'pricing.yearly': 'jährlich',
    'pricing.perMonth': 'Monat',
    'pricing.perYear': 'Jahr',
    'pricing.cta': 'Jetzt starten',
    'pricing.features.jobs': 'Unbegrenzte Stellenanzeigen',
    'pricing.features.applicants': 'Zugang zu Sportlerprofilen',
    'pricing.features.ai': 'KI-Assistent für Stellenbeschreibungen',
    'pricing.features.support': 'Prioritäts-Support',
    'pricing.features.analytics': 'Erweiterte Analytik',
    'pricing.features.branding': 'Firmen-Branding',

    // Contact
    'contact.title': 'Kontaktieren Sie uns',
    'contact.subtitle': 'Haben Sie eine Frage? Wir helfen Ihnen gerne.',
    'contact.name': 'Vollständiger Name',
    'contact.email': 'E-Mail',
    'contact.phone': 'Telefon',
    'contact.role': 'Ich bin',
    'contact.role.employer': 'Arbeitgeber',
    'contact.role.athlete': 'Sportler',
    'contact.role.club': 'Verein',
    'contact.role.university': 'Universität',
    'contact.role.other': 'Sonstiges',
    'contact.organization': 'Name der Organisation',
    'contact.subject': 'Betreff',
    'contact.subject.hiring': 'Einstellung',
    'contact.subject.partnership': 'Partnerschaft',
    'contact.subject.support': 'Support',
    'contact.subject.general': 'Allgemeine Anfrage',
    'contact.message': 'Nachricht',
    'contact.gdpr': 'Ich stimme der Verarbeitung personenbezogener Daten zu',
    'contact.submit': 'Nachricht senden',
    'contact.success': 'Vielen Dank für Ihre Nachricht. Wir werden uns bald bei Ihnen melden.',

    // Login
    'login.subtitle': 'Melden Sie sich bei Ihrem Konto an',
    'login.email': 'E-Mail',
    'login.password': 'Passwort',
    'login.submit': 'Anmelden',
    'login.noAccount': 'Noch kein Konto?',
    'login.signupLink': 'Registrieren',

    // Signup
    'signup.subtitle': 'Erstellen Sie ein neues Konto',
    'signup.athlete': 'Sportler',
    'signup.employer': 'Arbeitgeber',
    'signup.firstName': 'Vorname',
    'signup.lastName': 'Nachname',
    'signup.email': 'E-Mail',
    'signup.password': 'Passwort',
    'signup.confirmPassword': 'Passwort bestätigen',
    'signup.submitAthlete': 'Sportlerprofil erstellen',
    'signup.submitEmployer': 'Arbeitgeberkonto erstellen',
    'signup.hasAccount': 'Bereits ein Konto?',
    'signup.loginLink': 'Anmelden',

    // Footer
    'footer.rights': 'Alle Rechte vorbehalten.',


    // Theme
    'theme.light': 'Tagmodus',
    'theme.dark': 'Nachtmodus',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('cs');

  // Currency is strictly tied to language
  const currency: Currency = language === 'cs' ? 'CZK' : 'EUR';

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && ['cs', 'en', 'de'].includes(savedLang)) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, currency, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
