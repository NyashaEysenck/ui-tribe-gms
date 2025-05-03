
import React from "react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useApplicationForm } from "@/context/ApplicationFormContext";
import ApplicationProgressBar from "@/components/ApplicationProgressBar";

const ApplicationFormHeader: React.FC = () => {
  const { opportunity, handleSaveProgress, isSaving, applicationProgress } = useApplicationForm();

  return (
    <div className="mb-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-2xl font-bold">AU Grant Application Form</h1>
          <p className="text-gray-600">
            Applying for: <span className="font-medium">{opportunity?.title}</span> - <span className="text-red-600">{opportunity?.amount}</span>
          </p>
          <p className="text-sm text-gray-500">Deadline: {opportunity?.deadline}</p>
        </div>
        <Button 
          onClick={handleSaveProgress} 
          variant="outline"
          disabled={isSaving}
          className="flex items-center space-x-1"
        >
          {isSaving ? (
            <>Saving...</>
          ) : (
            <>
              <Save className="h-4 w-4 mr-1" />
              Save Progress
            </>
          )}
        </Button>
      </div>
      
      {/* Single progress bar */}
      {applicationProgress && (
        <ApplicationProgressBar progress={applicationProgress} />
      )}
    </div>
  );
};

export default ApplicationFormHeader;
