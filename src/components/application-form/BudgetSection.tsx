
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import ApplicationSectionHeader from "@/components/ApplicationSectionHeader";
import { useApplicationForm, sectionHelpText } from "@/context/application-form";

const BudgetSection: React.FC = () => {
  const { 
    budgetInfo, 
    handleBudgetInfoChange, 
    renderFieldError,
    sectionStatus
  } = useApplicationForm();

  return (
    <div className="mt-6 border rounded-lg p-4 shadow-sm">
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
    </div>
  );
};

export default BudgetSection;
