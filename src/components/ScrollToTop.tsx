import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useLayoutEffect(() => {
        // Force instant scroll to top on route change (before paint)
        document.documentElement.style.scrollBehavior = 'auto';

        window.scrollTo(0, 0);
        document.body.scrollTo(0, 0);
        if (document.scrollingElement) {
            document.scrollingElement.scrollTo(0, 0);
        }

        // Restore smooth scroll preference
        // Verify if style tag exists or logic needs it
        const originalStyle = document.documentElement.style.scrollBehavior;

        // We really want it to be 'smooth' generally, but 'auto' JUST for this frame?
        // Actually, we can use requestAnimationFrame to restore it ?
        // Or just setTimeout.

        // Let's assume the user wants smooth scrolling normally.
        // We set it to auto, scroll, then set it back.

        const timer = setTimeout(() => {
            document.documentElement.style.scrollBehavior = '';
        }, 50);

        return () => clearTimeout(timer);
    }, [pathname]);

    return null;
};

export default ScrollToTop;
