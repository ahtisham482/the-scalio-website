import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const faqs = [
  {
    question: "How long before I see results?",
    answer:
      "Most clients see measurable improvements within 30–60 days. Keyword rankings and organic traffic typically move first, followed by revenue growth at 60–90 days. We set clear milestones so you always know where you stand.",
  },
  {
    question:
      "Do you work with new product launches or only existing listings?",
    answer:
      "Both. Whether you're launching your first SKU or scaling an established catalog with 100+ ASINs, our process adapts. New launches get a full go-to-market strategy; existing listings get optimized for maximum conversion and rank.",
  },
  {
    question: "What makes you different from other Amazon agencies?",
    answer:
      "We're operators, not consultants. Our team has managed over $120M in Amazon revenue across 200+ brands. We combine proprietary data tools, daily PPC optimization, and a dedicated account team — not a junior VA checking in once a week.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Our pricing is performance-aligned and depends on your catalog size, ad spend, and goals. Every engagement starts with a free audit so we can scope the opportunity before any commitment. No long-term contracts — we earn your business monthly.",
  },
  {
    question: "Will I have visibility into what you're doing?",
    answer:
      "Absolutely. You get a real-time dashboard with all KPIs, weekly strategy calls, and a dedicated Slack channel with your team. Full transparency is non-negotiable for us.",
  },
  {
    question: "Do you manage PPC, or just listings?",
    answer:
      "We manage the full stack — listing copywriting, A+ Content, PPC (Sponsored Products, Brands, Display, DSP), keyword strategy, inventory planning, and marketplace expansion. Everything under one roof.",
  },
];

const FAQSection = () => {
  return (
    <section
      id="faq"
      className="relative py-24 md:py-36 px-6"
      aria-labelledby="faq-heading"
    >
      {/* Background orb */}
      <div className="absolute bottom-1/4 right-[5%] w-[300px] h-[300px] bg-primary/[0.03] orb animate-float-slow pointer-events-none" />

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "200px" }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-primary block mb-4">
            FAQ
          </span>
          <h2
            id="faq-heading"
            className="text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.05] mb-6"
          >
            Questions?{" "}
            <span className="text-gradient-primary italic font-medium">
              Answered
            </span>
          </h2>
          <p className="text-muted-foreground font-body text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            Everything you need to know before we start scaling your brand.
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.7, ease: easeOutExpo }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border/40 rounded-2xl px-6 bg-card/40 backdrop-blur-sm transition-colors hover:border-border/60 data-[state=open]:border-primary/20 data-[state=open]:bg-card/60"
              >
                <AccordionTrigger className="text-left text-base md:text-lg font-display font-semibold text-foreground hover:no-underline py-5 [&[data-state=open]]:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-body text-sm md:text-base leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
