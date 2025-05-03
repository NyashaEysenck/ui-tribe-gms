
import { FormField } from "@/types/user";
import { toast } from "@/hooks/use-toast";
import React from "react";

// Field validation utilities
export const validateField = (field: FormField): boolean => {
  return !field.isRequired || field.value.trim() !== "";
};

export const validateAllFields = (fields: Record<string, FormField>): boolean => {
  return Object.values(fields).every(field => validateField(field));
};

// Field change handlers
export const createFieldChangeHandler = (
  setState: React.Dispatch<React.SetStateAction<any>>
) => {
  return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setState(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        value,
        isValid: value.trim() !== "" || !prev[name].isRequired,
        errorMessage: value.trim() === "" && prev[name].isRequired ? "This field is required" : "",
      }
    }));
  };
};

// Select field change handler
export const createSelectChangeHandler = (
  setState: React.Dispatch<React.SetStateAction<any>>
) => {
  return (name: string, value: string) => {
    setState(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        value,
        isValid: true,
      }
    }));
  };
};

// UI helper for field errors
export const renderFieldError = (field: FormField) => {
  if (!field.isValid) {
    return (
      <div className="text-red-500 text-sm mt-1 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <span>{field.errorMessage}</span>
      </div>
    );
  }
  return null;
};

// Submit and save handlers
export const handleSaveProgress = (
  setIsSaving: React.Dispatch<React.SetStateAction<boolean>>
) => {
  return () => {
    setIsSaving(true);
    
    // Simulate saving data to API
    setTimeout(() => {
      toast({
        title: "Progress Saved",
        description: "Your application progress has been saved.",
      });
      setIsSaving(false);
    }, 1000);
  };
};

export const handleSubmitApplication = (
  setSectionStatus: React.Dispatch<React.SetStateAction<any>>,
  setIsSaving: React.Dispatch<React.SetStateAction<boolean>>
) => {
  // Mark all sections as complete for the demo
  const updatedSectionStatus = {
    basic: { isComplete: true, isValid: true, errorMessage: "" },
    objectives: { isComplete: true, isValid: true, errorMessage: "" },
    activities: { isComplete: true, isValid: true, errorMessage: "" },
    outcomes: { isComplete: true, isValid: true, errorMessage: "" },
    budget: { isComplete: true, isValid: true, errorMessage: "" },
    students: { isComplete: true, isValid: true, errorMessage: "" },
    references: { isComplete: true, isValid: true, errorMessage: "" },
  };
  
  setSectionStatus(updatedSectionStatus);
  
  // Simulate API submission
  setIsSaving(true);
  
  setTimeout(() => {
    toast({
      title: "Application Submitted",
      description: "Your grant application has been successfully submitted.",
    });
    setIsSaving(false);
  }, 1500);
};
