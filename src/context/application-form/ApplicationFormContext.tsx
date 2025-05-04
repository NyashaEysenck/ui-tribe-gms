
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from '@/types/user';
import { ApplicationFormContextType, Application, Opportunity, ValidationError } from './types';
import { 
  validateBasicInfo, 
  validateObjectives, 
  validateOutcomes, 
  validateBudget 
} from './formHandlers';

// Create the context
const ApplicationFormContext = createContext<ApplicationFormContextType | undefined>(undefined);

// Sample data for demonstration
const demoOpportunity: Opportunity = {
  id: '1',
  title: 'Research Innovation Grant',
  description: 'Funding for innovative research projects',
  amount: '$10,000',
  deadline: '2025-06-30',
  createdAt: '2025-01-15',
  updatedAt: '2025-01-15',
};

// Initial application data
const initialApplication: Application = {
  id: '',
  userId: '',
  opportunityId: '',
  title: '',
  abstract: '',
  background: '',
  methodology: '',
  objectives: [],
  activities: [],
  outcomes: [],
  budget: {
    items: [],
    total: 0
  },
  students: [],
  references: [],
  status: 'draft',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

interface ApplicationFormProviderProps {
  children: React.ReactNode;
  user: User;
  opportunityId?: string;
}

export const ApplicationFormProvider: React.FC<ApplicationFormProviderProps> = ({ 
  children, 
  user, 
  opportunityId 
}) => {
  const [opportunity, setOpportunity] = useState<Opportunity | null>(demoOpportunity);
  const [application, setApplication] = useState<Application | null>({
    ...initialApplication,
    userId: user.id,
    opportunityId: opportunityId || ''
  });
  const [activeTab, setActiveTab] = useState('basic');
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validation, setValidation] = useState<ValidationError>({});

  // Calculate application completion progress
  const calculateProgress = () => {
    if (!application) return 0;
    
    // Define the weights for each section (total should be 100)
    const weights = {
      basic: 15,     // Basic information
      objectives: 15, // Objectives
      activities: 15, // Activities
      outcomes: 15,   // Outcomes
      budget: 15,     // Budget
      students: 10,   // Student involvement
      references: 15  // References
    };
    
    let progress = 0;
    
    // Basic information
    if (application.title && application.abstract && application.background && application.methodology) {
      progress += weights.basic;
    } else if (application.title || application.abstract || application.background || application.methodology) {
      // Partial completion
      progress += weights.basic / 2;
    }
    
    // Objectives
    if (application.objectives && application.objectives.length > 0) {
      progress += weights.objectives;
    }
    
    // Activities
    if (application.activities && application.activities.length > 0) {
      progress += weights.activities;
    }
    
    // Outcomes
    if (application.outcomes && application.outcomes.length > 0) {
      progress += weights.outcomes;
    }
    
    // Budget
    if (application.budget && application.budget.items && application.budget.items.length > 0) {
      progress += weights.budget;
    }
    
    // Student involvement (optional)
    if (application.students && application.students.length > 0) {
      progress += weights.students;
    }
    
    // References
    if (application.references && application.references.length > 0) {
      progress += weights.references;
    }
    
    return progress;
  };

  // Validate a specific section
  const validateSection = (section: string): boolean => {
    if (!application) return false;
    
    let sectionErrors: ValidationError = {};
    
    switch (section) {
      case 'basic':
        sectionErrors = validateBasicInfo(application);
        break;
      case 'objectives':
        sectionErrors = validateObjectives(application);
        break;
      case 'outcomes':
        sectionErrors = validateOutcomes(application);
        break;
      case 'budget':
        sectionErrors = validateBudget(application);
        break;
      default:
        return true; // No validation for this section
    }
    
    // Update validation state
    setValidation(prev => ({
      ...prev,
      ...sectionErrors
    }));
    
    // Check if there are any errors
    return Object.values(sectionErrors).every(field => field.isValid);
  };

  // Update application data
  const updateApplication = (field: string, value: any) => {
    setApplication(prev => {
      if (!prev) return prev;
      
      // Handle nested fields using dot notation
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        return {
          ...prev,
          [parent]: {
            ...prev[parent as keyof Application],
            [child]: value
          }
        };
      }
      
      return {
        ...prev,
        [field]: value
      };
    });
  };

  // Save application progress
  const handleSaveProgress = async () => {
    if (!application) return;
    
    setIsSaving(true);
    
    try {
      // In a real app, you would save to a database here
      console.log('Saving application progress:', application);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setApplication(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          updatedAt: new Date().toISOString()
        };
      });
      
      // Show success message
      console.log('Progress saved successfully');
    } catch (error) {
      console.error('Error saving progress:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Submit application
  const handleSubmitApplication = async () => {
    if (!application) return;
    
    // Validate all sections before submitting
    const sections = ['basic', 'objectives', 'activities', 'outcomes', 'budget', 'references'];
    const allValid = sections.every(section => validateSection(section));
    
    if (!allValid) {
      console.error('Please fix validation errors before submitting');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, you would submit to a database here
      console.log('Submitting application:', application);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setApplication(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          status: 'submitted',
          updatedAt: new Date().toISOString()
        };
      });
      
      // Show success message
      console.log('Application submitted successfully');
    } catch (error) {
      console.error('Error submitting application:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Additional handler methods would go here

  return (
    <ApplicationFormContext.Provider
      value={{
        user,
        opportunity,
        application,
        activeTab,
        setActiveTab,
        isSaving,
        isSubmitting,
        validation,
        calculateProgress,
        handleSaveProgress,
        handleSubmitApplication,
        updateApplication,
        validateSection
      }}
    >
      {children}
    </ApplicationFormContext.Provider>
  );
};

// Custom hook for using the context
export const useApplicationForm = () => {
  const context = useContext(ApplicationFormContext);
  if (context === undefined) {
    throw new Error('useApplicationForm must be used within an ApplicationFormProvider');
  }
  return context;
};
