const Footer = () => {
    return (
        <footer className="bg-card border-t border-border mt-auto transition-all">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-center md:text-left">
                        <span className="font-bold text-foreground font-display tracking-tight">Attendance Management System</span>
                        <p className="text-sm text-muted-foreground mt-1">
                            &copy; {new Date().getFullYear()} All rights reserved. <span className="text-primary font-bold ml-1">@ Neuro Kode's</span>
                        </p>
                    </div>
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
                        <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
