import { motion } from "framer-motion";
import { Briefcase, ArrowUpRight } from "lucide-react";
import { OFFER } from "@/data/offer";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const founderCredentials = [
  { icon: Briefcase, label: "Former Amazon Seller" },
];

const FounderSection = () => {
  return (
    <section
      id="founder"
      className="relative py-20 lg:py-28 px-6"
      aria-labelledby="founder-heading"
    >
      <div className="absolute top-0 left-0 right-0 line-accent" />

      <div className="max-w-4xl mx-auto">
        {/* Eyebrow + heading: delay 0 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "200px" }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
        >
          <div className="text-center mb-10">
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-primary block mb-4">
              Meet the Founder
            </span>
            <h2
              id="founder-heading"
              className="text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.05] mb-6"
            >
              From Amazon Seller to{" "}
              <span className="text-gradient-primary italic font-medium">
                Agency Founder
              </span>
            </h2>
          </div>
        </motion.div>

        {/* Pull quote — emphasis entrance: delay 0.12 */}
        <motion.blockquote
          initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "200px" }}
          transition={{ duration: 0.8, delay: 0.12, ease: easeOutExpo }}
          className="text-center mb-12 max-w-2xl mx-auto"
        >
          <p className="text-xl md:text-2xl font-display font-medium italic text-foreground/90 leading-relaxed">
            &ldquo;Most agencies optimize for ACoS. We optimize for profit.
            There&apos;s a difference — and it&apos;s worth millions to the
            brands that understand it.&rdquo;
          </p>
        </motion.blockquote>

        {/* Paragraphs: delay 0.24 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "200px" }}
          transition={{ duration: 0.6, delay: 0.24, ease: easeOutExpo }}
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-display font-bold text-foreground mb-4">
              I Built The Scalio Because Every Other Amazon Agency Failed Me
            </h3>
            <p className="text-muted-foreground font-body text-base leading-[1.9] font-light mb-4">
              After years of selling on Amazon ourselves — managing ad spend,
              optimizing listings, fighting for page-1 rank — we started hiring
              agencies to help us scale. Every one of them disappointed. Premium
              prices for cookie-cutter strategies. Junior VAs who didn&apos;t
              understand our category. Monthly reports full of vanity metrics.
              Zero accountability.
            </p>
            <p className="text-muted-foreground font-body text-base leading-[1.9] font-light mb-4">
              So we built The Scalio to be the agency we wished existed. One
              where senior strategists do the actual work — not interns. Where
              every client gets weekly calls, a dedicated Slack channel, and a
              real-time dashboard they actually understand. Where we get fired
              if we don&apos;t deliver.
            </p>
            <p className="text-foreground/80 font-body text-base leading-[1.9] font-medium mb-8">
              That approach has worked for 200+ brands, generated over $50M in
              Amazon revenue, and kept 97% of our clients year after year. Not
              because of lock-in contracts — because of results. No black boxes.
              No excuses.
            </p>
          </div>
        </motion.div>

        {/* Credentials + LinkedIn: delay 0.36 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "200px" }}
          transition={{ duration: 0.6, delay: 0.36, ease: easeOutExpo }}
        >
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-wrap gap-3 mb-10">
              {founderCredentials.map((cred) => {
                const Icon = cred.icon;
                return (
                  <div
                    key={cred.label}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-card border border-border/40"
                  >
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="text-xs font-mono tracking-wider text-foreground">
                      {cred.label}
                    </span>
                  </div>
                );
              })}
            </div>

          </div>
        </motion.div>

        {/* CTA: delay 0.48 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "200px" }}
          transition={{ duration: 0.6, delay: 0.48, ease: easeOutExpo }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-body font-semibold text-sm tracking-wide rounded-full transition-all duration-500 hover:shadow-[0_0_40px_-8px_hsl(217_91%_60%/0.5)] hover:scale-[1.03]"
            >
              {OFFER.cta}
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <p className="text-muted-foreground font-body text-xs mt-3">
              Every new client starts with a personal call.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderSection;
