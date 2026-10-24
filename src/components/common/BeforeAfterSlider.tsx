import React, { useState, useRef } from 'react';
import { MoveHorizontal } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
  description?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Before: Traditional Manual Process',
  afterLabel = 'After: Tchuki Engineered Solution',
  title,
  description,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  return (
    <div className="w-full">
      {(title || description) && (
        <div className="mb-4">
          {title && <h4 className="text-base font-bold text-white font-heading">{title}</h4>}
          {description && <p className="text-xs text-slate-400 mt-1">{description}</p>}
        </div>
      )}

      <div
        ref={containerRef}
        onMouseDown={() => {
          isDragging.current = true;
        }}
        onMouseUp={() => {
          isDragging.current = false;
        }}
        onMouseLeave={() => {
          isDragging.current = false;
        }}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative h-72 sm:h-96 w-full overflow-hidden rounded-2xl select-none cursor-ew-resize border border-slate-800 shadow-xl bg-slate-900"
      >
        {/* After Image (Full background) */}
        <img
          src={afterImage}
          alt={afterLabel}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-[11px] font-semibold text-emerald-400 border border-emerald-500/30">
          {afterLabel}
        </div>

        {/* Before Image (Clipped overlay) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt={beforeLabel}
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{
              width: containerRef.current?.offsetWidth || '100%',
              height: '100%',
            }}
          />
          <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-[11px] font-semibold text-slate-300 border border-slate-700/60">
            {beforeLabel}
          </div>
        </div>

        {/* Divider Bar & Handle */}
        <div
          className="absolute top-0 bottom-0 z-20 w-[2px] bg-white cursor-ew-resize shadow-[0_0_10px_rgba(255,255,255,0.7)]"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-950 border-2 border-white flex items-center justify-center text-emerald-400 shadow-xl">
            <MoveHorizontal className="w-4 h-4" />
          </div>
        </div>
      </div>
      
      <div className="mt-2 text-center text-xs text-slate-400 font-mono">
        Drag slider left or right to compare transformation
      </div>
    </div>
  );
};
