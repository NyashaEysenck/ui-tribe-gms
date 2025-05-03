
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import ApplicationSectionHeader from "@/components/ApplicationSectionHeader";
import { useApplicationForm, sectionHelpText } from "@/context/application-form";

const ActivitiesSection: React.FC = () => {
  const { 
    activitiesInfo, 
    handleActivitiesInfoChange, 
    renderFieldError,
    sectionStatus
  } = useApplicationForm();

  return (
    <div className="mt-6 border rounded-lg p-4 shadow-sm">
      <ApplicationSectionHeader 
        title="Research Activities" 
        description="Describe your methodology and project timeline"
        isComplete={sectionStatus.activities.isComplete}
        helpText={sectionHelpText.activities}
      />
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Methodology <span className="text-red-600">*</span>
          </label>
          <Textarea 
            id="methodology"
            name="methodology"
            value={activitiesInfo.methodology.value}
            onChange={handleActivitiesInfoChange}
            placeholder="Describe your research methodology..."
            className={`w-full min-h-[150px] ${!activitiesInfo.methodology.isValid ? 'border-red-500' : ''}`}
          />
          {renderFieldError(activitiesInfo.methodology)}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Timeline of Activities <span className="text-red-600">*</span>
          </label>
          <Textarea 
            id="timeline"
            name="timeline"
            value={activitiesInfo.timeline.value}
            onChange={handleActivitiesInfoChange}
            placeholder="Outline your project timeline..."
            className={`w-full min-h-[150px] ${!activitiesInfo.timeline.isValid ? 'border-red-500' : ''}`}
          />
          {renderFieldError(activitiesInfo.timeline)}
        </div>
      </div>
    </div>
  );
};

export default ActivitiesSection;
