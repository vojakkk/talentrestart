import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { KeyRound, Loader2, ShieldCheck, CheckCircle2 } from 'lucide-react';

const ResetPassword: React.FC = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        // Supabase sets the session automatically if the user clicks the recovery link
        const handleAuthStateChange = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                toast({
                    title: 'Neplatný odkaz',
                    description: 'Odkaz pro obnovení hesla je neplatný nebo vypršel.',
                    variant: 'destructive',
                });
                navigate('/login');
            }
        };
        handleAuthStateChange();
    }, [navigate, toast]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirmPassword') as string;

        if (password !== confirmPassword) {
            toast({
                title: 'Chyba',
                description: 'Hesla se neshodují.',
                variant: 'destructive',
            });
            setIsLoading(false);
            return;
        }

        try {
            const { error } = await supabase.auth.updateUser({
                password: password,
            });

            if (error) throw error;

            setIsSuccess(true);
            toast({
                title: 'Heslo obnoveno',
                description: 'Vaše heslo bylo úspěšně změněno.',
            });

            // Redirect to login after a short delay
            setTimeout(() => navigate('/login'), 3000);
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

    if (isSuccess) {
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
                    <h1 className="text-4xl font-black mb-4">Hotovo!</h1>
                    <p className="text-muted-foreground text-xl mb-10 font-medium">
                        Vaše heslo bylo úspěšně změněno. Budete přesměrováni na přihlášení.
                    </p>
                    <Button variant="talent" size="xl" className="h-16 px-12 rounded-2xl text-lg font-black shadow-xl" asChild>
                        <Link to="/login">Přejít na přihlášení</Link>
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
                {/* Reset Password Card */}
                <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-[2.5rem] p-10 shadow-2xl shadow-talent/5 animate-fade-up">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-talent to-restart rounded-3xl mb-6 shadow-xl rotate-3">
                            <KeyRound className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-3xl font-black mb-3">Nové heslo</h1>
                        <p className="text-muted-foreground font-medium">
                            Zadejte prosím své nové heslo níže.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="password" title="Nové heslo" className="text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground ml-1">
                                    Nové heslo
                                </Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="rounded-2xl border-border/50 bg-muted/30 focus:bg-background focus:border-talent px-5 h-14 transition-all text-base"
                                    placeholder="••••••••"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" title="Potvrdit heslo" className="text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground ml-1">
                                    Potvrdit heslo
                                </Label>
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    className="rounded-2xl border-border/50 bg-muted/30 focus:bg-background focus:border-talent px-5 h-14 transition-all text-base"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <Button type="submit" variant="talent" size="xl" className="w-full h-16 rounded-2xl text-lg font-black shadow-xl shadow-talent/20 animate-fade-up stagger-1" disabled={isLoading}>
                            {isLoading ? <Loader2 className="animate-spin" /> : (
                                <span className="flex items-center gap-2">
                                    Uložit heslo
                                    <KeyRound className="w-5 h-5 ml-1" />
                                </span>
                            )}
                        </Button>
                    </form>
                </div>

                {/* Security Badge */}
                <div className="mt-8 flex justify-center items-center gap-2 text-muted-foreground/40 font-bold uppercase tracking-widest text-[10px]">
                    <ShieldCheck className="w-4 h-4" />
                    Zabezpečené šifrování dat
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
