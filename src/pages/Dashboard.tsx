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
    TrendingUp,
    Bell,
    Award,
    ChevronRight,
    LogOut,
    Sparkles,
    Search,
    Filter,
    Mail,
    Smartphone,
    Lock,
    Eye,
    Zap,
    Target,
    Clock,
    ShieldAlert,
    CreditCard,
    Users
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

// --- Components ---

const SidebarItem = ({ icon: Icon, label, active = false, badge = null, onClick }: any) => (
    <button
        onClick={onClick}
        className={cn(
            "w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 group",
            active ? "bg-primary text-primary-foreground shadow-md" : "hover:bg-muted text-muted-foreground hover:text-foreground"
        )}
    >
        <div className="flex items-center gap-3">
            <Icon className="w-5 h-5" />
            <span className="font-bold text-sm tracking-wide">{label}</span>
        </div>
        {badge && (
            <span className={cn(
                "px-2 py-0.5 rounded-full text-[10px] font-black uppercase",
                active ? "bg-white/20" : "bg-primary/10 text-primary"
            )}>{badge}</span>
        )}
    </button>
);

const MarketPulseWidget = () => (
    <div className="bg-card border border-border rounded-3xl p-6 space-y-6 shadow-sm ring-1 ring-border/50">
        <div className="flex items-center justify-between">
            <h3 className="font-black text-sm uppercase tracking-widest flex items-center gap-2 text-muted-foreground">
                <TrendingUp className="w-4 h-4 text-red-500" />
                Market Pulse
            </h3>
            <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
        </div>
        <div className="space-y-4">
            {[
                { text: "Competitor X viewed 'Pavel N.' (Ice Hockey)", time: "2m ago" },
                { text: "3 new enterprise contracts signed today", time: "15m ago" },
                { text: "Top Talent 'Jana K.' received 2 offers", time: "1h ago", highlight: true }
            ].map((item, i) => (
                <div key={i} className="flex gap-3 items-start text-sm border-l-2 border-muted pl-3 py-1">
                    <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">{item.time}</span>
                    <p className={cn("font-medium leading-tight", item.highlight ? "text-red-500 font-bold" : "text-foreground")}>
                        {item.text}
                    </p>
                </div>
            ))}
        </div>
        <div className="p-4 bg-muted/30 rounded-xl border border-dashed border-border text-xs text-muted-foreground font-medium text-center">
            🔒 Upgrade to see precise competitor names
        </div>
    </div>
);

const LockedCandidateCard = () => (
    <div className="relative group overflow-hidden rounded-[2.5rem] bg-card border border-border shadow-sm opacity-80 hover:opacity-100 transition-opacity">
        <div className="absolute inset-0 backdrop-blur-[6px] bg-background/60 z-10 flex flex-col items-center justify-center p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-2">
                <Lock className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
                <h3 className="text-xl font-black">Hidden High-Potential</h3>
                <p className="text-muted-foreground font-medium text-sm mt-2">This candidate matches 98% of your criteria.</p>
            </div>
            <Button variant="restart" className="rounded-full px-8 font-black shadow-lg">
                Upgrade to Unlock
            </Button>
        </div>
        {/* Fake content behind blur */}
        <div className="p-8 space-y-6 filter blur-sm grayscale opacity-50">
            <div className="flex gap-4">
                <div className="w-20 h-20 bg-muted rounded-2xl" />
                <div className="space-y-4 flex-1">
                    <div className="h-6 w-3/4 bg-muted rounded-full" />
                    <div className="h-4 w-1/2 bg-muted rounded-full" />
                </div>
            </div>
        </div>
    </div>
);

// --- Main Dashboard Component ---

const Dashboard: React.FC = () => {
    const { user, signOut } = useAuth();
    const { language } = useLanguage();
    const [athletes, setAthletes] = useState<Athlete[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    const firstName = user?.user_metadata?.first_name || 'User';
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
        } catch (error) {
            console.error('Error fetching athletes:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isAthlete) {
        // --- Athlete View (Inspiring, Progress-focused) ---
        return (
            <div className="min-h-screen bg-muted/20 pb-20">
                <div className="container pt-12">
                    <div className="grid lg:grid-cols-12 gap-8">
                        {/* Left Column: Identify & Status */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="bg-card rounded-[3rem] p-8 border border-border shadow-sm text-center relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-talent to-talent-dark -z-10" />
                                <div className="mx-auto w-32 h-32 rounded-[2rem] bg-background p-2 shadow-2xl mb-6 relative">
                                    <div className="w-full h-full rounded-[1.5rem] bg-muted flex items-center justify-center text-4xl overflow-hidden relative">
                                        {/* Avatar Placeholder */}
                                        <span className="font-black text-muted-foreground">{firstName[0]}</span>
                                        <img src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=400" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-talent text-white rounded-full flex items-center justify-center border-4 border-background">
                                        <Sparkles className="w-5 h-5" />
                                    </div>
                                </div>
                                <h1 className="text-3xl font-black tracking-tight mb-2">{firstName}</h1>
                                <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs mb-8">Future Business Leader</p>

                                <div className="space-y-4 text-left p-6 bg-muted/30 rounded-3xl border border-border/50">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-xs font-black uppercase text-muted-foreground">Profile Strength</span>
                                        <span className="text-xl font-black text-talent">85%</span>
                                    </div>
                                    <div className="h-3 w-full bg-background rounded-full overflow-hidden shadow-inner">
                                        <div className="h-full bg-gradient-to-r from-talent to-talent-dark w-[85%]" />
                                    </div>
                                    <p className="text-xs text-muted-foreground font-medium mt-2">You are in the top 10% of candidates!</p>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[3rem] p-8 text-white relative overflow-hidden">
                                <div className="relative z-10 space-y-6">
                                    <Zap className="w-10 h-10 text-yellow-400 fill-yellow-400" />
                                    <div>
                                        <h3 className="text-2xl font-black mb-2">Pro Tip</h3>
                                        <p className="opacity-80 font-medium leading-relaxed">
                                            "In business, like in sports, recovery is key. Don't burnout before the interview phase."
                                        </p>
                                    </div>
                                    <Button variant="outline" className="w-full rounded-xl border-white/20 text-black hover:bg-white hover:text-black font-bold">
                                        Read More
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Actions & Feed */}
                        <div className="lg:col-span-8 space-y-12">
                            <div className="space-y-6">
                                <h2 className="text-3xl font-black flex items-center gap-3">
                                    Your Next Steps <ChevronRight className="w-6 h-6 opacity-30" />
                                </h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {[
                                        { title: "Complete CV", desc: "Add your achievements", icon: User, color: "text-blue-500", bg: "bg-blue-500/10", action: () => alert("Navigate to CV editor - Feature coming soon!") },
                                        { title: "AI Translation", desc: "Convert sports skills", icon: Sparkles, color: "text-purple-500", bg: "bg-purple-500/10", action: () => alert("🤖 AI Career Assistant\n\nYour AI assistant is ready to help you translate your sports achievements into professional skills!\n\nFeatures:\n✨ Automatic skill translation\n🎯 Career path recommendations\n📝 CV optimization\n💼 Interview preparation\n\nClick 'Complete CV' to start using AI assistance!") },
                                        { title: "Browse Jobs", desc: "3 new matches", icon: Search, color: "text-green-500", bg: "bg-green-500/10", action: () => alert("Job browser - Feature coming soon!") },
                                        { title: "Mentoring", desc: "Book a session", icon: Users, color: "text-orange-500", bg: "bg-orange-500/10", action: () => alert("Mentoring sessions - Feature coming soon!") },
                                    ].map((action, i) => (
                                        <div
                                            key={i}
                                            onClick={action.action}
                                            className="group flex items-center gap-6 p-6 bg-card border border-border/50 rounded-[2rem] hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
                                        >
                                            <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", action.bg, action.color)}>
                                                <action.icon className="w-8 h-8" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-black">{action.title}</h3>
                                                <p className="text-muted-foreground text-sm font-medium">{action.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-black">Recommended Reads</h2>
                                </div>
                                <div className="grid gap-4">
                                    <Link to="/blog/maraton-v-byznysu" className="flex gap-6 p-6 bg-card rounded-[2.5rem] border border-border/50 hover:bg-muted/50 transition-colors group">
                                        <div className="w-32 h-24 rounded-2xl bg-muted overflow-hidden shrink-0">
                                            <img src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div className="py-2">
                                            <div className="text-[10px] font-black uppercase text-talent tracking-widest mb-2">Most Popular</div>
                                            <h3 className="text-xl font-black leading-tight mb-2 group-hover:text-talent transition-colors">From Marathon to Management</h3>
                                            <p className="text-sm text-muted-foreground line-clamp-1">How endurance training prepares you for deep work.</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // --- Employer View (SaaS, Manipulative, Premium) ---

    return (
        <div className="min-h-screen bg-muted/10">
            <div className="flex h-screen overflow-hidden">
                {/* Fixed Sidebar */}
                <aside className="w-72 bg-card border-r border-border hidden lg:flex flex-col p-6 z-20 shadow-2xl">
                    <div className="flex items-center gap-2 mb-10 px-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-restart to-blue-700 rounded-lg flex items-center justify-center text-white font-black text-lg shadow-lg shadow-restart/20">
                            TR
                        </div>
                        <span className="font-black text-xl tracking-tight">Recruiter<span className="text-restart">Pro</span></span>
                    </div>

                    <div className="space-y-2 flex-grow">
                        <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-4 mb-2 opacity-50">Main Menu</div>
                        <SidebarItem icon={Briefcase} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
                        <SidebarItem icon={Target} label="Talent Pipeline" badge="3 New" onClick={() => setActiveTab('pipeline')} />
                        <SidebarItem icon={Mail} label="Messages" onClick={() => setActiveTab('messages')} />
                        <SidebarItem icon={Clock} label="History" onClick={() => setActiveTab('history')} />

                        <div className="h-8" />
                        <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-4 mb-2 opacity-50">Market Intelligence</div>
                        <SidebarItem icon={TrendingUp} label="Competitor Watch" onClick={() => setActiveTab('market')} />
                        <SidebarItem icon={ShieldAlert} label="Risk Analysis" onClick={() => setActiveTab('risk')} />
                    </div>

                    {/* Upsell Card in Sidebar */}
                    <div className="mt-auto bg-gradient-to-br from-gray-900 to-black p-6 rounded-3xl text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-20">
                            <Sparkles className="w-16 h-16 text-yellow-400" />
                        </div>
                        <div className="relative z-10 space-y-4">
                            <div className="text-xs font-black uppercase tracking-widest text-yellow-400">Free Plan Limit</div>
                            <h4 className="font-bold text-lg leading-tight">You are missing 85% of candidates.</h4>
                            <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                                <div className="bg-red-500 w-[15%] h-full" />
                            </div>
                            <Button size="sm" className="w-full bg-white text-black hover:bg-white/90 font-black rounded-xl">
                                Upgrade Now
                            </Button>
                        </div>
                    </div>
                </aside>

                {/* Main Content Scroll Area */}
                <main className="flex-1 overflow-y-auto bg-muted/10 relative">
                    {/* Top Header */}
                    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border px-8 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <h2 className="text-xl font-black text-foreground">Dashboard</h2>
                            <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-black uppercase tracking-wider border border-red-500/20 animate-pulse">
                                Market High Demand
                            </span>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                <Clock className="w-4 h-4" />
                                <span>Session: 14m</span>
                            </div>
                            <div className="h-8 w-px bg-border" />
                            <div className="flex items-center gap-3">
                                <div className="text-right hidden md:block">
                                    <div className="text-sm font-black">{firstName}</div>
                                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Free Account</div>
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-restart to-blue-600 flex items-center justify-center text-white font-bold shadow-lg cursor-pointer hover:scale-105 transition-transform">
                                    {firstName[0]}
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className="p-8 max-w-7xl mx-auto space-y-12">
                        {/* Stats Row */}
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-card p-6 rounded-[2rem] border border-border shadow-sm flex flex-col justify-between h-40 relative overflow-hidden">
                                <div className="absolute -right-4 -top-4 w-24 h-24 bg-restart/10 rounded-full blur-2xl" />
                                <div className="flex justify-between items-start z-10">
                                    <div className="p-3 rounded-2xl bg-restart/10 text-restart"><User className="w-6 h-6" /></div>
                                    <span className="text-green-500 text-xs font-black bg-green-500/10 px-2 py-1 rounded-full">+12 today</span>
                                </div>
                                <div className="z-10">
                                    <div className="text-4xl font-black text-foreground">{athletes.length}</div>
                                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">Available Athletes</div>
                                </div>
                            </div>

                            <div className="bg-card p-6 rounded-[2rem] border border-border shadow-sm flex flex-col justify-between h-40 relative overflow-hidden border-l-4 border-l-red-500">
                                <div className="absolute -right-4 -top-4 w-24 h-24 bg-red-500/10 rounded-full blur-2xl" />
                                <div className="flex justify-between items-start z-10">
                                    <div className="p-3 rounded-2xl bg-red-500/10 text-red-500"><Eye className="w-6 h-6" /></div>
                                </div>
                                <div className="z-10">
                                    <div className="text-4xl font-black text-foreground">14</div>
                                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">Missed Opportunities</div>
                                </div>
                                <p className="text-[10px] text-red-500 font-medium absolute bottom-6 right-6 max-w-[100px] text-right leading-tight">
                                    Competitors are faster.
                                </p>
                            </div>

                            <div className="bg-card p-6 rounded-[2rem] border border-border shadow-sm flex flex-col justify-between h-40 relative overflow-hidden bg-gradient-to-br from-card to-muted">
                                <div className="z-10 flex flex-col items-center justify-center h-full text-center space-y-3">
                                    <Lock className="w-8 h-8 text-muted-foreground" />
                                    <div className="text-sm font-black text-muted-foreground uppercase tracking-widest">Premium Analytics</div>
                                    <Button variant="outline" size="sm" className="h-8 text-xs font-bold rounded-full">Unlock Data</Button>
                                </div>
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-8">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-2xl font-black tracking-tight">Top Recommendations</h3>
                                    <Button variant="ghost" className="text-restart font-bold">View All</Button>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {isLoading ? (
                                        [1, 2].map(i => <div key={i} className="h-64 bg-card rounded-[2.5rem] animate-pulse" />)
                                    ) : (
                                        <>
                                            {athletes.slice(0, 2).map((athlete) => (
                                                <div key={athlete.id} className="bg-card p-8 rounded-[2.5rem] border border-border shadow-sm hover:shadow-xl transition-all group relative">
                                                    <div className="flex justify-between items-start mb-6">
                                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-restart to-blue-600 flex items-center justify-center text-white font-black text-2xl shadow-lg">
                                                            {athlete.first_name[0]}{athlete.last_name[0]}
                                                        </div>
                                                        <span className="px-3 py-1 rounded-lg bg-muted text-xs font-black uppercase tracking-widest text-muted-foreground">
                                                            {athlete.sports_career || "Athlete"}
                                                        </span>
                                                    </div>
                                                    <h4 className="text-xl font-black mb-2">{athlete.first_name} {athlete.last_name}</h4>
                                                    <p className="text-sm text-muted-foreground font-medium line-clamp-2 mb-6">
                                                        {athlete.summary || "High potential candidate with proven track record of discipline."}
                                                    </p>
                                                    <div className="flex gap-2">
                                                        <Button variant="outline" className="flex-1 rounded-xl font-bold border-2 hover:bg-restart hover:text-white hover:border-restart transition-colors">
                                                            Profile
                                                        </Button>
                                                        <Button variant="secondary" className="rounded-xl px-3">
                                                            <Mail className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                            {/* Locked items */}
                                            <LockedCandidateCard />
                                            <LockedCandidateCard />
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-8">
                                <MarketPulseWidget />

                                <div className="bg-gradient-to-b from-card to-background border border-border rounded-[2.5rem] p-8 text-center space-y-6 shadow-xl relative overflow-hidden">
                                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
                                    <ShieldAlert className="w-12 h-12 text-red-500 mx-auto" />
                                    <div>
                                        <h4 className="text-xl font-black">Recruitment Risk: HIGH</h4>
                                        <p className="text-muted-foreground font-medium text-sm mt-2 leading-relaxed">
                                            Your current "Passive" strategy has a 80% failure rate in this market.
                                        </p>
                                    </div>
                                    <div className="bg-red-500/10 rounded-xl p-4 text-left">
                                        <div className="flex justify-between text-xs font-black uppercase text-red-500 mb-2">
                                            <span>Market Speed</span>
                                            <span>Critical</span>
                                        </div>
                                        <div className="w-full bg-red-200 h-1.5 rounded-full overflow-hidden">
                                            <div className="bg-red-500 w-[92%] h-full animate-pulse" />
                                        </div>
                                    </div>
                                    <Button className="w-full bg-red-500 hover:bg-red-600 text-white font-black rounded-xl shadow-lg shadow-red-500/20 py-6 text-lg">
                                        Switch to Aggressive
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
