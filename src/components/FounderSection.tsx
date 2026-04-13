import { motion } from "framer-motion";
import { Briefcase, Target, Users, ArrowUpRight } from "lucide-react";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const founderCredentials = [
  { icon: Briefcase, label: "Former Amazon Seller" },
  { icon: Target, label: "Managed $X in Ad Spend Personally" },
  { icon: Users, label: "Scaled X+ Brands from $0 to $100K+" },
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "200px" }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
        >
          {/* Section eyebrow + heading */}
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

          {/* Pull quote — the scan hook */}
          <blockquote className="text-center mb-12 max-w-2xl mx-auto">
            <p className="text-xl md:text-2xl font-display font-medium italic text-foreground/90 leading-relaxed">
              &ldquo;Most agencies optimize for ACoS. We optimize for profit.
              There&apos;s a difference — and it&apos;s worth millions to the
              brands that understand it.&rdquo;
            </p>
          </blockquote>

          {/* Story */}
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

            {/* Founder-specific credentials — different from company stats in About */}
            <div className="flex flex-wrap gap-3 mb-8">
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

            {/* LinkedIn verification link */}
            <div className="flex items-center gap-4 mb-10">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-muted-foreground hover:text-primary transition-colors"
                aria-label="Founder's LinkedIn profile"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Connect on LinkedIn
              </a>
            </div>

            {/* Personal CTA */}
            <div className="text-center">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-body font-semibold text-sm tracking-wide rounded-full transition-all duration-500 hover:shadow-[0_0_40px_-8px_hsl(265_85%_65%/0.5)] hover:scale-[1.03]"
              >
                Talk to the Founder About Your Brand
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <p className="text-muted-foreground/50 font-body text-xs mt-3">
                Every new client starts with a personal call.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderSection;
