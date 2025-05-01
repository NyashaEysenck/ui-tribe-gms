
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import RoleSidebar from "@/components/RoleSidebar";
import { toast } from "@/hooks/use-toast";
import { Check, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

// Mock applications data
const applications = [
  {
    id: "1",
    title: "Agricultural Innovation for Climate Change Adaptation",
    researcher: "Nyasha Gandah",
    department: "Environmental Sciences",
    submissionDate: "2025-05-01",
    status: "pending",
    amount: "$35,000",
    abstract: "This research project aims to develop drought-resistant crop varieties that can thrive in the changing climate conditions of Zimbabwe. The study will focus on traditional crops and modern breeding techniques to create sustainable solutions for small-scale farmers.",
    projectDuration: "12 months",
    methodology: "Field experiments, laboratory analysis, and community engagement with local farmers will be conducted to test and validate new crop varieties.",
  },
  {
    id: "2",
    title: "Healthcare Access in Rural Communities",
    researcher: "Tendai Moyo",
    department: "Public Health",
    submissionDate: "2025-04-28",
    status: "approved",
    amount: "$42,000",
    abstract: "This project aims to improve healthcare access in rural Zimbabwean communities through mobile health clinics and telemedicine solutions.",
    projectDuration: "18 months",
    methodology: "Surveys, pilot deployments of mobile clinics, and statistical analysis of health outcomes in target communities.",
  },
  // Add other applications as needed
];

const ApplicationDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const application = applications.find(app => app.id === id);
  
  const [feedback, setFeedback] = useState("");
  
  if (!application) {
    return (
      <div className="flex h-screen bg-gray-50">
        <RoleSidebar />
        <main className="flex-1 p-8">
          <Card>
            <CardContent className="p-6">
              <h1 className="text-xl font-bold mb-4">Application not found</h1>
              <p>The requested application could not be found.</p>
              <Button onClick={() => navigate("/applications")} className="mt-4">
                Back to Applications
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }
  
  const handleApprove = () => {
    toast({
      title: "Application approved",
      description: "The grant application has been approved",
    });
    
    setTimeout(() => {
      navigate("/applications");
    }, 1500);
  };
  
  const handleReject = () => {
    if (!feedback.trim()) {
      toast({
        title: "Feedback required",
        description: "Please provide feedback before rejecting the application",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Application rejected",
      description: "The grant application has been rejected",
    });
    
    setTimeout(() => {
      navigate("/applications");
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <RoleSidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold">{application.title}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-gray-600">Submitted by {application.researcher}</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-500">{new Date(application.submissionDate).toLocaleDateString()}</span>
              </div>
            </div>
            <div>
              {application.status === "pending" && user?.role !== "researcher" && (
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="border-red-200 text-red-600 hover:bg-red-50"
                    onClick={handleReject}
                  >
                    <X size={16} className="mr-1" /> Reject
                  </Button>
                  <Button 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={handleApprove}
                  >
                    <Check size={16} className="mr-1" /> Approve
                  </Button>
                </div>
              )}
              {application.status !== "pending" && (
                <div className={`
                  px-3 py-1 rounded-full text-sm font-medium
                  ${application.status === "approved" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                `}>
                  {application.status}
                </div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content - 2/3 width */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Project Abstract</h2>
                  <p className="text-gray-700">{application.abstract}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Methodology</h2>
                  <p className="text-gray-700">{application.methodology}</p>
                </CardContent>
              </Card>
              
              {application.status === "pending" && user?.role !== "researcher" && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Reviewer Feedback</h2>
                    <Textarea
                      placeholder="Enter your feedback or comments here..."
                      className="min-h-[120px]"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                    />
                  </CardContent>
                </Card>
              )}
            </div>
            
            {/* Sidebar - 1/3 width */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Application Details</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Department</h3>
                      <p>{application.department}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Requested Amount</h3>
                      <p className="text-lg font-bold text-red-600">{application.amount}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Project Duration</h3>
                      <p>{application.projectDuration}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Submission Date</h3>
                      <p>{new Date(application.submissionDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApplicationDetailsPage;
