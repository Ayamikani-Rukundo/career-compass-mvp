import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { AssessmentData } from "@/hooks/useAssessmentStore";

const SUBJECTS = [
  "Mathematics", "Physics", "Chemistry", "Biology", "English",
  "History", "Geography", "Computer Science", "Art", "Music",
  "Economics", "Psychology", "Philosophy", "Physical Education",
];

interface Props {
  data: AssessmentData;
  onUpdate: (partial: Partial<AssessmentData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const toggleSubject = (list: string[], subject: string) =>
  list.includes(subject) ? list.filter(s => s !== subject) : [...list, subject];

const Step2AcademicProfile = ({ data, onUpdate, onNext, onBack }: Props) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (data.favoriteSubjects.length === 0) e.favoriteSubjects = "Select at least one favorite subject";
    if (data.strongestSubjects.length === 0) e.strongestSubjects = "Select at least one strongest subject";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h2 className="text-3xl font-serif mb-2">Your Academic Profile</h2>
        <p className="text-muted-foreground">Help us understand your academic interests and strengths.</p>
      </div>

      <div className="space-y-5">
        <div>
          <Label>Favorite Subjects</Label>
          <p className="text-sm text-muted-foreground mb-2">Select all that apply</p>
          <div className="flex flex-wrap gap-2">
            {SUBJECTS.map(s => (
              <Badge
                key={s}
                variant={data.favoriteSubjects.includes(s) ? "default" : "outline"}
                className="cursor-pointer transition-all hover:scale-105 py-1.5 px-3"
                onClick={() => onUpdate({ favoriteSubjects: toggleSubject(data.favoriteSubjects, s) })}
              >
                {s}
              </Badge>
            ))}
          </div>
          {errors.favoriteSubjects && <p className="text-destructive text-sm mt-1">{errors.favoriteSubjects}</p>}
        </div>

        <div>
          <Label>Strongest Subjects</Label>
          <p className="text-sm text-muted-foreground mb-2">Where do you perform best?</p>
          <div className="flex flex-wrap gap-2">
            {SUBJECTS.map(s => (
              <Badge
                key={s}
                variant={data.strongestSubjects.includes(s) ? "default" : "outline"}
                className="cursor-pointer transition-all hover:scale-105 py-1.5 px-3"
                onClick={() => onUpdate({ strongestSubjects: toggleSubject(data.strongestSubjects, s) })}
              >
                {s}
              </Badge>
            ))}
          </div>
          {errors.strongestSubjects && <p className="text-destructive text-sm mt-1">{errors.strongestSubjects}</p>}
        </div>

        <div>
          <Label htmlFor="grades">Current GPA / Grades (optional)</Label>
          <Input id="grades" placeholder="e.g. 3.5 GPA or A/B average" value={data.grades} onChange={e => onUpdate({ grades: e.target.value })} className="mt-1.5" />
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={onBack}>Back</Button>
        <Button onClick={handleNext} size="lg">Continue</Button>
      </div>
    </div>
  );
};

export default Step2AcademicProfile;
