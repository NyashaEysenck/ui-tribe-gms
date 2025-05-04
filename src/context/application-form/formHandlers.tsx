
import React from 'react';
import { ValidationError } from './types';

export const renderFieldError = (field: { isValid: boolean; error?: string }) => {
  if (!field.isValid) {
    return (
      <div className="text-red-500 text-sm mt-1 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        {field.error}
      </div>
    );
  }
  return null;
};

export const validateBasicInfo = (data: any) => {
  const errors: ValidationError = {};
  
  if (!data.title || data.title.trim() === '') {
    errors.title = { isValid: false, error: 'Title is required' };
  } else {
    errors.title = { isValid: true };
  }
  
  return errors;
};

export const validateObjectives = (data: any) => {
  const errors: ValidationError = {};
  
  if (!data.objectives || data.objectives.length === 0) {
    errors.objectives = { isValid: false, error: 'At least one objective is required' };
  } else {
    errors.objectives = { isValid: true };
  }
  
  return errors;
};

export const validateOutcomes = (data: any) => {
  const errors: ValidationError = {};
  
  if (!data.outcomes || data.outcomes.length === 0) {
    errors.outcomes = { isValid: false, error: 'At least one outcome is required' };
  } else {
    errors.outcomes = { isValid: true };
  }
  
  return errors;
};

export const validateBudget = (data: any) => {
  const errors: ValidationError = {};
  
  if (!data.budget || data.budget.items.length === 0) {
    errors.budget = { isValid: false, error: 'Budget items are required' };
  } else {
    let isValid = true;
    
    // Check if all budget items have a name and amount
    data.budget.items.forEach((item: any, index: number) => {
      if (!item.name || !item.amount) {
        isValid = false;
      }
    });
    
    errors.budget = { isValid, error: isValid ? undefined : 'All budget items must have a name and amount' };
  }
  
  return errors;
};

export const handleTitleChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setApplication: React.Dispatch<React.SetStateAction<any>>
) => {
  const value = e.target.value;
  setApplication((prev: any) => ({
    ...prev,
    title: value,
  }));
};
