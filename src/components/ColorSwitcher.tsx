import { useState, useEffect } from "react";
import { Palette, Check, X } from "lucide-react";

type Theme = {
  key: string;
  label: string;
  sublabel: string;
  swatch: string;
  primary: string;
  primaryLight: string;
  accent: string;
};

const THEMES: Theme[] = [
  {
    key: "purple",
    label: "Purple",
    sublabel: "Original",
    swatch: "#A855F7",
    primary: "265 85% 65%",
    primaryLight: "265 85% 75%",
    accent: "310 70% 60%",
  },
  {
    key: "green",
    label: "Emerald",
    sublabel: "Growth",
    swatch: "#10B981",
    primary: "158 64% 52%",
    primaryLight: "158 64% 65%",
    accent: "173 58% 49%",
  },
  {
    key: "blue",
    label: "Electric Blue",
    sublabel: "Trust",
    swatch: "#3B82F6",
    primary: "217 91% 60%",
    primaryLight: "217 91% 72%",
    accent: "239 84% 67%",
  },
  {
    key: "coral",
    label: "Coral",
    sublabel: "Energy",
    swatch: "#F97316",
    primary: "20 90% 60%",
    primaryLight: "20 90% 72%",
    accent: "340 82% 62%",
  },
];

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.style.setProperty("--primary", theme.primary);
  root.style.setProperty("--primary-light", theme.primaryLight);
  root.style.setProperty("--accent", theme.accent);
  root.style.setProperty("--ring", theme.primary);
  root.style.setProperty("--color-accent-glow", theme.primary);
  root.style.setProperty("--color-accent-2", theme.accent);
  root.style.setProperty("--sidebar-primary", theme.primary);
  root.style.setProperty("--sidebar-ring", theme.primary);
}

const STORAGE_KEY = "scalio-color-theme";

const ColorSwitcher = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("purple");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) || "purple";
    const theme = THEMES.find((t) => t.key === saved) || THEMES[0];
    applyTheme(theme);
    setActive(theme.key);
  }, []);

  const handleSelect = (theme: Theme) => {
    applyTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme.key);
    setActive(theme.key);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-body">
      {open ? (
        <div className="bg-card/95 backdrop-blur-xl border border-border rounded-2xl p-5 w-72 shadow-2xl">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-display font-semibold text-foreground">
                Preview colors
              </p>
              <p className="text-[10px] text-muted-foreground font-mono tracking-[0.15em] uppercase mt-0.5">
                Click to switch
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-7 h-7 rounded-full bg-secondary hover:bg-secondary/70 flex items-center justify-center transition-colors"
              aria-label="Close color switcher"
            >
              <X className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {THEMES.map((theme) => {
              const isActive = active === theme.key;
              return (
                <button
                  key={theme.key}
                  onClick={() => handleSelect(theme)}
                  className={`relative p-3 rounded-xl border transition-all duration-300 ${
                    isActive
                      ? "border-primary bg-primary/5 scale-[1.02]"
                      : "border-border hover:border-foreground/20 bg-background/40"
                  }`}
                  aria-pressed={isActive}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="w-10 h-10 rounded-full shadow-lg relative ring-2 ring-white/10"
                      style={{ backgroundColor: theme.swatch }}
                    >
                      {isActive && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Check
                            className="w-5 h-5 text-white drop-shadow-lg"
                            strokeWidth={3}
                          />
                        </div>
                      )}
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-body font-semibold text-foreground leading-tight">
                        {theme.label}
                      </p>
                      <p className="text-[9px] text-muted-foreground font-mono tracking-[0.1em] uppercase mt-0.5">
                        {theme.sublabel}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-border/50">
            <p className="text-[10px] text-muted-foreground/70 text-center font-body leading-relaxed">
              Preview only. Your choice saves in this browser.
            </p>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="group relative w-14 h-14 rounded-full bg-card/90 backdrop-blur-xl border border-border shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center"
          aria-label="Open color switcher"
        >
          <Palette className="w-5 h-5 text-primary transition-transform duration-300 group-hover:rotate-[20deg]" />
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-primary">
            <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
          </span>
        </button>
      )}
    </div>
  );
};

export default ColorSwitcher;
