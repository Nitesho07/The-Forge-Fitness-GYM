import gsap from 'gsap';

/**
 * Global Magnetic Hover Effect Utility for The Forge Fitness
 * 
 * Provides:
 * 1. Automatic global magnifying & magnetic cursor-following for interactive buttons
 * 2. GPU-friendly transforms (translate3d + scale)
 * 3. Smooth enter (1.08x–1.12x), subtle magnetic cursor tracking (±4–6px), and smooth 250–400ms return
 * 4. Respects prefers-reduced-motion and touch device constraints
 */

// Max magnetic offset in pixels (per requirements: ±4–6px)
const MAX_OFFSET_X = 5;
const MAX_OFFSET_Y = 5;

// Magnification scale (per requirements: 1.08x–1.12x)
const HOVER_SCALE = 1.09;

// Track active magnetic element
let currentActiveElement: HTMLElement | null = null;
let currentRect: DOMRect | null = null;
let originalTransition: string | null = null;
let isInitialized = false;
let cleanupFn: (() => void) | null = null;

/**
 * Checks if the device supports precise mouse hover and does not prefer reduced motion
 */
export const isMagneticSupported = (): boolean => {
  if (typeof window === 'undefined') return false;
  const isHoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return isHoverCapable && !prefersReduced;
};

/**
 * Identifies if an element is an interactive button or button-styled element
 * according to The Forge Fitness design system rules.
 */
export const getMagneticButton = (element: Element | null): HTMLElement | null => {
  if (!element || !isMagneticSupported()) return null;

  // Search for the closest button, link, or element marked as interactive
  const target = element.closest<HTMLElement>(
    'button, a, [role="button"], [data-magnetic="true"], [data-magnetic]'
  );
  if (!target) return null;

  // Explicit opt-out
  if (
    target.hasAttribute('data-no-magnetic') ||
    target.getAttribute('data-no-magnetic') === 'true' ||
    target.closest('[data-no-magnetic="true"]')
  ) {
    return null;
  }

  // Exclude dock nav item icon buttons which have continuous macOS dock magnification
  if (target.closest('[data-dock-strip="true"]') || target.closest('[data-dock-strip]')) {
    return null;
  }

  // Exclude stepper dot pills (e.g. h-1.5 pagination pills in TrainingStackingCards)
  if (
    target.getAttribute('aria-label')?.startsWith('Jump to') ||
    (target.classList.contains('h-1.5') && target.classList.contains('rounded-full'))
  ) {
    return null;
  }

  const textContent = (target.textContent || '').trim();
  const classList = target.className || '';

  // Explicit inclusion via attribute or class
  if (
    target.hasAttribute('data-magnetic') ||
    target.classList.contains('magnetic-btn')
  ) {
    return target;
  }

  // Specific buttons & CTAs explicitly listed in requirements
  const isNamedCta =
    textContent.includes('Learn Details') ||
    textContent.includes('View All Disciplines') ||
    textContent.includes('Inquire') ||
    textContent.includes('JOIN') ||
    textContent.includes('Join Now') ||
    textContent.includes('CALL NOW') ||
    textContent.includes('Call Gym') ||
    textContent.includes('Call') ||
    textContent.includes('Get Directions') ||
    textContent.includes('GET DIRECTIONS') ||
    textContent.includes('Directions') ||
    textContent.includes('SELECT') ||
    textContent.includes('START') ||
    textContent.includes('EXPLORE MEMBERSHIP') ||
    textContent.includes('REQUEST CONSULTATION') ||
    textContent.includes('Send Inquiry') ||
    textContent.includes('Close Window') ||
    textContent.includes('Instagram:');

  if (isNamedCta) {
    return target;
  }

  // General <button> tags
  if (target.tagName.toLowerCase() === 'button') {
    // Exclude plain text links (e.g. underline text or Explore links in footer)
    if (classList.includes('underline')) return null;
    if (target.closest('.footer-col ul')) return null;

    // Must look like an interactive button (has padding, background, border, or rounded shape)
    const hasButtonVisuals =
      classList.includes('bg-') ||
      classList.includes('border') ||
      classList.includes('px-') ||
      classList.includes('py-') ||
      classList.includes('p-') ||
      classList.includes('rounded') ||
      classList.includes('font-heading') ||
      classList.includes('min-h-');

    if (hasButtonVisuals) {
      return target;
    }
  }

  // General <a> tags styled as buttons (e.g. "CALL NOW", "Get Directions", etc.)
  if (target.tagName.toLowerCase() === 'a') {
    // Exclude plain text navigation or inline links
    if (target.closest('.footer-col ul')) return null;
    if (classList.includes('underline') && !classList.includes('bg-')) return null;

    const isStyledAsButton =
      (classList.includes('bg-') && (classList.includes('px-') || classList.includes('py-'))) ||
      (classList.includes('border') && (classList.includes('px-') || classList.includes('py-'))) ||
      classList.includes('min-h-') ||
      classList.includes('btn');

    if (isStyledAsButton) {
      return target;
    }
  }

  return null;
};

/**
 * Resets the currently active magnetic button back to scale(1) and translate(0, 0)
 */
const releaseCurrentElement = (target: HTMLElement | null) => {
  if (!target) return;

  // Restore CSS transition if it was temporarily disabled for GSAP
  if (originalTransition !== null) {
    target.style.transition = originalTransition;
    originalTransition = null;
  }

  // Smooth return to scale(1) and translate(0, 0) over 320ms with power3.out easing
  gsap.to(target, {
    x: 0,
    y: 0,
    scale: 1,
    duration: 0.32,
    ease: 'power3.out',
    force3D: true,
    overwrite: 'auto',
    onComplete: () => {
      // Clear inline transform once settled so normal CSS styles apply cleanly
      gsap.set(target, { clearProps: 'transform' });
    },
  });
};

/**
 * Pointer Enter/Over Handler
 */
const handlePointerOver = (e: PointerEvent) => {
  // Only apply to mouse and pen pointers (no touch devices)
  if (e.pointerType === 'touch') return;
  if (!isMagneticSupported()) return;

  const btn = getMagneticButton(e.target as Element);
  if (!btn) {
    if (currentActiveElement && !currentActiveElement.contains(e.target as Node)) {
      releaseCurrentElement(currentActiveElement);
      currentActiveElement = null;
      currentRect = null;
    }
    return;
  }

  if (btn !== currentActiveElement) {
    if (currentActiveElement) {
      releaseCurrentElement(currentActiveElement);
    }
    currentActiveElement = btn;
    currentRect = btn.getBoundingClientRect();

    // Temporarily pause CSS transitions to prevent stutter while GSAP handles direct frame updates
    originalTransition = btn.style.transition || '';
    btn.style.transition = 'none';

    // Enter animation: smooth scale to 1.09 with subtle initial spring
    gsap.to(btn, {
      scale: HOVER_SCALE,
      duration: 0.25,
      ease: 'power2.out',
      force3D: true,
      overwrite: 'auto',
    });
  }
};

/**
 * Pointer Move Handler: Calculates subtle cursor attraction (±4–6px)
 */
const handlePointerMove = (e: PointerEvent) => {
  if (e.pointerType === 'touch' || !currentActiveElement) return;

  if (!currentRect) {
    currentRect = currentActiveElement.getBoundingClientRect();
  }

  const rect = currentRect;
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // Normalized distance from center (-1 to 1)
  const halfWidth = rect.width / 2 || 1;
  const halfHeight = rect.height / 2 || 1;

  const rawDeltaX = (e.clientX - centerX) / halfWidth;
  const rawDeltaY = (e.clientY - centerY) / halfHeight;

  // Clamp within ±1.2
  const clampedX = Math.max(-1.2, Math.min(1.2, rawDeltaX));
  const clampedY = Math.max(-1.2, Math.min(1.2, rawDeltaY));

  const targetX = clampedX * MAX_OFFSET_X;
  const targetY = clampedY * MAX_OFFSET_Y;

  // Smooth GPU-friendly direct transform
  gsap.to(currentActiveElement, {
    x: targetX,
    y: targetY,
    scale: HOVER_SCALE,
    duration: 0.22,
    ease: 'power2.out',
    force3D: true,
    overwrite: 'auto',
  });
};

/**
 * Pointer Out / Leave Handler
 */
const handlePointerOut = (e: PointerEvent) => {
  if (!currentActiveElement) return;

  // Check if cursor actually left the current active button
  const related = e.relatedTarget as Node | null;
  if (!related || !currentActiveElement.contains(related)) {
    releaseCurrentElement(currentActiveElement);
    currentActiveElement = null;
    currentRect = null;
  }
};

/**
 * Reset on window scroll or tab blur to avoid stale element positions
 */
const handleWindowReset = () => {
  if (currentActiveElement) {
    releaseCurrentElement(currentActiveElement);
    currentActiveElement = null;
    currentRect = null;
  }
};

/**
 * Initializes the global magnetic button listener system.
 * Call this once at the app root (e.g. in App.tsx).
 */
export const initGlobalMagneticButtons = (): (() => void) => {
  if (typeof window === 'undefined') return () => {};
  if (isInitialized && cleanupFn) return cleanupFn;

  document.addEventListener('pointerover', handlePointerOver, { passive: true });
  document.addEventListener('pointermove', handlePointerMove, { passive: true });
  document.addEventListener('pointerout', handlePointerOut, { passive: true });
  window.addEventListener('scroll', handleWindowReset, { passive: true });
  window.addEventListener('blur', handleWindowReset, { passive: true });

  isInitialized = true;

  cleanupFn = () => {
    document.removeEventListener('pointerover', handlePointerOver);
    document.removeEventListener('pointermove', handlePointerMove);
    document.removeEventListener('pointerout', handlePointerOut);
    window.removeEventListener('scroll', handleWindowReset);
    window.removeEventListener('blur', handleWindowReset);
    if (currentActiveElement) {
      releaseCurrentElement(currentActiveElement);
      currentActiveElement = null;
    }
    isInitialized = false;
    cleanupFn = null;
  };

  return cleanupFn;
};
