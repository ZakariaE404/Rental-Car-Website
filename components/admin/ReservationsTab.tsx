import React, { useState, useEffect, useMemo } from 'react';

// Define the structure based on database schema
interface Reservation {
    id: number;
    car_name: string;
    start_date: string;
    end_date: string;
    days: number;
    total_price: number;
    payment_method: string;
    user_name: string;
    phone: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    created_at: string;
}

const ReservationsTab: React.FC = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const response = await fetch('/api/admin/get_reservations.php');
            const data = await response.json();
            if (data.success) {
                setReservations(data.data);
            }
        } catch (error) {
            console.error('Error fetching reservations:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusToggle = async (id: number, currentStatus: string) => {
        // Cycle through statuses: pending -> confirmed -> cancelled -> pending
        const newStatus = currentStatus === 'pending' ? 'confirmed' : currentStatus === 'confirmed' ? 'cancelled' : 'pending';
        
        try {
            const response = await fetch('/api/admin/update_status.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status: newStatus }),
            });
            const data = await response.json();
            
            if (data.success) {
                setReservations(prev => prev.map(res => res.id === id ? { ...res, status: newStatus as any } : res));
            } else {
                alert('Failed to update status');
            }
        } catch (error) {
            alert('Error updating status');
        }
    };

    const getBadgeStyle = (status: string) => {
        switch (status) {
            case 'confirmed': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'cancelled': return 'bg-rose-100 text-rose-700 border-rose-200';
            default: return 'bg-orange-100 text-orange-700 border-orange-200';
        }
    };

    const filteredReservations = useMemo(() => {
        return reservations.filter(res => 
            res.user_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            res.phone.includes(searchTerm)
        );
    }, [reservations, searchTerm]);

    const kpis = useMemo(() => {
        const totalBookings = reservations.length;
        const pendingRequests = reservations.filter(r => r.status === 'pending').length;
        const totalRevenue = reservations
            .filter(r => r.status !== 'cancelled')
            .reduce((acc, r) => acc + Number(r.total_price), 0);
        return { totalBookings, pendingRequests, totalRevenue };
    }, [reservations]);

    if (loading) return <div className="p-8 text-center text-slate-500 font-bold">Loading reservations...</div>;

    return (
        <div className="space-y-6">
            {/* KPI Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden group hover:border-amber-200 transition-colors">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-10 -mt-10 group-hover:bg-amber-50 transition-colors"></div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 relative z-10">Total Bookings</p>
                    <h4 className="text-3xl font-black text-slate-900 relative z-10">{kpis.totalBookings}</h4>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden group hover:border-amber-200 transition-colors">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-10 -mt-10 group-hover:bg-orange-50 transition-colors"></div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 relative z-10">Pending Requests</p>
                    <h4 className="text-3xl font-black text-orange-600 relative z-10">{kpis.pendingRequests}</h4>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden group hover:border-amber-200 transition-colors">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-10 -mt-10 group-hover:bg-emerald-50 transition-colors"></div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 relative z-10">Total Revenue (MAD)</p>
                    <h4 className="text-3xl font-black text-emerald-600 relative z-10">{kpis.totalRevenue.toLocaleString()} <span className="text-sm">DH</span></h4>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase">Car Reservations</h3>
                    
                    {/* Search Bar */}
                    <div className="relative w-full sm:w-64">
                        <input 
                            type="text" 
                            placeholder="Search name or phone..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 hover:border-slate-300 transition-all font-medium text-slate-700"
                        />
                        <svg className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                            <tr>
                                <th className="px-6 py-4">ID / Date</th>
                                <th className="px-6 py-4">Client Info</th>
                                <th className="px-6 py-4">Booking Details</th>
                                <th className="px-6 py-4">Financials</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredReservations.length === 0 ? (
                                <tr><td colSpan={6} className="px-6 py-8 text-center text-slate-400 font-medium">No reservations found.</td></tr>
                            ) : (
                                filteredReservations.map((res) => (
                                    <tr key={res.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-black text-slate-900">#{res.id}</div>
                                            <div className="text-xs text-slate-500 font-medium mt-1">{new Date(res.created_at).toLocaleDateString()}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-bold text-slate-900">{res.user_name}</div>
                                            <div className="text-xs text-slate-500 font-medium mt-1">{res.phone}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-black text-amber-600 tracking-tight uppercase text-xs">{res.car_name}</div>
                                            <div className="text-xs text-slate-500 font-bold mt-1">
                                                {res.start_date} → {res.end_date} <br/>
                                                ({res.days} Days)
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-black text-slate-900">{res.total_price} DH</div>
                                            <div className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mt-1">{res.payment_method}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`text-[10px] font-bold uppercase tracking-widest py-1.5 px-3 rounded-md border ${getBadgeStyle(res.status)}`}>
                                                {res.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleStatusToggle(res.id, res.status)}
                                                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-transparent hover:border-indigo-100"
                                                    title="Toggle Status (Pending -> Confirmed -> Cancelled)"
                                                >
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                    </svg>
                                                </button>
                                                
                                                <a 
                                                    href={`https://wa.me/${res.phone.replace(/[^0-9]/g, '')}`} 
                                                    target="_blank" 
                                                    rel="noreferrer"
                                                    className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-transparent hover:border-green-100"
                                                    title="WhatsApp Chat"
                                                >
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                    </svg>
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ReservationsTab;
