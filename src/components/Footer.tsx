import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

export const Footer = () => {
  const { t } = useTranslation();
  const copy = t('footer.copyright');
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollHomeSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => scrollToId(id), 60);
    } else {
      scrollToId(id);
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-display font-bold text-[hsl(var(--accent-hover))]">AL-MOHRA</span>
            </div>
            <p className="text-primary-foreground/80 mb-6">
              {t('footer.description')}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-wood/20 flex items-center justify-center transition-colors text-white dark:text-wood">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-wood/20 flex items-center justify-center transition-colors text-white dark:text-wood">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-wood/20 flex items-center justify-center transition-colors text-white dark:text-wood">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-wood/20 flex items-center justify-center transition-colors text-white dark:text-wood">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-4 text-[hsl(var(--accent-hover))]">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-primary-foreground/80 hover:text-accent transition-colors">{t('nav.home')}</Link></li>
              <li><Link to="/about" className="text-primary-foreground/80 hover:text-accent transition-colors">{t('nav.about')}</Link></li>
              <li>
                <Link
                  to="/"
                  onClick={(e) => { e.preventDefault(); handleScrollHomeSection('services'); }}
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  onClick={(e) => { e.preventDefault(); handleScrollHomeSection('projects'); }}
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  {t('nav.projects')}
                </Link>
              </li>
              <li><Link to="/contact" className="text-primary-foreground/80 hover:text-accent transition-colors">{t('nav.contact')}</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-4 text-[hsl(var(--accent-hover))]">{t('footer.services')}</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <Link to="/services/furniture" className="hover:text-accent transition-colors">
                  {t('services.furniture')}
                </Link>
              </li>
              <li>
                <Link to="/services/landscaping" className="hover:text-accent transition-colors">
                  {t('services.landscaping')}
                </Link>
              </li>
              <li>
                <Link to="/services/finishing" className="hover:text-accent transition-colors">
                  {t('services.finishing')}
                </Link>
              </li>
              <li>
                <Link to="/services/designs" className="hover:text-accent transition-colors">
                  {t('services.designs')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-4 text-[hsl(var(--accent-hover))]">{t('footer.contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-white dark:text-wood mt-1 flex-shrink-0" />
                <span className="text-primary-foreground/80">Dubai, United Arab Emirates</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-white dark:text-wood flex-shrink-0" />
                <span className="text-primary-foreground/80">+971 4 XXX XXXX</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-white dark:text-wood flex-shrink-0" />
                <span className="text-primary-foreground/80">info@al-mohra.com</span>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-sm font-semibold mb-2">{t('footer.workingHours')}</p>
              <p className="text-sm text-primary-foreground/80">{t('footer.monFri')}</p>
              <p className="text-sm text-primary-foreground/80">{t('footer.sat')}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/60">
          <p dangerouslySetInnerHTML={{ __html: copy.replace('AIeMS', '<a href="https://aiems.ae" target="_blank" rel="noopener noreferrer" class="underline hover:text-[hsl(var(--accent-hover))]">AIeMS</a>') }} />
        </div>
      </div>
    </footer>
  );
};
