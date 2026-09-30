import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { isMagneticSupported } from '../../utils/magneticHover';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
  maxOffset?: number;
  scale?: number;
}

/**
 * Reusable Magnetic Button Component
 * Can be used as a drop-in component for future buttons.
 * (Note: The app also has the global event delegation system running automatically,
 * so this component provides an explicit, self-contained alternative).
 */
export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  maxOffset = 5,
  scale = 1.09,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn || !isMagneticSupported()) return;

    let originalTransition = '';

    const handlePointerEnter = () => {
      originalTransition = btn.style.transition;
      btn.style.transition = 'none';

      gsap.to(btn, {
        scale: scale,
        duration: 0.25,
        ease: 'power2.out',
        force3D: true,
        overwrite: 'auto',
      });
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const normX = Math.max(-1.2, Math.min(1.2, (e.clientX - centerX) / (rect.width / 2)));
      const normY = Math.max(-1.2, Math.min(1.2, (e.clientY - centerY) / (rect.height / 2)));

      gsap.to(btn, {
        x: normX * maxOffset,
        y: normY * maxOffset,
        scale: scale,
        duration: 0.22,
        ease: 'power2.out',
        force3D: true,
        overwrite: 'auto',
      });
    };

    const handlePointerLeave = () => {
      btn.style.transition = originalTransition;
      gsap.to(btn, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.32,
        ease: 'power3.out',
        force3D: true,
        overwrite: 'auto',
        onComplete: () => {
          gsap.set(btn, { clearProps: 'transform' });
        },
      });
    };

    btn.addEventListener('pointerenter', handlePointerEnter);
    btn.addEventListener('pointermove', handlePointerMove);
    btn.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      btn.removeEventListener('pointerenter', handlePointerEnter);
      btn.removeEventListener('pointermove', handlePointerMove);
      btn.removeEventListener('pointerleave', handlePointerLeave);
      gsap.killTweensOf(btn);
    };
  }, [maxOffset, scale]);

  return (
    <button
      ref={buttonRef}
      data-magnetic="true"
      className={`will-change-transform inline-block ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
