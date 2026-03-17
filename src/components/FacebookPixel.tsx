import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import { trackEvent } from '../utils/analytics';

const FacebookPixel = () => {
    const { settings } = useSettings();
    const location = useLocation();

    useEffect(() => {
        if (!settings.facebook_pixel_id) return;

        // Initialize Pixel if not present
        if (!window.fbq) {
            console.log('Initializing FB Pixel:', settings.facebook_pixel_id);
            const script = document.createElement('script');
            script.innerHTML = `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${settings.facebook_pixel_id}');
            `;
            document.head.appendChild(script);
        } else {
            // Re-init if ID changes (rare but possible) or just ensure init
            // window.fbq('init', settings.facebook_pixel_id);
        }

    }, [settings.facebook_pixel_id]);

    useEffect(() => {
        if (settings.facebook_pixel_id) {
            // Track PageView on route change
            trackEvent('PageView');
        }
    }, [location.pathname, settings.facebook_pixel_id]);

    return null;
};

export default FacebookPixel;
