import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const CTASection = () => {
  return (
    <section
      id="contact"
      className="relative py-32 lg:py-44 px-6 overflow-hidden"
      aria-labelledby="cta-heading"
    >
      <div className="absolute top-0 left-0 right-0 line-accent" />

      {/* Background mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-primary/[0.06] blur-[180px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full bg-accent/[0.04] blur-[140px]" />
      </div>

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "200px" }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
        >
          <span className="text-[11px] tracking-[0.2em] uppercase text-primary font-mono">
            Ready to scale?
          </span>
          <h2
            id="cta-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mt-4 mb-8 leading-[1.05]"
          >
            Let&apos;s dominate
            <br />
            <span className="italic text-gradient-primary font-medium">
              Amazon together
            </span>
          </h2>
          <p className="text-muted-foreground font-body text-sm mb-10 font-light">
            No commitment. Free 30-minute account audit &amp; growth roadmap.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: easeOutExpo }}
          className="glass glass-border rounded-2xl p-8 md:p-10"
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
