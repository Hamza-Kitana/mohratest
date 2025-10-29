import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { Quote, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

// Company logos data
const companyLogos = [
  { id: 1, name: 'Emirates Airlines', logo: 'https://logos-world.net/wp-content/uploads/2020/09/Emirates-Logo.png' },
  { id: 2, name: 'Dubai Mall', logo: 'https://logos-world.net/wp-content/uploads/2020/09/Dubai-Mall-Logo.png' },
  { id: 3, name: 'Burj Al Arab', logo: 'https://logos-world.net/wp-content/uploads/2020/09/Burj-Al-Arab-Logo.png' },
  { id: 4, name: 'Emaar Properties', logo: 'https://logos-world.net/wp-content/uploads/2020/09/Emaar-Logo.png' },
  { id: 5, name: 'Dubai Holding', logo: 'https://logos-world.net/wp-content/uploads/2020/09/Dubai-Holding-Logo.png' },
  { id: 6, name: 'Nakheel', logo: 'https://logos-world.net/wp-content/uploads/2020/09/Nakheel-Logo.png' },
  { id: 7, name: 'Dubai Municipality', logo: 'https://logos-world.net/wp-content/uploads/2020/09/Dubai-Municipality-Logo.png' },
  { id: 8, name: 'Dubai Airports', logo: 'https://logos-world.net/wp-content/uploads/2020/09/Dubai-Airports-Logo.png' },
  { id: 9, name: 'Dubai Islamic Bank', logo: 'https://logos-world.net/wp-content/uploads/2020/09/Dubai-Islamic-Bank-Logo.png' },
  { id: 10, name: 'Dubai World', logo: 'https://logos-world.net/wp-content/uploads/2020/09/Dubai-World-Logo.png' },
];

const testimonials = [
  {
    id: 1,
    name: 'أحمد المنصوري',
    nameEn: 'Ahmed Al Mansouri',
    role: 'مالك فيلا',
    roleEn: 'Villa Owner',
    content: 'المهرة حولت فيلتنا بحرفية استثنائية واهتمام بالتفاصيل. أعمال التشطيب تجاوزت توقعاتنا.',
    contentEn: 'AL-MOHRA transformed our villa with exceptional craftsmanship and attention to detail. The finishing work exceeded our expectations.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=200&h=200&fit=crop&crop=faces'
  },
  {
    id: 2,
    name: 'سارة جونسون',
    nameEn: 'Sarah Johnson',
    role: 'عميل تجاري',
    roleEn: 'Commercial Client',
    content: 'خدمة مهنية من البداية للنهاية. تصميم التنسيق الخارجي أحيى مساحتنا الخارجية بجمال.',
    contentEn: 'Professional service from start to finish. The landscaping design brought our outdoor space to life beautifully.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&fit=crop&crop=faces'
  },
  {
    id: 3,
    name: 'محمد حسن',
    nameEn: 'Mohammed Hassan',
    role: 'مشروع سكني',
    roleEn: 'Residential Project',
    content: 'جودة متميزة وتسليم في الوقت المحدد. فريقهم فهم رؤيتنا ونفذها بشكل مثالي.',
    contentEn: 'Outstanding quality and timely delivery. Their team understood our vision and executed it perfectly.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&h=200&fit=crop&crop=faces'
  },
  {
    id: 4,
    name: 'فاطمة العلي',
    nameEn: 'Fatima Al Ali',
    role: 'مدير مشروع',
    roleEn: 'Project Manager',
    content: 'تعاون ممتاز وتنفيذ دقيق. المشروع تم تسليمه قبل الموعد المحدد وبجودة عالية.',
    contentEn: 'Excellent collaboration and precise execution. The project was delivered ahead of schedule with high quality.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1547425176-76bcadfb4f2c?q=80&w=200&h=200&fit=crop&crop=faces'
  },
  {
    id: 5,
    name: 'خالد الراشد',
    nameEn: 'Khalid Al Rashid',
    role: 'مطور عقاري',
    roleEn: 'Real Estate Developer',
    content: 'شراكة استراتيجية ممتازة. خدماتهم ساعدتنا في إنجاز مشاريعنا بكفاءة عالية.',
    contentEn: 'Excellent strategic partnership. Their services helped us complete our projects with high efficiency.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a2c9f9?q=80&w=200&h=200&fit=crop&crop=faces'
  },
];

export const Clients = () => {
  const { t, i18n } = useTranslation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const isRTL = i18n.language === 'ar';

  return (
    <section id="clients" className="py-24 bg-secondary/30" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className={`text-center mb-12 sm:mb-16 ${inView ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-4">
            {t('clients.title')}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t('clients.subtitle')}
          </p>
        </div>

        {/* Animated Company Logos */}
        <div className={`mb-12 sm:mb-20 ${inView ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
          <div className="relative overflow-hidden">
            <div className={`flex whitespace-nowrap gap-16 ${isRTL ? 'animate-scroll-rtl' : 'animate-scroll-ltr'}`}>
              {/* First set of logos */}
              {companyLogos.map((company) => (
                <div
                  key={`first-${company.id}`}
                  className="flex-shrink-0 mx-8 flex items-center justify-center"
                >
                  <div className="w-40 h-20 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center p-4 hover:shadow-xl transition-shadow duration-300">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex';
                      }}
                    />
                    <div className="hidden w-full h-full items-center justify-center text-gray-400 text-sm font-medium">
                      {company.name}
                    </div>
                  </div>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {companyLogos.map((company) => (
                <div
                  key={`second-${company.id}`}
                  className="flex-shrink-0 mx-8 flex items-center justify-center"
                >
                  <div className="w-40 h-20 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center p-4 hover:shadow-xl transition-shadow duration-300">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex';
                      }}
                    />
                    <div className="hidden w-full h-full items-center justify-center text-gray-400 text-sm font-medium">
                      {company.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Client Testimonials */}
        <div className={`${inView ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '400ms' }}>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-display font-bold text-foreground mb-4">
              {t('clients.testimonials')}
            </h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <Card
                key={testimonial.id}
                className="p-8 bg-[hsl(25_25%_88%)] dark:bg-[hsl(25_20%_12%)] border-2 border-wood/30 dark:border-white/10 hover:border-wood dark:hover:border-wood transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_18px_60px_rgba(0,0,0,0.18)] dark:hover:shadow-[0_18px_60px_rgba(0,0,0,0.6)]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Quote className="w-12 h-12 text-wood/80 dark:text-[hsl(var(--accent-hover))] mb-4" />
                <p className="text-black dark:text-white mb-6 leading-relaxed">
                  "{isRTL ? testimonial.content : testimonial.contentEn}"
                </p>
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12 ring-2 ring-wood/30 dark:ring-white/10">
                    <AvatarImage src={testimonial.avatar} alt={isRTL ? testimonial.name : testimonial.nameEn} />
                    <AvatarFallback>{(isRTL ? testimonial.name : testimonial.nameEn).slice(0,1)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-black dark:text-white">
                      {isRTL ? testimonial.name : testimonial.nameEn}
                    </h4>
                    <p className="text-sm text-black/70 dark:text-white/70">
                      {isRTL ? testimonial.role : testimonial.roleEn}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 mt-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-wood/80 dark:text-[hsl(var(--accent-hover))] fill-current" />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
