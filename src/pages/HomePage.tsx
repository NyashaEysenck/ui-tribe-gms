
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const SuccessStory = ({ quote, author, department }: { quote: string; author: string; department: string }) => (
  <div className="p-6 bg-white rounded-lg shadow-sm">
    <div className="text-red-600 text-2xl mb-4">"</div>
    <p className="text-gray-700 italic mb-6">{quote}</p>
    <div>
      <h4 className="font-semibold">{author}</h4>
      <p className="text-gray-500 text-sm">{department}</p>
    </div>
  </div>
);

const ProcessStep = ({ number, title, description }: { number: number; title: string; description: string }) => (
  <div className="flex flex-col items-center">
    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
      {number}
    </div>
    <h3 className="font-bold text-lg mb-2">{title}</h3>
    <p className="text-gray-600 text-center max-w-xs">{description}</p>
  </div>
);

const GrantCard = ({ 
  title, 
  deadline, 
  description, 
  amount 
}: { 
  title: string; 
  deadline: string; 
  description: string; 
  amount: string 
}) => (
  <Card className="h-full">
    <CardContent className="p-6">
      <h3 className="text-xl font-bold mb-1">{title}</h3>
      <p className="text-gray-500 text-sm mb-3">Deadline: {deadline}</p>
      <p className="text-gray-700 mb-4">{description}</p>
      <p className="text-red-600 font-bold text-xl mb-4">{amount}</p>
      <Link to="/login" className="block text-center py-2 px-4 border border-red-600 text-red-600 rounded hover:bg-red-50 transition-colors">
        Apply Now
      </Link>
    </CardContent>
  </Card>
);

const BenefitCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string 
}) => (
  <Card className="h-full">
    <CardContent className="p-6">
      <div className="text-red-600 mb-4 text-3xl">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </CardContent>
  </Card>
);

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-red-600 to-red-700 text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-8 md:mb-0 md:mr-8">
              <img src="/lovable-uploads/b0f20013-323f-412c-afd3-b150af6bfbaf.png" alt="Africa University Logo" className="w-32 h-auto" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Research Grant Funding</h1>
              <p className="text-xl mb-8">Unlock funding opportunities for your groundbreaking research at Africa University. Apply today and turn your innovative ideas into reality.</p>
              <div className="flex flex-wrap gap-4">
                <Link to="/register" className="bg-black text-white px-6 py-3 rounded font-medium hover:bg-gray-900 transition-colors">
                  Apply Now
                </Link>
                <Link to="/opportunities" className="bg-transparent border border-white text-white px-6 py-3 rounded font-medium hover:bg-white/10 transition-colors">
                  Browse Grants
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Apply Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4">Why Apply for Research Grants?</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Africa University is committed to supporting innovative research that addresses real-world challenges and contributes to knowledge advancement.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <BenefitCard 
              icon={<span>$</span>} 
              title="Financial Support" 
              description="Secure funding from $5,000 to $500,000 for your research projects across various disciplines."
            />
            <BenefitCard 
              icon={<span>👥</span>} 
              title="Collaboration Opportunities" 
              description="Connect with fellow researchers and institutions worldwide to expand your research network."
            />
            <BenefitCard 
              icon={<span>📋</span>} 
              title="Publication Support" 
              description="Receive assistance for publishing your research in high-impact journals and conferences."
            />
            <BenefitCard 
              icon={<span>📈</span>} 
              title="Career Advancement" 
              description="Enhance your academic profile and reputation through funded research projects."
            />
          </div>
        </div>
      </section>

      {/* Featured Opportunities */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Funding Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <GrantCard
              title="Climate Change Research Initiative"
              deadline="June 30, 2024"
              description="Research exploring innovative solutions to mitigate climate change effects in sub-Saharan Africa."
              amount="$75,000"
            />
            <GrantCard
              title="Healthcare Innovation Fund"
              deadline="July 15, 2024"
              description="Supporting research in healthcare delivery systems and medical technology advancements."
              amount="$120,000"
            />
            <GrantCard
              title="Agricultural Sustainability Grant"
              deadline="August 10, 2024"
              description="Funding research on sustainable agricultural practices and food security solutions."
              amount="$90,000"
            />
          </div>
          <div className="flex justify-center mt-8">
            <Link to="/opportunities" className="flex items-center text-red-600 hover:text-red-700 transition-colors">
              View All Opportunities 
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SuccessStory
              quote="The grant funding I received from AU transformed my research on sustainable water systems. It enabled me to collect field data across three countries and present findings at international conferences."
              author="Dr. Chidi Okonkwo"
              department="Environmental Sciences Department"
            />
            <SuccessStory
              quote="As a young researcher, the AU grant program gave me the opportunity to conduct pioneering work in digital health solutions. The support went beyond just funding, providing mentorship and resources."
              author="Dr. Amina Ibrahim"
              department="Computer Science Department"
            />
            <SuccessStory
              quote="The research grant enabled our team to develop a new agricultural technique that has been adopted by communities across Zimbabwe. This wouldn't have been possible without Africa University's support."
              author="Prof. Samuel Nkomo"
              department="Agricultural Sciences Department"
            />
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Simple Application Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ProcessStep
              number={1}
              title="Create Account"
              description="Register using your @africau.edu email to access the grant management system."
            />
            <ProcessStep
              number={2}
              title="Select Opportunity"
              description="Browse available grants and select the one that matches your research focus."
            />
            <ProcessStep
              number={3}
              title="Submit Proposal"
              description="Complete the application form with your research proposal and budget details."
            />
            <ProcessStep
              number={4}
              title="Track Progress"
              description="Monitor your application status and receive notifications on the outcome."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-red-600 text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Fund Your Research?</h2>
          <p className="text-xl mb-8">Join hundreds of Africa University researchers who have successfully secured grants for their innovative work.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/register" className="bg-black text-white px-8 py-3 rounded font-medium hover:bg-gray-900 transition-colors">
              Create Account
            </Link>
            <Link to="/login" className="bg-transparent border border-white text-white px-8 py-3 rounded font-medium hover:bg-white/10 transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Africa University</h3>
              <p className="text-gray-400">Empowering research and innovation through comprehensive grant management.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/login" className="text-gray-400 hover:text-white">Sign In</Link></li>
                <li><Link to="/register" className="text-gray-400 hover:text-white">Register</Link></li>
                <li><Link to="/opportunities" className="text-gray-400 hover:text-white">Opportunities</Link></li>
                <li><Link to="/help" className="text-gray-400 hover:text-white">Help & Support</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Application Guide</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">FAQs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Research Policies</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-400">Research Office</p>
              <p className="text-gray-400">Email: grants@africau.edu</p>
              <p className="text-gray-400">Phone: (+263) 771-234-567</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-400 text-center">© 2025 Africa University Research Grant Management. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
