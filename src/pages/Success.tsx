import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md animate-fade-in">
        <div className="mx-auto w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-6">
          <CheckCircle2 className="w-8 h-8 text-success" />
        </div>
        <h1 className="text-4xl font-serif mb-3">Assessment Submitted!</h1>
        <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
          Thank you for completing your career assessment. We'll analyze your responses and get back to you soon.
        </p>
        <Button onClick={() => navigate("/")} variant="outline" size="lg">
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default Success;
