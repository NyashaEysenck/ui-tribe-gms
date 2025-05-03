
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import RoleSidebar from "@/components/RoleSidebar";
import { ApplicationFormProvider, useApplicationForm } from "@/context/ApplicationFormContext";

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

const PrefillButton = () => {
  const { prefillDemoData } = useApplicationForm();
  
  return (
    <div className="absolute top-4 right-4">
      <Button 
        onClick={prefillDemoData} 
        size="sm" 
        variant="outline"
      >
        Load Demo Data
      </Button>
    </div>
  );
};

const ApplicationFormContent = () => {
  return (
    <div className="p-8 relative">
      <Card>
        <CardContent className="p-6">
          <PrefillButton />
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
  );
};

const ApplicationFormPage: React.FC = () => {
  const { opportunityId } = useParams<{ opportunityId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

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
    <ApplicationFormProvider user={user} opportunityId={opportunityId}>
      <div className="flex h-screen bg-gray-50">
        <RoleSidebar />
        
        <main className="flex-1 overflow-y-auto">
          <ApplicationFormContent />
        </main>
      </div>
    </ApplicationFormProvider>
  );
};

export default ApplicationFormPage;
