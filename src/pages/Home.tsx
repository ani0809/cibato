import { usePageData } from '../hooks/usePageData';
import Hero from '../components/Hero';
import About from '../components/About';
import AwardsCertifications from '../components/AwardsCertifications';
import Process from '../components/Process';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import WhyChoose from '../components/WhyChoose';
import LogoCarousel from '../components/LogoCarousel';
import Testimonials from '../components/Testimonials';
import Blog from '../components/Blog';
import Contact from '../components/Contact';
import BusinessGrowth from '../components/BusinessGrowth';

const Home = () => {
    const { data, getImageUrl } = usePageData('home-page-id');

    // Extract props from data (if available) to pass to components
    // This maintains support for text content managed via admin
    const heroProps = data?.hero || {};
    const aboutProps = data?.about || {};
    const whyChooseProps = data?.whyChoose || {};
    const businessGrowthProps = data?.businessGrowth || {};

    return (
        <>
            <Hero
                {...heroProps}
                imgUrl={getImageUrl('hero', '/hero-img.png')}
            />
            <AwardsCertifications className="-mt-5 relative z-20" />
            <About
                {...aboutProps}
                image={getImageUrl('about', '/about-person.png')}
            />
            <BusinessGrowth
                {...businessGrowthProps}
                imgUrl={getImageUrl('businessGrowth', 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop')}
            />
            <Process />
            <Services limit={6} />
            <Portfolio />
            <WhyChoose
                {...whyChooseProps}
                imgUrl={getImageUrl('whyChoose', 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800')}
            />
            <LogoCarousel />
            <Testimonials />
            <Blog />
            <Contact />
        </>
    );
};

export default Home;
