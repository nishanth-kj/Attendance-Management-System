import { Users, UserCheck, ClipboardList, TrendingUp } from 'lucide-react';

const StatsGrid = ({ analytics, user, logsCount }) => {
    const isADMIN = [1, 2].includes(user?.role);

    const stats = isADMIN ? [
        {
            label: "Total Users",
            value: analytics?.summary?.total_Users || 0,
            icon: Users,
            color: "text-primary",
            bg: "bg-primary/10",
            trend: "+4% from last month"
        },
        {
            label: "Present Today",
            value: analytics?.summary?.today_present || 0,
            icon: UserCheck,
            color: "text-green-500",
            bg: "bg-green-500/10",
            trend: "92% Attendance Rate"
        },
        {
            label: "System Logs",
            value: logsCount || 0,
            icon: ClipboardList,
            color: "text-indigo-500",
            bg: "bg-indigo-500/10",
            trend: "All systems operational"
        }
    ] : [];

    if (!isADMIN) return null; // User dashboard has its own stats grid

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {stats.map((stat, i) => (
                <div key={i} className="bg-card p-6 rounded-lg shadow-sm border border-border flex flex-col gap-4 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between">
                        <div className={`p-2.5 rounded-md ${stat.bg} ${stat.color}`}>
                            <stat.icon size={20} />
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-sm">
                            <TrendingUp size={10} />
                            LIVE
                        </div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold font-display text-foreground tracking-tight mb-1">
                            {stat.value}
                        </div>
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                            {stat.label}
                        </div>
                    </div>
                    <div className="pt-4 border-t border-border mt-1">
                        <p className="text-[10px] font-medium text-muted-foreground">
                            {stat.trend}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsGrid;
