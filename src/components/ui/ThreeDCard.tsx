import React, { createContext, useState, useContext, useRef, useEffect, useCallback } from 'react';

interface MouseEnterContextType {
  isEntered: boolean;
  mouseX: number;
  mouseY: number;
}

const MouseEnterContext = createContext<MouseEnterContextType>({
  isEntered: false,
  mouseX: 0.5,
  mouseY: 0.5,
});

export const useCard3D = () => useContext(MouseEnterContext);

interface CardContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  maxTilt?: number; // Maximum tilt angle in degrees (default 12)
  glareColor?: string; // Glare sheen color (default: The Forge lime #D7FF00 with 10% opacity)
  enableGlare?: boolean;
}

/**
 * 3D Tilt Card Container
 * Exactly matches the 21st.dev / Aceternity UI 3D Card (Nike M2K Tekno) component.
 * Provides 3D perspective, mouse-driven rotateX / rotateY tilt, dynamic specular sheen,
 * and passes 3D context to CardItem children for floating translateZ layers.
 */
export const CardContainer: React.FC<CardContainerProps> = ({
  children,
  className = '',
  containerClassName = '',
  maxTilt = 8,
  glareColor = 'rgba(215, 255, 0, 0.12)',
  enableGlare = true,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const glareRef = useRef<HTMLDivElement | null>(null);

  const [mouseContext, setMouseContext] = useState<MouseEnterContextType>({
    isEntered: false,
    mouseX: 0.5,
    mouseY: 0.5,
  });

  const rafId = useRef<number | null>(null);

  // Check prefers-reduced-motion
  const isReducedMotion = useRef(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      isReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isReducedMotion.current || !cardRef.current || !containerRef.current) return;

      // Use containerRef for fixed reference rect to avoid tilt jitter
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const clientX = e.clientX;
      const clientY = e.clientY;

      // Normalized coordinates from 0 to 1
      const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));

      // Calculate subtle tilt angles:
      // moving mouse right -> rotateY positive
      // moving mouse down -> rotateX negative
      const rotY = (x - 0.5) * maxTilt * 2;
      const rotX = (0.5 - y) * maxTilt * 2;

      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        if (!cardRef.current) return;
        cardRef.current.style.transition = 'transform 0.1s ease-out';
        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;

        if (glareRef.current && enableGlare) {
          glareRef.current.style.background = `radial-gradient(circle at ${Math.round(x * 100)}% ${Math.round(y * 100)}%, ${glareColor} 0%, transparent 60%)`;
          glareRef.current.style.opacity = '1';
        }

        setMouseContext({ isEntered: true, mouseX: x, mouseY: y });
      });
    },
    [maxTilt, enableGlare, glareColor]
  );

  const handleMouseEnter = useCallback(() => {
    if (isReducedMotion.current) return;
    setMouseContext((prev) => ({ ...prev, isEntered: true }));
    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 0.12s ease-out';
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (isReducedMotion.current) return;
    if (rafId.current) cancelAnimationFrame(rafId.current);

    setMouseContext({ isEntered: false, mouseX: 0.5, mouseY: 0.5 });

    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }

    if (glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
  }, []);

  return (
    <MouseEnterContext.Provider value={mouseContext}>
      <div
        ref={containerRef}
        className={`w-full [perspective:1000px] ${containerClassName}`}
        {...props}
      >
        <div
          ref={cardRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={`relative w-full h-full [transform-style:preserve-3d] transition-all will-change-transform ${className}`}
        >
          {children}

          {/* Dynamic Specular Sheen / Light Glare */}
          {enableGlare && (
            <div
              ref={glareRef}
              className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 rounded-[inherit] opacity-0"
              style={{
                mixBlendMode: 'screen',
              }}
            />
          )}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

/**
 * 3D Card Body - maintains preserve-3d context for inner CardItem elements
 */
export const CardBody: React.FC<CardBodyProps> = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`relative w-full h-full [transform-style:preserve-3d] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardItemProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string; // Depth in pixels (e.g. 20 to 60)
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
}

/**
 * 3D Card Item
 * Elevates on the Z-axis (and optional X/Y/Rot) when the parent card is hovered,
 * providing the authentic 3D parallax depth effect seen on the Nike M2K Tekno 3D card.
 */
export const CardItem: React.FC<CardItemProps> = ({
  as: Component = 'div',
  children,
  className = '',
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  style,
  ...props
}) => {
  const itemRef = useRef<HTMLElement | null>(null);
  const { isEntered } = useCard3D();

  useEffect(() => {
    if (!itemRef.current) return;

    if (isEntered) {
      itemRef.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
      itemRef.current.style.transition = 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)';
    } else {
      itemRef.current.style.transform = 'translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)';
      itemRef.current.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    }
  }, [isEntered, translateX, translateY, translateZ, rotateX, rotateY, rotateZ]);

  return (
    <Component
      ref={itemRef}
      className={`[transform-style:preserve-3d] will-change-transform ${className}`}
      style={{
        ...style,
        transformStyle: 'preserve-3d',
      }}
      {...props}
    >
      {children}
    </Component>
  );
};
