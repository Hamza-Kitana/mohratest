import { useEffect, useState } from 'react';

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsComplete(true);
          setTimeout(() => setIsHidden(true), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  if (isHidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center transition-opacity duration-500 ${
        isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Logo/Title */}
      <div className="mb-12 animate-fade-in relative">
        {/* SVG title with gold stroke and sweeping light around outline */}
        <div className="relative z-10">
          <svg
            viewBox="0 0 1000 150"
            className="w-[85vw] sm:w-[min(90vw,900px)] max-w-[900px] h-auto"
            aria-label="AL-MOHRA"
            style={{
              minWidth: '280px',
            }}
          >
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="goldBase" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(45 50% 53%)" />
                <stop offset="100%" stopColor="hsl(45 50% 53%)" />
              </linearGradient>
              <linearGradient id="goldBright" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(60 100% 75%)" />
                <stop offset="100%" stopColor="hsl(45 100% 65%)" />
              </linearGradient>
            </defs>

            {/* Base gold stroke outline */}
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fill="transparent"
              stroke="url(#goldBase)"
              strokeWidth="2.5"
              strokeLinejoin="round"
              strokeLinecap="round"
              style={{ filter: 'url(#glow)' }}
              fontFamily="Inter, ui-sans-serif, system-ui"
              fontWeight={800}
              fontSize={100}
              letterSpacing={4}
            >
              AL-MOHRA
            </text>

            {/* Sweeping light along the outline */}
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fill="transparent"
              stroke="url(#goldBright)"
              strokeWidth="2.8"
              strokeLinejoin="round"
              strokeLinecap="round"
              className="animate-stroke-sweep"
              fontFamily="Inter, ui-sans-serif, system-ui"
              fontWeight={800}
              fontSize={100}
              letterSpacing={4}
              style={{ filter: 'url(#glow)' }}
            >
              AL-MOHRA
            </text>
          </svg>
        </div>

        {/* Underline */}
        <div className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-[hsl(45_50%_53%)] to-transparent rounded-full animate-pulse" />
      </div>

      {/* Progress Bar Container */}
      <div className="w-full max-w-md px-8">
        {/* Progress Bar Track */}
        <div className="h-2 bg-secondary/30 rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-[hsl(var(--accent-hover))] to-[hsl(var(--accent-hover))]/80 rounded-full transition-all duration-300 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          </div>
        </div>
        
        {/* Progress Percentage */}
        <div className="mt-4 text-center">
          <span className="text-sm font-medium text-muted-foreground">
            {progress}%
          </span>
        </div>
      </div>

      {/* Subtle dots animation */}
      <div className="flex gap-2 mt-8">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-[hsl(var(--accent-hover))] animate-bounce"
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: '1s',
            }}
          />
        ))}
      </div>
    </div>
  );
};
