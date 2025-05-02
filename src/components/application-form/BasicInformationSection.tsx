
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ApplicationSectionHeader from "@/components/ApplicationSectionHeader";
import { useApplicationForm } from "@/context/ApplicationFormContext";
import { colleges, grantCategories, fundingSources, sectionHelpText } from "@/context/ApplicationFormContext";

const BasicInformationSection: React.FC = () => {
  const { 
    basicInfo, 
    handleBasicInfoChange, 
    handleSelectChange, 
    renderFieldError,
    sectionStatus
  } = useApplicationForm();

  return (
    <div className="mt-6 border rounded-lg p-4 shadow-sm">
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
    </div>
  );
};

export default BasicInformationSection;
