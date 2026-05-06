import { useState } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { User, Mail, Shield, CreditCard, Building, Phone, MapPin, QrCode } from 'lucide-react';

const Profile = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('details');

    if (!user) return <div className="p-8 text-center">Loading Profile...</div>;

    const roleLabels = { 1: 'Super Admin', 2: 'Admin', 3: 'User' };
    const roleLabel = roleLabels[user.role] || 'User';
    const idLabel = 'Username';
    const idValue = user.username;

    return (
        <div className="max-w-4xl mx-auto space-y-6 transition-all">
            <h1 className="text-2xl font-display font-light text-foreground">My Profile</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* ID Card Column */}
                <div className="md:col-span-1">
                    <div className="bg-card rounded-lg shadow-lg overflow-hidden border border-border relative">
                        {/* ID Card Header */}
                        <div className="h-24 bg-primary relative">
                            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
                                <div className="w-24 h-24 rounded-md border-4 border-card bg-secondary flex items-center justify-center overflow-hidden">
                                    {user.User_image ? (
                                        <img src={user.User_image} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <User size={48} className="text-gray-400" />
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* ID Card Body */}
                        <div className="pt-12 pb-6 px-4 text-center">
                            <h2 className="text-xl font-bold text-foreground font-display">{user.username}</h2>
                            <p className="text-sm font-black text-primary uppercase tracking-widest mb-4">{roleLabel}</p>

                            <div className="grid grid-cols-1 gap-2 text-left text-xs bg-secondary/50 p-3 rounded-md mb-4 border border-border">
                                <div>
                                    <p className="text-muted-foreground font-black uppercase tracking-tighter opacity-50">{idLabel}</p>
                                    <p className="font-bold text-foreground">{idValue}</p>
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <div className="p-2 bg-white rounded-md">
                                    <QrCode size={64} className="text-black" />
                                </div>
                            </div>
                            <p className="text-[10px] text-muted-foreground mt-3 font-mono">{idValue}</p>
                        </div>

                        {/* ID Card Footer */}
                        <div className="bg-secondary/50 px-4 py-3 border-t border-border text-center">
                            <p className="text-[10px] text-muted-foreground uppercase font-black tracking-[0.2em]">
                                Digital Identity
                            </p>
                        </div>
                    </div>
                </div>

                {/* Details Column */}
                <div className="md:col-span-2">
                    <div className="bg-card rounded-lg shadow-sm border border-border min-h-[400px]">
                        <div className="border-b border-border px-6 py-0 flex items-center gap-8">
                            <button
                                onClick={() => setActiveTab('details')}
                                className={`text-sm font-bold pt-5 pb-4 border-b-2 transition-all ${activeTab === 'details' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                PERSONAL DETAILS
                            </button>
                            <button
                                onClick={() => setActiveTab('settings')}
                                className={`text-sm font-bold pt-5 pb-4 border-b-2 transition-all ${activeTab === 'settings' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                ACCOUNT SETTINGS
                            </button>
                        </div>

                        <div className="p-6">
                             {activeTab === 'details' && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                                        <div>
                                            <label className="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1.5 ml-1">Full Name</label>
                                            <div className="flex items-center gap-3 px-4 py-3 bg-secondary/50 rounded-md border border-border text-sm text-foreground font-bold">
                                                <User size={16} className="text-primary" />
                                                {user.username}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1.5 ml-1">Email Address</label>
                                            <div className="flex items-center gap-3 px-4 py-3 bg-secondary/50 rounded-md border border-border text-sm text-foreground font-bold">
                                                <Mail size={16} className="text-primary" />
                                                {user.email || 'No email registered'}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1.5 ml-1">Role & Permissions</label>
                                            <div className="flex items-center gap-3 px-4 py-3 bg-secondary/50 rounded-md border border-border text-sm text-foreground font-bold">
                                                <Shield size={16} className="text-primary" />
                                                {roleLabel}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1.5 ml-1">{idLabel}</label>
                                            <div className="flex items-center gap-3 px-4 py-3 bg-secondary/50 rounded-md border border-border text-sm text-foreground font-bold">
                                                <CreditCard size={16} className="text-primary" />
                                                {idValue}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1.5 ml-1">Contact</label>
                                            <div className="flex items-center gap-3 px-4 py-3 bg-secondary/50 rounded-md border border-border text-sm text-foreground font-bold">
                                                <Phone size={16} className="text-primary" />
                                                +91 98765 43210
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-border">
                                        <label className="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-3 ml-1">Official Address</label>
                                        <div className="flex items-start gap-3 px-4 py-4 bg-secondary/50 rounded-md border border-border text-sm text-foreground font-medium leading-relaxed">
                                            <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
                                            <span>
                                                #123, User Campus Block A,<br />
                                                Campus Grounds,<br />
                                                Bangalore - 560001
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'settings' && (
                                <div className="text-center py-12 text-gray-500">
                                    <Shield size={48} className="mx-auto mb-4 text-gray-300" />
                                    <p>Account Security Settings are managed by Administrator.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
