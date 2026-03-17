import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import CibatoSlideButton from './CibatoSlideButton';
import { API_URL } from '../utils/api';

interface NavigationProps {
  scrolled: boolean;
}

interface MenuItem {
  id: string;
  title: string;
  path: string;
  children?: MenuItem[];
  // type is optional in DB but implied by children
}

const Navigation = ({ scrolled }: NavigationProps) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false); // Kept for mobile toggle logic simplicity if needed, but mainly we use hover for desktop
  const [activeSubMenu, setActiveSubMenu] = useState<number | null>(null);

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/menus`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setMenuItems(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load menus", err);
        setLoading(false);
      });
  }, []);

  const renderDesktopMenu = (items: MenuItem[]) => {
    return items.map((item, index) => {
      // Check for children to decide if it's a dropdown or link
      const hasChildren = Array.isArray(item.children) && item.children.length > 0;

      if (hasChildren) {
        return (
          <div
            key={item.id}
            className="relative group z-50"
            onMouseEnter={() => { }} // Hover handled by CSS group-hover usually, but for complex interaction we might need state.
          // The original code used setServicesOpen for the specific "Services" dropdown.
          // For a generic generic system, 'group-hover' is best.
          >
            <Link to={item.path} className="flex items-center space-x-1 text-slate-800 hover:text-cyan-500 font-semibold transition-all duration-300 py-2">
              <span>{item.title}</span>
              <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
            </Link>

            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 transition-all duration-300 opacity-0 -translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible">
              <div className="grid grid-cols-1 gap-1 p-3">
                {item.children!.map((subItem, subIndex) => {
                  const hasSubChildren = Array.isArray(subItem.children) && subItem.children.length > 0;

                  if (hasSubChildren) {
                    return (
                      <div
                        key={subItem.id}
                        className="relative group/item"
                      >
                        <Link
                          to={subItem.path}
                          className="flex items-center justify-between w-full px-4 py-2 text-sm text-slate-700 hover:text-cyan-500 hover:bg-slate-50 rounded-lg transition-all duration-200"
                        >
                          <span>{subItem.title}</span>
                          <ChevronDown className="w-4 h-4 -rotate-90 text-slate-400 group-hover/item:text-cyan-500" />
                        </Link>
                        {/* Submenu Level 2 */}
                        <div className="absolute top-0 left-full ml-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 transition-all duration-200 opacity-0 -translate-x-2 invisible group-hover/item:opacity-100 group-hover/item:translate-x-0 group-hover/item:visible">
                          {subItem.children!.map((subSubItem) => (
                            <Link
                              key={subSubItem.id}
                              to={subSubItem.path}
                              className="block px-4 py-2 text-sm text-slate-700 hover:text-cyan-500 hover:bg-slate-50 rounded-lg transition-all duration-200"
                            >
                              {subSubItem.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={subItem.id}
                      to={subItem.path}
                      className="block px-4 py-2 text-sm text-slate-700 hover:text-cyan-500 hover:bg-slate-50 rounded-lg transition-all duration-200"
                    >
                      {subItem.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        );
      }

      return (
        <Link key={item.id} to={item.path} className="relative px-4 py-2 text-slate-800 hover:text-cyan-500 font-semibold transition-all duration-300 group">
          <span className="relative z-10">{item.title}</span>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Link>
      );
    });
  };

  const renderMobileMenu = (items: MenuItem[]) => {
    // For mobile we might need recursion or just simplified 2-level
    return items.map((item) => {
      const hasChildren = Array.isArray(item.children) && item.children.length > 0;

      if (hasChildren) {
        return (
          <div key={item.id} className="px-4 py-2">
            <button
              onClick={() => setServicesOpen(!servicesOpen)} // Reusing this state for the first dropdown found? A bit hacky if multiple dropdowns.
              // Ideally we should have a `openSubMenuId` state.
              // But since we likely only have one main dropdown (Services) for now, this is okay.
              // Or better, let's use a local details/summary approach or just simple generic state?
              // "Services" is hardcoded in the old code.
              // Let's stick to the old behavior: only one dropdown was "Services".
              // But now any item could be a dropdown.
              // Let's maintain a set of open IDs for mobile?
              className="flex items-center justify-between w-full text-slate-700 hover:text-cyan-500"
            >
              <span>{item.title}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300`} />
            </button>
            {/* Simplified: Always show children or use a simple hack. 
                        Users probably only expect the Services menu to expand. 
                        Let's just show them inline for now to avoid complex state refactor, 
                        OR give them an indent.
                    */}
            <div className="mt-2 ml-4 space-y-1 border-l-2 border-slate-100 pl-4">
              {item.children!.map((subItem) => (
                <div key={subItem.id}>
                  {Array.isArray(subItem.children) && subItem.children.length > 0 ? (
                    <div className="py-1">
                      <Link to={subItem.path} className="block py-1 text-sm font-medium text-slate-700 hover:text-cyan-500" onClick={() => setMobileMenuOpen(false)}>
                        {subItem.title}
                      </Link>
                      <div className="ml-4 mt-1 space-y-1 border-l-2 border-slate-100 pl-4">
                        {subItem.children.map(subSub => (
                          <Link key={subSub.id} to={subSub.path} className="block py-1 text-sm text-slate-600 hover:text-cyan-500" onClick={() => setMobileMenuOpen(false)}>
                            {subSub.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link to={subItem.path} className="block py-1 text-sm text-slate-600 hover:text-cyan-500" onClick={() => setMobileMenuOpen(false)}>
                      {subItem.title}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      }

      return (
        <Link key={item.id} to={item.path} className="block px-4 py-2 text-slate-700 hover:text-cyan-500 hover:bg-cyan-50 rounded-lg transition-all" onClick={() => setMobileMenuOpen(false)}>
          {item.title}
        </Link>
      );
    });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? 'bg-white/30 backdrop-blur-3xl backdrop-saturate-150 shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] border-b border-white/40'
        : 'bg-white/25 backdrop-blur-3xl backdrop-saturate-150 border-b border-white/30'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Left */}
          <Link to="/" className="flex items-center group cursor-pointer">
            <img
              src="/Cibato Logo Final.png"
              alt="Cibato Logo"
              className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Menu Items - Center */}
          <div className="hidden lg:flex items-center space-x-6">
            {!loading && renderDesktopMenu(menuItems)}
          </div>

          {/* Contact Us Button - Right */}
          <div className="hidden lg:block">
            <CibatoSlideButton
              label="Contact Us"
              onClick={() => navigate('/contact-us')}
              size="small"
            />
          </div>

          <button
            className="lg:hidden text-slate-900 hover:text-cyan-500 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/30 backdrop-blur-3xl backdrop-saturate-150 border-t border-white/40 animate-fade-in max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-6 space-y-3">
            {!loading && renderMobileMenu(menuItems)}
            <CibatoSlideButton
              label="Contact Us"
              onClick={() => navigate('/contact-us')}
              className="w-full justify-between"
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
