export type UserRole = "admin" | "grant_office" | "researcher";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department?: string;
  position?: string;
}

export interface SectionStatus {
  isComplete: boolean;
  isValid: boolean;
  errorMessage?: string;
}

export interface ApplicationSections {
  basic: SectionStatus;
  objectives: SectionStatus;
  activities: SectionStatus;
  outcomes: SectionStatus;
  budget: SectionStatus;
  students: SectionStatus;
  references: SectionStatus;
}

export interface FormField {
  value: string;
  isRequired: boolean;
  isValid: boolean;
  errorMessage?: string;
}

export interface ApplicationFormSection {
  title: string;
  description: string;
  status: SectionStatus;
}

export interface ApplicationProgress {
  currentSection: string;
  completedSections: number;
  totalSections: number;
  percentComplete: number;
}
