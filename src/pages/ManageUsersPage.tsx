
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import RoleSidebar from "@/components/RoleSidebar";
import { Search, UserPlus, Users } from "lucide-react";
import { DEMO_USERS } from "@/context/AuthContext";
import { UserRole } from "@/types/user";

// Mock users data - extending the demo users
const mockUsers = [
  ...DEMO_USERS,
  {
    id: "4",
    email: "tendai@africau.edu",
    name: "Tendai Moyo",
    role: "researcher" as UserRole,
  },
  {
    id: "5",
    email: "farai@africau.edu",
    name: "Farai Chigumba",
    role: "researcher" as UserRole,
  },
  {
    id: "6",
    email: "chido@africau.edu",
    name: "Chido Mutasa",
    role: "researcher" as UserRole,
  },
  {
    id: "7",
    email: "grant2@africau.edu",
    name: "Samuel Ndlovu",
    role: "grant_office" as UserRole,
  },
];

const ManageUsersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  
  // Filter users based on search and role
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });
  
  const getRoleBadge = (role: UserRole) => {
    const roleColors: Record<UserRole, string> = {
      admin: "bg-purple-100 text-purple-800",
      grant_office: "bg-blue-100 text-blue-800",
      researcher: "bg-green-100 text-green-800",
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${roleColors[role]}`}>
        {role.replace('_', ' ')}
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
              <h1 className="text-2xl font-bold">Manage Users</h1>
              <p className="text-gray-600">View and manage user accounts</p>
            </div>
            
            <Button className="bg-red-600 hover:bg-red-700 flex items-center gap-2">
              <UserPlus size={16} />
              Add New User
            </Button>
          </div>
          
          {/* Filters */}
          <div className="mb-6 flex flex-wrap gap-4 items-center">
            <div className="flex items-center relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-64"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Role:</span>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="grant_office">Grant Office</SelectItem>
                  <SelectItem value="researcher">Researcher</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Users List */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Name</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Email</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Role</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-500"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(user => (
                      <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-3">
                              {user.name.charAt(0)}
                            </div>
                            {user.name}
                          </div>
                        </td>
                        <td className="py-3 px-4">{user.email}</td>
                        <td className="py-3 px-4">{getRoleBadge(user.role)}</td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">Edit</Button>
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

export default ManageUsersPage;
