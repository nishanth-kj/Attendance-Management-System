import { useNavigate } from 'react-router-dom';
import { Camera, Users, FileText, Calendar, Clock, UserCheck, MessageSquare, PlusCircle } from 'lucide-react';
import StatsGrid from '@/components/dashboard/StatsGrid';
import AttendanceChart from '@/components/dashboard/AttendanceChart';
import RecentActivity from '@/components/dashboard/RecentActivity';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

const AdminDashboard = ({ user, analytics, logs, handleExport, searchTerm, setSearchTerm }) => {
    const navigate = useNavigate();

    const filteredLogs = logs.filter(log =>
        log.User_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-700">
            <DashboardHeader user={user} onExport={handleExport} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Staff Functional Area */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-card p-8 rounded-lg shadow-sm border border-border flex flex-col lg:flex-row items-center gap-10 relative overflow-hidden group">
                         <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform duration-1000">
                            <Camera size={180} />
                        </div>
                        
                        <div className="w-full lg:w-3/5 space-y-5 text-center lg:text-left z-10">
                            <h2 className="text-4xl font-display font-black text-foreground leading-tight tracking-tight">
                                IDENTITY <br />
                                <span className="text-primary">RECOGNITION</span>
                            </h2>
                            <p className="text-[11px] font-bold text-muted-foreground leading-relaxed uppercase tracking-wider opacity-70">
                                INITIALIZE THE BIOMETRIC SENSOR TO AUTOMATICALLY VERIFY AND LOG ATTENDANCE FOR ACTIVE SESSIONS.
                            </p>
                            <div className="pt-4">
                                <button
                                    onClick={() => navigate('/attendance')}
                                    className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground rounded-md font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/40 hover:opacity-90 hover:scale-[1.02] transition-all active:scale-95 group/btn"
                                >
                                    <Camera size={22} className="group-hover/btn:rotate-12 transition-transform" />
                                    Launch Scanner
                                </button>
                            </div>
                        </div>

                        <div className="w-full lg:w-2/5 grid grid-cols-2 gap-4 z-10">
                            <button
                                onClick={() => navigate('/users')}
                                className="p-5 bg-secondary/30 border border-border rounded-xl hover:border-primary hover:bg-card transition-all flex flex-col items-center gap-3 group/item shadow-sm"
                            >
                                <div className="p-3 bg-card rounded-lg text-primary shadow-sm group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-all">
                                    <Users size={20} />
                                </div>
                                <span className="text-[10px] font-black text-muted-foreground group-hover/item:text-primary uppercase tracking-widest">Directory</span>
                            </button>
                            <button
                                onClick={() => navigate('/users/add')}
                                className="p-5 bg-secondary/30 border border-border rounded-xl hover:border-primary hover:bg-card transition-all flex flex-col items-center gap-3 group/item shadow-sm"
                            >
                                <div className="p-3 bg-card rounded-lg text-primary shadow-sm group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-all">
                                    <PlusCircle size={20} />
                                </div>
                                <span className="text-[10px] font-black text-muted-foreground group-hover/item:text-primary uppercase tracking-widest">Enrol User</span>
                            </button>
                            <button
                                onClick={() => navigate('/reports')}
                                className="p-5 bg-secondary/30 border border-border rounded-xl hover:border-primary hover:bg-card transition-all flex flex-col items-center gap-3 group/item shadow-sm"
                            >
                                <div className="p-3 bg-card rounded-lg text-primary shadow-sm group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-all">
                                    <FileText size={20} />
                                </div>
                                <span className="text-[10px] font-black text-muted-foreground group-hover/item:text-primary uppercase tracking-widest">Logs</span>
                            </button>
                            <button
                                className="p-5 bg-secondary/30 border border-border rounded-xl hover:border-primary hover:bg-card transition-all flex flex-col items-center gap-3 group/item shadow-sm"
                            >
                                <div className="p-3 bg-card rounded-lg text-primary shadow-sm group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-all">
                                    <MessageSquare size={20} />
                                </div>
                                <span className="text-[10px] font-black text-muted-foreground group-hover/item:text-primary uppercase tracking-widest">Notice</span>
                            </button>
                        </div>
                    </div>

                    <StatsGrid analytics={analytics} user={user} logsCount={logs.length} />

                    <AttendanceChart data={analytics?.trends || []} />
                </div>

                {/* Sidebar Metrics */}
                <div className="md:col-span-1 space-y-6">
                    {/* Live Session Monitor */}
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

                    <RecentActivity logs={filteredLogs} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                    {/* Feedback Alert */}
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
            </div>
        </div>
    );
};

export default AdminDashboard;
