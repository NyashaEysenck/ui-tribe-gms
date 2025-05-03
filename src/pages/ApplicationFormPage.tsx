
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import RoleSidebar from "@/components/RoleSidebar";
import { ApplicationFormProvider } from "@/context/ApplicationFormContext";
import { PrefillData } from "@/types/user";
import { toast } from "@/hooks/use-toast";
import ApplicationProgressBar from "@/components/ApplicationProgressBar";

// Import form components
import ApplicationFormHeader from "@/components/application-form/ApplicationFormHeader";
import ApplicationFormNavigation from "@/components/application-form/ApplicationFormNavigation";
import ApplicationFormActions from "@/components/application-form/ApplicationFormActions";
import BasicInformationSection from "@/components/application-form/BasicInformationSection";
import ObjectivesSection from "@/components/application-form/ObjectivesSection";
import ActivitiesSection from "@/components/application-form/ActivitiesSection";
import OutcomesSection from "@/components/application-form/OutcomesSection";
import BudgetSection from "@/components/application-form/BudgetSection";
import StudentsSection from "@/components/application-form/StudentsSection";
import ReferencesSection from "@/components/application-form/ReferencesSection";

// Mock data for demonstration purposes
const demoApplications: Record<string, PrefillData> = {
  "1": {
    basic: {
      studyTitle: "Impact of Climate Change on Agricultural Practices in Sub-Saharan Africa",
      college: "College of Agriculture",
      grantCategory: "Research",
      fundingSource: "External - NGO",
      statementOfPurpose: "This research aims to investigate the adaptation strategies employed by small-scale farmers in sub-Saharan Africa in response to changing climate patterns.",
      background: "Climate change poses significant challenges to agricultural productivity in sub-Saharan Africa. Previous studies have documented changes in rainfall patterns and increasing temperatures across the region."
    },
    objectives: {
      objectives: "1. To document climate-induced changes in agricultural practices among small-scale farmers.\n2. To evaluate the effectiveness of current adaptation strategies.\n3. To develop policy recommendations for sustainable agricultural practices.",
      literatureReview: "Several studies have examined climate change impacts on agriculture in developing countries. Thompson et al. (2023) noted significant yield reductions in maize crops due to irregular rainfall patterns. Similarly, Nyathi (2024) reported adaptive measures including crop diversification and water conservation techniques implemented by local farmers."
    }
  },
  "2": {
    basic: {
      studyTitle: "Innovative Mobile Health Solutions for Remote Communities",
      college: "College of Health Sciences",
      grantCategory: "Innovation",
      fundingSource: "External - Private",
      statementOfPurpose: "This study aims to design and validate a mobile health platform that addresses healthcare access challenges in remote African communities.",
      background: "Healthcare access remains a significant challenge in remote parts of Africa. Mobile health technologies offer promising solutions but require adaptation to local contexts and infrastructure limitations."
    },
    objectives: {
      objectives: "1. To identify key healthcare access barriers in target communities.\n2. To develop a mobile health platform adapted to local contexts and constraints.\n3. To evaluate the platform's effectiveness in improving healthcare outcomes.",
      literatureReview: "Recent advances in mobile health technology have demonstrated potential for improving healthcare delivery in resource-constrained settings. Ouma et al. (2024) reported successful implementation of SMS-based vaccination reminder systems in rural Kenya, achieving a 27% increase in immunization rates."
    }
  }
};

const ApplicationFormPage: React.FC = () => {
  const { opportunityId } = useParams<{ opportunityId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [prefillData, setPrefillData] = React.useState<PrefillData | undefined>(undefined);

  // Function to load demo application data
  const handlePrefill = () => {
    if (!opportunityId) return;
    
    // Get demo data based on opportunity ID
    const demoData = demoApplications[opportunityId];
    
    if (demoData) {
      setPrefillData(demoData);
      toast({
        title: "Form prefilled",
        description: "Sample data has been loaded into the form",
      });
    }
  };

  if (!user) {
    return (
      <div className="flex h-screen bg-gray-50">
        <RoleSidebar />
        <main className="flex-1 p-8">
          <Card>
            <CardContent className="p-6">
              <h1 className="text-xl font-bold mb-4">Please log in</h1>
              <p>You need to be logged in to access this page.</p>
              <Button onClick={() => navigate("/login")} className="mt-4">
                Go to Login
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <ApplicationFormProvider user={user} opportunityId={opportunityId} prefillData={prefillData}>
      <div className="flex h-screen bg-gray-50">
        <RoleSidebar />
        
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold">Grant Application</h1>
                  <Button 
                    onClick={handlePrefill}
                    variant="outline"
                    className="text-sm"
                  >
                    Prefill with Sample Data
                  </Button>
                </div>
                
                <ApplicationFormHeader />
                
                <Tabs defaultValue="basic">
                  <ApplicationFormNavigation />
                  
                  {/* Tab contents */}
                  <TabsContent value="basic">
                    <BasicInformationSection />
                  </TabsContent>
                  
                  <TabsContent value="objectives">
                    <ObjectivesSection />
                  </TabsContent>
                  
                  <TabsContent value="activities">
                    <ActivitiesSection />
                  </TabsContent>
                  
                  <TabsContent value="outcomes">
                    <OutcomesSection />
                  </TabsContent>
                  
                  <TabsContent value="budget">
                    <BudgetSection />
                  </TabsContent>
                  
                  <TabsContent value="students">
                    <StudentsSection />
                  </TabsContent>
                  
                  <TabsContent value="references">
                    <ReferencesSection />
                  </TabsContent>
                </Tabs>
                
                <ApplicationFormActions />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </ApplicationFormProvider>
  );
};

export default ApplicationFormPage;
