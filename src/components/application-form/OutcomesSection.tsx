
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import ApplicationSectionHeader from "@/components/ApplicationSectionHeader";
import { useApplicationForm } from "@/context/ApplicationFormContext";
import { sectionHelpText } from "@/context/ApplicationFormContext";

const OutcomesSection: React.FC = () => {
  const { 
    outcomesInfo, 
    handleOutcomesInfoChange, 
    renderFieldError,
    sectionStatus
  } = useApplicationForm();

  return (
    <div className="mt-6 border rounded-lg p-4 shadow-sm">
      <ApplicationSectionHeader 
        title="Expected Outcomes" 
        description="Describe anticipated research outcomes and their significance"
        isComplete={sectionStatus.outcomes.isComplete}
        helpText={sectionHelpText.outcomes}
      />
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Research Outcomes <span className="text-red-600">*</span>
          </label>
          <Textarea 
            id="researchOutcomes"
            name="researchOutcomes"
            value={outcomesInfo.researchOutcomes.value}
            onChange={handleOutcomesInfoChange}
            placeholder="Describe expected research outcomes..."
            className={`w-full min-h-[150px] ${!outcomesInfo.researchOutcomes.isValid ? 'border-red-500' : ''}`}
          />
          {renderFieldError(outcomesInfo.researchOutcomes)}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Impact and Significance <span className="text-red-600">*</span>
          </label>
          <Textarea 
            id="impact"
            name="impact"
            value={outcomesInfo.impact.value}
            onChange={handleOutcomesInfoChange}
            placeholder="Explain the impact and significance of this research..."
            className={`w-full min-h-[150px] ${!outcomesInfo.impact.isValid ? 'border-red-500' : ''}`}
          />
          {renderFieldError(outcomesInfo.impact)}
        </div>
      </div>
    </div>
  );
};

export default OutcomesSection;
