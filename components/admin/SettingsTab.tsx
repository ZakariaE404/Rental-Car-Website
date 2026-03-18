import React, { useState, useEffect } from 'react';
import { useSettings } from '../../context/SettingsContext';

const SettingsTab: React.FC = () => {
    const { settings, refreshSettings } = useSettings();
    const [formData, setFormData] = useState({
        phone: '',
        email: ''
    });
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
    const [loading, setLoading] = useState(false);

    // Initialize form with current settings from context
    useEffect(() => {
        setFormData({
            phone: settings.phone,
            email: settings.email
        });
    }, [settings]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: null, message: '' });

        try {
            const response = await fetch('/api/admin/update_settings.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                setStatus({ type: 'success', message: 'Settings updated successfully!' });
                // Refresh global settings context so other components update instantly
                await refreshSettings();
            } else {
                setStatus({ type: 'error', message: result.message || 'Failed to update settings.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'An error occurred while updating settings.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 max-w-2xl">
            <h2 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Contact Information</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-slate-700 uppercase tracking-widest mb-2">WhatsApp Phone Number</label>
                    <p className="text-xs text-slate-500 mb-3">Enter the number with the country code, without the `+` sign. e.g. `212600000000`</p>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all font-bold text-slate-700"
                        placeholder="212600000000"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 uppercase tracking-widest mb-2">Contact Email Address</label>
                    <p className="text-xs text-slate-500 mb-3">This email will receive all contact form inquiries and booking notifications.</p>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all font-bold text-slate-700"
                        placeholder="contact@example.com"
                        required
                    />
                </div>

                {status.type && (
                    <div className={`p-4 rounded-xl text-sm font-bold ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {status.message}
                    </div>
                )}

                <div className="pt-4 border-t border-slate-100">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-amber-500 hover:bg-amber-600 text-slate-900 hover:text-white font-black py-4 px-8 rounded-xl transition-all duration-300 uppercase tracking-widest text-sm shadow-lg shadow-amber-500/20 active:scale-95 disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : 'Save Settings'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SettingsTab;
