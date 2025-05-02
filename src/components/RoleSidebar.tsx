
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
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
  FileCheck
} from "lucide-react";

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
};

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, to, active }) => (
  <Link
    to={to}
    className={cn(
      "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
      active
        ? "bg-red-100 text-red-700"
        : "text-gray-500 hover:bg-red-50 hover:text-red-700"
    )}
  >
    <div className="w-5 h-5">{icon}</div>
    <span>{label}</span>
  </Link>
);

const RoleSidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;

  if (!user) return null;

  // Common menu items for all users
  let menuItems = [
    {
      to: user.role === "admin" ? "/admin" : user.role === "grant_office" ? "/grant-office" : "/dashboard",
      icon: <Home className="w-5 h-5" />,
      label: "Dashboard"
    }
  ];

  // Add role-specific menu items
  if (user.role === "admin") {
    menuItems = [
      ...menuItems,
      {
        to: "/applications",
        icon: <FileText className="w-5 h-5" />,
        label: "Applications"
      },
      {
        to: "/manage-users",
        icon: <Users className="w-5 h-5" />,
        label: "Manage Users"
      },
      {
        to: "/notifications",
        icon: <Bell className="w-5 h-5" />,
        label: "Notifications"
      },
      {
        to: "/settings",
        icon: <Settings className="w-5 h-5" />,
        label: "Settings"
      }
    ];
  } else if (user.role === "grant_office") {
    menuItems = [
      ...menuItems,
      {
        to: "/create-opportunity",
        icon: <FilePlus className="w-5 h-5" />,
        label: "Post Opportunity"
      },
      {
        to: "/applications",
        icon: <FileText className="w-5 h-5" />,
        label: "Applications"
      },
      {
        to: "/notifications",
        icon: <Bell className="w-5 h-5" />,
        label: "Notifications"
      },
      {
        to: "/settings",
        icon: <Settings className="w-5 h-5" />,
        label: "Settings"
      }
    ];
  } else {
    // Researcher role
    menuItems = [
      ...menuItems,
      {
        to: "/my-grants",
        icon: <FileCheck className="w-5 h-5" />,
        label: "My Grants"
      },
      {
        to: "/opportunities",
        icon: <Search className="w-5 h-5" />,
        label: "Find Opportunities"
      },
      {
        to: "/reports",
        icon: <FileText className="w-5 h-5" />,
        label: "Reports"
      },
      {
        to: "/calendar",
        icon: <Calendar className="w-5 h-5" />,
        label: "Calendar"
      },
      {
        to: "/notifications",
        icon: <Bell className="w-5 h-5" />,
        label: "Notifications"
      },
      {
        to: "/settings",
        icon: <Settings className="w-5 h-5" />,
        label: "Settings"
      }
    ];
  }

  return (
    <div className="h-screen w-64 bg-red-600 flex flex-col">
      {/* Logo */}
      <div className="p-4 flex items-center justify-center">
        <img 
          src="/lovable-uploads/b0f20013-323f-412c-afd3-b150af6bfbaf.png" 
          alt="AU GMS" 
          className="h-16 w-auto"
        />
        <span className="ml-2 text-white text-xl font-bold">AU GMS</span>
      </div>

      {/* Role badge */}
      <div className="px-4 py-2">
        <span className="bg-white text-red-600 text-xs font-bold py-1 px-2 rounded-full">
          {user.role.toUpperCase()}
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
              label={item.label}
            />
          ))}
        </nav>
      </div>

      {/* User Info */}
      <div className="p-4 bg-white border-t flex items-center">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
          {user.name.charAt(0)}
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-gray-500">{user.role}</p>
        </div>
        <button className="text-gray-500" onClick={logout}>
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default RoleSidebar;
