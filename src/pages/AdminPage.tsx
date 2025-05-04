
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import RoleSidebar from "@/components/RoleSidebar";
import { useAuth } from "@/context/AuthContext";
import { BarChart2, Users, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";

type StatsCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description: string;
};

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, description }) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-gray-600 text-sm mb-1">{title}</h3>
          <div className="text-3xl font-bold">{value}</div>
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        </div>
        <div className="text-red-600">{icon}</div>
      </div>
    </CardContent>
  </Card>
);

const AdminPage = () => {
  const { user } = useAuth();

  return (
    <div className="flex h-screen bg-gray-50">
      <RoleSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome, {user?.name}</p>
            </div>
            <div className="hidden md:block">
              <Logo size="md" variant="clean" withText={true} />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatsCard 
              title="Total Users" 
              value={42} 
              icon={<Users size={24} />}
              description="Active researchers and grant office users"
            />
            <StatsCard 
              title="Open Opportunities" 
              value={9} 
              icon={<FileText size={24} />}
              description="Currently active grant opportunities"
            />
            <StatsCard 
              title="Applications" 
              value={27} 
              icon={<BarChart2 size={24} />}
              description="Submissions awaiting review"
            />
          </div>

          {/* Recent Actions */}
          <div className="mb-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">System Overview</h2>
                <div className="space-y-4">
                  <Link to="/manage-users" className="block p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">User Management</h3>
                        <p className="text-sm text-gray-500">Manage user accounts and permissions</p>
                      </div>
                      <Users className="text-gray-400" />
                    </div>
                  </Link>
                  
                  <Link to="/applications" className="block p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">Application Review</h3>
                        <p className="text-sm text-gray-500">Review and approve grant applications</p>
                      </div>
                      <FileText className="text-gray-400" />
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
