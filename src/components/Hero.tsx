import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
 

export const Hero = () => {
  const { t } = useTranslation();
  const backgroundVideoRef = useRef<HTMLVideoElement | null>(null);
  
  useEffect(() => {
    const videoEl = backgroundVideoRef.current;
    if (!videoEl) return;
    
    const applyPlaybackRate = () => {
      // Lower than 1.0 to slow the video motion for a calmer feel
      videoEl.playbackRate = 0.6;
    };

    applyPlaybackRate();
    videoEl.addEventListener('loadedmetadata', applyPlaybackRate);
    videoEl.addEventListener('play', applyPlaybackRate);

    return () => {
      videoEl.removeEventListener('loadedmetadata', applyPlaybackRate);
      videoEl.removeEventListener('play', applyPlaybackRate);
    };
  }, []);
  

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={backgroundVideoRef}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="/a.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Text Content */}
          <div className="animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold text-hero-gold mb-6">
              {t('hero.title')}
            </h1>
            <div className="bg-black/20 backdrop-blur-sm border border-accent/30 rounded-2xl p-6 md:p-8 shadow-elegant mb-4">
              <h2 className="text-2xl md:text-3xl font-display text-accent" dangerouslySetInnerHTML={{ __html: t('hero.subtitle') }}>
              </h2>
            </div>
            <p className="text-lg md:text-xl text-white mb-8 leading-relaxed whitespace-pre-line" dangerouslySetInnerHTML={{ __html: t('hero.description') }}>
            </p>
            <div>
              <Link
                to="/about"
                className="group inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-gradient-to-r from-accent/10 to-accent-hover/10 border-2 border-accent/30 text-accent hover:text-[hsl(var(--accent-hover))] hover:border-accent-hover/50 hover:bg-gradient-to-r hover:from-accent/20 hover:to-accent-hover/20 transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.4)] hover:scale-105 backdrop-blur-sm"
              >
                <span className="font-display font-semibold text-lg tracking-wide">
                  {t('nav.about')}
                </span>
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Slide Indicators removed for video background */}
    </section>
  );
};
