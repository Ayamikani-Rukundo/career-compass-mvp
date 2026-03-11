import { useNavigate } from "react-router-dom";
import { CheckCircle2, MessageSquare } from "lucide-react";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="mx-auto w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
          <CheckCircle2 className="w-8 h-8 text-green-500" />
        </div>
        <h1 className="text-4xl font-serif font-bold mb-3">
          Assessment Submitted!
        </h1>
        <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
          Thank you for completing your career assessment. We'll analyze your
          responses and get back to you soon.
        </p>

        <div className="bg-card border border-border rounded-2xl p-6 mb-6 text-left">
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 rounded-full p-2 mt-0.5 flex-shrink-0">
              <MessageSquare className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">
                One quick thing before you go
              </p>
              <p className="text-sm text-muted-foreground">
                We're in early development and your feedback shapes everything
                we build next. It takes just 60 seconds.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate("/feedback?from=assessment")}
          data-testid="btn-give-feedback"
          className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-bold hover:scale-[1.01] active:scale-95 transition-all shadow-lg shadow-primary/20 mb-3"
        >
          Share My Feedback 💬
        </button>
        <button
          onClick={() => navigate("/")}
          data-testid="btn-skip-to-home"
          className="w-full py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
        >
          Skip — Go back to home
        </button>
      </div>
    </div>
  );
};

export default Success;
