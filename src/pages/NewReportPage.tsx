
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import RoleSidebar from "@/components/RoleSidebar";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Upload } from "lucide-react";

const NewReportPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    title: "",
    grantId: "",
    reportType: "",
    period: "",
    summary: "",
    challenges: "",
    nextSteps: "",
    file: null as File | null
  });

  // Mock grants for the select field
  const activeGrants = [
    { id: "AU-2023-001", title: "Climate Change Adaptation Research" },
    { id: "AU-2023-005", title: "Renewable Energy Solutions for Rural Areas" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if all required fields are filled
    if (!formData.title || !formData.grantId || !formData.reportType || !formData.summary) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you'd submit this to an API
    toast({
      title: "Report submitted",
      description: "Your report has been submitted successfully",
    });
    
    // Redirect back to reports page
    setTimeout(() => {
      navigate("/reports");
    }, 1500);
  };
  
  return (
    <div className="flex h-screen bg-gray-50">
      <RoleSidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <h1 className="text-2xl font-bold">Submit New Report</h1>
                <p className="text-gray-600">Complete the form to submit a new grant report</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Report Title *
                  </label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="grantId" className="block text-sm font-medium text-gray-700 mb-1">
                      Select Grant *
                    </label>
                    <Select 
                      value={formData.grantId} 
                      onValueChange={(value) => handleSelectChange("grantId", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a grant" />
                      </SelectTrigger>
                      <SelectContent>
                        {activeGrants.map((grant) => (
                          <SelectItem key={grant.id} value={grant.id}>
                            {grant.title} ({grant.id})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label htmlFor="reportType" className="block text-sm font-medium text-gray-700 mb-1">
                      Report Type *
                    </label>
                    <Select 
                      value={formData.reportType} 
                      onValueChange={(value) => handleSelectChange("reportType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="progress">Progress Report</SelectItem>
                        <SelectItem value="financial">Financial Report</SelectItem>
                        <SelectItem value="final">Final Report</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="period" className="block text-sm font-medium text-gray-700 mb-1">
                    Reporting Period
                  </label>
                  <Input
                    id="period"
                    name="period"
                    value={formData.period}
                    onChange={handleInputChange}
                    placeholder="e.g., January 2025 - March 2025"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
                    Summary of Activities/Progress *
                  </label>
                  <Textarea
                    id="summary"
                    name="summary"
                    value={formData.summary}
                    onChange={handleInputChange}
                    className="w-full min-h-[150px]"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="challenges" className="block text-sm font-medium text-gray-700 mb-1">
                    Challenges Encountered
                  </label>
                  <Textarea
                    id="challenges"
                    name="challenges"
                    value={formData.challenges}
                    onChange={handleInputChange}
                    className="w-full min-h-[100px]"
                  />
                </div>
                
                <div>
                  <label htmlFor="nextSteps" className="block text-sm font-medium text-gray-700 mb-1">
                    Next Steps/Future Plans
                  </label>
                  <Textarea
                    id="nextSteps"
                    name="nextSteps"
                    value={formData.nextSteps}
                    onChange={handleInputChange}
                    className="w-full min-h-[100px]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Supporting Documents
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-2">
                      Drag and drop files here, or click to select files
                    </p>
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById('file-upload')?.click()}
                    >
                      Select Files
                    </Button>
                    {formData.file && (
                      <p className="mt-2 text-sm text-gray-600">Selected: {formData.file.name}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/reports")}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-red-600 hover:bg-red-700">
                    Submit Report
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

export default NewReportPage;
