
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import RoleSidebar from "@/components/RoleSidebar";
import { useAuth } from "@/context/AuthContext";
import { Calendar as CalendarIcon, Clock } from "lucide-react";

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  type: "deadline" | "report" | "meeting" | "workshop";
  description: string;
}

const CalendarPage = () => {
  const { user } = useAuth();
  const [date, setDate] = useState<Date | undefined>(new Date(2025, 4, 2)); // May 2, 2025
  
  // Mock events
  const events: CalendarEvent[] = [
    {
      id: "1",
      title: "Grant Application Deadline",
      date: "2023-11-15",
      time: "11:59 PM",
      type: "deadline",
      description: "Final deadline for the Climate Research Fund application"
    },
    {
      id: "2",
      title: "Progress Report Due",
      date: "2023-11-20",
      time: "5:00 PM",
      type: "report",
      description: "Quarterly progress report for Urban Development Grant"
    },
    {
      id: "3",
      title: "Grant Panel Review Meeting",
      date: "2023-11-22",
      time: "10:00 AM - 12:00 PM",
      type: "meeting",
      description: "Panel review of renewable energy research proposals"
    },
    {
      id: "4",
      title: "Workshop: Grant Writing Best Practices",
      date: "2023-11-28",
      time: "2:00 PM - 4:00 PM",
      type: "workshop",
      description: "Learn effective strategies for successful grant applications"
    }
  ];

  // Get events for the selected date
  const selectedDateEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return date && 
      eventDate.getDate() === date.getDate() && 
      eventDate.getMonth() === date.getMonth() && 
      eventDate.getFullYear() === date.getFullYear();
  });

  const getEventBadge = (type: string) => {
    const typeColors: Record<string, string> = {
      deadline: "bg-red-100 text-red-800",
      report: "bg-yellow-100 text-yellow-800",
      meeting: "bg-blue-100 text-blue-800",
      workshop: "bg-green-100 text-green-800"
    };
    
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeColors[type]}`}>
        {type}
      </span>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <RoleSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Research Calendar</h1>
            <p className="text-gray-600">Manage your research deadlines and events</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
            {/* Calendar - 3 columns on large screens */}
            <Card className="lg:col-span-3">
              <CardContent className="p-4">
                <div className="flex items-center mb-4">
                  <CalendarIcon className="mr-2 h-5 w-5 text-gray-500" />
                  <h2 className="text-lg font-semibold">Calendar</h2>
                </div>
                <p className="text-sm text-gray-600 mb-4">Track important dates and deadlines</p>
                
                <div className="rounded-md border">
                  <CalendarUI
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="pointer-events-auto"
                    disabled={(date) => date < new Date("2023-01-01")}
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Events - 4 columns on large screens */}
            <Card className="lg:col-span-4">
              <CardContent className="p-6">
                {date && (
                  <>
                    <h2 className="text-xl font-semibold mb-2">Today's Events</h2>
                    <p className="text-gray-600 mb-6">{date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    
                    {selectedDateEvents.length > 0 ? (
                      <div className="space-y-6">
                        {selectedDateEvents.map(event => (
                          <div key={event.id} className="border-l-4 border-red-600 pl-4 py-1">
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium">{event.title}</h3>
                              {getEventBadge(event.type)}
                            </div>
                            {event.time && (
                              <div className="flex items-center text-sm text-gray-500 mt-1">
                                <Clock className="h-4 w-4 mr-1" />
                                {event.time}
                              </div>
                            )}
                            <p className="text-gray-600 text-sm mt-2">{event.description}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <CalendarIcon className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium mb-1">No events scheduled for today</h3>
                        <p className="text-gray-500">Select another date or add a new event</p>
                      </div>
                    )}
                  </>
                )}
                
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">Friday, May 2, 2025</h2>
                  <p className="text-sm text-gray-600 mb-4">Grants deadlines, reporting due dates, and more</p>
                  
                  <div className="space-y-6">
                    {events.map(event => (
                      <div key={event.id} className="flex gap-4">
                        <div className="shrink-0 w-24">
                          <div className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' })}</div>
                          {event.time && <div className="text-xs text-gray-400">{event.time}</div>}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <h3 className="font-medium">{event.title}</h3>
                            {getEventBadge(event.type)}
                          </div>
                          <p className="text-sm text-gray-600">{event.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CalendarPage;
