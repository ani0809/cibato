import { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, FileText, Briefcase, Settings, LogOut, Image,
    Menu, X, ChevronDown, ChevronRight, CheckSquare, Users,
    MessageSquareQuote, Layers, Mail, Monitor, Megaphone, Star, Shield, User, Bell, RefreshCw
} from 'lucide-react';
import SeoHead from '../../components/SeoHead';
import Tooltip from '../../components/ui/Tooltip';
import { API_URL, UPLOAD_URL } from '../../utils/api';
import { useSettings } from '../../context/SettingsContext';

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { settings } = useSettings();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [recentLeads, setRecentLeads] = useState<any[]>([]);

    // Accordion state: stores the label of the currently open menu
    const [activeMenu, setActiveMenu] = useState<string | null>(() => {
        if (location.pathname.startsWith('/admin/blogs')) return 'Posts';
        if (location.pathname.startsWith('/admin/portfolio')) return 'Portfolio';
        if (location.pathname.startsWith('/admin/marketing') || location.pathname.startsWith('/admin/leads')) return 'Marketing';
        if (location.pathname.startsWith('/admin/demos')) return 'Website Demos';
        if (location.pathname.startsWith('/admin/settings') || location.pathname.startsWith('/admin/smtp') || location.pathname.startsWith('/admin/seo-marketing') || location.pathname.startsWith('/admin/menus')) return 'Settings';
        if (location.pathname.startsWith('/admin/awards') || location.pathname.startsWith('/admin/clients') || location.pathname.startsWith('/admin/testimonials')) return 'Social Proof';
        return null;
    });

    const [user, setUser] = useState<any>(null);

    // Fetch notifications (Simulated by fetching recent leads)
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                if (!token) return;

                // Fetch recent leads as "notifications"
                const res = await fetch(`${API_URL}/marketing/leads`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();

                    // Safety check: ensure data is an array
                    if (!Array.isArray(data)) {
                        console.warn('Leads API returned non-array:', data);
                        return;
                    }

                    // Just take the top 5 most recent
                    const recent = data.slice(0, 5).map((l: any) => ({
                        id: l.id,
                        type: 'lead',
                        message: `New Lead: ${l.name}`,
                        time: new Date(l.createdAt || Date.now()).toLocaleTimeString()
                    }));
                    setRecentLeads(recent);
                }
            } catch (e) {
                // Silent fail for notifications
                console.error("Notification fetch error", e);
            }
        };

        if (user) {
            fetchNotifications();
            // Poll every 30 seconds
            const interval = setInterval(fetchNotifications, 30000);
            return () => clearInterval(interval);
        }
    }, [user]);

    useEffect(() => {
        const loadUser = () => {
            const token = localStorage.getItem('adminToken');
            const userStr = localStorage.getItem('adminUser');
            if (!token) {
                navigate('/admin/login');
                return;
            }
            if (userStr) {
                try {
                    setUser(JSON.parse(userStr));
                } catch (e) {
                    localStorage.removeItem('adminUser');
                    navigate('/admin/login');
                }
            }
        };

        loadUser();
        window.addEventListener('userUpdated', loadUser);

        return () => {
            window.removeEventListener('userUpdated', loadUser);
        };
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/admin/login');
    };



    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
        { icon: Image, label: 'Media Library', path: '/admin/media' },
        { icon: FileText, label: 'Pages', path: '/admin/pages' },
        { icon: FileText, label: 'Blogs', path: '/admin/blogs' },
        { icon: Layers, label: 'Services', path: '/admin/services' },
        { icon: Users, label: 'Team', path: '/admin/team' },
        { icon: Briefcase, label: 'Portfolio', path: '/admin/portfolio' },
        { icon: Monitor, label: 'Website Demos', path: '/admin/demos' },
        { icon: Star, label: 'Social Proof', path: '/admin/social-proof' },
        { icon: Megaphone, label: 'Marketing', path: '/admin/marketing' },
        { icon: Menu, label: 'Appearance', path: '/admin/appearance' },
        // Admin Only Items
        ...(user?.role === 'admin' ? [{ icon: Shield, label: 'Users', path: '/admin/users' }] : []),
        { icon: Settings, label: 'Settings', path: '/admin/settings' },
    ];

    const getPageTitle = () => {
        if (location.pathname === '/admin') return 'Dashboard';
        const activeItem = navItems.find(item =>
            item.path !== '/admin' && location.pathname.startsWith(item.path)
        );
        if (activeItem) return activeItem.label;
        if (location.pathname.includes('/new')) return 'Add New';
        if (location.pathname.includes('/edit')) return 'Edit';
        if (location.pathname.startsWith('/admin/awards') || location.pathname.startsWith('/admin/clients') || location.pathname.startsWith('/admin/testimonials')) return 'Social Proof';
        return 'Admin';
    };

    const pageTitle = getPageTitle();

    useEffect(() => {
        if (location.pathname.startsWith('/admin/blogs')) setActiveMenu('Posts');
        else if (location.pathname.startsWith('/admin/portfolio')) setActiveMenu('Portfolio');
        else if (location.pathname.startsWith('/admin/marketing') || location.pathname.startsWith('/admin/leads')) setActiveMenu('Marketing');
        else if (location.pathname.startsWith('/admin/demos')) setActiveMenu('Website Demos');
        else if (location.pathname.startsWith('/admin/settings') || location.pathname.startsWith('/admin/smtp') || location.pathname.startsWith('/admin/seo-marketing') || location.pathname.startsWith('/admin/menus') || location.pathname.startsWith('/admin/redirects') || location.pathname.startsWith('/admin/forms')) setActiveMenu('Settings');
        else if (location.pathname.startsWith('/admin/awards') || location.pathname.startsWith('/admin/clients') || location.pathname.startsWith('/admin/testimonials')) setActiveMenu('Social Proof');
        else setActiveMenu(null);
    }, [location.pathname]);

    const toggleMenu = (menuLabel: string) => {
        setActiveMenu(prev => prev === menuLabel ? null : menuLabel);
    };

    // Calculate Logo URL
    const getLogoUrl = () => {
        if (settings?.systemLogo) {
            return settings.systemLogo.startsWith('http')
                ? settings.systemLogo
                : `${UPLOAD_URL}${settings.systemLogo}`;
        }
        // Fallback provided by user
        return "http://localhost:8000/uploads/Cibato Logo Final White.png";
    };

    const logoSize = settings?.adminLogoSize ? parseInt(settings.adminLogoSize) : 32;

    return (
        <div className="min-h-screen bg-slate-100 flex">
            <SeoHead title={`${pageTitle} - Cibato`} />

            {/* Sidebar */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-50 bg-[#0a1628] text-white transition-all duration-300 transform 
                    ${sidebarOpen ? 'w-64 translate-x-0' : '-translate-x-full w-0 lg:w-0'} 
                    lg:sticky lg:top-0 lg:h-screen overflow-hidden
                `}
            >
                <div className="h-full flex flex-col overflow-hidden w-64">
                    <div className="p-6 border-b border-slate-700 flex items-center justify-between">
                        <img
                            src={getLogoUrl()}
                            alt="Admin Logo"
                            style={{ height: `${logoSize}px`, width: 'auto' }}
                        />
                        <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                        {navItems.map((item) => {
                            // ... Menu Logic
                            if (['Blogs', 'Portfolio', 'Website Demos', 'Marketing', 'Social Proof', 'Settings'].includes(item.label)) {
                                const isActiveGroup = activeMenu === (item.label === 'Blogs' ? 'Posts' : item.label);
                                const groupLabel = item.label === 'Blogs' ? 'Posts' : item.label;
                                const isCurrentPathGroup =
                                    (item.label === 'Blogs' && location.pathname.startsWith('/admin/blogs')) ||
                                    (item.label === 'Portfolio' && location.pathname.startsWith('/admin/portfolio')) ||
                                    (item.label === 'Website Demos' && location.pathname.startsWith('/admin/demos')) ||
                                    (item.label === 'Marketing' && location.pathname.startsWith('/admin/marketing')) ||
                                    (item.label === 'Social Proof' && location.pathname.startsWith('/admin/awards')) ||
                                    (item.label === 'Settings' && location.pathname.startsWith('/admin/settings'));

                                return (
                                    <div key={item.label + '-section'}>
                                        <button
                                            onClick={() => toggleMenu(groupLabel)}
                                            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${isCurrentPathGroup ? 'bg-cyan-500/10 text-cyan-400' : 'text-slate-400 hover:text-white'}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <item.icon className="w-5 h-5" />
                                                <span className="font-semibold">{groupLabel}</span>
                                            </div>
                                            {isActiveGroup ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                                        </button>

                                        {isActiveGroup && (
                                            <div className="ml-12 mt-1 space-y-1">
                                                {item.label === 'Blogs' && (
                                                    <>
                                                        <Link to="/admin/blogs" className={`block py-2 text-sm ${location.pathname === '/admin/blogs' ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}>All Posts</Link>
                                                        <Link to="/admin/blogs/new" className={`block py-2 text-sm ${location.pathname === '/admin/blogs/new' ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}>Add Post</Link>
                                                        <Link to="/admin/blogs/categories" className={`block py-2 text-sm ${location.pathname === '/admin/blogs/categories' ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}>Categories</Link>
                                                    </>
                                                )}
                                                {item.label === 'Portfolio' && (
                                                    <>
                                                        <Link to="/admin/portfolio" className={`block py-2 text-sm ${location.pathname === '/admin/portfolio' ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}>All Portfolios</Link>
                                                        <Link to="/admin/portfolio/new" className={`block py-2 text-sm ${location.pathname === '/admin/portfolio/new' ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}>Add New</Link>
                                                        <Link to="/admin/portfolio/categories" className={`block py-2 text-sm ${location.pathname === '/admin/portfolio/categories' ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}>Categories</Link>
                                                        <Link to="/admin/portfolio/tags" className={`block py-2 text-sm ${location.pathname === '/admin/portfolio/tags' ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}>Tags</Link>
                                                        <Link to="/admin/portfolio/filters" className={`block py-2 text-sm ${location.pathname === '/admin/portfolio/filters' ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}>Filters</Link>
                                                    </>
                                                )}
                                                {item.label === 'Website Demos' && (
                                                    <>
                                                        <Link to="/admin/demos" className={`block py-2 text-sm ${location.pathname === '/admin/demos' ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}>All Demos</Link>
                                                        <Link to="/admin/demos/new" className={`block py-2 text-sm ${location.pathname === '/admin/demos/new' ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}>Add New</Link>
                                                        <Link to="/admin/demos/categories" className={`block py-2 text-sm ${location.pathname === '/admin/demos/categories' ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}>Categories</Link>
                                                    </>
                                                )}
                                                {item.label === 'Marketing' && (
                                                    <>
                                                        <Link to="/admin/leads" className={`block py-2 text-sm ${location.pathname === '/admin/leads' ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}>Leads</Link>
                                                        <Link to="/admin/marketing" className={`block py-2 text-sm ${location.pathname === '/admin/marketing' ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}>Email Marketing</Link>
                                                    </>
                                                )}
                                                {item.label === 'Social Proof' && (
                                                    <>
                                                        <Link to="/admin/awards" className={`block py-2 text-sm ${location.pathname === '/admin/awards' ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}>Awards</Link>
                                                        <Link to="/admin/clients" className={`block py-2 text-sm ${location.pathname === '/admin/clients' ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}>Clients</Link>
                                                        <Link to="/admin/testimonials" className={`block py-2 text-sm ${location.pathname === '/admin/testimonials' ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}>Testimonials</Link>
                                                    </>
                                                )}
                                                {item.label === 'Settings' && (
                                                    <>
                                                        <Link to="/admin/settings" className={`block py-2 text-sm ${location.pathname === '/admin/settings' ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}>General</Link>
                                                        <Link to="/admin/seo-marketing" className={`block py-2 text-sm ${location.pathname === '/admin/seo-marketing' ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}>SEO & Marketing</Link>
                                                        <Link to="/admin/redirects" className={`block py-2 text-sm ${location.pathname === '/admin/redirects' ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}>Redirects</Link>
                                                        <Link to="/admin/forms" className={`block py-2 text-sm ${location.pathname === '/admin/forms' ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}>Forms</Link>
                                                        <Link to="/admin/menus" className={`block py-2 text-sm ${location.pathname === '/admin/menus' ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}>Menus</Link>
                                                        <Link to="/admin/smtp" className={`block py-2 text-sm ${location.pathname === '/admin/smtp' ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}>SMTP</Link>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            }

                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                        ? 'bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-400'
                                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Top Header */}
                <header className="sticky top-0 bg-white shadow-sm border-b border-slate-200 h-16 flex items-center justify-between px-6 z-40">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-slate-500 hover:text-cyan-500 transition-colors">
                            <Menu className="w-6 h-6" />
                        </button>

                        <Tooltip content="Browse Website">
                            <a href="/" target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-cyan-500 hover:bg-cyan-50 rounded-full transition-colors">
                                <Monitor className="w-5 h-5" />
                            </a>
                        </Tooltip>

                        <Tooltip content="Clear Cache">
                            <button
                                onClick={async () => {
                                    if (confirm('Are you sure you want to clear the system cache?')) {
                                        try {
                                            const token = localStorage.getItem('adminToken');
                                            await fetch(`${API_URL}/settings/clear-cache`, {
                                                method: 'POST',
                                                headers: { 'Authorization': `Bearer ${token}` }
                                            });
                                            alert('Cache cleared successfully!');
                                        } catch (e) {
                                            alert('Failed to clear cache');
                                        }
                                    }
                                }}
                                className="p-2 text-slate-400 hover:text-cyan-500 hover:bg-cyan-50 rounded-full transition-colors"
                            >
                                <RefreshCw className="w-5 h-5" />
                            </button>
                        </Tooltip>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <button
                                onClick={() => setNotificationsOpen(!notificationsOpen)}
                                className="relative p-2 text-slate-400 hover:text-cyan-500 hover:bg-cyan-50 rounded-full transition-colors"
                            >
                                <Bell className="w-5 h-5" />
                                {recentLeads.length > 0 && <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>}
                            </button>

                            {/* Notifications Dropdown */}
                            {notificationsOpen && (
                                <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-100 z-50 overflow-hidden">
                                    <div className="p-3 border-b border-slate-100 font-bold text-slate-700">Notifications</div>
                                    <div className="max-h-64 overflow-y-auto">
                                        {recentLeads.length === 0 ? (
                                            <div className="p-4 text-center text-slate-500 text-sm">No new notifications</div>
                                        ) : (
                                            recentLeads.map((lead, idx) => (
                                                <div key={idx} className="p-3 hover:bg-slate-50 border-b border-slate-100 last:border-0 cursor-pointer">
                                                    <div className="text-sm font-medium text-slate-800">{lead.message}</div>
                                                    <div className="text-xs text-slate-400 mt-1">{lead.time}</div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                    <Link to="/admin/leads" className="block text-center p-2 text-sm text-cyan-600 hover:bg-slate-50 font-medium">View All</Link>
                                </div>
                            )}
                        </div>

                        {user && (
                            <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
                                <div className="text-right hidden md:block">
                                    <p className="text-sm font-bold text-slate-800 leading-tight">{user.name}</p>
                                    <p className="text-xs text-slate-500 capitalize">{user.role}</p>
                                </div>
                                <div className="relative group">
                                    <button className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg border-2 border-white shadow-sm hover:shadow-md transition-all overflow-hidden bg-cyan-100 text-cyan-600">
                                        {user.image ? (
                                            <img
                                                src={user.image.startsWith('http') ? user.image : `${UPLOAD_URL}${user.image}`}
                                                alt={user.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            user.name?.[0]?.toUpperCase()
                                        )}
                                    </button>

                                    {/* Dropdown */}
                                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right z-50">
                                        <div className="py-2">
                                            <Link to="/admin/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-cyan-600">
                                                <User className="w-4 h-4" />
                                                Profile
                                            </Link>
                                            <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50">
                                                <LogOut className="w-4 h-4" />
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </header>

                <div className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100 p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
