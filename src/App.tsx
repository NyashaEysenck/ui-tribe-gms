
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";

// Import our pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import OpportunitiesPage from "./pages/OpportunitiesPage";

// Import new pages
import AdminPage from "./pages/AdminPage";
import GrantOfficePage from "./pages/GrantOfficePage";
import CreateOpportunityPage from "./pages/CreateOpportunityPage";
import ApplicationFormPage from "./pages/ApplicationFormPage";
import ApplicationsListPage from "./pages/ApplicationsListPage";
import ApplicationDetailsPage from "./pages/ApplicationDetailsPage";
import ManageUsersPage from "./pages/ManageUsersPage";

// Import Auth Provider and Private Route
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Researcher Routes */}
            <Route path="/dashboard" element={
              <PrivateRoute allowedRoles={["researcher"]}>
                <DashboardPage />
              </PrivateRoute>
            } />
            <Route path="/opportunities" element={
              <PrivateRoute allowedRoles={["researcher"]}>
                <OpportunitiesPage />
              </PrivateRoute>
            } />
            <Route path="/apply/:opportunityId" element={
              <PrivateRoute allowedRoles={["researcher"]}>
                <ApplicationFormPage />
              </PrivateRoute>
            } />
            
            {/* Grant Office Routes */}
            <Route path="/grant-office" element={
              <PrivateRoute allowedRoles={["grant_office"]}>
                <GrantOfficePage />
              </PrivateRoute>
            } />
            <Route path="/create-opportunity" element={
              <PrivateRoute allowedRoles={["grant_office"]}>
                <CreateOpportunityPage />
              </PrivateRoute>
            } />
            <Route path="/applications" element={
              <PrivateRoute allowedRoles={["grant_office", "admin"]}>
                <ApplicationsListPage />
              </PrivateRoute>
            } />
            <Route path="/application/:id" element={
              <PrivateRoute allowedRoles={["grant_office", "admin"]}>
                <ApplicationDetailsPage />
              </PrivateRoute>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin" element={
              <PrivateRoute allowedRoles={["admin"]}>
                <AdminPage />
              </PrivateRoute>
            } />
            <Route path="/manage-users" element={
              <PrivateRoute allowedRoles={["admin"]}>
                <ManageUsersPage />
              </PrivateRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
