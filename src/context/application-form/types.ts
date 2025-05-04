
import { User } from "@/types/user";

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  amount: string;
  deadline: string;
  createdAt: string;
  updatedAt: string;
}

export interface ValidationField {
  isValid: boolean;
  error?: string;
}

export interface ValidationError {
  [key: string]: ValidationField;
}

export interface BudgetItem {
  id: string;
  name: string;
  amount: number;
  justification: string;
}

export interface Budget {
  items: BudgetItem[];
  total: number;
}

export interface Objective {
  id: string;
  text: string;
}

export interface Activity {
  id: string;
  text: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'in-progress' | 'completed';
}

export interface Outcome {
  id: string;
  text: string;
  metrics: string;
}

export interface StudentInvolvement {
  id: string;
  name: string;
  role: string;
  department: string;
  level: string;
}

export interface Reference {
  id: string;
  citation: string;
  url?: string;
}

export interface Application {
  id: string;
  userId: string;
  opportunityId: string;
  title: string;
  abstract: string;
  background: string;
  methodology: string;
  objectives: Objective[];
  activities: Activity[];
  outcomes: Outcome[];
  budget: Budget;
  students: StudentInvolvement[];
  references: Reference[];
  status: 'draft' | 'submitted' | 'under-review' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationFormContextType {
  user: User;
  opportunity: Opportunity | null;
  application: Application | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isSaving: boolean;
  isSubmitting: boolean;
  validation: {
    [key: string]: ValidationField;
  };
  calculateProgress: () => number;
  handleSaveProgress: () => Promise<void>;
  handleSubmitApplication: () => Promise<void>;
  updateApplication: (field: string, value: any) => void;
  validateSection: (section: string) => boolean;
  // Add other form handler methods as needed
}
