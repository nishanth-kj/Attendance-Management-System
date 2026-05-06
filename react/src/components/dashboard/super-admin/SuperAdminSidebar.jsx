import { Activity, Bell } from 'lucide-react';

const SuperAdminSidebar = () => {
    return (
        <div className="space-y-6">
            {/* Infrastructure Health Monitor */}
            <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
                <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-6 border-b border-border pb-3">Infrastructure Health</h3>
                <div className="space-y-6">
                    <div className="space-y-2.5">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                            <span className="text-muted-foreground">Neural Engine Load</span>
                            <span className="text-primary">14.2%</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full w-[14%] shadow-[0_0_8px_rgba(var(--primary),0.5)]"></div>
                        </div>
                    </div>
                    <div className="space-y-2.5">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                            <span className="text-muted-foreground">Database Clusters</span>
                            <span className="text-green-500">Active</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full w-[82%] shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                        </div>
                    </div>
                    <div className="space-y-2.5">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                            <span className="text-muted-foreground">Gateway Latency</span>
                            <span className="text-amber-500">24ms</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500 rounded-full w-[30%] shadow-[0_0_8px_rgba(245,158,11,0.5)]"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Critical Administrative Alert */}
            <div className="bg-primary p-6 rounded-lg shadow-xl text-primary-foreground relative overflow-hidden group">
                <Bell className="absolute -right-4 -bottom-4 opacity-10 w-24 h-24 group-hover:scale-125 transition-transform duration-500" />
                <h3 className="font-black text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Activity size={16} />
                    Administrative Alert
                </h3>
                <p className="text-[11px] font-bold opacity-90 mb-4 leading-relaxed uppercase tracking-tighter">
                    System-wide maintenance scheduled for Sunday at 02:00 AM. Access may be intermittent.
                </p>
                <button className="w-full text-[10px] bg-primary-foreground text-primary py-2.5 rounded-md font-black uppercase tracking-[0.2em] hover:opacity-90 transition-all shadow-lg">
                    Acknowledge
                </button>
            </div>
        </div>
    );
};

export default SuperAdminSidebar;
