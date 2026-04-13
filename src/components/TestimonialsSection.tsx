import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import testimonialJason from "@/assets/testimonial-jason.jpg";
import testimonialAmara from "@/assets/testimonial-amara.jpg";
import testimonialDavid from "@/assets/testimonial-david.jpg";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const testimonials = [
  {
    quote:
      "Before The Scalio, we were spending $8K/month on ads with nothing to show for it. They restructured our entire PPC strategy, rebuilt our listings from scratch, and within 8 months we went from $12K to $185K in monthly revenue. Best investment we ever made.",
    name: "Jason Park",
    role: "Founder & CEO",
    context: "Supplements · $185K/mo",
    photo: testimonialJason,
  },
  {
    quote:
      "We had a great product but zero Amazon experience. The Scalio handled our entire launch — from keyword research to A+ content to our first PPC campaigns. We hit $50K in month one and haven't looked back. They genuinely care about your success.",
    name: "Amara Osei",
    role: "Founder",
    context: "Home & Kitchen · Launched 2024",
    photo: testimonialAmara,
  },
  {
    quote:
      "I wasted two years and over $40K on agencies that overpromised and underdelivered. The Scalio was different from day one — they rebuilt our entire PPC structure and listing strategy, gave us transparent reporting and weekly calls. ACoS dropped from 42% to 15%, and we finally hit page 1.",
    name: "David Muller",
    role: "Co-founder",
    context: "Outdoor & Sports · $320K/mo",
    photo: testimonialDavid,
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const pauseRef = useRef(false);
  const pendingRef = useRef<number | null>(null);

  const changeTo = useCallback((index: number) => {
    setFading(true);
    pendingRef.current = index;
    setTimeout(() => {
      setCurrent(index);
      setFading(false);
      pendingRef.current = null;
    }, 250);
  }, []);

  const handleNext = useCallback(() => {
    pauseRef.current = true;
    changeTo((current + 1) % testimonials.length);
    setTimeout(() => {
      pauseRef.current = false;
    }, 15000);
  }, [current, changeTo]);

  const handlePrev = useCallback(() => {
    pauseRef.current = true;
    changeTo((current - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => {
      pauseRef.current = false;
    }, 15000);
  }, [current, changeTo]);

  const handleDot = useCallback(
    (i: number) => {
      if (i === current) return;
      pauseRef.current = true;
      changeTo(i);
      setTimeout(() => {
        pauseRef.current = false;
      }, 15000);
    },
    [current, changeTo],
  );

  // Auto-advance at 12 seconds (T1 — was 6s, too fast to read)
  useEffect(() => {
    const timer = setInterval(() => {
      if (!pauseRef.current) {
        setCurrent((prev) => {
          setFading(true);
          const next = (prev + 1) % testimonials.length;
          setTimeout(() => setFading(false), 50);
          return next;
        });
      }
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[current];

  return (
    <section
      id="testimonials"
      className="relative py-20 lg:py-28 px-6"
      aria-labelledby="testimonials-heading"
    >
      <div className="absolute top-0 left-0 right-0 line-accent" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header — signals source-shift from agency to clients */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "200px" }}
          transition={{ duration: 0.7, ease: easeOutExpo }}
          className="text-center mb-16"
        >
          <span className="text-[11px] tracking-[0.2em] uppercase text-primary font-mono">
            Testimonials
          </span>
          <h2
            id="testimonials-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mt-4 leading-[1.05]"
          >
            Don&apos;t take{" "}
            <span className="italic text-gradient-primary font-medium">
              our word for it
            </span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="max-w-3xl mx-auto">
          <div
            className="relative overflow-hidden rounded-2xl bg-card border border-border p-8 md:p-12 lg:p-14 min-h-[340px]"
            onMouseEnter={() => {
              pauseRef.current = true;
            }}
            onMouseLeave={() => {
              pauseRef.current = false;
            }}
          >
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-primary/5 to-transparent blur-xl -z-10" />

            <div
              className="flex flex-col items-center text-center transition-opacity duration-300"
              style={{ opacity: fading ? 0 : 1 }}
            >
              <Quote
                className="w-10 h-10 text-primary/15 mb-6"
                aria-hidden="true"
              />

              <blockquote className="mt-2 text-foreground/90 font-body text-lg md:text-xl leading-[1.8] font-light max-w-2xl">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="mt-8 flex items-center gap-4">
                <img
                  src={t.photo}
                  alt=""
                  width={48}
                  height={48}
                  loading="lazy"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-border"
                />
                <div className="text-left">
                  <p className="font-body font-semibold text-sm text-foreground">
                    {t.name}
                  </p>
                  <p className="text-muted-foreground text-xs mt-0.5 font-body">
                    {t.role}
                  </p>
                  <p className="text-primary/70 text-[11px] font-mono tracking-wider mt-0.5">
                    {t.context}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleDot(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? "bg-primary w-6"
                      : "bg-muted-foreground/20 hover:bg-muted-foreground/40 w-2"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mid-page CTA — references witnesses by name */}
          <div className="mt-12 text-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-body font-semibold text-sm tracking-wide rounded-full transition-all duration-500 hover:shadow-[0_0_40px_-8px_hsl(265_85%_65%/0.5)] hover:scale-[1.03]"
            >
              Join Jason, Amara, and David — Book Your Free Audit
            </a>
            <p className="text-muted-foreground/50 font-body text-xs mt-3">
              See what we can do for your brand.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
