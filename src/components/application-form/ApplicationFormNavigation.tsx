
import React from "react";
import { cn } from "@/lib/utils";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle } from "lucide-react";
import { useApplicationForm } from "@/context/ApplicationFormContext";
import { ApplicationSections } from "@/types/user";

const ApplicationFormNavigation: React.FC = () => {
  const { activeTab, handleTabChange, sectionStatus, canAccessSection } = useApplicationForm();

  return (
    <TabsList className="grid grid-cols-7 w-full">
      <TabsTrigger 
        value="basic"
        className="relative"
        aria-label="Basic Information Section"
      >
        Basic
        {sectionStatus.basic.isComplete && (
          <CheckCircle className="absolute -top-1 -right-1 h-3 w-3 text-green-500" />
        )}
      </TabsTrigger>
      
      <TabsTrigger 
        value="objectives" 
        disabled={!canAccessSection("objectives")}
        className={cn(
          "relative",
          !canAccessSection("objectives") ? "opacity-50 cursor-not-allowed" : ""
        )}
        aria-label="Objectives and Literature Section"
      >
        Objectives
        {sectionStatus.objectives.isComplete && (
          <CheckCircle className="absolute -top-1 -right-1 h-3 w-3 text-green-500" />
        )}
      </TabsTrigger>
      
      <TabsTrigger 
        value="activities" 
        disabled={!canAccessSection("activities")}
        className={cn(
          "relative",
          !canAccessSection("activities") ? "opacity-50 cursor-not-allowed" : ""
        )}
        aria-label="Activities Section"
      >
        Activities
        {sectionStatus.activities.isComplete && (
          <CheckCircle className="absolute -top-1 -right-1 h-3 w-3 text-green-500" />
        )}
      </TabsTrigger>
      
      <TabsTrigger 
        value="outcomes" 
        disabled={!canAccessSection("outcomes")}
        className={cn(
          "relative",
          !canAccessSection("outcomes") ? "opacity-50 cursor-not-allowed" : ""
        )}
        aria-label="Outcomes Section"
      >
        Outcomes
        {sectionStatus.outcomes.isComplete && (
          <CheckCircle className="absolute -top-1 -right-1 h-3 w-3 text-green-500" />
        )}
      </TabsTrigger>
      
      <TabsTrigger 
        value="budget" 
        disabled={!canAccessSection("budget")}
        className={cn(
          "relative",
          !canAccessSection("budget") ? "opacity-50 cursor-not-allowed" : ""
        )}
        aria-label="Budget Section"
      >
        Budget
        {sectionStatus.budget.isComplete && (
          <CheckCircle className="absolute -top-1 -right-1 h-3 w-3 text-green-500" />
        )}
      </TabsTrigger>
      
      <TabsTrigger 
        value="students" 
        disabled={!canAccessSection("students")}
        className={cn(
          "relative",
          !canAccessSection("students") ? "opacity-50 cursor-not-allowed" : ""
        )}
        aria-label="Students Work Plan Section"
      >
        Students
        {sectionStatus.students.isComplete && (
          <CheckCircle className="absolute -top-1 -right-1 h-3 w-3 text-green-500" />
        )}
      </TabsTrigger>
      
      <TabsTrigger 
        value="references" 
        disabled={!canAccessSection("references")}
        className={cn(
          "relative",
          !canAccessSection("references") ? "opacity-50 cursor-not-allowed" : ""
        )}
        aria-label="References Section"
      >
        References
        {sectionStatus.references.isComplete && (
          <CheckCircle className="absolute -top-1 -right-1 h-3 w-3 text-green-500" />
        )}
      </TabsTrigger>
    </TabsList>
  );
};

export default ApplicationFormNavigation;
