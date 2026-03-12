import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';
import { easings, stagger as staggerTokens } from '../designTokens';

gsap.registerPlugin(ScrollTrigger);

/* ─── Tier data ─── */

const tiers = [
  {
    name: 'Essential',
    tagline: 'For emerging family offices',
    price: '$25,000',
    priceSuffix: '/quarter',
    badge: null,
    featured: false,
    features: [
      'Portfolio consolidation (up to 3 custodians)',
      'Quarterly risk narratives',
      'Basic governance dashboard',
      'Email support',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Performance',
    tagline: 'For established multi-entity families',
    price: '$75,000',
    priceSuffix: '/quarter',
    badge: 'Most Popular',
    featured: true,
    features: [
      'Unlimited custodian integration',
      'Real-time risk narratives & alerts',
      'Full governance suite with audit trails',
      'Dedicated relationship manager',
      'API access & custom reporting',
    ],
    cta: 'Request Private Access',
  },
  {
    name: 'Enterprise',
    tagline: 'For sovereign wealth & institutional families',
    price: 'Custom',
    priceSuffix: '',
    badge: null,
    featured: false,
    features: [
      'Everything in Performance',
      'Multi-family office support',
      'On-premise deployment option',
      '24/7 white-glove support',
      'Custom AI model training',
    ],
    cta: 'Contact Us',
  },
];

/* ─── Pricing Component ─── */

export default function Pricing() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardRefs.current.filter(Boolean);
    if (!section || cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(cards, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: staggerTokens.cards,
        ease: easings.entrance,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="access" ref={sectionRef} className="bg-ivory py-24 px-8 md:px-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate mb-4">
          Choose Your Tier
        </h2>
        <p className="text-slate/60 text-lg max-w-2xl mx-auto">
          Tailored engagement models for discerning family offices
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
        {tiers.map((tier, i) => {
          const isFeatured = tier.featured;

          return (
            <div
              key={tier.name}
              ref={(el) => (cardRefs.current[i] = el)}
              className={
                isFeatured
                  ? 'bg-obsidian rounded-[2rem] p-10 shadow-2xl shadow-black/20 md:scale-105 ring-2 ring-champagne/30'
                  : 'bg-white rounded-[2rem] p-8 shadow-lg shadow-black/5 border border-black/5'
              }
            >
              {/* Badge */}
              {tier.badge && (
                <span className="inline-block bg-champagne/20 text-champagne text-xs font-mono px-3 py-1 rounded-full mb-4">
                  {tier.badge}
                </span>
              )}

              {/* Name */}
              <h3
                className={`font-heading text-2xl font-bold ${
                  isFeatured ? 'text-white' : 'text-slate'
                }`}
              >
                {tier.name}
              </h3>

              {/* Tagline */}
              <p
                className={`mt-1 mb-6 ${
                  isFeatured ? 'text-white/60' : 'text-slate/60'
                }`}
              >
                {tier.tagline}
              </p>

              {/* Price */}
              <div className="mb-8">
                <span
                  className={`text-3xl font-bold ${
                    isFeatured ? 'text-white' : 'text-slate'
                  }`}
                >
                  {tier.price}
                </span>
                {tier.priceSuffix && (
                  <span
                    className={`text-sm ml-1 ${
                      isFeatured ? 'text-white/50' : 'text-slate/50'
                    }`}
                  >
                    {tier.priceSuffix}
                  </span>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      size={18}
                      className={`mt-0.5 flex-shrink-0 ${
                        isFeatured ? 'text-champagne' : 'text-slate/70'
                      }`}
                    />
                    <span
                      className={`text-sm leading-relaxed ${
                        isFeatured ? 'text-white/80' : 'text-slate/70'
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {isFeatured ? (
                <button className="w-full bg-champagne text-obsidian rounded-full px-8 py-3 font-semibold hover:scale-[1.03] transition-transform">
                  {tier.cta}
                </button>
              ) : (
                <button className="w-full border-2 border-slate text-slate rounded-full px-8 py-3 hover:bg-slate hover:text-white transition-all">
                  {tier.cta}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
