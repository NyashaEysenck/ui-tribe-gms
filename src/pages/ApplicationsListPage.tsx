
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import RoleSidebar from "@/components/RoleSidebar";
import { useAuth } from "@/context/AuthContext";
import { Search } from "lucide-react";

// Mock application data
const applications = [
  {
    id: "1",
    title: "Agricultural Innovation for Climate Change Adaptation",
    researcher: "Nyasha Gandah",
    department: "Environmental Sciences",
    submissionDate: "2025-05-01",
    status: "pending",
    amount: "$35,000",
  },
  {
    id: "2",
    title: "Healthcare Access in Rural Communities",
    researcher: "Tendai Moyo",
    department: "Public Health",
    submissionDate: "2025-04-28",
    status: "approved",
    amount: "$42,000",
  },
  {
    id: "3",
    title: "Educational Technology for Remote Learning",
    researcher: "Farai Chigumba",
    department: "Education",
    submissionDate: "2025-04-25",
    status: "rejected",
    amount: "$28,000",
  },
  {
    id: "4",
    title: "Renewable Energy Solutions for Rural Areas",
    researcher: "Chido Mutasa",
    department: "Engineering",
    submissionDate: "2025-04-20",
    status: "pending",
    amount: "$50,000",
  },
];

const ApplicationsListPage = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter applications based on status and search query
  const filteredApplications = applications.filter(app => {
    const matchesFilter = filter === "all" || app.status === filter;
    const matchesSearch = app.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         app.researcher.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
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
              <h1 className="text-2xl font-bold">Grant Applications</h1>
              <p className="text-gray-600">Review and manage submitted applications</p>
            </div>
          </div>
          
          {/* Filters */}
          <div className="mb-6 flex flex-wrap gap-4 items-center">
            <div className="flex items-center relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search applications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-64"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Status:</span>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Applications List */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Project Title</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Researcher</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Department</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Amount</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-500"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplications.map(application => (
                      <tr key={application.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{application.title}</td>
                        <td className="py-3 px-4">{application.researcher}</td>
                        <td className="py-3 px-4">{application.department}</td>
                        <td className="py-3 px-4">{application.amount}</td>
                        <td className="py-3 px-4">{new Date(application.submissionDate).toLocaleDateString()}</td>
                        <td className="py-3 px-4">{getStatusBadge(application.status)}</td>
                        <td className="py-3 px-4 text-right">
                          <Link 
                            to={`/application/${application.id}`}
                            className="text-red-600 hover:text-red-800 font-medium text-sm"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ApplicationsListPage;
