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
                        ? 'Zatímco vy čtete tento řádek, váš největší konkurent právě on-boarduje člověka, který by mohl změnit osud vaší firmy. Ne, to není marketingový trik. To je realita trhu s elitními talenty. Statistiky hovoří jasně: Průměrná doba, po kterou je špičkový sportovec "volný" na trhu práce, se počítá na hodiny, nikoliv dny. Proč? Protože lídři v byznysu už dávno pochopili, že technické dovednosti se dají naučit, ale charakter, disciplína a touha vítězit jsou vrozené.'
                        : 'While you read this line, your biggest competitor is onboarding a person who could change the fate of your company. No, this is not a marketing trick. This is the reality of the elite talent market. Statistics speak clearly: The average time a top athlete is "free" on the job market is counted in hours, not days. Why? Because business leaders have long understood that technical skills can be learned, but character, discipline, and the desire to win are innate.',
                    language === 'cs'
                        ? 'Představte si kandidába, který posledních 15 let vstával v 5 ráno, trénoval v bolesti, prohrával, zvedal se ze dna a nakonec stál na stupních vítězů. Myslíte, že ho rozhodí uzávěrka projektu nebo náročný klient? Sportovci mají "růstové nastavení mysli" (growth mindset) zakódované v DNA. Tam, kde běžný zaměstnanec vidí problém a žádá o pomoc, sportovec vidí výzvu a hledá řešení. Vy stále váháte, jestli se podívat do naší databáze? Vaše konkurence už má podepsanou smlouvu.'
                        : 'Imagine a candidate who has woken up at 5 am for the last 15 years, trained in pain, lost, rose from the bottom, and finally stood on the podium. Do you think a project deadline or a demanding client will upset them? Athletes have a "growth mindset" encoded in their DNA. Where a regular employee sees a problem and asks for help, an athlete sees a challenge and looks for a solution. Are you still hesitating whether to look into our database? Your competition usually already has a signed contract.',
                    language === 'cs'
                        ? 'Tato platforma není pro každého. Je pro vizionáře, kteří nehledají "kolečka do stroje", ale motory růstu. Pokud hledáte někoho, kdo si jen "odsedí" svých osm hodin, jděte na běžné inzertní portály. Talent Restart je pro ty, kteří chtějí vítězit. Pokud nemáte odvahu najmout lidi, kteří mohou být silnější a dravější než vy sami, pak sem nepatříte. Ale pokud chcete vybudovat tým šampionů, váš čas se krátí. Ti nejlepší tu za hodinu nebudou.'
                        : 'This platform is not for everyone. It is for visionaries who possess the courage to hire people who might be stronger and more driven than themselves. If you are looking for someone to just "sit out" their eight hours, go to regular job boards. Talent Restart is for those who want to win. If you don\'t have the guts to hire people who run faster than you, you don\'t belong here. But if you want to build a team of champions, your time is running out. The best ones won\'t be here in an hour.',
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
                        ? 'Je to pohodlné, že? Mít tým lidí, kteří dělají přesně to, co se jim řekne. Žádné otázky, žádné extra úsilí, žádné ambice, které by ohrožovaly vaše ego. Průměrnost je teplá deka, která vás chrání před rizikem. Pokud je vaším cílem "udržet status quo", pak vás prosíme: Zavřete tuto stránku. Sportovci, které zde nabízíme, by pro vás byli noční můrou. Oni se totiž nespokojí s průměrem. Budou chtít víc. Budou chtít růst, zlepšovat procesy, vítězit.'
                        : 'It\'s comfortable, isn\'t it? Having a team of people who do exactly what they are told. No questions, no extra effort, no ambitions that would threaten your ego. Mediocrity is a warm blanket that protects you from risk. If your goal is to "maintain the status quo", then we beg you: Close this page. The athletes we offer here would be a nightmare for you. They do not settle for average. They will want more. They will want to grow, improve processes, win.',
                    language === 'cs'
                        ? 'Všichni říkají, že chtějí "A-players", ale málokdo je unese. "A-player" sportovec přinese do vaší firmy energii, která může být pro zkostnatělé struktury destruktivní. Budou se ptát "proč to děláme takhle?" a "jak to můžeme udělat lépe?". Pokud na tyto otázky nejste připraveni, ušetřete si čas i peníze. Nábor sportovce vyžaduje silného lídra, který se nebojí nechat své lidi zazářit. Máte na to? Nebo se raději schováte zpět pod tu deku?'
                        : 'Everyone says they want "A-players", but few can handle them. An "A-player" athlete brings energy to your company that can be destructive to ossified structures. They will ask "why are we doing it this way?" and "how can we do it better?". If you are not ready for these questions, save your time and money. Hiring an athlete requires a strong leader who is not afraid to let their people shine. Do you have what it takes? Or would you rather hide back under that blanket?',
                    language === 'cs'
                        ? 'Talent Restart filtruje nejen kandidáty, ale i zaměstnavatele. Naše ceny a náš tón odrazují ty, kteří to nemyslí vážně. Zůstávají jen ti, kteří chápou, že investice do lidského kapitálu je jedinou cestou k dominanci na trhu. Pokud čtete tyto řádky a cítíte nepohodlí, je to dobře. Růst začíná tam, kde končí pohodlí. Otázka zní: Jste připraveni růst, nebo jste připraveni to vzdát?'
                        : 'Talent Restart filters not only candidates but also employers. Our prices and our tone deter those who are not serious. Only those remain who understand that investment in human capital is the only way to market dominance. If you read these lines and feel discomfort, that\'s good. Growth begins where comfort ends. The question is: Are you ready to grow, or are you ready to give up?',
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
                        ? 'Na 30. kilometru maratonu se děje něco zvláštního. Tělo křičí "dost", mozek vysílá signály paniky a každá buňka ve vašem těle vás prosí, abyste zastavili. Lukáš tento pocit znal důvěrně. Za svou desetiletou kariéru profesionálního běžce ho zažil stokrát. A stokrát ho překonal. "V ten moment poznáte, kdo skutečně jste," říká s klidem, který vás až mrazí.'
                        : 'At the 30th kilometer of a marathon, something strange happens. The body screams "enough", the brain sends panic signals, and every cell in your body begs you to stop. Lukas knew this feeling intimately. In his ten-year career as a professional runner, he experienced it a hundred times. And a hundred times he overcame it. "In that moment, you know who you truly are," he says with a calmness that chills you.',
                    language === 'cs'
                        ? 'Když Lukáš nastoupil do svého prvního zaměstnání v logistice jako junior manažer, jeho kolegové se hroutili pod tlakem vánoční sezóny. Balíky se hromadily, systémy padaly, zákazníci zuřili. V kanceláři vládla hysterie. Lukáš seděl u svého stolu a metodicky řešil jeden problém za druhým. "Proč nepanikaříš?" zeptal se ho šéf. Lukáš se jen usmál. Tohle nebyl 30. kilometr. Tohle byl teprve rozklus.'
                        : 'When Lukas started his first job in logistics as a junior manager, his colleagues were collapsing under the pressure of the Christmas season. Packages were piling up, systems were crashing, customers were furious. Hysteria reigned in the office. Lukas sat at his desk and methodically solved one problem after another. "Why aren\'t you panicking?" his boss asked. Lukas just smiled. This wasn\'t the 30th kilometer. This was just a warm-up.',
                    language === 'cs'
                        ? 'Dnes Lukáš vede oddělení s 50 lidmi. Jeho styl řízení není o křiku nebo mikromanagementu. Je o vytrvalosti, strategii a schopnosti rozložit síly. Zavedl ve firmě "maratonskou mentalitu" – soustředit se na dlouhodobý cíl, nenechat se rozhodit krátkodobými krizemi a hlavně: Nikdy, nikdy to nevzdat, dokud nejste v cíli. To je rozdíl, který dělá sportovce nepostradatelnými.'
                        : 'Today Lukas leads a department of 50 people. His management style is not about shouting or micromanagement. It is about endurance, strategy, and the ability to pace oneself. He introduced a "marathon mentality" in the company – focus on the long-term goal, don\'t get distracted by short-term crises, and most importantly: Never, never give up until you reach the finish line. That is the difference that makes athletes indispensable.',
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
                        ? 'Jana si pamatuje přesně ten moment. Finále mistrovství republiky, pátý set, stav 14:14. Celá hala ztichla. Jako kapitánka volejbalového týmu měla v rukou nejen míč, ale i psychiku svých spoluhráček. Podívala se jim do očí a neřekla "musíme vyhrát". Řekla: "Tohle je náš moment. Užijte si ho." Smeč, blok, výhra. Ten pocit absolutní zodpovědnosti si odnesla s sebou, když pověsila dres na hřebík.'
                        : 'Jana remembers exactly that moment. National championship finals, fifth set, score 14:14. The whole hall went silent. As the volleyball team captain, she held not only the ball but also the psyche of her teammates. She looked into their eyes and didn\'t say "we have to win". She said: "This is our moment. Enjoy it." Smash, block, win. She took that feeling of absolute responsibility with her when she hung up her jersey.',
                    language === 'cs'
                        ? 'V korporátu ji přivítali s nedůvěrou. "Co ví volejbalistka o prodeji softwaru?" špitali si. Jana nevěděla nic o kódu, ale věděla všechno o lidech. Viděla, že obchodní tým hraje jako banda individualistů, ne jako tým. Každý kopal sám za sebe. A tak začala dělat to, co uměla nejlépe: Budovat tým. Zavedla ranní "huddles", sdílené cíle a kulturu, kde se chyba netrestá, ale analyzuje.'
                        : 'In the corporate world, they welcomed her with mistrust. "What does a volleyball player know about software sales?" they whispered. Jana knew nothing about code, but she knew everything about people. She saw that the sales team was playing like a bunch of individualists, not like a team. Everyone was playing for themselves. So she started doing what she did best: Building a team. She introduced morning "huddles", shared goals, and a culture where a mistake is not punished but analyzed.',
                    language === 'cs'
                        ? 'Po roce se její tým stal nejvýkonnějším v regionu. Ne proto, že by byli nejchytřejší. Ale proto, že se naučili důvěřovat jeden druhému. Jana neřídí lidi tabulkami v Excelu. Řídí je emocemi, příkladem a neochvějnou vírou v jejich potenciál. V byznysu se tomu říká "Soft Skills" nebo "Emotional Intelligence". Pro Janu je to prostě kapitánství. A to se v žádném MBA kurzu nenaučíte.'
                        : 'After a year, her team became the most powerful in the region. Not because they were the smartest. But because they learned to trust each other. Jana does not manage people with Excel spreadsheets. She manages them with emotions, example, and unwavering faith in their potential. In business, this is called "Soft Skills" or "Emotional Intelligence". For Jana, it\'s simply captaincy. And you won\'t learn that in any MBA course.',
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
                        ? 'Petr strávil 15 let tím, že do něj naráželi stokiloví chlapi v plné rychlosti. Naučil se dvě věci: Vždy měj hlavu nahoře a když spadneš, okamžitě vstaň. Bolest je informace, ne důvod k zastavení. Když se po zranění kolene musel vzdát snu o NHL, aplikoval stejný přístup na učení programování. Kódoval 12 hodin denně, spal 4, jedl u klávesnice.'
                        : 'Petr spent 15 years being hit by hundred-kilo guys at full speed. He learned two things: Always keep your head up and when you fall, get up immediately. Pain is information, not a reason to stop. When he had to give up his NHL dream after a knee injury, he applied the same approach to learning programming. He coded 12 hours a day, slept 4, ate at the keyboard.',
                    language === 'cs'
                        ? 'Většina juniorů to vzdá, když narazí na první složitý bug. Petr ne. Pro něj byl bug jako soupeřův obránce – překážka, kterou je třeba obejít, prorazit nebo přechytračit. Jeho startup "IceBreaker" nyní mění způsob, jakým firmy analyzují data. Investoři milují jeho příběh, ale ještě víc milují jeho výsledky.'
                        : 'Most juniors give up when they hit the first complex bug. Petr didn\'t. For him, a bug was like an opponent\'s defender – an obstacle to be bypassed, broken through, or outsmarted. His startup "IceBreaker" is now changing the way companies analyze data. Investors love his story, but they love his results even more.',
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
                        ? 'Všichni mluví o talentu. Ale talent je přeceňovaný. Svět je plný talentovaných trosek, které to nikdy nikam nedotáhly. Co odlišuje šampiony od zbytku světa, není jejich talent, ale jejich posedlost. Posedlost zlepšováním. Posedlost detailem. Posedlost vyhrávat, i když karty hrají proti vám.'
                        : 'Everyone talks about talent. But talent is overrated. The world is full of talented wrecks who never made it anywhere. What separates champions from the rest of the world is not their talent, but their obsession. Obsession with improvement. Obsession with detail. Obsession with winning, even when the cards are stacked against you.',
                    language === 'cs'
                        ? 'Šampion nenávidí prohru více, než miluje výhru. To je ten klíčový rozdíl. V byznysu se často spokojíme s "dobrým výsledkem". Šampion se nespokojí s ničím jiným než s absolutním vrcholem. A právě proto byste měli chtít mít šampiony ve svém týmu. Ne proto, aby vám říkali, jak jste dobří. Ale aby vás donutili podívat se do zrcadla a zeptat se: "Dáváme do toho skutečně všechno?"'
                        : 'A champion hates losing more than they love winning. That is the key difference. In business, we often settle for a "good result". A champion settles for nothing less than the absolute peak. And that\'s why you should want champions on your team. Not to tell you how good you are. But to force you to look in the mirror and ask: "Are we really giving it our all?"',
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
                        ? 'Voda je neúprosný živel. Neodpouští chyby, neodpouští slabost. Alena strávila 20 let bojem s vodou. Tisíce hodin v tichu pod hladinou, jen se svými myšlenkami a tepem srdce. Naučila se být sama se sebou, i když to bolelo. Naučila se, že jedinou cestou vpřed je další záběr. A pak další. A další.'
                        : 'Water is a relentless element. It does not forgive mistakes, it does not forgive weakness. Alena spent 20 years fighting the water. Thousands of hours in silence under the surface, just with her thoughts and heartbeat. She learned to be alone with herself, even when it hurt. She learned that the only way forward is another stroke. And then another. And another.',
                    language === 'cs'
                        ? 'Když se stala členkou představenstva velké korporace, mnoho lidí bylo překvapeno jejím klidem. Kolem zuřily bouře trhu, akcie padaly, konkurence útočila. Alena zůstávala klidná. "Voda je stejná," říkávala. "Když zpanikaříš, utopíš se. Když dýcháš a plaveš, přežiješ." Tento stoický klid se stal kotvou pro celou firmu. Alena dokázala provést společnost krizí ne proto, že znala všechna ekonomická data, ale proto, že se naučila v bazénu jednu klíčovou věc: Dokud dýcháš, máš šanci vyhrát.'
                        : 'When she became a board member of a large corporation, many people were surprised by her calmness. Market storms raged around, stocks fell, competitors attacked. Alena remained calm. "The water is the same," she used to say. "If you panic, you drown. If you breathe and swim, you survive." This stoic calm became an anchor for the whole company. Alena managed to lead the company through the crisis not because she knew all the economic data, but because she learned one key thing in the pool: As long as you breathe, you have a chance to win.',
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
                        ? 'Tenis není o tom, kdo dá větší ránu. Je o tom, kdo udělá méně chyb. Tomáš to věděl. Jeho hra nebyla oslnivá, byla efektivní. Vždy počkal, až soupeř ztratí trpělivost a udělá chybu. Pak udeřil. Tuto filozofii "vynucené chyby" přinesl do světa digitálního marketingu.'
                        : 'Tennis is not about who hits harder. It is about who makes fewer mistakes. Tomas knew that. His game wasn\'t dazzling, it was effective. He always waited for the opponent to lose patience and make a mistake. Then he struck. He brought this philosophy of "forced errors" into the world of digital marketing.',
                    language === 'cs'
                        ? 'Zatímco konkurence pálila miliony za agresivní kampaně, Tomáš analyzoval data. Hledal slabiny. Čekal. A když viděl, že konkurence vyčerpala rozpočet na neefektivní kanály, spustil chirurgicky přesnou kampaň, která ovládla trh. Jeho klienti mu říkají "The Sniper". On se jen směje a říká: "To není magie, to je jen game, set, match."'
                        : 'While competitors burned millions on aggressive campaigns, Tomas analyzed the data. He looked for weaknesses. He waited. And when he saw their budgets drained on ineffective channels, he launched a surgically precise campaign that dominated the market. His clients call him "The Sniper". He just laughs and says: "It\'s not magic, it\'s just game, set, match."',
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
                        ? 'Moderní gymnastika je sportem milimetrů. Stačí malá odchylka a stuha se zamotá, obruč spadne, sen se rozplyne. Eliška strávila dětství hledáním dokonalosti v pohybu. Každý detail musel být perfektní. Když poprvé uviděla kód v C++, neviděla jen text. Viděla choreografii.'
                        : 'Rhythmic gymnastics is a sport of millimeters. A small deviation is enough and the ribbon tangles, the hoop falls, the dream dissolves. Eliska spent her childhood searching for perfection in movement. Every detail had to be perfect. When she first saw code in C++, she didn\'t just see text. She saw choreography.',
                    language === 'cs'
                        ? 'Její přístup k frontend vývoji je fascinující. Pro ni není webová stránka jen shluk divů. Je to představení. Animace musí být plynulé jako stuha ve vzduchu. Layout musí být vyvážený jako postoj na kladině. Eliška tráví hodiny laděním detailů, které většina lidí ani nepostřehne. Ale právě tyto detaily odlišují dobrý produkt od mistrovského díla. "V gymnastice i v kódu," říká, "se krása skrývá v tom, co vypadá lehce, ale je nejtěžší na provedení."'
                        : 'Her approach to frontend development is fascinating. For her, a website is not just a cluster of divs. It is a performance. Animations must be fluid like a ribbon in the air. The layout must be balanced like a stance on a balance beam. Eliska spends hours tuning details that most people don\'t even notice. But these are the details that distinguish a good product from a masterpiece. "In gymnastics and in code," she says, "beauty lies in what looks easy but is hardest to execute."',
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
