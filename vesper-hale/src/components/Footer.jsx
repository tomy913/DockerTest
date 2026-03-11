const footerColumns = [
  {
    heading: 'Platform',
    links: ['Intelligence', 'Governance', 'Risk Analysis', 'Reporting'],
  },
  {
    heading: 'Company',
    links: ['About', 'Careers', 'Press', 'Contact'],
  },
  {
    heading: 'Legal',
    links: ['Privacy', 'Terms', 'Security', 'Compliance'],
  },
];

export default function Footer() {
  return (
    <footer className="bg-obsidian text-white/70 rounded-t-[4rem] mt-0 pt-20 pb-12 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand column */}
          <div>
            <span className="text-white font-heading text-xl font-semibold block">
              Vesper &amp; Hale
            </span>
            <p className="mt-3 text-sm">Bespoke wealth intelligence</p>
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h4 className="text-white font-heading text-sm font-semibold uppercase tracking-wider mb-4">
                {col.heading}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-sm hover:text-white transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            &copy; 2026 Vesper &amp; Hale. All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="font-mono text-xs">
              System Operational &mdash; All Systems Nominal
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
