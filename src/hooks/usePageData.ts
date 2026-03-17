import { useState, useEffect } from 'react';
import { API_URL, UPLOAD_URL } from '../utils/api';

export const usePageData = (pageId: string) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${API_URL}/pages/${pageId}`);
                if (!res.ok) throw new Error('Failed to fetch page data');
                const pageData = await res.json();

                let content = {};
                if (pageData.content) {
                    try {
                        content = typeof pageData.content === 'string'
                            ? JSON.parse(pageData.content)
                            : pageData.content;
                    } catch (e) {
                        console.error('Content parse error', e);
                    }
                }

                setData(content);
            } catch (err: any) {
                // Don't set global error for missing content to avoid UI flashing, just log
                console.error(`Error loading page ${pageId}:`, err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (pageId) fetchData();
    }, [pageId]);

    const getImageUrl = (key: string, defaultUrl: string) => {
        if (data && data[key] && data[key].imgUrl) {
            const url = data[key].imgUrl;
            return url.startsWith('http') ? url : `${UPLOAD_URL}${url}`;
        }
        return defaultUrl;
    };

    const getText = (key: string, defaultText: string) => {
        if (data && data[key] && data[key].text) {
            return data[key].text;
        }
        return defaultText;
    };

    return { data, loading, error, getImageUrl, getText };
};
