
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import ApplicationSectionHeader from "@/components/ApplicationSectionHeader";
import { useApplicationForm } from "@/context/ApplicationFormContext";
import { sectionHelpText } from "@/context/ApplicationFormContext";

const ReferencesSection: React.FC = () => {
  const { 
    referencesInfo, 
    handleReferencesInfoChange, 
    renderFieldError,
    sectionStatus
  } = useApplicationForm();

  return (
    <div className="mt-6 border rounded-lg p-4 shadow-sm">
      <ApplicationSectionHeader 
        title="References" 
        description="List all references using APA format"
        isComplete={sectionStatus.references.isComplete}
        helpText={sectionHelpText.references}
      />
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bibliography <span className="text-red-600">*</span>
          </label>
          <Textarea 
            id="bibliography"
            name="bibliography"
            value={referencesInfo.bibliography.value}
            onChange={handleReferencesInfoChange}
            placeholder="List all references in APA format..."
            className={`w-full min-h-[300px] ${!referencesInfo.bibliography.isValid ? 'border-red-500' : ''}`}
          />
          {renderFieldError(referencesInfo.bibliography)}
        </div>
      </div>
    </div>
  );
};

export default ReferencesSection;
