import { motion } from "framer-motion";

const logos = [
  "Amazon", "Shopify", "Walmart", "Target",
  "Alibaba", "FedEx", "UPS", "Jungle Scout",
  "Helium 10", "Seller Central", "TikTok Shop", "eBay",
];

const LogoMarquee = () => {
  return (
    <section aria-hidden="true" className="relative py-16 border-t border-b border-border overflow-hidden">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center text-[11px] tracking-[0.2em] uppercase text-muted-foreground font-mono mb-10"
      >
        Platforms &amp; partners we work with
      </motion.p>

      <div className="marquee">
        <div className="marquee-content">
          {logos.map((logo) => (
            <span
              key={logo}
              className="text-muted-foreground/30 font-body text-sm font-medium tracking-wider whitespace-nowrap transition-all duration-300 hover:text-foreground/80 select-none"
            >
              {logo}
            </span>
          ))}
        </div>
        <div className="marquee-content" aria-hidden="true">
          {logos.map((logo) => (
            <span
              key={`dup-${logo}`}
              className="text-muted-foreground/30 font-body text-sm font-medium tracking-wider whitespace-nowrap transition-all duration-300 hover:text-foreground/80 select-none"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
    </section>
  );
};

export default LogoMarquee;