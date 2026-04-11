import { motion } from "framer-motion";
import { Shield, Award, Users } from "lucide-react";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const credentials = [
  { icon: Users, label: "200+ Brands Scaled" },
  { icon: Award, label: "8+ Years on Amazon" },
  { icon: Shield, label: "$50M+ Revenue Managed" },
];

const FounderSection = () => {
  return (
    <section
      id="founder"
      className="relative py-20 lg:py-28 px-6"
      aria-labelledby="founder-heading"
    >
      <div className="absolute top-0 left-0 right-0 line-accent" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "200px" }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
        >
          <div className="text-center mb-12">
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-primary block mb-4">
              Meet the Team
            </span>
            <h2
              id="founder-heading"
              className="text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.05] mb-6"
            >
              Built by{" "}
              <span className="text-gradient-primary italic font-medium">
                sellers, for sellers
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: Founder story */}
            <div>
              <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/10 via-card to-accent/10 border border-border/40 flex items-center justify-center mb-6">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/20 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl font-display font-bold text-primary">
                      TS
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground font-body">
                    Founder photo coming soon
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Story + credentials */}
            <div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                The Story Behind The Scalio
              </h3>
              <p className="text-muted-foreground font-body text-base leading-[1.9] font-light mb-4">
                The Scalio was born from frustration. After years of selling on
                Amazon ourselves, we saw the same pattern: agencies that charged
                premium prices but delivered cookie-cutter strategies. Junior
                VAs managing million-dollar accounts. Monthly reports that said
                nothing. Zero accountability.
              </p>
              <p className="text-muted-foreground font-body text-base leading-[1.9] font-light mb-6">
                We built The Scalio to be the agency we wished existed — one
                where senior strategists do the actual work, where transparency
                is default, and where our success is measured by your revenue
                growth, not our retainer invoices. Every client gets a dedicated
                team, weekly strategy calls, and real-time dashboards. No black
                boxes. No excuses.
              </p>

              {/* Credentials */}
              <div className="flex flex-wrap gap-4">
                {credentials.map((cred) => {
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
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderSection;
