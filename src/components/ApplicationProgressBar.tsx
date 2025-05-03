
import React from "react";
import { ApplicationProgress } from "@/types/user";
import { Progress } from "@/components/ui/progress";

interface ApplicationProgressBarProps {
  progress: ApplicationProgress;
}

const ApplicationProgressBar: React.FC<ApplicationProgressBarProps> = ({ progress }) => {
  // Function to determine color based on progress percentage
  const getProgressColor = (percent: number): string => {
    if (percent < 30) return "bg-red-500";
    if (percent < 60) return "bg-yellow-500";
    if (percent < 90) return "bg-blue-500";
    return "bg-green-500";
  };

  // Only render if we have valid progress data
  if (!progress) return null;

  const progressColor = getProgressColor(progress.percentComplete);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">
          Application Progress
        </span>
        <span className="text-sm text-gray-600">
          {progress.completedSections} of {progress.totalSections} sections complete ({Math.round(progress.percentComplete)}%)
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full transition-all duration-500 ${progressColor}`}
          style={{ width: `${progress.percentComplete}%` }}
        />
      </div>
    </div>
  );
};

export default ApplicationProgressBar;
