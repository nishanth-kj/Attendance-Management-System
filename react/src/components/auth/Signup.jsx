import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '@/lib/api';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 2,
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await api.post('/accounts/register/', formData);
            navigate('/login');
        } catch (err) {
            setError(err || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-background p-4 transition-all">
            <div className="w-full max-w-sm bg-card p-8 rounded-lg shadow-sm border border-border">
                <h2 className="text-2xl font-display font-semibold text-center mb-8 text-foreground">Create Account</h2>

                {error && (
                    <div className="mb-6 text-sm text-destructive bg-destructive/10 p-3 rounded-md border border-destructive/20 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Role Selection */}
                    <div>
                        <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2 ml-1">Select Role</label>
                        <div className="flex rounded-md shadow-sm overflow-hidden border border-border">
                            {[2, 3].map((role) => {
                                const labels = { 2: 'Admin', 3: 'User' };
                                const isSelected = formData.role === role;
                                return (
                                    <button
                                        key={role}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, role })}
                                        className={`flex-1 py-2.5 text-xs font-bold transition-all ${isSelected
                                                ? 'bg-primary text-primary-foreground'
                                                : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
                                            } focus:outline-none`}
                                    >
                                        {labels[role]}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1.5 ml-1">Username</label>
                        <input
                            type="text"
                            required
                            placeholder="DataEnterr01"
                            className="w-full px-4 py-2.5 bg-secondary/50 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground text-foreground"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1.5 ml-1">Email Address</label>
                        <input
                            type="email"
                            required
                            placeholder="user@example.com"
                            className="w-full px-4 py-2.5 bg-secondary/50 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground text-foreground"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1.5 ml-1">Password</label>
                        <input
                            type="password"
                            required
                            placeholder="••••••••"
                            className="w-full px-4 py-2.5 bg-secondary/50 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground text-foreground"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 mt-4 bg-primary text-primary-foreground rounded-md text-sm font-bold hover:opacity-90 transition-all disabled:opacity-70 shadow-lg shadow-primary/20"
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>

                    <div className="text-center mt-6">
                        <Link to="/login" className="text-sm text-muted-foreground hover:text-primary font-medium transition-colors">
                            Already have an account? <span className="underline decoration-border hover:decoration-primary">Sign In</span>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
