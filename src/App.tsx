import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import ServicePage from './pages/ServicePage';
import PortfolioPage from './pages/PortfolioPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import SingleBlogPage from './pages/SingleBlogPage';
import CategoryArchivePage from './pages/CategoryArchivePage';
import SinglePortfolioPage from './pages/SinglePortfolioPage';
import WebDesignDevelopment from './pages/WebDesignDevelopment';
import BusinessWebsite from './pages/BusinessWebsite';
import EcommerceWebsite from './pages/EcommerceWebsite';
import BusinessSoftware from './pages/BusinessSoftware';
import DigitalMarketing from './pages/DigitalMarketing';
import SEOServices from './pages/SEOServices';
import SocialMediaMarketing from './pages/SocialMediaMarketing';
import EmailMarketing from './pages/EmailMarketing';
import ContentWritingService from './pages/ContentWritingService';
import MobileAppsDevelopment from './pages/MobileAppsDevelopment';
import GraphicDesignServices from './pages/GraphicDesignServices';
import VideoEditingServices from './pages/VideoEditingServices';
import VoiceOver from './pages/VoiceOver';
import GoogleWorkspace from './pages/GoogleWorkspace';
import TeamPage from './pages/TeamPage';
import TestimonialsPage from './pages/TestimonialsPage';
import WebsiteDemosPage from './pages/WebsiteDemosPage';

// Admin Imports
import AdminLogin from './pages/admin/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './pages/admin/AdminLayout';
import ErrorBoundary from './components/ErrorBoundary';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminBlogs from './pages/admin/AdminBlogs';
import AdminCategories from './pages/admin/AdminCategories';
import AdminBlogEdit from './pages/admin/AdminBlogEdit';
import AdminPortfolios from './pages/admin/AdminPortfolios';
import AdminPortfolioEdit from './pages/admin/AdminPortfolioEdit';
import AdminDemos from './pages/admin/AdminDemos';
import AdminDemoEdit from './pages/admin/AdminDemoEdit';
import AdminDemoCategories from './pages/admin/AdminDemoCategories';
import AdminPortfolioCategories from './pages/admin/AdminPortfolioCategories';
import AdminPortfolioTags from './pages/admin/AdminPortfolioTags';
import AdminPortfolioFilters from './pages/admin/AdminPortfolioFilters';
import AdminSettings from './pages/admin/AdminSettings';
import AdminRedirects from './pages/admin/AdminRedirects';
import AdminForms from './pages/admin/AdminForms';
import AdminPages from './pages/admin/AdminPages';
import PageEditor from './pages/admin/PageEditor';
import DynamicPage from './pages/DynamicPage';
import AdminServices from './pages/admin/AdminServices';
import AdminSMTP from './pages/admin/AdminSMTP';
import AdminSeoMarketing from './pages/admin/AdminSeoMarketing';
import AdminMenus from './pages/admin/AdminMenus';
import AdminTeam from './pages/admin/AdminTeam';
import AdminMedia from './pages/admin/AdminMedia';
// ... imports
import AdminAppearance from './pages/admin/AdminAppearance';
import PageSeoWrapper from './components/PageSeoWrapper';
import FacebookPixel from './components/FacebookPixel';
import PageLoader from './components/PageLoader';
import AdminAwards from './pages/admin/AdminAwards';
import AdminClients from './pages/admin/AdminClients';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminLeads from './pages/admin/AdminLeads';
import AdminMarketing from './pages/admin/AdminMarketing';
import AdminUsers from './pages/admin/AdminUsers';
import AdminProfile from './pages/admin/AdminProfile';

// Context
import { SettingsProvider } from './context/SettingsContext';

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAdminRoute = window.location.pathname.startsWith('/admin');

  return (
    <SettingsProvider>
      <Router>
        <FacebookPixel />
        <PageLoader />
        <ScrollToTop />
        <PageSeoWrapper>
          <div className="min-h-screen bg-white">
            {!isAdminRoute && <Navigation scrolled={scrolled} />}
            <Routes>
              {/* ... routes ... */}
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<ServicePage />} />
              <Route path="/website-design-development" element={<WebDesignDevelopment />} />
              <Route path="/business-website" element={<BusinessWebsite />} />
              <Route path="/ecommerce-website" element={<EcommerceWebsite />} />
              <Route path="/business-software-services" element={<BusinessSoftware />} />
              <Route path="/digital-marketing-services" element={<DigitalMarketing />} />
              <Route path="/seo-services" element={<SEOServices />} />
              <Route path="/social-media-marketing" element={<SocialMediaMarketing />} />
              <Route path="/email-marketing" element={<EmailMarketing />} />
              <Route path="/content-writing-service" element={<ContentWritingService />} />
              <Route path="/mobile-apps-development" element={<MobileAppsDevelopment />} />
              <Route path="/graphic-design-services" element={<GraphicDesignServices />} />
              <Route path="/video-editing-services" element={<VideoEditingServices />} />
              <Route path="/voice-over" element={<VoiceOver />} />
              <Route path="/google-workspace" element={<GoogleWorkspace />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/portfolio/:id" element={<SinglePortfolioPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/website-demos" element={<WebsiteDemosPage />} />
              <Route path="/about-us" element={<AboutPage />} />
              <Route path="/contact-us" element={<ContactPage />} />
              <Route path="/our-blogs" element={<BlogPage />} />
              <Route path="/our-blogs/:slug" element={<SingleBlogPage />} />
              <Route path="/category/:slug" element={<CategoryArchivePage />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={
                <ErrorBoundary>
                  <AdminLayout />
                </ErrorBoundary>
              }>
                <Route index element={<AdminDashboard />} />
                <Route path="media" element={<AdminMedia />} />
                <Route path="awards" element={<AdminAwards />} />
                <Route path="clients" element={<AdminClients />} />
                <Route path="testimonials" element={<AdminTestimonials />} />
                <Route path="leads" element={<AdminLeads />} />
                <Route path="marketing" element={<AdminMarketing />} />
                <Route path="services" element={<AdminServices />} />
                <Route path="smtp" element={<AdminSMTP />} />
                <Route path="seo-marketing" element={<AdminSeoMarketing />} />
                <Route path="menus" element={<AdminMenus />} />
                <Route path="team" element={<AdminTeam />} />
                <Route path="blogs" element={<AdminBlogs />} />
                <Route path="blogs/categories" element={<AdminCategories />} />
                <Route path="blogs/new" element={<AdminBlogEdit />} />
                <Route path="blogs/edit/:id" element={<AdminBlogEdit />} />
                <Route path="portfolio" element={<AdminPortfolios />} />
                <Route path="portfolio/new" element={<AdminPortfolioEdit />} />
                <Route path="portfolio/edit/:id" element={<AdminPortfolioEdit />} />
                <Route path="portfolio/categories" element={<AdminPortfolioCategories />} />
                <Route path="portfolio/tags" element={<AdminPortfolioTags />} />
                <Route path="portfolio/filters" element={<AdminPortfolioFilters />} />
                <Route path="demos" element={<AdminDemos />} />
                <Route path="demos/new" element={<AdminDemoEdit />} />
                <Route path="demos/edit/:id" element={<AdminDemoEdit />} />
                <Route path="demos/categories" element={<AdminDemoCategories />} />
                <Route path="appearance" element={<AdminAppearance />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="profile" element={<AdminProfile />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="redirects" element={<AdminRedirects />} />
                <Route path="forms" element={<AdminForms />} />
                <Route path="pages" element={<AdminPages />} />
                <Route path="pages/edit/:id" element={<PageEditor />} />
              </Route>

              {/* Dynamic Page Catch-all (must be last) */}
              <Route path="/:slug" element={<DynamicPage />} />
            </Routes>
            {!isAdminRoute && <Footer />}
          </div >
        </PageSeoWrapper>
      </Router >
    </SettingsProvider>
  );
}

export default App;
