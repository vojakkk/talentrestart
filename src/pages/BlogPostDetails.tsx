import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, Share2, Sparkles, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface BlogPost {
    id: string;
    title: string;
    content: string[];
    image: string;
    date: string;
    author: string;
    category: string;
    readTime: string;
}

const BlogPostDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { language } = useLanguage();
    const navigate = useNavigate();
    const [post, setPost] = useState<BlogPost | null>(null);

    // This would typically come from a database, but for now we'll use the static content
    useEffect(() => {
        const mockPosts: Record<string, any> = {
            'konkurence-neceka': {
                title: language === 'cs' ? 'Váš největší konkurent právě prohlíží stejné profily' : 'Your Biggest Competitor Is Browsing the Same Profiles',
                content: [
                    language === 'cs'
                        ? 'Dostali jste se k tomuto článku včas? Možná ano, ale statistiky mluví neúprosně. Elitní sportovci se na naší platformě "ohřejí" v průměru méně než 14 dní. Zatímco vy pečlivě zvažujete každý řádek v jejich profilu, vaši konkurenti už posílají pozvánky k pohovoru.'
                        : 'Did you get to this article in time? Maybe, but the statistics speak relentlessly. Elite athletes stay on our platform for less than 14 days on average. While you carefully consider every line in their profile, your competitors are already sending interview invitations.',
                    language === 'cs'
                        ? 'Psychologie náboru se změnila. Už to není o tom, kdo nabídne víc peněz, ale o tom, kdo zareaguje jako první. Sportovci jsou zvyklí na rychlost a akci. Pokud jim ji nenabídnete vy, vezmou ji od někoho, kdo neváhá.'
                        : 'The psychology of recruitment has changed. It\'s no longer about who offers more money, but about who reacts first. Athletes are used to speed and action. If you don\'t offer it to them, they will take it from someone who doesn\'t hesitate.',
                    language === 'cs'
                        ? 'Vaše aktivní předplatné není jen přístup k databázi. Je to vaše místo v první řadě. Přerušení členství znamená, že se vracíte na konec fronty – přesně tam, kde vás vaše konkurence chce mít.'
                        : 'Your active subscription is not just access to a database. It is your front-row seat. Interrupting your membership means you go back to the end of the line – exactly where your competition wants you to be.',
                ],
                image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1000',
                date: '14. 1. 2026',
                author: 'Strategický Tým',
                category: language === 'cs' ? 'Strategie' : 'Strategy',
                readTime: '4 min',
            },
            'proc-vzdat-hledani': {
                title: language === 'cs' ? 'Proč byste to měli vzdát a spokojit se s průměrem' : 'Why You Should Give Up and Settle for Mediocrity',
                content: [
                    language === 'cs'
                        ? 'Buďme k sobě upřímní: Ne každá firma je připravena na vítěznou mentalitu. Sportovci s sebou přinášejí disciplínu, kterou většina průměrných manažerů nedokáže ukočírovat. Pokud hledáte "zaměstnance roku", který jen kývne na každý úkol, možná byste měli z naší platformy odejít.'
                        : 'Let\'s be honest with ourselves: Not every company is ready for a winning mentality. Athletes bring with them a discipline that most average managers cannot handle. If you\'re looking for an "employee of the year" who just nods at every task, maybe you should leave our platform.',
                    language === 'cs'
                        ? 'Talent Restart je exkluzivní klub pro ty, kteří se nebojí výzev. Pokud cítíte, že je pro vás standardní trh práce dostačující, pak je to v pořádku. Průměrnost je bezpečná. Ale pokud chcete vybudovat tým, který nezná slovo "nejde", musíte u nás zůstat.'
                        : 'Talent Restart is an exclusive club for those who are not afraid of challenges. If you feel that the standard job market is sufficient for you, then that\'s okay. Mediocrity is safe. But if you want to build a team that doesn\'t know the word "impossible", you have to stay with us.',
                    language === 'cs'
                        ? 'Je to jednoduchá volba: Spokojit se s tím, co zbude na ostatních portálech, nebo si udržet přístup k elitě. Rozhodnutí je na vás, ale pamatujte – cesta zpět k těmto talentům bývá po odchodu velmi trnitá.'
                        : 'It\'s a simple choice: Settle for what\'s left on other portals, or maintain access to the elite. The decision is yours, but remember – the path back to these talents after leaving is usually very thorny.',
                ],
                image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1000',
                date: '13. 1. 2026',
                author: 'Psychologie Úspěchu',
                category: language === 'cs' ? 'Analýza' : 'Analysis',
                readTime: '7 min',
            },
            'maraton-v-byznysu': {
                title: language === 'cs' ? 'Z maratonu do byznysu: Jak disciplína mění kariéru' : 'From Marathon to Business: How Discipline Changes Careers',
                content: [
                    language === 'cs'
                        ? 'Lukáš strávil posledních deset let na tartanových oválech. Každý den, bez ohledu na počasí, odběhal desítky kilometrů. Disciplína pro něj nebyla volba, ale způsob přežití.'
                        : 'Lukas spent the last ten years on tartan tracks. Every day, regardless of the weather, he ran tens of kilometers. Discipline was not a choice for him, but a way of survival.',
                    language === 'cs'
                        ? 'Když zranění ukončilo jeho profesionální sny, stál před otázkou: Co teď? V životopise měl jen "profesionální atlet". Ale v hlavě měl schopnosti, které byznys zoufale hledá.'
                        : 'When an injury ended his professional dreams, he faced the question: What now? His CV only said "professional athlete". But in his head, he had the skills that business desperately looks for.',
                    language === 'cs'
                        ? 'Dnes Lukáš vede projekty v technologické firmě. Jak sám říká: "Vést projekt je jako běžet maraton. Musíte mít strategii, rozložit síly a i když vás všechno bolí, nesmíte se zastavit před cílem."'
                        : 'Today Lukas leads projects in a tech company. As he says: "Leading a project is like running a marathon. You must have a strategy, distribute your strength, and even when everything hurts, you must not stop before the finish line."'
                ],
                image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=1000',
                date: '12. 1. 2026',
                author: 'Martin Svoboda',
                category: language === 'cs' ? 'Příběhy' : 'Stories',
                readTime: '6 min',
            },
            'kapitanka-na-lodi': {
                title: language === 'cs' ? 'Kapitánka na hřišti i v kanceláři' : 'Captain on the Field and in the Office',
                content: [
                    language === 'cs'
                        ? 'Jana vedla jako kapitánka národní volejbalový tým pět let. Naučila se, jak motivovat lidi, když se nedaří, a jak udržet tým soustředěný na výhru.'
                        : 'Jana led the national volleyball team as captain for five years. She learned how to motivate people when things go wrong and how to keep a team focused on winning.',
                    language === 'cs'
                        ? 'Přechod do korporátního světa byl výzvou, ale Jana brzy zjistila, že "time-out" v byznysu funguje stejně jako ve sportu. Někdy se musíte zastavit, přehodnotit taktiku a vrátit se silnější.'
                        : 'The transition to the corporate world was a challenge, but Jana soon found that a "time-out" in business works just like in sports. Sometimes you have to stop, rethink tactics, and come back stronger.',
                ],
                image: 'https://images.unsplash.com/photo-1594470117722-14589d60bd33?auto=format&fit=crop&q=80&w=1000',
                date: '10. 1. 2026',
                author: 'Petra Černá',
                category: language === 'cs' ? 'Leadership' : 'Leadership',
                readTime: '5 min',
            },
            'hokejova-houzevnatost': {
                title: language === 'cs' ? 'Hokejová houževnatost v technologickém startupu' : 'Hockey Resilience in a Tech Startup',
                content: [
                    language === 'cs'
                        ? 'Hokej je o rychlosti a tvrdosti. Petr v něm vynikal. Když ale přišel do startupu, musel se naučit jiný druh rychlosti – rychlost adaptace.'
                        : 'Hockey is about speed and toughness. Petr excelled in it. But when he came to a startup, he had to learn a different kind of speed – speed of adaptation.',
                    language === 'cs'
                        ? 'Dnes je Petr seniorním vývojářem. Jeho kolegové obdivují jeho schopnost soustředit se na kód i deset hodin v kuse. Pro někoho, kdo trénoval v mrazu na ledě od pěti ráno, je software engineering jen další disciplína.'
                        : 'Today Petr is a senior developer. His colleagues admire his ability to focus on code for ten hours straight. For someone who trained in the cold on ice since five in the morning, software engineering is just another discipline.',
                ],
                image: 'https://images.unsplash.com/photo-1515703407324-5f753eed2349?auto=format&fit=crop&q=80&w=1000',
                date: '5. 1. 2026',
                author: 'Jan Malý',
                category: language === 'cs' ? 'Technologie' : 'Technology',
                readTime: '8 min',
            },
            'mentality-of-champion': {
                title: language === 'cs' ? 'Mentalita šampiona: Co se v byznysu nenaučíte' : 'Champion Mentality: What You Won\'t Learn in Business',
                content: [
                    language === 'cs'
                        ? 'Proč jsou bývalí sportovci tak žádaní? Odpověď leží v jejich nastavení mysli. Sportovci chápou, že prohra není konec, ale lekce.'
                        : 'Why are former athletes so in demand? The answer lies in their mindset. Athletes understand that losing is not the end, but a lesson.',
                ],
                image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1000',
                date: '2. 1. 2026',
                author: 'Talent Restart Team',
                category: language === 'cs' ? 'Analýza' : 'Analysis',
                readTime: '10 min',
            },
            'od-bazenu-k-boardu': {
                title: language === 'cs' ? 'Od bazénu k boardu: Jak vytrvalost tvoří lídry' : 'From Pool to Boardroom: How Persistence Builds Leaders',
                content: [
                    language === 'cs'
                        ? 'Alena proplavala tisíce kilometrů. Doslova. Jako vrcholová plavkyně trávila v bazénu pět hodin denně. Když odešla do sportovního důchodu, zjistila, že byznys je jen jiný druh hluboké vody.'
                        : 'Alena swam thousands of kilometers. Literally. As a top swimmer, she spent five hours a day in the pool. When she retired from sports, she found that business is just a different kind of deep water.',
                    language === 'cs'
                        ? 'Její schopnost soustředit se na cíl, i když už nemůže dýchat, se ukázala jako klíčová při vyjednávání velkých kontraktů. Dnes vede tým padesáti lidí v nadnárodní korporaci.'
                        : 'Her ability to focus on the goal, even when she can no longer breathe, proved key when negotiating large contracts. Today she leads a team of fifty people in a multinational corporation.',
                ],
                image: 'https://images.unsplash.com/photo-1530549387079-7ee0df123479?auto=format&fit=crop&q=80&w=1000',
                date: '28. 12. 2025',
                author: 'Martin Svoboda',
                category: language === 'cs' ? 'Leadership' : 'Leadership',
                readTime: '7 min',
            },
            'tenisova-strategie': {
                title: language === 'cs' ? 'Tenisova strategie v moderním marketingu' : 'Tennis Strategy in Modern Marketing',
                content: [
                    language === 'cs'
                        ? 'Tenis je hra šachů v pohybu. Tomáš, bývalý ATP hráč, přenesl své analytické schopnosti z kurtu do digitálního marketingu.'
                        : 'Tennis is a game of chess in motion. Tomas, a former ATP player, transferred his analytical skills from the court to digital marketing.',
                    language === 'cs'
                        ? 'V marketingu, stejně jako v tenise, musíte znát slabinu soupeře a vědět, kdy zariskovat. Jeho kampaně dnes vyhrávají ceny za efektivitu.'
                        : 'In marketing, just like in tennis, you must know the opponent\'s weakness and know when to take a risk. His campaigns today win awards for efficiency.',
                ],
                image: 'https://images.unsplash.com/photo-1595435066921-9549d494888a?auto=format&fit=crop&q=80&w=1000',
                date: '20. 12. 2025',
                author: 'Petra Černá',
                category: language === 'cs' ? 'Marketing' : 'Marketing',
                readTime: '5 min',
            },
            'kodovani-za-oponou': {
                title: language === 'cs' ? 'Kódování za oponou: Disciplína moderní gymnastky' : 'Coding Behind the Curtain: The Discipline of a Rhythmic Gymnast',
                content: [
                    language === 'cs'
                        ? 'Eliška věnovala gymnastice celé dětství. Každý pohyb musel být dokonalý. Když objevila kódování, našla v něm stejnou krásu v logice a struktuře.'
                        : 'Eliska dedicated her whole childhood to gymnastics. Every move had to be perfect. When she discovered coding, she found the same beauty in logic and structure.',
                    language === 'cs'
                        ? 'Dnes pracuje jako Frontend Developerka. Její smysl pro detail a schopnost pracovat do úmoru na jedné funkci z ní dělají hvězdu týmu.'
                        : 'Today she works as a Frontend Developer. Her attention to detail and ability to work tirelessly on a single feature make her a star of the team.',
                ],
                image: 'https://images.unsplash.com/photo-1547432020-f576e2cacc6d?auto=format&fit=crop&q=80&w=1000',
                date: '15. 12. 2025',
                author: 'Jan Malý',
                category: language === 'cs' ? 'Technologie' : 'Technology',
                readTime: '8 min',
            }
        };

        if (id && mockPosts[id]) {
            setPost({ id, ...mockPosts[id] });
        } else {
            navigate('/blog');
        }
    }, [id, language, navigate]);

    if (!post) return null;

    return (
        <div className="bg-background min-h-screen pb-32">
            {/* Post Header / Hero */}
            <section className="relative h-[60vh] min-h-[400px] flex items-end">
                <div className="absolute inset-0 z-0">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                </div>

                <div className="container relative z-10 pb-12 animate-fade-up">
                    <Link to="/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 group font-bold">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Zpět na příběhy
                    </Link>
                    <div className="space-y-6 max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-talent rounded-lg text-white text-[10px] font-black uppercase tracking-widest">
                            {post.category}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
                            {post.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-white/60 font-bold text-sm">
                            <span className="flex items-center gap-2 font-black"><Calendar className="w-4 h-4 text-talent" /> {post.date}</span>
                            <span className="flex items-center gap-2 font-black"><User className="w-4 h-4 text-restart" /> {post.author}</span>
                            <span className="flex items-center gap-2 font-black"><Clock className="w-4 h-4" /> {post.readTime} čtení</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Post Content */}
            <section className="container py-20">
                <div className="grid lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-8 space-y-10 animate-fade-in stagger-1">
                        {post.content.map((para, i) => (
                            <p key={i} className="text-xl leading-relaxed text-muted-foreground font-medium first-letter:text-5xl first-letter:font-black first-letter:text-talent first-letter:mr-3 first-letter:float-left">
                                {para}
                            </p>
                        ))}

                        <div className="p-8 md:p-12 bg-muted/40 rounded-[3rem] border border-border mt-16 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 text-talent/10 transition-colors group-hover:text-talent/20">
                                <Sparkles className="w-20 h-20" />
                            </div>
                            <h3 className="text-2xl font-black mb-4">Zaujal vás tento příběh?</h3>
                            <p className="text-muted-foreground font-medium mb-8 max-w-md">
                                Každý sportovec má v sobě skrytý potenciál pro svět byznysu. Pomůžeme vám ho objevit a využít.
                            </p>
                            <Button variant="talent" size="xl" className="rounded-2xl shadow-xl shadow-talent/20" asChild>
                                <Link to="/signup">Začněte svůj restart dnes</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Sidebar / Share */}
                    <div className="lg:col-span-4 space-y-12 animate-fade-in stagger-2 opacity-0">
                        <div className="bg-card border border-border rounded-[2.5rem] p-8 space-y-6">
                            <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Sdílet příběh</h4>
                            <div className="flex gap-4">
                                <button className="flex-1 h-12 rounded-xl bg-muted hover:bg-talent hover:text-white transition-all flex items-center justify-center font-bold">
                                    <Share2 className="w-5 h-5" />
                                </button>
                                <button className="flex-grow h-12 rounded-xl bg-muted hover:bg-restart hover:text-white transition-all flex items-center justify-center font-bold text-sm">
                                    LinkedIn
                                </button>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Další příběhy</h4>
                            <div className="space-y-4">
                                {/* Small post cards */}
                                <div className="p-4 bg-card border border-border rounded-2xl flex gap-4 items-center group cursor-pointer hover:border-talent transition-all">
                                    <div className="w-16 h-16 rounded-xl bg-muted overflow-hidden shrink-0">
                                        <img src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="space-y-1">
                                        <h5 className="font-black text-sm group-hover:text-talent transition-colors line-clamp-2">Mentalita šampiona: Co se v byznysu nenaučíte</h5>
                                        <div className="flex items-center gap-2 text-[10px] uppercase font-black tracking-widest text-muted-foreground">
                                            <span>2. 1. 2026</span>
                                            <ChevronRight className="w-3 h-3" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BlogPostDetails;
