const footerLinks = {
  Services: ["Product Launch", "PPC Management", "Listing Optimization", "Supply Chain"],
  Company: ["About", "Testimonials", "Contact", "Careers"],
  Legal: ["Privacy", "Terms", "Cookies"],
};

const Footer = () => {
  return (
    <footer className="border-t border-border" aria-label="Footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main */}
        <div className="py-16 lg:py-20 grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="font-display text-xl font-bold text-foreground tracking-tight">
              The Scalio<span className="text-primary">.</span>
            </a>
            <p className="text-muted-foreground text-sm font-body font-light mt-4 leading-relaxed max-w-xs">
              Full-service Amazon FBA agency helping brands launch, scale, and dominate the marketplace.
            </p>
            <div className="flex gap-4 mt-6">
              {["Ig", "Li", "Em"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:-translate-y-0.5 transition-all duration-300 text-[10px] font-mono"
                  aria-label={s === "Ig" ? "Instagram" : s === "Li" ? "LinkedIn" : "Email"}
                >
                  {s}
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
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 font-body font-light">
                      {link}
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
          <div className="flex gap-6">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <a key={item} href="#" className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors font-body">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;