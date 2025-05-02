
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RoleSidebar from "@/components/RoleSidebar";
import { useAuth } from "@/context/AuthContext";
import { FileText, Plus, Download, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

type ReportType = "Progress" | "Financial" | "Final";

type ReportStatus = "Approved" | "Pending Review" | "Needs Revision";

interface Report {
  id: string;
  title: string;
  grantId: string;
  type: ReportType;
  date: string;
  status: ReportStatus;
}

const ReportsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("my-reports");
  
  // Mock reports data
  const reports: Report[] = [
    {
      id: "1",
      title: "Climate Change Adaptation Research Progress",
      grantId: "AU-2023-001",
      type: "Progress",
      date: "2023-11-15",
      status: "Approved"
    },
    {
      id: "2",
      title: "Renewable Energy Solutions for Rural Areas",
      grantId: "AU-2023-005",
      type: "Financial",
      date: "2023-10-22",
      status: "Pending Review"
    },
    {
      id: "3",
      title: "Agricultural Technology Impact Assessment",
      grantId: "AU-2022-015",
      type: "Final",
      date: "2023-09-05",
      status: "Needs Revision"
    },
    {
      id: "4",
      title: "Public Health Intervention Study Quarterly Update",
      grantId: "AU-2023-008",
      type: "Progress",
      date: "2023-12-01",
      status: "Pending Review"
    }
  ];

  const getStatusBadge = (status: ReportStatus) => {
    const statusColors: Record<ReportStatus, string> = {
      "Approved": "bg-green-100 text-green-800",
      "Pending Review": "bg-yellow-100 text-yellow-800",
      "Needs Revision": "bg-red-100 text-red-800"
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
        {status}
      </span>
    );
  };
  
  return (
    <div className="flex h-screen bg-gray-50">
      <RoleSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold">Reports</h1>
              <p className="text-gray-600">View and manage your grant-related reports</p>
            </div>
            <Button className="bg-red-600 hover:bg-red-700 flex items-center gap-2" onClick={() => navigate("/reports/new")}>
              <Plus size={16} />
              New Report
            </Button>
          </div>
          
          <Tabs defaultValue="my-reports" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="my-reports">My Reports</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
            </TabsList>
            
            <TabsContent value="my-reports">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold">My Submitted Reports</h2>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Filter size={14} />
                        Filter
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Download size={14} />
                        Export
                      </Button>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Title</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Grant ID</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Type</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reports.map(report => (
                          <tr key={report.id} className="border-b hover:bg-gray-50">
                            <td className="py-4 px-4">
                              <div className="flex items-start gap-3">
                                <div className="bg-gray-100 p-2 rounded">
                                  <FileText className="h-5 w-5 text-gray-500" />
                                </div>
                                <div>
                                  <p className="font-medium">{report.title}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4">{report.grantId}</td>
                            <td className="py-4 px-4">{report.type}</td>
                            <td className="py-4 px-4">{new Date(report.date).toLocaleDateString()}</td>
                            <td className="py-4 px-4">{getStatusBadge(report.status)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="templates">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Report Templates</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {["Progress Report", "Financial Report", "Final Report"].map((template, index) => (
                      <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardContent className="p-4 flex flex-col items-center text-center">
                          <FileText className="h-12 w-12 text-red-600 mb-3" />
                          <h4 className="font-medium mb-1">{template}</h4>
                          <p className="text-sm text-gray-500 mb-3">Standard {template.toLowerCase()} template</p>
                          <Button variant="outline" size="sm">Download Template</Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="scheduled">
              <Card>
                <CardContent className="p-6 text-center py-12">
                  <FileText className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Scheduled Reports</h3>
                  <p className="text-gray-500 mb-6">You don't have any scheduled reports at the moment.</p>
                  <Button className="bg-red-600 hover:bg-red-700">Schedule a Report</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default ReportsPage;
