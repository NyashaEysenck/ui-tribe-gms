
import React, { createContext, useState, useContext } from "react";
import { AlertCircle } from "lucide-react";
import { 
  ApplicationSections, 
  FormField, 
  ApplicationProgress,
  User
} from "@/types/user";
import { toast } from "@/hooks/use-toast";
import { 
  initialSections, 
  sectionHelpText,
  colleges, 
  grantCategories, 
  fundingSources 
} from "./constants";
import {
  initialBasicInfo,
  initialObjectivesInfo,
  initialActivitiesInfo,
  initialOutcomesInfo,
  initialBudgetInfo,
  initialStudentsInfo,
  initialReferencesInfo
} from "./initialData";
import { climateChangeData, healthcareData } from "./demoData";
import { ApplicationFormContextValue, ApplicationFormProviderProps } from "./types";
import {
  validateAllFields,
  createFieldChangeHandler,
  createSelectChangeHandler,
  renderFieldError,
  handleSaveProgress,
  handleSubmitApplication
} from "./formHandlers";

const ApplicationFormContext = createContext<ApplicationFormContextValue | undefined>(undefined);

export const ApplicationFormProvider: React.FC<ApplicationFormProviderProps> = ({ 
  children, 
  user, 
  opportunityId 
}) => {
  // Mock grant opportunity data - in a real app this would come from an API
  const opportunities = [
    {
      id: "1",
      title: "Climate Change Research Initiative",
      deadline: "June 30, 2025",
      description: "Research exploring innovative solutions to mitigate climate change effects in sub-Saharan Africa.",
      amount: "$75,000",
    },
    {
      id: "2",
      title: "Healthcare Innovation Fund",
      deadline: "July 15, 2025",
      description: "Supporting research in healthcare delivery systems and medical technology advancements.",
      amount: "$120,000",
    },
  ];

  const opportunity = opportunities.find(opp => opp.id === opportunityId);
  
  // State for each tab
  const [activeTab, setActiveTab] = useState("basic");
  const [isUserChangingTab, setIsUserChangingTab] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Get the appropriate demo data based on opportunity ID
  const demoData = opportunityId === "1" ? climateChangeData : healthcareData;
  
  // Form data for each section - initialized with demo data
  const [basicInfo, setBasicInfo] = useState({
    ...demoData.basic,
    piName: { ...demoData.basic.piName, value: user?.name || "" }
  });
  const [objectivesInfo, setObjectivesInfo] = useState(demoData.objectives);
  const [activitiesInfo, setActivitiesInfo] = useState(demoData.activities);
  const [outcomesInfo, setOutcomesInfo] = useState(demoData.outcomes);
  const [budgetInfo, setBudgetInfo] = useState(demoData.budget);
  const [studentsInfo, setStudentsInfo] = useState(demoData.students);
  const [referencesInfo, setReferencesInfo] = useState(demoData.references);

  // Application sections completion status
  const [sectionStatus, setSectionStatus] = useState<ApplicationSections>(initialSections);

  // Demo data prefill function (kept for compatibility but not used in UI)
  const prefillDemoData = () => {
    // Choose data based on the opportunity
    const demoData = opportunityId === "1" ? climateChangeData : healthcareData;
    
    // Update form state with demo data
    setBasicInfo({ 
      ...demoData.basic,
      piName: { ...demoData.basic.piName, value: user?.name || "" }
    });
    setObjectivesInfo(demoData.objectives);
    setActivitiesInfo(demoData.activities);
    setOutcomesInfo(demoData.outcomes);
    setBudgetInfo(demoData.budget);
    setStudentsInfo(demoData.students);
    setReferencesInfo(demoData.references);
  };

  // Progress calculation
  const calculateProgress = (): ApplicationProgress => {
    const sections = Object.values(sectionStatus);
    const completedSections = sections.filter(section => section.isComplete).length;
    const totalSections = sections.length;
    
    return {
      currentSection: activeTab,
      completedSections: completedSections,
      totalSections: totalSections,
      percentComplete: Math.round((completedSections / totalSections) * 100)
    };
  };
  
  // Section access control
  const canAccessSection = (section: string): boolean => {
    const sectionOrder = ["basic", "objectives", "activities", "outcomes", "budget", "students", "references"];
    const currentIndex = sectionOrder.indexOf(activeTab);
    const targetIndex = sectionOrder.indexOf(section);
    
    // Can always access current or previous sections
    if (targetIndex <= currentIndex) return true;
    
    // Can access next section if current section is complete
    if (targetIndex === currentIndex + 1) {
      return sectionStatus[activeTab as keyof ApplicationSections].isComplete;
    }
    
    // Cannot skip multiple sections ahead
    return false;
  };
  
  // Tab change handler
  const handleTabChange = (value: string) => {
    setIsUserChangingTab(true);
    setActiveTab(value);
    setIsUserChangingTab(false);
  };
  
  // Navigation handlers
  const handleNext = () => {
    const sectionOrder = ["basic", "objectives", "activities", "outcomes", "budget", "students", "references"];
    const currentIndex = sectionOrder.indexOf(activeTab);
    
    // Validate current section - always mark as valid for pre-filled data
    let isValid = true;
    
    switch (activeTab) {
      case "basic":
        isValid = true; // validateBasicInfo();
        break;
      case "objectives":
        isValid = true; // validateObjectives();
        break;
      case "activities":
        isValid = true; // validateActivities();
        break;
      case "outcomes":
        isValid = true; // validateOutcomes();
        break;
      case "budget":
        isValid = true; // validateBudget();
        break;
      case "students":
        isValid = true; // validateStudents();
        break;
      case "references":
        isValid = true; // validateReferences();
        break;
    }
    
    // Update section status - mark current section as complete
    setSectionStatus(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab as keyof ApplicationSections],
        isComplete: isValid,
        isValid: isValid
      }
    }));
    
    if (isValid && currentIndex < sectionOrder.length - 1) {
      // Move to next tab
      setActiveTab(sectionOrder[currentIndex + 1]);
    } else if (isValid && activeTab === "references") {
      // Submit the form
      handleSubmitApplication(setSectionStatus, setIsSaving);
    } else {
      // Show error for invalid section
      toast({
        title: "Section Incomplete",
        description: "Please complete all required fields before proceeding.",
        variant: "destructive",
      });
    }
  };
  
  const handlePrevious = () => {
    const sectionOrder = ["basic", "objectives", "activities", "outcomes", "budget", "students", "references"];
    const currentIndex = sectionOrder.indexOf(activeTab);
    
    if (currentIndex > 0) {
      setActiveTab(sectionOrder[currentIndex - 1]);
    }
  };
  
  // Validation functions
  const validateBasicInfo = () => validateAllFields(basicInfo);
  const validateObjectives = () => validateAllFields(objectivesInfo);
  const validateActivities = () => validateAllFields(activitiesInfo);
  const validateOutcomes = () => validateAllFields(outcomesInfo);
  const validateBudget = () => validateAllFields(budgetInfo);
  const validateStudents = () => validateAllFields(studentsInfo);
  const validateReferences = () => validateAllFields(referencesInfo);
  
  // Field change handlers
  const handleBasicInfoChange = createFieldChangeHandler(setBasicInfo);
  const handleObjectivesInfoChange = createFieldChangeHandler(setObjectivesInfo);
  const handleActivitiesInfoChange = createFieldChangeHandler(setActivitiesInfo);
  const handleOutcomesInfoChange = createFieldChangeHandler(setOutcomesInfo);
  const handleBudgetInfoChange = createFieldChangeHandler(setBudgetInfo);
  const handleStudentsInfoChange = createFieldChangeHandler(setStudentsInfo);
  const handleReferencesInfoChange = createFieldChangeHandler(setReferencesInfo);
  const handleSelectChange = createSelectChangeHandler(setBasicInfo);

  return (
    <ApplicationFormContext.Provider
      value={{
        activeTab,
        setActiveTab,
        sectionStatus,
        setSectionStatus,
        basicInfo,
        setBasicInfo,
        objectivesInfo,
        setObjectivesInfo,
        activitiesInfo,
        setActivitiesInfo,
        outcomesInfo,
        setOutcomesInfo,
        budgetInfo,
        setBudgetInfo,
        studentsInfo,
        setStudentsInfo,
        referencesInfo,
        setReferencesInfo,
        handleTabChange,
        handleNext,
        handlePrevious,
        handleSaveProgress: handleSaveProgress(setIsSaving),
        canAccessSection,
        calculateProgress,
        prefillDemoData,
        validateBasicInfo,
        validateObjectives,
        validateActivities,
        validateOutcomes,
        validateBudget,
        validateStudents,
        validateReferences,
        handleBasicInfoChange,
        handleObjectivesInfoChange,
        handleActivitiesInfoChange,
        handleOutcomesInfoChange,
        handleBudgetInfoChange,
        handleStudentsInfoChange,
        handleReferencesInfoChange,
        handleSelectChange,
        renderFieldError,
        isSaving,
        opportunityId,
        opportunity,
      }}
    >
      {children}
    </ApplicationFormContext.Provider>
  );
};

export const useApplicationForm = () => {
  const context = useContext(ApplicationFormContext);
  
  if (!context) {
    throw new Error("useApplicationForm must be used within an ApplicationFormProvider");
  }
  
  return context;
};
