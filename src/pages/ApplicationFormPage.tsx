import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import RoleSidebar from "@/components/RoleSidebar";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";

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

// Colleges
const colleges = [
  "College of Business",
  "College of Health Sciences",
  "College of Engineering",
  "College of Social Sciences",
  "College of Agriculture",
  "Computer Science",
];

// Grant categories
const grantCategories = [
  "Research",
  "Innovation",
  "Community Outreach",
  "Education",
  "Healthcare",
  "Technology",
];

// Funding sources
const fundingSources = [
  "Internal",
  "External - Government",
  "External - Private",
  "External - NGO",
  "Corporate",
];

const ApplicationFormPage = () => {
  const { opportunityId } = useParams<{ opportunityId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const opportunity = opportunities.find(opp => opp.id === opportunityId);
  
  // State for each tab
  const [activeTab, setActiveTab] = useState("basic");
  const [basicInfo, setBasicInfo] = useState({
    studyTitle: "",
    piName: user?.name || "",
    college: "",
    year: "2025",
    grantCategory: "Research",
    fundingSource: "Internal",
    statementOfPurpose: "",
    background: "",
  });

  const handleBasicInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBasicInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setBasicInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    // Validate current tab
    if (activeTab === "basic") {
      if (!basicInfo.studyTitle || !basicInfo.piName || !basicInfo.college || !basicInfo.statementOfPurpose || !basicInfo.background) {
        toast({
          title: "Missing fields",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }
      
      setActiveTab("objectives");
    } else if (activeTab === "objectives") {
      setActiveTab("activities");
    } else if (activeTab === "activities") {
      setActiveTab("outcomes");
    } else if (activeTab === "outcomes") {
      setActiveTab("budget");
    } else if (activeTab === "budget") {
      setActiveTab("students");
    } else if (activeTab === "students") {
      setActiveTab("references");
    } else {
      // In a real app, you'd submit this to an API
      toast({
        title: "Application submitted",
        description: "Your grant application has been submitted for review",
      });
      
      // Redirect back to dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    }
  };

  const handlePrevious = () => {
    if (activeTab === "objectives") {
      setActiveTab("basic");
    } else if (activeTab === "activities") {
      setActiveTab("objectives");
    } else if (activeTab === "outcomes") {
      setActiveTab("activities");
    } else if (activeTab === "budget") {
      setActiveTab("outcomes");
    } else if (activeTab === "students") {
      setActiveTab("budget");
    } else if (activeTab === "references") {
      setActiveTab("students");
    }
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
                <h1 className="text-2xl font-bold">AU Grant Application Form</h1>
                <p className="text-gray-600">Complete all sections to submit your grant application</p>
                
                {/* Progress bar */}
                <div className="w-full mt-4 bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-red-600 h-2.5 rounded-full" 
                    style={{ 
                      width: activeTab === "basic" ? "15%" : 
                             activeTab === "objectives" ? "30%" :
                             activeTab === "activities" ? "45%" :
                             activeTab === "outcomes" ? "60%" :
                             activeTab === "budget" ? "75%" :
                             activeTab === "students" ? "90%" : "100%" 
                    }}
                  ></div>
                </div>
                
                {/* Tab navigation */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
                  <TabsList className="grid grid-cols-7 w-full">
                    <TabsTrigger value="basic">Basic</TabsTrigger>
                    <TabsTrigger value="objectives">Objectives/Literature</TabsTrigger>
                    <TabsTrigger value="activities">Activities</TabsTrigger>
                    <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
                    <TabsTrigger value="budget">Budget</TabsTrigger>
                    <TabsTrigger value="students">Students Work Plan</TabsTrigger>
                    <TabsTrigger value="references">References</TabsTrigger>
                  </TabsList>
                
                  {/* Basic information tab */}
                  <TabsContent value="basic" className="mt-6">
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="studyTitle" className="block text-sm font-medium text-gray-700 mb-1">
                            Study Title
                          </label>
                          <Input
                            id="studyTitle"
                            name="studyTitle"
                            value={basicInfo.studyTitle}
                            onChange={handleBasicInfoChange}
                            placeholder="Enter the title of your research project"
                            className="w-full"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="piName" className="block text-sm font-medium text-gray-700 mb-1">
                            Principal Investigator (PI) Name
                          </label>
                          <Input
                            id="piName"
                            name="piName"
                            value={basicInfo.piName}
                            onChange={handleBasicInfoChange}
                            className="w-full"
                            required
                            disabled
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="college" className="block text-sm font-medium text-gray-700 mb-1">
                            College Name
                          </label>
                          <Select 
                            value={basicInfo.college} 
                            onValueChange={(value) => handleSelectChange("college", value)}
                          >
                            <SelectTrigger>
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
                        </div>
                        
                        <div>
                          <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                            Year of Application
                          </label>
                          <Select 
                            value={basicInfo.year} 
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
                            Grant Category
                          </label>
                          <Select 
                            value={basicInfo.grantCategory} 
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
                            Funding Source
                          </label>
                          <Select 
                            value={basicInfo.fundingSource} 
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
                          Statement of Purpose (2 sentences max)
                        </label>
                        <Textarea
                          id="statementOfPurpose"
                          name="statementOfPurpose"
                          value={basicInfo.statementOfPurpose}
                          onChange={handleBasicInfoChange}
                          className="w-full"
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">Limited to 2 sentences, approximately 200 characters</p>
                      </div>
                      
                      <div>
                        <label htmlFor="background" className="block text-sm font-medium text-gray-700 mb-1">
                          Background (1 page max)
                        </label>
                        <Textarea
                          id="background"
                          name="background"
                          value={basicInfo.background}
                          onChange={handleBasicInfoChange}
                          className="w-full min-h-[120px]"
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">Limited to approximately 500 words</p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  {/* Other tabs would be implemented similarly */}
                  <TabsContent value="objectives" className="mt-6">
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium">Research Objectives & Literature Review</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Objectives (List up to 3 main objectives)
                        </label>
                        <Textarea 
                          placeholder="Enter your research objectives..."
                          className="w-full min-h-[120px]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Literature Review Summary
                        </label>
                        <Textarea 
                          placeholder="Summarize the relevant literature..."
                          className="w-full min-h-[200px]"
                        />
                        <p className="text-xs text-gray-500 mt-1">Maximum 1000 words</p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="activities" className="mt-6">
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium">Research Activities</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Methodology
                        </label>
                        <Textarea 
                          placeholder="Describe your research methodology..."
                          className="w-full min-h-[150px]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Timeline of Activities
                        </label>
                        <Textarea 
                          placeholder="Outline your project timeline..."
                          className="w-full min-h-[150px]"
                        />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="outcomes" className="mt-6">
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium">Expected Outcomes</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Research Outcomes
                        </label>
                        <Textarea 
                          placeholder="Describe expected research outcomes..."
                          className="w-full min-h-[150px]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Impact and Significance
                        </label>
                        <Textarea 
                          placeholder="Explain the impact and significance of this research..."
                          className="w-full min-h-[150px]"
                        />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="budget" className="mt-6">
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium">Budget</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Budget Summary
                        </label>
                        <Textarea 
                          placeholder="Provide a detailed budget breakdown..."
                          className="w-full min-h-[200px]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Budget Justification
                        </label>
                        <Textarea 
                          placeholder="Explain the necessity of each budget item..."
                          className="w-full min-h-[150px]"
                        />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="students" className="mt-6">
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium">Students Work Plan</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Student Involvement
                        </label>
                        <Textarea 
                          placeholder="Describe how students will be involved in this research..."
                          className="w-full min-h-[150px]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Student Learning Outcomes
                        </label>
                        <Textarea 
                          placeholder="What skills and knowledge will students gain..."
                          className="w-full min-h-[150px]"
                        />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="references" className="mt-6">
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium">References</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Bibliography
                        </label>
                        <Textarea 
                          placeholder="List all references in APA format..."
                          className="w-full min-h-[300px]"
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                
                {/* Navigation buttons */}
                <div className="flex justify-between mt-8">
                  {activeTab !== "basic" && (
                    <Button type="button" variant="outline" onClick={handlePrevious}>
                      Previous
                    </Button>
                  )}
                  {activeTab === "basic" && (
                    <Button type="button" variant="outline" onClick={() => navigate("/opportunities")}>
                      Cancel
                    </Button>
                  )}
                  <Button 
                    type="button" 
                    className="bg-red-600 hover:bg-red-700"
                    onClick={handleNext}
                  >
                    {activeTab === "references" ? "Submit Application" : "Next"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ApplicationFormPage;
