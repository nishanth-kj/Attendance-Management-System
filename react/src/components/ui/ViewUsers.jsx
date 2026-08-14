import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, Search, Trash2, User } from 'lucide-react';
import api from '@/lib/api';

const ViewUsers = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeRole, setActiveRole] = useState('USER');
    const roleLabels = { 1: 'Super Admin', 2: 'Admin', 3: 'User' };

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            try {
                const data = await api.get(`/attendance/users/?role=${activeRole}`);
                setUsers(data || []);
            } catch (err) {
                console.error("Failed to fetch users", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, [activeRole]);

    const handleDelete = async (username) => {
        if (!window.confirm('Are you sure you want to remove this user?')) return;
        try {
            await api.delete(`/attendance/users/${username}/`);
            setUsers(users.filter(u => u.username !== username));
        } catch (err) {
            alert('Failed to delete user');
        }
    };

    const filteredUsers = (users || []).filter(u =>
        u?.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) return (
        <div className="flex h-64 items-center justify-center">
            <div className="text-xl text-muted-foreground font-medium animate-pulse">Loading Users...</div>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-display font-black text-foreground leading-tight tracking-tight uppercase">Registry</h2>
                    <p className="text-xs text-muted-foreground mt-1 font-bold uppercase tracking-widest opacity-70">
                        {activeRole} Database • {users.length} Records
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    {user?.role === 1 && (
                        <Link
                            to="/admins/add"
                            className="flex items-center gap-2 px-4 py-2 bg-secondary text-foreground hover:bg-secondary/80 rounded-md text-xs font-black uppercase tracking-widest transition-all border border-border"
                        >
                            <UserPlus size={14} /> Add Admin
                        </Link>
                    )}
                    <Link
                        to="/users/add"
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:opacity-90 rounded-md text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-primary/20"
                    >
                        <UserPlus size={14} /> Enrol User
                    </Link>
                </div>
            </div>

            {user?.role === 1 && (
                <div className="flex gap-2 p-1 bg-secondary/50 rounded-lg w-fit border border-border">
                    {['USER', 'ADMIN'].map((r) => (
                        <button
                            key={r}
                            onClick={() => setActiveRole(r)}
                            className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-md transition-all ${
                                activeRole === r 
                                ? 'bg-card text-primary shadow-sm border border-border' 
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            {r}s
                        </button>
                    ))}
                </div>
            )}

            <div className="bg-card p-4 rounded-lg shadow-sm border border-border">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search size={16} className="text-muted-foreground" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by name or ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 px-4 py-2 bg-secondary/50 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-foreground transition-all"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.length > 0 ? filteredUsers.map((u) => (
                    <div key={u.username} className="bg-card rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md transition-all">
                        <div className="p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-md bg-secondary flex items-center justify-center text-muted-foreground font-bold overflow-hidden">
                                    {u.image_url ? (
                                        <img src={u.image_url} alt={u.username} className="w-full h-full object-cover" />
                                    ) : (
                                        <User size={24} />
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-lg font-bold font-display text-foreground truncate">
                                        {u.username}
                                    </h3>
                                    <p className="text-[10px] font-bold text-primary uppercase tracking-wider">
                                        {roleLabels[u.role] || 'User'}
                                    </p>
                                </div>
                            </div>

                             <div className="flex items-center gap-2 pt-4 border-t border-border">
                                <Link
                                    to={`/users/${u.username}`}
                                    className="flex-1 py-1.5 text-center text-xs font-black uppercase tracking-widest text-foreground bg-secondary hover:bg-secondary/80 rounded-md border border-border transition-colors"
                                >
                                    Details
                                </Link>
                                <button
                                    onClick={() => handleDelete(u.username)}
                                    className="flex items-center justify-center gap-1 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-destructive bg-destructive/10 hover:bg-destructive/20 rounded-md border border-destructive/20 transition-all"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="col-span-full py-12 text-center bg-transparent border-2 border-dashed border-border rounded-lg text-muted-foreground font-medium">
                        No users found
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewUsers;
