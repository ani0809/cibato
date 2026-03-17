import { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle, AlertTriangle, RefreshCw, ChevronRight, Activity } from 'lucide-react';
import { API_URL } from '../utils/api';

const SeoHealthCard = () => {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchHealth = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/seo-content/analyze`);
            const json = await res.json();
            setStats(json);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHealth();
    }, []);

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-500';
        if (score >= 50) return 'text-orange-500';
        return 'text-red-500';
    };

    const getScoreDisk = (score: number) => {
        if (score >= 80) return 'border-green-500';
        if (score >= 50) return 'border-orange-500';
        return 'border-red-500';
    };

    if (loading) return <div className="h-64 bg-slate-50 rounded-xl animate-pulse border border-slate-200" />;

    return (
        <div className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden mb-8 flex flex-col md:flex-row">
            {/* Score Section */}
            <div className="p-8 md:w-1/3 border-b md:border-b-0 md:border-r border-slate-100 flex flex-col items-center justify-center text-center bg-slate-50/30">
                <div className="mb-4 relative">
                    <div className={`w-32 h-32 rounded-full border-8 ${getScoreDisk(stats?.score || 0)} flex items-center justify-center bg-white shadow-sm`}>
                        <span className={`text-4xl font-black ${getScoreColor(stats?.score || 0)}`}>{stats?.score || 0}</span>
                    </div>
                    <div className="absolute -bottom-2 right-0 bg-white p-1 rounded-full shadow-md border border-slate-100">
                        {stats?.score >= 80 ? (
                            <CheckCircle className="w-6 h-6 text-green-500" />
                        ) : (
                            <AlertTriangle className="w-6 h-6 text-orange-500" />
                        )}
                    </div>
                </div>
                <h3 className="text-lg font-bold text-slate-800">Site Health</h3>
                <p className="text-sm text-slate-500 mt-1">Based on {stats?.totalChecked || 0} pages/posts</p>
                <button
                    onClick={fetchHealth}
                    className="mt-4 text-xs font-bold text-cyan-600 hover:text-cyan-700 flex items-center gap-1 bg-cyan-50 px-3 py-1.5 rounded-lg transition-colors"
                >
                    <RefreshCw className="w-3 h-3" /> Re-Scan
                </button>
            </div>

            {/* Issues Section */}
            <div className="p-6 md:w-2/3">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-slate-700 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-cyan-500" />
                        Analysis Report
                    </h3>
                    <span className="text-xs font-medium text-slate-400">
                        {stats?.issues?.length || 0} Issues Found
                    </span>
                </div>

                <div className="h-48 overflow-y-auto pr-2 space-y-3 scrollbar-thin scrollbar-thumb-slate-200">
                    {stats?.issues?.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400">
                            <CheckCircle className="w-8 h-8 text-green-400 mb-2" />
                            <p className="text-sm">Great job! No critical issues found.</p>
                        </div>
                    ) : (
                        stats?.issues?.map((issue: any, idx: number) => (
                            <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                                {issue.type === 'critical' ? (
                                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                                ) : (
                                    <AlertTriangle className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                                )}
                                <div>
                                    <p className={`text-xs font-bold mb-0.5 ${issue.type === 'critical' ? 'text-red-600' : 'text-orange-600'}`}>
                                        {issue.type === 'critical' ? 'Critical Issue' : 'Warning'}
                                    </p>
                                    <p className="text-sm text-slate-600 leading-snug">{issue.message}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default SeoHealthCard;
