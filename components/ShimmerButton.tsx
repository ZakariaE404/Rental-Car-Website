
import React from 'react';

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const ShimmerButton: React.FC<ShimmerButtonProps> = ({ children, className = "", ...props }) => {
  return (
    <button
      {...props}
      className={`relative overflow-hidden bg-primary-600 text-white font-bold py-2 px-6 border-b-4 border-primary-800 active:border-b-0 active:translate-y-1 transition-all ${className}`}
      style={{ borderRadius: '0' }}
    >
      <div className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </div>
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute inset-0 bg-white/10 -translate-x-full animate-[shimmer_2s_infinite]"></div>
      </div>
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </button>
  );
};
