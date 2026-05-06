import { Link } from 'react-router-dom';
import { Camera, Shield, FileText, Smartphone, Cloud, Lock } from 'lucide-react';
import LandingNavbar from '@/components/LandingNavbar';
import Footer from '@/components/Footer';

const Home = () => {
    return (
        <div className="bg-background min-h-screen flex flex-col transition-all">
            <LandingNavbar />

            <div className="pt-24 pb-12 w-full flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Jumbotron-style Hero */}
                    <div className="bg-card rounded-lg shadow-sm border border-border p-8 md:p-12 mb-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                        <h1 className="text-4xl md:text-5xl font-display font-light text-foreground mb-4">
                            Attendance Management System
                        </h1>
                        <p className="text-xl text-muted-foreground font-light mb-8 max-w-3xl leading-relaxed">
                            A simple, reliable, and secure platform for managing attendance through facial recognition.
                        </p>
                        <hr className="my-8 border-t border-border" />
                        <p className="text-muted-foreground mb-8">
                            Get started by marking your attendance or logging into the portal management area.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/attendance"
                                className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-bold rounded-md text-primary-foreground bg-primary hover:opacity-90 transition-all shadow-lg shadow-primary/20"
                            >
                                Mark Attendance
                            </Link>
                            <Link
                                to="/login"
                                className="inline-flex justify-center items-center px-6 py-3 border border-border text-base font-bold rounded-md text-foreground bg-secondary hover:bg-secondary/80 transition-all"
                            >
                                Portal Login
                            </Link>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div id="features" className="py-12 scroll-mt-24">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-display font-light text-foreground mb-4">Powerful Features</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Discover what makes our system the best choice for your management needs.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <FeatureCard
                                icon={Camera}
                                title="Face Recognition"
                                desc="State-of-the-art biological face detection technology ensures accurate and proxy-proof attendance marking."
                            />
                            <FeatureCard
                                icon={Shield}
                                title="Secure & Private"
                                desc="All biometric data is encrypted and stored securely, complying with standard data protection regulations."
                            />
                            <FeatureCard
                                icon={FileText}
                                title="Automated Reports"
                                desc="Generate comprehensive PDF and CSV reports for daily, weekly, or monthly attendance with a single click."
                            />
                            <FeatureCard
                                icon={Smartphone}
                                title="Mobile Friendly"
                                desc="Responsive design allows admins and users to access the portal from any device, anywhere."
                            />
                            <FeatureCard
                                icon={Cloud}
                                title="Cloud Sync"
                                desc="Real-time synchronization ensures that attendance marked is instantly available to admins."
                            />
                            <FeatureCard
                                icon={Lock}
                                title="Role-Based Access"
                                desc="Strict access controls for Admins and Users to ensure data integrity and security."
                            />
                        </div>
                    </div>

                    {/* About Section */}
                    <div id="about" className="py-12 scroll-mt-24 border-t border-border">
                        <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
                            <div className="p-8 md:p-12">
                                <h2 className="text-3xl font-display font-bold text-foreground mb-6 text-center">About the Project</h2>
                                <div className="max-w-none text-muted-foreground">
                                    <p className="mb-4">
                                        The <strong>Attendance Management System</strong> is a cutting-edge solution designed to modernize the traditional attendance tracking process.
                                    </p>
                                    <p className="mb-4">
                                        Developed by <strong>Neuro Kode's</strong>, this system leverages advanced computer vision and machine learning technologies to identify users via facial recognition.
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-8 mt-8">
                                        <div className="p-6 bg-secondary/50 rounded-lg border border-border">
                                            <h3 className="text-xl font-bold text-foreground mb-4">Our Mission</h3>
                                            <p className="text-sm">
                                                To provide a seamless, efficient, and transparent attendance monitoring experience that saves time and provides real-time insights for administrators.
                                            </p>
                                        </div>
                                        <div className="p-6 bg-secondary/50 rounded-lg border border-border">
                                            <h3 className="text-xl font-bold text-foreground mb-4">Key Technologies</h3>
                                            <ul className="text-sm space-y-1">
                                                <li><strong>Frontend:</strong> React.js, Tailwind CSS, Vite</li>
                                                <li><strong>Backend:</strong> Django REST Framework, Python</li>
                                                <li><strong>AI/ML:</strong> Face Recognition, OpenCV</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

const FeatureCard = ({ icon: Icon, title, desc }) => (
    <div className="bg-card p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-all">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
            <Icon size={24} />
        </div>
        <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
);

export default Home;
