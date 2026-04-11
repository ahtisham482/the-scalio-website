import { motion } from "framer-motion";
import { Search, BarChart3, Package, Megaphone, ShieldCheck, TrendingUp } from "lucide-react";
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
    description: "We identify high-demand, low-competition products and execute full launch strategies to get you ranked fast.",
    span: "md:col-span-2",
  },
  {
    icon: Megaphone,
    title: "Amazon PPC Management",
    description: "Precision-targeted ad campaigns that maximize ACoS and drive profitable organic ranking growth.",
  },
  {
    icon: BarChart3,
    title: "Listing Optimization",
    description: "Conversion-optimized titles, bullet points, A+ Content, and backend keywords that turn browsers into buyers.",
  },
  {
    icon: Package,
    title: "Supply Chain & Logistics",
    description: "End-to-end inventory management, freight forwarding, and FBA prep to keep your supply chain running smoothly.",
    span: "md:col-span-2",
  },
  {
    icon: ShieldCheck,
    title: "Account Health & Compliance",
    description: "Protect your seller account with proactive monitoring, reinstatement support, and policy compliance management.",
  },
  {
    icon: TrendingUp,
    title: "Brand Growth & Expansion",
    description: "Scale beyond Amazon with multi-marketplace expansion, Walmart integration, and omnichannel strategies.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="relative py-32 lg:py-40 px-6" aria-labelledby="services-heading">
      <div className="absolute top-0 left-0 right-0 line-accent" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: easeOutExpo }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div>
            <span className="text-[11px] tracking-[0.2em] uppercase text-primary font-mono">Services</span>
            <h2 id="services-heading" className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mt-4 leading-[1.05]">
              What we <span className="italic text-gradient-primary font-medium">deliver</span>
            </h2>
          </div>
          <p className="text-muted-foreground font-body text-sm leading-relaxed max-w-sm font-light">
            End-to-end Amazon FBA services engineered to launch, optimize, and scale your brand to its full potential.
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
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: easeOutExpo }}
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
      </div>
    </section>
  );
};

export default ServicesSection;
