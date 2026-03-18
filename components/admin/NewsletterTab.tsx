import React, { useState, useEffect } from 'react';

interface Subscriber {
    id: number;
    email: string;
    created_at: string;
}

const NewsletterTab: React.FC = () => {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSubscribers();
    }, []);

    const fetchSubscribers = async () => {
        try {
            const response = await fetch('/api/admin/get_newsletter.php');
            const data = await response.json();
            if (data.success) {
                setSubscribers(data.data);
            }
        } catch (error) {
            console.error('Error fetching subscribers:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleExportCSV = () => {
        if (subscribers.length === 0) return;

        // Simple CSV generation
        const header = "ID,Email,Subscribed On\n";
        const rows = subscribers.map(sub => `${sub.id},${sub.email},${new Date(sub.created_at).toLocaleString()}`).join("\n");
        const csvContent = "data:text/csv;charset=utf-8," + header + rows;

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "newsletter_subscribers.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) return <div className="p-8 text-center text-slate-500 font-bold">Loading subscribers...</div>;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase">Newsletter Subscribers</h3>
                <button
                    onClick={handleExportCSV}
                    disabled={subscribers.length === 0}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-2 px-4 rounded-lg text-xs tracking-widest uppercase transition-colors disabled:opacity-50"
                >
                    Export CSV
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                        <tr>
                            <th className="px-6 py-4 w-20">ID</th>
                            <th className="px-6 py-4">Email Address</th>
                            <th className="px-6 py-4">Subscribed On</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {subscribers.length === 0 ? (
                            <tr><td colSpan={3} className="px-6 py-8 text-center text-slate-400 font-medium">No subscribers found.</td></tr>
                        ) : (
                            subscribers.map((sub) => (
                                <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-400 font-medium">
                                        #{sub.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap font-bold tracking-tight text-slate-900">
                                        {sub.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-500 font-medium">
                                        {new Date(sub.created_at).toLocaleString()}
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

export default NewsletterTab;
