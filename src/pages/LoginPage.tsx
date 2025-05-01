
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would call an authentication API
    // For demo purposes, we'll just show a toast
    if (email && password) {
      toast({
        title: "Login successful",
        description: "Redirecting to dashboard...",
      });
      // In a real app, redirect to dashboard after successful login
      window.location.href = "/dashboard";
    } else {
      toast({
        title: "Login failed",
        description: "Please enter valid credentials",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Sign In</h1>
              <p className="text-gray-600 text-sm">Enter your credentials to access your account</p>
            </div>

            {/* Alert/Info Box */}
            <div className="mb-6 bg-blue-50 p-4 rounded-md text-sm text-blue-700">
              Please sign in to access this page
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
