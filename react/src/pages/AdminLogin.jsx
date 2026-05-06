import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/lib/auth/AuthContext';
import { ShieldAlert } from 'lucide-react';

const AdminLogin = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const user = await login(formData.username, formData.password);
            if ([1, 2].includes(user?.role)) {
                navigate('/admin-dashboard');
            } else {
                setError('Access Denied: You do not have Admin privileges.');
            }
        } catch (err) {
            setError(err || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-background p-4 transition-all">
            <div className="w-full max-w-sm bg-card p-8 rounded-lg shadow-sm border border-border">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-destructive/10 rounded-md text-destructive">
                            <ShieldAlert size={32} />
                        </div>
                    </div>
                    <h2 className="text-2xl font-display font-semibold text-foreground">Admin Portal</h2>
                    <p className="text-sm text-muted-foreground mt-1">Authorized Personnel Only</p>
                </div>

                {error && (
                    <div className="mb-6 text-sm text-destructive bg-destructive/10 p-3 rounded-md border border-destructive/20 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1.5 ml-1">
                            Admin Username
                        </label>
                        <input
                            type="text"
                            placeholder="admin"
                            required
                            className="w-full px-4 py-2.5 bg-secondary/50 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-destructive/20 focus:border-destructive transition-all placeholder:text-muted-foreground text-foreground"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1.5 ml-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            required
                            className="w-full px-4 py-2.5 bg-secondary/50 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-destructive/20 focus:border-destructive transition-all placeholder:text-muted-foreground text-foreground"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-foreground text-background rounded-md font-bold hover:opacity-90 transition-all disabled:opacity-70 text-sm shadow-xl"
                    >
                        {loading ? 'Authenticating...' : 'Access Dashboard'}
                    </button>

                    <div className="text-center mt-6">
                        <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground font-medium transition-colors">
                            &larr; Back to User Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
