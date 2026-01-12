import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Mail, Loader2, ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';

const ForgotPassword: React.FC = () => {
    const { t } = useLanguage();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
            });

            if (error) throw error;

            setIsSubmitted(true);
            toast({
                title: 'Email odeslán',
                description: 'Zkontrolujte svou schránku pro odkaz na obnovení hesla.',
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
            <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background py-12 px-4">
                <div className="absolute top-0 left-0 w-full h-full -z-10">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-talent/5 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-restart/5 rounded-full blur-[120px]" />
                </div>

                <div className="w-full max-w-md text-center animate-fade-in">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-talent/10 rounded-full mb-8 shadow-glow-talent rotate-6">
                        <CheckCircle2 className="w-12 h-12 text-talent" />
                    </div>
                    <h1 className="text-4xl font-black mb-4">Email odeslán!</h1>
                    <p className="text-muted-foreground text-xl mb-10 font-medium">
                        Pokud účet s tímto emailem existuje, odeslali jsme vám instrukce k obnovení hesla.
                    </p>
                    <Button variant="talent" size="xl" className="h-16 px-12 rounded-2xl text-lg font-black shadow-xl" asChild>
                        <Link to="/login">Zpět na přihlášení</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background py-12 px-4">
            {/* Dynamic Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-talent/5 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-restart/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Back to Login Link */}
                <Link to="/login" className="inline-flex items-center gap-2 text-muted-foreground hover:text-talent transition-colors mb-8 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-bold uppercase tracking-widest text-xs">Zpět na login</span>
                </Link>

                {/* Forgot Password Card */}
                <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-[2.5rem] p-10 shadow-2xl shadow-talent/5 animate-fade-up">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-talent to-restart rounded-3xl mb-6 shadow-xl rotate-3">
                            <Mail className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-3xl font-black mb-3">Zapomenuté heslo</h1>
                        <p className="text-muted-foreground font-medium">
                            Zadejte svůj email a my vám pošleme odkaz pro nastavení nového hesla.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground ml-1">
                                Váš Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="rounded-2xl border-border/50 bg-muted/30 focus:bg-background focus:border-talent px-5 h-14 transition-all text-base"
                                placeholder="name@example.com"
                            />
                        </div>

                        <Button type="submit" variant="talent" size="xl" className="w-full h-16 rounded-2xl text-lg font-black shadow-xl shadow-talent/20 animate-fade-up stagger-1" disabled={isLoading}>
                            {isLoading ? <Loader2 className="animate-spin" /> : (
                                <span className="flex items-center gap-2">
                                    Odeslat instrukce
                                    <SendIcon className="w-5 h-5 ml-1" />
                                </span>
                            )}
                        </Button>
                    </form>
                </div>

                {/* Security Badge */}
                <div className="mt-8 flex justify-center items-center gap-2 text-muted-foreground/40 font-bold uppercase tracking-widest text-[10px]">
                    <ShieldCheck className="w-4 h-4" />
                    Zabezpečený systém obnovy
                </div>
            </div>
        </div>
    );
};

const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="m22 2-7 20-4-9-9-4Z"></path>
        <path d="M22 2 11 13"></path>
    </svg>
);

export default ForgotPassword;
