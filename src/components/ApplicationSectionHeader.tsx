
import React from "react";
import { AlertCircle, CheckCircle, HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ApplicationSectionHeaderProps {
  title: string;
  description: string;
  isComplete?: boolean;
  helpText?: string;
}

const ApplicationSectionHeader: React.FC<ApplicationSectionHeaderProps> = ({
  title,
  description,
  isComplete = false,
  helpText
}) => {
  return (
    <div className="mb-6 flex justify-between items-start">
      <div>
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-medium">{title}</h3>
          {isComplete ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <AlertCircle className="h-5 w-5 text-amber-500" />
          )}
        </div>
        <p className="text-gray-600 text-sm mt-1">{description}</p>
      </div>
      
      {helpText && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button aria-label="Help information">
                <HelpCircle className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="left" className="max-w-xs">
              {helpText}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default ApplicationSectionHeader;
