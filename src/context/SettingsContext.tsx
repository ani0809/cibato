import React, { createContext, useContext, useEffect, useState } from 'react';
import { API_URL, UPLOAD_URL } from '../utils/api';

interface Settings {
    systemName?: string;
    websiteName?: string;
    siteMotto?: string;
    siteIcon?: string;
    systemLogo?: string;
    adminLogoSize?: string;

    // SEO
    site_title?: string;
    site_description?: string;
    global_noindex?: string;

    // Social
    social_facebook?: string;
    social_instagram?: string;
    social_linkedin?: string;
    social_twitter?: string;
    social_youtube?: string;

    // Contact Info
    contact_address?: string;
    contact_phone_1?: string;
    contact_phone_2?: string;
    contact_email_1?: string;
    contact_email_2?: string;
    footer_copyright?: string;

    // Stats
    stat_projects?: string;
    stat_years?: string;
    stat_team?: string;
    stat_clients?: string;

    // Home
    hero_video_url?: string;

    // Colors
    baseColor?: string;
    baseHoverColor?: string;
    secondaryBaseColor?: string;
    secondaryBaseHoverColor?: string;

    // Scripts
    headerScript?: string;
    footerScript?: string;

    // Tracking
    facebook_pixel_id?: string;
    facebook_access_token?: string;
    enable_capi?: string;
    test_event_code?: string;
    google_analytics_id?: string;

    // Google Integration (Site Kit style)
    google_service_account_json?: string;
    google_analytics_property_id?: string;
    search_console_property?: string;

    // Forms - Global Config
    form_service_options?: string; // Comma separated

    // Home Page Form
    home_form_title?: string;
    home_form_subtitle?: string;
    home_form_desc?: string;
    home_contact_btn?: string;
    home_form_submit_btn?: string;

    // Popup Form
    popup_form_title?: string;
    popup_form_submit_btn?: string;

    // Shared Field Labels
    form_label_name_first?: string;
    form_label_name_last?: string;
    form_label_email?: string;
    form_label_phone?: string;
    form_label_service?: string;
    form_label_message?: string;

    // Shared Placeholders
    form_ph_name_first?: string;
    form_ph_name_last?: string;
    form_ph_email?: string;
    form_ph_phone?: string;
    form_ph_service?: string;
    form_ph_message?: string;
}

interface SettingsContextType {
    settings: Settings;
    loading: boolean;
    refreshSettings: () => Promise<void>;
    updateSettings: (newSettings: Partial<Settings>) => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<Settings>({});
    const [loading, setLoading] = useState(true);

    const refreshSettings = async () => {
        try {
            const res = await fetch(`${API_URL}/settings?t=${Date.now()}`);
            if (res.ok) {
                const data = await res.json();
                // Transform Array [{key, value}] to Object {key: value}
                const settingsObj: Settings = {};
                if (Array.isArray(data)) {
                    data.forEach((item: any) => {
                        if (item.key) {
                            (settingsObj as any)[item.key] = item.value;
                        }
                    });
                }
                setSettings(settingsObj);
                applySettings(settingsObj);
            }
        } catch (error) {
            console.error("Failed to load settings", error);
        } finally {
            setLoading(false);
        }
    };

    const updateSettings = async (newSettings: Partial<Settings>) => {
        // Optimistic update
        const updated = { ...settings, ...newSettings };
        setSettings(updated);
        applySettings(updated);

        // We only support updating one key at a time via this API usually, 
        // but if we need to update multiple we'd loop.
        // However, the AdminSettings comp sends one key at a time.
        // Use loop to support partial updates if needed.

        try {
            const promises = Object.entries(newSettings).map(([key, value]) => {
                return fetch(`${API_URL}/settings`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ key, value, group: 'general' }) // Group might be lost here, but critical logic uses key
                });
            });
            await Promise.all(promises);
        } catch (error) {
            console.error("Failed to save settings", error);
        }
    };

    const applySettings = (data: Settings) => {
        // 1. Colors - CSS Variables
        const root = document.documentElement;
        if (data.baseColor) root.style.setProperty('--color-primary', data.baseColor);
        if (data.baseHoverColor) root.style.setProperty('--color-primary-hover', data.baseHoverColor);
        if (data.secondaryBaseColor) root.style.setProperty('--color-secondary', data.secondaryBaseColor);

        // 2. Favicon
        if (data.siteIcon) {
            const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
            if (link) {
                link.href = data.siteIcon.startsWith('http') ? data.siteIcon : `${UPLOAD_URL}${data.siteIcon}`;
            } else {
                const newLink = document.createElement('link');
                newLink.rel = 'icon';
                newLink.href = data.siteIcon.startsWith('http') ? data.siteIcon : `${UPLOAD_URL}${data.siteIcon}`;
                document.head.appendChild(newLink);
            }
        }

        // 3. Title - REMOVED to prevent conflict with PageSeoWrapper / Single Pages
        // if (data.websiteName) {
        //     document.title = data.websiteName + (data.siteMotto ? ` | ${data.siteMotto}` : '');
        // }

        // 4. Custom Scripts (Careful execution)
        // Note: Executing raw scripts from DB is risky (XSS), but this is an Admin requirement.
        // We will only insert them if they are not already present to avoid duplication.
    };

    useEffect(() => {
        refreshSettings();
    }, []);

    return (
        <SettingsContext.Provider value={{ settings, loading, refreshSettings, updateSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error("useSettings must be used within a SettingsProvider");
    }
    return context;
};
