import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AssessmentData } from "@/hooks/useAssessmentStore";

interface Props {
  data: AssessmentData;
  onUpdate: (partial: Partial<AssessmentData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step3InterestsPersonality = ({
  data,
  onUpdate,
  onNext,
  onBack,
}: Props) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};

    if (!data.interests?.trim()) e.interests = "Tell us about your interests";

    if (!data.strengths?.trim()) e.strengths = "Share your strengths";

    if (!data.workPreference) e.workPreference = "Select a preference";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h2 className="text-3xl font-serif mb-2">Interests & Personality</h2>
        <p className="text-muted-foreground">
          We want to understand what drives you beyond academics.
        </p>
      </div>

      <div className="space-y-5">
        {/* Interests */}
        <div>
          <Label htmlFor="interests">Interests</Label>
          <Textarea
            id="interests"
            placeholder="What do you enjoy doing in your free time?"
            value={data.interests}
            onChange={(e) => onUpdate({ interests: e.target.value })}
            className="mt-1.5"
            rows={3}
          />
          {errors.interests && (
            <p className="text-destructive text-sm mt-1">{errors.interests}</p>
          )}
        </div>

        {/* Strengths */}
        <div>
          <Label htmlFor="strengths">Your Key Strengths</Label>
          <Textarea
            id="strengths"
            placeholder="What are you naturally good at?"
            value={data.strengths}
            onChange={(e) => onUpdate({ strengths: e.target.value })}
            className="mt-1.5"
            rows={3}
          />
          {errors.strengths && (
            <p className="text-destructive text-sm mt-1">{errors.strengths}</p>
          )}
        </div>

        {/* Work Preference */}
        <div>
          <Label>Work Preference</Label>
          <Select
            value={data.workPreference}
            onValueChange={(v) => onUpdate({ workPreference: v })}
          >
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="How do you prefer to work?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="alone">I prefer working alone</SelectItem>
              <SelectItem value="small-team">
                Small team (2-5 people)
              </SelectItem>
              <SelectItem value="large-team">Large team environment</SelectItem>
              <SelectItem value="flexible">
                Flexible / depends on the task
              </SelectItem>
            </SelectContent>
          </Select>
          {errors.workPreference && (
            <p className="text-destructive text-sm mt-1">
              {errors.workPreference}
            </p>
          )}
        </div>

        {/* Creative vs Analytical */}
        <div>
          <Label>Creative vs Analytical Scale</Label>
          <div className="flex justify-between text-sm text-muted-foreground mt-1 mb-3">
            <span>Creative</span>
            <span>Analytical</span>
          </div>
          <Slider
            value={[data.creativeAnalyticalScale]}
            onValueChange={([v]) => onUpdate({ creativeAnalyticalScale: v })}
            max={100}
            step={1}
            className="mt-1"
          />
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleNext} size="lg">
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Step3InterestsPersonality;
