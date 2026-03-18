import React, { useEffect, useState } from 'react';
import { useSettings } from '../context/SettingsContext';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const { settings, loading } = useSettings();
  const [phase, setPhase] = useState<'waiting' | 'reveal' | 'shimmer' | 'exit-ready' | 'exit'>('waiting');
  const [unmounting, setUnmounting] = useState(false);

  const brandName = settings.brandName || 'prestigeAuto';
  const letters = brandName.split('');

  useEffect(() => {
    // Wait until settings are loaded before starting animations
    if (loading) return;
    
    setPhase('reveal');

    // 1. Reveal Phase: Staggered mask up
    // Base 800ms + stagger duration + 400ms buffer
    const revealTime = 800 + letters.length * 50 + 400;
    
    // 2. Schedule Shimmer
    const shimmerTimer = setTimeout(() => {
      setPhase('shimmer');
    }, revealTime);

    // 3. Schedule Exit Ready (wait for shimmer to finish, ~1500ms)
    const exitReadyTimer = setTimeout(() => {
      setPhase(p => (p === 'shimmer' ? 'exit-ready' : p) as any);
    }, revealTime + 1500);

    return () => {
      clearTimeout(shimmerTimer);
      clearTimeout(exitReadyTimer);
    };
  }, [loading, letters.length]);

  useEffect(() => {
    // 4. Trigger actual exit if ready
    if (phase === 'exit-ready') {
      setPhase('exit');
    }
  }, [phase]);

  useEffect(() => {
    // 5. Handle unmounting after scale-out animation finishes
    if (phase === 'exit') {
      const t = setTimeout(() => {
        setUnmounting(true);
        onComplete();
      }, 700); // Wait for scale down and fade out
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  if (unmounting) return null;

  return (
    <div 
      className={`fixed inset-0 z-[99999] flex items-center justify-center bg-[#111111] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        phase === 'exit' ? 'scale-110 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
      }`}
      style={{
        transitionProperty: 'transform, opacity',
        opacity: phase === 'exit' ? 0 : 1,
        transform: phase === 'exit' ? 'scale(0.9)' : 'scale(1)'
      }}
    >
      <div 
        className={`flex font-black tracking-[0.4em] uppercase text-3xl sm:text-4xl md:text-6xl ${
          phase === 'shimmer' || phase === 'exit-ready' ? 'shimmer-text' : 'text-slate-100'
        }`}
      >
        {letters.map((letter, i) => (
          <span key={i} className="inline-block overflow-hidden pt-4 pb-4 -mt-4 -mb-4 px-[1px]">
            <span 
              className={`inline-block origin-bottom ${phase !== 'waiting' ? 'mask-up-animation' : 'opacity-0 translate-y-[120%]'}`}
              style={{
                animationDelay: phase !== 'waiting' ? `${i * 0.04}s` : '0s'
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          </span>
        ))}
      </div>

      <style>{`
        .mask-up-animation {
          transform: translateY(120%);
          opacity: 0;
          animation: maskUp 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        @keyframes maskUp {
          from {
            transform: translateY(120%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .shimmer-text {
          background: linear-gradient(
            120deg,
            #f1f5f9 35%,
            var(--brand-color, #f59e0b) 50%,
            #f1f5f9 65%
          );
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shine 1.5s ease-in-out forwards;
        }

        @keyframes shine {
          0% {
            background-position: -100% center;
          }
          100% {
            background-position: 200% center;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
