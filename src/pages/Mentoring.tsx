import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Users,
    Star,
    Calendar,
    MessageSquare,
    Video,
    Award,
    Briefcase,
    ChevronRight,
    Sparkles,
    CheckCircle2,
    ArrowRight
} from 'lucide-react';

const Mentoring = () => {
    const mentors = [
        {
            id: 1,
            name: "Petr Svoboda",
            role: "Ex-Professional Ice Hockey",
            currentPos: "Head of Operations @ TechGiant",
            expertise: ["Career Transition", "Leadership", "Team Building"],
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
            rating: 4.9,
            reviews: 124,
            isOnline: true
        },
        {
            id: 2,
            name: "Martina Nováková",
            role: "Olympic Swimmer",
            currentPos: "Marketing Director @ SportBrand",
            expertise: ["Personal Branding", "Public Speaking", "Marketing"],
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400",
            rating: 5.0,
            reviews: 89,
            isOnline: false
        },
        {
            id: 3,
            name: "Jan Marek",
            role: "Professional Basketball",
            currentPos: "Senior HR Consultant",
            expertise: ["CV Optimization", "Interview Prep", "Networking"],
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
            rating: 4.8,
            reviews: 56,
            isOnline: true
        }
    ];

    return (
        <div className="min-h-screen bg-muted/20 pb-20 pt-12">
            <div className="container max-w-6xl">
                {/* Header Section */}
                <div className="text-center space-y-4 mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 text-orange-600 text-xs font-black uppercase tracking-widest">
                        <Users className="w-4 h-4" />
                        Professional Mentorship
                    </div>
                    <h1 className="text-5xl font-black tracking-tight">Learn from those who <br /><span className="text-orange-500 underline decoration-orange-200 decoration-4 underline-offset-8">already made the pivot.</span></h1>
                    <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">Connect with former elite athletes who have successfully transitioned into corporate leadership roles.</p>
                </div>

                {/* Main Grid */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left: Stats & Info */}
                    <div className="space-y-8">
                        <div className="bg-card border border-border rounded-[2.5rem] p-8 space-y-6 shadow-sm">
                            <h3 className="font-black text-lg">Why Mentoring?</h3>
                            <div className="space-y-4">
                                {[
                                    { icon: Star, text: "Practical insigts from field" },
                                    { icon: Sparkles, text: "Build professional network" },
                                    { icon: Award, text: "Avoid common transition traps" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <span className="font-bold text-sm">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                            <Button className="w-full bg-orange-500 hover:bg-orange-600 rounded-2xl py-6 font-black shadow-lg shadow-orange-500/20">
                                Get Matched Automatically
                            </Button>
                        </div>

                        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-[2.5rem] p-8 text-white space-y-6 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:rotate-12 transition-transform">
                                <Video className="w-16 h-16" />
                            </div>
                            <div className="relative z-10">
                                <h4 className="text-2xl font-black">Free Intro Call</h4>
                                <p className="opacity-80 font-medium text-sm mt-2">All mentors offer a 15-min discovery call to see if you're a good fit.</p>
                            </div>
                            <Button variant="outline" className="w-full bg-white/20 border-white/20 text-white hover:bg-white hover:text-orange-600 font-bold rounded-xl transition-all">
                                How it works
                            </Button>
                        </div>
                    </div>

                    {/* Right: Mentor Cards */}
                    <div className="lg:col-span-2 space-y-6">
                        {mentors.map((mentor) => (
                            <div key={mentor.id} className="group bg-card border border-border rounded-[2.5rem] p-8 hover:shadow-2xl hover:shadow-orange-500/5 transition-all overflow-hidden relative">
                                <div className="flex flex-col md:flex-row gap-8">
                                    <div className="relative shrink-0">
                                        <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-muted">
                                            <img src={mentor.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        </div>
                                        {mentor.isOnline && (
                                            <div className="absolute -bottom-2 -right-2 bg-green-500 border-4 border-card w-8 h-8 rounded-full flex items-center justify-center">
                                                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 space-y-4">
                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="text-2xl font-black">{mentor.name}</h3>
                                                    <div className="flex items-center gap-1 text-xs font-black text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded-full">
                                                        <Star className="w-3 h-3 fill-orange-500" /> {mentor.rating}
                                                    </div>
                                                </div>
                                                <p className="font-bold text-muted-foreground">{mentor.role}</p>
                                                <div className="flex items-center gap-2 text-sm text-foreground font-medium mt-1">
                                                    <Briefcase className="w-4 h-4 text-orange-500" />
                                                    {mentor.currentPos}
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-2 justify-end">
                                                {mentor.expertise.map(exp => (
                                                    <Badge key={exp} variant="outline" className="rounded-lg text-[10px] font-black uppercase tracking-wider">{exp}</Badge>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 md:flex gap-4 pt-4 border-t border-border/50">
                                            <Button className="flex-1 md:flex-none h-12 bg-orange-500 hover:bg-orange-600 rounded-xl px-8 font-black shadow-lg shadow-orange-500/10 gap-2">
                                                <Calendar className="w-4 h-4" /> Book Session
                                            </Button>
                                            <Button variant="outline" className="flex-1 md:flex-none h-12 rounded-xl px-6 font-bold gap-2">
                                                <MessageSquare className="w-4 h-4" /> Message
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="p-8 text-center bg-muted/30 border border-dashed border-border rounded-[2.5rem] group cursor-pointer hover:border-orange-500 transition-colors">
                            <p className="font-black text-muted-foreground group-hover:text-orange-600 transition-colors flex items-center justify-center gap-2">
                                WANT TO BECOME A MENTOR? <ArrowRight className="w-4 h-4" />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mentoring;
