const footerLinks = {
  Services: [
    { label: "Product Launch", href: "#services" },
    { label: "PPC Management", href: "#services" },
    { label: "Listing Optimization", href: "#services" },
    { label: "Supply Chain", href: "#services" },
  ],
  Company: [
    { label: "About", href: "#about" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Case Studies", href: "#case-studies" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const socialLinks = [
  { label: "Email", href: "mailto:hello@thescalio.com", icon: "Em" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "Li" },
  { label: "Instagram", href: "https://instagram.com", icon: "Ig" },
];

const Footer = () => {
  return (
    <footer className="border-t border-border" aria-label="Footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main */}
        <div className="py-16 lg:py-20 grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a
              href="#"
              className="font-display text-xl font-bold text-foreground tracking-tight"
            >
              The Scalio<span className="text-primary">.</span>
            </a>
            <p className="text-muted-foreground text-sm font-body font-light mt-4 leading-relaxed max-w-xs">
              Full-service Amazon FBA agency helping brands launch, scale, and
              grow on the marketplace.
            </p>
            <div className="flex gap-4 mt-6">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    s.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:-translate-y-0.5 transition-all duration-300 text-[10px] font-mono"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground font-mono mb-5">
                {heading}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 font-body font-light"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-border py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground/60 font-body">
            © {new Date().getFullYear()} The Scalio. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/60 font-body">
            hello@thescalio.com
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
