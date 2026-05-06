import { Clock, UserCheck } from 'lucide-react';

const AdminSidebar = () => {
    return (
        <div className="space-y-6">
            {/* Live Biometric Monitor */}
            <div className="bg-card p-6 rounded-lg shadow-xl border border-border relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1.5 h-full bg-primary"></div>
                <div className="flex justify-between items-center mb-8">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Monitoring Session</span>
                    <span className="flex items-center gap-2 text-[10px] font-black text-green-500 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
                        ACTIVE
                    </span>
                </div>
                <h4 className="text-xl font-display font-bold text-foreground mb-1 leading-tight">Biometric System</h4>
                <p className="text-[10px] text-muted-foreground mb-8 flex items-center gap-2 font-bold uppercase tracking-widest opacity-60">
                    <Clock size={14} className="text-primary" /> Live Validation Active
                </p>

                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-secondary/50 rounded-lg border border-border text-center">
                        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1 opacity-50">Total Enrolled</p>
                        <p className="text-2xl font-black text-foreground">48</p>
                    </div>
                    <div className="p-4 bg-secondary/50 rounded-lg border border-border text-center">
                        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1 opacity-50">Present</p>
                        <p className="text-2xl font-black text-primary">32</p>
                    </div>
                </div>
            </div>

            {/* AI Model Sync Feedback */}
            <div className="p-6 bg-primary/10 border-2 border-dashed border-primary/30 rounded-xl relative overflow-hidden group">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary text-primary-foreground rounded-lg shadow-lg group-hover:rotate-12 transition-transform">
                        <UserCheck size={18} />
                    </div>
                    <h4 className="font-black text-foreground text-xs uppercase tracking-widest">Verification Success</h4>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed font-bold uppercase tracking-tighter opacity-80">
                    AI model successfully synchronized with local database. Face recognition precision improved by 0.4%.
                </p>
            </div>
        </div>
    );
};

export default AdminSidebar;
