
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

// Pages
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import DashboardPage from "@/pages/DashboardPage";
import GrantOfficePage from "@/pages/GrantOfficePage";
import AdminPage from "@/pages/AdminPage";
import ApplicationFormPage from "@/pages/ApplicationFormPage";
import OpportunitiesPage from "@/pages/OpportunitiesPage";
import SettingsPage from "@/pages/SettingsPage";
import NotificationsPage from "@/pages/NotificationsPage";
import MyGrantsPage from "@/pages/MyGrantsPage";
import ReportsPage from "@/pages/ReportsPage";
import NewReportPage from "@/pages/NewReportPage";
import CalendarPage from "@/pages/CalendarPage";
import ApplicationsListPage from "@/pages/ApplicationsListPage";
import ApplicationDetailsPage from "@/pages/ApplicationDetailsPage";
import CreateOpportunityPage from "@/pages/CreateOpportunityPage";
import ManageUsersPage from "@/pages/ManageUsersPage";
import NotFound from "@/pages/NotFound";
import PrivateRoute from "@/components/PrivateRoute";

const AppRoutes = () => {
  const { autoLogin } = useAuth();
  
  useEffect(() => {
    autoLogin();
  }, [autoLogin]);
  
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Researcher routes */}
      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute allowedRoles={["researcher"]}>
            <DashboardPage />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/opportunities" 
        element={
          <PrivateRoute allowedRoles={["researcher"]}>
            <OpportunitiesPage />
          </PrivateRoute>
        }
      />
      <Route 
        path="/my-grants" 
        element={
          <PrivateRoute allowedRoles={["researcher"]}>
            <MyGrantsPage />
          </PrivateRoute>
        }
      />
      <Route 
        path="/apply/:id" 
        element={
          <PrivateRoute allowedRoles={["researcher"]}>
            <ApplicationFormPage />
          </PrivateRoute>
        }
      />
      <Route 
        path="/reports" 
        element={
          <PrivateRoute allowedRoles={["researcher"]}>
            <ReportsPage />
          </PrivateRoute>
        }
      />
      <Route 
        path="/new-report/:id" 
        element={
          <PrivateRoute allowedRoles={["researcher"]}>
            <NewReportPage />
          </PrivateRoute>
        }
      />
      <Route 
        path="/calendar" 
        element={
          <PrivateRoute allowedRoles={["researcher"]}>
            <CalendarPage />
          </PrivateRoute>
        }
      />
      <Route 
        path="/researcher/notifications" 
        element={
          <PrivateRoute allowedRoles={["researcher"]}>
            <NotificationsPage />
          </PrivateRoute>
        }
      />
      <Route 
        path="/researcher/settings" 
        element={
          <PrivateRoute allowedRoles={["researcher"]}>
            <SettingsPage />
          </PrivateRoute>
        }
      />
      
      {/* Grant office routes */}
      <Route 
        path="/grant-office" 
        element={
          <PrivateRoute allowedRoles={["grant_office"]}>
            <GrantOfficePage />
          </PrivateRoute>
        }
      />
      <Route 
        path="/create-opportunity" 
        element={
          <PrivateRoute allowedRoles={["grant_office"]}>
            <CreateOpportunityPage />
          </PrivateRoute>
        }
      />
      <Route 
        path="/grant-office/notifications" 
        element={
          <PrivateRoute allowedRoles={["grant_office"]}>
            <NotificationsPage />
          </PrivateRoute>
        }
      />
      <Route 
        path="/grant-office/settings" 
        element={
          <PrivateRoute allowedRoles={["grant_office"]}>
            <SettingsPage />
          </PrivateRoute>
        }
      />
      
      {/* Admin routes */}
      <Route 
        path="/admin" 
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <AdminPage />
          </PrivateRoute>
        }
      />
      <Route 
        path="/manage-users" 
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <ManageUsersPage />
          </PrivateRoute>
        }
      />
      <Route 
        path="/admin/notifications" 
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <NotificationsPage />
          </PrivateRoute>
        }
      />
      <Route 
        path="/admin/settings" 
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <SettingsPage />
          </PrivateRoute>
        }
      />
      
      {/* Shared routes */}
      <Route 
        path="/applications" 
        element={
          <PrivateRoute allowedRoles={["admin", "grant_office"]}>
            <ApplicationsListPage />
          </PrivateRoute>
        }
      />
      <Route 
        path="/applications/:id" 
        element={
          <PrivateRoute allowedRoles={["admin", "grant_office"]}>
            <ApplicationDetailsPage />
          </PrivateRoute>
        }
      />
      
      {/* Fallback route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
