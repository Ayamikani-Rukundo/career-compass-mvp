import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";

const AssistantIntro = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-3xl py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="font-serif text-xl text-foreground hover:text-primary transition-colors"
            data-testid="link-home"
          >
            PathFinder
          </button>
          <ThemeToggle />
        </div>
      </header>

      <main className="container max-w-2xl py-20 px-4">
        <div className="space-y-8 text-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif mb-4 text-foreground">
              AI Task Coach
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Chat with your AI coach to manage overwhelming tasks, understand
              your work patterns, and prevent burnout. Built specifically for
              ADHD brains.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 space-y-4">
            <div className="space-y-3 text-left">
              <h2 className="text-xl font-semibold text-foreground">
                What we'll explore together:
              </h2>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    Your daily work patterns and when you're most productive
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Your biggest challenges with task management</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    How you currently track tasks and what works for you
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Signs of burnout and how to prevent them</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    Personalized strategies that work with the ADHD brain
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <Button
            onClick={() => navigate("/career-assistant")}
            size="lg"
            className="mx-auto"
            data-testid="button-start-chat"
          >
            Start Coaching Session →
          </Button>
        </div>
      </main>
    </div>
  );
};

export default AssistantIntro;
