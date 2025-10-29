import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, Globe, ChevronDown, Menu, X } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { serviceCategories } from '@/data/services';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [isRTL, i18n.language]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');
  };

  const navItems = [
    { label: t('nav.about'), path: '/about', type: 'link' },
    { label: t('nav.projects'), path: '/#projects', type: 'scroll' },
    { label: t('nav.clients'), path: '/#clients', type: 'scroll' },
    { label: t('nav.services'), path: '/#services', type: 'scroll' },
    { label: t('nav.contact'), path: '/contact', type: 'link' },
  ];

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // scrollToClients already declared below; keeping single declaration

  const handleScrollNav = async (path: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        if (path.includes('#services')) scrollToServices();
        else if (path.includes('#projects')) scrollToProjects();
        else if (path.includes('#clients')) scrollToClients();
      }, 60);
    } else {
      if (path.includes('#services')) scrollToServices();
      else if (path.includes('#projects')) scrollToProjects();
      else if (path.includes('#clients')) scrollToClients();
    }
    setMobileOpen(false);
  };

  const scrollToClients = () => {
    const el = document.getElementById('clients');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'shadow-elegant'
          : 'bg-transparent'
      }`}
      style={{
        backgroundColor: isScrolled ? 'var(--navbar-bg-scrolled)' : 'transparent',
        backdropFilter: isScrolled ? 'var(--navbar-blur)' : 'none',
      }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="text-2xl font-display font-bold hover-gold text-accent">
              AL-MOHRA
            </span>
          </Link>

          {/* Nav Items - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              if (item.type === 'scroll') {
                return (
                  <button
                    key={item.path}
                    className="text-sm font-medium hover-gold text-accent"
                    onClick={() => {
                      if (location.pathname !== '/') {
                        navigate('/');
                        // Delay to allow navigation/render, then scroll
                        setTimeout(() => {
                          if (item.path.includes('#services')) scrollToServices();
                          else if (item.path.includes('#projects')) scrollToProjects();
                        else if (item.path.includes('#clients')) scrollToClients();
                        }, 50);
                      } else {
                        if (item.path.includes('#services')) scrollToServices();
                        else if (item.path.includes('#projects')) scrollToProjects();
                      else if (item.path.includes('#clients')) scrollToClients();
                      }
                    }}
                  >
                    {item.label}
                  </button>
                );
              }
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium hover-gold text-accent ${
                    location.pathname === item.path ? 'text-accent' : ''
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            
            {/* Service Categories Dropdowns */}
            {serviceCategories.map((category) => (
              <div key={category.id} className="relative">
                <button
                  onMouseEnter={() => setActiveMenu(category.id)}
                  className="text-sm font-medium hover-gold text-accent flex items-center gap-1"
                >
                  {isRTL ? category.nameAr : category.nameEn}
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {activeMenu === category.id && (
                  <div
                    onMouseLeave={() => setActiveMenu(null)}
                    className="absolute top-full left-0 pt-4 z-50"
                    style={{ 
                      width: 'max-content',
                      minWidth: '300px',
                      maxWidth: '400px'
                    }}
                  >
                    <div className="bg-card border border-border shadow-elegant rounded-lg overflow-hidden">
                      <div className="px-6 py-4">
                        <h3 className="font-display font-semibold mb-4 text-lg border-b border-accent/20 pb-2" style={{ color: 'hsl(var(--accent-hover))' }}>
                          {isRTL ? category.nameAr : category.nameEn}
                        </h3>
                        <div className="space-y-2">
                          {category.items.map((item) => (
                            <Link
                              key={item.id}
                              to={`/services/${category.id}/${item.id}`}
                              onClick={() => setActiveMenu(null)}
                              className={`block w-full text-sm text-muted-foreground transition-colors py-2 px-2 rounded ${
                                isRTL ? 'text-right' : 'text-left'
                              }`}
                              style={{
                                '--hover-bg': 'rgba(0, 0, 0, 0.1)',
                                '--hover-text': 'hsl(var(--accent-hover))'
                              } as React.CSSProperties}
                              onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
                                (e.currentTarget as HTMLElement).style.color = 'hsl(var(--accent-hover))';
                              }}
                              onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                                (e.currentTarget as HTMLElement).style.color = '';
                              }}
                            >
                              {isRTL ? item.nameAr : item.nameEn}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="hover-gold text-accent"
            >
              <Globe className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hover-gold text-accent"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover-gold text-accent"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Open menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-20 z-40">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="relative bg-card border-t border-border shadow-elegant p-4 max-h-[75vh] overflow-y-auto">
            <div className="space-y-2">
              {navItems.map((item) => (
                item.type === 'scroll' ? (
                  <button
                    key={item.path}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-wood hover:text-[hsl(var(--accent-hover))] hover:bg-accent/10"
                    onClick={() => handleScrollNav(item.path)}
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2 rounded-lg text-sm font-medium text-wood hover:text-[hsl(var(--accent-hover))] hover:bg-accent/10"
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>
            {/* Services categories */}
            <div className="mt-4">
              <h4 className="px-3 py-2 text-xs uppercase tracking-wide text-muted-foreground">{isRTL ? 'الخدمات' : 'Services'}</h4>
              <Accordion type="single" collapsible className="w-full">
                {serviceCategories.map((cat) => (
                  <AccordionItem key={cat.id} value={cat.id}>
                    <AccordionTrigger className="px-3 text-left">
                      <span className="text-sm font-medium text-accent" style={{ color: 'hsl(var(--accent-hover))' }}>
                        {isRTL ? cat.nameAr : cat.nameEn}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 gap-1 px-3 pb-2">
                        <Link
                          to={`/services/${cat.id}`}
                          onClick={() => setMobileOpen(false)}
                          className="text-sm text-muted-foreground hover:text-[hsl(var(--accent-hover))]"
                        >
                          {isRTL ? 'صفحة الخدمة' : 'Category page'}
                        </Link>
                        {cat.items.map((it) => (
                          <Link
                            key={it.id}
                            to={`/services/${cat.id}/${it.id}`}
                            onClick={() => setMobileOpen(false)}
                            className="text-sm text-muted-foreground hover:text-[hsl(var(--accent-hover))]"
                          >
                            {isRTL ? it.nameAr : it.nameEn}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            {/* Lang/Theme in menu */}
            <div className="mt-4 flex items-center gap-2 px-1">
              <Button variant="outline" className="text-wood hover:text-[hsl(var(--accent-hover))]" onClick={toggleLanguage}>
                {isRTL ? 'English' : 'العربية'}
              </Button>
              <Button variant="outline" className="text-wood hover:text-[hsl(var(--accent-hover))]" onClick={toggleTheme}>
                {isDark ? (isRTL ? 'وضع فاتح' : 'Light') : (isRTL ? 'وضع داكن' : 'Dark')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
