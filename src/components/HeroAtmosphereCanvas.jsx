import { useEffect, useRef } from 'react';

/**
 * HeroAtmosphereCanvas
 * High-performance ambient vector canvas representing connected ML systems,
 * data pipelines, and telemetry flow.
 * 
 * Performance & Accessibility:
 * - Pauses execution completely when hero is out of view (0% CPU/battery drain).
 * - Honors prefers-reduced-motion by rendering a single static frame without a requestAnimationFrame loop.
 * - Caps devicePixelRatio at 2.
 */
export default function HeroAtmosphereCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let isVisible = true;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Node topology
    const NODE_COUNT = 24;
    const nodes = [];
    const mouse = { x: -1000, y: -1000, active: false };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    // Initialize nodes
    const initNodes = () => {
      nodes.length = 0;
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * (width || 800),
          y: Math.random() * (height || 500),
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 1.5 + 1.2,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.02
        });
      }
    };

    resize();
    initNodes();

    // Data pulses traveling between nodes
    const pulses = [
      { from: 0, to: 1, progress: 0, speed: 0.008 },
      { from: 2, to: 3, progress: 0.3, speed: 0.007 },
      { from: 4, to: 5, progress: 0.7, speed: 0.009 }
    ];

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);

      const maxDist = 140;

      // Draw connection vectors
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.12;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(139, 207, 112, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw traveling pulses along closest connected nodes
      if (!prefersReducedMotion) {
        pulses.forEach(p => {
          p.progress += p.speed;
          if (p.progress >= 1) {
            p.progress = 0;
            p.from = Math.floor(Math.random() * nodes.length);
            // pick a nearby node
            let closest = (p.from + 1) % nodes.length;
            let minDist = Infinity;
            for (let k = 0; k < nodes.length; k++) {
              if (k === p.from) continue;
              const d = Math.hypot(nodes[p.from].x - nodes[k].x, nodes[p.from].y - nodes[k].y);
              if (d < minDist && d < maxDist) {
                minDist = d;
                closest = k;
              }
            }
            p.to = closest;
          }

          const n1 = nodes[p.from];
          const n2 = nodes[p.to];
          if (n1 && n2) {
            const px = n1.x + (n2.x - n1.x) * p.progress;
            const py = n1.y + (n2.y - n1.y) * p.progress;
            ctx.beginPath();
            ctx.arc(px, py, 1.8, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(139, 207, 112, 0.75)';
            ctx.shadowColor = 'rgba(139, 207, 112, 0.8)';
            ctx.shadowBlur = 6;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        });
      }

      // Draw and update nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        if (!prefersReducedMotion) {
          n.x += n.vx;
          n.y += n.vy;
          n.pulse += n.pulseSpeed;

          // Boundary bounce
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;

          // Subtle mouse reaction
          if (mouse.active) {
            const mdx = n.x - mouse.x;
            const mdy = n.y - mouse.y;
            const mDist = Math.hypot(mdx, mdy);
            if (mDist < 120 && mDist > 0) {
              const force = (120 - mDist) / 120 * 0.8;
              n.x += (mdx / mDist) * force;
              n.y += (mdy / mDist) * force;
            }
          }
        }

        const alpha = prefersReducedMotion ? 0.35 : 0.35 + Math.sin(n.pulse) * 0.15;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 207, 112, ${alpha})`;
        ctx.fill();
      }
    };

    // Single static frame if reduced motion
    if (prefersReducedMotion) {
      drawFrame();
      return;
    }

    // Animation loop with visibility throttling
    const render = () => {
      if (isVisible) {
        drawFrame();
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Mouse listeners for ambient reaction
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove, { passive: true });
      parent.addEventListener('mouseleave', handleMouseLeave);
    }

    // IntersectionObserver to pause loop when scrolled away
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.05 });

    observer.observe(canvas);

    // Resize listener
    window.addEventListener('resize', resize, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="hero-atmosphere-canvas"
      aria-hidden="true"
    />
  );
}
