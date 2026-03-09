import { CheckIcon } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

const StepIndicator = ({ currentStep, totalSteps, labels }: StepIndicatorProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto mb-10">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, i) => {
          const step = i + 1;
          const isCompleted = step < currentStep;
          const isActive = step === currentStep;

          return (
            <div key={step} className="flex flex-col items-center flex-1">
              <div className="flex items-center w-full">
                {i > 0 && (
                  <div
                    className={`h-0.5 flex-1 transition-colors duration-300 ${
                      isCompleted ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 shrink-0 ${
                    isCompleted
                      ? "bg-primary text-primary-foreground"
                      : isActive
                      ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isCompleted ? <CheckIcon className="w-4 h-4" /> : step}
                </div>
                {i < totalSteps - 1 && (
                  <div
                    className={`h-0.5 flex-1 transition-colors duration-300 ${
                      isCompleted ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </div>
              <span
                className={`mt-2 text-xs font-medium hidden sm:block transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {labels[i]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
