import { useState, useEffect } from 'react';
import { API_URL } from '../utils/api';
import ContactHero from '../components/ContactHero';
import ContactInfo from '../components/ContactInfo';

const ContactPage = () => {
    const [images, setImages] = useState<any>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${API_URL}/pages/contact-page-id`);
                if (res.ok) {
                    const data = await res.json();
                    let content: any = {};
                    try {
                        content = data.content ? (typeof data.content === 'string' ? JSON.parse(data.content) : data.content) : {};
                    } catch (e) {
                        console.error('JSON Parse error', e);
                    }
                    setImages(content);
                }
            } catch (err) {
                console.error('Failed to fetch contact page', err);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            {/* Hero Section */}
            <ContactHero imgUrl={images.contactHero?.imgUrl} />

            {/* Contact Info Section */}
            <ContactInfo />
        </>
    );
};

export default ContactPage;
