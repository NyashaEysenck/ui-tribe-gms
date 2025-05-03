
import { createBrowserRouter } from "react-router-dom";
import App from "@/App";

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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/dashboard",
        element: <PrivateRoute allowedRoles={["researcher"]}><DashboardPage /></PrivateRoute>,
      },
      {
        path: "/admin",
        element: <PrivateRoute allowedRoles={["admin"]}><AdminPage /></PrivateRoute>,
      },
      {
        path: "/grant-office",
        element: <PrivateRoute allowedRoles={["grant_office"]}><GrantOfficePage /></PrivateRoute>,
      },
      {
        path: "/apply/:id",
        element: <PrivateRoute allowedRoles={["researcher"]}><ApplicationFormPage /></PrivateRoute>,
      },
      {
        path: "/opportunities",
        element: <PrivateRoute allowedRoles={["researcher"]}><OpportunitiesPage /></PrivateRoute>,
      },
      {
        path: "/my-grants",
        element: <PrivateRoute allowedRoles={["researcher"]}><MyGrantsPage /></PrivateRoute>,
      },
      {
        path: "/reports",
        element: <PrivateRoute allowedRoles={["researcher"]}><ReportsPage /></PrivateRoute>,
      },
      {
        path: "/new-report/:id",
        element: <PrivateRoute allowedRoles={["researcher"]}><NewReportPage /></PrivateRoute>,
      },
      {
        path: "/calendar",
        element: <PrivateRoute allowedRoles={["researcher"]}><CalendarPage /></PrivateRoute>,
      },
      {
        path: "/researcher/notifications",
        element: <PrivateRoute allowedRoles={["researcher"]}><NotificationsPage /></PrivateRoute>,
      },
      {
        path: "/researcher/settings",
        element: <PrivateRoute allowedRoles={["researcher"]}><SettingsPage /></PrivateRoute>,
      },
      {
        path: "/applications",
        element: <PrivateRoute allowedRoles={["admin", "grant_office"]}><ApplicationsListPage /></PrivateRoute>,
      },
      {
        path: "/applications/:id",
        element: <PrivateRoute allowedRoles={["admin", "grant_office"]}><ApplicationDetailsPage /></PrivateRoute>,
      },
      {
        path: "/create-opportunity",
        element: <PrivateRoute allowedRoles={["grant_office"]}><CreateOpportunityPage /></PrivateRoute>,
      },
      {
        path: "/manage-users",
        element: <PrivateRoute allowedRoles={["admin"]}><ManageUsersPage /></PrivateRoute>,
      },
      {
        path: "/grant-office/notifications",
        element: <PrivateRoute allowedRoles={["grant_office"]}><NotificationsPage /></PrivateRoute>,
      },
      {
        path: "/grant-office/settings",
        element: <PrivateRoute allowedRoles={["grant_office"]}><SettingsPage /></PrivateRoute>,
      },
      {
        path: "/admin/notifications",
        element: <PrivateRoute allowedRoles={["admin"]}><NotificationsPage /></PrivateRoute>,
      },
      {
        path: "/admin/settings",
        element: <PrivateRoute allowedRoles={["admin"]}><SettingsPage /></PrivateRoute>,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
