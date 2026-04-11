import { motion } from "framer-motion";

const logos = [
  { name: "Amazon", letter: "a", color: "#FF9900" },
  { name: "Shopify", letter: "S", color: "#96BF48" },
  { name: "Walmart", letter: "W", color: "#0071CE" },
  { name: "Target", letter: "T", color: "#CC0000" },
  { name: "Alibaba", letter: "A", color: "#FF6A00" },
  { name: "FedEx", letter: "F", color: "#4D148C" },
  { name: "UPS", letter: "U", color: "#351C15" },
  { name: "Jungle Scout", letter: "JS", color: "#13AA52" },
  { name: "Helium 10", letter: "H", color: "#4B7BF5" },
  { name: "TikTok Shop", letter: "TT", color: "#FE2C55" },
  { name: "eBay", letter: "e", color: "#E53238" },
];

const LogoBadge = ({
  name,
  letter,
  color,
}: {
  name: string;
  letter: string;
  color: string;
}) => (
  <div className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-border/30 bg-card/30 whitespace-nowrap select-none transition-all duration-300 hover:border-border/60 hover:bg-card/60 group">
    <span
      className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold text-white shrink-0"
      style={{ backgroundColor: color }}
    >
      {letter}
    </span>
    <span className="text-sm font-body font-medium text-muted-foreground/50 group-hover:text-foreground/70 transition-colors duration-300">
      {name}
    </span>
  </div>
);

const LogoMarquee = () => {
  return (
    <section
      aria-hidden="true"
      className="relative py-12 border-t border-b border-border overflow-hidden"
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center text-[11px] tracking-[0.2em] uppercase text-muted-foreground font-mono mb-8"
      >
        Platforms &amp; partners we work with
      </motion.p>

      <div className="marquee">
        <div className="marquee-content">
          {logos.map((logo) => (
            <LogoBadge key={logo.name} {...logo} />
          ))}
        </div>
        <div className="marquee-content" aria-hidden="true">
          {logos.map((logo) => (
            <LogoBadge key={`dup-${logo.name}`} {...logo} />
          ))}
        </div>
      </div>

      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
    </section>
  );
};

export default LogoMarquee;
