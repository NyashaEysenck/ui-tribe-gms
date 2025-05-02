
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RoleSidebar from "@/components/RoleSidebar";
import { useAuth } from "@/context/AuthContext";
import { FileText, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface Grant {
  id: string;
  project: string;
  amount: string;
  startDate: string;
  endDate: string;
  status: "draft" | "pending" | "active" | "completed" | "rejected";
}

const MyGrantsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  
  // Mock grants data (empty for initial state)
  const grants: Grant[] = [];
  
  // Filter grants based on active tab
  const filteredGrants = grants.filter(grant => {
    if (activeTab === "all") return true;
    if (activeTab === "draft-pending") return grant.status === "draft" || grant.status === "pending";
    if (activeTab === "active") return grant.status === "active";
    if (activeTab === "completed") return grant.status === "completed";
    return true;
  });

  return (
    <div className="flex h-screen bg-gray-50">
      <RoleSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold">My Grants</h1>
              <p className="text-gray-600">Manage your grant applications and awards</p>
            </div>
            <Button 
              className="bg-red-600 hover:bg-red-700 flex items-center gap-2"
              onClick={() => navigate("/opportunities")}
            >
              <Plus size={16} />
              Start New Application
            </Button>
          </div>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6 grid w-full grid-cols-4">
              <TabsTrigger value="all">All Grants <span className="ml-2 bg-gray-200 text-gray-800 text-xs px-2 py-0.5 rounded-full">{grants.length}</span></TabsTrigger>
              <TabsTrigger value="draft-pending">Drafts & Pending <span className="ml-2 bg-gray-200 text-gray-800 text-xs px-2 py-0.5 rounded-full">{grants.filter(g => g.status === "draft" || g.status === "pending").length}</span></TabsTrigger>
              <TabsTrigger value="active">Active <span className="ml-2 bg-gray-200 text-gray-800 text-xs px-2 py-0.5 rounded-full">{grants.filter(g => g.status === "active").length}</span></TabsTrigger>
              <TabsTrigger value="completed">Completed <span className="ml-2 bg-gray-200 text-gray-800 text-xs px-2 py-0.5 rounded-full">{grants.filter(g => g.status === "completed").length}</span></TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab}>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">All Grants</h2>
                  <p className="text-gray-600 text-sm mb-6">All your grant applications and awards</p>
                  
                  {filteredGrants.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Project</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Amount</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Dates</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredGrants.map(grant => (
                            <tr key={grant.id} className="border-b hover:bg-gray-50">
                              <td className="py-4 px-4">{grant.project}</td>
                              <td className="py-4 px-4">{grant.amount}</td>
                              <td className="py-4 px-4">{new Date(grant.startDate).toLocaleDateString()} - {new Date(grant.endDate).toLocaleDateString()}</td>
                              <td className="py-4 px-4">
                                <span className={`
                                  px-2 py-1 rounded-full text-xs font-medium
                                  ${grant.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                                  ${grant.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                                  ${grant.status === 'draft' ? 'bg-gray-100 text-gray-800' : ''}
                                  ${grant.status === 'completed' ? 'bg-blue-100 text-blue-800' : ''}
                                  ${grant.status === 'rejected' ? 'bg-red-100 text-red-800' : ''}
                                `}>
                                  {grant.status.charAt(0).toUpperCase() + grant.status.slice(1)}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-16 flex flex-col items-center">
                      <FileText className="h-16 w-16 text-gray-300 mb-4" />
                      <h3 className="text-xl font-medium mb-4">No Grants Found</h3>
                      <p className="text-gray-500 mb-8">You haven't created any grant applications yet. Click the "Start New Application" button to begin.</p>
                      <Button 
                        className="bg-red-600 hover:bg-red-700 flex items-center gap-2"
                        onClick={() => navigate("/opportunities")}
                      >
                        <Plus size={16} />
                        Start New Application
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default MyGrantsPage;
