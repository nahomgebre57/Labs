
import React, { useState, useEffect, useRef } from 'react';
import { 
    ArrowDownRight, 
    ArrowUpRight, 
    Mail, 
    MapPin, 
    ArrowRight, 
    Zap, 
    Loader2, 
    Sparkles, 
    Clock,
    Globe,
    Plus,
    Minus,
    Layers,
    Rocket,
    Puzzle,
    Scissors,
    PenTool,
    Film,
    Cpu,
    BookOpen,
    Play,
    Beaker,
    ChevronRight,
    Terminal
} from 'lucide-react';
import { 
    SERVICES, 
    INSIGHTS, 
    FAQ_DATA, 
    PRICING_PLANS, 
    PARTNER_LOGOS, 
    LAB_EXPERIMENTS, 
    DOC_MODULES 
} from './constants';
import { generateCampaignStrategy } from './services/geminiService';
import { View } from './types';

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<View>('home');
    const [currentTime, setCurrentTime] = useState(new Date());
    const [location, setLocation] = useState('Global');
    const [isGenerating, setIsGenerating] = useState(false);
    const [strategy, setStrategy] = useState<string | null>(null);
    const [activeStep, setActiveStep] = useState(1);
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    
    const taskRef = useRef<HTMLInputElement>(null);
    const stackRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        try {
            const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
            setLocation(tz.split('/').pop()?.replace('_', ' ') || 'Remote');
        } catch {
            setLocation('Global');
        }
        return () => clearInterval(timer);
    }, []);

    // Intersection Observer (Home Only)
    useEffect(() => {
        if (currentPage !== 'home') return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveStep(Number(entry.target.getAttribute('data-step')));
                }
            });
        }, { threshold: 0.6 });

        document.querySelectorAll('.process-step').forEach(step => observer.observe(step));
        return () => observer.disconnect();
    }, [currentPage]);

    // Scroll to top on page change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);

    const handleGenerateStrategy = async (e: React.FormEvent) => {
        e.preventDefault();
        const task = taskRef.current?.value || "";
        const stack = stackRef.current?.value || "";
        if (!task || !stack) return;
        setIsGenerating(true);
        try {
            const res = await generateCampaignStrategy(task, stack);
            setStrategy(res);
        } catch (err) {
            alert("Failed to architect workflow. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    const renderNavbar = () => (
        <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-6 md:px-12 md:py-8 flex justify-between items-center mix-blend-difference text-white">
            <button onClick={() => setCurrentPage('home')} className="group flex items-center gap-1 text-2xl md:text-3xl tracking-tight font-normal font-instrument">
                <span className="border-b border-white pb-0.5 group-hover:border-transparent transition-colors duration-300">spark</span>
                <span>labs</span>
            </button>

            <div className="hidden md:flex items-center gap-8 lg:gap-12">
                <button onClick={() => setCurrentPage('labs')} className={`text-sm font-medium uppercase tracking-wide transition-colors ${currentPage === 'labs' ? 'text-emerald-400' : 'hover:text-emerald-400'}`}>Labs</button>
                <button onClick={() => setCurrentPage('showreel')} className={`text-sm font-medium uppercase tracking-wide transition-colors ${currentPage === 'showreel' ? 'text-emerald-400' : 'hover:text-emerald-400'}`}>Showreel</button>
                <button onClick={() => setCurrentPage('docs')} className={`text-sm font-medium uppercase tracking-wide transition-colors ${currentPage === 'docs' ? 'text-emerald-400' : 'hover:text-emerald-400'}`}>Documentation</button>
                <button onClick={() => setCurrentPage('collaborate')} className="px-5 py-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-300 text-sm font-medium uppercase tracking-wide backdrop-blur-sm">Collaborate</button>
            </div>
        </nav>
    );

    const renderFooter = () => (
        <footer className="bg-zinc-950 pt-20 pb-10 border-t border-zinc-900/50">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-10 mb-20">
                <div className="flex items-center gap-4 px-6 py-3 rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-400 text-sm font-mono tracking-widest">
                    <span className="flex items-center gap-2"><Clock className="w-3 h-3 text-emerald-500" /> {currentTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}</span>
                    <span className="text-zinc-700">|</span>
                    <span className="flex items-center gap-2"><Globe className="w-3 h-3" /> {location}</span>
                </div>

                <div className="flex gap-12 text-sm font-bold uppercase tracking-[0.2em] text-zinc-500">
                    <button onClick={() => setCurrentPage('labs')} className="hover:text-emerald-400 transition-colors">Lab Journal</button>
                    <a href="#" className="hover:text-emerald-400 transition-colors">LinkedIn</a>
                    <button onClick={() => setCurrentPage('showreel')} className="hover:text-emerald-400 transition-colors">Showreel</button>
                </div>
            </div>

            <div className="relative w-full overflow-hidden select-none opacity-10 hover:opacity-40 transition-opacity duration-700 cursor-default">
                <div className="flex whitespace-nowrap animate-marquee">
                    <span className="text-[14vw] font-instrument leading-none tracking-tighter mx-10">SPARK LABS ©</span>
                    <span className="text-[14vw] font-instrument leading-none tracking-tighter mx-10">SPARK LABS ©</span>
                </div>
            </div>
            
            <div className="mt-10 text-center text-zinc-600 text-xs font-mono uppercase tracking-[0.3em]">
                &copy; {new Date().getFullYear()} Spark Labs International | Neural Design Ops
            </div>
        </footer>
    );

    const HomeView = () => (
        <div className="fade-in-up">
            {/* Hero */}
            <header className="relative w-full h-screen overflow-hidden bg-black">
                <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-50 scale-105">
                    <source src="https://spark-labs.org/video/reel.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full px-6 py-12 md:px-12 md:py-20 flex flex-col md:flex-row justify-between items-end">
                    <div className="max-w-4xl">
                        <h1 className="text-5xl md:text-7xl lg:text-9xl leading-[0.85] tracking-tighter font-instrument mb-10">
                            Augmenting the <br />
                            <span className="text-zinc-600">Creative Mind</span>
                        </h1>
                        <div className="flex flex-col md:flex-row gap-8 md:items-center text-lg font-light text-zinc-300">
                            <p className="max-w-md leading-relaxed text-zinc-400 text-base md:text-xl">
                                Machine-powered Design Ops for visionary graphic designers and video editors. Preserve your taste, automate the rest.
                            </p>
                            <button onClick={() => setCurrentPage('labs')} className="group flex items-center gap-2 text-white border-b border-white/30 pb-1 hover:border-white transition-all w-fit">
                                <span>View our tech stack</span>
                                <ArrowDownRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Manifesto */}
            <section className="py-40 px-6 md:px-12 bg-zinc-950 flex items-center justify-center text-center overflow-hidden">
                <div className="max-w-6xl">
                    <h2 className="font-instrument text-5xl md:text-7xl lg:text-[10rem] leading-[0.9] tracking-tighter text-zinc-800 transition-all duration-700 hover:text-zinc-100">
                        The brush has changed. <br />
                        <span className="italic text-zinc-700 transition-all hover:text-emerald-500">The vision remains yours.</span>
                    </h2>
                </div>
            </section>

            {/* Services Marquee */}
            <section className="bg-zinc-950 py-32 border-y border-zinc-900/50">
                <div className="relative overflow-hidden w-full group">
                    <div className="flex w-fit animate-marquee">
                        {[...SERVICES, ...SERVICES].map((service, idx) => (
                            <div key={`${service.id}-${idx}`} className="group relative w-[85vw] md:w-[500px] h-[600px] rounded-[2.5rem] overflow-hidden border border-zinc-800 bg-zinc-900/40 hover:border-zinc-600 transition-all duration-700 shrink-0 mx-4">
                                <img src={service.image} className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-all duration-1000" alt={service.title} />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/20 to-zinc-950"></div>
                                <div className="relative h-full p-10 flex flex-col justify-between">
                                    <span className="font-instrument text-5xl md:text-6xl text-white/90">{service.number}</span>
                                    <div>
                                        <h3 className="text-3xl md:text-4xl font-instrument text-white mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{service.title}</h3>
                                        <p className="text-zinc-400 text-sm md:text-base leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="relative bg-zinc-950 border-b border-zinc-900/50">
                <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2">
                    <div className="hidden lg:block relative h-full min-h-screen border-r border-zinc-900/50">
                        <div className="sticky top-0 h-screen w-full flex items-center justify-center p-16">
                            <div className="relative w-full h-[80vh] flex items-start">
                                <div className="relative w-full h-full overflow-hidden rounded-3xl">
                                    <img 
                                        src={activeStep === 1 ? SERVICES[0].image : activeStep === 2 ? SERVICES[1].image : SERVICES[2].image}
                                        className="w-full h-full object-cover grayscale opacity-40 transition-all duration-700" 
                                        alt="Process"
                                    />
                                </div>
                                <div className="absolute -right-8 top-12 z-20">
                                    <span className="font-instrument text-9xl text-white/90 tracking-tighter tabular-nums transition-all duration-500">0{activeStep}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-6 py-24 md:px-20 md:py-32 space-y-64">
                        <div className="process-step group" data-step="1">
                            <h3 className="text-4xl md:text-6xl font-instrument mb-8 group-hover:text-emerald-400 transition-colors">Style Extraction</h3>
                            <p className="text-xl text-zinc-400 font-light leading-relaxed max-w-lg">We analyze your body of work to extract color science, stroke weights, and composition patterns.</p>
                        </div>
                        <div className="process-step group" data-step="2">
                            <h3 className="text-4xl md:text-6xl font-instrument mb-8 group-hover:text-emerald-400 transition-colors">Neural Training</h3>
                            <p className="text-xl text-zinc-400 font-light leading-relaxed max-w-lg">We train private models on your aesthetic. A digital extension of your own hand.</p>
                        </div>
                        <div className="process-step group" data-step="3">
                            <h3 className="text-4xl md:text-6xl font-instrument mb-8 group-hover:text-emerald-400 transition-colors">Workflow Bridge</h3>
                            <p className="text-xl text-zinc-400 font-light leading-relaxed max-w-lg">Custom scripts connect models directly to your software stack.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );

    const LabsView = () => (
        <div className="pt-40 px-6 md:px-12 max-w-[1400px] mx-auto min-h-screen fade-in-up">
            <div className="flex items-center gap-3 mb-10">
                <div className="px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-xs border border-emerald-500/20 flex items-center gap-2">
                    <Beaker className="w-3 h-3" /> Experimental Division
                </div>
            </div>
            <h1 className="text-6xl md:text-9xl font-instrument tracking-tighter mb-20 leading-[0.85]">Creative <br /><span className="text-zinc-700 italic">R&D Hub.</span></h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-40">
                {LAB_EXPERIMENTS.map((exp, idx) => (
                    <div key={idx} className="glass p-10 rounded-[3rem] group hover:border-emerald-500/50 transition-all duration-500">
                        <div className="flex justify-between items-start mb-10">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-md text-zinc-500">{exp.status}</span>
                            <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-all">
                                <Terminal className="w-5 h-5" />
                            </div>
                        </div>
                        <h3 className="text-3xl font-instrument mb-4">{exp.title}</h3>
                        <p className="text-zinc-500 font-light mb-8 leading-relaxed">{exp.description}</p>
                        <div className="flex flex-wrap gap-2">
                            {exp.tech.map((t, i) => <span key={i} className="text-[10px] font-mono text-zinc-600 border border-zinc-800 px-2 py-1 rounded">{t}</span>)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const ShowreelView = () => (
        <div className="pt-40 px-6 md:px-12 max-w-[1400px] mx-auto min-h-screen fade-in-up">
            <h1 className="text-6xl md:text-9xl font-instrument tracking-tighter mb-20 leading-[0.85]">Motion <br /><span className="text-zinc-700 italic">Benchmarks.</span></h1>
            
            <div className="space-y-32 mb-40">
                {[1, 2].map((i) => (
                    <div key={i} className="group">
                        <div className="relative aspect-video rounded-[3rem] overflow-hidden border border-zinc-800 bg-zinc-900/40">
                            <div className="absolute inset-0 flex items-center justify-center z-10">
                                <div className="w-24 h-24 rounded-full glass flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer">
                                    <Play className="w-8 h-8 fill-white" />
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60"></div>
                            <div className="absolute bottom-10 left-10 text-white z-20">
                                <span className="font-mono text-xs tracking-widest uppercase mb-2 block text-emerald-400">Spec Project 0{i}</span>
                                <h3 className="text-4xl font-instrument">Neural Texture Synthesis</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const DocsView = () => (
        <div className="pt-40 px-6 md:px-12 max-w-[1400px] mx-auto min-h-screen fade-in-up">
            <h1 className="text-6xl md:text-9xl font-instrument tracking-tighter mb-20 leading-[0.85]">Design Ops <br /><span className="text-zinc-700 italic">Handbook.</span></h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-40">
                <div className="lg:col-span-4 space-y-4">
                    {['Workflow', 'Style Training', 'API Integration', 'Export Settings'].map((cat, idx) => (
                        <button key={idx} className="w-full text-left px-8 py-5 rounded-2xl glass border-zinc-800/50 hover:border-emerald-500/50 flex justify-between items-center group">
                            <span className="font-mono text-sm uppercase tracking-widest text-zinc-500 group-hover:text-zinc-200">{cat}</span>
                            <ChevronRight className="w-4 h-4 text-zinc-700 group-hover:text-emerald-400" />
                        </button>
                    ))}
                </div>
                <div className="lg:col-span-8 space-y-12">
                    {DOC_MODULES.map((doc, idx) => (
                        <div key={idx} className="glass p-12 rounded-[3rem] border-zinc-800/50">
                            <span className="text-xs font-bold text-emerald-500 font-mono tracking-widest uppercase mb-4 block">{doc.category}</span>
                            <h3 className="text-4xl font-instrument mb-8">{doc.title}</h3>
                            <p className="text-xl text-zinc-400 font-light leading-relaxed mb-10">{doc.content}</p>
                            <button className="flex items-center gap-2 text-white border-b border-zinc-800 pb-1 hover:border-emerald-400 hover:text-emerald-400 transition-all">
                                <span>Read technical specification</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const CollaborateView = () => (
        <div className="pt-40 px-6 md:px-12 max-w-[1400px] mx-auto min-h-screen fade-in-up">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-40">
                <div>
                    <h1 className="text-6xl md:text-8xl font-instrument tracking-tighter mb-10 leading-[0.9]">Start Your <br /><span className="text-zinc-700 italic">R&D Sprint.</span></h1>
                    <p className="text-xl text-zinc-400 font-light max-w-md mb-16 leading-relaxed">Describe the production hurdle you want to eliminate. We build the engine to solve it.</p>
                    
                    <div className="space-y-8">
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-full border border-zinc-800 flex items-center justify-center">
                                <Mail className="w-6 h-6" />
                            </div>
                            <span className="text-xl font-light">labs@spark-labs.org</span>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-full border border-zinc-800 flex items-center justify-center">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <span className="text-xl font-light">Silicon Valley / Paris / Remote</span>
                        </div>
                    </div>
                </div>

                <form className="glass p-12 rounded-[3rem] space-y-8">
                    <div className="space-y-3">
                        <label className="text-xs uppercase font-bold tracking-widest text-zinc-500">Studio Name</label>
                        <input type="text" className="w-full bg-zinc-950/50 border border-zinc-800 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500 transition-all" />
                    </div>
                    <div className="space-y-3">
                        <label className="text-xs uppercase font-bold tracking-widest text-zinc-500">Bottleneck Description</label>
                        <textarea rows={6} className="w-full bg-zinc-950/50 border border-zinc-800 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500 transition-all resize-none" placeholder="e.g. We need to automate 50 character variations while maintaining consistent vector output..."></textarea>
                    </div>
                    <button className="w-full py-6 rounded-2xl bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-emerald-400 transition-all flex items-center justify-center gap-3">
                        Initiate Pipeline
                        <Rocket className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    );

    return (
        <div className="relative min-h-screen bg-zinc-950 text-zinc-100 overflow-x-hidden selection:bg-emerald-500/30 selection:text-emerald-200">
            {renderNavbar()}
            
            <main>
                {currentPage === 'home' && <HomeView />}
                {currentPage === 'labs' && <LabsView />}
                {currentPage === 'showreel' && <ShowreelView />}
                {currentPage === 'docs' && <DocsView />}
                {currentPage === 'collaborate' && <CollaborateView />}
            </main>

            {/* AI Architect Tool (Fixed accessibility from any view) */}
            {currentPage !== 'collaborate' && (
                <section className="py-32 px-6 md:px-12 bg-zinc-950 border-t border-zinc-900/50">
                    <div className="max-w-7xl mx-auto glass p-8 md:p-16 rounded-[3rem] border-zinc-800/50">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-xs border border-emerald-500/20 flex items-center gap-2">
                                        <Cpu className="w-3 h-3" /> AI Workflow Architect
                                    </div>
                                </div>
                                <h2 className="text-5xl md:text-7xl font-instrument mb-10 leading-[0.95]">Engineer Your <br /><span className="text-zinc-600 italic">Blueprint.</span></h2>
                                <form onSubmit={handleGenerateStrategy} className="space-y-6">
                                    <input ref={taskRef} type="text" placeholder="Task Description" className="w-full bg-black/50 border border-zinc-800 rounded-2xl px-6 py-4 focus:border-emerald-500 outline-none" />
                                    <input ref={stackRef} type="text" placeholder="Your Software Stack" className="w-full bg-black/50 border border-zinc-800 rounded-2xl px-6 py-4 focus:border-emerald-500 outline-none" />
                                    <button disabled={isGenerating} className="w-full py-5 rounded-2xl bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2">
                                        {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
                                        {isGenerating ? "Processing..." : "Architect Workflow"}
                                    </button>
                                </form>
                            </div>
                            <div className="min-h-[400px] h-full flex flex-col">
                                {strategy ? (
                                    <div className="flex-1 bg-black/30 rounded-[2rem] p-10 border border-zinc-800/50 overflow-y-auto max-h-[600px] no-scrollbar">
                                        <div className="prose prose-invert prose-zinc max-w-none">
                                            <div className="whitespace-pre-wrap font-light text-zinc-300 leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: strategy.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex-1 border-2 border-dashed border-zinc-800 rounded-[2rem] flex flex-col items-center justify-center p-12 text-center">
                                        <Sparkles className="w-12 h-12 text-zinc-800 mb-6" />
                                        <p className="text-zinc-600 font-instrument text-2xl italic">The machine is waiting for your input.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {renderFooter()}
        </div>
    );
};

export default App;
