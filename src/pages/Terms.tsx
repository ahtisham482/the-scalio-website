import { useEffect } from "react";

const Terms = () => {
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
          Terms of Service
        </h1>
        <p className="text-muted-foreground font-body text-sm mb-12">
          Last updated: April 11, 2026
        </p>

        <div className="space-y-8 font-body text-muted-foreground leading-[1.9] text-sm">
          <section>
            <h2 className="text-xl font-display font-semibold text-foreground mb-3">
              1. Services
            </h2>
            <p>
              The Scalio provides Amazon FBA management services including but
              not limited to: product research, listing optimization, PPC
              management, supply chain logistics, and brand growth strategy. The
              specific scope of services will be outlined in an individual
              service agreement for each client.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-semibold text-foreground mb-3">
              2. Engagement Terms
            </h2>
            <p>
              All engagements begin with a free account audit. Paid services
              operate on a month-to-month basis unless otherwise agreed in
              writing. Either party may terminate the engagement with 30 days
              written notice. There are no long-term contracts or cancellation
              fees.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-semibold text-foreground mb-3">
              3. Payment Terms
            </h2>
            <p>
              Service fees are billed monthly in advance. Payment is due within
              7 days of invoice. We accept bank transfer and major credit cards.
              Ad spend budgets managed on your behalf are billed separately and
              are not included in management fees.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-semibold text-foreground mb-3">
              4. Confidentiality
            </h2>
            <p>
              Both parties agree to keep confidential all business information,
              strategies, data, and proprietary methods shared during the
              engagement. This obligation survives termination of services. We
              will never share your Amazon account data, sales figures, or
              business strategies with any third party.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-semibold text-foreground mb-3">
              5. Results Disclaimer
            </h2>
            <p>
              While we have a strong track record of delivering growth for our
              clients, we cannot guarantee specific revenue outcomes. Amazon
              marketplace results depend on many factors including product
              quality, market conditions, competition, and pricing. The case
              studies and metrics on our website represent typical results but
              are not guarantees of future performance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-semibold text-foreground mb-3">
              6. Account Access
            </h2>
            <p>
              To deliver our services, we require access to your Amazon Seller
              Central account. You retain full ownership of your account at all
              times. We will never make changes to your account without your
              knowledge, and we will remove our access immediately upon
              termination of services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-semibold text-foreground mb-3">
              7. Limitation of Liability
            </h2>
            <p>
              The Scalio's total liability for any claim arising from our
              services shall not exceed the total fees paid by the client in the
              three months preceding the claim. We are not liable for losses
              caused by Amazon policy changes, marketplace suspensions outside
              our control, or force majeure events.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-semibold text-foreground mb-3">
              8. Website Use
            </h2>
            <p>
              By using this website, you agree not to misuse our services,
              submit false information through our contact forms, or attempt to
              gain unauthorized access to our systems. All content on this
              website is owned by The Scalio and may not be reproduced without
              permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-semibold text-foreground mb-3">
              9. Contact
            </h2>
            <p>For questions about these terms, contact us at:</p>
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

export default Terms;
