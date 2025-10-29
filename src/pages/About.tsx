import { useTranslation } from 'react-i18next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Award, Users, Target, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function About() {
  const { t } = useTranslation();
  const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true, threshold: 0.6, rootMargin: '0px 0px -20% 0px' });

  const AnimatedCounter: React.FC<{ target: number; durationMs?: number; suffix?: string }> = ({ target, durationMs = 1600, suffix = '' }) => {
    const [value, setValue] = useState(0);
    const startTsRef = useRef<number | null>(null);
    const frameRef = useRef<number | null>(null);

    useEffect(() => {
      if (!statsInView) return;
      // Reset to 0 then animate to target
      setValue(0);
      startTsRef.current = null;
      const step = (ts: number) => {
        if (startTsRef.current === null) startTsRef.current = ts;
        const elapsed = ts - (startTsRef.current || 0);
        const progress = Math.min(1, elapsed / durationMs);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.floor(eased * target));
        if (progress < 1) {
          frameRef.current = requestAnimationFrame(step);
        } else {
          setValue(target);
        }
      };
      frameRef.current = requestAnimationFrame(step);
      return () => {
        if (frameRef.current) cancelAnimationFrame(frameRef.current);
      };
    }, [statsInView, target, durationMs]);

    return (
      <span>
        {value.toLocaleString()} {suffix}
      </span>
    );
  };

  const values = [
    {
      icon: Award,
      title: t('about.values.excellence.title'),
      description: t('about.values.excellence.description'),
    },
    {
      icon: Users,
      title: t('about.values.clientFocus.title'),
      description: t('about.values.clientFocus.description'),
    },
    {
      icon: Target,
      title: t('about.values.precision.title'),
      description: t('about.values.precision.description'),
    },
    {
      icon: Sparkles,
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.description'),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-wood text-primary-foreground">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-primary-foreground dark:text-white">
              {t('about.heroTitle')}
            </h1>
            <p className="text-xl text-primary-foreground/90 dark:text-white/90 leading-relaxed">
              {t('about.heroSubtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl font-display font-bold text-[hsl(var(--accent-hover))] mb-6">
                {t('about.storyTitle')}
              </h2>
              <div className="space-y-4 text-muted-foreground dark:text-white/80 leading-relaxed">
                <p>{t('about.storyP1')}</p>
                <p>{t('about.storyP2')}</p>
                <p>{t('about.storyP3')}</p>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-elegant animate-slide-up">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop"
                alt="Our Team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-[hsl(var(--accent-hover))] mb-4">
              {t('about.valuesTitle')}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t('about.valuesSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="p-8 text-center bg-card dark:bg-white/10 border-border dark:border-white/15 hover:border-accent transition-all duration-500 shadow-card hover:shadow-elegant animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center border border-wood/30 dark:border-white/20 bg-secondary/40 dark:bg-white/10">
                  <value.icon className="w-8 h-8 text-wood dark:text-white" />
                </div>
                <h3 className="text-xl font-display font-semibold text-[hsl(var(--accent-hover))] mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground dark:text-white/80">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24" ref={statsRef}>
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: 500, suffix: '+', label: t('about.stats.projects') },
              { number: 15, suffix: '+', label: t('about.stats.years') },
              { number: 200, suffix: '+', label: t('about.stats.clients') },
              { number: 50, suffix: '+', label: t('about.stats.team') },
            ].map((stat, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-5xl font-display font-bold text-wood dark:text-white mb-2">
                  <AnimatedCounter target={stat.number} durationMs={1600 + index * 150} suffix={stat.suffix || ''} />
                </div>
                <div className="text-muted-foreground dark:text-white/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
