
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import Logo from "@/components/Logo";
import { 
  LogOut, 
  User, 
  Users, 
  Home, 
  FileText, 
  Search, 
  Calendar, 
  Bell, 
  Settings, 
  FilePlus, 
  BarChart2, 
  Briefcase,
  FileCheck,
  ChevronLeft,
  ChevronRight,
  Info
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
  tooltip?: string;
};

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, to, active, tooltip }) => (
  <TooltipProvider delayDuration={300}>
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          to={to}
          className={cn(
            "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors group relative",
            active
              ? "bg-red-100 text-red-700 font-medium"
              : "text-gray-500 hover:bg-red-50 hover:text-red-700"
          )}
          aria-current={active ? "page" : undefined}
        >
          <div className="w-5 h-5">{icon}</div>
          <span>{label}</span>
          {active && (
            <span className="absolute left-0 top-0 bottom-0 w-1 bg-red-700 rounded-r" aria-hidden="true"></span>
          )}
        </Link>
      </TooltipTrigger>
      {tooltip && <TooltipContent side="right">{tooltip}</TooltipContent>}
    </Tooltip>
  </TooltipProvider>
);

const RoleSidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;

  if (!user) return null;

  // Common menu items for all users
  let menuItems = [
    {
      to: user.role === "admin" ? "/admin" : user.role === "grant_office" ? "/grant-office" : "/dashboard",
      icon: <Home className="w-5 h-5" />,
      label: "Dashboard",
      tooltip: "View your dashboard"
    }
  ];

  // Add role-specific menu items
  if (user.role === "admin") {
    menuItems = [
      ...menuItems,
      {
        to: "/applications",
        icon: <FileText className="w-5 h-5" />,
        label: "Applications",
        tooltip: "View and manage applications"
      },
      {
        to: "/manage-users",
        icon: <Users className="w-5 h-5" />,
        label: "Manage Users",
        tooltip: "Add, edit, or remove users"
      },
      {
        to: "/admin/notifications",
        icon: <Bell className="w-5 h-5" />,
        label: "Notifications",
        tooltip: "View system notifications"
      },
      {
        to: "/admin/settings",
        icon: <Settings className="w-5 h-5" />,
        label: "Settings",
        tooltip: "Configure system settings"
      }
    ];
  } else if (user.role === "grant_office") {
    menuItems = [
      ...menuItems,
      {
        to: "/create-opportunity",
        icon: <FilePlus className="w-5 h-5" />,
        label: "Post Opportunity",
        tooltip: "Create a new grant opportunity"
      },
      {
        to: "/applications",
        icon: <FileText className="w-5 h-5" />,
        label: "Applications",
        tooltip: "Review submitted applications"
      },
      {
        to: "/grant-office/notifications",
        icon: <Bell className="w-5 h-5" />,
        label: "Notifications",
        tooltip: "View notifications"
      },
      {
        to: "/grant-office/settings",
        icon: <Settings className="w-5 h-5" />,
        label: "Settings",
        tooltip: "Manage your account settings"
      }
    ];
  } else {
    // Researcher role
    menuItems = [
      ...menuItems,
      {
        to: "/my-grants",
        icon: <FileCheck className="w-5 h-5" />,
        label: "My Grants",
        tooltip: "View your grant applications"
      },
      {
        to: "/opportunities",
        icon: <Search className="w-5 h-5" />,
        label: "Find Opportunities",
        tooltip: "Browse available grant opportunities"
      },
      {
        to: "/reports",
        icon: <FileText className="w-5 h-5" />,
        label: "Reports",
        tooltip: "View and submit reports"
      },
      {
        to: "/calendar",
        icon: <Calendar className="w-5 h-5" />,
        label: "Calendar",
        tooltip: "View important dates and deadlines"
      },
      {
        to: "/researcher/notifications",
        icon: <Bell className="w-5 h-5" />,
        label: "Notifications",
        tooltip: "View your notifications"
      },
      {
        to: "/researcher/settings",
        icon: <Settings className="w-5 h-5" />,
        label: "Settings",
        tooltip: "Manage your account settings"
      }
    ];
  }

  return (
    <div className={cn(
      "h-screen bg-red-600 flex flex-col transition-all duration-300",
      collapsed ? "w-20" : "w-64"
    )}>
      {/* Logo */}
      <div className="p-4 flex items-center justify-center">
        {collapsed ? (
          <Logo size="md" withText={false} variant="clean" />
        ) : (
          <Logo size="lg" withText={true} fullLogo={true} />
        )}
      </div>

      {/* Role badge */}
      <div className="px-4 py-2 flex justify-center">
        <span className="bg-white text-red-600 text-xs font-bold py-1 px-2 rounded-full">
          {collapsed ? user.role.charAt(0).toUpperCase() : user.role.toUpperCase()}
        </span>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-3 py-6 overflow-y-auto bg-white">
        <nav className="space-y-1">
          {menuItems.map(item => (
            <SidebarItem
              key={item.to}
              to={item.to}
              active={isActive(item.to)}
              icon={item.icon}
              label={collapsed ? "" : item.label}
              tooltip={item.tooltip}
            />
          ))}
          
          {/* Help button */}
          <div className="mt-6">
            <SidebarItem
              icon={<Info className="w-5 h-5" />}
              label={collapsed ? "" : "Help & Support"}
              to="/help"
              active={isActive("/help")}
              tooltip="Get help and support"
            />
          </div>
        </nav>
      </div>

      {/* Collapse button */}
      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="bg-white text-gray-500 p-2 absolute -right-4 top-24 rounded-full shadow-md hover:bg-gray-100"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>

      {/* User Info */}
      <div className="p-4 bg-white border-t flex items-center">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
          {user.name.charAt(0)}
        </div>
        {!collapsed && (
          <>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
            <button 
              className="text-gray-500 hover:text-red-600 transition-colors" 
              onClick={logout}
              aria-label="Log out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default RoleSidebar;
