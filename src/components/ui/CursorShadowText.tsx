import React, { useRef, useCallback } from 'react';

export interface CursorShadowTextProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  maxOffset?: number;
  maxOffsetY?: number;
}

/**
 * CursorShadowText
 * Wrapper component that uses a React ref and mouse event listeners
 * (onMouseMove, onMouseEnter, onMouseLeave) to update CSS variables --shadow-x and --shadow-y
 * on the wrapper element.
 *
 * Produces a subtle, soft BLACK shadow that follows the cursor across the text,
 * fading in on enter and fading out on leave.
 */
export const CursorShadowText: React.FC<CursorShadowTextProps> = ({
  children,
  className = '',
  as: Component = 'div',
  maxOffset = 18,
  maxOffsetY = 14,
  style,
  ...props
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = wrapperRef.current;
      if (!el) return;

      // Disable on touch-only mobile devices without pointer precision
      if (
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(pointer: coarse)').matches &&
        !window.matchMedia('(pointer: fine)').matches
      ) {
        return;
      }

      const rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Relative displacement from center (-1.5 to 1.5)
      const normX = Math.max(-1.5, Math.min(1.5, (e.clientX - centerX) / (rect.width / 2)));
      const normY = Math.max(-1.5, Math.min(1.5, (e.clientY - centerY) / (rect.height / 2)));

      const shadowX = (normX * maxOffset).toFixed(1);
      const shadowY = (normY * maxOffsetY).toFixed(1);

      el.style.setProperty('--shadow-x', `${shadowX}px`);
      el.style.setProperty('--shadow-y', `${shadowY}px`);
      el.style.setProperty('--shadow-opacity', '1');
      el.style.setProperty('--shadow-color-1', 'rgba(0, 0, 0, 0.85)');
      el.style.setProperty('--shadow-color-2', 'rgba(0, 0, 0, 0.65)');
      el.style.setProperty('--shadow-color-3', 'rgba(0, 0, 0, 0.45)');
    },
    [maxOffset, maxOffsetY]
  );

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      handleMouseMove(e);
    },
    [handleMouseMove]
  );

  const handleMouseLeave = useCallback(() => {
    const el = wrapperRef.current;
    if (!el) return;

    el.style.setProperty('--shadow-x', '0px');
    el.style.setProperty('--shadow-y', '0px');
    el.style.setProperty('--shadow-opacity', '0');
    el.style.setProperty('--shadow-color-1', 'transparent');
    el.style.setProperty('--shadow-color-2', 'transparent');
    el.style.setProperty('--shadow-color-3', 'transparent');
  }, []);

  return (
    <Component
      ref={wrapperRef as any}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`cursor-shadow-text ${className}`}
      style={style}
      {...props}
    >
      {children}
    </Component>
  );
};
