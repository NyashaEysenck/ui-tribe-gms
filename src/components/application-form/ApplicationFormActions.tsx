
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useApplicationForm } from "@/context/ApplicationFormContext";
import { ApplicationSections } from "@/types/user";
import { toast } from "@/hooks/use-toast";

const ApplicationFormActions: React.FC = () => {
  const navigate = useNavigate();
  const { 
    activeTab, 
    handlePrevious, 
    handleNext, 
    sectionStatus,
    opportunityId,
    isSaving,
    setActiveTab
  } = useApplicationForm();

  const isLastSection = activeTab === "references";

  const handleSubmit = () => {
    // First mark the current section as complete
    handleNext();
    
    // Display success toast
    toast({
      title: "Application Submitted Successfully",
      description: "Your grant application has been received. You will be notified of updates.",
      duration: 5000,
    });
    
    // Redirect to opportunities page after submission
    setTimeout(() => {
      navigate("/opportunities");
    }, 1500);
  };

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
            <span>Click Next to complete this section</span>
          </div>
        )}
        {sectionStatus[activeTab as keyof ApplicationSections].isComplete && (
          <div className="flex items-center text-green-500 text-sm mr-4">
            <span>Section complete</span>
          </div>
        )}
      </div>
      
      <Button 
        type="button" 
        className="bg-red-600 hover:bg-red-700 flex items-center"
        onClick={isLastSection ? handleSubmit : handleNext}
        disabled={isSaving}
      >
        {isLastSection ? (
          isSaving ? "Submitting..." : "Submit Application"
        ) : (
          <>
            Next <ArrowRight className="ml-1 h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
};

export default ApplicationFormActions;
