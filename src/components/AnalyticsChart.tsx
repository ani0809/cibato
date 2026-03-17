import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ArrowUp, ArrowDown, ExternalLink, RefreshCw } from 'lucide-react';
import { API_URL } from '../utils/api';

const AnalyticsChart = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Random query param to prevent caching
            const res = await fetch(`${API_URL}/analytics/dashboard?t=${Date.now()}`);
            const json = await res.json();

            if (!res.ok) {
                throw new Error(json.message || 'Failed to load analytics');
            }

            setData(json);
            setLastUpdated(new Date());
        } catch (err: any) {
            console.error("Analytics Error", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading && !data) return <div className="h-64 bg-slate-50 rounded-xl animate-pulse border border-slate-200"></div>;

    if (error) {
        return (
            <div className="bg-red-50 p-6 rounded-xl border border-red-100 mb-6">
                <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-bold text-red-600 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        Analytics Error
                    </h3>
                    <p className="text-sm text-slate-500">{error}</p>
                    <button onClick={fetchData} className="text-sm font-semibold text-red-700 hover:underline text-left">
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!data) return null;

    // Helper: Calculate Percentage Change
    const calcChange = (curr: number, prev: number) => {
        if (!prev) return 100;
        return ((curr - prev) / prev) * 100;
    };

    // Helper: Format Time
    const formatTime = (seconds: number) => {
        if (seconds < 60) return `${Math.round(seconds)}s`;
        const mins = Math.floor(seconds / 60);
        const secs = Math.round(seconds % 60);
        return `${mins}m ${secs}s`;
    };

    const stats = [
        {
            label: 'Total Users',
            value: data.stats?.users?.current || 0,
            prev: data.stats?.users?.prev || 0,
            format: (n: number) => n.toLocaleString(),
            suffix: ''
        },
        {
            label: 'Avg. Time',
            value: data.stats?.time?.current || 0,
            prev: data.stats?.time?.prev || 0,
            format: formatTime,
            suffix: ''
        },
        {
            label: 'Impressions',
            value: data.stats?.impressions?.current || 0,
            prev: data.stats?.impressions?.prev || 0,
            format: (n: number) => n.toLocaleString(),
            suffix: ''
        },
        {
            label: 'Clicks',
            value: data.stats?.clicks?.current || 0,
            prev: data.stats?.clicks?.prev || 0,
            format: (n: number) => n.toLocaleString(),
            suffix: ''
        }
    ];

    return (
        <div className="bg-white border border-slate-200 shadow-sm font-sans rounded-xl overflow-hidden mb-8">
            {/* Compact Header */}
            <div className="px-5 py-3 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <h2 className="text-sm font-bold text-slate-700">Site Kit Summary</h2>
                    </div>
                    {lastUpdated && (
                        <span className="text-[10px] text-slate-400 font-medium ml-2">
                            Live from Google • Updated {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchData}
                        disabled={loading}
                        className={`p-1.5 hover:bg-white rounded-md transition-all text-slate-400 hover:text-cyan-600 ${loading ? 'animate-spin' : ''}`}
                        title="Refresh Data"
                    >
                        <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                    <a href="https://search.google.com/search-console" target="_blank" rel="noreferrer" className="text-[10px] font-bold text-cyan-600 hover:text-cyan-700 flex items-center gap-1 bg-cyan-50 px-2 py-1 rounded-md">
                        Open Search Console <ExternalLink className="w-3 h-3" />
                    </a>
                </div>
            </div>

            <div className="p-5">
                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 pb-6 border-b border-slate-50">
                    {stats.map((stat: any, idx) => {
                        const change = calcChange(stat.value, stat.prev);
                        // For Position (inverse), negative change (drop in value) is GOOD (green).
                        // For others, positive change is GOOD (green).
                        const isGood = stat.inverse ? change <= 0 : change >= 0;

                        return (
                            <div key={idx} className="pl-2 border-l-2 border-slate-100 first:border-l-0">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{stat.label}</p>
                                <div className="flex items-baseline gap-2">
                                    <h3 className="text-xl font-bold text-slate-800">
                                        {stat.format(stat.value)}
                                        <span className="text-xs font-normal text-slate-400 ml-0.5">{stat.suffix}</span>
                                    </h3>
                                    <span className={`text-[10px] font-bold ${isGood ? 'text-green-600' : 'text-red-500'}`}>
                                        {stat.inverse ? (change > 0 ? 'avg ↓' : 'avg ↑') : (change >= 0 ? '↑' : '↓')} {Math.abs(change).toFixed(1)}%
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Main Content: Split View */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-8">
                    {/* Chart Section */}
                    <div className="lg:col-span-2 mb-6 lg:mb-0">
                        <div className="flex justify-between items-center mb-3">
                            <p className="text-xs font-bold text-slate-600">Audience Growth (28 Days)</p>
                        </div>
                        <div className="h-40 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data.chart}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#94a3b8', fontSize: 10 }}
                                        dy={10}
                                        minTickGap={30}
                                    />
                                    <YAxis hide />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px' }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="current"
                                        stroke="#3b82f6"
                                        strokeWidth={2}
                                        dot={false}
                                        activeDot={{ r: 4, strokeWidth: 0 }}
                                        name="Visitors"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Top Content Table */}
                    <div className="lg:col-span-1 lg:border-l lg:border-slate-100 lg:pl-8">
                        <p className="text-xs font-bold text-slate-600 mb-3">Top Pages</p>
                        <div className="flex flex-col gap-3">
                            {data.content.slice(0, 4).map((page: any, idx: number) => (
                                <div key={idx} className="flex justify-between items-center group">
                                    <div className="flex gap-2 items-center overflow-hidden">
                                        <span className="text-[10px] font-bold text-slate-300 w-3 shrink-0">{idx + 1}</span>
                                        <a href={page.path} target="_blank" rel="noreferrer" className="text-xs font-medium text-slate-600 hover:text-blue-500 truncate block transition-colors" title={page.title}>
                                            {page.title}
                                        </a>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded ml-2">
                                        {page.views.toLocaleString()}
                                    </span>
                                </div>
                            ))}
                            {data.content.length === 0 && (
                                <p className="text-xs text-slate-400 italic">No data available</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsChart;
