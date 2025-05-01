import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import RoleSidebar from "@/components/RoleSidebar";
import { toast } from "@/hooks/use-toast";

// Mock grant opportunity data
const opportunities = [
  {
    id: "1",
    title: "Climate Change Research Initiative",
    deadline: "June 30, 2025",
    description: "Research exploring innovative solutions to mitigate climate change effects in sub-Saharan Africa.",
    amount: "$75,000",
  },
  {
    id: "2",
    title: "Healthcare Innovation Fund",
    deadline: "July 15, 2025",
    description: "Supporting research in healthcare delivery systems and medical technology advancements.",
    amount: "$120,000",
  },
  // ... other opportunities
];

const ApplicationFormPage = () => {
  const { opportunityId } = useParams<{ opportunityId: string }>();
  const navigate = useNavigate();
  const opportunity = opportunities.find(opp => opp.id === opportunityId);
  
  const [formData, setFormData] = useState({
    projectTitle: "",
    abstract: "",
    budget: "",
    duration: "",
    team: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if all fields are filled
    if (!formData.projectTitle || !formData.abstract || !formData.budget || !formData.duration) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you'd submit this to an API
    toast({
      title: "Application submitted",
      description: "Your grant application has been submitted for review",
    });
    
    // Redirect back to dashboard
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  if (!opportunity) {
    return (
      <div className="flex h-screen bg-gray-50">
        <RoleSidebar />
        <main className="flex-1 p-8">
          <Card>
            <CardContent className="p-6">
              <h1 className="text-xl font-bold mb-4">Opportunity not found</h1>
              <p>The requested opportunity could not be found.</p>
              <Button onClick={() => navigate("/opportunities")} className="mt-4">
                Back to Opportunities
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <RoleSidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <h1 className="text-2xl font-bold">Apply for Grant</h1>
                <p className="text-gray-600">{opportunity.title}</p>
                <div className="flex items-center mt-2">
                  <span className="text-sm bg-red-100 text-red-700 px-2 py-1 rounded">
                    Deadline: {opportunity.deadline}
                  </span>
                  <span className="text-sm font-bold text-red-600 ml-4">
                    {opportunity.amount}
                  </span>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="projectTitle" className="block text-sm font-medium text-gray-700 mb-1">
                    Project Title *
                  </label>
                  <Input
                    id="projectTitle"
                    name="projectTitle"
                    value={formData.projectTitle}
                    onChange={handleChange}
                    className="w-full"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="abstract" className="block text-sm font-medium text-gray-700 mb-1">
                    Project Abstract/Summary *
                  </label>
                  <Textarea
                    id="abstract"
                    name="abstract"
                    value={formData.abstract}
                    onChange={handleChange}
                    className="w-full min-h-[120px]"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                      Requested Budget (USD) *
                    </label>
                    <Input
                      id="budget"
                      name="budget"
                      type="text"
                      value={formData.budget}
                      onChange={handleChange}
                      placeholder="e.g. $35,000"
                      className="w-full"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                      Project Duration (months) *
                    </label>
                    <Input
                      id="duration"
                      name="duration"
                      type="number"
                      value={formData.duration}
                      onChange={handleChange}
                      className="w-full"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="team" className="block text-sm font-medium text-gray-700 mb-1">
                    Research Team (comma separated names)
                  </label>
                  <Input
                    id="team"
                    name="team"
                    value={formData.team}
                    onChange={handleChange}
                    placeholder="e.g. John Doe, Jane Smith"
                    className="w-full"
                  />
                </div>
                
                <div className="flex items-center justify-between pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/opportunities")}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-red-600 hover:bg-red-700">
                    Submit Application
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ApplicationFormPage;
