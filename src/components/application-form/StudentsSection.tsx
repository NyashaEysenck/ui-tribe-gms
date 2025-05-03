
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import ApplicationSectionHeader from "@/components/ApplicationSectionHeader";
import { useApplicationForm, sectionHelpText } from "@/context/application-form";

const StudentsSection: React.FC = () => {
  const { 
    studentsInfo, 
    handleStudentsInfoChange, 
    renderFieldError,
    sectionStatus
  } = useApplicationForm();

  return (
    <div className="mt-6 border rounded-lg p-4 shadow-sm">
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
    </div>
  );
};

export default StudentsSection;
