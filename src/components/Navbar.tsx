import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { label: "About", href: "#about" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Services", href: "#services" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];
const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);
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
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: easeOutExpo }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "glass glass-border shadow-[0_1px_40px_-12px_hsl(var(--primary)/0.04)]"
            : "bg-transparent"
        }`}
        aria-label="Main navigation"
      >
        <div
          className={`max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between transition-all duration-500 ${scrolled ? "h-16" : "h-20"}`}
        >
          <a
            href="#"
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

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative text-[12px] text-muted-foreground hover:text-foreground transition-colors duration-300 font-body tracking-[0.06em] uppercase group whitespace-nowrap"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
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
              {navItems.map((item, i) => (
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
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex gap-6"
            >
              <a
                href="mailto:hello@thescalio.com"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors font-mono tracking-wider uppercase"
              >
                Email
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors font-mono tracking-wider uppercase"
              >
                LinkedIn
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors font-mono tracking-wider uppercase"
              >
                Instagram
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
