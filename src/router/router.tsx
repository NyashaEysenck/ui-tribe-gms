
import { createBrowserRouter } from "react-router-dom";

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
import App from "@/App";

// This router is kept for reference but we're now using React Router v6 
// component-based routing in AppRoutes.tsx
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);
