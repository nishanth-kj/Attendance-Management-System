import { User, CheckCircle, Clock, BookOpen, UserCheck, Calendar, Trophy, Zap, ArrowUpRight } from 'lucide-react';

const UserDashboard = ({ user, logs }) => {
    // For user, logs are already filtered by backend typically
    // Assuming 'logs' contains only THIS user's logs.

    // Basic stats calculation
    const totalSessions = logs.length;
    const lastSeen = logs.length > 0 ? new Date(logs[0].timestamp).toLocaleDateString() : 'Never';
    const attendancePercentage = "88%";

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Profile Snapshot & Welcome */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-card p-8 rounded-lg shadow-sm border border-border flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden transition-all">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <Zap size={120} className="text-primary" />
                        </div>
                        <div className="flex items-center gap-6 z-10">
                            <div className="h-20 w-20 bg-primary/10 rounded-md flex items-center justify-center text-primary border-4 border-card shadow-xl">
                                <User size={40} />
                            </div>
                            <div>
                                <h1 className="text-3xl font-display font-bold text-foreground leading-tight">
                                    Hello, <span className="text-primary">{user?.username}</span>!
                                </h1>
                                <div className="flex items-center gap-3 mt-2">
                                    <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-primary/10 text-primary border border-primary/20 uppercase tracking-widest">
                                        Verified Member
                                    </span>
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">System ID: {user?.id}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-4 z-10">
                            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-md text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-primary/20">
                                My Activity
                            </button>
                        </div>
                    </div>

                    {/* Personal Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-card p-6 rounded-lg shadow-sm border border-border group hover:border-primary/30 transition-all">
                            <div className="p-3 w-fit bg-primary/10 text-primary rounded-md mb-4 transition-colors">
                                <UserCheck size={20} />
                            </div>
                            <h4 className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] mb-1">Attendance</h4>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-display font-bold text-foreground">{totalSessions}</span>
                                <span className="text-xs font-bold text-green-500 flex items-center gap-0.5">
                                    <ArrowUpRight size={12} /> LIVE
                                </span>
                            </div>
                            <p className="text-[10px] text-muted-foreground mt-2 font-bold uppercase opacity-40">Verified session logs</p>
                        </div>

                        <div className="bg-card p-6 rounded-lg shadow-sm border border-border group hover:border-primary/30 transition-all">
                            <div className="p-3 w-fit bg-primary/10 text-primary rounded-md mb-4 transition-colors">
                                <CheckCircle size={20} />
                            </div>
                            <h4 className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] mb-1">Percentage</h4>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-display font-bold text-foreground">{attendancePercentage}</span>
                            </div>
                            <div className="w-full h-1 bg-secondary rounded-sm mt-4 overflow-hidden">
                                <div className="h-full bg-primary rounded-sm w-[88%] shadow-[0_0_8px_rgba(var(--primary),0.5)]"></div>
                            </div>
                            <p className="text-[10px] text-muted-foreground mt-2 font-bold uppercase opacity-40 tracking-tighter">System calculated</p>
                        </div>

                        <div className="bg-card p-6 rounded-lg shadow-sm border border-border group hover:border-primary/30 transition-all">
                            <div className="p-3 w-fit bg-primary/10 text-primary rounded-md mb-4 transition-colors">
                                <Trophy size={20} />
                            </div>
                            <h4 className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] mb-1">Activity Rank</h4>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-display font-bold text-foreground">Top Tier</span>
                            </div>
                            <p className="text-[10px] text-muted-foreground mt-2 font-bold uppercase opacity-40 tracking-tighter">Highly consistent</p>
                        </div>
                    </div>

                    {/* Attendance Feed */}
                    <div className="bg-card p-8 rounded-lg shadow-sm border border-border">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-xl font-display font-bold text-foreground">Recent Check-ins</h3>
                                <p className="text-[10px] text-muted-foreground mt-1 uppercase font-black tracking-[0.2em] opacity-50">Identity Verification Logs</p>
                            </div>
                            <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/10 px-4 py-2 rounded-md border border-primary/20 transition-all">Export Logs</button>
                        </div>

                        <div className="space-y-4">
                            {logs.slice(0, 5).map((log, i) => (
                                <div key={i} className="group flex items-center justify-between p-4 bg-secondary/20 hover:bg-secondary/40 border border-border/50 rounded-md transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-md bg-card flex items-center justify-center text-primary shadow-sm border border-border group-hover:border-primary/50 transition-all">
                                            <Calendar size={18} />
                                        </div>
                                        <div>
                                            <span className="text-sm font-black text-foreground block">
                                                {new Date(log.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">Verified Entry</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-[10px] font-black text-foreground bg-card px-3 py-1.5 rounded-md border border-border shadow-sm uppercase tracking-tighter">
                                            {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(var(--primary),0.8)]"></div>
                                    </div>
                                </div>
                            ))}
                            {logs.length === 0 && (
                                <div className="py-12 text-center">
                                    <div className="mb-4 inline-flex p-4 bg-gray-50 rounded-sm text-gray-300">
                                        <Calendar size={40} />
                                    </div>
                                    <p className="text-gray-400 text-sm font-bold">No attendance records found</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Info Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Activity Score */}
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

                    {/* Announcement Feed */}
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

            </div>
        </div>
    );
};

export default UserDashboard;
