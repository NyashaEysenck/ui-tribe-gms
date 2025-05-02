
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import RoleSidebar from "@/components/RoleSidebar";
import { useAuth } from "@/context/AuthContext";
import { Bell, Search } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: "general" | "application" | "deadline" | "report";
}

const NotificationsPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock notifications
  const notifications: Notification[] = [
    {
      id: "1",
      title: "New Grant Opportunity Posted",
      message: "A new grant opportunity has been posted: Climate Change Research Initiative.",
      date: "2025-05-02",
      read: false,
      type: "general"
    },
    {
      id: "2",
      title: "Application Status Update",
      message: "Your application for Healthcare Innovation Fund has been approved.",
      date: "2025-04-30",
      read: true,
      type: "application"
    },
    {
      id: "3",
      title: "Upcoming Deadline",
      message: "Reminder: The deadline for the Climate Change Research Initiative is approaching (June 30, 2025).",
      date: "2025-04-28",
      read: false,
      type: "deadline"
    },
    {
      id: "4",
      title: "Report Due Soon",
      message: "Progress report for your Agricultural Innovation grant is due in 7 days.",
      date: "2025-04-25",
      read: false,
      type: "report"
    }
  ];
  
  // Filter notifications based on active tab and search query
  const filteredNotifications = notifications.filter(notification => {
    const matchesTab = 
      activeTab === "all" || 
      (activeTab === "unread" && !notification.read) ||
      (activeTab === "deadlines" && notification.type === "deadline") ||
      (activeTab === "status" && (notification.type === "application" || notification.type === "report"));
    
    const matchesSearch = 
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  return (
    <div className="flex h-screen bg-gray-50">
      <RoleSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Notifications</h1>
            <p className="text-gray-600">Stay updated with important information and alerts</p>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
                <TabsTrigger value="deadlines">Deadlines</TabsTrigger>
                <TabsTrigger value="status">Status</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-64"
              />
            </div>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">Notifications</h2>
              <p className="text-gray-500 text-sm mb-6">{filteredNotifications.length} notifications</p>
              
              {filteredNotifications.length > 0 ? (
                <div className="space-y-4">
                  {filteredNotifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`p-4 border-l-4 ${notification.read ? 'border-gray-300 bg-white' : 'border-red-500 bg-red-50'} rounded-r-lg`}
                    >
                      <div className="flex justify-between items-start">
                        <h3 className={`font-medium ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                          {notification.title}
                        </h3>
                        <span className="text-xs text-gray-500">{new Date(notification.date).toLocaleDateString()}</span>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Bell className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium mb-2">No notifications</h3>
                  <p className="text-gray-500">You don't have any notifications at the moment.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default NotificationsPage;
