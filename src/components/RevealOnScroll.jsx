import { useState, useEffect, useRef } from 'react';

/**
 * RevealOnScroll
 * Lightweight scroll reveal wrapper honoring prefers-reduced-motion.
 */
export default function RevealOnScroll({ 
  children, 
  delay = 0, 
  className = '', 
  as = 'div' 
}) {
  const [revealed, setRevealed] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return true;
    }
    return false;
  });
  const ref = useRef(null);

  useEffect(() => {
    // If already revealed or reduced motion, skip observer
    if (revealed) {
      return;
    }

    // Safety fallback: reveal after a short timeout so content is never trapped invisible
    const timer = setTimeout(() => {
      setRevealed(true);
    }, 800);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
          clearTimeout(timer);
        }
      },
      { threshold: 0.01, rootMargin: '120px 0px 120px 0px' }
    );

    const el = ref.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      clearTimeout(timer);
      if (el) observer.unobserve(el);
    };
  }, [revealed]);

  const Component = as;

  return (
    <Component
      ref={ref}
      className={`reveal-block ${revealed ? 'is-revealed' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Component>
  );
}
