
import React from "react";
import { useAuth } from "@/context/AuthContext";
import RoleSidebar from "@/components/RoleSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Info, HelpCircle, Mail } from "lucide-react";

const HelpPage = () => {
  const { user } = useAuth();
  
  // Role-specific FAQs
  const roleSpecificFAQs = () => {
    switch (user?.role) {
      case "researcher":
        return (
          <>
            <AccordionItem value="applying">
              <AccordionTrigger>How do I apply for a grant?</AccordionTrigger>
              <AccordionContent>
                Browse available opportunities in the "Find Opportunities" section, 
                then click "Apply" on the grant you're interested in. Complete all required 
                sections of the application form and submit for review.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="status">
              <AccordionTrigger>How can I check the status of my application?</AccordionTrigger>
              <AccordionContent>
                Navigate to the "My Grants" section where you can view all your submitted applications 
                and their current status. You can also check for notifications about status changes.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="reports">
              <AccordionTrigger>How do I submit progress reports?</AccordionTrigger>
              <AccordionContent>
                For active grants, go to the "Reports" section, find the grant you need to report on,
                and click "New Report" to complete and submit the required information.
              </AccordionContent>
            </AccordionItem>
          </>
        );
      case "grant_office":
        return (
          <>
            <AccordionItem value="post">
              <AccordionTrigger>How do I post a new grant opportunity?</AccordionTrigger>
              <AccordionContent>
                Go to "Post Opportunity" from the sidebar menu. Complete all details about the grant 
                including eligibility requirements, funding amount, and submission deadlines.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="review">
              <AccordionTrigger>What's the process for reviewing applications?</AccordionTrigger>
              <AccordionContent>
                Access all submitted applications in the "Applications" section. You can review each 
                application, add comments, and update the status as you move through the review process.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="notifications">
              <AccordionTrigger>How do I notify applicants about decisions?</AccordionTrigger>
              <AccordionContent>
                When updating the status of an application in the review system, you can choose to send 
                automated notifications to applicants about their updated application status.
              </AccordionContent>
            </AccordionItem>
          </>
        );
      case "admin":
        return (
          <>
            <AccordionItem value="users">
              <AccordionTrigger>How do I manage user accounts?</AccordionTrigger>
              <AccordionContent>
                Go to "Manage Users" from the sidebar menu. Here you can view all users, edit their roles, 
                activate or deactivate accounts, and create new admin accounts if needed.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="settings">
              <AccordionTrigger>How do I configure system settings?</AccordionTrigger>
              <AccordionContent>
                Access the "Settings" section to manage global configurations, email templates, 
                notification preferences, and other system-wide settings.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="reports">
              <AccordionTrigger>Where can I find system usage reports?</AccordionTrigger>
              <AccordionContent>
                System analytics and usage reports can be found on the Admin dashboard. 
                You can view detailed metrics about applications, grants awarded, and user activity.
              </AccordionContent>
            </AccordionItem>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen">
      <RoleSidebar />
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Help & Support</h1>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader className="bg-red-50">
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-red-600" />
                  Resource Center
                </CardTitle>
                <CardDescription>Access guides and documentation</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-red-600 hover:underline flex items-center gap-2">
                      <HelpCircle className="h-4 w-4" />
                      User Guide
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-red-600 hover:underline flex items-center gap-2">
                      <HelpCircle className="h-4 w-4" />
                      Video Tutorials
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-red-600 hover:underline flex items-center gap-2">
                      <HelpCircle className="h-4 w-4" />
                      FAQ Database
                    </a>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Browse All Resources</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="bg-red-50">
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-red-600" />
                  Contact Support
                </CardTitle>
                <CardDescription>Get personalized assistance</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="mb-4">Support hours: Monday-Friday, 9am-5pm EST</p>
                <p className="mb-2">Email: <a href="mailto:support@augms.edu" className="text-red-600 hover:underline">support@augms.edu</a></p>
                <p>Phone: (555) 123-4567</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Submit Support Ticket</Button>
              </CardFooter>
            </Card>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Common questions for {user?.role}s</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {/* General FAQs for all user types */}
                <AccordionItem value="password">
                  <AccordionTrigger>How do I change my password?</AccordionTrigger>
                  <AccordionContent>
                    Go to Settings and select the "Security" tab. Click on "Change Password" 
                    and follow the prompts to update your password.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="notifications">
                  <AccordionTrigger>How do I manage my notification preferences?</AccordionTrigger>
                  <AccordionContent>
                    Navigate to Settings and select the "Notifications" tab. Here you can toggle 
                    which notifications you'd like to receive and how you'd like to receive them.
                  </AccordionContent>
                </AccordionItem>
                
                {/* Role-specific FAQs */}
                {roleSpecificFAQs()}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
