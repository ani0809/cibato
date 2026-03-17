import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { API_URL } from '../utils/api';
import SeoHead from '../components/SeoHead';
import Contact from '../components/Contact';

const DynamicPage = () => {
    const { slug } = useParams();
    const [page, setPage] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchPage = async () => {
            setLoading(true);
            try {
                // Determine slug: if URL is /p/:slug, use param. If root, use 'home'.
                const lookupSlug = slug || 'home';

                const res = await fetch(`${API_URL}/pages/${lookupSlug}`);
                if (res.ok) {
                    const data = await res.json();
                    setPage(data);
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchPage();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-12 h-12 border-4 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error || !page) {
        return <div className="min-h-screen flex items-center justify-center">Page Not Found</div>;
    }

    return (
        <div className="pt-[140px] lg:pt-[180px]">
            <SeoHead
                title={page.title}
                description={`View our ${page.title} page.`}
            />

            {page.content ? (
                <div className="container mx-auto px-4 py-8">
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: page.content }} />
                </div>
            ) : (
                <div className="container mx-auto px-4 py-12 text-center text-slate-500">
                    <p>This page has no content.</p>
                </div>
            )}

            {/* Optional: Add Contact section by default or make it a block */}
            <Contact />
        </div>
    );
};

export default DynamicPage;
