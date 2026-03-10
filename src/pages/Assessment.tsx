import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAssessmentStore } from "@/hooks/useAssessmentStore";
import StepIndicator from "@/components/assessment/StepIndicator";
import Step1BasicInfo from "@/components/assessment/Step1BasicInfo";
import Step2AcademicProfile from "@/components/assessment/Step2AcademicProfile";
import Step3InterestsPersonality from "@/components/assessment/Step3InterestsPersonality";
import Step4GoalsValues from "@/components/assessment/Step4GoalsValues";
import Step5Review from "@/components/assessment/Step5Review";
import { toast } from "@/hooks/use-toast";
import ThemeToggle from "@/components/ThemeToggle";

const STEP_LABELS = ["Basics", "Academics", "Interests", "Goals", "Review"];

const Assessment = () => {
  const navigate = useNavigate();
  const { currentStep, setStep, data, updateData, reset } =
    useAssessmentStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://career-compass-backend-y6fl.onrender.com/api/career-submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Submission failed");
      }

      reset();
      navigate("/success");
    } catch (error: any) {
      toast({
        title: "Submission Failed",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-3xl py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="font-serif text-xl text-foreground hover:text-primary transition-colors"
          >
            PathFinder
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of 5
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container max-w-2xl py-10 px-4">
        <StepIndicator
          currentStep={currentStep}
          totalSteps={5}
          labels={STEP_LABELS}
        />

        {currentStep === 1 && (
          <Step1BasicInfo
            data={data}
            onUpdate={updateData}
            onNext={() => setStep(2)}
          />
        )}
        {currentStep === 2 && (
          <Step2AcademicProfile
            data={data}
            onUpdate={updateData}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}
        {currentStep === 3 && (
          <Step3InterestsPersonality
            data={data}
            onUpdate={updateData}
            onNext={() => setStep(4)}
            onBack={() => setStep(2)}
          />
        )}
        {currentStep === 4 && (
          <Step4GoalsValues
            data={data}
            onUpdate={updateData}
            onNext={() => setStep(5)}
            onBack={() => setStep(3)}
          />
        )}
        {currentStep === 5 && (
          <Step5Review
            data={data}
            onBack={() => setStep(4)}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </main>
    </div>
  );
};

export default Assessment;
