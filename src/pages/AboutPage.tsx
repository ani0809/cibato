import { useState, useEffect } from 'react';
import { API_URL } from '../utils/api';
import AboutHero from '../components/AboutHero';
import AwardsCertifications from '../components/AwardsCertifications';
import About from '../components/About';
import MissionVision from '../components/MissionVision';
import Process from '../components/Process';
import Services from '../components/Services';
import WhyChoose from '../components/WhyChoose';
import LogoCarousel from '../components/LogoCarousel';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';

const AboutPage = () => {
    const [images, setImages] = useState<any>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${API_URL}/pages/about-page-id`);
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
                console.error('Failed to fetch about page', err);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            {/* Hero Section */}
            <AboutHero imgUrl={images.aboutHero?.imgUrl} />

            {/* Awards Section */}
            <AwardsCertifications className="-mt-5 relative z-20" />

            {/* About Section */}
            <About image={images.about?.imgUrl} />

            {/* Mission & Vision */}
            <MissionVision />

            {/* Our Process */}
            <Process />

            {/* Services */}
            <Services limit={6} />

            {/* Why Choose Us */}
            <WhyChoose imgUrl={images.whyChoose?.imgUrl} />

            {/* Our Clients */}
            <LogoCarousel />

            {/* Portfolio */}
            <Portfolio />

            {/* Testimonials */}
            <Testimonials />

            {/* Final CTA */}
            <Contact />
        </>
    );
};

export default AboutPage;
