import React, { useState, useEffect, useRef } from 'react';
import { useSettings } from '../../context/SettingsContext';

const PRESET_COLORS = [
    { name: 'Amber Gold', value: '#f59e0b' },
    { name: 'Royal Blue', value: '#3b82f6' },
    { name: 'Emerald', value: '#10b981' },
    { name: 'Rose', value: '#f43f5e' },
    { name: 'Violet', value: '#8b5cf6' },
    { name: 'Cyan', value: '#06b6d4' },
    { name: 'Orange', value: '#f97316' },
    { name: 'Teal', value: '#14b8a6' },
    { name: 'Fuchsia', value: '#d946ef' },
    { name: 'Lime', value: '#84cc16' },
    { name: 'Sky', value: '#0ea5e9' },
    { name: 'Red', value: '#ef4444' },
];

const BrandingTab: React.FC = () => {
    const { settings, refreshSettings } = useSettings();
    const [brandName, setBrandName] = useState('');
    const [brandColor, setBrandColor] = useState('#f59e0b');
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
    const [saving, setSaving] = useState(false);
    const [uploadingLogo, setUploadingLogo] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setBrandName(settings.brandName);
        setBrandColor(settings.brandColor);
        if (settings.logoUrl) {
            setLogoPreview(settings.logoUrl);
        }
    }, [settings]);

    const handleLogoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate
        const allowed = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/webp'];
        if (!allowed.includes(file.type)) {
            setStatus({ type: 'error', message: 'Invalid file type. Allowed: PNG, JPG, SVG, WebP' });
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setStatus({ type: 'error', message: 'File too large. Maximum: 5MB' });
            return;
        }

        setLogoFile(file);
        const reader = new FileReader();
        reader.onload = (ev) => {
            setLogoPreview(ev.target?.result as string);
        };
        reader.readAsDataURL(file);
        setStatus({ type: null, message: '' });
    };

    const handleUploadLogo = async () => {
        if (!logoFile) return;
        setUploadingLogo(true);
        setStatus({ type: null, message: '' });

        const formData = new FormData();
        formData.append('logo', logoFile);

        try {
            const response = await fetch('/api/admin/upload_logo.php', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            if (result.success) {
                setStatus({ type: 'success', message: 'Logo uploaded successfully!' });
                setLogoFile(null);
                await refreshSettings();
            } else {
                setStatus({ type: 'error', message: result.message || 'Upload failed.' });
            }
        } catch (err) {
            setStatus({ type: 'error', message: 'Network error during upload.' });
        } finally {
            setUploadingLogo(false);
        }
    };

    const handleSaveBranding = async () => {
        if (!brandName.trim()) {
            setStatus({ type: 'error', message: 'Brand name cannot be empty.' });
            return;
        }
        setSaving(true);
        setStatus({ type: null, message: '' });

        try {
            // 1. Upload Logo if a new one is selected
            let uploadSuccess = true;
            if (logoFile) {
                const formData = new FormData();
                formData.append('logo', logoFile);
                const logoRes = await fetch('/api/admin/upload_logo.php', {
                    method: 'POST',
                    body: formData,
                });
                const logoData = await logoRes.json();
                if (logoData.success) {
                    setLogoFile(null); // Clear selected file after success
                } else {
                    uploadSuccess = false;
                    setStatus({ type: 'error', message: logoData.message || 'Logo upload failed.' });
                }
            }

            // 2. Save Brand Name and Color
            if (uploadSuccess) {
                const response = await fetch('/api/admin/update_branding.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        brand_name: brandName.trim(),
                        brand_color: brandColor,
                    }),
                });
                const result = await response.json();
                
                if (result.success) {
                    setStatus({ type: 'success', message: 'Branding updated successfully! Changes are live.' });
                    await refreshSettings();
                } else {
                    setStatus({ type: 'error', message: result.message || 'Failed to save text settings.' });
                }
            }
        } catch (err) {
            setStatus({ type: 'error', message: 'Network error while saving.' });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-8 max-w-3xl">
            {/* Brand Name Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: brandColor }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">Brand Name</h2>
                        <p className="text-xs text-slate-500">This name appears across the entire website</p>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 uppercase tracking-widest mb-2">Brand / Company Name</label>
                    <input
                        type="text"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all font-bold text-slate-700 text-lg"
                        placeholder="e.g. prestigeAuto"
                    />
                    <p className="text-xs text-slate-400 mt-2">Preview: <span className="font-bold text-slate-700">{brandName || 'prestigeAuto'}</span></p>
                </div>
            </div>

            {/* Brand Color Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: brandColor }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">Main Color</h2>
                        <p className="text-xs text-slate-500">The primary accent color used across the website</p>
                    </div>
                </div>

                {/* Color Picker & Hex Input */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                        <input
                            type="color"
                            value={brandColor}
                            onChange={(e) => setBrandColor(e.target.value)}
                            className="w-16 h-16 rounded-xl cursor-pointer border-2 border-slate-200 hover:border-slate-300 transition-colors"
                            style={{ backgroundColor: brandColor }}
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-bold text-slate-700 uppercase tracking-widest mb-2">Hex Color Code</label>
                        <input
                            type="text"
                            value={brandColor}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
                                    setBrandColor(val);
                                }
                            }}
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all font-mono font-bold text-slate-700"
                            placeholder="#f59e0b"
                        />
                    </div>
                </div>

                {/* Preset Colors */}
                <div>
                    <label className="block text-sm font-bold text-slate-700 uppercase tracking-widest mb-3">Quick Presets</label>
                    <div className="grid grid-cols-6 gap-3">
                        {PRESET_COLORS.map((preset) => (
                            <button
                                key={preset.value}
                                onClick={() => setBrandColor(preset.value)}
                                className={`group relative flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-all hover:scale-105 active:scale-95 ${brandColor === preset.value ? 'border-slate-900 shadow-lg' : 'border-transparent hover:border-slate-200'
                                    }`}
                                title={preset.name}
                            >
                                <div
                                    className="w-10 h-10 rounded-lg shadow-inner transition-shadow group-hover:shadow-md"
                                    style={{ backgroundColor: preset.value }}
                                />
                                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">{preset.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Live Preview */}
                <div className="mt-8 p-6 rounded-2xl border border-slate-100 bg-slate-50">
                    <label className="block text-sm font-bold text-slate-700 uppercase tracking-widest mb-4">Live Preview</label>
                    <div className="flex items-center gap-4 flex-wrap">
                        <div className="px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest text-white shadow-lg" style={{ backgroundColor: brandColor }}>
                            Button Style
                        </div>
                        <div className="px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest border-2" style={{ borderColor: brandColor, color: brandColor }}>
                            Outline
                        </div>
                        <span className="font-bold text-lg" style={{ color: brandColor }}>{brandName || 'prestigeAuto'} ©</span>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: brandColor }} />
                            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: brandColor }}>Active</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Logo Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: brandColor }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">Brand Logo</h2>
                        <p className="text-xs text-slate-500">Upload your company logo (PNG, JPG, SVG, WebP — max 5MB)</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-start gap-8">
                    {/* Current Logo Preview */}
                    <div className="w-40 h-40 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center bg-slate-50 overflow-hidden shrink-0">
                        {logoPreview ? (
                            <img src={logoPreview} alt="Brand Logo" className="w-full h-full object-contain p-3" />
                        ) : (
                            <div className="text-center p-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10 text-slate-300 mx-auto mb-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                                </svg>
                                <p className="text-[10px] font-bold text-slate-400 uppercase">No Logo</p>
                            </div>
                        )}
                    </div>

                    {/* Upload Controls */}
                    <div className="flex-1 space-y-4">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/png,image/jpeg,image/jpg,image/svg+xml,image/webp"
                            onChange={handleLogoSelect}
                            className="hidden"
                        />
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all text-sm uppercase tracking-widest border border-slate-200"
                        >
                            Choose File
                        </button>
                        {logoFile && (
                            <div className="space-y-3">
                                <p className="text-sm text-slate-600">
                                    <span className="font-bold">Selected:</span> {logoFile.name} ({(logoFile.size / 1024).toFixed(1)}KB)
                                </p>
                            </div>
                        )}
                        <p className="text-xs text-slate-400 mt-4">
                            Recommended: Square image, at least 200×200px. SVG preferred for best quality.
                        </p>
                    </div>
                </div>
            </div>

            {/* Status Message */}
            {status.type && (
                <div className={`p-4 rounded-xl text-sm font-bold ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {status.message}
                </div>
            )}

            {/* Save Button */}
            <div className="flex items-center gap-4">
                <button
                    onClick={handleSaveBranding}
                    disabled={saving}
                    className="px-10 py-4 text-white font-black rounded-xl transition-all uppercase tracking-widest text-sm shadow-lg active:scale-95 disabled:opacity-50 hover:opacity-90"
                    style={{ backgroundColor: brandColor }}
                >
                    {saving ? 'Saving...' : 'Save Branding'}
                </button>
                <p className="text-xs text-slate-400">Changes will be reflected immediately across the entire website.</p>
            </div>
        </div>
    );
};

export default BrandingTab;
