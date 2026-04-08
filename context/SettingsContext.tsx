import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AppSettings {
    phone: string;
    email: string;
    brandName: string;
    brandColor: string;
    logoUrl: string;
}

interface SettingsContextType {
    settings: AppSettings;
    loading: boolean;
    refreshSettings: () => Promise<void>;
}

const defaultSettings: AppSettings = {
    phone: '212600000000',
    email: 'contact@prestigeauto.ma',
    brandName: 'prestigeAuto',
    brandColor: '#f59e0b',
    logoUrl: ''
};

const SettingsContext = createContext<SettingsContextType>({
    settings: defaultSettings,
    loading: true,
    refreshSettings: async () => { },
});

export const useSettings = () => useContext(SettingsContext);

/**
 * Convert a hex color to HSL values
 */
function hexToHSL(hex: string): { h: number; s: number; l: number } {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
        r = parseInt(hex.substring(1, 3), 16);
        g = parseInt(hex.substring(3, 5), 16);
        b = parseInt(hex.substring(5, 7), 16);
    }
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

/**
 * Generate color variants from a base hex color and inject as CSS variables.
 * This allows the entire site to dynamically re-theme.
 */
function injectBrandColors(hex: string) {
    const { h, s, l } = hexToHSL(hex);
    const root = document.documentElement;

    // Main brand color
    root.style.setProperty('--brand-color', hex);
    root.style.setProperty('--brand-h', `${h}`);
    root.style.setProperty('--brand-s', `${s}%`);
    root.style.setProperty('--brand-l', `${l}%`);

    // Variants
    root.style.setProperty('--brand-50', `hsl(${h}, ${s}%, ${Math.min(l + 40, 97)}%)`);
    root.style.setProperty('--brand-100', `hsl(${h}, ${s}%, ${Math.min(l + 30, 94)}%)`);
    root.style.setProperty('--brand-200', `hsl(${h}, ${s}%, ${Math.min(l + 20, 88)}%)`);
    root.style.setProperty('--brand-300', `hsl(${h}, ${s}%, ${Math.min(l + 10, 78)}%)`);
    root.style.setProperty('--brand-400', `hsl(${h}, ${s}%, ${Math.min(l + 5, 68)}%)`);
    root.style.setProperty('--brand-500', `hsl(${h}, ${s}%, ${l}%)`);
    root.style.setProperty('--brand-600', `hsl(${h}, ${s}%, ${Math.max(l - 8, 15)}%)`);
    root.style.setProperty('--brand-700', `hsl(${h}, ${s}%, ${Math.max(l - 16, 10)}%)`);
    root.style.setProperty('--brand-800', `hsl(${h}, ${s}%, ${Math.max(l - 24, 8)}%)`);
    root.style.setProperty('--brand-900', `hsl(${h}, ${s}%, ${Math.max(l - 32, 5)}%)`);
    root.style.setProperty('--brand-950', `hsl(${h}, ${s}%, ${Math.max(l - 40, 3)}%)`);

    // RGB for use in rgba()
    const tempEl = document.createElement('div');
    tempEl.style.color = hex;
    document.body.appendChild(tempEl);
    const rgbStr = getComputedStyle(tempEl).color;
    document.body.removeChild(tempEl);
    const match = rgbStr.match(/\d+/g);
    if (match) {
        root.style.setProperty('--brand-rgb', `${match[0]}, ${match[1]}, ${match[2]}`);
    }
}

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<AppSettings>(defaultSettings);
    const [loading, setLoading] = useState(true);

    const fetchSettings = async () => {
        // We no longer fetch from an API
        setLoading(false);
    };

    useEffect(() => {
        // Inject defaults immediately
        injectBrandColors(defaultSettings.brandColor);
        setLoading(false);
    }, []);

    return (
        <SettingsContext.Provider value={{ settings, loading, refreshSettings: fetchSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};
