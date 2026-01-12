import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User, Tag, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

import { useAuth } from '@/contexts/AuthContext';

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    author: string;
    category: string;
    readTime: string;
    role?: 'athlete' | 'employer';
}

const Blog: React.FC = () => {
    const { t, language } = useLanguage();
    const { user } = useAuth();

    const role = user?.user_metadata?.role || user?.user_metadata?.user_role || user?.user_metadata?.account_type || 'athlete';
    const isAthlete = role === 'athlete';

    const allPosts: BlogPost[] = [
        {
            id: 'konkurence-neceka',
            title: language === 'cs' ? 'Váš největší konkurent právě prohlíží stejné profily' : 'Your Biggest Competitor Is Browsing the Same Profiles',
            excerpt: language === 'cs'
                ? 'Zatímco vy váháte, ostatní lídři už vědí, že disciplína sportovce je jejich největší konkurenční výhodou. Nečekejte.'
                : 'While you hesitate, other leaders already know that an athlete’s discipline is their biggest competitive advantage.',
            date: '14. 1. 2026',
            author: 'Strategický Tým',
            category: language === 'cs' ? 'Strategie' : 'Strategy',
            readTime: '4 min',
            role: 'employer',
        },
        {
            id: 'proc-vzdat-hledani',
            title: language === 'cs' ? 'Proč byste to měli vzdát a spokojit se s průměrem' : 'Why You Should Give Up and Settle for Mediocrity',
            excerpt: language === 'cs'
                ? 'Najít špičkového talenta vyžaduje vizi. Pokud hledáte jen rychlou náplast, možná zde nejste správně.'
                : 'Finding top talent requires vision. If you’re just looking for a quick fix, you might not be in the right place.',
            date: '13. 1. 2026',
            author: 'Psychologie Úspěchu',
            category: language === 'cs' ? 'Analýza' : 'Analysis',
            readTime: '7 min',
            role: 'employer',
        },
        {
            id: 'maraton-v-byznysu',
            title: language === 'cs' ? 'Z maratonu do byznysu: Jak disciplína mění kariéru' : 'From Marathon to Business: How Discipline Changes Careers',
            excerpt: language === 'cs'
                ? 'Příběh Lukáše, který po deseti letech v profesionální atletice našel své místo v projektovém managementu.'
                : 'The story of Lukas, who found his place in project management after ten years in professional athletics.',
            date: '12. 1. 2026',
            author: 'Martin Svoboda',
            category: language === 'cs' ? 'Příběhy' : 'Stories',
            readTime: '6 min',
        },
        {
            id: 'kapitanka-na-lodi',
            title: language === 'cs' ? 'Kapitánka na hřišti i v kanceláři' : 'Captain on the Field and in the Office',
            excerpt: language === 'cs'
                ? 'Jak vedoucí schopnosti z volejbalu pomohly Janě vybudovat úspěšný obchodní tým od nuly.'
                : 'How leadership skills from volleyball helped Jana build a successful sales team from scratch.',
            date: '10. 1. 2026',
            author: 'Petra Černá',
            category: language === 'cs' ? 'Leadership' : 'Leadership',
            readTime: '5 min',
        },
        {
            id: 'hokejova-houzevnatost',
            title: language === 'cs' ? 'Hokejová houževnatost v technologickém startupu' : 'Hockey Resilience in a Tech Startup',
            excerpt: language === 'cs'
                ? 'Petr vyměnil hokejku za klávesnici. Dnes vede vývoj v nadnárodní společnosti.'
                : 'Petr swapped the hockey stick for a keyboard. Today he leads development in a multinational company.',
            date: '5. 1. 2026',
            author: 'Jan Malý',
            category: language === 'cs' ? 'Technologie' : 'Technology',
            readTime: '8 min',
        },
        {
            id: 'mentality-of-champion',
            title: language === 'cs' ? 'Mentalita šampiona: Co se v byznysu nenaučíte' : 'Champion Mentality: What You Won\'t Learn in Business',
            excerpt: language === 'cs'
                ? 'Analýza toho, proč jsou bývalí sportovci nejvyhledávanějšími zaměstnanci současnosti.'
                : 'An analysis of why former athletes are the most sought-after employees today.',
            date: '2. 1. 2026',
            author: 'Talent Restart Team',
            category: language === 'cs' ? 'Analýza' : 'Analysis',
            readTime: '10 min',
        },
        {
            id: 'od-bazenu-k-boardu',
            title: language === 'cs' ? 'Od bazénu k boardu: Jak vytrvalost tvoří lídry' : 'From Pool to Boardroom: How Persistence Builds Leaders',
            excerpt: language === 'cs'
                ? 'Příběh plavkyně Aleny, která vyměnila ranní tréninky za vedení mezinárodních týmů.'
                : 'The story of swimmer Alena, who swapped early morning practices for leading international teams.',
            date: '28. 12. 2025',
            author: 'Martin Svoboda',
            category: language === 'cs' ? 'Leadership' : 'Leadership',
            readTime: '7 min',
        },
        {
            id: 'tenisova-strategie',
            title: language === 'cs' ? 'Tenisová strategie v moderním marketingu' : 'Tennis Strategy in Modern Marketing',
            excerpt: language === 'cs'
                ? 'Jak čtení soupeře na kurtu pomáhá Tomášovi předvídat tržní trendy.'
                : 'How reading an opponent on the court helps Tomas predict market trends.',
            date: '20. 12. 2025',
            author: 'Petra Černá',
            category: language === 'cs' ? 'Marketing' : 'Marketing',
            readTime: '5 min',
        },
        {
            id: 'kodovani-za-oponou',
            title: language === 'cs' ? 'Kódování za oponou: Disciplína moderní gymnastky' : 'Coding Behind the Curtain: The Discipline of a Rhythmic Gymnast',
            excerpt: language === 'cs'
                ? 'Eliška našla v programování stejnou preciznost a eleganci jako ve svých sestavách.'
                : 'Eliska found the same precision and elegance in programming as in her routines.',
            date: '15. 12. 2025',
            author: 'Jan Malý',
            category: language === 'cs' ? 'Technologie' : 'Technology',
            readTime: '8 min',
        }
    ];

    // Filter posts: employers see employer posts first, athletes don't see employer posts
    const posts = allPosts.filter(post => {
        if (isAthlete && post.role === 'employer') return false;
        return true;
    }).sort((a, b) => {
        if (!isAthlete) {
            if (a.role === 'employer' && b.role !== 'employer') return -1;
            if (a.role !== 'employer' && b.role === 'employer') return 1;
        }
        return 0;
    });

    return (
        <div className="bg-background min-h-screen pb-32">
            {/* Hero Header */}
            <section className="relative py-20 md:py-32 overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-talent/5 rounded-full blur-[120px] -z-10 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-restart/5 rounded-full blur-[100px] -z-10 animate-pulse" style={{ animationDelay: '2s' }} />

                <div className="container relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-talent/10 text-talent text-xs font-semibold mb-6 animate-fade-up">
                            <Sparkles className="w-4 h-4" />
                            Magazín & Příběhy
                        </div>
                        <h1 className="text-display-md md:text-display-lg font-bold leading-tight mb-8 animate-fade-up stagger-1">
                            Kde se sport <br />
                            <span className="text-gradient-brand">potkává s kariérou</span>
                        </h1>
                        <p className="text-xl text-muted-foreground font-medium leading-relaxed animate-fade-up stagger-2">
                            Inspirativní příběhy sportovců, kteří úspěšně zvládli svůj kariérní restart,
                            a praktické tipy pro váš profesní růst.
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Post */}
            <section className="container mb-24">
                <div className="group relative bg-card border border-border/50 rounded-[3rem] overflow-hidden shadow-2xl hover:shadow-talent/5 transition-all duration-500 animate-fade-up">
                    <div className="p-8 lg:p-16 flex flex-col justify-center gap-6">
                        <div className="">
                            <span className="px-3 py-1 bg-talent/10 text-talent text-xs font-bold rounded-lg">
                                {posts[0].category}
                            </span>
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-bold leading-tight group-hover:text-talent transition-colors">
                            {posts[0].title}
                        </h2>
                        <p className="text-lg text-muted-foreground font-medium leading-relaxed">
                            {posts[0].excerpt}
                        </p>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground font-semibold border-t border-border pt-6">
                            <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-talent" /> {posts[0].date}</span>
                            <span className="flex items-center gap-2"><User className="w-4 h-4 text-restart" /> {posts[0].author}</span>
                        </div>
                        <Button variant="talent" size="xl" className="w-fit rounded-2xl shadow-xl shadow-talent/20 group/btn mt-4" asChild>
                            <Link to={`/blog/${posts[0].id}`}>
                                Číst příběh
                                <ChevronRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Post Grid */}
            <section className="container">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.slice(1).map((post, i) => (
                        <Link
                            key={post.id}
                            to={`/blog/${post.id}`}
                            className="group bg-card border border-border rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-fade-up flex flex-col"
                            style={{ animationDelay: `${i * 0.1}s` }}
                        >
                            <div className="p-8 space-y-4 flex-grow">
                                <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground">
                                    <span>{post.date}</span>
                                    <span className="w-1 h-1 bg-border rounded-full" />
                                    <span>{post.readTime} čtení</span>
                                </div>
                                <h3 className="text-xl font-bold leading-tight group-hover:text-talent transition-colors line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-muted-foreground font-medium line-clamp-3 text-sm leading-relaxed">
                                    {post.excerpt}
                                </p>
                            </div>
                            <div className="px-8 pb-8 pt-0">
                                <div className="inline-flex items-center text-sm font-bold text-talent group/link">
                                    Celý příběh
                                    <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Newsletter / CTA */}
                <div className="mt-24 p-12 lg:p-20 bg-gradient-to-br from-talent to-talent-dark rounded-[3.5rem] text-white text-center relative overflow-hidden shadow-2xl shadow-talent/20">
                    <div className="absolute top-0 left-0 w-full h-full -z-0">
                        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[100%] bg-white/10 rounded-full blur-[100px]" />
                        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[100%] bg-black/10 rounded-full blur-[100px]" />
                    </div>
                    <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                        <h2 className="text-3xl lg:text-5xl font-bold leading-tight">Chcete více takových příběhů?</h2>
                        <p className="text-lg lg:text-xl font-medium opacity-90">
                            Přihlaste se k našemu newsletteru a nechte se inspirovat každý měsíc.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Váš email"
                                className="flex-grow h-14 rounded-2xl bg-white/10 border border-white/20 px-6 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                            />
                            <Button variant="secondary" size="xl" className="h-14 rounded-2xl font-black px-8">
                                Odebírat
                            </Button>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    );
};

export default Blog;
