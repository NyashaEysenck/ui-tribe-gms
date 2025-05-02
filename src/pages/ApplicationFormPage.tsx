import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import RoleSidebar from "@/components/RoleSidebar";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { ApplicationSections, FormField, ApplicationProgress } from "@/types/user";
import { AlertCircle, Save, CheckCircle, ArrowRight, ArrowLeft, AlertTriangle } from "lucide-react";
import ApplicationSectionHeader from "@/components/ApplicationSectionHeader";
import ApplicationProgressBar from "@/components/ApplicationProgressBar";
import { cn } from "@/lib/utils";

// Mock grant opportunity data
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
  // ... other opportunities
];

// Colleges
const colleges = [
  "College of Business",
  "College of Health Sciences",
  "College of Engineering",
  "College of Social Sciences",
  "College of Agriculture",
  "Computer Science",
];

// Grant categories
const grantCategories = [
  "Research",
  "Innovation",
  "Community Outreach",
  "Education",
  "Healthcare",
  "Technology",
];

// Funding sources
const fundingSources = [
  "Internal",
  "External - Government",
  "External - Private",
  "External - NGO",
  "Corporate",
];

// Initial application sections state
const initialSectionStatus = {
  isComplete: false,
  isValid: false,
  errorMessage: "",
};

// Initial application form data
const initialBasicInfo = {
  studyTitle: { value: "", isRequired: true, isValid: true, errorMessage: "" },
  piName: { value: "", isRequired: true, isValid: true, errorMessage: "" },
  college: { value: "", isRequired: true, isValid: true, errorMessage: "" },
  year: { value: "2025", isRequired: true, isValid: true, errorMessage: "" },
  grantCategory: { value: "Research", isRequired: true, isValid: true, errorMessage: "" },
  fundingSource: { value: "Internal", isRequired: true, isValid: true, errorMessage: "" },
  statementOfPurpose: { value: "", isRequired: true, isValid: true, errorMessage: "" },
  background: { value: "", isRequired: true, isValid: true, errorMessage: "" },
};

const initialObjectivesInfo = {
  objectives: { value: "", isRequired: true, isValid: true, errorMessage: "" },
  literatureReview: { value: "", isRequired: true, isValid: true, errorMessage: "" },
};

const initialActivitiesInfo = {
  methodology: { value: "", isRequired: true, isValid: true, errorMessage: "" },
  timeline: { value: "", isRequired: true, isValid: true, errorMessage: "" },
};

const initialOutcomesInfo = {
  researchOutcomes: { value: "", isRequired: true, isValid: true, errorMessage: "" },
  impact: { value: "", isRequired: true, isValid: true, errorMessage: "" },
};

const initialBudgetInfo = {
  budgetSummary: { value: "", isRequired: true, isValid: true, errorMessage: "" },
  budgetJustification: { value: "", isRequired: true, isValid: true, errorMessage: "" },
};

const initialStudentsInfo = {
  studentInvolvement: { value: "", isRequired: true, isValid: true, errorMessage: "" },
  studentLearningOutcomes: { value: "", isRequired: true, isValid: true, errorMessage: "" },
};

const initialReferencesInfo = {
  bibliography: { value: "", isRequired: true, isValid: true, errorMessage: "" },
};

// Section help text
const sectionHelpText = {
  basic: "This section collects essential information about your research project, including the title, PI details, and a brief statement of purpose.",
  objectives: "Clearly state your research objectives and provide a concise literature review to establish context for your work.",
  activities: "Describe your research methodology and timeline for completing project activities.",
  outcomes: "Explain the expected outcomes of your research and their significance.",
  budget: "Provide a detailed budget breakdown and justify all expenses.",
  students: "Describe how students will be involved in the research and what skills they will develop.",
  references: "List all references in APA format."
};

const ApplicationFormPage = () => {
  const { opportunityId } = useParams<{ opportunityId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const opportunity = opportunities.find(opp => opp.id === opportunityId);
  
  // State for each tab
  const [activeTab, setActiveTab] = useState("basic");
  const [isUserChangingTab, setIsUserChangingTab] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Form data for each section
  const [basicInfo, setBasicInfo] = useState({...initialBasicInfo, piName: { ...initialBasicInfo.piName, value: user?.name || "" }});
  const [objectivesInfo, setObjectivesInfo] = useState(initialObjectivesInfo);
  const [activitiesInfo, setActivitiesInfo] = useState(initialActivitiesInfo);
  const [outcomesInfo, setOutcomesInfo] = useState(initialOutcomesInfo);
  const [budgetInfo, setBudgetInfo] = useState(initialBudgetInfo);
  const [studentsInfo, setStudentsInfo] = useState(initialStudentsInfo);
  const [referencesInfo, setReferencesInfo] = useState(initialReferencesInfo);

  // Application sections completion status
  const [sectionStatus, setSectionStatus] = useState<ApplicationSections>({
    basic: initialSectionStatus,
    objectives: initialSectionStatus,
    activities: initialSectionStatus,
    outcomes: initialSectionStatus,
    budget: initialSectionStatus,
    students: initialSectionStatus,
    references: initialSectionStatus,
  });

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
        
        // Redirect back to dashboard
        setTimeout(() => {
          navigate("/my-grants");
        }, 1500);
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

  if (!opportunity) {
    return (
      <div className="flex h-screen bg-gray-50">
        <RoleSidebar />
        <main className="flex-1 p-8">
          <Card>
            <CardContent className="p-6">
              <h1 className="text-xl font-bold mb-4">Opportunity not found</h1>
              <p>The requested opportunity could not be found.</p>
              <Button onClick={() => navigate("/opportunities")} className="mt-4">
                Back to Opportunities
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const progress = calculateProgress();

  return (
    <div className="flex h-screen bg-gray-50">
      <RoleSidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h1 className="text-2xl font-bold">AU Grant Application Form</h1>
                    <p className="text-gray-600">
                      Applying for: <span className="font-medium">{opportunity.title}</span> - <span className="text-red-600">{opportunity.amount}</span>
                    </p>
                    <p className="text-sm text-gray-500">Deadline: {opportunity.deadline}</p>
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
                
                {/* Progress bar */}
                <ApplicationProgressBar progress={progress} />
                
                {/* Tab navigation */}
                <Tabs value={activeTab} onValueChange={handleTabChange} className="mt-6">
                  <TabsList className="grid grid-cols-7 w-full">
                    <TabsTrigger 
                      value="basic"
                      className="relative"
                      aria-label="Basic Information Section"
                    >
                      Basic
                      {sectionStatus.basic.isComplete && (
                        <CheckCircle className="absolute -top-1 -right-1 h-3 w-3 text-green-500" />
                      )}
                    </TabsTrigger>
                    <TabsTrigger 
                      value="objectives" 
                      disabled={!canAccessSection("objectives")}
                      className={cn(
                        "relative",
                        !canAccessSection("objectives") ? "opacity-50 cursor-not-allowed" : ""
                      )}
                      aria-label="Objectives and Literature Section"
                    >
                      Objectives
                      {sectionStatus.objectives.isComplete && (
                        <CheckCircle className="absolute -top-1 -right-1 h-3 w-3 text-green-500" />
                      )}
                    </TabsTrigger>
                    <TabsTrigger 
                      value="activities" 
                      disabled={!canAccessSection("activities")}
                      className={cn(
                        "relative",
                        !canAccessSection("activities") ? "opacity-50 cursor-not-allowed" : ""
                      )}
                      aria-label="Activities Section"
                    >
                      Activities
                      {sectionStatus.activities.isComplete && (
                        <CheckCircle className="absolute -top-1 -right-1 h-3 w-3 text-green-500" />
                      )}
                    </TabsTrigger>
                    <TabsTrigger 
                      value="outcomes" 
                      disabled={!canAccessSection("outcomes")}
                      className={cn(
                        "relative",
                        !canAccessSection("outcomes") ? "opacity-50 cursor-not-allowed" : ""
                      )}
                      aria-label="Outcomes Section"
                    >
                      Outcomes
                      {sectionStatus.outcomes.isComplete && (
                        <CheckCircle className="absolute -top-1 -right-1 h-3 w-3 text-green-500" />
                      )}
                    </TabsTrigger>
                    <TabsTrigger 
                      value="budget" 
                      disabled={!canAccessSection("budget")}
                      className={cn(
                        "relative",
                        !canAccessSection("budget") ? "opacity-50 cursor-not-allowed" : ""
                      )}
                      aria-label="Budget Section"
                    >
                      Budget
                      {sectionStatus.budget.isComplete && (
                        <CheckCircle className="absolute -top-1 -right-1 h-3 w-3 text-green-500" />
                      )}
                    </TabsTrigger>
                    <TabsTrigger 
                      value="students" 
                      disabled={!canAccessSection("students")}
                      className={cn(
                        "relative",
                        !canAccessSection("students") ? "opacity-50 cursor-not-allowed" : ""
                      )}
                      aria-label="Students Work Plan Section"
                    >
                      Students
                      {sectionStatus.students.isComplete && (
                        <CheckCircle className="absolute -top-1 -right-1 h-3 w-3 text-green-500" />
                      )}
                    </TabsTrigger>
                    <TabsTrigger 
                      value="references" 
                      disabled={!canAccessSection("references")}
                      className={cn(
                        "relative",
                        !canAccessSection("references") ? "opacity-50 cursor-not-allowed" : ""
                      )}
                      aria-label="References Section"
                    >
                      References
                      {sectionStatus.references.isComplete && (
                        <CheckCircle className="absolute -top-1 -right-1 h-3 w-3 text-green-500" />
                      )}
                    </TabsTrigger>
                  </TabsList>
                
                  {/* Basic information tab */}
                  <TabsContent value="basic" className="mt-6 border rounded-lg p-4 shadow-sm">
                    <ApplicationSectionHeader 
                      title="Basic Information" 
                      description="Enter essential information about your research project"
                      isComplete={sectionStatus.basic.isComplete}
                      helpText={sectionHelpText.basic}
                    />
                    
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="studyTitle" className="block text-sm font-medium text-gray-700 mb-1">
                            Study Title <span className="text-red-600">*</span>
                          </label>
                          <Input
                            id="studyTitle"
                            name="studyTitle"
                            value={basicInfo.studyTitle.value}
                            onChange={handleBasicInfoChange}
                            placeholder="Enter the title of your research project"
                            className={`w-full ${!basicInfo.studyTitle.isValid ? 'border-red-500' : ''}`}
                            required
                            aria-describedby="studyTitleError"
                          />
                          {renderFieldError(basicInfo.studyTitle)}
                        </div>
                        
                        <div>
                          <label htmlFor="piName" className="block text-sm font-medium text-gray-700 mb-1">
                            Principal Investigator (PI) Name <span className="text-red-600">*</span>
                          </label>
                          <Input
                            id="piName"
                            name="piName"
                            value={basicInfo.piName.value}
                            onChange={handleBasicInfoChange}
                            className={`w-full ${!basicInfo.piName.isValid ? 'border-red-500' : ''}`}
                            required
                            disabled
                          />
                          {renderFieldError(basicInfo.piName)}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="college" className="block text-sm font-medium text-gray-700 mb-1">
                            College Name <span className="text-red-600">*</span>
                          </label>
                          <Select 
                            value={basicInfo.college.value} 
                            onValueChange={(value) => handleSelectChange("college", value)}
                          >
                            <SelectTrigger className={!basicInfo.college.isValid ? 'border-red-500' : ''}>
                              <SelectValue placeholder="Select college" />
                            </SelectTrigger>
                            <SelectContent>
                              {colleges.map((college) => (
                                <SelectItem key={college} value={college}>
                                  {college}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {renderFieldError(basicInfo.college)}
                        </div>
                        
                        <div>
                          <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                            Year of Application <span className="text-red-600">*</span>
                          </label>
                          <Select 
                            value={basicInfo.year.value} 
                            onValueChange={(value) => handleSelectChange("year", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="2025">2025</SelectItem>
                              <SelectItem value="2026">2026</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="grantCategory" className="block text-sm font-medium text-gray-700 mb-1">
                            Grant Category <span className="text-red-600">*</span>
                          </label>
                          <Select 
                            value={basicInfo.grantCategory.value} 
                            onValueChange={(value) => handleSelectChange("grantCategory", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {grantCategories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <label htmlFor="fundingSource" className="block text-sm font-medium text-gray-700 mb-1">
                            Funding Source <span className="text-red-600">*</span>
                          </label>
                          <Select 
                            value={basicInfo.fundingSource.value} 
                            onValueChange={(value) => handleSelectChange("fundingSource", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {fundingSources.map((source) => (
                                <SelectItem key={source} value={source}>
                                  {source}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="statementOfPurpose" className="block text-sm font-medium text-gray-700 mb-1">
                          Statement of Purpose (2 sentences max) <span className="text-red-600">*</span>
                        </label>
                        <Textarea
                          id="statementOfPurpose"
                          name="statementOfPurpose"
                          value={basicInfo.statementOfPurpose.value}
                          onChange={handleBasicInfoChange}
                          className={`w-full ${!basicInfo.statementOfPurpose.isValid ? 'border-red-500' : ''}`}
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">Limited to 2 sentences, approximately 200 characters</p>
                        {renderFieldError(basicInfo.statementOfPurpose)}
                      </div>
                      
                      <div>
                        <label htmlFor="background" className="block text-sm font-medium text-gray-700 mb-1">
                          Background (1 page max) <span className="text-red-600">*</span>
                        </label>
                        <Textarea
                          id="background"
                          name="background"
                          value={basicInfo.background.value}
                          onChange={handleBasicInfoChange}
                          className={`w-full min-h-[120px] ${!basicInfo.background.isValid ? 'border-red-500' : ''}`}
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">Limited to approximately 500 words</p>
                        {renderFieldError(basicInfo.background)}
                      </div>
                    </div>
                  </TabsContent>
                  
                  {/* Objectives tab */}
                  <TabsContent value="objectives" className="mt-6 border rounded-lg p-4 shadow-sm">
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
                  </TabsContent>
                  
                  {/* Activities tab */}
                  <TabsContent value="activities" className="mt-6 border rounded-lg p-4 shadow-sm">
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
                  </TabsContent>
                  
                  {/* Outcomes tab */}
                  <TabsContent value="outcomes" className="mt-6 border rounded-lg p-4 shadow-sm">
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
                  </TabsContent>
                  
                  {/* Budget tab */}
                  <TabsContent value="budget" className="mt-6 border rounded-lg p-4 shadow-sm">
                    <ApplicationSectionHeader 
                      title="Budget" 
                      description="Provide a detailed budget breakdown and justification"
                      isComplete={sectionStatus.budget.isComplete}
                      helpText={sectionHelpText.budget}
                    />
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Budget Summary <span className="text-red-600">*</span>
                        </label>
                        <Textarea 
                          id="budgetSummary"
                          name="budgetSummary"
                          value={budgetInfo.budgetSummary.value}
                          onChange={handleBudgetInfoChange}
                          placeholder="Provide a detailed budget breakdown..."
                          className={`w-full min-h-[200px] ${!budgetInfo.budgetSummary.isValid ? 'border-red-500' : ''}`}
                        />
                        {renderFieldError(budgetInfo.budgetSummary)}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Budget Justification <span className="text-red-600">*</span>
                        </label>
                        <Textarea 
                          id="budgetJustification"
                          name="budgetJustification"
                          value={budgetInfo.budgetJustification.value}
                          onChange={handleBudgetInfoChange}
                          placeholder="Explain the necessity of each budget item..."
                          className={`w-full min-h-[150px] ${!budgetInfo.budgetJustification.isValid ? 'border-red-500' : ''}`}
                        />
                        {renderFieldError(budgetInfo.budgetJustification)}
                      </div>
                    </div>
                  </TabsContent>
                  
                  {/* Students tab */}
                  <TabsContent value="students" className="mt-6 border rounded-lg p-4 shadow-sm">
                    <ApplicationSectionHeader 
                      title="Students Work Plan" 
                      description="Describe how students will be involved and what they will learn"
                      isComplete={sectionStatus.students.isComplete}
                      helpText={sectionHelpText.students}
                    />
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Student Involvement <span className="text-red-600">*</span>
                        </label>
                        <Textarea 
                          id="studentInvolvement"
                          name="studentInvolvement"
                          value={studentsInfo.studentInvolvement.value}
                          onChange={handleStudentsInfoChange}
                          placeholder="Describe how students will be involved in this research..."
                          className={`w-full min-h-[150px] ${!studentsInfo.studentInvolvement.isValid ? 'border-red-500' : ''}`}
                        />
                        {renderFieldError(studentsInfo.studentInvolvement)}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Student Learning Outcomes <span className="text-red-600">*</span>
                        </label>
                        <Textarea 
                          id="studentLearningOutcomes"
                          name="studentLearningOutcomes"
                          value={studentsInfo.studentLearningOutcomes.value}
                          onChange={handleStudentsInfoChange}
                          placeholder="What skills and knowledge will students gain..."
                          className={`w-full min-h-[150px] ${!studentsInfo.studentLearningOutcomes.isValid ? 'border-red-500' : ''}`}
                        />
                        {renderFieldError(studentsInfo.studentLearningOutcomes)}
                      </div>
                    </div>
                  </TabsContent>
                  
                  {/* References tab */}
                  <TabsContent value="references" className="mt-6 border rounded-lg p-4 shadow-sm">
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
                  </TabsContent>
                </Tabs>
                
                {/* Navigation buttons */}
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
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ApplicationFormPage;
