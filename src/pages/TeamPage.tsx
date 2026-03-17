import { useState, useEffect } from 'react';
import { Linkedin, Twitter, Github, User } from 'lucide-react';
import { API_URL } from '../utils/api';
import Navbar from '../components/Navigation'; // Adjust import if needed
import Footer from '../components/Footer';

interface TeamMember {
    id: string;
    name: string;
    role: string;
    bio: string;
    image: string;
    socials: {
        linkedin?: string;
        twitter?: string;
        github?: string;
    };
}

const TeamPage = () => {
    const [team, setTeam] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const res = await fetch(`${API_URL}/team`);
                const data = await res.json();
                setTeam(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Failed to fetch team", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTeam();
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <Navbar scrolled={true} />

            <div className="pt-[140px] pb-[10px] lg:pt-[180px] lg:pb-[30px] px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                        Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Expert Team</span>
                    </h1>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        We are a group of passionate individuals committed to delivering excellence.
                        Our diverse expertise comes together to build amazing digital experiences for you.
                    </p>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-slate-500">Loading team...</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member) => (
                            <div key={member.id} className="group relative bg-white rounded-3xl p-6 border border-slate-100 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300">
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                <div className="relative z-10 flex flex-col items-center text-center">
                                    <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-4 border-white shadow-xl ring-2 ring-slate-100 group-hover:ring-cyan-400 transition-all duration-300">
                                        {member.image ? (
                                            <img src={member.image} alt={member.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                                                <User className="w-8 h-8 text-slate-300" />
                                            </div>
                                        )}
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
                                    <div className="inline-block px-3 py-0.5 bg-cyan-50 rounded-full text-cyan-600 text-xs font-semibold mb-3">
                                        {member.role}
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-2 line-clamp-3">
                                        {member.bio}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer is handled by layout */}
        </div>
    );
};

export default TeamPage;
