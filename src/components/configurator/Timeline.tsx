import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineProps {
  steps: string[];
  currentStep: number;
  completedSteps: number[];
}

export const Timeline = ({ steps, currentStep, completedSteps }: TimelineProps) => {
  return (
    <div className="flex items-center justify-center w-full py-8 px-4 bg-gradient-subtle border-b">
      <div className="flex items-center justify-between max-w-6xl w-full">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-smooth",
                  index < currentStep || completedSteps.includes(index)
                    ? "bg-primary border-primary text-primary-foreground"
                    : index === currentStep
                    ? "bg-success border-success text-success-foreground"
                    : "bg-background border-border text-muted-foreground"
                )}
              >
                {completedSteps.includes(index) ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              <span className="text-xs font-medium mt-2 text-center max-w-20">
                {step}
              </span>
            </div>

            {/* Connection Line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "w-16 h-0.5 mx-4 transition-smooth",
                  index < currentStep || completedSteps.includes(index)
                    ? "bg-primary"
                    : "bg-border"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};