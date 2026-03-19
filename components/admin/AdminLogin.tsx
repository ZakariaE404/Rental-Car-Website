import React, { useState } from 'react';
import { callApi } from '../../lib/api';

interface AdminLoginProps {
    onLoginSuccess: (username: string) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const data = await callApi('/admin/login.php', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
            });

            if (data.success) {
                onLoginSuccess(data.user.username);
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="bg-white p-10 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] w-full max-w-md border border-slate-100">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase mb-2">Admin Portal</h1>
                    <p className="text-slate-500 text-sm font-medium">Authentication Required</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm font-bold rounded-xl border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all font-bold text-slate-900"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all font-bold text-slate-900"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-slate-900 hover:bg-amber-500 text-white font-black py-4 rounded-xl transition-all duration-300 uppercase tracking-widest text-sm mt-4 disabled:opacity-50"
                    >
                        {loading ? 'Authenticating...' : 'Secure Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
