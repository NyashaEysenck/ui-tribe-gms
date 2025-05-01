
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RoleSidebar from "@/components/RoleSidebar";
import { useAuth } from "@/context/AuthContext";
import { FilePlus, FileText, BarChart2 } from "lucide-react";
import { Link } from "react-router-dom";

type StatsCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
};

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon }) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-gray-600 text-sm mb-2">{title}</h3>
          <div className="text-3xl font-bold">{value}</div>
        </div>
        <div className="text-red-600">{icon}</div>
      </div>
    </CardContent>
  </Card>
);

type ApplicationCardProps = {
  title: string;
  applicant: string;
  date: string;
  status: "pending" | "approved" | "rejected";
};

const ApplicationCard: React.FC<ApplicationCardProps> = ({ title, applicant, date, status }) => {
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  return (
    <Card className="mb-4">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg mb-1">{title}</h3>
            <p className="text-gray-600 mb-2">Applicant: {applicant}</p>
            <p className="text-sm text-gray-500">{date}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
            {status}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

const GrantOfficePage = () => {
  const { user } = useAuth();

  return (
    <div className="flex h-screen bg-gray-50">
      <RoleSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold">Grant Office Dashboard</h1>
              <p className="text-gray-600">Welcome, {user?.name}</p>
            </div>

            <Link to="/create-opportunity">
              <Button className="bg-red-600 hover:bg-red-700 flex items-center gap-2">
                <FilePlus size={16} />
                Post New Opportunity
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatsCard 
              title="Active Opportunities" 
              value={9} 
              icon={<FilePlus size={24} />}
            />
            <StatsCard 
              title="Pending Applications" 
              value={12} 
              icon={<FileText size={24} />} 
            />
            <StatsCard 
              title="Approved Grants" 
              value={8} 
              icon={<BarChart2 size={24} />} 
            />
          </div>

          {/* Recent Applications */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Recent Applications</h2>
              <Link to="/applications" className="text-sm text-red-600 hover:text-red-800">
                View All Applications
              </Link>
            </div>
            
            <ApplicationCard
              title="Agricultural Sustainability Research"
              applicant="Nyasha Gandah"
              date="Submitted: May 1, 2025"
              status="pending"
            />
            
            <ApplicationCard
              title="Climate Change Impact Study"
              applicant="Tendai Moyo"
              date="Submitted: April 28, 2025"
              status="approved"
            />
            
            <ApplicationCard
              title="Educational Technology Initiative"
              applicant="Farai Chigumba"
              date="Submitted: April 25, 2025"
              status="rejected"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default GrantOfficePage;
