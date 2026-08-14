import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Webcam from 'react-webcam';
import { ArrowLeft, Camera, RefreshCw, CheckCircle, AlertTriangle, ShieldCheck } from 'lucide-react';
import api from '@/lib/api';

const AddAdmin = () => {
    const navigate = useNavigate();
    const webcamRef = useRef(null);
    const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 2 });
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
        if (!image) return setError('Please capture a face scan for authentication');
        setError('');
        setIsSubmitting(true);

        try {
            await api.post('/attendance/users/', { ...formData, image_input: image });
            navigate('/users');
        } catch (err) {
            setError(err || 'Failed to register administrator');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-4">
                <Link to="/users" className="text-sm font-bold text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
                    <ArrowLeft size={16} /> BACK TO STAFF REGISTRY
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Biometric Capture */}
                <div className="md:col-span-4 bg-card p-8 rounded-lg shadow-xl border border-border relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                    <div className="flex items-center gap-2 mb-6 justify-center">
                        <ShieldCheck className="text-primary" size={20} />
                        <h3 className="text-lg font-bold text-foreground text-center">Admin Biometrics</h3>
                    </div>

                    <div className="relative w-full aspect-square bg-secondary/50 rounded-md border-2 border-dashed border-border overflow-hidden mb-6 group transition-all">
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
                                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center backdrop-blur-[2px]">
                                    <div className="bg-card rounded-md p-3 shadow-2xl border border-border scale-110">
                                        <CheckCircle size={32} className="text-primary" />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-muted-foreground group-hover:scale-110 transition-transform duration-500">
                                <Camera size={48} className="mb-3 opacity-30" />
                                <span className="font-black text-[10px] uppercase tracking-[0.3em]">System Ready</span>
                            </div>
                        )}
                    </div>

                    {isCapturing ? (
                        <button
                            type="button"
                            onClick={capture}
                            className="w-full flex items-center justify-center gap-2 px-4 py-4 bg-primary text-primary-foreground rounded-md font-black uppercase tracking-widest text-xs hover:opacity-90 transition-all shadow-lg shadow-primary/30"
                        >
                            Capture Identity
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={() => setIsCapturing(true)}
                            className="w-full flex items-center justify-center gap-2 px-4 py-4 border-2 border-primary text-primary rounded-md hover:bg-primary/5 font-black uppercase tracking-widest text-xs transition-all"
                        >
                            {image ? <RefreshCw size={18} /> : <Camera size={18} />}
                            {image ? 'Reset Scan' : 'Initialize Camera'}
                        </button>
                    )}
                </div>

                {/* Admin Details */}
                <div className="md:col-span-8 bg-card p-8 rounded-lg shadow-sm border border-border">
                    <div className="mb-8">
                        <h2 className="text-3xl font-display font-bold text-foreground">Register Administrator</h2>
                        <p className="text-muted-foreground text-sm mt-1">Configure elevated access for a new staff member</p>
                    </div>

                    {error && (
                        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-5 py-4 rounded-md mb-8 text-sm flex items-center gap-3">
                            <AlertTriangle size={20} /> <span className="font-bold">{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="sm:col-span-2">
                                <label className="block text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-2 ml-1">Administrator Username</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter admin identifier"
                                    className="w-full px-5 py-3.5 bg-secondary/30 border border-border rounded-md text-sm focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-bold"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-2 ml-1">Temporary Password</label>
                                <input
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    className="w-full px-5 py-3.5 bg-secondary/30 border border-border rounded-md text-sm focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-bold"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="pt-6 border-t border-border">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-12 py-4 bg-primary text-primary-foreground rounded-md text-sm font-black uppercase tracking-widest hover:opacity-90 transition-all disabled:opacity-50 shadow-2xl shadow-primary/40"
                            >
                                {isSubmitting ? 'Processing...' : 'Authorize Admin'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddAdmin;
