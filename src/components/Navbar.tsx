import {
  motion,
  useScroll,
  useMotionValueEvent,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronDown, Mail } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const serviceDropdown = [
  { label: "Product Research & Launch", href: "/services/product-launch" },
  { label: "Amazon PPC Management", href: "/services/ppc" },
  { label: "Listing Optimization", href: "/services/listing-optimization" },
  { label: "Supply Chain & Logistics", href: "/services/supply-chain" },
  { label: "Account Health & Compliance", href: "/services/account-health" },
  { label: "Brand Growth & Expansion", href: "/services/brand-growth" },
];

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const lastScrollY = useRef(0);
  const { scrollY, scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);
    // Headroom: hide on scroll down, show on scroll up
    if (latest > 300 && latest > lastScrollY.current) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    lastScrollY.current = latest;
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) setOpen(false);
    },
    [open],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      {/* Announcement bar */}
      <div
        className={`fixed top-0 left-0 right-0 z-[51] bg-primary text-primary-foreground transition-all duration-500 ${
          scrolled ? "h-0 opacity-0 overflow-hidden" : "h-9"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-center gap-2 text-[11px] sm:text-xs font-body tracking-wide">
          <span className="hidden sm:inline">🔥</span>
          <span>
            <span className="font-semibold">Limited spots:</span> We take 5 new
            clients per month.
          </span>
          <a
            href="#contact"
            className="underline underline-offset-2 font-semibold hover:no-underline whitespace-nowrap"
          >
            Book your free audit →
          </a>
        </div>
      </div>

      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: hidden && !open ? -100 : 0 }}
        transition={{ duration: 0.4, ease: easeOutExpo }}
        className={`fixed left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "top-0 glass glass-border shadow-[0_1px_40px_-12px_hsl(var(--primary)/0.04)]"
            : "top-9 bg-transparent"
        }`}
        aria-label="Main navigation"
      >
        {/* Scroll progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-primary/60 z-10"
          style={{ width: progressWidth }}
        />

        <div
          className={`max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between transition-all duration-500 ${scrolled ? "h-16" : "h-20"}`}
        >
          {/* Logo */}
          <a
            href="/"
            className={`flex items-center gap-2 font-display font-bold tracking-tight text-foreground transition-transform duration-500 origin-left ${scrolled ? "text-lg scale-90" : "text-xl"}`}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
            >
              <rect width="32" height="32" rx="8" fill="hsl(var(--primary))" />
              <text
                x="16"
                y="22"
                textAnchor="middle"
                fill="white"
                fontSize="18"
                fontWeight="700"
                fontFamily="serif"
              >
                S
              </text>
            </svg>
            The Scalio<span className="text-primary">.</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-7">
            {/* Email — visible on desktop */}
            <a
              href="mailto:hello@thescalio.com"
              className="flex items-center gap-1.5 text-[12px] text-muted-foreground/60 hover:text-muted-foreground transition-colors duration-300 font-body mr-2"
              title="Email us"
            >
              <Mail className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">hello@thescalio.com</span>
            </a>

            <div className="w-px h-4 bg-border/40" />

            {navItems.map((item) =>
              item.label === "Services" ? (
                /* Services dropdown */
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <a
                    href={item.href}
                    className="relative text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-300 font-body tracking-[0.06em] uppercase group whitespace-nowrap flex items-center gap-1"
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                    />
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                  </a>

                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 rounded-xl border border-border bg-card shadow-lg overflow-hidden"
                      >
                        <div className="p-2">
                          {serviceDropdown.map((service) => (
                            <a
                              key={service.href}
                              href={service.href}
                              className="block px-4 py-2.5 rounded-lg text-sm font-body text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors duration-200"
                            >
                              {service.label}
                            </a>
                          ))}
                        </div>
                        <div className="border-t border-border px-4 py-3">
                          <a
                            href="#services"
                            className="text-xs font-mono tracking-wider text-primary hover:underline"
                          >
                            View all services →
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                /* Regular nav link */
                <a
                  key={item.label}
                  href={item.href}
                  className="relative text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-300 font-body tracking-[0.06em] uppercase group whitespace-nowrap"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              ),
            )}
            <ThemeToggle />
            <a
              href="#contact"
              className="ml-2 px-6 py-3 text-sm tracking-[0.04em] uppercase font-body font-semibold bg-primary text-primary-foreground rounded-full transition-all duration-300 hover:shadow-[0_0_30px_-6px_hsl(var(--primary)/0.4)] hover:scale-[1.03] flex items-center gap-1.5"
            >
              Free PPC Audit
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-foreground p-2 -mr-2 relative z-[60]"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <div className="w-5 h-5 relative">
              <span
                className={`absolute left-0 w-full h-px bg-foreground transition-all duration-300 ${open ? "top-1/2 rotate-45" : "top-1"}`}
              />
              <span
                className={`absolute left-0 w-full h-px bg-foreground transition-all duration-300 ${open ? "opacity-0" : "top-1/2 -translate-y-px"}`}
              />
              <span
                className={`absolute left-0 w-full h-px bg-foreground transition-all duration-300 ${open ? "top-1/2 -rotate-45" : "bottom-1"}`}
              />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: easeOutExpo }}
            className="fixed inset-0 z-[55] bg-background flex flex-col items-center justify-center lg:hidden overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex flex-col items-center gap-1">
              {navItems.map((item, i) =>
                item.label === "Services" ? (
                  <div key={item.label} className="flex flex-col items-center">
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{
                        delay: i * 0.05,
                        duration: 0.5,
                        ease: easeOutExpo,
                      }}
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="text-2xl font-display font-semibold text-foreground py-2.5 hover:text-primary transition-colors flex items-center gap-2"
                    >
                      Services
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
                      />
                    </motion.button>
                    <AnimatePresence>
                      {mobileServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex flex-col items-center gap-1 overflow-hidden"
                        >
                          {serviceDropdown.map((service) => (
                            <a
                              key={service.href}
                              href={service.href}
                              onClick={() => setOpen(false)}
                              className="text-base font-body text-muted-foreground hover:text-primary transition-colors py-1.5"
                            >
                              {service.label}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.a
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{
                      delay: i * 0.05,
                      duration: 0.5,
                      ease: easeOutExpo,
                    }}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-2xl font-display font-semibold text-foreground py-2.5 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </motion.a>
                ),
              )}
            </div>

            {/* Mobile CTA button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="mt-8"
            >
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-body font-semibold text-base rounded-full transition-all duration-300 hover:shadow-[0_0_30px_-6px_hsl(var(--primary)/0.4)]"
              >
                Free PPC Audit →
              </a>
            </motion.div>

            {/* Mobile social icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-6 flex items-center gap-5"
            >
              <a
                href="mailto:hello@thescalio.com"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Instagram"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
