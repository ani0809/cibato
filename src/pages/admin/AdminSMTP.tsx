import { useState, useEffect } from 'react';
import { Mail, Save, Send } from 'lucide-react';
import { API_URL, getAuthHeaders } from '../../utils/api';

const AdminSMTP = () => {
    const [config, setConfig] = useState({
        host: '',
        port: '587',
        username: '',
        password: '',
        encryption: 'tls',
        fromEmail: '',
        fromName: '',
        mailer: 'smtp'
    });
    const [loading, setLoading] = useState(false);
    const [testEmail, setTestEmail] = useState('');
    const [sendingTest, setSendingTest] = useState(false);

    useEffect(() => {
        fetchConfig();
    }, []);

    const fetchConfig = async () => {
        try {
            const res = await fetch(`${API_URL}/smtp`, {
                headers: getAuthHeaders()
            });
            const data = await res.json();
            setConfig(data);
        } catch (error) {
            console.error("Failed to fetch SMTP config:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setConfig({ ...config, [e.target.name]: e.target.value });
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await fetch(`${API_URL}/smtp`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeaders()
                },
                body: JSON.stringify(config)
            });
            alert('SMTP settings saved successfully!');
        } catch (error) {
            console.error("Failed to save SMTP config:", error);
            alert('Failed to save settings.');
        } finally {
            setLoading(false);
        }
    };

    const handleTestEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!testEmail) return;
        setSendingTest(true);
        try {
            const res = await fetch(`${API_URL}/smtp/test`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeaders()
                },
                body: JSON.stringify({ to: testEmail })
            });
            const data = await res.json();
            if (res.ok) {
                alert('Test email sent successfully!');
            } else {
                alert(`Failed to send test email: ${data.message}`);
            }
        } catch (error) {
            console.error("Failed to send test email:", error);
            alert('Failed to send test email.');
        } finally {
            setSendingTest(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">SMTP Settings</h1>
                <p className="text-slate-500 text-lg">Configure your email server settings for sending notifications.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm mb-8">
                <form onSubmit={handleSave} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Mail Host</label>
                            <input name="host" value={config.host} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg" placeholder="smtp.example.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Mail Port</label>
                            <input name="port" value={config.port} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg" placeholder="587" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Username</label>
                            <input name="username" value={config.username} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg" placeholder="user@example.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
                            <input type="password" name="password" value={config.password} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg" placeholder="••••••••" />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Encryption</label>
                            <select name="encryption" value={config.encryption} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg">
                                <option value="tls">TLS</option>
                                <option value="ssl">SSL</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Mailer</label>
                            <input name="mailer" value={config.mailer} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg" placeholder="smtp" />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">From Address</label>
                            <input name="fromEmail" value={config.fromEmail} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg" placeholder="no-reply@example.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">From Name</label>
                            <input name="fromName" value={config.fromName} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg" placeholder="My Company" />
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex justify-end">
                        <button type="submit" disabled={loading} className="flex items-center gap-2 px-6 py-3 bg-cyan-500 text-white rounded-xl font-bold hover:bg-cyan-600 transition-colors shadow-lg shadow-cyan-500/20 disabled:opacity-50">
                            <Save className="w-5 h-5" />
                            {loading ? 'Saving...' : 'Save Configuration'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Test Email Section */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-cyan-500" />
                    Test Configuration
                </h2>
                <form onSubmit={handleTestEmail} className="flex gap-4 items-end">
                    <div className="flex-1">
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Send Test Email To</label>
                        <input
                            type="email"
                            value={testEmail}
                            onChange={e => setTestEmail(e.target.value)}
                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                            placeholder="your-email@example.com"
                            required
                        />
                    </div>
                    <button type="submit" disabled={sendingTest} className="px-6 py-2 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-700 transition-colors flex items-center gap-2 disabled:opacity-50 h-[42px]">
                        <Send className="w-4 h-4" />
                        {sendingTest ? 'Sending...' : 'Send Test'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminSMTP;
