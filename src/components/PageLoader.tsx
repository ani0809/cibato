import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import "./Loader.css";

export default function PageLoader() {
    const [hide, setHide] = useState(false);
    const location = useLocation(); // Hook to listen to route changes

    useEffect(() => {
        // Check if we are in admin area
        if (location.pathname.startsWith('/admin')) {
            setHide(true);
            return;
        }

        // Reset visibility on route change
        setHide(false);

        // Timing calculation:
        // Brand Timing (delay): 900ms (was 1400)
        // Exit Animation: 600ms (was 800)
        // Total wait before unmount: 1500ms
        const totalDuration = 1500;

        // Start timer
        const timer = setTimeout(() => {
            setHide(true);
        }, totalDuration);

        return () => {
            clearTimeout(timer);
        };
    }, [location.pathname]); // Re-run effect when pathname changes

    if (hide) return null;

    return (
        <div className="cibato-loader">
            <div className="cibato-bg" />
            <div className="cibato-noise" />
            <div className="cibato-logo">CIBATO</div>
        </div>
    );
}
