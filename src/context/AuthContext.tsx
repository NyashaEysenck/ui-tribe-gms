
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole } from "@/types/user";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

// Demo users
export const DEMO_USERS: User[] = [
  {
    id: "1",
    email: "admin@africau.edu",
    name: "Admin User",
    role: "admin",
  },
  {
    id: "2",
    email: "grant@africau.edu",
    name: "Grant Office",
    role: "grant_office",
  },
  {
    id: "3",
    email: "researcher@africau.edu",
    name: "Nyasha Gandah",
    role: "researcher",
  },
];

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  
  // Check for saved user on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem("gms_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem("gms_user");
      }
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    // Simple demo authentication
    const foundUser = DEMO_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("gms_user", JSON.stringify(foundUser));
      
      // Redirect based on role
      if (foundUser.role === "admin") {
        navigate("/admin");
      } else if (foundUser.role === "grant_office") {
        navigate("/grant-office");
      } else {
        navigate("/dashboard");
      }
      
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("gms_user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
