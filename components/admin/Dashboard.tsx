import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import ReservationsTab from './ReservationsTab';
import ContactsTab from './ContactsTab';
import NewsletterTab from './NewsletterTab';
import SettingsTab from './SettingsTab';
import BrandingTab from './BrandingTab';

interface DashboardProps {
    username: string;
    onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ username, onLogout }) => {
    const [activeTab, setActiveTab] = useState<'reservations' | 'contacts' | 'newsletter' | 'settings' | 'branding'>('reservations');

    const renderContent = () => {
        switch (activeTab) {
            case 'reservations': return <ReservationsTab />;
            case 'contacts': return <ContactsTab />;
            case 'newsletter': return <NewsletterTab />;
            case 'settings': return <SettingsTab />;
            case 'branding': return <BrandingTab />;
            default: return <ReservationsTab />;
        }
    };

    return (
        <AdminLayout 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            onLogout={onLogout}
            username={username}
        >
            <div className="mb-8">
                <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase mb-2">
                    {activeTab === 'reservations' && 'Reservations Overview'}
                    {activeTab === 'contacts' && 'Contact Inquiries'}
                    {activeTab === 'newsletter' && 'Newsletter Audience'}
                    {activeTab === 'settings' && 'Application Settings'}
                    {activeTab === 'branding' && 'Brand Identity'}
                </h1>
                <p className="text-slate-500 font-medium text-sm">
                    {activeTab === 'branding' 
                        ? 'Customize your brand name, color, and logo – changes apply instantly.'
                        : 'Manage and oversee your rental business operations.'
                    }
                </p>
            </div>
            
            {renderContent()}
        </AdminLayout>
    );
};

export default Dashboard;
