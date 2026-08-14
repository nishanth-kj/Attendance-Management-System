import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/lib/auth/AuthContext';

const Login = () => {
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
            if (user?.role === 1 || user?.role === 2) {
                navigate('/admin-dashboard');
            } else if (user?.role === 3) {
                navigate('/user-dashboard');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    const fillDemo = (username, password) => {
        setFormData({ username, password });
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-background p-4 transition-all">
            <div className="w-full max-w-sm bg-card p-8 rounded-lg shadow-sm border border-border">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-display font-semibold text-foreground">Welcome Back</h2>
                    <p className="text-sm text-muted-foreground mt-1">Please sign in to continue</p>
                </div>

                {error && (
                    <div className="mb-6 text-sm text-destructive bg-destructive/10 p-3 rounded-md border border-destructive/20 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1.5 ml-1">
                            Username
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            required
                            className="w-full px-5 py-3 bg-secondary/50 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground text-foreground"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-1.5">
                            <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wide ml-1">
                                Password
                            </label>
                        </div>
                        <input
                            type="password"
                            placeholder="••••••••"
                            required
                            className="w-full px-5 py-3 bg-secondary/50 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground text-foreground"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 bg-primary text-primary-foreground rounded-md font-bold hover:opacity-90 focus:ring-4 focus:ring-primary/20 transition-all disabled:opacity-70 text-sm shadow-lg shadow-primary/20"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>

                    <div className="text-center mt-6">
                        <Link to="/signup" className="text-sm text-muted-foreground hover:text-primary font-medium transition-colors">
                            First time here? <span className="underline decoration-border hover:decoration-primary">Create an account</span>
                        </Link>
                    </div>

                    {/* Demo Accounts */}
                    <div className="mt-8 pt-6 border-t border-border">
                        <p className="text-[10px] text-center text-muted-foreground font-bold uppercase tracking-wider mb-3">
                            Click to Auto-Fill Demo
                        </p>
                        <div className="flex justify-center gap-2">
                            <button
                                type="button"
                                onClick={() => fillDemo('admin', 'admin')}
                                className="px-4 py-2 text-xs font-medium text-foreground bg-secondary hover:bg-secondary/80 border border-border rounded-md transition-colors"
                            >
                                Super Admin
                            </button>
                            <button
                                type="button"
                                onClick={() => fillDemo('ADMIN_user', 'ADMIN123')}
                                className="px-4 py-2 text-xs font-medium text-foreground bg-secondary hover:bg-secondary/80 border border-border rounded-md transition-colors"
                            >
                                Admin
                            </button>
                            <button
                                type="button"
                                onClick={() => fillDemo('User_user', 'User123')}
                                className="px-4 py-2 text-xs font-medium text-foreground bg-secondary hover:bg-secondary/80 border border-border rounded-md transition-colors"
                            >
                                User
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
