import { useNavigate } from 'react-router-dom';
import { Users, UserPlus, Shield, Activity, BarChart3, Database, Globe, Bell } from 'lucide-react';
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
        <div className="space-y-6">
            <DashboardHeader user={user} onExport={handleExport} />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-3 space-y-6">
                    {/* Admin Command Center */}
                    <div className="bg-card p-6 rounded-lg shadow-sm border border-border transition-all">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold font-display text-foreground flex items-center gap-2">
                                <Shield className="text-destructive" size={20} />
                                System Administration
                            </h3>
                            <div className="flex gap-2">
                                <span className="px-2 py-1 bg-green-500/10 text-green-500 text-[10px] font-bold rounded-sm border border-green-500/20 uppercase tracking-wider">Server: Online</span>
                                <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-sm border border-primary/20 uppercase tracking-wider">v2.1.0</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <button
                                onClick={() => navigate('/users/add')}
                                className="group p-4 bg-secondary/50 hover:bg-card border border-border hover:border-primary rounded-lg transition-all duration-300 flex flex-col items-center text-center gap-3"
                            >
                                <div className="p-3 bg-card rounded-md shadow-sm group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                    <UserPlus size={20} />
                                </div>
                                <span className="text-xs font-bold text-muted-foreground group-hover:text-primary uppercase tracking-wide">Register User</span>
                            </button>
                            <button
                                onClick={() => navigate('/users')}
                                className="group p-4 bg-secondary/50 hover:bg-card border border-border hover:border-indigo-500 rounded-lg transition-all duration-300 flex flex-col items-center text-center gap-3"
                            >
                                <div className="p-3 bg-card rounded-md shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                    <Users size={20} />
                                </div>
                                <span className="text-xs font-bold text-muted-foreground group-hover:text-indigo-600 uppercase tracking-wide">User Directory</span>
                            </button>
                            <button
                                className="group p-4 bg-secondary/50 hover:bg-card border border-border hover:border-amber-500 rounded-lg transition-all duration-300 flex flex-col items-center text-center gap-3"
                            >
                                <div className="p-3 bg-card rounded-md shadow-sm group-hover:bg-amber-600 group-hover:text-white transition-all">
                                    <Database size={20} />
                                </div>
                                <span className="text-xs font-bold text-muted-foreground group-hover:text-amber-600 uppercase tracking-wide">Backup Data</span>
                            </button>
                            <button
                                className="group p-4 bg-secondary/50 hover:bg-card border border-border hover:border-rose-500 rounded-lg transition-all duration-300 flex flex-col items-center text-center gap-3"
                            >
                                <div className="p-3 bg-card rounded-md shadow-sm group-hover:bg-rose-600 group-hover:text-white transition-all">
                                    <Globe size={20} />
                                </div>
                                <span className="text-xs font-bold text-muted-foreground group-hover:text-rose-600 uppercase tracking-wide">Global Settings</span>
                            </button>
                        </div>
                    </div>

                    <StatsGrid analytics={analytics} user={user} logsCount={logs.length} />

                    <AttendanceChart data={analytics?.trends || []} />
                </div>

                <div className="md:col-span-1 space-y-6">
                    {/* System Health */}
                    <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
                        <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">System Health</h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span className="font-semibold text-muted-foreground">AI Model Load</span>
                                    <span className="text-primary font-bold">14%</span>
                                </div>
                                <div className="h-1.5 bg-secondary rounded-sm overflow-hidden">
                                    <div className="h-full bg-primary rounded-sm w-[14%]"></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span className="font-semibold text-muted-foreground">Storage Usage</span>
                                    <span className="text-green-500 font-bold">42%</span>
                                </div>
                                <div className="h-1.5 bg-secondary rounded-sm overflow-hidden">
                                    <div className="h-full bg-green-500 rounded-sm w-[42%]"></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span className="font-semibold text-muted-foreground">API Latency</span>
                                    <span className="text-amber-500 font-bold">24ms</span>
                                </div>
                                <div className="h-1.5 bg-secondary rounded-sm overflow-hidden">
                                    <div className="h-full bg-amber-500 rounded-sm w-[10%]"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <RecentActivity logs={filteredLogs} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                    {/* Quick Notifications */}
                    <div className="bg-indigo-600 p-6 rounded-md shadow-lg text-white relative overflow-hidden">
                        <Bell className="absolute -right-2 -bottom-2 opacity-10 w-24 h-24" />
                        <h3 className="font-bold mb-2 flex items-center gap-2">
                            <Activity size={18} />
                            Admin Alert
                        </h3>
                        <p className="text-xs text-indigo-100 mb-4 leading-relaxed">
                            System maintenance is scheduled for Sunday at 02:00 AM UTC.
                        </p>
                        <button className="text-[10px] bg-white text-indigo-600 px-3 py-1.5 rounded font-bold uppercase tracking-wider hover:bg-indigo-50 transition-colors">
                            Acknowledge
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
