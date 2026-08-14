import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Search, Filter, Download, ChevronLeft, ChevronRight } from 'lucide-react';

const AttendanceReport = () => {
    const [logs, setLogs] = useState([]);
    const [filteredLogs, setFilteredLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDate, setFilterDate] = useState('');

    // Pagination (Client-side for now as dataset is small, backend pagination is ideal for large datasets)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const data = await api.get('/attendance/logs/');
                setLogs(data || []);
                setFilteredLogs(data || []);
            } catch (err) {
                console.error("Failed to fetch logs", err);
            } finally {
                setLoading(false);
            }
        };
        fetchLogs();
    }, []);

    useEffect(() => {
        let result = logs;

        // Search Filter
        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            result = result.filter(log =>
                log.User_name?.toLowerCase().includes(lowerTerm) ||
                log.usn?.toLowerCase().includes(lowerTerm)
            );
        }

        // Date Filter
        if (filterDate) {
            result = result.filter(log =>
                log.timestamp.startsWith(filterDate)
            );
        }

        setFilteredLogs(result);
        setCurrentPage(1); // Reset to first page on filter change
    }, [searchTerm, filterDate, logs]);

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredLogs.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);

    const handleExport = () => {
        window.open(`${import.meta.env.VITE_API_URL}attendance/logs/?format=csv`, '_blank');
    };

    if (loading) return (
        <div className="flex h-64 items-center justify-center">
            <div className="text-xl text-primary font-bold animate-pulse">Loading Report...</div>
        </div>
    );

    return (
        <div className="space-y-6 transition-all">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-display font-light text-foreground leading-tight">Attendance Register</h1>
                    <p className="text-sm text-muted-foreground mt-1">Detailed log of all user attendance scans</p>
                </div>
                <button
                    onClick={handleExport}
                    className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-md text-sm font-bold text-foreground hover:bg-secondary shadow-sm transition-all"
                >
                    <Download size={16} />
                    Export CSV
                </button>
            </div>

            <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
                {/* Filters */}
                <div className="p-4 border-b border-border bg-secondary/30 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={16} className="text-muted-foreground" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by Name or USN..."
                            className="w-full pl-10 px-4 py-2.5 bg-card border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground text-foreground"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="relative w-full md:w-56">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Filter size={16} className="text-muted-foreground" />
                        </div>
                        <input
                            type="date"
                            className="w-full pl-10 px-4 py-2.5 bg-card border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground"
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-secondary/50 text-muted-foreground font-bold uppercase tracking-widest text-[10px] border-b border-border">
                            <tr>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">USN / ID</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Time</th>
                                <th className="px-6 py-4 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {currentItems.length > 0 ? currentItems.map((log) => (
                                <tr key={log.id} className="hover:bg-secondary/20 transition-all group">
                                    <td className="px-6 py-4 font-bold text-foreground">
                                        {log.User_name}
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground font-mono text-[11px] group-hover:text-primary">
                                        {log.usn || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">
                                        {new Date(log.timestamp).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground font-bold">
                                        {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-black bg-primary/10 text-primary border border-primary/20 uppercase tracking-tighter">
                                            Present
                                        </span>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                                        No attendance records found matching your filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {filteredLogs.length > 0 && (
                    <div className="px-6 py-4 border-t border-border flex items-center justify-between bg-secondary/10">
                        <span className="text-xs text-muted-foreground">
                            Showing <span className="font-bold text-foreground">{indexOfFirstItem + 1}</span> to <span className="font-bold text-foreground">{Math.min(indexOfLastItem, filteredLogs.length)}</span> of <span className="font-bold text-foreground">{filteredLogs.length}</span>
                        </span>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="p-1.5 rounded-md hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed text-foreground transition-all"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <span className="text-xs font-bold text-foreground uppercase tracking-widest">
                                Page {currentPage} / {totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="p-1.5 rounded-md hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed text-foreground transition-all"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AttendanceReport;
