import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Webcam from 'react-webcam';
import { ArrowLeft, Camera, RefreshCw, CheckCircle, AlertTriangle } from 'lucide-react';
import api from '@/lib/api';

const AddUser = () => {
    const navigate = useNavigate();
    const webcamRef = useRef(null);
    const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 3 });
    const [image, setImage] = useState(null);
    const [isCapturing, setIsCapturing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
        setIsCapturing(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) return setError('Please capture a face scan');
        setError('');
        setIsSubmitting(true);

        try {
            await api.post('/attendance/users/', { ...formData, image_input: image });
            navigate('/users');
        } catch (err) {
            setError(err || 'Failed to enroll user');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-4">
                <Link to="/users" className="text-sm font-bold text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
                    <ArrowLeft size={16} /> BACK TO USER REGISTRY
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Biometric Capture */}
                <div className="md:col-span-4 bg-card p-6 rounded-lg shadow-sm border border-border">
                    <h3 className="text-lg font-bold text-foreground mb-4 text-center">User Biometrics</h3>

                    <div className="relative w-full aspect-square bg-secondary/50 rounded-md border-2 border-dashed border-border overflow-hidden mb-4 group transition-all">
                        {isCapturing ? (
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                className="w-full h-full object-cover"
                            />
                        ) : image ? (
                            <div className="relative w-full h-full">
                                <img src={image} className="w-full h-full object-cover" alt="User" />
                                <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                                    <div className="bg-card rounded-md p-2 shadow-xl border border-border">
                                        <CheckCircle size={32} className="text-primary" />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-muted-foreground group-hover:scale-110 transition-transform">
                                <Camera size={48} className="mb-2 opacity-50" />
                                <span className="font-bold text-xs uppercase tracking-widest">Camera Ready</span>
                            </div>
                        )}
                    </div>

                    {isCapturing ? (
                        <button
                            type="button"
                            onClick={capture}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-md font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20"
                        >
                            <Camera size={18} /> Take Snapshot
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={() => setIsCapturing(true)}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-primary text-primary rounded-md hover:bg-primary/5 font-bold transition-all"
                        >
                            {image ? <RefreshCw size={18} /> : <Camera size={18} />}
                            {image ? 'Retake Photo' : 'Start Camera'}
                        </button>
                    )}
                </div>

                {/* User Details */}
                <div className="md:col-span-8 bg-card p-6 rounded-lg shadow-sm border border-border">
                    <h2 className="text-xl font-bold text-foreground mb-6">Enroll New User</h2>

                    {error && (
                        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md mb-6 text-sm flex items-center gap-2">
                            <AlertTriangle size={18} /> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="sm:col-span-2">
                                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1.5 ml-1">Full Name / Student Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter full name"
                                    className="w-full px-4 py-2.5 bg-secondary/50 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground text-foreground"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1.5 ml-1">Account Password</label>
                                <input
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    className="w-full px-4 py-2.5 bg-secondary/50 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground text-foreground"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-8 py-3 bg-primary text-primary-foreground rounded-md text-sm font-bold hover:opacity-90 transition-all disabled:opacity-70 shadow-lg shadow-primary/20"
                            >
                                {isSubmitting ? 'Enrolling User...' : 'Complete Enrollment'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddUser;
