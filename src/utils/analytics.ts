import { API_URL } from "./api";

declare global {
    interface Window {
        fbq: any;
        gtag: any;
    }
}

/**
 * Track an event to both Facebook Pixel (Browser) and CAPI (Server)
 */
export const trackEvent = async (eventName: string, data: any = {}) => {
    // 1. Browser Tracking
    if (window.fbq) {
        window.fbq('track', eventName, data);
    } else {
        // console.warn('Facebook Pixel not initialized');
    }

    // 2. Server Side Tracking (CAPI)
    // We send this to our backend, which checks if CAPI is enabled
    try {
        await fetch(`${API_URL}/marketing/track`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                event_name: eventName,
                event_source_url: window.location.href,
                user_data: {
                    // We can add more user data here if we have it (email, phone, etc.)
                    // client_user_agent and ip handled by server
                },
                custom_data: data
            })
        });
    } catch (error) {
        console.error('CAPI Track Error:', error);
    }
};
