import { motion } from "framer-motion";
import {
  Search,
  BarChart3,
  Package,
  Megaphone,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

interface ServiceCard {
  icon: LucideIcon;
  title: string;
  description: string;
  span?: string;
}

const services: ServiceCard[] = [
  {
    icon: Search,
    title: "Product Research & Launch",
    description:
      "We identify high-demand, low-competition opportunities using proprietary data tools, then execute a full go-to-market strategy. Includes: market analysis, competitor mapping, keyword architecture, listing creation, launch PPC campaigns, and review generation strategy. Typical timeline: 4-6 weeks to first sale.",
    span: "md:col-span-2",
  },
  {
    icon: Megaphone,
    title: "Amazon PPC Management",
    description:
      "Daily-optimized ad campaigns across Sponsored Products, Sponsored Brands, Sponsored Display, and DSP. We structure campaigns for maximum ACoS efficiency while building organic rank. Includes: campaign architecture, bid optimization, negative keyword mining, search term analysis, and weekly performance reports.",
  },
  {
    icon: BarChart3,
    title: "Listing Optimization",
    description:
      "Conversion-focused copywriting backed by keyword research and split testing. Includes: SEO-optimized titles, benefit-driven bullet points, A+ Content design, backend keyword optimization, and main image strategy. Average conversion rate improvement: 25-40%.",
  },
  {
    icon: Package,
    title: "Supply Chain & Logistics",
    description:
      "End-to-end inventory management so you never stock out or over-order. Includes: demand forecasting, freight forwarding coordination, FBA prep and labeling, restock alerts, and multi-warehouse distribution planning. We work with your existing suppliers or help you find new ones.",
    span: "md:col-span-2",
  },
  {
    icon: ShieldCheck,
    title: "Account Health & Compliance",
    description:
      "Proactive protection for your seller account. Includes: policy compliance monitoring, listing suppression resolution, intellectual property protection, review management, and reinstatement support if anything goes wrong. Prevention is cheaper than cure.",
  },
  {
    icon: TrendingUp,
    title: "Brand Growth & Expansion",
    description:
      "Once your US Amazon business is profitable, we scale you into new markets. Includes: Walmart marketplace launch, Amazon EU/UK/CA expansion, brand registry optimization, and omnichannel strategy to diversify your revenue beyond a single platform.",
  },
];

const ServicesSection = () => {
  return (
    <section
      id="services"
      className="relative py-20 lg:py-28 px-6"
      aria-labelledby="services-heading"
    >
      <div className="absolute top-0 left-0 right-0 line-accent" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "200px" }}
          transition={{ duration: 0.7, ease: easeOutExpo }}
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
              What we{" "}
              <span className="italic text-gradient-primary font-medium">
                deliver
              </span>
            </h2>
          </div>
          <p className="text-muted-foreground font-body text-sm leading-relaxed max-w-sm font-light">
            End-to-end Amazon FBA services engineered to launch, optimize, and
            scale your brand to its full potential.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-4 gap-4 lg:gap-5">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "100px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: easeOutExpo,
                }}
                className={`group relative p-8 lg:p-10 rounded-2xl bg-card border border-border transition-all duration-500 hover:border-primary/20 hover:-translate-y-1.5 ${service.span || ""}`}
              >
                {/* Hover glow background */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Hover glow shadow */}
                <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-b from-primary/10 to-transparent blur-xl -z-10" />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-6 transition-all duration-500 group-hover:bg-primary/10 group-hover:shadow-[0_0_20px_-4px_hsl(var(--primary)/0.3)]">
                    <Icon className="w-5 h-5 text-primary transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-3 text-foreground transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed font-light">
                    {service.description}
                  </p>
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

        {/* Mid-page CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: easeOutExpo }}
          className="mt-16 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-body font-semibold text-sm tracking-wide rounded-full transition-all duration-500 hover:shadow-[0_0_40px_-8px_hsl(265_85%_65%/0.5)] hover:scale-[1.03]"
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
