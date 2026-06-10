import { useEffect, useState } from 'react';

interface SplashPageProps {
  onComplete: () => void;
}

export default function SplashPage({ onComplete }: SplashPageProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 500);
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f12]">
      <div
        className={`text-center transition-all duration-500 ${
          fadeOut ? 'opacity-0 scale-[0.97]' : 'opacity-100 scale-100'
        }`}
      >
        <h1 className="text-[2rem] leading-none tracking-[-0.04em] font-bold text-white mb-2">Welcome to APEX.</h1>
        <p className="text-[14px] text-white/50 font-medium tracking-[-0.01em]">Turn expertise into impact.</p>
      </div>
    </div>
  );
}