import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, Brain, Target, FileText, Briefcase, Rocket } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from '@/contexts/LanguageContext';

interface AICareerAssistantModalProps {
    isOpen: boolean;
    onClose: () => void;
    userName: string;
}

const AICareerAssistantModal: React.FC<AICareerAssistantModalProps> = ({ isOpen, onClose, userName }) => {
    const navigate = useNavigate();
    const { language } = useLanguage();
    const [step, setStep] = useState(1);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleApplyToCV = () => {
        const msg = language === 'cs'
            ? "Dovednosti byly úspěšně aplikovány na váš profil!"
            : language === 'de'
                ? "Fähigkeiten wurden erfolgreich in Ihr Profil übernommen!"
                : "Skills successfully applied to your profile!";
        toast.success(msg);
        onClose();
        navigate('/jobs');
    };

    const handleStartAnalysis = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            setIsAnalyzing(false);
            setStep(2);
        }, 3000);
    };

    const t = (cs: string, en: string, de: string) => {
        if (language === 'cs') return cs;
        if (language === 'de') return de;
        return en;
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] bg-background/95 backdrop-blur-xl border-talent/20 shadow-2xl rounded-[2rem] overflow-hidden p-0">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-talent via-talent-dark to-talent animate-gradient-x" />

                <div className="p-8">
                    <DialogHeader className="mb-6">
                        <DialogTitle className="flex items-center gap-3 text-2xl font-black">
                            <div className="w-10 h-10 rounded-xl bg-talent/10 flex items-center justify-center text-talent">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            {t('AI Kariérní Asistent', 'AI Career Assistant', 'KI-Karriereassistent')}
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground font-medium">
                            {step === 1
                                ? t("Pojďme přeložit vaše sportovní úspěchy do byznysové excelence.", "Let's translate your sports achievements into business excellence.", "Lassen Sie uns Ihre sportlichen Erfolge in geschäftliche Exzellenz übersetzen.")
                                : t("Analýza hotova! Zde je návod, jak se vaše dovednosti promítnou do korporátního světa.", "Analysis complete! Here's how your skills translate to the corporate world.", "Analyse abgeschlossen! So lassen sich Ihre Fähigkeiten in die Unternehmenswelt übertragen.")}
                        </DialogDescription>
                    </DialogHeader>

                    {step === 1 ? (
                        <div className="space-y-6">
                            <div className="bg-muted/30 rounded-2xl p-6 border border-border">
                                <p className="text-sm font-medium leading-relaxed">
                                    {t("Vítejte,", "Welcome,", "Willkommen,")} <span className="text-talent font-bold">{userName}</span>. {t("Jako sportovec disponujete dovednostmi, které jsou v byznysu extrémně vzácné:", "As an athlete, you possess skills that are extremely rare in business:", "Als Sportler verfügen Sie über Fähigkeiten, die in der Wirtschaft extrem selten sind:")} <span className="italic">{t("disciplína, odolnost vůči stresu a týmová mentalita.", "discipline, resilience, and team spirit.", "Disziplin, Belastbarkeit und Teamgeist.")}</span>
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl border border-border bg-card flex flex-col items-center text-center gap-2">
                                    <Brain className="w-6 h-6 text-talent" />
                                    <span className="text-xs font-black uppercase tracking-widest">{t("Mapování dovedností", "Skill Mapping", "Skill-Mapping")}</span>
                                </div>
                                <div className="p-4 rounded-xl border border-border bg-card flex flex-col items-center text-center gap-2">
                                    <Target className="w-6 h-6 text-talent" />
                                    <span className="text-xs font-black uppercase tracking-widest">{t("Hledání práce", "Job Matching", "Job-Suche")}</span>
                                </div>
                            </div>

                            <Button
                                onClick={handleStartAnalysis}
                                disabled={isAnalyzing}
                                className="w-full py-8 rounded-2xl text-lg font-black bg-talent hover:bg-talent-dark shadow-xl shadow-talent/20 transition-all active:scale-[0.98]"
                            >
                                {isAnalyzing ? (
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        {t("Analyzuji sportovní kariéru...", "Analyzing Sports Career...", "Sportkarriere analysieren...")}
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <Rocket className="w-5 h-5" />
                                        {t("Spustit překlad dovedností", "Start Skill Translation", "Skill-Übersetzung starten")}
                                    </div>
                                )}
                            </Button>
                        </div>
                    ) : (
                        <ScrollArea className="h-[400px] pr-4">
                            <div className="space-y-6 pb-4">
                                <div className="space-y-4">
                                    <h4 className="text-xs font-black uppercase tracking-widest text-talent flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-talent" />
                                        {t("Klíčové přenositelné dovednosti", "Core Transferable Skills", "Übertragbare Kernkompetenzen")}
                                    </h4>
                                    <div className="space-y-3">
                                        {[
                                            {
                                                title: t("Vedení ve vysokém tempu", "High-Performance Leadership", "High-Performance Leadership"),
                                                desc: t("Prokázaná schopnost vést týmy pod tlakem a dosahovat kolektivních výsledků.", "Proven ability to lead teams under pressure and deliver collective results.", "Nachgewiesene Fähigkeit, Teams unter Druck zu führen und kollektive Ergebnisse zu erzielen.")
                                            },
                                            {
                                                title: t("Strategická odolnost", "Strategic Resilience", "Strategische Resilienz"),
                                                desc: t("Výjimečná schopnost zotavit se z neúspěchů a přizpůsobit se novým výzvám.", "Exceptional capacity to recover from setbacks and adapt to new challenges.", "Außergewöhnliche Fähigkeit, sich von Rückschlägen zu erholen und an neue Herausforderungen anzupassen.")
                                            },
                                            {
                                                title: t("Disciplína v exekuci", "Execution Discipline", "Disziplin in der Ausführung"),
                                                desc: t("Přísná pozornost k detailu a důslednost v dlouhodobých cílech.", "Rigorous attention to detail and consistency in long-term goals.", "Strenge Detailgenauigkeit und Beständigkeit bei langfristigen Zielen.")
                                            }
                                        ].map((skill, i) => (
                                            <div key={i} className="p-4 rounded-xl bg-talent/5 border border-talent/10">
                                                <h5 className="font-black text-sm">{skill.title}</h5>
                                                <p className="text-xs text-muted-foreground mt-1">{skill.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-xs font-black uppercase tracking-widest text-talent flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-talent" />
                                        {t("Doporučené kariérní cesty", "Recommended Career Paths", "Empfohlene Karrierewege")}
                                    </h4>
                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            t('Project Management', 'Project Management', 'Projektmanagement'),
                                            t('Sales Strategy', 'Sales Strategy', 'Vertriebsstrategie'),
                                            t('Operations', 'Operations', 'Betriebsführung'),
                                            t('Leadership Consulting', 'Leadership Consulting', 'Führungsberatung')
                                        ].map((path, i) => (
                                            <div key={i} className="flex items-center gap-2 p-3 rounded-lg border border-border bg-muted/20 text-xs font-bold">
                                                <Briefcase className="w-3 h-3 text-muted-foreground" />
                                                {path}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-talent to-talent-dark rounded-2xl p-6 text-white text-center space-y-4">
                                    <FileText className="w-10 h-10 mx-auto opacity-50" />
                                    <h4 className="font-black">{t("Připraveni na další krok?", "Ready for the Next Step?", "Bereit für den nächsten Schritt?")}</h4>
                                    <p className="text-xs opacity-80 font-medium">
                                        {t("Použijte tyto dovednosti k automatickému vylepšení svého životopisu a přilákání špičkových zaměstnavatelů.", "Use these skills to automatically enhance your CV and attract top employers.", "Nutzen Sie diese Fähigkeiten, um Ihren Lebenslauf automatisch zu verbessern und Top-Arbeitgeber zu gewinnen.")}
                                    </p>
                                    <Button
                                        className="w-full bg-white text-talent hover:bg-white/90 font-black rounded-xl"
                                        onClick={handleApplyToCV}
                                    >
                                        {t("Aplikovat na životopis a zobrazit práci", "Apply to CV & View Jobs", "Auf Lebenslauf anwenden & Jobs anzeigen")}
                                    </Button>
                                </div>
                            </div>
                        </ScrollArea>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AICareerAssistantModal;
