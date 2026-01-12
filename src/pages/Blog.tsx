import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User, Tag, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    image: string;
    date: string;
    author: string;
    category: string;
    readTime: string;
}

const Blog: React.FC = () => {
    const { t, language } = useLanguage();

    const posts: BlogPost[] = [
        {
            id: 'maraton-v-byznysu',
            title: language === 'cs' ? 'Z maratonu do byznysu: Jak disciplína mění kariéru' : 'From Marathon to Business: How Discipline Changes Careers',
            excerpt: language === 'cs'
                ? 'Příběh Lukáše, který po deseti letech v profesionální atletice našel své místo v projektovém managementu.'
                : 'The story of Lukas, who found his place in project management after ten years in professional athletics.',
            image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=1000',
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
            image: 'https://images.unsplash.com/photo-1594470117722-14589d60bd33?auto=format&fit=crop&q=80&w=1000',
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
            image: 'https://images.unsplash.com/photo-1515703407324-5f753eed2349?auto=format&fit=crop&q=80&w=1000',
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
            image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1000',
            date: '2. 1. 2026',
            author: 'Talent Restart Team',
            category: language === 'cs' ? 'Analýza' : 'Analysis',
            readTime: '10 min',
        }
    ];

    return (
        <div className="bg-background min-h-screen pb-32">
            {/* Hero Header */}
            <section className="relative py-20 md:py-32 overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-talent/5 rounded-full blur-[120px] -z-10 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-restart/5 rounded-full blur-[100px] -z-10 animate-pulse" style={{ animationDelay: '2s' }} />

                <div className="container relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-talent/10 text-talent text-sm font-bold uppercase tracking-widest mb-6 animate-fade-up">
                            <Sparkles className="w-4 h-4" />
                            Magazín & Příběhy
                        </div>
                        <h1 className="text-display-md md:text-display-lg font-black leading-tight mb-8 animate-fade-up stagger-1">
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
                    <div className="grid lg:grid-cols-2">
                        <div className="relative h-64 lg:h-auto overflow-hidden">
                            <img
                                src={posts[0].image}
                                alt={posts[0].title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:hidden" />
                            <div className="absolute bottom-6 left-6 lg:hidden">
                                <span className="px-3 py-1 bg-talent text-white text-[10px] font-black uppercase tracking-widest rounded-lg">
                                    {posts[0].category}
                                </span>
                            </div>
                        </div>
                        <div className="p-8 lg:p-16 flex flex-col justify-center gap-6">
                            <div className="hidden lg:block">
                                <span className="px-4 py-1.5 bg-talent/10 text-talent text-xs font-black uppercase tracking-widest rounded-xl">
                                    {posts[0].category}
                                </span>
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-black leading-tight group-hover:text-talent transition-colors">
                                {posts[0].title}
                            </h2>
                            <p className="text-lg text-muted-foreground font-medium leading-relaxed">
                                {posts[0].excerpt}
                            </p>
                            <div className="flex items-center gap-6 text-sm text-muted-foreground font-bold border-t border-border pt-6">
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
                </div>
            </section>

            {/* Post Grid */}
            <section className="container">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.slice(1).map((post, i) => (
                        <div
                            key={post.id}
                            className="group bg-card border border-border rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-fade-up"
                            style={{ animationDelay: `${i * 0.1}s` }}
                        >
                            <div className="relative h-60 overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-foreground text-[10px] font-black uppercase tracking-widest rounded-lg shadow-sm">
                                        {post.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-8 space-y-4">
                                <div className="flex items-center gap-4 text-[10px] uppercase font-black tracking-widest text-muted-foreground">
                                    <span>{post.date}</span>
                                    <span className="w-1 h-1 bg-border rounded-full" />
                                    <span>{post.readTime} čtení</span>
                                </div>
                                <h3 className="text-xl font-black leading-tight group-hover:text-talent transition-colors line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-muted-foreground font-medium line-clamp-3 text-sm leading-relaxed">
                                    {post.excerpt}
                                </p>
                                <div className="pt-4">
                                    <Link to={`/blog/${post.id}`} className="inline-flex items-center text-sm font-black text-talent group/link">
                                        Celý příběh
                                        <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Newsletter / CTA */}
                <div className="mt-24 p-12 lg:p-20 bg-gradient-to-br from-talent to-talent-dark rounded-[3.5rem] text-white text-center relative overflow-hidden shadow-2xl shadow-talent/20">
                    <div className="absolute top-0 left-0 w-full h-full -z-0">
                        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[100%] bg-white/10 rounded-full blur-[100px]" />
                        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[100%] bg-black/10 rounded-full blur-[100px]" />
                    </div>
                    <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                        <h2 className="text-3xl lg:text-5xl font-black leading-tight">Chcete více takových příběhů?</h2>
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
            </section>
        </div>
    );
};

export default Blog;
