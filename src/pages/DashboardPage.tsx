
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import RoleSidebar from "@/components/RoleSidebar";
import { useAuth } from "@/context/AuthContext";

type StatsCardProps = {
  title: string;
  value: string | number;
};

const StatsCard: React.FC<StatsCardProps> = ({ title, value }) => (
  <Card>
    <CardContent className="p-6">
      <h3 className="text-gray-600 text-sm mb-2">{title}</h3>
      <div className="text-3xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

type ActionCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  to: string;
};

const ActionCard: React.FC<ActionCardProps> = ({ icon, title, description, to }) => (
  <Link to={to} className="block">
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6 text-center">
        <div className="flex justify-center mb-4 text-gray-600">{icon}</div>
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </CardContent>
    </Card>
  </Link>
);

type GrantCardProps = {
  title: string;
  description: string;
  amount: string;
  date: string;
  status: "active" | "under review" | "completed" | "rejected";
};

const GrantCard: React.FC<GrantCardProps> = ({ title, description, amount, date, status }) => {
  const statusColors = {
    active: "bg-green-100 text-green-800",
    "under review": "bg-yellow-100 text-yellow-800",
    completed: "bg-blue-100 text-blue-800",
    rejected: "bg-red-100 text-red-800",
  };

  return (
    <Card className="mb-4">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg mb-1">{title}</h3>
            <p className="text-gray-600 mb-2">{description}</p>
            <div className="flex items-center justify-between">
              <p className="font-bold text-gray-800">{amount}</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
            {status}
          </span>
        </div>
        <div className="mt-4 text-sm text-gray-500">{date}</div>
      </CardContent>
    </Card>
  );
};

const DashboardPage = () => {
  const { user } = useAuth();
  
  return (
    <div className="flex h-screen bg-gray-50">
      <RoleSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
              <p className="text-gray-600">Researcher Dashboard</p>
            </div>
          </div>

          {/* Quick Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <ActionCard
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
              title="Find Opportunities"
              description="Browse available grants"
              to="/opportunities"
            />
            <ActionCard
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
              title="Submit Report"
              description="For active grants"
              to="/reports/new"
            />
            <ActionCard
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
              title="View Calendar"
              description="See upcoming deadlines"
              to="/calendar"
            />
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatsCard title="Active Grants" value="1" />
            <StatsCard title="Total Funding" value="$35,000" />
            <StatsCard title="Pending Applications" value="1" />
          </div>

          {/* Active Grants */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Active Grants</h2>
            </div>
            <GrantCard
              title="Agricultural Innovation for Climate Change Adaptation"
              description="Research on drought-resistant crop varieties for sustainable agriculture in Zimbabwe."
              amount="$35,000"
              date="2024-05-01 - 2025-05-01"
              status="active"
            />
          </div>

          {/* Pending Applications */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Pending Applications</h2>
            </div>
            <GrantCard
              title="Renewable Energy Solutions for Rural Communities"
              description="Development of affordable solar energy systems for rural Zimbabwe."
              amount="$42,000"
              date="Submitted: May 1, 2025"
              status="under review"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
