import { motion } from "framer-motion";
import {
  Search,
  BarChart3,
  Package,
  Megaphone,
  ShieldCheck,
  TrendingUp,
  Check,
  Users,
  ArrowUpRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

interface ServiceCard {
  icon: LucideIcon;
  title: string;
  hook: string;
  metric: string;
  deliverables: string[];
  bestFor: string;
  caseStudyLink?: string;
  span?: string;
}

const services: ServiceCard[] = [
  {
    icon: Search,
    title: "Product Research & Launch",
    hook: "Go from idea to first sale in 4-6 weeks",
    metric: "X products launched",
    deliverables: [
      "Market & demand analysis",
      "Competitor mapping & gap identification",
      "Keyword architecture & SEO strategy",
      "Full listing creation (copy + images)",
      "Launch PPC campaigns",
      "Review generation strategy",
    ],
    bestFor:
      "New sellers launching their first product, or established brands expanding their catalog",
    caseStudyLink: "#case-studies",
    span: "md:col-span-2",
  },
  {
    icon: Megaphone,
    title: "Amazon PPC Management",
    hook: "Turn ad spend into profitable organic rank",
    metric: "Avg X% ACoS reduction",
    deliverables: [
      "Campaign architecture & restructuring",
      "Daily bid optimization",
      "Negative keyword mining",
      "Search term analysis & harvesting",
      "Weekly performance reports",
      "Dedicated PPC strategist",
    ],
    bestFor: "Brands spending $2K+/month on Amazon ads who want better returns",
    caseStudyLink: "#case-studies",
  },
  {
    icon: BarChart3,
    title: "Listing Optimization",
    hook: "Convert more browsers into buyers",
    metric: "Avg X% conversion lift",
    deliverables: [
      "SEO-optimized titles & bullet points",
      "A+ Content design & copywriting",
      "Backend keyword optimization",
      "Main image & gallery strategy",
      "Competitor split testing",
    ],
    bestFor: "Sellers with traffic but low conversion rates",
    caseStudyLink: "#case-studies",
  },
  {
    icon: Package,
    title: "Supply Chain & Logistics",
    hook: "Never stock out. Never over-order.",
    metric: "X brands managed",
    deliverables: [
      "Demand forecasting & planning",
      "Freight forwarding coordination",
      "FBA prep & labeling",
      "Automated restock alerts",
      "Multi-warehouse distribution",
      "Supplier sourcing & negotiation",
    ],
    bestFor: "Sellers scaling past $20K/month who need inventory reliability",
    span: "md:col-span-2",
  },
  {
    icon: ShieldCheck,
    title: "Account Health & Compliance",
    hook: "Sleep well knowing your account is protected",
    metric: "X% reinstatement success",
    deliverables: [
      "Policy compliance monitoring",
      "Listing suppression resolution",
      "Intellectual property protection",
      "Review management & monitoring",
      "Reinstatement support",
      "Preventive health audits",
    ],
    bestFor: "Any seller who depends on Amazon for revenue",
  },
  {
    icon: TrendingUp,
    title: "Brand Growth & Expansion",
    hook: "Grow beyond Amazon into a real brand",
    metric: "X marketplaces covered",
    deliverables: [
      "Walmart marketplace launch",
      "Amazon EU / UK / CA expansion",
      "Brand Registry optimization",
      "Omnichannel strategy & DTC",
      "International market analysis",
    ],
    bestFor: "Profitable US Amazon sellers ready to diversify revenue",
    caseStudyLink: "#case-studies",
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
                className={`group relative p-7 lg:p-9 rounded-2xl bg-card border border-border transition-all duration-500 hover:border-primary/20 hover:-translate-y-1.5 flex flex-col ${service.span || ""}`}
              >
                {/* Hover glow background */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-b from-primary/10 to-transparent blur-xl -z-10" />

                <div className="relative z-10 flex flex-col flex-1">
                  {/* Icon */}
                  <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center mb-5 transition-all duration-500 group-hover:bg-primary/10 group-hover:shadow-[0_0_20px_-4px_hsl(var(--primary)/0.3)]">
                    <Icon className="w-5 h-5 text-primary transition-transform duration-500 group-hover:scale-110" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-display font-semibold text-foreground mb-1.5">
                    {service.title}
                  </h3>

                  {/* Hook */}
                  <p className="text-sm italic text-primary/80 font-body mb-4">
                    {service.hook}
                  </p>

                  {/* Metric placeholder */}
                  <div className="inline-flex self-start items-center gap-1.5 px-3 py-1.5 rounded-full border border-dashed border-primary/20 bg-primary/[0.03] mb-5">
                    <TrendingUp className="w-3 h-3 text-primary/50" />
                    <span className="text-[10px] font-mono tracking-wider text-primary/50 uppercase">
                      {service.metric}
                    </span>
                  </div>

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
                      See results
                      <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
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
