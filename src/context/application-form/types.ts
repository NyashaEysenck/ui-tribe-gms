
import { 
  ApplicationSections, 
  FormField, 
  ApplicationProgress,
  User
} from "@/types/user";

export interface ApplicationFormContextValue {
  // Tab state
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  
  // Section statuses
  sectionStatus: ApplicationSections;
  setSectionStatus: React.Dispatch<React.SetStateAction<ApplicationSections>>;
  
  // Form data
  basicInfo: any;
  setBasicInfo: React.Dispatch<React.SetStateAction<any>>;
  objectivesInfo: any;
  setObjectivesInfo: React.Dispatch<React.SetStateAction<any>>;
  activitiesInfo: any;
  setActivitiesInfo: React.Dispatch<React.SetStateAction<any>>;
  outcomesInfo: any;
  setOutcomesInfo: React.Dispatch<React.SetStateAction<any>>;
  budgetInfo: any;
  setBudgetInfo: React.Dispatch<React.SetStateAction<any>>;
  studentsInfo: any;
  setStudentsInfo: React.Dispatch<React.SetStateAction<any>>;
  referencesInfo: any;
  setReferencesInfo: React.Dispatch<React.SetStateAction<any>>;
  
  // Helper functions
  handleTabChange: (value: string) => void;
  handleNext: () => void;
  handlePrevious: () => void;
  handleSaveProgress: () => void;
  canAccessSection: (section: string) => boolean;
  calculateProgress: () => ApplicationProgress;
  prefillDemoData: () => void;
  
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

export interface ApplicationFormProviderProps {
  children: React.ReactNode;
  user: User | null;
  opportunityId?: string;
}
