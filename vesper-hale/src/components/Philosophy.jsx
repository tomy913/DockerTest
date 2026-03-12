import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { easings } from '../designTokens';

gsap.registerPlugin(ScrollTrigger);

function splitIntoWordSpans(text, baseClass = '') {
  return text.split(' ').map((word, i) => (
    <span
      key={i}
      data-philosophy-word
      className={`inline-block mr-[0.3em] ${baseClass}`}
    >
      {word}
    </span>
  ));
}

export default function Philosophy() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background
      gsap.fromTo(
        bgRef.current,
        { y: -50 },
        {
          y: 50,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      // Word-by-word fade-up
      const words = gsap.utils.toArray('[data-philosophy-word]');
      gsap.fromTo(
        words,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: easings.entrance,
          stagger: 0.05,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-obsidian py-32 px-8 md:px-16 relative overflow-hidden"
    >
      {/* Parallax background image */}
      <div ref={bgRef} className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover opacity-10"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <p className="text-white/50 text-xl md:text-2xl font-heading mb-0">
          {splitIntoWordSpans('Most wealth platforms focus on:')}
        </p>
        <p className="text-white/50 text-xl md:text-2xl font-heading mb-12">
          {splitIntoWordSpans('dashboards and data dumps.')}
        </p>
        <p className="text-white text-2xl md:text-3xl font-heading font-semibold mb-4">
          {splitIntoWordSpans('We focus on:')}
        </p>
        <p className="font-drama text-champagne text-6xl md:text-8xl lg:text-9xl">
          {splitIntoWordSpans('Decisions.')}
        </p>
      </div>
    </section>
  );
}
