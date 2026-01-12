import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import {
    User,
    Camera,
    FileText,
    Award,
    Briefcase,
    Sparkles,
    Save,
    ArrowLeft,
    Loader2,
    Upload,
    CheckCircle2,
    Info
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const AthleteProfile: React.FC = () => {
    const { user } = useAuth();
    const { t } = useLanguage();
    const { toast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [aiAssisting, setAiAssisting] = useState(false);

    // Form State
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        summary: '',
        sportsCareer: '',
        achievements: '',
        skills: ''
    });
    const [cvFile, setCvFile] = useState<File | null>(null);
    const [uploadingCv, setUploadingCv] = useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) return;

            setIsLoading(true);
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (error && error.code !== 'PGRST116') throw error;

                if (data) {
                    setProfileData({
                        firstName: data.first_name || user.user_metadata?.first_name || '',
                        lastName: data.last_name || user.user_metadata?.last_name || '',
                        summary: data.summary || '',
                        sportsCareer: data.sports_career || '',
                        achievements: data.achievements || '',
                        skills: data.skills || ''
                    });
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [user]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            toast({
                title: 'Chyba',
                description: 'Nejste přihlášeni.',
                variant: 'destructive',
            });
            return;
        }
        setIsSaving(true);

        try {
            // Update Profiles Table
            const { error: profileError } = await supabase
                .from('profiles')
                .upsert({
                    id: user.id,
                    first_name: profileData.firstName,
                    last_name: profileData.lastName,
                    summary: profileData.summary,
                    sports_career: profileData.sportsCareer,
                    achievements: profileData.achievements,
                    skills: profileData.skills,
                    updated_at: new Date().toISOString(),
                });

            if (profileError) throw profileError;

            // Update Auth Metadata (Optional, try-catch to avoid blocking)
            try {
                await supabase.auth.updateUser({
                    data: {
                        first_name: profileData.firstName,
                        last_name: profileData.lastName,
                    }
                });
            } catch (e) {
                console.warn('Auth metadata update failed, but profile was saved:', e);
            }

            toast({
                title: 'Profil uložen',
                description: 'Vaše změny byly úspěšně uloženy.',
            });
        } catch (error: any) {
            toast({
                title: 'Chyba při ukládání',
                description: error.message,
                variant: 'destructive',
            });
        } finally {
            setIsSaving(false);
        }
    };

    const handleCvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !user) return;

        if (file.size > 5 * 1024 * 1024) {
            toast({
                title: 'Soubor je příliš velký',
                description: 'Maximální velikost je 5MB.',
                variant: 'destructive',
            });
            return;
        }

        setUploadingCv(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `cvs/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('cvs')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('cvs')
                .getPublicUrl(filePath);

            const { error: updateError } = await supabase
                .from('profiles')
                .update({ cv_url: publicUrl })
                .eq('id', user.id);

            if (updateError) throw updateError;

            toast({
                title: 'Životopis nahrán',
                description: 'Váš životopis byl úspěšně uložen.',
            });
            setCvFile(file);
        } catch (error: any) {
            toast({
                title: 'Chyba při nahrávání',
                description: error.message,
                variant: 'destructive',
            });
        } finally {
            setUploadingCv(false);
        }
    };

    const runAiAssistance = () => {
        setAiAssisting(true);
        // Simulate AI processing
        setTimeout(() => {
            const aiVersion = `Jsem disciplinovaný profesionál s 10letou kariérou ve vrcholovém sportu, kde jsem si vypěstoval extrémní odolnost vůči stresu, vytrvalost a schopnost pracovat v týmu na dosažení společného cíle. Tyto soft-skills nyní přenáším do světa byznysu...`;

            setProfileData(prev => ({ ...prev, summary: aiVersion }));
            setAiAssisting(false);
            toast({
                title: 'AI Úprava dokončena',
                description: 'Váš profesní souhrn byl vylepšen pro byznys prostředí.',
            });
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-muted/20 pb-20">
            {/* Header */}
            <div className="bg-background border-b border-border mb-8 sticky top-20 z-30">
                <div className="container py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <Link to="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-talent transition-colors font-bold group">
                                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                Zpět
                            </Link>
                            <div className="h-6 w-px bg-border hidden md:block" />
                            <Link to="/dashboard" className="hidden md:flex items-center gap-2 text-foreground hover:text-talent transition-colors font-black uppercase tracking-widest text-xs">
                                Moje Nástěnka
                            </Link>
                        </div>
                        <Button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="rounded-xl shadow-lg shadow-talent/20 px-8 h-12 font-bold"
                            variant="talent"
                        >
                            {isSaving ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2 w-5 h-5" />}
                            Uložit profil
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="grid lg:grid-cols-12 gap-8">

                    {/* Sidebar: Profile Photo & Progress */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* ... (previous profile photo card) ... */}
                        <div className="bg-card border border-border rounded-[2.5rem] p-10 text-center relative overflow-hidden group shadow-sm">
                            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-talent to-restart opacity-10 -z-10" />

                            <div className="relative inline-block mb-6">
                                <div className="w-32 h-32 rounded-[2.5rem] bg-muted border-4 border-background overflow-hidden mx-auto flex items-center justify-center shadow-xl">
                                    <User className="w-16 h-16 text-muted-foreground" />
                                </div>
                                <button className="absolute bottom-0 right-0 w-10 h-10 bg-talent text-white rounded-xl shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
                                    <Camera className="w-5 h-5" />
                                </button>
                            </div>

                            <h2 className="text-2xl font-black mb-1">{profileData.firstName} {profileData.lastName}</h2>
                            <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs mb-8">Profesionální Sportovec</p>

                            <div className="space-y-4 pt-6 border-t border-border">
                                <div className="text-left space-y-2">
                                    <div className="flex justify-between text-xs font-black uppercase tracking-widest text-muted-foreground">
                                        <span>Síla profilu</span>
                                        <span className="text-talent">70%</span>
                                    </div>
                                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                        <div className="h-full bg-talent rounded-full w-[70%]" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CV Upload Section */}
                        <div className="bg-card border border-border rounded-[2.5rem] p-8 shadow-sm">
                            <h3 className="text-lg font-black mb-6 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-restart" />
                                Životopis (CV)
                            </h3>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleCvUpload}
                                className="hidden"
                                accept=".pdf,.doc,.docx"
                            />
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className={cn(
                                    "border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-talent hover:bg-talent/5 transition-all cursor-pointer group relative overflow-hidden",
                                    uploadingCv && "opacity-50 pointer-events-none"
                                )}
                            >
                                {uploadingCv ? (
                                    <div className="space-y-4">
                                        <Loader2 className="w-10 h-10 text-talent mx-auto animate-spin" />
                                        <p className="text-sm font-bold text-talent">Nahrávám...</p>
                                    </div>
                                ) : cvFile ? (
                                    <div className="space-y-2">
                                        <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto" />
                                        <p className="text-sm font-bold text-foreground truncate px-4">{cvFile.name}</p>
                                        <p className="text-[10px] text-green-600 font-black uppercase">Změnit soubor</p>
                                    </div>
                                ) : (
                                    <>
                                        <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-4 group-hover:text-talent group-hover:-translate-y-1 transition-all" />
                                        <p className="text-sm font-bold text-muted-foreground group-hover:text-foreground">Klikněte nebo přetáhněte PDF</p>
                                        <p className="text-[10px] text-muted-foreground/60 uppercase mt-2 font-black">Max 5MB</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Main Form Area */}
                    <div className="lg:col-span-8 space-y-8">
                        <form className="space-y-8 pb-32">
                            {/* Section: Basic Info */}
                            <div className="bg-card border border-border rounded-[2.5rem] p-10 shadow-sm space-y-8">
                                <h3 className="text-2xl font-black flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-talent/10 text-talent flex items-center justify-center text-sm font-black">1</span>
                                    Základní informace
                                </h3>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Jméno</Label>
                                        <Input
                                            value={profileData.firstName}
                                            onChange={e => setProfileData({ ...profileData, firstName: e.target.value })}
                                            className="rounded-2xl h-14 bg-muted/30 border-border/50 focus:border-talent"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Příjmení</Label>
                                        <Input
                                            value={profileData.lastName}
                                            onChange={e => setProfileData({ ...profileData, lastName: e.target.value })}
                                            className="rounded-2xl h-14 bg-muted/30 border-border/50 focus:border-talent"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Section: Professional Summary with AI */}
                            <div className="bg-card border border-border rounded-[2.5rem] p-10 shadow-sm space-y-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8">
                                    <div className="w-40 h-40 bg-restart/5 rounded-full blur-3xl -z-10" />
                                </div>

                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <h3 className="text-2xl font-black flex items-center gap-3">
                                        <span className="w-8 h-8 rounded-lg bg-restart/10 text-restart flex items-center justify-center text-sm font-black">2</span>
                                        Profesní souhrn
                                    </h3>
                                    <Button
                                        type="button"
                                        onClick={runAiAssistance}
                                        disabled={aiAssisting}
                                        className="rounded-xl bg-gradient-to-r from-talent to-restart text-white font-black shadow-lg hover:scale-105 transition-all"
                                    >
                                        {aiAssisting ? <Loader2 className="animate-spin mr-2" /> : <Sparkles className="mr-2 w-4 h-4" />}
                                        AI Překlad do byznysu
                                    </Button>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Stručně se popište (co nabízíte zaměstnavatelům)</Label>
                                    <Textarea
                                        value={profileData.summary}
                                        onChange={e => setProfileData({ ...profileData, summary: e.target.value })}
                                        className="rounded-2xl min-h-[150px] bg-muted/30 border-border/50 focus:border-talent p-6 leading-relaxed"
                                        placeholder="Příklad: Jsem bývalý hokejista s vášní pro technologie a týmovou práci..."
                                    />
                                    <div className="flex items-start gap-2 bg-muted/50 p-4 rounded-xl mt-2">
                                        <Info className="w-5 h-5 text-restart mt-0.5 shrink-0" />
                                        <p className="text-xs text-muted-foreground font-medium italic">
                                            Tip: Zaměstnavatelé hledají vaši disciplínu, vytrvalost a schopnost učit se novým věcem. AI vám pomůže tyto vlastnosti „přeložit" do jejich jazyka.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Section: Sports Achievements */}
                            <div className="bg-card border border-border rounded-[2.5rem] p-10 shadow-sm space-y-8">
                                <h3 className="text-2xl font-black flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-muted text-foreground flex items-center justify-center text-sm font-black">3</span>
                                    Sportovní kariéra & úspěchy
                                </h3>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Které sporty jste dělali na vrcholové úrovni?</Label>
                                        <Input
                                            value={profileData.sportsCareer}
                                            onChange={e => setProfileData({ ...profileData, sportsCareer: e.target.value })}
                                            className="rounded-2xl h-14 bg-muted/30 border-border/50 focus:border-talent"
                                            placeholder="Např. Lední hokej (12 let), Atletika"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Vaše největší sportovní úspěchy</Label>
                                        <Textarea
                                            value={profileData.achievements}
                                            onChange={e => setProfileData({ ...profileData, achievements: e.target.value })}
                                            className="rounded-2xl min-h-[100px] bg-muted/30 border-border/50 focus:border-talent p-6"
                                            placeholder="Např. Kapitán týmu, 3. místo na MČR, Účast na ME..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AthleteProfile;
