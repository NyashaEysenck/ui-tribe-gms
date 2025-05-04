
import { User } from '@/types/user';

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  amount: string;
  deadline: string;
  createdAt: string;
  updatedAt: string;
}

export interface BudgetItem {
  name: string;
  amount: number;
  description?: string;
}

export interface Budget {
  items: BudgetItem[];
  total: number;
}

export interface Application {
  id: string;
  userId: string;
  opportunityId: string;
  title: string;
  abstract: string;
  background: string;
  methodology: string;
  objectives: string[];
  activities: string[];
  outcomes: string[];
  budget: Budget;
  students: string[];
  references: string[];
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
  [key: string]: any; // For dynamic access
}

export interface ValidationField {
  isValid: boolean;
  error?: string;
}

export interface ValidationError {
  [key: string]: ValidationField;
}

export interface ApplicationFormContextType {
  user: User;
  opportunity: Opportunity | null;
  application: Application | null;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  isSaving: boolean;
  isSubmitting: boolean;
  validation: ValidationError;
  calculateProgress: () => number;
  handleSaveProgress: () => Promise<void>;
  handleSubmitApplication: () => Promise<void>;
  updateApplication: (field: string, value: any) => void;
  validateSection: (section: string) => boolean;
}
