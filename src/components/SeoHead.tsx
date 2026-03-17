import { useEffect } from 'react';

interface SeoProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    type?: string;
    type?: string;
    schemaMarkup?: string; // JSON-LD string
    noIndex?: boolean;
}

const SeoHead = ({ title, description, keywords, image, type = 'website', schemaMarkup, noIndex = false }: SeoProps) => {
    useEffect(() => {
        // Update Title
        if (title) {
            document.title = title;
        }

        // Helper to update or create meta tag
        const updateMeta = (name: string, content: string | undefined, mood: 'name' | 'property' = 'name') => {
            if (!content) return;
            let element = document.querySelector(`meta[${mood}="${name}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(mood, name);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        updateMeta('description', description);
        updateMeta('keywords', keywords);

        // Open Graph
        updateMeta('og:title', title, 'property');
        updateMeta('og:description', description, 'property');
        updateMeta('og:image', image, 'property');
        updateMeta('og:type', type, 'property');

        // Robots
        if (noIndex) {
            updateMeta('robots', 'noindex, nofollow');
        } else {
            const element = document.querySelector('meta[name="robots"]');
            if (element) element.remove();
        }

        // Schema Markup
        if (schemaMarkup) {
            const scriptId = 'json-ld-schema';
            let script = document.getElementById(scriptId);
            if (!script) {
                script = document.createElement('script');
                script.id = scriptId;
                script.setAttribute('type', 'application/ld+json');
                document.head.appendChild(script);
            }
            script.textContent = schemaMarkup;
        }

        return () => {
            // Optional: Cleanup if needed, but typically next page overrides.
            // Converting title back not strictly necessary for SPA unless desired.
        };
    }, [title, description, keywords, image, type, schemaMarkup, noIndex]);

    return null;
};

export default SeoHead;
