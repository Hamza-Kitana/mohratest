import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { serviceCategories } from '@/data/services';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import designsImg from '@/assets/service-designs.jpg';
import finishingImg from '@/assets/service-finishing.jpg';
import furnitureImg from '@/assets/service-furniture.jpg';
import landscapingImg from '@/assets/service-landscaping.jpg';
import { useEffect, useState } from 'react';

const ServiceCategory = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const navigate = useNavigate();
  const params = useParams();
  const { categoryId, itemId } = params as { categoryId: string; itemId?: string };
  const [highlightedItemId, setHighlightedItemId] = useState<string | null>(null);

  const category = serviceCategories.find((c) => c.id === categoryId);

  const mainServices = [
    { id: 'designs', name: isRTL ? 'التصاميم' : 'Designs' },
    { id: 'finishing', name: isRTL ? 'تشطيبات' : 'Finishing' },
    { id: 'furniture', name: isRTL ? 'الأثاث' : 'Furniture' },
    { id: 'landscaping', name: isRTL ? 'تنسيق خارجي' : 'Landscaping' },
  ];

  const categoryImageMap: Record<string, string> = {
    designs: designsImg,
    finishing: finishingImg,
    furniture: furnitureImg,
    landscaping: landscapingImg,
  };

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-display font-bold mb-2">{isRTL ? 'الخدمة غير موجودة' : 'Service not found'}</h1>
          <Link to="/" className="text-[hsl(var(--accent-hover))] underline">{isRTL ? 'العودة للرئيسية' : 'Back to home'}</Link>
        </div>
      </div>
    );
  }

  // If itemId provided, scroll to that card and highlight it briefly
  useEffect(() => {
    if (!itemId) return;
    const el = document.getElementById(`sub-${itemId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setHighlightedItemId(itemId);
      const t = setTimeout(() => setHighlightedItemId(null), 3000);
      return () => clearTimeout(t);
    }
  }, [itemId]);

  return (
    <div className="min-h-screen bg-background">
      {/* Primary navbar from home */}
      <Navbar />

      {/* Hero with image and overlaid title */}
      <div className="relative">
        <img
          src={categoryImageMap[category.id]}
          alt={isRTL ? category.nameAr : category.nameEn}
          className="w-full h-[340px] md:h-[420px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(25_20%_12%/_0.9)] via-[hsl(25_20%_12%/_0.5)] to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-6 pb-8">
            <div className="inline-block rounded-2xl border border-[hsl(var(--accent-hover))]/30 bg-[hsl(25_20%_12%/_0.55)] backdrop-blur-sm shadow-[0_12px_36px_rgba(0,0,0,0.45)] px-5 py-3">
              <h1 className="text-4xl md:text-5xl font-display font-extrabold text-[hsl(var(--accent-hover))]">
                {isRTL ? category.nameAr : category.nameEn}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Back button */}
      <div className="container mx-auto px-6 pt-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-[hsl(var(--accent-hover))] text-[hsl(var(--accent-hover))] hover:bg-[hsl(var(--accent-hover))]/10 transition-all duration-300 shadow-[0_6px_18px_rgba(0,0,0,0.15)]"
        >
          <ArrowLeft className={`w-4 h-4 ${isRTL ? 'rotate-180 order-2 ml-0 mr-1' : 'order-1'}`} />
          <span className={`${isRTL ? 'order-1' : 'order-2'}`}>{isRTL ? 'رجوع' : 'Back'}</span>
        </button>
      </div>

      {/* Secondary sticky nav - compact around four items (placed after hero) */}
      <div className="sticky top-20 z-40 bg-transparent">
        <div className="container mx-auto px-4 sm:px-6 py-3">
          <div className="mx-auto w-full max-w-max rounded-full border border-border/60 bg-background/85 backdrop-blur-md px-2 sm:px-3 py-2 overflow-x-auto no-scrollbar">
            <div className={`flex ${isRTL ? 'flex-row-reverse' : ''} items-center justify-center gap-2 sm:gap-3 text-center whitespace-nowrap`}>
              {mainServices.map((s) => (
                <button
                  key={s.id}
                  onClick={() => navigate(`/services/${s.id}`)}
                  className={`px-3 sm:px-4 py-2 rounded-full border transition-all duration-300 ${
                    s.id === categoryId
                      ? 'border-[hsl(var(--accent-hover))] text-[hsl(var(--accent-hover))] bg-[hsl(var(--accent-hover))]/10'
                      : 'border-transparent hover:border-[hsl(var(--accent-hover))] text-muted-foreground hover:text-[hsl(var(--accent-hover))]'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="container mx-auto px-6 pt-8">
        <p className="text-lg md:text-xl text-foreground/85 max-w-4xl leading-relaxed">
          {isRTL
            ? 'نقدم حلولًا متكاملة في هذا القسم تشمل التصميم، التنفيذ، والإشراف بأعلى معايير الجودة، مع لمسات فاخرة واهتمامٍ بالتفاصيل.'
            : 'We deliver end-to-end solutions within this category including design, execution, and supervision at the highest quality standards, with luxury finishes and attention to detail.'}
        </p>
      </div>

      {/* Sub-services with image and description to the right */}
      <div className="container mx-auto px-6 py-10">
        <h2 className="text-2xl font-display font-bold text-wood mb-6">
          {isRTL ? 'الخدمات التابعة' : 'Included Services'}
        </h2>
        <div className="space-y-6">
          {category.items.map((item) => {
            const title = isRTL ? item.nameAr : item.nameEn;
            const desc = isRTL
              ? 'تفاصيل أشمل حول هذه الخدمة، تشمل آلية التنفيذ، جودة المواد، ومعايير الإتقان للوصول إلى نتائج راقية ومتينة.'
              : 'A more comprehensive overview of this service covering execution approach, material quality, and craftsmanship standards for refined and durable outcomes.';
            const points = isRTL
              ? ['خطة تنفيذ واضحة ومُجدولة', 'مواد معتمدة وجودة عالية', 'تسليم مطابق للمواصفات']
              : ['Clear, scheduled execution plan', 'Certified, high-quality materials', 'Delivery aligned with specifications'];

            return (
              <div
                key={item.id}
                id={`sub-${item.id}`}
                className={`grid grid-cols-1 md:grid-cols-12 gap-4 items-center rounded-2xl border border-border bg-card overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:scale-105 hover:shadow-[0_16px_48px_rgba(0,0,0,0.18)] hover:border-[hsl(var(--accent-hover))]/30 ${highlightedItemId === item.id ? 'ring-4 ring-[hsl(var(--accent-hover))]/60 highlight-pulse' : ''}`}
              >
                {/* Image */}
                <div className={`${isRTL ? 'md:col-start-7 md:col-end-13' : 'md:col-span-5'}`}>
                  <img
                    src={categoryImageMap[category.id]}
                    alt={title}
                    className="w-full h-56 md:h-64 object-cover"
                  />
                </div>

                {/* Content */}
                <div className={`${isRTL ? 'md:col-start-1 md:col-end-7 text-right' : 'md:col-span-7'} px-5 py-5`} dir={isRTL ? 'rtl' : 'ltr'}>
                  <span className="inline-flex items-center gap-2 text-lg font-semibold text-foreground">
                    {title}
                  </span>
                  <p className="text-sm text-foreground/85 mt-3 max-w-2xl leading-relaxed">
                    {desc}
                  </p>
                  <ul className={`mt-3 space-y-1.5 ${isRTL ? 'text-right' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
                    {points.map((p, i) => (
                      <li key={i} className={`flex items-start gap-2 text-sm ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                        <span className={`mt-1 w-2 h-2 rounded-full bg-[hsl(var(--accent-hover))] flex-shrink-0 ${isRTL ? 'ml-2' : ''}`} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ServiceCategory;


