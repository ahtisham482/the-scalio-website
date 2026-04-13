import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

interface FAQCategory {
  category: string;
  items: { question: string; answer: string }[];
}

const faqCategories: FAQCategory[] = [
  {
    category: "Getting Started",
    items: [
      {
        question: "How long before I see results?",
        answer:
          "Most clients see measurable improvements within 30–60 days. Keyword rankings and organic traffic typically move first, followed by revenue growth at 60–90 days. We set clear milestones so you always know where you stand. Typical timeline: Month 1 = audit & optimization, Month 2 = ranking improvements, Month 3+ = revenue growth.",
      },
      {
        question:
          "Do you work with new product launches or only existing listings?",
        answer:
          "Both. Whether you're launching your first SKU or scaling an established catalog with 100+ ASINs, our process adapts. New launches get a full go-to-market strategy including product positioning, keyword architecture, launch PPC, and review generation. Existing listings get optimized for maximum conversion and rank.",
      },
      {
        question: "How much of my time does this take?",
        answer:
          "After the initial onboarding call (30 minutes) and strategy approval (15 minutes), your ongoing time commitment is one 30-minute weekly call. That's it. We handle everything else — campaign management, listing updates, bid adjustments, reporting. You focus on your business, we focus on your Amazon growth.",
      },
      {
        question: "What access do you need to my Seller Central account?",
        answer:
          "We use Amazon's built-in user permissions — we never ask for your main login or password. You add us as a user with the specific permissions we need (advertising, catalog, reports), and you can revoke access in one click at any time. Your account stays under your full control. We also sign an NDA before accessing any account data.",
      },
    ],
  },
  {
    category: "Pricing & Commitment",
    items: [
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
        question: "What if I'm not happy with the results?",
        answer:
          "Since we're month-to-month, you can pause or cancel anytime — no penalties. But before that, we'll work with you to diagnose the issue and adjust strategy. In our experience, most performance concerns come from misaligned expectations rather than poor execution, which is why we set clear milestones upfront during your free audit.",
      },
    ],
  },
  {
    category: "Working With Us",
    items: [
      {
        question: "What makes you different from other Amazon agencies?",
        answer:
          "We're operators, not consultants. Our team has managed over $50M in Amazon revenue across 200+ brands. We combine proprietary data tools, daily PPC optimization, and a dedicated account manager — not a junior VA checking in once a week. You'll have direct access to the people doing the work, not a sales team.",
      },
      {
        question:
          "What results can I realistically expect in 30, 60, and 90 days?",
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
    ],
  },
];

const FAQSection = () => {
  return (
    <section
      id="faq"
      className="relative py-24 md:py-36 px-6"
      aria-labelledby="faq-heading"
    >
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
            Before you{" "}
            <span className="text-gradient-primary italic font-medium">
              decide
            </span>
          </h2>
          <p className="text-muted-foreground font-body text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            Honest answers to the questions every Amazon seller asks before
            hiring an agency.
          </p>
        </motion.div>

        {/* Categorized FAQ Accordion */}
        {faqCategories.map((cat, catIndex) => (
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "100px" }}
            transition={{
              duration: 0.7,
              delay: catIndex * 0.1,
              ease: easeOutExpo,
            }}
            className="mb-10"
          >
            <h3 className="text-[11px] font-mono tracking-[0.2em] uppercase text-primary/70 mb-4 pl-1">
              {cat.category}
            </h3>
            <Accordion type="single" collapsible className="space-y-3">
              {cat.items.map((faq, index) => (
                <AccordionItem
                  key={`${catIndex}-${index}`}
                  value={`cat-${catIndex}-item-${index}`}
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
        ))}

        {/* Escape hatch CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="text-center mt-12 py-8 border-t border-border/30"
        >
          <p className="text-foreground font-display font-semibold text-lg mb-2">
            Still have a question?
          </p>
          <p className="text-muted-foreground font-body text-sm mb-5">
            Ask us directly — no commitment required.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-body font-semibold text-sm rounded-full transition-all duration-300 hover:shadow-[0_0_30px_-6px_hsl(var(--primary)/0.4)] hover:scale-[1.02]"
            >
              Book a Free Call
            </a>
            <a
              href="mailto:hello@thescalio.com"
              className="inline-flex items-center justify-center px-6 py-3 border border-border text-foreground font-body font-medium text-sm rounded-full transition-all duration-300 hover:border-primary/30"
            >
              Email Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
