import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import {
  BarChart3,
  MessageSquare,
  Settings,
  Users,
  Activity,
  Calendar,
  CreditCard,
  Download,
  HelpCircle,
} from "lucide-react";

// Import sub-components
import CalendarIntegration from "./CalendarIntegration";
import PaymentSettings from "./PaymentSettings";
import ChatbotSettings from "./ChatbotSettings";

interface AdminPanelProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  stats?: {
    totalConversations: number;
    activeUsers: number;
    completionRate: number;
    totalAppointments: number;
    totalRevenue: number;
  };
}

const AdminPanel = ({
  activeTab = "dashboard",
  onTabChange = () => {},
  stats = {
    totalConversations: 1248,
    activeUsers: 356,
    completionRate: 78,
    totalAppointments: 523,
    totalRevenue: 125000,
  },
}: AdminPanelProps) => {
  const [currentTab, setCurrentTab] = useState(activeTab);

  const handleTabChange = (value: string) => {
    setCurrentTab(value);
    onTabChange(value);
  };

  return (
    <div className="w-full h-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="p-4 bg-white border-b">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">
              Manage your WhatsApp chatbot
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <HelpCircle className="h-4 w-4 mr-2" />
              Help
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-auto">
        <Tabs
          value={currentTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Calendar</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span>Payments</span>
            </TabsTrigger>
            <TabsTrigger value="chatbot" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>Chatbot</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-4">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Total Conversations
                      </p>
                      <h3 className="text-2xl font-bold mt-1">
                        {stats.totalConversations}
                      </h3>
                    </div>
                    <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <MessageSquare className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      +12% this week
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Active Users
                      </p>
                      <h3 className="text-2xl font-bold mt-1">
                        {stats.activeUsers}
                      </h3>
                    </div>
                    <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      +5% this week
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Completion Rate
                      </p>
                      <h3 className="text-2xl font-bold mt-1">
                        {stats.completionRate}%
                      </h3>
                    </div>
                    <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Activity className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <Badge
                      variant="outline"
                      className="bg-amber-50 text-amber-700 border-amber-200"
                    >
                      -2% this week
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Total Revenue
                      </p>
                      <h3 className="text-2xl font-bold mt-1">
                        ₹{stats.totalRevenue.toLocaleString()}
                      </h3>
                    </div>
                    <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-amber-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      +18% this week
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest interactions with your chatbot
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      user: "Priya Patel",
                      action: "Booked an appointment",
                      service: "Haircut",
                      time: "10 minutes ago",
                    },
                    {
                      user: "Rahul Sharma",
                      action: "Made a payment",
                      service: "₹1,500",
                      time: "25 minutes ago",
                    },
                    {
                      user: "Amit Kumar",
                      action: "Cancelled appointment",
                      service: "Massage",
                      time: "1 hour ago",
                    },
                    {
                      user: "Neha Singh",
                      action: "Requested information",
                      service: "Facial Treatment",
                      time: "2 hours ago",
                    },
                    {
                      user: "Vikram Mehta",
                      action: "Rescheduled appointment",
                      service: "Consultation",
                      time: "3 hours ago",
                    },
                  ].map((activity, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                            <img
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activity.user}`}
                              alt={activity.user}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{activity.user}</p>
                            <p className="text-sm text-gray-500">
                              {activity.action} - {activity.service}
                            </p>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {activity.time}
                        </div>
                      </div>
                      {index < 4 && <Separator className="my-4" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar">
            <CalendarIntegration />
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments">
            <PaymentSettings />
          </TabsContent>

          {/* Chatbot Settings Tab */}
          <TabsContent value="chatbot">
            <ChatbotSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
