import {
  Search,
  Megaphone,
  BarChart3,
  Package,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ProcessStep {
  title: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ServiceDetail {
  slug: string;
  icon: LucideIcon;
  title: string;
  hook: string;
  metric: string;
  deliverables: string[];
  bestFor: string;
  caseStudyLink: string;
  caseStudyTeaser?: string;
  heroDescription: string;
  process: ProcessStep[];
  faqs: FAQ[];
}

export const services: ServiceDetail[] = [
  {
    slug: "product-launch",
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
    caseStudyLink: "/#case-studies",
    caseStudyTeaser: "Lumiere Home: $0 → $92K/mo in 6 months",
    heroDescription:
      "Launching on Amazon without a strategy is like opening a store in the desert. We use proprietary data tools to identify high-demand, low-competition opportunities — then execute a complete go-to-market plan that gets you ranked, reviewed, and revenue-generating within weeks, not months.",
    process: [
      {
        title: "Opportunity Analysis",
        description:
          "We analyze 50+ data points across demand, competition, margin potential, and seasonality to identify products with the highest probability of success.",
      },
      {
        title: "Listing & Brand Build",
        description:
          "Our copywriters and designers create conversion-optimized listings — SEO-rich titles, benefit-driven bullets, premium A+ Content, and a main image strategy designed to stop the scroll.",
      },
      {
        title: "Launch Campaign",
        description:
          "We execute a coordinated launch using targeted PPC, keyword ranking campaigns, and early review generation to build momentum in the critical first 30 days.",
      },
      {
        title: "Optimize & Scale",
        description:
          "Once live, we monitor daily and iterate — adjusting bids, refining keywords, and optimizing conversion rate to establish profitable organic rank.",
      },
    ],
    faqs: [
      {
        question: "How do you choose which products to launch?",
        answer:
          "We use a proprietary scoring model that evaluates demand volume, competition density, margin potential, review barriers, and seasonal trends. We only recommend products that score above our profitability threshold.",
      },
      {
        question: "Do I need to have a product already?",
        answer:
          "No. We can help you from the very beginning — product selection, supplier sourcing, and sample evaluation — all the way through to your first sale.",
      },
      {
        question: "How long does a typical launch take?",
        answer:
          "From product selection to first sale: 4-6 weeks if you have inventory ready, or 8-12 weeks if we're sourcing from scratch. We set clear milestones at every stage.",
      },
    ],
  },
  {
    slug: "ppc",
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
    caseStudyLink: "/#case-studies",
    caseStudyTeaser: "PeakFit: ACoS dropped 68% → 18%",
    heroDescription:
      "Most Amazon sellers waste 30-50% of their ad budget on poorly structured campaigns. We rebuild your PPC from the ground up — creating a campaign architecture that maximizes every dollar, drives organic rank, and turns advertising from a cost center into a profit engine.",
    process: [
      {
        title: "PPC Audit",
        description:
          "We dissect your current campaigns — identifying wasted spend, missing keyword opportunities, and structural inefficiencies. You get a detailed report within 48 hours.",
      },
      {
        title: "Campaign Restructure",
        description:
          "We build a new campaign architecture from scratch: exact/phrase/broad match segmentation, product targeting, brand defense, and competitor conquest campaigns.",
      },
      {
        title: "Daily Optimization",
        description:
          "Our PPC team adjusts bids, mines search terms, and adds negative keywords every single day — not weekly or monthly like most agencies.",
      },
      {
        title: "Scale & Compound",
        description:
          "As organic rank improves, we strategically reduce ad spend while maintaining sales velocity — the goal is profitable organic rank, not ad dependency.",
      },
    ],
    faqs: [
      {
        question: "What's a good ACoS target?",
        answer:
          "It depends on your margins and goals. For ranking campaigns, we tolerate higher ACoS short-term to build organic position. For profitability campaigns, we typically target 15-25% ACoS. We'll set custom targets based on your unit economics.",
      },
      {
        question: "Do you manage DSP and Sponsored Display too?",
        answer:
          "Yes. We manage the full Amazon advertising suite: Sponsored Products, Sponsored Brands, Sponsored Display, and Amazon DSP. We also handle video ads and brand store design.",
      },
      {
        question: "How quickly will I see results?",
        answer:
          "Most clients see ACoS improvements within the first 2 weeks after restructuring. Meaningful organic rank improvements typically show within 30-60 days.",
      },
    ],
  },
  {
    slug: "listing-optimization",
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
    caseStudyLink: "/#case-studies",
    caseStudyTeaser: "PeakFit: 1,442% revenue growth",
    heroDescription:
      "Your listing is your storefront. If it doesn't convert, no amount of advertising will save it. We combine data-driven keyword research with conversion copywriting and premium visual design to create listings that turn browsers into buyers — typically improving conversion rates by 25-40%.",
    process: [
      {
        title: "Conversion Audit",
        description:
          "We analyze your current listing against top competitors — title structure, bullet point effectiveness, image quality, A+ Content, and backend keywords. Every weakness gets documented.",
      },
      {
        title: "Keyword Architecture",
        description:
          "Using tools like Helium 10 and our proprietary datasets, we build a complete keyword map — primary, secondary, and long-tail terms — ensuring you're indexed for every relevant search.",
      },
      {
        title: "Copy & Content Creation",
        description:
          "Our copywriters craft benefit-driven bullets, SEO-optimized titles, and compelling A+ Content. Our designers create infographics, lifestyle images, and comparison charts.",
      },
      {
        title: "Test & Iterate",
        description:
          "We run split tests on titles, images, and bullet points — measuring conversion rate impact and iterating until we find the winning combination.",
      },
    ],
    faqs: [
      {
        question: "Will changing my listing affect my ranking?",
        answer:
          "Temporarily, yes — Amazon may re-index your listing. But in our experience, optimized listings recover within 3-7 days and then outperform the original. We time changes strategically to minimize disruption.",
      },
      {
        question: "Do you do A+ Content design?",
        answer:
          "Yes, A+ Content is included. We handle both the copywriting and the graphic design — delivering ready-to-upload modules with lifestyle imagery, comparison charts, and brand storytelling.",
      },
      {
        question: "How do you measure success?",
        answer:
          "We track unit session percentage (conversion rate), sessions, page views, and revenue before and after optimization. You'll get a clear before/after comparison report.",
      },
    ],
  },
  {
    slug: "supply-chain",
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
    caseStudyLink: "/#case-studies",
    caseStudyTeaser: "Alpine Gear: scaled to $320K/mo",
    heroDescription:
      "Stock-outs kill your ranking. Over-ordering kills your cash flow. We build an inventory management system around your business — with demand forecasting, automated restock alerts, and freight coordination — so you never lose a sale to poor planning.",
    process: [
      {
        title: "Supply Chain Audit",
        description:
          "We map your current supply chain end-to-end: suppliers, lead times, shipping routes, prep processes, and storage costs. Every bottleneck gets identified.",
      },
      {
        title: "Demand Forecasting",
        description:
          "Using your sales velocity, seasonality patterns, and growth trajectory, we build a rolling forecast model that tells you exactly when and how much to reorder.",
      },
      {
        title: "Logistics Optimization",
        description:
          "We coordinate freight forwarding, negotiate shipping rates, manage FBA prep and labeling, and set up multi-warehouse distribution to reduce delivery times.",
      },
      {
        title: "Ongoing Monitoring",
        description:
          "Automated restock alerts, inventory health dashboards, and weekly check-ins ensure you're always stocked at optimal levels without tying up excess capital.",
      },
    ],
    faqs: [
      {
        question: "Can you help me find new suppliers?",
        answer:
          "Yes. We have a network of vetted suppliers across China, India, and the US. We handle supplier outreach, sample evaluation, price negotiation, and quality assurance.",
      },
      {
        question: "Do you handle international shipping?",
        answer:
          "Yes. We coordinate ocean freight, air freight, and last-mile delivery to Amazon FBA warehouses. We work with multiple freight forwarders to get you the best rates.",
      },
      {
        question: "What if I'm just starting and don't have sales data?",
        answer:
          "We use category-level demand data and competitor sales estimates to build initial forecasts. As your sales data accumulates, we refine the model for greater accuracy.",
      },
    ],
  },
  {
    slug: "account-health",
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
    caseStudyLink: "/#case-studies",
    heroDescription:
      "One policy violation can shut down your entire business overnight. We proactively monitor your account health, resolve listing suppressions before they escalate, and maintain compliance across every Amazon policy. If the worst happens, our reinstatement team has your back.",
    process: [
      {
        title: "Health Assessment",
        description:
          "We audit your account's current health score, flagged listings, policy violations, and review compliance. Every risk gets documented and prioritized.",
      },
      {
        title: "Risk Mitigation",
        description:
          "We fix existing violations, update non-compliant listings, and implement preventive measures — brand registry, IP protection, and automated monitoring alerts.",
      },
      {
        title: "Ongoing Monitoring",
        description:
          "Our team monitors your account daily for new flags, listing suppressions, review manipulations, and policy changes that could affect your business.",
      },
      {
        title: "Emergency Response",
        description:
          "If a suspension or suppression occurs, our reinstatement team drafts and submits appeals within 24 hours — with a proven track record of successful reinstatements.",
      },
    ],
    faqs: [
      {
        question: "Can you get my suspended account reinstated?",
        answer:
          "In most cases, yes. We have a high reinstatement success rate across various suspension types — from intellectual property claims to authenticity complaints. We draft compliant Plans of Action and handle all communication with Amazon.",
      },
      {
        question: "How do you prevent suspensions?",
        answer:
          "Prevention is our primary focus. We monitor policy changes daily, audit your listings for compliance gaps, manage review integrity, and implement brand protection strategies before problems arise.",
      },
      {
        question: "Do you handle listing suppressions too?",
        answer:
          "Yes. Listing suppressions are our most common fix. We identify the root cause (restricted keywords, image violations, category requirements), fix the issue, and submit for reinstatement — usually within 24-48 hours.",
      },
    ],
  },
  {
    slug: "brand-growth",
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
    caseStudyLink: "/#case-studies",
    caseStudyTeaser: "Alpine Gear: 611% growth in 12 months",
    heroDescription:
      "Relying on a single marketplace is a business risk. Once your US Amazon business is profitable, we help you expand into new channels — Walmart, Amazon EU/UK/CA, and direct-to-consumer — building a real brand that isn't dependent on any single platform.",
    process: [
      {
        title: "Expansion Analysis",
        description:
          "We evaluate which markets and channels offer the highest ROI for your specific product category — factoring in competition, demand, logistics complexity, and regulatory requirements.",
      },
      {
        title: "Market Entry",
        description:
          "We handle the entire market entry process: marketplace registration, listing localization, pricing strategy, and initial advertising setup for each new channel.",
      },
      {
        title: "Brand Building",
        description:
          "We optimize your Brand Registry, build Amazon Stores, design brand-focused advertising campaigns, and develop your brand story across all touchpoints.",
      },
      {
        title: "Scale & Diversify",
        description:
          "With multiple channels generating revenue, we continuously optimize each one — reducing single-platform dependency and building a resilient, omnichannel brand.",
      },
    ],
    faqs: [
      {
        question: "When should I expand to new marketplaces?",
        answer:
          "When your US Amazon business is consistently profitable with stable operations. Expanding too early splits your focus. We typically recommend expansion once you're doing $50K+/month on US Amazon.",
      },
      {
        question: "Do you handle Walmart marketplace too?",
        answer:
          "Yes. Walmart is our most recommended expansion channel for US sellers. We handle the application, listing migration, advertising setup, and ongoing optimization.",
      },
      {
        question: "What about selling directly to consumers (DTC)?",
        answer:
          "We help you build a DTC presence alongside your marketplace business — Shopify store setup, email marketing, and social media strategy. The goal is brand equity, not just marketplace sales.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return services.find((s) => s.slug === slug);
}
