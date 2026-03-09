import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Compass, Target, Sparkles } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Nav */}
      <header className="container max-w-5xl py-6 flex items-center justify-between">
        <span className="font-serif text-2xl text-foreground">PathFinder</span>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" onClick={() => navigate("/assessment")}>
            Start Assessment
          </Button>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center">
        <div className="container max-w-5xl grid lg:grid-cols-2 gap-12 py-16 px-4">
          <div className="flex flex-col justify-center animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium w-fit mb-6">
              <Sparkles className="w-4 h-4" />
              Free Career Assessment
            </div>
            <h1 className="text-5xl sm:text-6xl font-serif leading-tight mb-6">
              Discover your <br />
              <span className="text-gradient">ideal career</span> path
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mb-8 leading-relaxed">
              Answer a few thoughtful questions about your interests, strengths, and goals. 
              Get clarity on the direction that fits you best.
            </p>
            <div className="flex gap-4">
              <Button size="lg" onClick={() => navigate("/assessment")} className="gap-2">
                Start Assessment
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Feature cards */}
          <div className="flex flex-col gap-4 justify-center animate-slide-in">
            {[
              { icon: Compass, title: "Personalized Insights", desc: "Based on your unique combination of interests and strengths" },
              { icon: Target, title: "Goal Alignment", desc: "Match your values and aspirations with real career paths" },
              { icon: Sparkles, title: "5-Minute Assessment", desc: "Quick, thoughtful questions designed by career experts" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-card border border-border rounded-lg p-5 flex gap-4 items-start hover:border-primary/30 transition-colors">
                <div className="bg-primary/10 rounded-lg p-2.5 shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="container max-w-5xl text-center text-sm text-muted-foreground">
          Built to help you find your way.
        </div>
      </footer>
    </div>
  );
};

export default Index;
