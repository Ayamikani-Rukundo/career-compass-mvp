export interface AssessmentData {
  // Step 1: Basic Info
  name: string;
  email: string;
  age: string;
  schoolLevel: string;

  // Step 2: Academic Profile
  favoriteSubjects: string[];
  strongestSubjects: string[];
  grades: string;

  // Step 3: Interests & Personality
  interests: string;
  strengths: string;
  workPreference: string;
  creativeAnalyticalScale: number;

  // Step 4: Goals & Values
  dreamCareer: string;
  incomeExpectation: string;
  impactImportance: string;
}

interface AssessmentStore {
  currentStep: number;
  data: AssessmentData;
  setStep: (step: number) => void;
  updateData: (partial: Partial<AssessmentData>) => void;
  reset: () => void;
}

const initialData: AssessmentData = {
  name: "",
  email: "",
  age: "",
  schoolLevel: "",
  favoriteSubjects: [],
  strongestSubjects: [],
  grades: "",
  interests: "",
  strengths: "",
  workPreference: "",
  creativeAnalyticalScale: 50,
  dreamCareer: "",
  incomeExpectation: "",
  impactImportance: "",
};

// Simple zustand-like store using React context
import { useState, useCallback } from "react";

export function useAssessmentStore() {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<AssessmentData>(initialData);

  const updateData = useCallback((partial: Partial<AssessmentData>) => {
    setData((prev) => ({ ...prev, ...partial }));
  }, []);

  const reset = useCallback(() => {
    setData(initialData);
    setCurrentStep(1);
  }, []);

  return { currentStep, setStep: setCurrentStep, data, updateData, reset };
}
