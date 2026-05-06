import { useNavigate } from 'react-router-dom';
import { Users, UserPlus, Shield, Activity, BarChart3, Database, Globe, Bell, ShieldAlert } from 'lucide-react';
import StatsGrid from '@/components/dashboard/StatsGrid';
import AttendanceChart from '@/components/dashboard/AttendanceChart';
import RecentActivity from '@/components/dashboard/RecentActivity';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

const SuperAdminDashboard = ({ user, analytics, logs, handleExport, searchTerm, setSearchTerm }) => {
    const navigate = useNavigate();

    const filteredLogs = logs.filter(log =>
        log.User_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-700">
            <DashboardHeader user={user} onExport={handleExport} />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-3 space-y-6">
                    {/* Super Admin Command Center */}
                    <div className="bg-card p-8 rounded-lg shadow-xl border border-border relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <ShieldAlert size={120} className="text-primary" />
                        </div>
                        
                        <div className="flex items-center justify-between mb-8 relative z-10">
                            <div>
                                <h3 className="text-2xl font-black font-display text-foreground flex items-center gap-3 uppercase tracking-tight">
                                    <Shield className="text-primary" size={24} />
                                    Master Control Center
                                </h3>
                                <p className="text-[10px] text-muted-foreground mt-1 font-bold uppercase tracking-[0.2em] opacity-60">System-wide Administrative Authority</p>
                            </div>
                            <div className="flex gap-2">
                                <span className="px-3 py-1.5 bg-green-500/10 text-green-500 text-[10px] font-black rounded-md border border-green-500/20 uppercase tracking-widest">Nodes: Active</span>
                                <span className="px-3 py-1.5 bg-primary/10 text-primary text-[10px] font-black rounded-md border border-primary/20 uppercase tracking-widest">v2.1.0-STABLE</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                            <button
                                onClick={() => navigate('/admins/add')}
                                className="group p-6 bg-secondary/30 hover:bg-card border border-border hover:border-primary rounded-xl transition-all duration-500 flex flex-col items-center text-center gap-4 shadow-sm hover:shadow-xl hover:-translate-y-1"
                            >
                                <div className="p-4 bg-card rounded-lg shadow-md group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                                    <UserPlus size={24} />
                                </div>
                                <span className="text-[10px] font-black text-muted-foreground group-hover:text-primary uppercase tracking-[0.2em]">Register Admin</span>
                            </button>
                            <button
                                onClick={() => navigate('/users')}
                                className="group p-6 bg-secondary/30 hover:bg-card border border-border hover:border-primary rounded-xl transition-all duration-500 flex flex-col items-center text-center gap-4 shadow-sm hover:shadow-xl hover:-translate-y-1"
                            >
                                <div className="p-4 bg-card rounded-lg shadow-md group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                                    <Database size={24} />
                                </div>
                                <span className="text-[10px] font-black text-muted-foreground group-hover:text-primary uppercase tracking-[0.2em]">Global Registry</span>
                            </button>
                            <button
                                className="group p-6 bg-secondary/30 hover:bg-card border border-border hover:border-primary rounded-xl transition-all duration-500 flex flex-col items-center text-center gap-4 shadow-sm hover:shadow-xl hover:-translate-y-1"
                            >
                                <div className="p-4 bg-card rounded-lg shadow-md group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                                    <BarChart3 size={24} />
                                </div>
                                <span className="text-[10px] font-black text-muted-foreground group-hover:text-primary uppercase tracking-[0.2em]">Security Audit</span>
                            </button>
                            <button
                                className="group p-6 bg-secondary/30 hover:bg-card border border-border hover:border-primary rounded-xl transition-all duration-500 flex flex-col items-center text-center gap-4 shadow-sm hover:shadow-xl hover:-translate-y-1"
                            >
                                <div className="p-4 bg-card rounded-lg shadow-md group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                                    <Globe size={24} />
                                </div>
                                <span className="text-[10px] font-black text-muted-foreground group-hover:text-primary uppercase tracking-[0.2em]">Network Config</span>
                            </button>
                        </div>
                    </div>

                    <StatsGrid analytics={analytics} user={user} logsCount={logs.length} />

                    <AttendanceChart data={analytics?.trends || []} />
                </div>

                <div className="md:col-span-1 space-y-6">
                    {/* System Health Monitor */}
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

                    <RecentActivity logs={filteredLogs} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                    {/* Critical Alert */}
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
            </div>
        </div>
    );
};

export default SuperAdminDashboard;
