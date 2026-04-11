const ScrollingText = () => {
  const words = ["LAUNCH", "SCALE", "DOMINATE", "OPTIMIZE", "GROW", "LAUNCH", "SCALE", "DOMINATE", "OPTIMIZE", "GROW"];

  return (
    <section aria-hidden="true" className="relative py-8 overflow-hidden border-t border-b border-border/50">
      <div className="marquee">
        <div className="marquee-text-content">
          {words.map((word, i) => (
            <span key={i} className="flex items-center gap-8">
              <span className="text-[clamp(3rem,6vw,5rem)] font-display font-bold text-foreground/[0.03] whitespace-nowrap tracking-tight select-none">
                {word}
              </span>
              <span className="w-2 h-2 rounded-full bg-primary/20 shrink-0" />
            </span>
          ))}
        </div>
        <div className="marquee-text-content" aria-hidden="true">
          {words.map((word, i) => (
            <span key={`dup-${i}`} className="flex items-center gap-8">
              <span className="text-[clamp(3rem,6vw,5rem)] font-display font-bold text-foreground/[0.03] whitespace-nowrap tracking-tight select-none">
                {word}
              </span>
              <span className="w-2 h-2 rounded-full bg-primary/20 shrink-0" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScrollingText;
