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
        <div className="min-h-screen bg-muted/20 pb-20 overflow-hidden">
            {/* Role-Specific Hero Background */}
            <div className="relative">
                <div className={cn(
                    "absolute top-0 left-0 w-full h-[300px] -z-10",
                    isAthlete
                        ? "bg-gradient-to-br from-talent/20 via-background to-restart/10"
                        : "bg-gradient-to-br from-restart/20 via-background to-talent/10"
                )} />
                <div className="absolute top-0 right-0 w-full h-[300px] -z-10 opacity-30">
                    <img
                        src={isAthlete
                            ? "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=1500"
                            : "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1500"
                        }
                        className="w-full h-full object-cover mask-gradient-to-b"
                    />
                </div>
            </div>

            {/* Dashboard Header */}
            <div className="container pt-12 mb-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div className="space-y-4">
                        <div className={cn(
                            "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-sm",
                            isAthlete ? "bg-talent text-white" : "bg-restart text-white"
                        )}>
                            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            {isAthlete ? 'Můj Náskok' : 'Nabídka Talentů'}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                            {isAthlete ? 'Vítej na vrcholu,' : 'Najděte ty nejlepší,'} <br />
                            <span className="text-gradient-brand">{firstName}</span>
                        </h1>
                        <p className="text-lg text-muted-foreground font-medium max-w-xl">
                            {isAthlete
                                ? 'Vaše cesta ze sportu do byznysu nabírá na rychlosti. Máme pro vás nové možnosti.'
                                : `Aktuálně máte přístup k ${athletes.length} prověřeným sportovcům s vítěznou mentalitou.`}
                        </p>

                        {!isAthlete && (
                            <div className="flex flex-wrap items-center gap-4 animate-fade-in stagger-3">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-600 rounded-full border border-green-500/20 shadow-sm">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Status: Prioritní přístup (AKTIVNÍ)</span>
                                </div>
                                <div className="text-xs font-bold text-muted-foreground italic flex items-center gap-1">
                                    <Sparkles className="w-3 h-3 text-restart" />
                                    Váš účet je v TOP 5 % nejaktivnějších náborářů
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="xl" className="rounded-[1.5rem] gap-2 font-black border-2 bg-background/80 backdrop-blur-md h-16 px-8" asChild>
                            <Link to={isAthlete ? "/profile/athlete" : "#"}>
                                <Settings className="w-5 h-5" />
                                <span className="hidden sm:inline">Správa účtu</span>
                            </Link>
                        </Button>
                        <Button variant={isAthlete ? "talent" : "restart"} size="xl" className="rounded-[1.5rem] gap-2 font-black shadow-2xl h-16 px-8 relative overflow-hidden group">
                            <span className="relative z-10 flex items-center gap-2">
                                <Bell className="w-5 h-5" />
                                Centrála
                                <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] ml-1">2</span>
                            </span>
                            <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-full transition-all duration-1000" />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Main Content Area */}
                    <div className="lg:col-span-8 space-y-12">

                        {/* Stats Cards - Redesigned */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {stats.map((stat, i) => (
                                <div key={i} className="group relative bg-card/60 backdrop-blur-md p-8 rounded-[2.5rem] border border-border/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                                    <div className="absolute top-8 right-8 w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center group-hover:bg-talent/10 transition-colors">
                                        {i === 0 ? <TrendingUp className="w-6 h-6 text-talent" /> : i === 1 ? <User className="w-6 h-6 text-restart" /> : <Award className="w-6 h-6 text-talent" />}
                                    </div>
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4">{stat.label}</h4>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-5xl font-black tabular-nums">{stat.value}</span>
                                        <span className="text-xs font-bold text-talent">+12%</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Dynamic Section */}
                        {isAthlete ? (
                            <div className="space-y-8">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-3xl font-black">Moje další kroky</h2>
                                </div>
                                <div className="grid gap-6">
                                    {actions.map((action, i) => (
                                        <Link
                                            key={i}
                                            to={action.href || "#"}
                                            className="group relative flex items-center gap-8 p-8 bg-card/40 backdrop-blur-md border border-border/50 rounded-[3rem] hover:bg-card hover:shadow-2xl hover:border-talent/20 transition-all text-left animate-fade-up overflow-hidden"
                                            style={{ animationDelay: `${(i + 1) * 0.1}s` }}
                                        >
                                            <div className={cn(
                                                "w-20 h-20 rounded-[1.75rem] flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-xl",
                                                action.color
                                            )}>
                                                <action.icon className="w-10 h-10" />
                                            </div>
                                            <div className="flex-grow space-y-1">
                                                <h3 className="text-2xl font-black tracking-tight">{action.title}</h3>
                                                <p className="text-lg text-muted-foreground font-medium leading-relaxed">{action.description}</p>
                                            </div>
                                            <div className="w-14 h-14 rounded-full border-2 border-border flex items-center justify-center group-hover:bg-talent group-hover:border-talent group-hover:text-white transition-all">
                                                <ChevronRight className="w-6 h-6" />
                                            </div>
                                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-talent/5 rounded-full blur-3xl -z-10 translate-x-10 translate-y-10 group-hover:scale-150 transition-transform duration-700" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 bg-card/40 backdrop-blur-lg p-10 rounded-[3rem] border border-border/50">
                                    <div className="space-y-2">
                                        <h2 className="text-3xl font-black">Adresář talentů</h2>
                                        <p className="text-muted-foreground font-medium">Filtrujte mezi sportovci podle disciplíny nebo mentality.</p>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-4 flex-grow max-w-xl">
                                        <div className="relative flex-grow group">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-restart transition-colors" />
                                            <Input
                                                className="pl-12 rounded-2xl h-16 w-full bg-background border-2 border-border/50 focus:border-restart transition-all text-lg font-medium"
                                                placeholder="Fotbal, Houževnatost, Praha..."
                                                value={searchQuery}
                                                onChange={e => setSearchQuery(e.target.value)}
                                            />
                                        </div>
                                        <Button variant="outline" className="rounded-[1.2rem] h-16 border-2 px-8 font-black hover:border-restart">
                                            <Filter className="w-5 h-5 mr-3" />
                                            Parametry
                                        </Button>
                                    </div>
                                </div>

                                {isLoading ? (
                                    <div className="grid md:grid-cols-2 gap-8 opacity-50">
                                        {[1, 2, 3, 4].map(i => <div key={i} className="h-64 bg-card rounded-[3rem] animate-pulse shadow-sm" />)}
                                    </div>
                                ) : (
                                    <div className="grid md:grid-cols-2 gap-8">
                                        {filteredAthletes.map((athlete, i) => (
                                            <div key={athlete.id} className="group relative bg-card border border-border/50 rounded-[3rem] p-10 space-y-8 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:border-talent/30 transition-all duration-500 animate-fade-up overflow-hidden" style={{ animationDelay: `${i * 0.1}s` }}>
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-talent/5 rounded-full blur-3xl -z-10 group-hover:bg-talent/10 transition-colors" />

                                                <div className="flex justify-between items-start">
                                                    <div className="relative">
                                                        <div className="w-20 h-20 rounded-[1.75rem] bg-gradient-to-br from-talent to-talent-dark flex items-center justify-center text-white font-black text-3xl shadow-xl group-hover:scale-105 transition-transform duration-500">
                                                            {athlete.first_name?.[0]}{athlete.last_name?.[0]}
                                                        </div>
                                                        <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white border-4 border-card flex items-center justify-center text-xs font-black shadow-lg">
                                                            <Award className="w-4 h-4 text-talent" />
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-end gap-2">
                                                        <span className="px-4 py-1.5 bg-muted/80 backdrop-blur-sm rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground border border-border/50">
                                                            {athlete.sports_career || "Sálový sport"}
                                                        </span>
                                                        <span className="text-[10px] font-bold text-muted-foreground opacity-60">AKTIVNÍ DNES</span>
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    <h3 className="text-2xl font-black tracking-tight group-hover:text-talent transition-colors">
                                                        {athlete.first_name} {athlete.last_name}
                                                    </h3>
                                                    <p className="text-muted-foreground font-medium leading-relaxed line-clamp-3">
                                                        {athlete.summary || "Tento sportovec je v procesu transformace své kariéry. Kontaktujte nás pro více detailů."}
                                                    </p>
                                                </div>

                                                <div className="pt-8 border-t border-border flex items-center justify-between">
                                                    <div className="flex gap-3">
                                                        <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-talent/10 hover:text-talent transition-all cursor-pointer">
                                                            <Mail className="w-5 h-5" />
                                                        </div>
                                                        <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-restart/10 hover:text-restart transition-all cursor-pointer">
                                                            <Smartphone className="w-5 h-5" />
                                                        </div>
                                                    </div>
                                                    <Button variant="ghost" className="font-black text-base p-0 h-auto hover:bg-transparent text-talent group/link flex items-center">
                                                        Celý profil
                                                        <ChevronRight className="w-5 h-5 ml-2 group-hover/link:translate-x-2 transition-transform" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Sidebar Area - Redesigned */}
                    <div className="lg:col-span-4 space-y-10 animate-fade-in">
                        {isAthlete && (
                            <div className="bg-gradient-to-br from-talent to-talent-dark p-10 rounded-[3.5rem] text-white shadow-2xl shadow-talent/30 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                                    <Sparkles className="w-32 h-32" />
                                </div>
                                <div className="relative z-10 space-y-8">
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-black">Cesta šampiona</h3>
                                        <p className="opacity-80 font-medium">Zůstává jen pár kroků k prvnímu pohovoru.</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-end justify-between">
                                            <span className="text-sm font-black uppercase tracking-widest opacity-80">Úspěšnost profilu</span>
                                            <span className="text-3xl font-black">70</span>
                                        </div>
                                        <div className="h-4 w-full bg-white/20 rounded-full overflow-hidden p-1">
                                            <div className="h-full bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.8)]" style={{ width: '70%' }} />
                                        </div>
                                    </div>

                                    <Button variant="secondary" className="w-full h-16 rounded-2xl font-black group shadow-xl hover:scale-[1.02] transition-all bg-white text-talent" asChild>
                                        <Link to="/profile/athlete">
                                            Dokončit výzvu
                                            <ChevronRight className="ml-2 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        )}

                        {!isAthlete && (
                            <div className="bg-card border-2 border-restart/20 p-10 rounded-[3rem] space-y-8 shadow-sm">
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 rounded-2xl bg-restart/10 text-restart flex items-center justify-center shadow-inner">
                                        <Award className="w-8 h-8" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-black text-xl">Prioritní Matcher</h4>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-green-500" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Algoritmus: Maximální</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-muted-foreground font-medium leading-relaxed text-sm">
                                    Vaše firma je aktuálně v prioritním seznamu pro oslovení nových talentů. Jakékoliv přerušení aktivity vás posune za vaši konkurenci.
                                </p>
                                <Button variant="outline" className="w-full h-14 rounded-2xl border-2 font-black border-restart/30 hover:bg-restart/5 hover:border-restart transition-all shadow-sm">
                                    Sledovat konkurenci
                                </Button>
                            </div>
                        )}

                        {/* Stories/Blog Section for Athlete */}
                        {isAthlete && (
                            <div className="bg-card border border-border rounded-[3rem] p-10 space-y-8 shadow-sm">
                                <h4 className="text-xl font-black">Inspirace pro vás</h4>
                                <div className="space-y-6">
                                    <Link to="/blog/maraton-v-byznysu" className="group block space-y-3">
                                        <div className="aspect-video rounded-2xl overflow-hidden mb-4">
                                            <img src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        </div>
                                        <h5 className="font-black group-hover:text-talent transition-colors">Jak disciplína mění kariéru</h5>
                                        <p className="text-xs text-muted-foreground line-clamp-2">Příběh Lukáše, který po 10 letech v atletice...</p>
                                    </Link>
                                    <Link to="/blog" className="text-xs font-black text-talent hover:underline flex items-center">
                                        VŠECHNY PŘÍBĚHY <ChevronRight className="ml-1 w-3 h-3" />
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* Manipulative/Strategic Section for Employers */}
                        {!isAthlete && (
                            <div className="bg-card border-2 border-restart/20 p-10 rounded-[3rem] space-y-8 shadow-sm bg-gradient-to-b from-card to-restart/5">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-xl font-black">Strategické vhledy</h4>
                                    <div className="px-3 py-1 bg-restart text-white text-[10px] font-black rounded-full animate-pulse">
                                        EXCLUSIVE
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <Link to="/blog/konkurence-neceka" className="group block space-y-3 p-4 rounded-2xl hover:bg-background transition-colors border border-transparent hover:border-restart/20">
                                        <div className="aspect-video rounded-xl overflow-hidden mb-2 relative">
                                            <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                                                <span className="text-white text-[10px] font-black uppercase tracking-widest">Analýza trhu</span>
                                            </div>
                                        </div>
                                        <h5 className="font-black group-hover:text-restart transition-colors leading-tight">Váš největší konkurent právě prohlíží stejné profily</h5>
                                        <p className="text-xs text-muted-foreground line-clamp-2 italic">"Zatímco vy váháte, ostatní lídři už vědí, že disciplína sportovce je jejich největší výhoda..."</p>
                                    </Link>

                                    <div className="h-px bg-border/50" />

                                    <Link to="/blog/proc-vzdat-hledani" className="group block space-y-2">
                                        <div className="flex items-start gap-4">
                                            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                                                <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=150" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="space-y-1">
                                                <h5 className="text-sm font-black group-hover:text-restart transition-colors leading-snug">Možná byste to měli vzdát a spokojit se s průměrem</h5>
                                                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter cursor-pointer hover:underline">Psychology of Scarcity →</p>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link to="/blog" className="text-xs font-black text-restart hover:underline flex items-center justify-center pt-2 gap-2">
                                        EXKLUZIVNÍ STRATEGIE PRO PARTNERY <ChevronRight className="w-3 h-3" />
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* Help/Logout Info - Redesigned */}
                        <div className="bg-card border border-border rounded-[3rem] p-10 space-y-8 shadow-sm">
                            <div className="space-y-3">
                                <h4 className="text-xl font-black flex items-center gap-2">
                                    Potřebujete pomoc?
                                </h4>
                                <p className="text-muted-foreground font-medium leading-relaxed">Náš tým mentorů je připraven vám poradit 24/7.</p>
                            </div>
                            <Button variant="ghost" className="w-full justify-start gap-4 p-0 h-auto hover:bg-transparent hover:text-talent font-bold group" onClick={signOut}>
                                <div className="w-16 h-16 rounded-[1.5rem] bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-red-500/10 group-hover:text-red-500 transition-all duration-300">
                                    <LogOut className="w-7 h-7" />
                                </div>
                                <div className="text-left">
                                    <div className="text-lg font-black group-hover:text-red-500 transition-colors">Odhlásit se</div>
                                    <div className="text-xs text-muted-foreground font-medium capitalize">Bezpečné ukončení</div>
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
