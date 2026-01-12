import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        <h1 className="text-9xl font-black text-talent mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-4">
          {language === 'cs' 
            ? 'Stránka nenalezena'
            : language === 'de'
            ? 'Seite nicht gefunden'
            : 'Page not found'}
        </h2>
        <p className="text-muted-foreground mb-8">
          {language === 'cs'
            ? 'Omlouváme se, ale stránka, kterou hledáte, neexistuje.'
            : language === 'de'
            ? 'Entschuldigung, aber die Seite, die Sie suchen, existiert nicht.'
            : 'Sorry, but the page you are looking for does not exist.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="talent" asChild>
            <Link to="/">
              <Home className="h-4 w-4" />
              {language === 'cs' ? 'Domů' : language === 'de' ? 'Startseite' : 'Home'}
            </Link>
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4" />
            {language === 'cs' ? 'Zpět' : language === 'de' ? 'Zurück' : 'Go back'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
