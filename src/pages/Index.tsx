
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center max-w-3xl px-4">
        <div className="mb-8">
          <Logo size="xl" variant="clean" withText={false} />
        </div>
        
        <h1 className="text-4xl font-bold mb-4 text-red-600">Africa University</h1>
        <h2 className="text-3xl font-bold mb-6">Grant Management System</h2>
        
        <p className="text-xl text-gray-600 mb-8">
          Welcome to the Grant Management System for Africa University researchers, 
          administrators, and grant office staff.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/login">
            <Button size="lg" className="bg-red-600 hover:bg-red-700">
              Sign In
            </Button>
          </Link>
          <Link to="/register">
            <Button size="lg" variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
