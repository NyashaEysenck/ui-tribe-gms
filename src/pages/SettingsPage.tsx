
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RoleSidebar from "@/components/RoleSidebar";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const { user } = useAuth();
  
  const [accountData, setAccountData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    department: user?.department || "Computer Science",
    position: user?.position || "Associate Professor",
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    applicationUpdates: true,
    deadlineReminders: true,
    reportReminders: true,
  });
  
  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSecuritySettings(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSaveAccount = () => {
    toast({
      title: "Account information updated",
      description: "Your account information has been saved successfully",
    });
  };
  
  const handleSaveNotifications = () => {
    toast({
      title: "Notification preferences updated",
      description: "Your notification settings have been saved successfully",
    });
  };
  
  const handleSaveSecurity = () => {
    if (securitySettings.newPassword !== securitySettings.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Your new password and confirmation do not match",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Security settings updated",
      description: "Your password has been changed successfully",
    });
    
    setSecuritySettings({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };
  
  return (
    <div className="flex h-screen bg-gray-50">
      <RoleSidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-gray-600">Manage your account settings and preferences</p>
          </div>
          
          <Tabs defaultValue="account">
            <TabsList className="mb-6">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>
            
            <TabsContent value="account">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Account Information</h2>
                  <p className="text-gray-600 mb-6">Manage your personal account details</p>
                  
                  <div className="space-y-6 max-w-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={accountData.fullName}
                          onChange={handleAccountChange}
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={accountData.email}
                          onChange={handleAccountChange}
                          className="w-full"
                          readOnly
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                          Department
                        </label>
                        <Input
                          id="department"
                          name="department"
                          value={accountData.department}
                          onChange={handleAccountChange}
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                          Position
                        </label>
                        <Input
                          id="position"
                          name="position"
                          value={accountData.position}
                          onChange={handleAccountChange}
                          className="w-full"
                        />
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button 
                        className="bg-red-600 hover:bg-red-700"
                        onClick={handleSaveAccount}
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Notification Settings</h2>
                  <p className="text-gray-600 mb-6">Control how you receive notifications</p>
                  
                  <div className="space-y-6 max-w-2xl">
                    <div className="flex items-center justify-between pb-4 border-b">
                      <div>
                        <h3 className="font-medium">Email Notifications</h3>
                        <p className="text-sm text-gray-500">Receive email notifications</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="emailNotifications"
                          checked={notificationSettings.emailNotifications}
                          onChange={handleNotificationChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between pb-4 border-b">
                      <div>
                        <h3 className="font-medium">Application Updates</h3>
                        <p className="text-sm text-gray-500">Notifications about your grant applications</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="applicationUpdates"
                          checked={notificationSettings.applicationUpdates}
                          onChange={handleNotificationChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between pb-4 border-b">
                      <div>
                        <h3 className="font-medium">Deadline Reminders</h3>
                        <p className="text-sm text-gray-500">Reminders about upcoming grant deadlines</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="deadlineReminders"
                          checked={notificationSettings.deadlineReminders}
                          onChange={handleNotificationChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between pb-4">
                      <div>
                        <h3 className="font-medium">Report Reminders</h3>
                        <p className="text-sm text-gray-500">Reminders about report submission deadlines</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="reportReminders"
                          checked={notificationSettings.reportReminders}
                          onChange={handleNotificationChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                    
                    <div className="pt-4">
                      <Button 
                        className="bg-red-600 hover:bg-red-700"
                        onClick={handleSaveNotifications}
                      >
                        Save Preferences
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Security Settings</h2>
                  <p className="text-gray-600 mb-6">Update your password and security preferences</p>
                  
                  <div className="space-y-6 max-w-md">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <Input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        value={securitySettings.currentPassword}
                        onChange={handleSecurityChange}
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={securitySettings.newPassword}
                        onChange={handleSecurityChange}
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                      </label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={securitySettings.confirmPassword}
                        onChange={handleSecurityChange}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="pt-4">
                      <Button 
                        className="bg-red-600 hover:bg-red-700"
                        onClick={handleSaveSecurity}
                      >
                        Update Password
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="preferences">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">User Preferences</h2>
                  <p className="text-gray-600 mb-6">Customize your experience</p>
                  
                  <div className="space-y-6 max-w-2xl">
                    {/* Placeholder for preferences */}
                    <p className="text-center text-gray-500 py-8">Preference settings coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
