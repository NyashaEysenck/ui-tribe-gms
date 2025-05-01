
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RoleSidebar from "@/components/RoleSidebar";
import { useAuth } from "@/context/AuthContext";

type GrantCardProps = {
  id: string;
  title: string;
  deadline: string;
  description: string;
  amount: string;
};

const GrantCard: React.FC<GrantCardProps> = ({ id, title, deadline, description, amount }) => (
  <Card className="h-full">
    <CardContent className="p-6">
      <h3 className="text-xl font-bold mb-1">{title}</h3>
      <p className="text-gray-500 text-sm mb-3">Deadline: {deadline}</p>
      <p className="text-gray-700 mb-4">{description}</p>
      <p className="text-red-600 font-bold text-xl mb-4">{amount}</p>
      <Link to={`/apply/${id}`}>
        <Button className="w-full bg-red-600 hover:bg-red-700">Apply Now</Button>
      </Link>
    </CardContent>
  </Card>
);

const OpportunitiesPage = () => {
  const { user } = useAuth();
  
  // Mock grant opportunities data
  const opportunities = [
    {
      id: "1",
      title: "Climate Change Research Initiative",
      deadline: "June 30, 2025",
      description: "Research exploring innovative solutions to mitigate climate change effects in sub-Saharan Africa.",
      amount: "$75,000",
    },
    {
      id: "2",
      title: "Healthcare Innovation Fund",
      deadline: "July 15, 2025",
      description: "Supporting research in healthcare delivery systems and medical technology advancements.",
      amount: "$120,000",
    },
    {
      id: "3",
      title: "Agricultural Sustainability Grant",
      deadline: "August 10, 2025",
      description: "Funding research on sustainable agricultural practices and food security solutions.",
      amount: "$90,000",
    },
    {
      id: "4",
      title: "Digital Education Access",
      deadline: "September 5, 2025",
      description: "Projects focused on improving digital education access in underserved communities.",
      amount: "$65,000",
    },
    {
      id: "5",
      title: "Water Resource Management",
      deadline: "July 31, 2025",
      description: "Research on sustainable water management practices for urban and rural communities.",
      amount: "$85,000",
    },
    {
      id: "6",
      title: "Cultural Heritage Preservation",
      deadline: "October 15, 2025",
      description: "Supporting projects that document and preserve cultural heritage across Africa.",
      amount: "$50,000",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <RoleSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold">Featured Funding Opportunities</h1>
              <p className="text-gray-600">Browse and apply for available grant opportunities</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search opportunities..."
                  className="pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {opportunities.map(opportunity => (
              <GrantCard
                key={opportunity.id}
                id={opportunity.id}
                title={opportunity.title}
                deadline={opportunity.deadline}
                description={opportunity.description}
                amount={opportunity.amount}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default OpportunitiesPage;
