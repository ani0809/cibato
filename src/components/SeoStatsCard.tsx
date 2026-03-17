import { useEffect, useState } from 'react';
import { ExternalLink, RefreshCw, TrendingUp, TrendingDown, Search, BarChart2, Hash, MapPin } from 'lucide-react';
import { API_URL } from '../utils/api';

const SeoStatsCard = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/analytics/dashboard?t=${Date.now()}`);
            const json = await res.json();

            if (!res.ok) {
                throw new Error(json.message || 'Failed to load SEO stats');
            }

            setData(json);
            setLastUpdated(new Date());
        } catch (err: any) {
            console.error("SEO Stats Error", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading && !data) return <div className="h-48 bg-slate-50 rounded-xl animate-pulse border border-slate-200"></div>;
    if (error) return null; // Hide if error to avoid clutter, or show minimal error
    if (!data) return null;

    const calcChange = (curr: number, prev: number) => {
        if (!prev) return 100;
        return ((curr - prev) / prev) * 100;
    };

    const stats = [
        {
            label: 'Search Traffic',
            value: data.stats?.clicks?.current || 0,
            prev: data.stats?.clicks?.prev || 0,
            format: (n: number) => n.toLocaleString(),
            icon: Search,
            color: 'text-blue-500',
            bg: 'bg-blue-50'
        },
        {
            label: 'Total Impressions',
            value: data.stats?.impressions?.current || 0,
            prev: data.stats?.impressions?.prev || 0,
            format: (n: number) => n.toLocaleString(),
            icon: BarChart2,
            color: 'text-purple-500',
            bg: 'bg-purple-50'
        },
        {
            label: 'Total Keywords',
            value: data.stats?.keywords?.current || 0,
            prev: data.stats?.keywords?.prev || 0,
            format: (n: number) => n.toLocaleString(),
            icon: Hash,
            color: 'text-emerald-500',
            bg: 'bg-emerald-50'
        },
        {
            label: 'Average Position',
            value: data.stats?.position?.current || 0,
            prev: data.stats?.position?.prev || 0,
            format: (n: number) => n.toFixed(1),
            icon: MapPin,
            color: 'text-orange-500',
            bg: 'bg-orange-50',
            inverse: true
        }
    ];

    return (
        <div className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-lg font-bold text-slate-800">SEO Overview</h2>
                    <p className="text-xs text-slate-500">Search Console Performance (Last 28 Days)</p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={fetchData}
                        disabled={loading}
                        className={`p-1.5 hover:bg-slate-100 rounded-md transition-all text-slate-400 hover:text-cyan-600 ${loading ? 'animate-spin' : ''}`}
                    >
                        <RefreshCw className="w-4 h-4" />
                    </button>
                    <a href="https://search.google.com/search-console" target="_blank" rel="noreferrer" className="text-xs font-bold text-slate-600 hover:text-cyan-600 flex items-center gap-1 bg-slate-100 px-3 py-1.5 rounded-lg transition-colors">
                        Open GSC <ExternalLink className="w-3 h-3" />
                    </a>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => {
                    const change = calcChange(stat.value, stat.prev);
                    const isGood = stat.inverse ? change <= 0 : change >= 0;
                    const Icon = stat.icon;

                    return (
                        <div key={idx} className="bg-slate-50/50 rounded-xl p-4 border border-slate-100">
                            <div className="flex justify-between items-start mb-2">
                                <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <span className={`flex items-center text-xs font-bold ${isGood ? 'text-green-600' : 'text-red-500'}`}>
                                    {isGood ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                                    {Math.abs(change).toFixed(1)}%
                                </span>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-800">{stat.format(stat.value)}</h3>
                                <p className="text-xs font-medium text-slate-500 mt-1">{stat.label}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SeoStatsCard;
