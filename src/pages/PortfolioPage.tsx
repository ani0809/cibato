import { useState, useEffect } from 'react';
import { API_URL } from '../utils/api';
import PortfolioHero from '../components/PortfolioHero';
import AwardsCertifications from '../components/AwardsCertifications';
import Portfolio from '../components/Portfolio';
import WhyChoose from '../components/WhyChoose';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';

const PortfolioPage = () => {
    const [images, setImages] = useState<any>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${API_URL}/pages/portfolio-page-id`);
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
                console.error('Failed to fetch portfolio page', err);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            {/* Hero Section */}
            <PortfolioHero imgUrl={images.portfolioHero?.imgUrl} />

            {/* Awards Section */}
            <AwardsCertifications className="-mt-5 relative z-20" />

            {/* Portfolio Section */}
            <Portfolio showButton={false} />

            {/* Why Choose Us */}
            <WhyChoose className="-mt-10" imgUrl={images.whyChoose?.imgUrl} />

            {/* Testimonials */}
            <Testimonials />

            {/* Final CTA */}
            <Contact />
        </>
    );
};

export default PortfolioPage;
