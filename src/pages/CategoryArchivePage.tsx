
import { useParams } from 'react-router-dom';
import BlogGrid from '../components/BlogGrid';
import Contact from '../components/Contact';

const CategoryArchivePage = () => {
    const { slug } = useParams();

    // Convert slug to readable title (e.g. web-design -> Web Design)
    const title = slug
        ? slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        : 'Category';

    return (
        <>
            <section className="pt-[140px] pb-[10px] lg:pt-[180px] lg:pb-[30px] bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
                <div className="container-custom relative z-10 text-center">
                    <span className="inline-block px-4 py-1.5 bg-cyan-500/20 text-cyan-400 font-bold rounded-full mb-4 border border-cyan-500/30">
                        Category Archive
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black mb-6">
                        {title}
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Browse all articles related to {title}.
                    </p>
                </div>
            </section>

            <BlogGrid categorySlug={slug} />
            <Contact />
        </>
    );
};

export default CategoryArchivePage;
