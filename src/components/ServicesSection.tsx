import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Users,
  ArrowUpRight,
  Phone,
  MessageSquare,
  BarChart3,
} from "lucide-react";
import { services } from "@/data/services";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

/** Returns true when the device has a fine pointer (mouse/trackpad, not touch) */
function useHasFinePointer(): boolean {
  const [hasFine, setHasFine] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(pointer: fine)");
    setHasFine(mql.matches);
    const handler = (e: MediaQueryListEvent) => setHasFine(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);
  return hasFine;
}

const ServicesSection = () => {
  const hasFinePointer = useHasFinePointer();
  const [tilts, setTilts] = useState<
    Record<string, { rx: number; ry: number; ox: number; oy: number }>
  >({});

  const handleMouseMove = useCallback(
    (slug: string, e: React.MouseEvent<HTMLDivElement>) => {
      if (!hasFinePointer) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTilts((prev) => ({
        ...prev,
        [slug]: { rx: -y * 6, ry: x * 6, ox: x, oy: y }, // ox/oy = -0.5 to 0.5 offset for internal parallax
      }));
    },
    [hasFinePointer],
  );

  const handleMouseLeave = useCallback((slug: string) => {
    setTilts((prev) => ({ ...prev, [slug]: { rx: 0, ry: 0, ox: 0, oy: 0 } }));
  }, []);

  return (
    <section
      id="services"
      className="relative py-20 lg:py-28 px-6"
      aria-labelledby="services-heading"
    >
      <div className="absolute top-0 left-0 right-0 line-accent" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "200px" }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div>
            <span className="text-[11px] tracking-[0.2em] uppercase text-primary font-mono">
              Services
            </span>
            <h2
              id="services-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mt-4 leading-[1.05]"
            >
              Find your{" "}
              <span className="italic text-gradient-primary font-medium">
                growth lever
              </span>
            </h2>
          </div>
          <p className="text-muted-foreground font-body text-sm leading-relaxed max-w-sm font-light">
            Every Amazon seller has a different bottleneck. Find yours below —
            then let us fix it.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
          style={{ perspective: 800 }}
        >
          {services.map((service, i) => {
            const Icon = service.icon;
            const tilt = tilts[service.slug] || { rx: 0, ry: 0, ox: 0, oy: 0 };
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "100px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.12,
                  ease: easeOutExpo,
                }}
                onMouseMove={(e) => handleMouseMove(service.slug, e)}
                onMouseLeave={() => handleMouseLeave(service.slug)}
                style={{
                  transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                  transition: "transform 0.3s ease-out",
                }}
                className="group relative p-7 lg:p-9 rounded-2xl bg-card border border-border transition-all duration-500 hover:border-primary/20 hover:-translate-y-1 flex flex-col"
              >
                {/* Hover glow background */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-b from-primary/10 to-transparent blur-xl -z-10" />

                <div className="relative z-10 flex flex-col flex-1">
                  {/* Icon — Level 3: floats above card on hover (internal parallax) */}
                  <div
                    className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center mb-5 transition-all duration-500 group-hover:bg-primary/10 group-hover:shadow-[0_0_20px_-4px_hsl(var(--primary)/0.3)]"
                    style={{
                      transform: `translate(${-tilt.ox * 8}px, ${-tilt.oy * 8}px)`,
                      transition:
                        "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    <Icon className="w-5 h-5 text-primary transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[15deg]" />
                  </div>

                  {/* Title — Level 3: subtle internal shift */}
                  <h3
                    className="text-lg font-display font-semibold text-foreground mb-1.5"
                    style={{
                      transform: `translate(${-tilt.ox * 2}px, ${-tilt.oy * 2}px)`,
                      transition:
                        "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    <a
                      href={`/services/${service.slug}`}
                      className="hover:text-primary transition-colors duration-300"
                    >
                      {service.title}
                    </a>
                  </h3>

                  {/* Hook */}
                  <p className="text-sm italic text-primary/80 font-body mb-4">
                    {service.hook}
                  </p>

                  {/* Deliverables checklist */}
                  <div className="mb-5 flex-1">
                    <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground/60 block mb-2.5">
                      What&apos;s included
                    </span>
                    <ul className="space-y-1.5">
                      {service.deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-muted-foreground font-body font-light leading-relaxed"
                        >
                          <Check className="w-3.5 h-3.5 text-primary/60 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Best for */}
                  <div className="flex items-start gap-2 py-3 border-t border-border/40 mb-3">
                    <Users className="w-3.5 h-3.5 text-muted-foreground/50 mt-0.5 shrink-0" />
                    <span className="text-[11px] text-muted-foreground/70 font-body leading-relaxed">
                      <span className="font-medium text-muted-foreground">
                        Best for:
                      </span>{" "}
                      {service.bestFor}
                    </span>
                  </div>

                  {/* Case study link */}
                  {service.caseStudyLink && (
                    <a
                      href={service.caseStudyLink}
                      className="inline-flex items-center gap-1.5 text-xs font-body font-medium text-primary/70 hover:text-primary transition-colors duration-300 group/link"
                    >
                      {service.caseStudyTeaser || "See results"}
                      <ArrowUpRight className="w-3 h-3 shrink-0 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  )}
                </div>

                {/* Corner accent */}
                <div className="absolute top-4 right-4 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-0 right-0 w-4 h-px bg-primary/30" />
                  <div className="absolute top-0 right-0 h-4 w-px bg-primary/30" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Team composition note */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: easeOutExpo }}
          className="mt-12 max-w-3xl mx-auto rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm p-6 md:p-8 text-center"
        >
          <p className="text-[11px] font-mono tracking-[0.15em] uppercase text-primary mb-4">
            Your dedicated team
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-4">
            {[
              "Account Strategist",
              "PPC Specialist",
              "Copywriter",
              "Graphic Designer",
            ].map((role) => (
              <span
                key={role}
                className="flex items-center gap-1.5 text-sm font-body text-foreground"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                {role}
              </span>
            ))}
          </div>
          {/* Divider */}
          <div className="w-full h-px bg-border/40 my-5" />

          <p className="text-[11px] font-mono tracking-[0.15em] uppercase text-primary mb-4">
            How we stay connected
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: Phone,
                title: "Weekly Calls",
                desc: "30-min strategy call every week with your account lead",
              },
              {
                icon: MessageSquare,
                title: "Slack Channel",
                desc: "Dedicated channel with your team — responses within hours",
              },
              {
                icon: BarChart3,
                title: "Live Dashboard",
                desc: "Real-time KPIs: revenue, ACoS, rank, and conversion data",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-background/50 border border-border/30"
                >
                  <Icon className="w-5 h-5 text-primary/70" />
                  <span className="text-sm font-body font-semibold text-foreground">
                    {item.title}
                  </span>
                  <span className="text-[11px] text-muted-foreground font-body text-center leading-relaxed">
                    {item.desc}
                  </span>
                </div>
              );
            })}
          </div>

          <p className="text-xs text-muted-foreground/60 font-body italic mt-5">
            Full transparency is non-negotiable for us.
          </p>
        </motion.div>

        {/* Mid-page CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: easeOutExpo }}
          className="mt-16 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-body font-semibold text-sm tracking-wide rounded-full transition-all duration-500 hover:shadow-[0_0_40px_-8px_hsl(var(--primary)/0.5)] hover:scale-[1.03]"
          >
            Get a Free Growth Audit
          </a>
          <p className="text-muted-foreground/50 font-body text-xs mt-3">
            No commitment. Results in 48 hours.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
