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
      "Most clients see measurable improvements within 30–60 days. Keyword rankings and organic traffic typically move first, followed by revenue growth at 60–90 days. We set clear milestones so you always know where you stand. Typical timeline: Month 1 = audit & optimization, Month 2 = ranking improvements, Month 3+ = revenue growth.",
  },
  {
    question: "What does pricing look like? Do you have packages?",
    answer:
      "We offer three tiers based on your catalog size and goals. Starter plans begin at $2,500/month for brands doing under $50K in monthly revenue. Growth and Enterprise tiers are custom-quoted based on SKU count, ad spend, and marketplace coverage. Every engagement starts with a free audit — no commitment required to get a custom quote.",
  },
  {
    question: "Do I need to sign a long-term contract?",
    answer:
      "No. We work on month-to-month agreements. No lock-ins, no cancellation fees. We believe in earning your business every month with results, not holding you hostage with contracts. That said, most clients stay for 12+ months because the ROI speaks for itself.",
  },
  {
    question:
      "Do you work with new product launches or only existing listings?",
    answer:
      "Both. Whether you're launching your first SKU or scaling an established catalog with 100+ ASINs, our process adapts. New launches get a full go-to-market strategy including product positioning, keyword architecture, launch PPC, and review generation. Existing listings get optimized for maximum conversion and rank.",
  },
  {
    question: "What makes you different from other Amazon agencies?",
    answer:
      "We're operators, not consultants. Our team has managed over $50M in Amazon revenue across 200+ brands. We combine proprietary data tools, daily PPC optimization, and a dedicated account manager — not a junior VA checking in once a week. You'll have direct access to the people doing the work, not a sales team.",
  },
  {
    question: "What results can I realistically expect in 30, 60, and 90 days?",
    answer:
      "30 days: Listings fully optimized, PPC restructured, keyword gaps identified and targeted. 60 days: 15-30% improvement in conversion rate, ACoS reduction of 10-25%, organic ranking improvements. 90 days: 2-5x revenue growth trajectory established, profitable PPC structure, page 1 rankings for primary keywords. These are typical ranges — your actual results depend on your product, category, and starting point.",
  },
  {
    question: "Will I have visibility into what you're doing?",
    answer:
      "Absolutely. You get a real-time dashboard with all KPIs, weekly strategy calls, and a dedicated Slack channel with your team. You'll see exactly what we're spending, what we're testing, and what's working. Full transparency is non-negotiable for us.",
  },
  {
    question: "Do you manage PPC, or just listings?",
    answer:
      "We manage the full stack — listing copywriting, A+ Content, PPC (Sponsored Products, Brands, Display, DSP), keyword strategy, inventory planning, and marketplace expansion. You don't need to hire separate specialists — everything is handled under one roof by one integrated team.",
  },
  {
    question: "What if I'm not happy with the results?",
    answer:
      "Since we're month-to-month, you can pause or cancel anytime — no penalties. But before that, we'll work with you to diagnose the issue and adjust strategy. In our experience, most performance concerns come from misaligned expectations rather than poor execution, which is why we set clear milestones upfront during your free audit.",
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
