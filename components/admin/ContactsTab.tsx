import React, { useState, useEffect } from 'react';

interface Contact {
    id: number;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    created_at: string;
}

const ContactsTab: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const response = await fetch('/api/admin/get_contacts.php');
            const data = await response.json();
            if (data.success) {
                setContacts(data.data);
            }
        } catch (error) {
            console.error('Error fetching contacts:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-slate-500 font-bold">Loading messages...</div>;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100">
                <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase">Contact Messages</h3>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                        <tr>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Contact Info</th>
                            <th className="px-6 py-4">Subject</th>
                            <th className="px-6 py-4">Message</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {contacts.length === 0 ? (
                            <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-400 font-medium">No messages found.</td></tr>
                        ) : (
                            contacts.map((contact) => (
                                <tr key={contact.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-500 font-medium">
                                        {new Date(contact.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap font-bold tracking-tight text-slate-900">
                                        {contact.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-col gap-1">
                                            <a href={`mailto:${contact.email}`} className="text-amber-600 hover:text-amber-700 font-bold text-xs">{contact.email}</a>
                                            <a href={`tel:${contact.phone}`} className="text-slate-500 font-medium text-xs">{contact.phone}</a>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-700 font-bold">
                                        {contact.subject}
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 font-medium max-w-xs break-words">
                                        {contact.message}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContactsTab;
