import { useState, useEffect, useRef } from 'react';

/**
 * AnimatedStat
 * Numbers animate smoothly from 0 to exact target value on scroll into view.
 * Fully supports prefers-reduced-motion and preserves exact metric figures.
 */
export default function AnimatedStat({ 
  value, 
  suffix = '', 
  prefix = '', 
  duration = 900,
  className = '' 
}) {
  const [display, setDisplay] = useState(value);
  const elementRef = useRef(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    // If user prefers reduced motion, do not animate (initial state is already `value`)
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          
          const rawStr = String(value);
          const match = rawStr.match(/([0-9.]+)/);
          if (!match) {
            setDisplay(rawStr);
            return;
          }

          const targetNum = parseFloat(match[1]);
          const decimals = match[1].includes('.') ? match[1].split('.')[1].length : 0;
          const startTime = performance.now();

          const step = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out expo curve: fast launch, smooth aerodynamic deceleration
            const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const current = targetNum * ease;

            setDisplay(current.toFixed(decimals));

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              // Guaranteed exact string settlement
              setDisplay(match[1]);
            }
          };

          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    const currentEl = elementRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, [value, duration]);

  return (
    <span ref={elementRef} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}
