import { useEffect, useState } from 'react';
import { FileText, Briefcase, Eye, Clock } from 'lucide-react';
import { API_URL } from '../../utils/api';
import AnalyticsChart from '../../components/AnalyticsChart';
import SeoStatsCard from '../../components/SeoStatsCard';
import SeoHealthCard from '../../components/SeoHealthCard';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        blogs: 0,
        projects: 0,
        demos: 0,
        leads: 0
    });

    useEffect(() => {
        Promise.all([
            fetch(`${API_URL}/blogs`).then(res => res.json()),
            fetch(`${API_URL}/portfolios`).then(res => res.json()),
            fetch(`${API_URL}/demos`).then(res => res.json()),
            fetch(`${API_URL}/leads`).then(res => res.json())
        ]).then(([blogs, portfolios, demos, leads]) => {
            setStats({
                blogs: Array.isArray(blogs) ? blogs.length : 0,
                projects: Array.isArray(portfolios) ? portfolios.length : 0,
                demos: Array.isArray(demos) ? demos.length : 0,
                leads: Array.isArray(leads) ? leads.length : 0
            });
        }).catch(err => console.error("Failed to fetch stats", err));
    }, []);

    return (
        <div className="space-y-6">

            {/* Analytics Section */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div>
                    <AnalyticsChart />
                </div>
                <div>
                    <SeoHealthCard />
                </div>
            </div>

            <SeoStatsCard />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-slate-500">Total Blogs</p>
                            <h3 className="text-3xl font-bold text-slate-900 mt-2">{stats.blogs}</h3>
                        </div>
                        <div className="p-3 bg-blue-50 text-blue-500 rounded-lg">
                            <FileText className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-slate-500">Total Portfolios</p>
                            <h3 className="text-3xl font-bold text-slate-900 mt-2">{stats.projects}</h3>
                        </div>
                        <div className="p-3 bg-purple-50 text-purple-500 rounded-lg">
                            <Briefcase className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-slate-500">Website Demos</p>
                            <h3 className="text-3xl font-bold text-slate-900 mt-2">{stats.demos}</h3>
                        </div>
                        <div className="p-3 bg-indigo-50 text-indigo-500 rounded-lg">
                            <Eye className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-slate-500">Total Leads</p>
                            <h3 className="text-3xl font-bold text-slate-900 mt-2">{stats.leads}</h3>
                        </div>
                        <div className="p-3 bg-emerald-50 text-emerald-500 rounded-lg">
                            <Clock className="w-6 h-6" />
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default AdminDashboard;
