
import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { 
  ApplicationSections, 
  FormField, 
  ApplicationProgress,
  User
} from "@/types/user";

// Initial section status
const initialSectionStatus = {
  isComplete: false,
  isValid: false,
  errorMessage: "",
};

// Initial application sections state
const initialSections: ApplicationSections = {
  basic: initialSectionStatus,
  objectives: initialSectionStatus,
  activities: initialSectionStatus,
  outcomes: initialSectionStatus,
  budget: initialSectionStatus,
  students: initialSectionStatus,
  references: initialSectionStatus,
};

// Colleges
export const colleges = [
  "College of Business",
  "College of Health Sciences",
  "College of Engineering",
  "College of Social Sciences",
  "College of Agriculture",
  "Computer Science",
];

// Grant categories
export const grantCategories = [
  "Research",
  "Innovation",
  "Community Outreach",
  "Education",
  "Healthcare",
  "Technology",
];

// Funding sources
export const fundingSources = [
  "Internal",
  "External - Government",
  "External - Private",
  "External - NGO",
  "Corporate",
];

// Section help text
export const sectionHelpText = {
  basic: "This section collects essential information about your research project, including the title, PI details, and a brief statement of purpose.",
  objectives: "Clearly state your research objectives and provide a concise literature review to establish context for your work.",
  activities: "Describe your research methodology and timeline for completing project activities.",
  outcomes: "Explain the expected outcomes of your research and their significance.",
  budget: "Provide a detailed budget breakdown and justify all expenses.",
  students: "Describe how students will be involved in the research and what skills they will develop.",
  references: "List all references in APA format."
};

// Initial form data
export const initialBasicInfo = {
  studyTitle: { value: "", isRequired: true, isValid: true, errorMessage: "" },
  piName: { value: "", isRequired: true, isValid: true, errorMessage: "" },
  college: { value: "", isRequired: true, isValid: true, errorMessage: "" },
  year: { value: "2025", isRequired: true, isValid: true, errorMessage: "" },
  grantCategory: { value: "Research", isRequired: true, isValid: true, errorMessage: "" },
  fundingSource: { value: "Internal", isRequired: true, isValid: true, errorMessage: "" },
  statementOfPurpose: { value: "", isRequired: true, isValid: true, errorMessage: "" },
  background: { value: "", isRequired: true, isValid: true, errorMessage: "" },
};

export const initialObjectivesInfo = {
  objectives: { value: "", isRequired: true, isValid: true, errorMessage: "" },
  literatureReview: { value: "", isRequired: true, isValid: true, errorMessage: "" },
};

export const initialActivitiesInfo = {
  methodology: { value: "", isRequired: true, isValid: true, errorMessage: "" },
  timeline: { value: "", isRequired: true, isValid: true, errorMessage: "" },
};

export const initialOutcomesInfo = {
  researchOutcomes: { value: "", isRequired: true, isValid: true, errorMessage: "" },
  impact: { value: "", isRequired: true, isValid: true, errorMessage: "" },
};

export const initialBudgetInfo = {
  budgetSummary: { value: "", isRequired: true, isValid: true, errorMessage: "" },
  budgetJustification: { value: "", isRequired: true, isValid: true, errorMessage: "" },
};

export const initialStudentsInfo = {
  studentInvolvement: { value: "", isRequired: true, isValid: true, errorMessage: "" },
  studentLearningOutcomes: { value: "", isRequired: true, isValid: true, errorMessage: "" },
};

export const initialReferencesInfo = {
  bibliography: { value: "", isRequired: true, isValid: true, errorMessage: "" },
};

interface ApplicationFormContextValue {
  // Tab state
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  
  // Section statuses
  sectionStatus: ApplicationSections;
  setSectionStatus: React.Dispatch<React.SetStateAction<ApplicationSections>>;
  
  // Form data
  basicInfo: typeof initialBasicInfo;
  setBasicInfo: React.Dispatch<React.SetStateAction<typeof initialBasicInfo>>;
  objectivesInfo: typeof initialObjectivesInfo;
  setObjectivesInfo: React.Dispatch<React.SetStateAction<typeof initialObjectivesInfo>>;
  activitiesInfo: typeof initialActivitiesInfo;
  setActivitiesInfo: React.Dispatch<React.SetStateAction<typeof initialActivitiesInfo>>;
  outcomesInfo: typeof initialOutcomesInfo;
  setOutcomesInfo: React.Dispatch<React.SetStateAction<typeof initialOutcomesInfo>>;
  budgetInfo: typeof initialBudgetInfo;
  setBudgetInfo: React.Dispatch<React.SetStateAction<typeof initialBudgetInfo>>;
  studentsInfo: typeof initialStudentsInfo;
  setStudentsInfo: React.Dispatch<React.SetStateAction<typeof initialStudentsInfo>>;
  referencesInfo: typeof initialReferencesInfo;
  setReferencesInfo: React.Dispatch<React.SetStateAction<typeof initialReferencesInfo>>;
  
  // Helper functions
  handleTabChange: (value: string) => void;
  handleNext: () => void;
  handlePrevious: () => void;
  handleSaveProgress: () => void;
  canAccessSection: (section: string) => boolean;
  calculateProgress: () => ApplicationProgress;
  
  // Validation functions
  validateBasicInfo: () => boolean;
  validateObjectives: () => boolean;
  validateActivities: () => boolean;
  validateOutcomes: () => boolean;
  validateBudget: () => boolean;
  validateStudents: () => boolean;
  validateReferences: () => boolean;
  
  // Field change handlers
  handleBasicInfoChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleObjectivesInfoChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleActivitiesInfoChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleOutcomesInfoChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleBudgetInfoChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleStudentsInfoChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleReferencesInfoChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  
  // UI helpers
  renderFieldError: (field: FormField) => React.ReactNode;
  
  // State flags
  isSaving: boolean;
  opportunityId?: string;
  opportunity: any;
}

const ApplicationFormContext = createContext<ApplicationFormContextValue | undefined>(undefined);

export const ApplicationFormProvider: React.FC<{
  children: React.ReactNode;
  user: User | null;
  opportunityId?: string;
}> = ({ children, user, opportunityId }) => {
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
  
  // Form data for each section
  const [basicInfo, setBasicInfo] = useState({
    ...initialBasicInfo, 
    piName: { ...initialBasicInfo.piName, value: user?.name || "" }
  });
  const [objectivesInfo, setObjectivesInfo] = useState(initialObjectivesInfo);
  const [activitiesInfo, setActivitiesInfo] = useState(initialActivitiesInfo);
  const [outcomesInfo, setOutcomesInfo] = useState(initialOutcomesInfo);
  const [budgetInfo, setBudgetInfo] = useState(initialBudgetInfo);
  const [studentsInfo, setStudentsInfo] = useState(initialStudentsInfo);
  const [referencesInfo, setReferencesInfo] = useState(initialReferencesInfo);

  // Application sections completion status
  const [sectionStatus, setSectionStatus] = useState<ApplicationSections>(initialSections);

  // Progress calculation
  const calculateProgress = (): ApplicationProgress => {
    const sections = Object.values(sectionStatus);
    const completedSections = sections.filter(section => section.isComplete).length;
    return {
      currentSection: activeTab,
      completedSections: completedSections,
      totalSections: sections.length,
      percentComplete: (completedSections / sections.length) * 100
    };
  };

  // Auto-save functionality
  const autoSave = () => {
    setIsSaving(true);
    
    // Simulate saving to server
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Progress saved",
        description: "Your application progress has been saved",
      });
    }, 1000);
  };

  // Validate basic info section
  const validateBasicInfo = () => {
    let isValid = true;
    let updatedBasicInfo = { ...basicInfo };
    
    // Validate study title
    if (!basicInfo.studyTitle.value.trim()) {
      updatedBasicInfo.studyTitle = {
        ...basicInfo.studyTitle,
        isValid: false,
        errorMessage: "Study title is required"
      };
      isValid = false;
    }
    
    // Validate PI Name
    if (!basicInfo.piName.value.trim()) {
      updatedBasicInfo.piName = {
        ...basicInfo.piName,
        isValid: false,
        errorMessage: "PI name is required"
      };
      isValid = false;
    }
    
    // Validate college
    if (!basicInfo.college.value) {
      updatedBasicInfo.college = {
        ...basicInfo.college,
        isValid: false,
        errorMessage: "College is required"
      };
      isValid = false;
    }
    
    // Validate statement of purpose
    if (!basicInfo.statementOfPurpose.value.trim()) {
      updatedBasicInfo.statementOfPurpose = {
        ...basicInfo.statementOfPurpose,
        isValid: false,
        errorMessage: "Statement of purpose is required"
      };
      isValid = false;
    }
    
    // Validate background
    if (!basicInfo.background.value.trim()) {
      updatedBasicInfo.background = {
        ...basicInfo.background,
        isValid: false,
        errorMessage: "Background information is required"
      };
      isValid = false;
    }
    
    setBasicInfo(updatedBasicInfo);
    
    // Update section status
    setSectionStatus(prevStatus => ({
      ...prevStatus,
      basic: {
        isComplete: isValid,
        isValid: isValid,
        errorMessage: isValid ? "" : "Please complete all required fields"
      }
    }));
    
    return isValid;
  };

  // Validate objectives section
  const validateObjectives = () => {
    let isValid = true;
    let updatedObjectivesInfo = { ...objectivesInfo };
    
    // Validate objectives
    if (!objectivesInfo.objectives.value.trim()) {
      updatedObjectivesInfo.objectives = {
        ...objectivesInfo.objectives,
        isValid: false,
        errorMessage: "Objectives are required"
      };
      isValid = false;
    }
    
    // Validate literature review
    if (!objectivesInfo.literatureReview.value.trim()) {
      updatedObjectivesInfo.literatureReview = {
        ...objectivesInfo.literatureReview,
        isValid: false,
        errorMessage: "Literature review is required"
      };
      isValid = false;
    }
    
    setObjectivesInfo(updatedObjectivesInfo);
    
    // Update section status
    setSectionStatus(prevStatus => ({
      ...prevStatus,
      objectives: {
        isComplete: isValid,
        isValid: isValid,
        errorMessage: isValid ? "" : "Please complete all required fields"
      }
    }));
    
    return isValid;
  };

  // Validate activities section
  const validateActivities = () => {
    let isValid = true;
    let updatedActivitiesInfo = { ...activitiesInfo };
    
    // Validate methodology
    if (!activitiesInfo.methodology.value.trim()) {
      updatedActivitiesInfo.methodology = {
        ...activitiesInfo.methodology,
        isValid: false,
        errorMessage: "Methodology is required"
      };
      isValid = false;
    }
    
    // Validate timeline
    if (!activitiesInfo.timeline.value.trim()) {
      updatedActivitiesInfo.timeline = {
        ...activitiesInfo.timeline,
        isValid: false,
        errorMessage: "Timeline is required"
      };
      isValid = false;
    }
    
    setActivitiesInfo(updatedActivitiesInfo);
    
    // Update section status
    setSectionStatus(prevStatus => ({
      ...prevStatus,
      activities: {
        isComplete: isValid,
        isValid: isValid,
        errorMessage: isValid ? "" : "Please complete all required fields"
      }
    }));
    
    return isValid;
  };

  // Validate outcomes section
  const validateOutcomes = () => {
    let isValid = true;
    let updatedOutcomesInfo = { ...outcomesInfo };
    
    // Validate research outcomes
    if (!outcomesInfo.researchOutcomes.value.trim()) {
      updatedOutcomesInfo.researchOutcomes = {
        ...outcomesInfo.researchOutcomes,
        isValid: false,
        errorMessage: "Research outcomes are required"
      };
      isValid = false;
    }
    
    // Validate impact
    if (!outcomesInfo.impact.value.trim()) {
      updatedOutcomesInfo.impact = {
        ...outcomesInfo.impact,
        isValid: false,
        errorMessage: "Impact and significance is required"
      };
      isValid = false;
    }
    
    setOutcomesInfo(updatedOutcomesInfo);
    
    // Update section status
    setSectionStatus(prevStatus => ({
      ...prevStatus,
      outcomes: {
        isComplete: isValid,
        isValid: isValid,
        errorMessage: isValid ? "" : "Please complete all required fields"
      }
    }));
    
    return isValid;
  };

  // Validate budget section
  const validateBudget = () => {
    let isValid = true;
    let updatedBudgetInfo = { ...budgetInfo };
    
    // Validate budget summary
    if (!budgetInfo.budgetSummary.value.trim()) {
      updatedBudgetInfo.budgetSummary = {
        ...budgetInfo.budgetSummary,
        isValid: false,
        errorMessage: "Budget summary is required"
      };
      isValid = false;
    }
    
    // Validate budget justification
    if (!budgetInfo.budgetJustification.value.trim()) {
      updatedBudgetInfo.budgetJustification = {
        ...budgetInfo.budgetJustification,
        isValid: false,
        errorMessage: "Budget justification is required"
      };
      isValid = false;
    }
    
    setBudgetInfo(updatedBudgetInfo);
    
    // Update section status
    setSectionStatus(prevStatus => ({
      ...prevStatus,
      budget: {
        isComplete: isValid,
        isValid: isValid,
        errorMessage: isValid ? "" : "Please complete all required fields"
      }
    }));
    
    return isValid;
  };

  // Validate students section
  const validateStudents = () => {
    let isValid = true;
    let updatedStudentsInfo = { ...studentsInfo };
    
    // Validate student involvement
    if (!studentsInfo.studentInvolvement.value.trim()) {
      updatedStudentsInfo.studentInvolvement = {
        ...studentsInfo.studentInvolvement,
        isValid: false,
        errorMessage: "Student involvement is required"
      };
      isValid = false;
    }
    
    // Validate student learning outcomes
    if (!studentsInfo.studentLearningOutcomes.value.trim()) {
      updatedStudentsInfo.studentLearningOutcomes = {
        ...studentsInfo.studentLearningOutcomes,
        isValid: false,
        errorMessage: "Student learning outcomes are required"
      };
      isValid = false;
    }
    
    setStudentsInfo(updatedStudentsInfo);
    
    // Update section status
    setSectionStatus(prevStatus => ({
      ...prevStatus,
      students: {
        isComplete: isValid,
        isValid: isValid,
        errorMessage: isValid ? "" : "Please complete all required fields"
      }
    }));
    
    return isValid;
  };

  // Validate references section
  const validateReferences = () => {
    let isValid = true;
    let updatedReferencesInfo = { ...referencesInfo };
    
    // Validate bibliography
    if (!referencesInfo.bibliography.value.trim()) {
      updatedReferencesInfo.bibliography = {
        ...referencesInfo.bibliography,
        isValid: false,
        errorMessage: "Bibliography is required"
      };
      isValid = false;
    }
    
    setReferencesInfo(updatedReferencesInfo);
    
    // Update section status
    setSectionStatus(prevStatus => ({
      ...prevStatus,
      references: {
        isComplete: isValid,
        isValid: isValid,
        errorMessage: isValid ? "" : "Please complete all required fields"
      }
    }));
    
    return isValid;
  };

  const handleBasicInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBasicInfo(prev => ({
      ...prev,
      [name]: {
        ...prev[name as keyof typeof prev],
        value,
        isValid: true,
        errorMessage: "",
      }
    }));
  };

  const handleObjectivesInfoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setObjectivesInfo(prev => ({
      ...prev,
      [name]: {
        ...prev[name as keyof typeof prev],
        value,
        isValid: true,
        errorMessage: "",
      }
    }));
  };

  const handleActivitiesInfoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setActivitiesInfo(prev => ({
      ...prev,
      [name]: {
        ...prev[name as keyof typeof prev],
        value,
        isValid: true,
        errorMessage: "",
      }
    }));
  };

  const handleOutcomesInfoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOutcomesInfo(prev => ({
      ...prev,
      [name]: {
        ...prev[name as keyof typeof prev],
        value,
        isValid: true,
        errorMessage: "",
      }
    }));
  };

  const handleBudgetInfoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBudgetInfo(prev => ({
      ...prev,
      [name]: {
        ...prev[name as keyof typeof prev],
        value,
        isValid: true,
        errorMessage: "",
      }
    }));
  };

  const handleStudentsInfoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStudentsInfo(prev => ({
      ...prev,
      [name]: {
        ...prev[name as keyof typeof prev],
        value,
        isValid: true,
        errorMessage: "",
      }
    }));
  };

  const handleReferencesInfoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReferencesInfo(prev => ({
      ...prev,
      [name]: {
        ...prev[name as keyof typeof prev],
        value,
        isValid: true,
        errorMessage: "",
      }
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setBasicInfo(prev => ({
      ...prev,
      [name]: {
        ...prev[name as keyof typeof prev],
        value,
        isValid: true,
        errorMessage: "",
      }
    }));
  };

  const handleTabChange = (value: string) => {
    setIsUserChangingTab(true);
    
    // Check if user can access the selected tab
    const canAccessTab = canAccessSection(value);
    
    if (canAccessTab) {
      setActiveTab(value);
      autoSave(); // Auto-save when changing tabs
    } else {
      // Show toast if user tries to access a tab they can't
      toast({
        title: "Cannot access section",
        description: "Please complete the previous sections first",
        variant: "destructive",
      });
    }
    
    setIsUserChangingTab(false);
  };

  const canAccessSection = (section: string) => {
    switch (section) {
      case "basic":
        return true; // Always accessible
      case "objectives":
        return sectionStatus.basic.isComplete;
      case "activities":
        return sectionStatus.basic.isComplete && sectionStatus.objectives.isComplete;
      case "outcomes":
        return sectionStatus.basic.isComplete && sectionStatus.objectives.isComplete && 
               sectionStatus.activities.isComplete;
      case "budget":
        return sectionStatus.basic.isComplete && sectionStatus.objectives.isComplete && 
               sectionStatus.activities.isComplete && sectionStatus.outcomes.isComplete;
      case "students":
        return sectionStatus.basic.isComplete && sectionStatus.objectives.isComplete && 
               sectionStatus.activities.isComplete && sectionStatus.outcomes.isComplete && 
               sectionStatus.budget.isComplete;
      case "references":
        return sectionStatus.basic.isComplete && sectionStatus.objectives.isComplete && 
               sectionStatus.activities.isComplete && sectionStatus.outcomes.isComplete && 
               sectionStatus.budget.isComplete && sectionStatus.students.isComplete;
      default:
        return false;
    }
  };

  const handleNext = () => {
    // Validate current tab
    let isValid = false;
    
    if (activeTab === "basic") {
      isValid = validateBasicInfo();
      if (isValid) setActiveTab("objectives");
    } else if (activeTab === "objectives") {
      isValid = validateObjectives();
      if (isValid) setActiveTab("activities");
    } else if (activeTab === "activities") {
      isValid = validateActivities();
      if (isValid) setActiveTab("outcomes");
    } else if (activeTab === "outcomes") {
      isValid = validateOutcomes();
      if (isValid) setActiveTab("budget");
    } else if (activeTab === "budget") {
      isValid = validateBudget();
      if (isValid) setActiveTab("students");
    } else if (activeTab === "students") {
      isValid = validateStudents();
      if (isValid) setActiveTab("references");
    } else {
      isValid = validateReferences();
      if (isValid) {
        // Submit the application
        toast({
          title: "Application submitted",
          description: "Your grant application has been submitted for review",
        });
      }
    }
    
    if (!isValid) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
    } else {
      autoSave();
    }
  };

  const handlePrevious = () => {
    if (activeTab === "objectives") {
      setActiveTab("basic");
    } else if (activeTab === "activities") {
      setActiveTab("objectives");
    } else if (activeTab === "outcomes") {
      setActiveTab("activities");
    } else if (activeTab === "budget") {
      setActiveTab("outcomes");
    } else if (activeTab === "students") {
      setActiveTab("budget");
    } else if (activeTab === "references") {
      setActiveTab("students");
    }
    
    autoSave();
  };

  const handleSaveProgress = () => {
    autoSave();
  };

  const renderFieldError = (field: FormField) => {
    if (!field.isValid) {
      return (
        <div className="text-red-500 text-xs flex items-center mt-1">
          <AlertCircle className="h-3 w-3 mr-1" />
          {field.errorMessage}
        </div>
      );
    }
    return null;
  };

  // Initial validation
  useEffect(() => {
    if (user) {
      setBasicInfo(prev => ({
        ...prev,
        piName: { ...prev.piName, value: user.name }
      }));
    }
  }, [user]);

  const value = {
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
    handleSaveProgress,
    canAccessSection,
    calculateProgress,
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
    opportunity
  };

  return (
    <ApplicationFormContext.Provider value={value}>
      {children}
    </ApplicationFormContext.Provider>
  );
};

export const useApplicationForm = () => {
  const context = useContext(ApplicationFormContext);
  if (context === undefined) {
    throw new Error("useApplicationForm must be used within an ApplicationFormProvider");
  }
  return context;
};
