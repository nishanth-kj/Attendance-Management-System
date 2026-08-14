import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sun, Moon, ScanFace } from 'lucide-react';
import { useTheme } from '@/lib/theme/ThemeContext';

const LandingNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="p-1.5 bg-primary/10 rounded-md text-primary group-hover:scale-110 transition-transform">
                                <ScanFace size={24} />
                            </div>
                            <span className="font-bold text-xl text-foreground tracking-tight font-display">
                                Attendance <span className="text-primary">System</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#features" className="text-muted-foreground hover:text-primary font-medium transition-colors">Features</a>
                        <a href="#about" className="text-muted-foreground hover:text-primary font-medium transition-colors">About</a>
                        <Link
                            to="/admin-login"
                            className="text-muted-foreground hover:text-destructive font-medium transition-colors"
                        >
                            Admin
                        </Link>
                        
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-md hover:bg-secondary text-muted-foreground hover:text-primary transition-all"
                            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        >
                            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <Link
                            to="/login"
                            className="px-5 py-2.5 rounded-md bg-primary text-primary-foreground font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20"
                        >
                            Login
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-2">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-md hover:bg-secondary text-muted-foreground"
                        >
                            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-md text-muted-foreground hover:bg-secondary focus:outline-none"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden bg-card border-t border-border absolute w-full shadow-lg transition-all">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        <a
                            href="#features"
                            className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-secondary"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Features
                        </a>
                        <a
                            href="#about"
                            className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-secondary"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            About
                        </a>
                        <Link
                            to="/admin-login"
                            className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-destructive hover:bg-secondary"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Admin Portal
                        </Link>
                        <div className="pt-4 mt-2 border-t border-border">
                            <Link
                                to="/login"
                                className="block w-full text-center px-4 py-2 rounded-md bg-primary text-primary-foreground font-bold hover:opacity-90 transition-all"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default LandingNavbar;
