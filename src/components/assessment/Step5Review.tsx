import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import type { AssessmentData } from "@/hooks/useAssessmentStore";

interface Props {
  data: AssessmentData;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const ReviewRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col sm:flex-row sm:justify-between py-2">
    <span className="text-sm font-medium text-muted-foreground">{label}</span>
    <span className="text-sm text-foreground sm:text-right max-w-xs">
      {value || "—"}
    </span>
  </div>
);

const Step5Review = ({ data, onBack, onSubmit, isSubmitting }: Props) => {
  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h2 className="text-3xl font-serif mb-2">Review Your Answers</h2>
        <p className="text-muted-foreground">
          Please review everything before submitting.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-1">
          <h3 className="font-semibold text-sm uppercase tracking-wider text-primary mb-3">
            Basic Information
          </h3>
          <ReviewRow label="Name" value={data.name} />
          <ReviewRow label="Email" value={data.email} />
          <ReviewRow label="Age" value={data.age} />
          <ReviewRow label="School Level" value={data.schoolLevel} />

          <Separator className="my-4" />
          <h3 className="font-semibold text-sm uppercase tracking-wider text-primary mb-3">
            Academic Profile
          </h3>
          <ReviewRow
            label="Favorite Subjects"
            value={data.favoriteSubjects.join(", ")}
          />
          <ReviewRow
            label="Strongest Subjects"
            value={data.strongestSubjects.join(", ")}
          />
          <ReviewRow label="Grades" value={data.grades || "Not provided"} />

          <Separator className="my-4" />
          <h3 className="font-semibold text-sm uppercase tracking-wider text-primary mb-3">
            Interests & Personality
          </h3>
          <ReviewRow label="Hobbies" value={data.interests} />
          <ReviewRow label="Strengths" value={data.strengths} />
          <ReviewRow label="Work Preference" value={data.workPreference} />
          <ReviewRow
            label="Creative ↔ Analytical"
            value={`${data.creativeAnalyticalScale}% analytical`}
          />

          <Separator className="my-4" />
          <h3 className="font-semibold text-sm uppercase tracking-wider text-primary mb-3">
            Goals & Values
          </h3>
          <ReviewRow label="Dream Career" value={data.dreamCareer} />
          <ReviewRow
            label="Income Expectation"
            value={data.incomeExpectation}
          />
          <ReviewRow label="Impact Importance" value={data.impactImportance} />
        </CardContent>
      </Card>

      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={onBack} disabled={isSubmitting}>
          Back
        </Button>
        <Button onClick={onSubmit} size="lg" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Submitting... (Don't leave, this might take a while)
            </>
          ) : (
            "Submit Assessment"
          )}
        </Button>
      </div>
    </div>
  );
};

export default Step5Review;
