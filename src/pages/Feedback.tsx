import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Compass, Star, CheckCircle2, ChevronRight } from "lucide-react";
import { supabase, getUserId } from "@/lib/supabaseClient";
import ThemeToggle from "@/components/ThemeToggle";

type Step = "rating" | "questions" | "details" | "done";

const Feedback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const source = searchParams.get("from") || "general";

  const [step, setStep] = useState<Step>("rating");
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    overall_rating: 0,
    was_helpful: null as boolean | null,
    would_recommend: null as boolean | null,
    liked_most: "",
    improve: "",
    name: "",
    email: "",
    feature_used: source,
  });

  const handleStarClick = (star: number) => {
    setFormData((prev) => ({ ...prev, overall_rating: star }));
    setTimeout(() => setStep("questions"), 300);
  };

  const handleHelpful = (value: boolean) => {
    setFormData((prev) => ({ ...prev, was_helpful: value }));
  };

  const handleRecommend = (value: boolean) => {
    setFormData((prev) => ({ ...prev, would_recommend: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const userId = getUserId();
      const { error } = await supabase.from("feedback").insert({
        user_id: userId,
        feature_used: formData.feature_used,
        overall_rating: formData.overall_rating,
        was_helpful: formData.was_helpful,
        would_recommend: formData.would_recommend,
        liked_most: formData.liked_most || null,
        improve: formData.improve || null,
        name: formData.name || null,
        email: formData.email || null,
      });

      if (error) {
        console.warn("Supabase error (feedback):", error);
      }
    } catch (err) {
      console.warn("Submit error:", err);
    } finally {
      setIsSubmitting(false);
      setStep("done");
    }
  };

  const ratingLabels = ["", "Poor", "Fair", "Good", "Great", "Excellent"];

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container max-w-2xl py-3 flex items-center justify-between px-4">
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <div className="bg-primary rounded-lg p-1.5 group-hover:rotate-12 transition-transform">
              <Compass className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-serif text-xl font-bold text-foreground tracking-tight">
              PathFinder
            </span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">

          {/* Progress bar */}
          {step !== "done" && (
            <div className="mb-8">
              <div className="flex justify-between text-xs text-muted-foreground mb-2 font-medium">
                <span>Your Feedback</span>
                <span>
                  {step === "rating" ? "1" : step === "questions" ? "2" : "3"} of 3
                </span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{
                    width:
                      step === "rating"
                        ? "33%"
                        : step === "questions"
                        ? "66%"
                        : "100%",
                  }}
                />
              </div>
            </div>
          )}

          {/* STEP 1: Star Rating */}
          {step === "rating" && (
            <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-2 text-sm font-medium text-primary uppercase tracking-widest">
                Quick Feedback
              </div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
                How was your experience?
              </h1>
              <p className="text-muted-foreground mb-10 max-w-sm mx-auto">
                Your honest feedback helps us improve PathFinder for everyone.
                It only takes 60 seconds.
              </p>

              <div className="flex justify-center gap-3 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    data-testid={`star-rating-${star}`}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    onClick={() => handleStarClick(star)}
                    className="transition-all duration-150 hover:scale-125 active:scale-95 focus:outline-none"
                  >
                    <Star
                      className={`w-12 h-12 transition-colors duration-150 ${
                        (hoveredStar || formData.overall_rating) >= star
                          ? "text-amber-400 fill-amber-400"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  </button>
                ))}
              </div>

              {(hoveredStar || formData.overall_rating) > 0 && (
                <p className="text-sm font-semibold text-amber-500 animate-in fade-in duration-200">
                  {ratingLabels[hoveredStar || formData.overall_rating]}
                </p>
              )}

              <button
                onClick={() => navigate("/")}
                className="mt-10 text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
                data-testid="link-skip-feedback"
              >
                Skip for now
              </button>
            </div>
          )}

          {/* STEP 2: Yes/No Questions */}
          {step === "questions" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-1">
                A few quick questions
              </h2>
              <p className="text-muted-foreground text-sm mb-8">
                Tap your answer — takes 10 seconds.
              </p>

              <div className="space-y-6">
                {/* Was it helpful? */}
                <div className="bg-card border border-border rounded-2xl p-5">
                  <p className="font-semibold text-foreground mb-4">
                    Was PathFinder helpful for you?
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[true, false].map((val) => (
                      <button
                        key={String(val)}
                        data-testid={`btn-helpful-${val}`}
                        onClick={() => handleHelpful(val)}
                        className={`py-3 px-4 rounded-xl border-2 font-semibold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-95 ${
                          formData.was_helpful === val
                            ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                            : "border-border text-foreground hover:border-primary/40"
                        }`}
                      >
                        {val ? "👍 Yes, it was!" : "👎 Not really"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Would you recommend? */}
                <div className="bg-card border border-border rounded-2xl p-5">
                  <p className="font-semibold text-foreground mb-4">
                    Would you recommend PathFinder to others?
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[true, false].map((val) => (
                      <button
                        key={String(val)}
                        data-testid={`btn-recommend-${val}`}
                        onClick={() => handleRecommend(val)}
                        className={`py-3 px-4 rounded-xl border-2 font-semibold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-95 ${
                          formData.would_recommend === val
                            ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                            : "border-border text-foreground hover:border-primary/40"
                        }`}
                      >
                        {val ? "✅ Definitely!" : "❌ Probably not"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep("details")}
                disabled={
                  formData.was_helpful === null ||
                  formData.would_recommend === null
                }
                data-testid="btn-next-step"
                className="mt-6 w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 transition-all shadow-lg shadow-primary/20 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 3: Open-Ended + Optional Details */}
          {step === "details" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-1">
                Tell us more
              </h2>
              <p className="text-muted-foreground text-sm mb-8">
                Optional — but every word helps us build better.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-foreground mb-1.5 block">
                    What did you like most? ✨
                  </label>
                  <textarea
                    data-testid="input-liked-most"
                    value={formData.liked_most}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        liked_most: e.target.value,
                      }))
                    }
                    placeholder="e.g. The AI assistant was easy to use..."
                    rows={3}
                    className="w-full rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-foreground mb-1.5 block">
                    What should we improve? 🔧
                  </label>
                  <textarea
                    data-testid="input-improve"
                    value={formData.improve}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        improve: e.target.value,
                      }))
                    }
                    placeholder="e.g. I wish it could also..."
                    rows={3}
                    className="w-full rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                  />
                </div>

                <div className="bg-muted/50 rounded-2xl p-4 space-y-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                    Optional — Stay in touch
                  </p>
                  <input
                    data-testid="input-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="Your name (optional)"
                    className="w-full rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                  />
                  <input
                    data-testid="input-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    placeholder="Email address (optional)"
                    className="w-full rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                  />
                  <p className="text-xs text-muted-foreground">
                    We may reach out to learn more. We'll never spam you.
                  </p>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                data-testid="btn-submit-feedback"
                className="mt-6 w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 transition-all shadow-lg shadow-primary/20 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Submit Feedback 🚀"
                )}
              </button>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="mt-3 w-full text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
                data-testid="btn-skip-details"
              >
                Skip and submit without details
              </button>
            </div>
          )}

          {/* STEP 4: Done */}
          {step === "done" && (
            <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mx-auto w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
                Thank you! 🎉
              </h1>
              <p className="text-muted-foreground text-lg mb-2 max-w-sm mx-auto">
                Your feedback has been recorded. It means everything to us as we build PathFinder.
              </p>
              <p className="text-sm text-muted-foreground mb-10 max-w-xs mx-auto">
                You're helping shape a tool that will guide thousands of people toward their potential.
              </p>

              <button
                onClick={() => navigate("/")}
                data-testid="btn-back-home-done"
                className="w-full max-w-xs mx-auto py-3.5 bg-primary text-primary-foreground rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 transition-all shadow-lg shadow-primary/20"
              >
                Back to Home
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Feedback;
