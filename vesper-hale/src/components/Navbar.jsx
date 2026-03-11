import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { colors } from '../designTokens';

const navLinks = ['Intelligence', 'Governance', 'Access'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observerRef.current.observe(hero);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl">
      <div
        className={`
          rounded-full px-6 py-3 flex items-center justify-between
          transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
          ${
            scrolled
              ? 'bg-[#FAF8F5]/60 backdrop-blur-xl shadow-lg'
              : 'bg-transparent backdrop-blur-none'
          }
        `}
      >
        {/* Logo */}
        <a
          href="#"
          className={`font-heading font-semibold tracking-tight text-lg transition-colors duration-500 ${
            scrolled ? 'text-slate' : 'text-white'
          }`}
        >
          Vesper &amp; Hale
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={`text-sm font-medium transition-colors duration-500 hover:opacity-80 ${
                scrolled ? 'text-slate' : 'text-white/90'
              }`}
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#access"
            className="hidden sm:inline-block bg-champagne text-obsidian rounded-full px-5 py-2 text-sm font-medium hover:scale-[1.03] transition-transform"
          >
            Request Private Access
          </a>

          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className={`md:hidden p-1 transition-colors duration-500 ${
              scrolled ? 'text-slate' : 'text-white'
            }`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden mt-2 mx-4 rounded-2xl bg-[#FAF8F5]/90 backdrop-blur-xl shadow-xl p-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setMobileOpen(false)}
              className="text-slate text-base font-medium font-heading"
            >
              {link}
            </a>
          ))}
          <a
            href="#access"
            onClick={() => setMobileOpen(false)}
            className="bg-champagne text-obsidian rounded-full px-5 py-3 text-sm font-medium text-center hover:scale-[1.03] transition-transform"
          >
            Request Private Access
          </a>
        </div>
      )}
    </nav>
  );
}
