import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <nav className="fixed top-0 left-0 right-0 z-50 glass glass-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
          <a
            href="/"
            className="font-display text-lg font-bold tracking-tight text-foreground"
          >
            The Scalio<span className="text-primary">.</span>
          </a>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <span className="text-8xl md:text-9xl font-display font-bold text-primary/20">
            404
          </span>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-4 mb-3">
            Page not found
          </h1>
          <p className="text-muted-foreground font-body text-sm leading-relaxed mb-8">
            The page you're looking for doesn't exist or has been moved. Let's
            get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-body font-semibold text-sm rounded-full transition-all duration-300 hover:shadow-[0_0_30px_-6px_hsl(var(--primary)/0.4)] hover:scale-[1.02]"
            >
              Back to Home
            </a>
            <a
              href="/#contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-border text-foreground font-body font-medium text-sm rounded-full transition-all duration-300 hover:border-primary/30"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      <footer className="border-t border-border py-6 text-center">
        <p className="text-xs text-muted-foreground/60 font-body">
          &copy; {new Date().getFullYear()} The Scalio. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default NotFound;
