import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Search,
    Filter,
    User,
    MapPin,
    Award,
    Briefcase,
    ChevronRight,
    Star,
    Mail,
    Zap,
    ShieldCheck
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { useLanguage } from '@/contexts/LanguageContext';

interface Profile {
    id: string;
    first_name: string;
    last_name: string;
    sports_career?: string;
    summary?: string;
    skills?: string;
    location?: string;
}

const BrowseAthletes = () => {
    const { t, language } = useLanguage();
    const [athletes, setAthletes] = useState<Profile[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchAthletes();
    }, []);

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

    return (
        <div className="min-h-screen bg-muted/10 pb-20 pt-12">
            <div className="container max-w-7xl">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-restart/10 text-restart text-xs font-black uppercase tracking-widest">
                            <Zap className="w-3 h-3" />
                            {t('browse.premiumAccess')}
                        </div>
                        <h1 className="text-4xl font-black tracking-tight">{t('browse.title').split(' ')[0]} <span className="text-muted-foreground/30">/</span> {t('browse.title').split(' ')[1] || 'Database'}</h1>
                        <p className="text-muted-foreground font-medium">{t('browse.subtitle')}</p>
                    </div>

                    <div className="flex gap-3">
                        <Button variant="outline" className="rounded-xl font-bold border-2">
                            <Filter className="w-4 h-4 mr-2" /> {t('browse.filters')}
                        </Button>
                        <Button className="bg-restart hover:bg-blue-700 rounded-xl font-bold px-8 shadow-lg shadow-restart/20">
                            {t('browse.postJob')}
                        </Button>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative mb-12 group">
                    <div className="absolute inset-0 bg-restart/20 blur-3xl opacity-10 group-hover:opacity-20 transition-opacity" />
                    <div className="relative flex p-2 bg-card border border-border rounded-2.5xl shadow-xl">
                        <div className="flex-1 flex items-center px-4 gap-3">
                            <Search className="w-5 h-5 text-muted-foreground" />
                            <Input
                                placeholder={t('browse.searchPlaceholder')}
                                className="border-0 bg-transparent focus-visible:ring-0 text-lg font-medium p-0"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button className="h-14 px-10 rounded-2xl bg-restart hover:bg-blue-700 text-lg font-black transition-all shadow-lg">
                            {t('browse.searchBtn')}
                        </Button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Filters Sidebar */}
                    <aside className="space-y-8">
                        <div className="bg-card border border-border rounded-3xl p-6 space-y-6 shadow-sm">
                            <h3 className="font-black text-xs font-mono uppercase tracking-widest text-muted-foreground flex items-center justify-between">
                                {t('browse.filters')}
                                <span className="text-[10px] text-restart cursor-pointer hover:underline">{t('browse.reset')}</span>
                            </h3>

                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-xs font-black uppercase tracking-wider">{t('browse.sportingLevel')}</label>
                                    {(language === 'cs' ? ['Profesionální', 'Olympijská', 'Národní tým', 'Divize I'] : ['Professional', 'Olympic', 'National Team', 'Division I']).map(level => (
                                        <div key={level} className="flex items-center gap-3">
                                            <div className="w-4 h-4 rounded border border-border" />
                                            <span className="text-sm font-medium">{level}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-3">
                                    <label className="text-xs font-black uppercase tracking-wider">{t('browse.availability')}</label>
                                    {(language === 'cs' ? ['Okamžitá', 'Do 1 měsíce', 'Otevřen k nabídkám'] : ['Immediate', 'Within 1 month', 'Open to offers']).map(level => (
                                        <div key={level} className="flex items-center gap-3">
                                            <div className="w-4 h-4 rounded border border-border" />
                                            <span className="text-sm font-medium">{level}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 text-white relative overflow-hidden">
                            <ShieldCheck className="w-12 h-12 opacity-20 mb-4" />
                            <h4 className="font-bold text-lg leading-tight mb-2">{t('browse.verifiedAthletes')}</h4>
                            <p className="text-xs opacity-60 font-medium leading-relaxed">
                                {t('browse.verifiedDesc')}
                            </p>
                        </div>
                    </aside>

                    {/* Athlete List */}
                    <div className="lg:col-span-3 space-y-6">
                        {isLoading ? (
                            [1, 2, 3].map(i => <div key={i} className="h-64 bg-card rounded-[2.5rem] animate-pulse" />)
                        ) : (
                            athletes.map((athlete) => (
                                <div key={athlete.id} className="group bg-card border border-border rounded-[2.5rem] p-8 hover:shadow-2xl hover:shadow-restart/5 transition-all cursor-pointer relative overflow-hidden">
                                    <div className="flex flex-col md:flex-row gap-8">
                                        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-restart to-blue-700 flex items-center justify-center text-white font-black text-3xl shadow-xl shrink-0 group-hover:scale-105 transition-transform duration-500">
                                            {athlete.first_name[0]}{athlete.last_name[0]}
                                        </div>

                                        <div className="flex-1 space-y-4">
                                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                                <div>
                                                    <h3 className="text-2xl font-black mb-1 group-hover:text-restart transition-colors">{athlete.first_name} {athlete.last_name}</h3>
                                                    <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm font-bold text-muted-foreground">
                                                        <div className="flex items-center gap-1.5"><Award className="w-4 h-4 text-restart" /> {athlete.sports_career || (language === 'cs' ? 'Sportovec' : 'Athlete')}</div>
                                                        <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Prague, CZ</div>
                                                        <div className="flex items-center gap-1.5"><Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> {t('browse.topTalent')}</div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button className="rounded-xl font-bold bg-restart hover:bg-blue-700 shadow-lg shadow-restart/10 px-6">
                                                        {t('browse.viewProfile')}
                                                    </Button>
                                                    <Button variant="outline" className="rounded-xl px-3 border-2">
                                                        <Mail className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>

                                            <p className="text-sm text-muted-foreground font-medium line-clamp-2 italic">
                                                "{athlete.summary || "High potential candidate with proven track record of discipline, teamwork, and resilience under pressure."}"
                                            </p>

                                            <div className="flex flex-wrap gap-2 pt-2">
                                                {['Leadership', 'Teamwork', 'Execution', 'Resilience'].map(skill => (
                                                    <Badge key={skill} variant="secondary" className="bg-muted text-[10px] font-black uppercase tracking-widest px-3 py-1 border-0">
                                                        {skill}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="hidden md:flex flex-col items-end justify-center px-4 border-l border-border/50">
                                            <div className="text-[10px] font-black uppercase text-muted-foreground mb-1">{t('browse.matchScore')}</div>
                                            <div className="text-3xl font-black text-restart">98%</div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}

                        <div className="p-12 text-center rounded-[2.5rem] bg-gradient-to-br from-card to-muted border-2 border-dashed border-border group cursor-pointer hover:border-restart transition-colors">
                            <Zap className="w-12 h-12 text-restart mx-auto mb-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                            <h4 className="text-xl font-black mb-2">{t('browse.upgradeTitle')}</h4>
                            <p className="text-muted-foreground font-medium text-sm mb-6 max-w-md mx-auto">
                                {t('browse.upgradeDesc')}
                            </p>
                            <Button className="rounded-xl font-black px-10 h-14 text-lg bg-restart hover:bg-blue-700 shadow-xl shadow-restart/20 transition-all active:scale-95">
                                {t('browse.upgradeBtn')}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrowseAthletes;
