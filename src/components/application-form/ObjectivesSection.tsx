
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import ApplicationSectionHeader from "@/components/ApplicationSectionHeader";
import { useApplicationForm } from "@/context/ApplicationFormContext";
import { sectionHelpText } from "@/context/ApplicationFormContext";

const ObjectivesSection: React.FC = () => {
  const { 
    objectivesInfo, 
    handleObjectivesInfoChange, 
    renderFieldError,
    sectionStatus
  } = useApplicationForm();

  return (
    <div className="mt-6 border rounded-lg p-4 shadow-sm">
      <ApplicationSectionHeader 
        title="Research Objectives & Literature Review" 
        description="Define your research objectives and summarize relevant literature"
        isComplete={sectionStatus.objectives.isComplete}
        helpText={sectionHelpText.objectives}
      />
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Objectives (List up to 3 main objectives) <span className="text-red-600">*</span>
          </label>
          <Textarea 
            id="objectives"
            name="objectives"
            value={objectivesInfo.objectives.value}
            onChange={handleObjectivesInfoChange}
            placeholder="Enter your research objectives..."
            className={`w-full min-h-[120px] ${!objectivesInfo.objectives.isValid ? 'border-red-500' : ''}`}
          />
          {renderFieldError(objectivesInfo.objectives)}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Literature Review Summary <span className="text-red-600">*</span>
          </label>
          <Textarea 
            id="literatureReview"
            name="literatureReview"
            value={objectivesInfo.literatureReview.value}
            onChange={handleObjectivesInfoChange}
            placeholder="Summarize the relevant literature..."
            className={`w-full min-h-[200px] ${!objectivesInfo.literatureReview.isValid ? 'border-red-500' : ''}`}
          />
          <p className="text-xs text-gray-500 mt-1">Maximum 1000 words</p>
          {renderFieldError(objectivesInfo.literatureReview)}
        </div>
      </div>
    </div>
  );
};

export default ObjectivesSection;
