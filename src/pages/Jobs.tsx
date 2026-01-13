import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Search,
    Filter,
    Briefcase,
    MapPin,
    Building2,
    Clock,
    ArrowRight,
    CheckCircle2,
    ShieldCheck,
    TrendingUp,
    X
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

const Jobs = () => {
    const { t, language } = useLanguage();
    const { user } = useAuth();
    const { toast } = useToast();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedJob, setSelectedJob] = useState<any>(null);
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const [savedJobs, setSavedJobs] = useState<number[]>([]);
    const [isApplying, setIsApplying] = useState(false);

    const jobs = [
        {
            id: 1,
            title: "Project Manager - Operations",
            company: "TechFlow Systems",
            location: "Prague, CZ (Hybrid)",
            salary: "85k - 110k CZK",
            type: "Full-time",
            tags: ["Leadership", "Operations", "Crisis Mgmt"],
            time: "2h ago",
            match: 98,
            isNew: true,
            description: language === 'cs'
                ? "Hledáme bývalého sportovce pro vedení operací v dynamickém technologickém týmu. Vaše schopnost vést pod tlakem je přesně to, co potřebujeme."
                : language === 'de'
                    ? "Wir suchen einen ehemaligen Sportler für die Leitung des operativen Geschäfts in einem dynamischen Technologieteam."
                    : "We're looking for a former athlete to lead operations in a dynamic tech team. Your ability to lead under pressure is exactly what we need."
        },
        {
            id: 2,
            title: "Business Development Executive",
            company: "Elite Partners Group",
            location: "Brno, CZ",
            salary: "60k - 90k CZK + Bonus",
            type: "Full-time",
            tags: ["Sales", "Negotiation", "Networking"],
            time: "5h ago",
            match: 94,
            isNew: true,
            description: "Využijte svou soutěživost a vytrvalost k budování obchodních vztahů na nejvyšší úrovni."
        },
        {
            id: 3,
            title: "Operations Coordinator",
            company: "Global Logistics Solution",
            location: "Remote / Prague",
            salary: "50k - 75k CZK",
            type: "Remote",
            tags: ["Logistics", "Teamwork", "Efficiency"],
            time: "1d ago",
            match: 88,
            isNew: false,
            description: "Hledáme týmového hráče pro koordinaci logistických procesů. Práce v mezinárodním prostředí."
        }
    ];

    const toggleFilter = (filter: string) => {
        setActiveFilters(prev =>
            prev.includes(filter)
                ? prev.filter(f => f !== filter)
                : [...prev, filter]
        );
    };

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.company.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesFilters = activeFilters.length === 0 ||
            activeFilters.every(f => {
                if (f === 'Remote only') return job.location.includes('Remote') || job.type === 'Remote';
                if (f === 'Full-time') return job.type === 'Full-time';
                if (f === 'Prague focus') return job.location.includes('Prague');
                return true;
            });

        return matchesSearch && matchesFilters;
    });

    const toggleSave = (id: number) => {
        setSavedJobs(prev => prev.includes(id) ? prev.filter(jid => jid !== id) : [...prev, id]);
    };

    const handleApply = async (job: any) => {
        if (!user) {
            toast({
                title: language === 'cs' ? 'Přihlášení vyžadováno' : 'Login required',
                description: language === 'cs' ? 'Pro odeslání přihlášky se prosím nejprve přihlaste.' : 'Please log in first to submit your application.',
                variant: 'destructive',
            });
            return;
        }

        setIsApplying(true);
        try {
            const { error } = await supabase
                .from('submissions')
                .insert([{
                    name: `${user.user_metadata?.first_name || ''} ${user.user_metadata?.last_name || ''}`.trim() || user.email,
                    email: user.email,
                    role: 'athlete',
                    intent: 'job_application',
                    subject: `Application: ${job.title} at ${job.company}`,
                    message: `Athlete ${user.email} applied for ${job.title}`,
                    metadata: {
                        job_id: job.id,
                        job_title: job.title,
                        company: job.company,
                        user_id: user.id
                    }
                }]);

            if (error) throw error;

            toast({
                title: language === 'cs' ? 'Přihláška odeslána' : 'Application sent',
                description: language === 'cs' ? 'Vaše profil byl úspěšně odeslán zaměstnavateli.' : 'Your profile has been successfully sent to the employer.',
            });
            setSelectedJob(null);
        } catch (error: any) {
            toast({
                title: 'Chyba',
                description: error.message,
                variant: 'destructive',
            });
        } finally {
            setIsApplying(false);
        }
    };

    return (
        <div className="min-h-screen bg-muted/20 pb-20 pt-12">
            <div className="container max-w-6xl">
                {/* Header Area */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-talent/10 text-talent text-xs font-black uppercase tracking-widest">
                            <TrendingUp className="w-3 h-3" />
                            Elite Career Opportunities
                        </div>
                        <h1 className="text-4xl font-black tracking-tight">{t('jobs.browse')} <span className="text-muted-foreground/30">/</span> {t('jobs.matches')}</h1>
                        <p className="text-muted-foreground font-medium">{t('jobs.multiplier')}</p>
                    </div>

                    <div className="flex gap-3">
                        <Button variant="outline" className="rounded-xl font-bold gap-2">
                            <Filter className="w-4 h-4" /> {t('jobs.filters')} {activeFilters.length > 0 && `(${activeFilters.length})`}
                        </Button>
                        <Button className="bg-talent hover:bg-talent-dark rounded-xl font-bold px-8 shadow-lg shadow-talent/20">
                            {t('jobs.savedJobs')} ({savedJobs.length})
                        </Button>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative mb-12 group">
                    <div className="absolute inset-0 bg-talent/20 blur-3xl opacity-20 group-hover:opacity-30 transition-opacity" />
                    <div className="relative flex p-2 bg-card border border-border rounded-2.5xl shadow-xl">
                        <div className="flex-1 flex items-center px-4 gap-3">
                            <Search className="w-5 h-5 text-muted-foreground" />
                            <Input
                                placeholder={t('jobs.placeholder')}
                                className="border-0 bg-transparent focus-visible:ring-0 text-lg font-medium p-0"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button className="h-14 px-10 rounded-2xl bg-talent hover:bg-talent-dark text-lg font-black transition-all shadow-lg active:scale-95">
                            Search Opportunities
                        </Button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left: Filter Sidebar (Mobile Hidden) */}
                    <div className="hidden lg:block space-y-8">
                        <div className="bg-card border border-border rounded-3xl p-6 space-y-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <h3 className="font-black text-sm uppercase tracking-widest text-muted-foreground">{t('jobs.quickFilters')}</h3>
                                {activeFilters.length > 0 && (
                                    <button
                                        onClick={() => setActiveFilters([])}
                                        className="text-[10px] font-black uppercase text-talent hover:underline"
                                    >
                                        {t('jobs.clear')}
                                    </button>
                                )}
                            </div>
                            <div className="space-y-4">
                                {(language === 'cs' ? ['Pouze remote', 'Plný úvazek', 'Seniorní role', 'Focus na Prahu'] : ['Remote only', 'Full-time', 'Senior roles', 'Prague focus']).map((filter) => (
                                    <label key={filter} className="flex items-center gap-3 cursor-pointer group">
                                        <div
                                            onClick={() => toggleFilter(filter)}
                                            className={cn(
                                                "w-5 h-5 rounded border transition-colors flex items-center justify-center",
                                                activeFilters.includes(filter) ? "bg-talent border-talent" : "border-border bg-muted/50 group-hover:border-talent"
                                            )}
                                        >
                                            {activeFilters.includes(filter) && <CheckCircle2 className="w-3 h-3 text-white" />}
                                        </div>
                                        <span
                                            onClick={() => toggleFilter(filter)}
                                            className={cn(
                                                "text-sm font-bold transition-colors",
                                                activeFilters.includes(filter) ? "text-foreground" : "opacity-80 group-hover:opacity-100"
                                            )}
                                        >
                                            {filter}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <ShieldCheck className="w-16 h-16 text-white" />
                            </div>
                            <div className="relative z-10 space-y-4">
                                <h4 className="font-bold text-lg leading-tight">{t('jobs.verifiedEmployers')}</h4>
                                <p className="text-xs opacity-60 font-medium leading-relaxed">{t('jobs.vettedDesc')}</p>
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-muted" />
                                    ))}
                                    <div className="w-10 h-10 rounded-full border-2 border-black bg-talent flex items-center justify-center text-[10px] font-black">+42</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Job List */}
                    <div className="lg:col-span-2 space-y-6">
                        {filteredJobs.length > 0 ? filteredJobs.map((job) => (
                            <div
                                key={job.id}
                                onClick={() => setSelectedJob(job)}
                                className="group bg-card border border-border rounded-3xl p-8 hover:shadow-2xl hover:shadow-talent/5 transition-all cursor-pointer relative overflow-hidden"
                            >
                                {job.isNew && (
                                    <div className="absolute top-0 right-0 bg-talent text-white text-[10px] font-black uppercase px-4 py-1.5 rounded-bl-xl tracking-[0.1em]">
                                        {t('jobs.newMatch')}
                                    </div>
                                )}

                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="w-20 h-20 bg-muted rounded-2.5xl flex items-center justify-center shrink-0 border border-border group-hover:scale-105 transition-transform duration-500">
                                        <Building2 className="w-8 h-8 text-muted-foreground" />
                                    </div>

                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="text-2xl font-black tracking-tight group-hover:text-talent transition-colors">{job.title}</h3>
                                                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 text-[10px] font-black uppercase">
                                                    <CheckCircle2 className="w-3 h-3" />
                                                    {job.match}% {t('jobs.matchLabel')}
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-bold text-muted-foreground">
                                                <div className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> {job.company}</div>
                                                <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {job.location}</div>
                                                <div className="flex items-center gap-1.5 text-foreground"><CheckCircle2 className="w-4 h-4 text-talent" /> {job.salary}</div>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {job.tags.map(tag => (
                                                <Badge key={tag} variant="secondary" className="bg-muted/50 hover:bg-muted text-[10px] font-black uppercase tracking-wider px-3 py-1 border-0">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex flex-col justify-between items-end shrink-0">
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                                            <Clock className="w-3.5 h-3.5" />
                                            {job.time}
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className={cn(
                                                    "rounded-xl transition-all",
                                                    savedJobs.includes(job.id) ? "bg-talent text-white border-talent" : "bg-muted"
                                                )}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleSave(job.id);
                                                }}
                                            >
                                                <ShieldCheck className="w-4 h-4" />
                                            </Button>
                                            <Button className="rounded-xl font-bold bg-muted hover:bg-talent hover:text-white transition-all">
                                                Detail <ArrowRight className="ml-2 w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-20 bg-card border border-dashed border-border rounded-3xl">
                                <p className="text-muted-foreground font-bold">No jobs found matching your search.</p>
                                <Button
                                    variant="link"
                                    className="text-talent mt-2 font-black uppercase text-xs"
                                    onClick={() => {
                                        setSearchQuery('');
                                        setActiveFilters([]);
                                    }}
                                >
                                    Reset all filters
                                </Button>
                            </div>
                        )}

                        <Button variant="ghost" className="w-full py-10 rounded-3xl border-2 border-dashed border-border hover:bg-muted/30 hover:border-talent/30 transition-all font-black text-muted-foreground text-lg uppercase tracking-widest">
                            Load more jobs
                        </Button>
                    </div>
                </div>
            </div>

            {/* Job Detail Modal */}
            <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
                <DialogContent className="sm:max-w-2xl rounded-[2.5rem] p-8">
                    {selectedJob && (
                        <div className="space-y-8">
                            <DialogHeader>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center shrink-0 border border-border">
                                        <Building2 className="w-8 h-8 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <DialogTitle className="text-3xl font-black">{selectedJob.title}</DialogTitle>
                                        <p className="font-bold text-talent">{selectedJob.company}</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-4 text-sm font-bold text-muted-foreground">
                                    <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {selectedJob.location}</div>
                                    <div className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> {selectedJob.type}</div>
                                    <div className="flex items-center gap-1.5 px-3 py-1 bg-green-500/10 text-green-600 rounded-full"><TrendingUp className="w-3 h-3" /> {selectedJob.match}% Match</div>
                                </div>
                            </DialogHeader>

                            <div className="space-y-4">
                                <h4 className="font-black text-sm uppercase tracking-widest">O pozici</h4>
                                <p className="text-muted-foreground leading-relaxed font-medium">
                                    {selectedJob.description}
                                </p>
                                <div className="p-6 bg-muted/50 rounded-2xl border border-border/50">
                                    <h5 className="font-bold mb-3 flex items-center gap-2">
                                        <ShieldCheck className="w-4 h-4 text-talent" />
                                        Proč vás chceme:
                                    </h5>
                                    <p className="text-sm text-muted-foreground">
                                        Jako bývalý vrcholový sportovec přinášíte disciplínu, odolnost vůči stresu a týmového ducha, které jsou pro tuto roli klíčové.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button
                                    className="flex-1 h-14 bg-talent hover:bg-talent-dark rounded-2xl text-lg font-black shadow-lg shadow-talent/20"
                                    onClick={() => handleApply(selectedJob)}
                                    disabled={isApplying}
                                >
                                    {isApplying ? 'Odesílám...' : 'Odeslat profil'}
                                </Button>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "h-14 rounded-2xl px-6 font-bold",
                                        savedJobs.includes(selectedJob.id) && "bg-talent/10 text-talent border-talent/20"
                                    )}
                                    onClick={() => toggleSave(selectedJob.id)}
                                >
                                    {savedJobs.includes(selectedJob.id) ? "Uloženo" : "Uložit"}
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Jobs;
