import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Compass,
  Target,
  Sparkles,
  Zap,
  Shield,
  Users,
  Trophy,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Nav */}
      <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container max-w-6xl py-4 flex items-center justify-between px-4">
          <div
            className="flex items-center gap-2 group cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="bg-primary rounded-lg p-1.5 group-hover:rotate-12 transition-transform">
              <Compass className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-serif text-2xl font-bold text-foreground tracking-tight">
              PathFinder
            </span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button
              variant="ghost"
              className="hidden md:flex"
              onClick={() => navigate("/assessment")}
            >
              Assessment
            </Button>
            <Button
              onClick={() => navigate("/assessment")}
              className="shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 lg:py-16 border-b border-border">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-primary/5 pointer-events-none" />

        <div className="container max-w-6xl relative z-10 px-4 mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col animate-in fade-in slide-in-from-left duration-1000">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 rounded-full px-4 py-1.5 text-sm font-semibold w-fit mb-8 shadow-sm">
                <Sparkles className="w-4 h-4 animate-pulse" />
                AI-Powered Guidance for 2026
              </div>
              <h1 className="text-4xl sm:text-5xl font-serif leading-[1.2] mb-6 font-bold text-foreground">
                Your future <br />
                <span className="text-primary italic text-3xl">
                  re-imagined.
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
                Stop guessing. Start growing. Use our dual-powered platform to
                discover career paths that align perfectly with your unique DNA
                through expert assessments or natural AI dialogue. At the same
                time, easily break down the tasks to do by using our advanced
                AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate("/assessment")}
                  className="h-12 px-6 text-base font-semibold gap-2 group shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
                >
                  Start Assessment
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/assistant")}
                  className="h-12 px-6 text-base font-semibold gap-2 border-2 hover:bg-primary/5 transition-all hover:scale-105 active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-primary" />
                  Try AI Coach
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground border-t border-border pt-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-bold"
                    >
                      U{i}
                    </div>
                  ))}
                </div>
                <p>
                  Joined by{" "}
                  <span className="text-foreground font-bold">10+</span>{" "}
                  ambitious students
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-right duration-1000">
              {[
                {
                  icon: Sparkles,
                  title: "AI Task Coach",
                  desc: "Natural conversation that learns your work patterns, breaks down tasks, and detects burnout—designed for both normal & ADHD brains.",
                  path: "/assistant",
                  color: "bg-purple-500/10 text-purple-500",
                  badge: "New",
                },
                {
                  icon: Target,
                  title: "Smart Matching",
                  desc: "Algorithm-backed results mapped to real-world industries and roles.",
                  color: "bg-blue-500/10 text-blue-500",
                },
                {
                  icon: Zap,
                  title: "Fast & Accurate",
                  desc: "Get comprehensive results in under 5 minutes of focused interaction.",
                  color: "bg-amber-500/10 text-amber-500",
                },
                {
                  icon: Shield,
                  title: "Data Driven",
                  desc: "Verified insights based on psychological and vocational frameworks.",
                  color: "bg-emerald-500/10 text-emerald-500",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  onClick={() => feature.path && navigate(feature.path)}
                  className={`group p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all cursor-pointer hover:shadow-lg hover:shadow-primary/5 relative overflow-hidden`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg ${feature.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-500`}
                  >
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold mb-2 flex items-center gap-2 text-foreground">
                    {feature.title}
                    {feature.badge && (
                      <span className="text-[9px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-full font-bold uppercase">
                        {feature.badge}
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-muted/30 border-b border-border">
        <div className="container max-w-6xl px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-3 text-foreground">
              Why students can love PathFinder
            </h2>
            <p className="text-muted-foreground">
              The ultimate platform for career discovery and planning.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Users, label: "Community Support", val: "24/7" },
              { icon: Trophy, label: "Success Rate", val: "90%" },
              { icon: Zap, label: "Avg. Insights", val: "7/user" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-card p-8 rounded-xl border border-border text-center hover:translate-y-[-2px] transition-transform"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-4 opacity-80" />
                <div className="text-3xl font-bold mb-2 text-foreground">
                  {stat.val}
                </div>
                <div className="text-muted-foreground font-medium uppercase tracking-wider text-xs">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t border-border mt-auto">
        <div className="container max-w-6xl px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <Compass className="w-5 h-5 text-primary" />
              <span className="font-serif text-xl font-bold text-foreground">
                PathFinder
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 PathFinder. Empowering the next generation of
              professionals.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">
                # Privacy
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                # Terms
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                # Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
