import { usePageData } from '../hooks/usePageData';
import ServiceHero from '../components/ServiceHero';
import AwardsCertifications from '../components/AwardsCertifications';
import Services from '../components/Services';
import WhyChoose from '../components/WhyChoose';
import Process from '../components/Process';
import LogoCarousel from '../components/LogoCarousel';
import Portfolio from '../components/Portfolio';
import FAQ from '../components/FAQ';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import BusinessGrowth from '../components/BusinessGrowth';

const ServicePage = () => {
    const { getImageUrl } = usePageData('services-page-id');

    return (
        <>
            {/* Hero Section */}
            <ServiceHero
                imgUrl={getImageUrl('serviceHero', 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800')}
            />

            {/* Awards Section */}
            <AwardsCertifications className="-mt-5 relative z-20" />

            {/* Services Grid ("We solve real problem") - Button removed, using global spacing */}
            <Services showButton={false} className="!pb-0 lg:!pb-[10px]" />

            {/* Why Choose Us ("Who chooses Cibato") + Stats */}
            <WhyChoose
                imgUrl={getImageUrl('whyChoose', 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800')}
            />

            <BusinessGrowth
                imgUrl={getImageUrl('businessGrowth', 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop')}
            />

            {/* Process ("We simplify development process") */}
            <Process />

            {/* Clients ("Our clients believe in us") */}
            <LogoCarousel />

            {/* Portfolio ("Let's see some of our projects") */}
            <Portfolio />

            {/* Testimonials ("What our clients say") */}
            <Testimonials />

            {/* FAQ Section */}
            <FAQ />

            {/* Final CTA ("Ready To Experience...") */}
            <Contact />
        </>
    );
};

export default ServicePage;
