
import React from "react";
import { ApplicationProgress } from "@/types/user";

interface ApplicationProgressBarProps {
  progress: ApplicationProgress;
}

const ApplicationProgressBar: React.FC<ApplicationProgressBarProps> = ({ progress }) => {
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
          className="bg-red-600 h-2.5 rounded-full transition-all duration-500" 
          style={{ width: `${progress.percentComplete}%` }}
        />
      </div>
    </div>
  );
};

export default ApplicationProgressBar;
