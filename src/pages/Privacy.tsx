import { useEffect } from "react";

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 left-0 right-0 z-50 glass glass-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
          <a
            href="/"
            className="font-display text-lg font-bold tracking-tight text-foreground"
          >
            The Scalio<span className="text-primary">.</span>
          </a>
          <a
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
          >
            Back to Home
          </a>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 pt-28 pb-20">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground font-body text-sm mb-12">
          Last updated: April 11, 2026
        </p>

        <div className="prose-custom space-y-8 font-body text-muted-foreground leading-[1.9] text-sm">
          <section>
            <h2 className="text-xl font-display font-semibold text-foreground mb-3">
              1. Information We Collect
            </h2>
            <p>
              When you use our website or contact us, we may collect the
              following information:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                <strong className="text-foreground">
                  Contact Information:
                </strong>{" "}
                Name, email address, company name, and monthly revenue range
                that you provide through our contact form.
              </li>
              <li>
                <strong className="text-foreground">Usage Data:</strong> Pages
                visited, time spent on site, browser type, and device
                information collected through analytics tools.
              </li>
              <li>
                <strong className="text-foreground">Cookies:</strong> We use
                essential cookies for site functionality. Analytics cookies are
                only used if you consent.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-display font-semibold text-foreground mb-3">
              2. How We Use Your Information
            </h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                Respond to your inquiries and provide the services you request.
              </li>
              <li>Schedule and conduct your free account audit.</li>
              <li>
                Send you relevant information about our services (only if you
                opt in).
              </li>
              <li>Improve our website and services based on usage patterns.</li>
            </ul>
            <p className="mt-2">
              We will never sell, rent, or share your personal information with
              third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-semibold text-foreground mb-3">
              3. Data Storage & Security
            </h2>
            <p>
              Your contact form submissions are stored securely using Supabase,
              a SOC 2 compliant database platform. We implement
              industry-standard security measures to protect your data,
              including encryption in transit (HTTPS) and at rest.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-semibold text-foreground mb-3">
              4. Your Rights
            </h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Request access to the personal data we hold about you.</li>
              <li>Request correction or deletion of your personal data.</li>
              <li>Withdraw consent for data processing at any time.</li>
              <li>Request a copy of your data in a portable format.</li>
            </ul>
            <p className="mt-2">
              To exercise any of these rights, contact us at
              hello@thescalio.com.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-semibold text-foreground mb-3">
              5. Third-Party Services
            </h2>
            <p>
              We may use the following third-party services that have their own
              privacy policies:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Google Analytics (website analytics)</li>
              <li>Supabase (data storage)</li>
              <li>Vercel (website hosting)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-display font-semibold text-foreground mb-3">
              6. Contact Us
            </h2>
            <p>
              If you have questions about this privacy policy or how we handle
              your data, please contact us at:
            </p>
            <p className="mt-2">
              <strong className="text-foreground">Email:</strong>{" "}
              hello@thescalio.com
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-border py-6 text-center">
        <p className="text-xs text-muted-foreground/60 font-body">
          &copy; {new Date().getFullYear()} The Scalio. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Privacy;
