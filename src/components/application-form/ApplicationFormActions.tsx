
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useApplicationForm } from "@/context/ApplicationFormContext";
import { ApplicationSections } from "@/types/user";
import { toast } from "@/hooks/use-toast";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ApplicationFormActions: React.FC = () => {
  const navigate = useNavigate();
  const { 
    activeTab, 
    handlePrevious, 
    handleNext, 
    sectionStatus,
    opportunityId,
    isSaving,
    setActiveTab,
    basicInfo,
    opportunity
  } = useApplicationForm();

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const isLastSection = activeTab === "references";

  const handleConfirmSubmit = () => {
    // Store the application details in localStorage to access on MyGrantsPage
    const submittedGrant = {
      id: `AU-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      project: basicInfo.studyTitle.value,
      amount: opportunity?.amount || "$75,000",
      startDate: new Date().toISOString(),
      endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
      status: "pending",
      submissionDate: new Date().toISOString()
    };
    
    // Store in localStorage
    const existingGrants = JSON.parse(localStorage.getItem('userGrants') || '[]');
    localStorage.setItem('userGrants', JSON.stringify([...existingGrants, submittedGrant]));
    
    // Close dialog
    setConfirmDialogOpen(false);
    
    // Display success toast
    toast({
      title: "Application Submitted Successfully",
      description: "Your grant application has been received. You will be notified of updates.",
      duration: 5000,
    });
    
    // Redirect to opportunities page after submission (on a short delay to allow toast to display)
    setTimeout(() => {
      navigate("/my-grants", { replace: true });
    }, 1500);
  };

  const handleSubmit = () => {
    // First mark the current section as complete
    handleNext();
    
    // Open confirmation dialog
    setConfirmDialogOpen(true);
  };

  const handleNextSection = () => {
    // Save the current tab status
    handleNext();

    // Navigate to the next tab based on the current active tab
    switch(activeTab) {
      case "basic":
        setActiveTab("objectives");
        break;
      case "objectives":
        setActiveTab("activities");
        break;
      case "activities":
        setActiveTab("outcomes");
        break;
      case "outcomes":
        setActiveTab("budget");
        break;
      case "budget":
        setActiveTab("students");
        break;
      case "students":
        setActiveTab("references");
        break;
      case "references":
        // This is handled by the submit function
        break;
      default:
        break;
    }
  };

  return (
    <>
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
          onClick={isLastSection ? handleSubmit : handleNextSection}
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

      <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Application Submission</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to submit your application for "{basicInfo.studyTitle.value}". 
              This action cannot be undone. Are you sure you want to proceed?
              
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <p><strong>Project Title:</strong> {basicInfo.studyTitle.value}</p>
                <p><strong>Principal Investigator:</strong> {basicInfo.piName.value}</p>
                <p><strong>College:</strong> {basicInfo.college.value}</p>
                <p><strong>Grant Category:</strong> {basicInfo.grantCategory.value}</p>
                <p><strong>Funding Source:</strong> {basicInfo.fundingSource.value}</p>
                <p><strong>Amount:</strong> {opportunity?.amount}</p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmSubmit}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Submit Application
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ApplicationFormActions;
