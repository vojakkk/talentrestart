import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import {
    User,
    Settings,
    Briefcase,
    FileText,
    TrendingUp,
    Bell,
    Award,
    ChevronRight,
    LogOut,
    Sparkles,
    Search,
    Filter,
    Mail,
    Smartphone
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

interface Athlete {
    id: string;
    first_name: string;
    last_name: string;
    role: string;
    sports_career?: string;
    summary?: string;
    achievements?: string;
    created_at: string;
}

const Dashboard: React.FC = () => {
    const { user, signOut } = useAuth();
    const { language } = useLanguage();
    const [athletes, setAthletes] = useState<Athlete[]>([]);
    const [filteredAthletes, setFilteredAthletes] = useState<Athlete[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // Extract user info
    const firstName = user?.user_metadata?.first_name || 'Uživatel';
    const role = user?.user_metadata?.role || user?.user_metadata?.user_role || user?.user_metadata?.account_type || 'athlete';
    const isAthlete = role === 'athlete';

    useEffect(() => {
        if (!isAthlete) {
            fetchAthletes();
        } else {
            setIsLoading(false);
        }
    }, [isAthlete]);

    const fetchAthletes = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('role', 'athlete')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setAthletes(data || []);
            setFilteredAthletes(data || []);
        } catch (error) {
            console.error('Error fetching athletes:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const query = searchQuery.toLowerCase();
        const filtered = athletes.filter(a =>
        (a.first_name?.toLowerCase().includes(query) ||
            a.last_name?.toLowerCase().includes(query) ||
            a.sports_career?.toLowerCase().includes(query) ||
            a.summary?.toLowerCase().includes(query))
        );
        setFilteredAthletes(filtered);
    }, [searchQuery, athletes]);

    const stats = isAthlete
        ? [
            { label: 'Zhlédnutí profilu', value: '24' },
            { label: 'Otevřené přihlášky', value: '3' },
            { label: 'Nabídky ke schůzce', value: '1' },
        ]
        : [
            { label: 'Aktivní inzeráty', value: '5' },
            { label: 'Dostupní sportovci', value: athletes.length.toString() },
            { label: 'Naplánované pohovory', value: '4' },
        ];

    const actions = isAthlete
        ? [
            { title: 'Dokončit profil', icon: User, color: 'bg-talent/10 text-talent', description: 'Zbývá 30% k dosažení plného profilu.', href: '/profile/athlete' },
            { title: 'AI asistence', icon: Sparkles, color: 'bg-restart/10 text-restart', description: 'Přeložte své sportovní úspěchy do byznysu.', href: '/profile/athlete' },
            { title: 'Nahrát životopis', icon: FileText, color: 'bg-muted text-foreground', description: 'Ukažte zaměstnavatelům své silné stránky.', href: '/profile/athlete' },
        ]
        : [
            { title: 'Vytvořit inzerát', icon: Briefcase, color: 'bg-restart/10 text-restart', description: 'Oslovte disciplinované talenty.' },
            { title: 'Hledat sportovce', icon: User, color: 'bg-talent/10 text-talent', description: 'Filtrujte podle sportovní disciplíny.' },
            { title: 'Nastavení firmy', icon: Settings, color: 'bg-muted text-foreground', description: 'Upravte profil svého týmu.' },
        ];

    return (
        <div className="min-h-screen bg-muted/20 pb-20">
            {/* Dashboard Header */}
            <div className="bg-background border-b border-border mb-8 animate-fade-in shadow-sm">
                <div className="container py-12">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="space-y-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-talent/10 text-talent text-xs font-black uppercase tracking-widest mb-2">
                                {isAthlete ? 'Můj Sportovní Profil' : 'HR Dashboard'}
                            </div>
                            <h1 className="text-4xl font-black">Ahoj, {firstName}! 🚀</h1>
                            <p className="text-muted-foreground font-medium">Vítej zpět. {isAthlete ? 'Dnes máš 2 nová upozornění.' : `Dnes máme ${athletes.length} registrovaných sportovců.`}</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button variant="outline" size="lg" className="rounded-2xl gap-2 font-bold border-2" asChild>
                                <Link to={isAthlete ? "/profile/athlete" : "#"}>
                                    <Settings className="w-5 h-5" />
                                    <span className="hidden sm:inline">Nastavení</span>
                                </Link>
                            </Button>
                            <Button variant="talent" size="lg" className="rounded-2xl gap-2 font-bold shadow-lg shadow-talent/20">
                                <Bell className="w-5 h-5" />
                                <span className="relative">
                                    Upozornění
                                    <span className="absolute -top-3 -right-3 w-5 h-5 bg-restart rounded-full flex items-center justify-center text-[10px] text-white border-2 border-background font-black">2</span>
                                </span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Stats Overview */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {stats.map((stat, i) => (
                                <div key={i} className="bg-card p-8 rounded-[2.5rem] border border-border shadow-sm flex flex-col gap-1 hover:border-talent/30 transition-all group cursor-default">
                                    <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">{stat.label}</span>
                                    <span className="text-4xl font-black text-foreground group-hover:text-talent transition-colors">{stat.value}</span>
                                    <div className="mt-2 flex items-center gap-1 text-xs font-bold text-talent">
                                        <TrendingUp className="w-3 h-3" />
                                        +12% od minula
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Athlete List (For Employers) or Actions (For Athletes) */}
                        {!isAthlete ? (
                            <div className="space-y-8">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <h2 className="text-3xl font-black">Najděte své talenty</h2>
                                    <div className="flex gap-4">
                                        <div className="relative">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <Input
                                                className="pl-12 rounded-2xl h-12 w-full md:w-[300px] bg-card border-border"
                                                placeholder="Hledat jméno, sport..."
                                                value={searchQuery}
                                                onChange={e => setSearchQuery(e.target.value)}
                                            />
                                        </div>
                                        <Button variant="outline" className="rounded-2xl h-12 border-2 px-6">
                                            <Filter className="w-4 h-4 mr-2" />
                                            Filtry
                                        </Button>
                                    </div>
                                </div>

                                {isLoading ? (
                                    <div className="grid md:grid-cols-2 gap-6 opacity-50">
                                        {[1, 2, 3, 4].map(i => <div key={i} className="h-48 bg-card rounded-[2.5rem] animate-pulse" />)}
                                    </div>
                                ) : (
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {filteredAthletes.map((athlete, i) => (
                                            <div key={athlete.id} className="group bg-card border border-border rounded-[2.5rem] p-8 space-y-6 hover:shadow-xl hover:border-talent/50 transition-all animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                                                <div className="flex justify-between items-start">
                                                    <div className="w-16 h-16 rounded-[1.5rem] bg-talent/10 flex items-center justify-center text-talent font-black text-2xl group-hover:rotate-6 transition-transform">
                                                        {athlete.first_name?.[0]}{athlete.last_name?.[0]}
                                                    </div>
                                                    <span className="px-3 py-1 bg-muted rounded-full text-[10px] font-black uppercase tracking-widest text-muted-foreground border border-border">
                                                        {athlete.sports_career || "Sportovec"}
                                                    </span>
                                                </div>
                                                <div className="space-y-2">
                                                    <h3 className="text-xl font-black group-hover:text-talent transition-colors">
                                                        {athlete.first_name} {athlete.last_name}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground font-medium line-clamp-2 leading-relaxed">
                                                        {athlete.summary || "Tento sportovec zatím nedokončil svůj profesní souhrn."}
                                                    </p>
                                                </div>
                                                <div className="pt-4 border-t border-border flex items-center justify-between">
                                                    <div className="flex gap-2">
                                                        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-talent transition-colors">
                                                            <Mail className="w-4 h-4" />
                                                        </div>
                                                        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-restart transition-colors">
                                                            <Smartphone className="w-4 h-4" />
                                                        </div>
                                                    </div>
                                                    <Button variant="ghost" className="font-black text-sm p-0 h-auto hover:bg-transparent text-talent group/link">
                                                        Zobrazit profil
                                                        <ChevronRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                        {filteredAthletes.length === 0 && (
                                            <div className="col-span-2 py-20 text-center space-y-4 bg-muted/30 rounded-[3rem] border-2 border-dashed border-border">
                                                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto">
                                                    <Search className="w-8 h-8 text-muted-foreground" />
                                                </div>
                                                <h4 className="text-xl font-black">Nenalezen žádný sportovec</h4>
                                                <p className="text-muted-foreground max-w-xs mx-auto font-medium">Zkuste upravit vyhledávací dotaz nebo filtry.</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-black">Rychlé akce</h2>
                                <div className="grid gap-4">
                                    {actions.map((action, i) => (
                                        <Link
                                            key={i}
                                            to={action.href || "#"}
                                            className="flex items-center gap-6 p-6 bg-card hover:bg-muted/30 border border-border rounded-[2rem] transition-all text-left group animate-fade-up shadow-sm hover:shadow-md"
                                            style={{ animationDelay: `${(i + 3) * 0.1}s` }}
                                        >
                                            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-6 shadow-sm", action.color)}>
                                                <action.icon className="w-7 h-7" />
                                            </div>
                                            <div className="flex-grow">
                                                <h3 className="text-lg font-black">{action.title}</h3>
                                                <p className="text-sm text-muted-foreground font-medium">{action.description}</p>
                                            </div>
                                            <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all">
                                                <ChevronRight className="w-5 h-5" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Area */}
                    <div className="space-y-8 animate-fade-in stagger-3">
                        {isAthlete && (
                            <div className="bg-gradient-to-br from-talent to-talent-dark p-8 rounded-[2.5rem] text-white shadow-xl shadow-talent/20 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                    <Sparkles className="w-20 h-20" />
                                </div>
                                <h3 className="text-xl font-black mb-6 relative">Dokončenost profilu</h3>
                                <div className="relative h-4 w-full bg-white/20 rounded-full mb-4 overflow-hidden">
                                    <div className="absolute top-0 left-0 h-full bg-white rounded-full w-[70%] shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                                </div>
                                <div className="flex justify-between items-end mb-8 relative">
                                    <span className="text-sm font-bold uppercase tracking-widest opacity-80">Aktuálně 70%</span>
                                    <span className="text-sm font-bold opacity-80">Zbývá nahrát CV</span>
                                </div>
                                <Button variant="secondary" className="w-full h-14 rounded-2xl font-black group shadow-lg" asChild>
                                    <Link to="/profile/athlete">
                                        Dokončit nyní
                                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </Button>
                            </div>
                        )}

                        {!isAthlete && (
                            <div className="bg-card border border-border rounded-[2.5rem] p-8 space-y-6 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-restart/10 text-restart flex items-center justify-center">
                                        <Briefcase className="w-6 h-6" />
                                    </div>
                                    <h4 className="font-black">Správa inzerátů</h4>
                                </div>
                                <p className="text-sm text-muted-foreground font-medium">Máte 2 aktivní inzeráty, na které se přihlásilo 12 sportovců.</p>
                                <Button variant="outline" className="w-full rounded-xl border-2 font-bold py-6">
                                    Zobrazit inzeráty
                                </Button>
                            </div>
                        )}

                        {/* Help/Logout Info */}
                        <div className="bg-card border border-border rounded-[2.5rem] p-8 space-y-6 shadow-sm">
                            <div className="space-y-2">
                                <h4 className="font-black">Potřebujete pomoc?</h4>
                                <p className="text-sm text-muted-foreground font-medium leading-relaxed">Náš tým je tu pro vás, aby vám pomohl s přechodem do byznysu nebo výběrem talentů.</p>
                            </div>
                            <Button variant="ghost" className="w-full justify-start gap-4 p-0 h-auto hover:bg-transparent hover:text-talent font-bold group" onClick={signOut}>
                                <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-talent/10 group-hover:text-talent transition-all">
                                    <LogOut className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <div className="text-sm font-black">Odhlásit se</div>
                                    <div className="text-[10px] text-muted-foreground uppercase">Konec relace</div>
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ArrowRight: React.FC<{ className?: string }> = ({ className }) => (
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
        <path d="M5 12h14"></path>
        <path d="m12 5 7 7-7 7"></path>
    </svg>
);

export default Dashboard;
