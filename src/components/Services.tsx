import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import designsImg from '@/assets/service-designs.jpg';
import finishingImg from '@/assets/service-finishing.jpg';
import furnitureImg from '@/assets/service-furniture.jpg';
import landscapingImg from '@/assets/service-landscaping.jpg';
import { serviceCategories } from '@/data/services';

const services = [
  { key: 'designs', image: designsImg },
  { key: 'finishing', image: finishingImg },
  { key: 'furniture', image: furnitureImg },
  { key: 'landscaping', image: landscapingImg },
];

export const Services = () => {
  const { t, i18n } = useTranslation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const isRTL = i18n.language === 'ar';
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [autoIndex, setAutoIndex] = useState(0);

  const categoryContent: Record<string, { image: string; descriptionAr: string; descriptionEn: string; pointsAr: string[]; pointsEn: string[] }> = {
    designs: {
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&q=80',
      descriptionAr: 'نقدّم حلول تصميم متكاملة للمساحات الداخلية والخارجية بلمسات فاخرة وتفاصيل مدروسة بعناية.',
      descriptionEn: 'We deliver holistic interior and exterior design solutions with luxury finishes and carefully crafted details.',
      pointsAr: ['تصاميم مخصّصة حسب الذوق', 'اعتماد خامات فاخرة ومتينة', 'توازن بين الجمال والوظيفة'],
      pointsEn: ['Tailored concepts to your taste', 'Premium, durable materials', 'Balanced aesthetics and function'],
    },
    finishing: {
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=80',
      descriptionAr: 'تشطيبات عالية الجودة من الأرضيات إلى الجدران والإضاءة، بتنفيذ احترافي ومواعيد دقيقة.',
      descriptionEn: 'High-quality finishing from floors to walls and lighting, executed professionally and on schedule.',
      pointsAr: ['إدارة تنفيذ محكمة', 'دقة في التفاصيل النهائية', 'التزام بالجداول الزمنية'],
      pointsEn: ['Tight execution management', 'Attention to finishing details', 'On-time delivery'],
    },
    furniture: {
      image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800&h=600&fit=crop&q=80',
      descriptionAr: 'تصنيع وتأثيث مخصّص ينسجم مع مساحة المنزل أو العمل ويعكس ذوقك الراقي.',
      descriptionEn: 'Custom fabrication and furnishing that harmonize with your space and reflect refined taste.',
      pointsAr: ['تصاميم عملية وأنيقة', 'خامات عالية الجودة', 'تشطيبات دقيقة ومريحة'],
      pointsEn: ['Elegant, practical designs', 'High-grade materials', 'Refined, comfortable finishes'],
    },
    landscaping: {
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&q=80',
      descriptionAr: 'تنسيق خارجي متكامل يشمل المسطحات الخضراء والمسطحات المائية والإضاءة لبيئة مريحة وفاخرة.',
      descriptionEn: 'Complete outdoor landscaping with greenery, water features, and lighting for a serene, luxurious ambiance.',
      pointsAr: ['تصاميم حدائق مخصّصة', 'حلول ري وإضاءة متقدمة', 'مواد مقاومة للعوامل الخارجية'],
      pointsEn: ['Custom garden concepts', 'Advanced irrigation and lighting', 'Weather-resistant materials'],
    },
  };

  // Initialize a default selection
  useEffect(() => {
    if (selectedCategory === null && services.length > 0) {
      setSelectedCategory(services[0].key);
    }
  }, [selectedCategory]);

  // Auto-rotate between categories continuously
  useEffect(() => {
    if (services.length === 0) return;
    const intervalId = setInterval(() => {
      setSelectedCategory(services[autoIndex % services.length].key);
      setAutoIndex((i) => (i + 1) % services.length);
    }, 4000);
    return () => clearInterval(intervalId);
  }, [autoIndex]);

  const currentBg = selectedCategory ? categoryContent[selectedCategory].image : designsImg;

  return (
    <section id="services" className="relative py-24" ref={ref}>
      <div
        className="absolute inset-0 z-0"
        style={{ backgroundImage: `url(${currentBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      <div className="absolute inset-0 z-0 bg-white/60 dark:bg-black/60 backdrop-blur-[2px]" />
      <div className="relative z-10 container mx-auto px-6">
        <div className={`text-center mb-16 ${inView ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-4">
            {t('services.title')}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t('services.subtitle')}
          </p>
        </div>
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 ${inView ? 'animate-slide-up' : 'opacity-0'}`}>
          {services.map((service, index) => (
            <div
              key={service.key}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 
                ${selectedCategory === service.key 
                  ? 'scale-[1.05] shadow-[0_30px_90px_rgba(0,0,0,0.5)] border-2 border-[hsl(var(--accent-hover))] ring-4 ring-[hsl(var(--accent-hover))]/20' 
                  : 'shadow-elegant hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)] hover:scale-[1.02]'}
              `}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => {
                const next = service.key;
                if (selectedCategory !== next) setSelectedCategory(next);
              }}
            >
              <img src={service.image} alt={t(`services.${service.key}`)} className="w-full h-64 sm:h-[280px] md:h-[320px] object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[hsl(25_20%_12%/_0.95)] via-[hsl(25_20%_12%/_0.6)] to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-xl font-display font-semibold text-hero-gold text-center drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover:scale-105">
                  {t(`services.${service.key}`)}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {selectedCategory && (
          <div className={`mt-8 ${inView ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden">
              <div className="px-6 py-4 flex items-center justify-between">
                <Link
                  to={`/services/${selectedCategory}`}
                  className="text-2xl font-display font-bold text-wood hover:text-[hsl(var(--accent-hover))] transition-colors"
                >
                  {isRTL
                    ? serviceCategories.find(c => c.id === selectedCategory)?.nameAr
                    : serviceCategories.find(c => c.id === selectedCategory)?.nameEn}
                </Link>
              </div>
              <div className="px-6 pb-6">
                {selectedCategory && (
                  <div key={selectedCategory} className={`grid grid-cols-1 md:grid-cols-[auto,1fr] gap-6 items-center animate-in fade-in-0 duration-500`}>
                    {/* Image */}
                    <div className={`${isRTL ? 'md:order-2' : 'md:order-1'} ${isRTL ? 'animate-in slide-in-from-right-3' : 'animate-in slide-in-from-left-3'} duration-500 bg-black/10 dark:bg-white/5 rounded-xl p-3 justify-self-start w-fit` }>
                      <img
                        src={categoryContent[selectedCategory].image}
                        alt={isRTL ? serviceCategories.find(c => c.id === selectedCategory)?.nameAr : serviceCategories.find(c => c.id === selectedCategory)?.nameEn}
                        className="w-auto max-h-80 md:max-h-[440px] object-contain rounded-xl shadow-[0_12px_32px_rgba(0,0,0,0.25)]"
                      />
                    </div>
                    {/* Text */}
                    <div className={`${isRTL ? 'md:order-1' : 'md:order-2'} ${isRTL ? 'text-right animate-in slide-in-from-left-3' : 'animate-in slide-in-from-right-3'} duration-500`} dir={isRTL ? 'rtl' : 'ltr'}>
                      <p className="text-base md:text-lg text-foreground/85 leading-relaxed mb-4">
                        {isRTL ? categoryContent[selectedCategory].descriptionAr : categoryContent[selectedCategory].descriptionEn}
                      </p>
                      <ul
                        className={`space-y-2 mb-6 ${isRTL ? 'text-right flex flex-col items-end' : ''}`}
                        dir={isRTL ? 'rtl' : 'ltr'}
                      >
                        {(isRTL ? categoryContent[selectedCategory].pointsAr : categoryContent[selectedCategory].pointsEn).map((pt, i) => (
                          <li
                            key={i}
                            className={`flex items-start gap-2 text-sm md:text-base text-foreground/90 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}
                          >
                            <span
                              className={`mt-1 w-2 h-2 rounded-full bg-[hsl(var(--accent-hover))] flex-shrink-0 ${isRTL ? 'ml-2 mr-0' : ''}`}
                            />
                            {pt}
                          </li>
                        ))}
                      </ul>
                      <Link
                        to={`/services/${selectedCategory}`}
                        className="inline-flex items-center justify-center px-6 py-3 rounded-xl border-2 border-[hsl(var(--accent-hover))] text-wood dark:text-[hsl(var(--accent-hover))] hover:bg-[hsl(var(--accent-hover))]/10 transition-all duration-300 shadow-[0_6px_20px_rgba(0,0,0,0.35)]"
                      >
                        {isRTL ? 'استكشف المزيد عن الخدمة' : 'Explore this service'}
                        <ArrowRight className={`ml-2 w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
