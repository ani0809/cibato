import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SeoHead from './SeoHead';
import { API_URL } from '../utils/api';
import { useSettings } from '../context/SettingsContext';

const PageSeoWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { settings } = useSettings();
    const [pageData, setPageData] = useState<any>(null);

    // Get site name from settings or default
    const siteName = settings.websiteName || settings.systemName || 'Cibato';

    // Handle Redirects
    useEffect(() => {
        const checkRedirects = async () => {
            try {
                const res = await fetch(`${API_URL}/redirects`);
                const redirects = await res.json();

                if (Array.isArray(redirects)) {
                    const currentPath = location.pathname.endsWith('/') && location.pathname !== '/'
                        ? location.pathname.slice(0, -1)
                        : location.pathname;

                    const activeRedirect = redirects.find((r: any) =>
                        r.active && (r.from === currentPath || r.from === location.pathname)
                    );

                    if (activeRedirect) {
                        navigate(activeRedirect.to, { replace: true });
                    }
                }
            } catch (error) {
                console.error('Redirect check failed');
            }
        };
        checkRedirects();
    }, [location.pathname]);

    useEffect(() => {
        // Skip SEO logic for admin routes (handled by AdminLayout)
        if (location.pathname.startsWith('/admin')) {
            return;
        }

        // Reset data immediately on navigation
        setPageData(null);

        // Fetch specific page data based on current path
        const fetchPageSeo = async () => {
            try {
                const res = await fetch(`${API_URL}/pages?t=${Date.now()}`); // Cache busting
                const pages = await res.json();

                if (Array.isArray(pages)) {
                    // Normalize current path
                    const currentPath = location.pathname.endsWith('/') && location.pathname !== '/'
                        ? location.pathname.slice(0, -1)
                        : location.pathname;

                    // Find page matching current pathname
                    const currentPage = pages.find((p: any) => {
                        const dbPath = p.slug ? `/${p.slug}` : '/';
                        return dbPath === currentPath;
                    });

                    if (currentPage) {
                        setPageData(currentPage);
                    }
                }
            } catch (error) {
                console.error('Failed to load page SEO');
            }
        };

        fetchPageSeo();
    }, [location.pathname]);

    // Generate fallback meta (slug based)
    const getFallbackMeta = () => {
        if (location.pathname === '/' || location.pathname === '') {
            return {
                title: `${siteName} - Building Your Digital Presence`,
                description: "Cibato offers professional IT services including web development, digital marketing, SEO, mobile apps, and more.",
                keywords: undefined,
                image: undefined,
                schemaMarkup: undefined
            };
        }

        const slug = location.pathname.split('/').pop() || '';
        const title = slug
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        return {
            title: `${title} - ${siteName}`,
            description: `Learn more about our ${title} services at ${siteName}.`,
            keywords: undefined,
            image: undefined,
            schemaMarkup: undefined
        };
    };

    // Global SEO Logic
    const getFinalMeta = () => {
        // 1. Dynamic Route Exclusion (Yield to child component)
        const isDynamicRoute =
            (/^\/our-blogs\/[^/]+$/.test(location.pathname) && location.pathname !== '/our-blogs') ||
            (/^\/portfolio\/[^/]+$/.test(location.pathname) && location.pathname !== '/portfolio') ||
            (/^\/category\/[^/]+$/.test(location.pathname));

        if (isDynamicRoute) return null;

        // 2. Exact Page Match
        console.log('PageData:', pageData);
        if (pageData) {
            // Priority: Meta Title -> Page Title -> Site Name
            const seoTitle = pageData.seo?.metaTitle;
            const pageTitle = pageData.title;

            // Construct title
            let finalTitle = '';
            if (seoTitle && seoTitle.trim() !== '') {
                finalTitle = seoTitle;
            } else if (pageTitle && pageTitle.trim() !== '') {
                finalTitle = `${pageTitle} - ${siteName}`;
            } else {
                finalTitle = `${siteName}`;
            }

            return {
                title: finalTitle,
                description: pageData.seo?.metaDescription || getFallbackMeta().description,
                keywords: pageData.seo?.keywords,
                image: pageData.seo?.metaImage,
                schemaMarkup: pageData.seo?.schemaMarkup
            };
        }

        // 3. Fallback (Home or 404ish)
        if (location.pathname === '/' || location.pathname === '') {
            return {
                title: `${siteName} - Building Your Digital Presence`,
                description: "Cibato offers professional IT services including web development, digital marketing, SEO, mobile apps, and more."
            };
        }

        // 4. Slug Fallback
        return getFallbackMeta();
    };

    const finalMeta = getFinalMeta();
    const isAdminRoute = location.pathname.startsWith('/admin');

    // If dynamic route (finalMeta is null), simply render children
    if (!finalMeta && !isAdminRoute) {
        return <>{children}</>;
    }

    return (
        <>
            {!isAdminRoute && finalMeta && (
                <SeoHead
                    title={finalMeta.title}
                    description={finalMeta.description}
                    keywords={finalMeta?.keywords}
                    image={finalMeta?.image}
                    schemaMarkup={finalMeta?.schemaMarkup}
                    noIndex={settings.global_noindex === 'true'}
                />
            )}
            {children}
        </>
    );
};

export default PageSeoWrapper;
