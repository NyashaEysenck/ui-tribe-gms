
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useApplicationForm } from "@/context/ApplicationFormContext";
import { ApplicationSections } from "@/types/user";

const ApplicationFormActions: React.FC = () => {
  const navigate = useNavigate();
  const { activeTab, handlePrevious, handleNext, sectionStatus } = useApplicationForm();

  return (
    <div className="flex justify-between mt-8">
      {activeTab !== "basic" ? (
        <Button 
          type="button" 
          variant="outline" 
          onClick={handlePrevious}
          className="flex items-center"
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> Previous
        </Button>
      ) : (
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => navigate("/opportunities")}
          className="flex items-center"
        >
          Cancel
        </Button>
      )}
      
      {/* Section status indicator */}
      <div className="flex items-center">
        {!sectionStatus[activeTab as keyof ApplicationSections].isComplete && (
          <div className="flex items-center text-amber-500 text-sm mr-4">
            <AlertTriangle className="h-4 w-4 mr-1" />
            <span>Section incomplete</span>
          </div>
        )}
      </div>
      
      <Button 
        type="button" 
        className="bg-red-600 hover:bg-red-700 flex items-center"
        onClick={handleNext}
      >
        {activeTab === "references" ? "Submit Application" : (
          <>
            Next <ArrowRight className="ml-1 h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
};

export default ApplicationFormActions;
