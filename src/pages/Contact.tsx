import React, { useState } from 'react';
import { Send, CheckCircle, Mail, MapPin, Phone, Globe, MessageSquare, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';

const Contact: React.FC = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [gdprConsent, setGdprConsent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!gdprConsent) {
      toast({
        title: 'Chyba',
        description: 'Prosím odsouhlaste zpracování osobních údajů.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      role: formData.get('role'),
      organization: formData.get('organization'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([data]);

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: 'Zpráva odeslána',
        description: t('contact.success'),
      });
    } catch (error: any) {
      toast({
        title: 'Chyba',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-20 animate-fade-in bg-background">
        <div className="w-24 h-24 bg-talent/10 rounded-full flex items-center justify-center mb-8 shadow-glow rotate-6">
          <CheckCircle className="h-12 w-12 text-talent" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-6">{t('contact.success')}</h1>
        <p className="text-xl text-muted-foreground font-medium mb-10">Brzy se vám ozveme zpět.</p>
        <Button variant="outline" size="xl" className="rounded-2xl border-2" asChild>
          <a href="/">Zpět na hlavní stránku</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen relative overflow-hidden flex flex-col pt-12 md:pt-24 pb-32">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-talent/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-restart/5 rounded-full blur-[100px] -z-10" />

      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left Column: Info */}
          <div className="space-y-12 animate-fade-in">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-talent/10 text-talent text-sm font-bold uppercase tracking-widest mb-2">
                <MessageSquare className="w-4 h-4" />
                Spojte se s námi
              </div>
              <h1 className="text-display-md md:text-display-lg font-black leading-tight">
                Pojďme společně <br />
                <span className="text-gradient-brand">změnit pravidla hry</span>
              </h1>
              <p className="text-xl text-muted-foreground font-medium leading-relaxed max-w-lg">
                Máte dotaz k platformě, partnerství nebo kariérnímu přechodu? Jsme tu pro vás.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-card border border-border rounded-2xl flex items-center justify-center text-talent group-hover:rotate-6 transition-all duration-300 shadow-sm">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">Emailová adresa</h4>
                  <p className="text-lg font-bold">talentrestart@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-card border border-border rounded-2xl flex items-center justify-center text-restart group-hover:-rotate-6 transition-all duration-300 shadow-sm">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">Kde nás najdete</h4>
                  <p className="text-lg font-bold">Praha, Česká republika</p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-muted rounded-[2.5rem] border border-border/50 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 text-talent/20 group-hover:text-talent/40 transition-colors">
                <Sparkles className="w-12 h-12" />
              </div>
              <h4 className="text-xl font-bold mb-3">Máte sportovní klub?</h4>
              <p className="text-muted-foreground font-medium mb-6">Pojďme připravit vaše sportovce na život po kariéře společně. Nabízíme partneská řešení na míru.</p>
              <Button variant="link" className="p-0 h-auto text-talent font-black uppercase tracking-tighter text-sm">Zjistit více o partnerství &rarr;</Button>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="animate-fade-up">
            <form onSubmit={handleSubmit} className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-[3rem] p-8 md:p-12 shadow-2xl space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground ml-1">{t('contact.name')} *</Label>
                  <Input name="name" required className="rounded-2xl h-14 bg-muted/30 border-border/50 focus:border-talent" placeholder="Jan Novák" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground ml-1">{t('contact.email')} *</Label>
                  <Input name="email" type="email" required className="rounded-2xl h-14 bg-muted/30 border-border/50 focus:border-talent" placeholder="jan@email.cz" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground ml-1">{t('contact.phone')}</Label>
                  <Input name="phone" type="tel" className="rounded-2xl h-14 bg-muted/30 border-border/50 focus:border-talent" placeholder="+420 123 456 789" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground ml-1">{t('contact.role')} *</Label>
                  <Select required name="role">
                    <SelectTrigger className="rounded-2xl h-14 bg-muted/30 border-border/50 focus:ring-talent">
                      <SelectValue placeholder="Vyberte roli" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-2">
                      <SelectItem value="employer">Zaměstnavatel</SelectItem>
                      <SelectItem value="athlete">Sportovec</SelectItem>
                      <SelectItem value="club">Sportovní klub / Agentura</SelectItem>
                      <SelectItem value="other">Jiný</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground ml-1">{t('contact.message')} *</Label>
                <Textarea name="message" required className="rounded-2xl bg-muted/30 border-border/50 focus:border-talent min-h-[150px] p-5" placeholder="Jak vám můžeme pomoci?" />
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="gdpr"
                    checked={gdprConsent}
                    onCheckedChange={(checked) => setGdprConsent(checked === true)}
                    className="rounded-md border-2 border-muted-foreground/30 data-[state=checked]:bg-talent data-[state=checked]:border-talent"
                  />
                  <label htmlFor="gdpr" className="text-xs font-bold text-muted-foreground cursor-pointer uppercase tracking-tight">
                    Souhlasím se zpracováním osobních údajů *
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                variant="talent"
                size="xl"
                className="w-full h-16 rounded-2xl text-lg font-black shadow-xl shadow-talent/20 animate-fade-up active:scale-95 transition-all"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Odesílám...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Odeslat zprávu
                    <Send className="h-5 w-5" />
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
