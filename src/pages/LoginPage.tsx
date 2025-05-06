
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useAuth, DEMO_USERS } from "@/context/AuthContext";
import Logo from "@/components/Logo";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter an email address",
        variant: "destructive",
      });
      return;
    }
    
    const success = login(email, password);
    
    if (!success) {
      toast({
        title: "Login failed",
        description: "Invalid credentials or user not found",
        variant: "destructive",
      });
    }
  };

  const loginAsDemoUser = (userEmail: string) => {
    setEmail(userEmail);
    login(userEmail, "demopassword");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <div className="flex justify-center mb-6">
              <Logo size="lg" variant="clean" withText={false} />
            </div>
            
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold mb-2">Sign In</h1>
              <p className="text-gray-600 text-sm">Enter your credentials to access your account</p>
            </div>

            {/* Demo Accounts Section */}
            <div className="mb-6 bg-blue-50 p-4 rounded-md">
              <h2 className="font-medium text-blue-700 mb-2">Demo Accounts</h2>
              <div className="space-y-2">
                {DEMO_USERS.map((user) => (
                  <div key={user.id} className="flex justify-between items-center text-sm border-b pb-2">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-gray-500">{user.email}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => loginAsDemoUser(user.email)}
                    >
                      Login as {user.role}
                    </Button>
                  </div>
                ))}
              </div>
              <p className="text-xs text-blue-700 mt-2">
                Click any button above to login as that user, or use the form below
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@africau.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <Link to="/forgot-password" className="text-sm text-gray-600 hover:text-gray-900">
                      Forgot Password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    For demo purposes, any password will work
                  </p>
                </div>

                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                  Sign In
                </Button>
              </div>
            </form>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/register" className="text-red-600 hover:text-red-800 font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
