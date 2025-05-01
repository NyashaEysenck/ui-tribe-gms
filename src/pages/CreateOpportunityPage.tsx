
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import RoleSidebar from "@/components/RoleSidebar";
import { toast } from "@/hooks/use-toast";

const CreateOpportunityPage = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    deadlineDate: "",
    category: "",
    eligibility: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if all fields are filled
    if (!formData.title || !formData.description || !formData.amount || !formData.deadlineDate) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you'd submit this to an API
    toast({
      title: "Opportunity created",
      description: "Your grant opportunity has been published",
    });
    
    // Redirect back to grant office dashboard
    setTimeout(() => {
      navigate("/grant-office");
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
                <h1 className="text-2xl font-bold">Post New Grant Opportunity</h1>
                <p className="text-gray-600">Create a new funding opportunity for researchers</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Opportunity Title *
                  </label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full min-h-[120px]"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                      Grant Amount (USD) *
                    </label>
                    <Input
                      id="amount"
                      name="amount"
                      type="text"
                      value={formData.amount}
                      onChange={handleChange}
                      placeholder="e.g. $50,000"
                      className="w-full"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="deadlineDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Application Deadline *
                    </label>
                    <Input
                      id="deadlineDate"
                      name="deadlineDate"
                      type="date"
                      value={formData.deadlineDate}
                      onChange={handleChange}
                      className="w-full"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <Select 
                    onValueChange={(value) => handleSelectChange("category", value)} 
                    defaultValue={formData.category}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="agriculture">Agriculture</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="environment">Environment</SelectItem>
                      <SelectItem value="social">Social Sciences</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label htmlFor="eligibility" className="block text-sm font-medium text-gray-700 mb-1">
                    Eligibility Criteria
                  </label>
                  <Textarea
                    id="eligibility"
                    name="eligibility"
                    value={formData.eligibility}
                    onChange={handleChange}
                    placeholder="Describe who is eligible to apply"
                    className="w-full"
                  />
                </div>
                
                <div className="flex items-center justify-between pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/grant-office")}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-red-600 hover:bg-red-700">
                    Publish Opportunity
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

export default CreateOpportunityPage;
