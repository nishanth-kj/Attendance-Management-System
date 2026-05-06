const RecentActivity = ({ logs, searchTerm, setSearchTerm }) => {
    return (
        <div className="bg-card p-6 rounded-lg shadow-sm border border-border h-full flex flex-col transition-all">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h3 className="text-xl font-display font-bold text-foreground">Activity Feed</h3>
                <div className="relative w-full sm:w-64">
                    <input
                        type="text"
                        placeholder="Search logs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 text-sm bg-secondary/50 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground text-foreground"
                    />
                </div>
            </div>

            <div className="flex-grow overflow-y-auto pr-2 max-h-[600px]">
                {logs.length > 0 ? (
                    <div className="space-y-3">
                        {logs.map((log) => (
                            <div key={log.id} className="p-4 bg-secondary/30 rounded-md border border-border/50 hover:bg-secondary/50 hover:border-primary/30 transition-all group">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary font-black text-sm border border-primary/20">
                                            {log.User_name?.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{log.User_name}</span>
                                                <span className="px-1.5 py-0.5 rounded-md text-[9px] font-black bg-primary text-primary-foreground uppercase tracking-tighter">
                                                    Verified
                                                </span>
                                            </div>
                                            <div className="text-[10px] text-muted-foreground font-bold tracking-tight">
                                                {log.usn || 'FACULTY_AUTH'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3 text-[10px] text-muted-foreground flex gap-4 pl-[56px] font-bold opacity-60">
                                    <span className="flex items-center gap-1 uppercase">
                                        {new Date(log.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                    </span>
                                    <span className="flex items-center gap-1 uppercase">
                                        {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center text-muted-foreground text-xs font-black tracking-[0.2em] opacity-30">
                        NO RECENT ACTIVITY
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecentActivity;
