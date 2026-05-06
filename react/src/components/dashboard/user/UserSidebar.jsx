import { Zap } from 'lucide-react';

const UserSidebar = () => {
    return (
        <div className="space-y-6">
            {/* My Activity Metric Score */}
            <div className="bg-primary p-8 rounded-lg shadow-xl text-primary-foreground relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform duration-700">
                    <Zap size={100} />
                </div>
                <div className="relative z-10 flex flex-col items-center text-center">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 opacity-80">Activity Metric</h4>
                    <div className="relative w-32 h-32 flex items-center justify-center mb-6">
                        <svg className="w-full h-full -rotate-90">
                            <circle cx="64" cy="64" r="58" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
                            <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="none" strokeDasharray="364.4" strokeDashoffset="43.7" strokeLinecap="square" className="text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                            <span className="text-5xl font-black font-display">88</span>
                            <span className="text-[8px] font-black opacity-60 tracking-[0.2em]">RATING</span>
                        </div>
                    </div>
                    <p className="text-xs font-bold leading-relaxed max-w-[200px] opacity-90">
                        OUTSTANDING PERFORMANCE! YOU ARE IN THE TOP 10% FOR THIS PERIOD.
                    </p>
                </div>
            </div>

            {/* Personalized Notice Board */}
            <div className="bg-card p-8 rounded-lg shadow-sm border border-border">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-3 h-3 bg-primary rounded-sm shadow-[0_0_8px_rgba(var(--primary),0.5)]"></div>
                    <h3 className="text-xs font-black text-foreground uppercase tracking-[0.3em]">Notice Board</h3>
                </div>
                <div className="space-y-8">
                    <div className="group cursor-pointer">
                        <span className="text-[9px] font-black text-primary uppercase mb-2 block tracking-widest opacity-80">Academic · Today</span>
                        <h5 className="text-sm font-bold text-foreground group-hover:text-primary transition-all leading-snug">Assessment Schedule Released</h5>
                        <p className="text-[11px] text-muted-foreground mt-3 leading-relaxed font-medium">Check the portal for your updated examination timetable and room assignments.</p>
                    </div>
                    <div className="group cursor-pointer">
                        <span className="text-[9px] font-black text-primary/60 uppercase mb-2 block tracking-widest">Event · 2 days ago</span>
                        <h5 className="text-sm font-bold text-foreground group-hover:text-primary transition-all leading-snug">Annual Tech Symposium</h5>
                        <p className="text-[11px] text-muted-foreground mt-3 leading-relaxed font-medium">Enrolment is now open for the upcoming symposium.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserSidebar;
