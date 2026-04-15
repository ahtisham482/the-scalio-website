import { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Check,
  TrendingUp,
  Users,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import { getServiceBySlug } from "@/data/services";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return <Navigate to="/404" replace />;
  }

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass glass-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
          <a
            href="/"
            className="font-display text-lg font-bold tracking-tight text-foreground"
          >
            The Scalio<span className="text-primary">.</span>
          </a>
          <div className="flex items-center gap-4">
            <a
              href="/#services"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
            >
              All Services
            </a>
            <a
              href="/#contact"
              className="px-4 py-2 text-xs tracking-wide uppercase font-body font-medium bg-primary text-primary-foreground rounded-full transition-all duration-300 hover:shadow-[0_0_20px_-4px_hsl(var(--primary)/0.4)]"
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-28 pb-20">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOutExpo }}
          className="mb-16"
        >
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
            <Icon className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.05] mb-4">
            {service.title}
          </h1>
          <p className="text-xl md:text-2xl italic text-primary/80 font-body mb-6">
            {service.hook}
          </p>
          <p className="text-muted-foreground font-body text-base leading-[1.9] font-light max-w-2xl mb-8">
            {service.heroDescription}
          </p>

          <div className="flex flex-wrap gap-4">
            <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-dashed border-primary/20 bg-primary/[0.03]">
              <TrendingUp className="w-3.5 h-3.5 text-primary/50" />
              <span className="text-xs font-mono tracking-wider text-primary/60 uppercase">
                {service.metric}
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border/40 bg-card/30">
              <Users className="w-3.5 h-3.5 text-muted-foreground/50" />
              <span className="text-xs font-body text-muted-foreground">
                Best for: {service.bestFor}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Deliverables */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: easeOutExpo }}
          className="mb-16"
        >
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">
            What&apos;s Included
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {service.deliverables.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 p-4 rounded-xl border border-border/40 bg-card/30"
              >
                <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="text-sm font-body text-foreground">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Process */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: easeOutExpo }}
          className="mb-16"
        >
          <h2 className="text-2xl font-display font-bold text-foreground mb-8">
            Our Process
          </h2>
          <div className="space-y-6">
            {service.process.map((step, i) => (
              <div key={step.title} className="flex gap-5">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <span className="text-sm font-mono font-bold text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  {i < service.process.length - 1 && (
                    <div className="w-px flex-1 min-h-[20px] bg-border/40 mt-2" />
                  )}
                </div>
                <div className="pb-6">
                  <h3 className="text-lg font-display font-semibold text-foreground mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Case study teaser */}
        {service.caseStudyTeaser && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: easeOutExpo }}
            className="mb-16"
          >
            <a
              href={service.caseStudyLink}
              className="group flex items-center justify-between p-6 rounded-2xl border border-primary/10 bg-primary/[0.03] transition-all duration-300 hover:border-primary/25 hover:bg-primary/[0.06]"
            >
              <div>
                <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-primary/60 block mb-1">
                  Case Study
                </span>
                <span className="text-base font-body font-semibold text-foreground">
                  {service.caseStudyTeaser}
                </span>
              </div>
              <ArrowUpRight className="w-5 h-5 text-primary/60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.section>
        )}

        {/* FAQ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: easeOutExpo }}
          className="mb-16"
        >
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="space-y-3">
            {service.faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-border/40 rounded-2xl px-6 bg-card/40 backdrop-blur-sm transition-colors hover:border-border/60 data-[state=open]:border-primary/20"
              >
                <AccordionTrigger className="text-left text-base font-display font-semibold text-foreground hover:no-underline py-5 [&[data-state=open]]:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-body text-sm leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: easeOutExpo }}
          className="text-center py-12 border-t border-border/40"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Ready to get started?
          </h2>
          <p className="text-muted-foreground font-body text-sm mb-8 max-w-md mx-auto">
            Book a free 30-minute audit. We&apos;ll review your account and show
            you exactly where the opportunities are.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-body font-semibold text-sm tracking-wide rounded-full transition-all duration-500 hover:shadow-[0_0_40px_-8px_hsl(var(--primary)/0.5)] hover:scale-[1.03]"
          >
            Book a Free Audit
          </a>
          <div className="mt-6 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary/60" />
            <span className="text-xs text-muted-foreground font-body">
              30-Day Money-Back Guarantee
            </span>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center">
        <p className="text-xs text-muted-foreground/60 font-body">
          &copy; {new Date().getFullYear()} The Scalio. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default ServicePage;
