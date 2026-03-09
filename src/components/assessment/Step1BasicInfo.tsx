import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { AssessmentData } from "@/hooks/useAssessmentStore";

interface Props {
  data: AssessmentData;
  onUpdate: (partial: Partial<AssessmentData>) => void;
  onNext: () => void;
}

const Step1BasicInfo = ({ data, onUpdate, onNext }: Props) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!data.name.trim()) e.name = "Name is required";
    if (!data.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      e.email = "Invalid email";
    if (!data.age) e.age = "Age is required";
    else if (Number(data.age) < 10 || Number(data.age) > 100)
      e.age = "Enter a valid age";
    if (!data.schoolLevel) e.schoolLevel = "Please select your level";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h2 className="text-3xl font-serif mb-2">Tell us about yourself</h2>
        <p className="text-muted-foreground">
          Let's start with the basics so we can personalize your assessment.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="John Doe"
            value={data.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            className="mt-1.5"
          />
          {errors.name && (
            <p className="text-destructive text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={data.email}
            onChange={(e) => onUpdate({ email: e.target.value })}
            className="mt-1.5"
          />
          {errors.email && (
            <p className="text-destructive text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            placeholder="17"
            value={data.age}
            onChange={(e) => onUpdate({ age: e.target.value })}
            className="mt-1.5"
          />
          {errors.age && (
            <p className="text-destructive text-sm mt-1">{errors.age}</p>
          )}
        </div>

        <div>
          <Label>School Level</Label>
          <Select
            value={data.schoolLevel}
            onValueChange={(v) => onUpdate({ schoolLevel: v })}
          >
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="Select your level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="middle-school">Middle School</SelectItem>
              <SelectItem value="high-school">High School</SelectItem>
              <SelectItem value="undergraduate">Undergraduate</SelectItem>
              <SelectItem value="graduate">Graduate</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.schoolLevel && (
            <p className="text-destructive text-sm mt-1">
              {errors.schoolLevel}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={handleNext} size="lg">
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Step1BasicInfo;
