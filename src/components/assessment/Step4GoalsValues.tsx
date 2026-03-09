import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { AssessmentData } from "@/hooks/useAssessmentStore";

interface Props {
  data: AssessmentData;
  onUpdate: (partial: Partial<AssessmentData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step4GoalsValues = ({ data, onUpdate, onNext, onBack }: Props) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!data.dreamCareer.trim()) e.dreamCareer = "Share your dream career";
    if (!data.incomeExpectation) e.incomeExpectation = "Select an expectation";
    if (!data.impactImportance) e.impactImportance = "Tell us how important impact is";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h2 className="text-3xl font-serif mb-2">Goals & Values</h2>
        <p className="text-muted-foreground">What matters most to you in your future career?</p>
      </div>

      <div className="space-y-5">
        <div>
          <Label htmlFor="dreamCareer">Dream Career</Label>
          <Input id="dreamCareer" placeholder="What's your dream job or field?" value={data.dreamCareer} onChange={e => onUpdate({ dreamCareer: e.target.value })} className="mt-1.5" />
          {errors.dreamCareer && <p className="text-destructive text-sm mt-1">{errors.dreamCareer}</p>}
        </div>

        <div>
          <Label>Income Expectation</Label>
          <Select value={data.incomeExpectation} onValueChange={v => onUpdate({ incomeExpectation: v })}>
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="What's your income expectation?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="modest">Modest — enough to live comfortably</SelectItem>
              <SelectItem value="above-average">Above average salary</SelectItem>
              <SelectItem value="high">High income is a priority</SelectItem>
              <SelectItem value="not-important">Income isn't my main motivator</SelectItem>
            </SelectContent>
          </Select>
          {errors.incomeExpectation && <p className="text-destructive text-sm mt-1">{errors.incomeExpectation}</p>}
        </div>

        <div>
          <Label>How important is making an impact?</Label>
          <Select value={data.impactImportance} onValueChange={v => onUpdate({ impactImportance: v })}>
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="Select importance level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="very-important">Very important — I want to change the world</SelectItem>
              <SelectItem value="important">Important — I want to contribute meaningfully</SelectItem>
              <SelectItem value="somewhat">Somewhat important</SelectItem>
              <SelectItem value="not-priority">Not a priority for me</SelectItem>
            </SelectContent>
          </Select>
          {errors.impactImportance && <p className="text-destructive text-sm mt-1">{errors.impactImportance}</p>}
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={onBack}>Back</Button>
        <Button onClick={handleNext} size="lg">Continue to Review</Button>
      </div>
    </div>
  );
};

export default Step4GoalsValues;
