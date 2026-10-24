import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface PageBackdropProps {
  imageUrl: string;
  alt?: string;
  lighting?: 'emerald' | 'blue' | 'warm' | 'cyan' | 'hybrid';
  opacityClass?: string;
  scrimStrength?: 'standard' | 'soft';
}

export const PageBackdrop: React.FC<PageBackdropProps> = ({
  imageUrl,
  alt = 'Background atmosphere',
  lighting = 'hybrid',
  opacityClass,
  scrimStrength = 'standard',
}) => {
  const { isDark } = useTheme();
  const useSoftScrim = scrimStrength === 'soft';

  const getLightingGlows = () => {
    switch (lighting) {
      case 'emerald':
        return (
          <>
            <div className="absolute -top-24 left-1/4 w-[600px] h-[600px] bg-emerald-500/25 rounded-full blur-[140px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
            <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-[130px] pointer-events-none" />
          </>
        );
      case 'blue':
        return (
          <>
            <div className="absolute -top-24 right-1/4 w-[600px] h-[600px] bg-blue-500/25 rounded-full blur-[140px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
            <div className="absolute top-1/3 -left-20 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[130px] pointer-events-none" />
          </>
        );
      case 'warm':
        return (
          <>
            <div className="absolute -top-20 left-1/3 w-[600px] h-[500px] bg-amber-500/20 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[130px] pointer-events-none" />
          </>
        );
      case 'hybrid':
      default:
        return (
          <>
            {/* Emerald spotlight on left */}
            <div className="absolute -top-24 left-10 w-[650px] h-[650px] bg-emerald-500/25 rounded-full blur-[150px] pointer-events-none" />
            {/* Electric Blue / Cyan spotlight on right */}
            <div className="absolute -top-20 right-10 w-[650px] h-[650px] bg-blue-500/25 rounded-full blur-[150px] pointer-events-none" />
            {/* Center ambient glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-teal-500/15 rounded-full blur-[160px] pointer-events-none" />
          </>
        );
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Background Image with increased capacity (opacity) */}
      <img
        src={imageUrl}
        alt={alt}
        className={`w-full h-full object-cover object-center transform scale-105 transition-opacity duration-700 ${
          opacityClass || (isDark ? 'opacity-35' : 'opacity-20')
        }`}
      />

      {/* Lighting Rays & Spotlight Effects */}
      {getLightingGlows()}

      {/* Radial Vignette & Contrast Scrim Gradient */}
      {isDark ? (
        <>
          <div className={`absolute inset-0 bg-gradient-to-b ${useSoftScrim ? 'from-slate-950/65 via-slate-950/55 to-slate-950/75' : 'from-slate-950/80 via-slate-950/70 to-slate-950'}`} />
          <div className={`absolute inset-0 bg-gradient-to-r ${useSoftScrim ? 'from-slate-950/75 via-transparent to-slate-950/75' : 'from-slate-950/90 via-transparent to-slate-950/90'}`} />
          <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:36px_36px] opacity-15" />
        </>
      ) : (
        <>
          <div className={`absolute inset-0 bg-gradient-to-b ${useSoftScrim ? 'from-slate-50/70 via-slate-50/55 to-slate-50/80' : 'from-slate-50/85 via-slate-50/75 to-slate-50'}`} />
          <div className={`absolute inset-0 bg-gradient-to-r ${useSoftScrim ? 'from-slate-50/75 via-transparent to-slate-50/75' : 'from-slate-50/90 via-transparent to-slate-50/90'}`} />
          <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:36px_36px] opacity-10" />
        </>
      )}
    </div>
  );
};
