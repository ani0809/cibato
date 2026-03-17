import BlogHero from '../components/BlogHero';
import BlogGrid from '../components/BlogGrid';
import Contact from '../components/Contact';
import ErrorBoundary from '../components/ErrorBoundary';

const BlogPage = () => {
    return (
        <>
            {/* Hero Section */}
            <BlogHero />

            {/* Blog Grid */}
            <ErrorBoundary>
                <BlogGrid />
            </ErrorBoundary>

            {/* Contact CTA */}
            <Contact />
        </>
    );
};

export default BlogPage;
