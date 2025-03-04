import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Button } from "./ui/button";
import {
  MessageSquare,
  Settings,
  Bot,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

// Import sub-components
import ChatInterface from "./ChatInterface";
import AdminPanel from "./AdminPanel";

interface ChatbotDashboardProps {
  initialTab?: "chat" | "admin";
  onTabChange?: (tab: "chat" | "admin") => void;
  messages?: any[];
  adminStats?: {
    totalConversations: number;
    activeUsers: number;
    completionRate: number;
    totalAppointments: number;
    totalRevenue: number;
  };
}

const ChatbotDashboard = ({
  initialTab = "chat",
  onTabChange = () => {},
  messages = [],
  adminStats = {
    totalConversations: 1248,
    activeUsers: 356,
    completionRate: 78,
    totalAppointments: 523,
    totalRevenue: 125000,
  },
}: ChatbotDashboardProps) => {
  const [activeTab, setActiveTab] = useState<"chat" | "admin">(initialTab);
  const [currentStep, setCurrentStep] = useState<
    | "welcome"
    | "service"
    | "date"
    | "time"
    | "confirmation"
    | "payment"
    | "complete"
  >("service");
  const [isTyping, setIsTyping] = useState(false);
  const [adminActiveTab, setAdminActiveTab] = useState("dashboard");
  const [isMobileView, setIsMobileView] = useState(false);

  // Handle tab change
  const handleTabChange = (tab: "chat" | "admin") => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  // Handle sending a message in the chat interface
  const handleSendMessage = (message: string) => {
    // Simulate bot typing
    setIsTyping(true);

    // Simulate bot response after a delay
    setTimeout(() => {
      setIsTyping(false);
      // Additional logic would go here in a real implementation
    }, 1500);
  };

  // Handle option selection in the chat interface
  const handleOptionSelect = (optionId: string) => {
    // Simulate progression through the booking flow
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      // Move to the next step based on current step
      switch (currentStep) {
        case "welcome":
          setCurrentStep("service");
          break;
        case "service":
          setCurrentStep("date");
          break;
        case "date":
          setCurrentStep("time");
          break;
        case "time":
          setCurrentStep("confirmation");
          break;
        case "confirmation":
          setCurrentStep("payment");
          break;
        case "payment":
          setCurrentStep("complete");
          break;
        default:
          break;
      }
    }, 1000);
  };

  // Handle admin panel tab change
  const handleAdminTabChange = (tab: string) => {
    setAdminActiveTab(tab);
  };

  // Toggle between mobile and desktop view
  const toggleView = () => {
    setIsMobileView(!isMobileView);
  };

  return (
    <div className="w-full h-full bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b p-4 flex justify-between items-center">
        <div className="flex items-center">
          <Bot className="h-6 w-6 text-blue-600 mr-2" />
          <h1 className="text-xl font-bold">
            WhatsApp Appointment Booking Bot
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleView}
            className="md:hidden"
          >
            {isMobileView ? (
              <ArrowLeft className="h-4 w-4 mr-2" />
            ) : (
              <ArrowRight className="h-4 w-4 mr-2" />
            )}
            {isMobileView ? "Desktop View" : "Mobile View"}
          </Button>

          <Tabs
            value={activeTab}
            onValueChange={handleTabChange as any}
            className="hidden md:block"
          >
            <TabsList>
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Chat Interface
              </TabsTrigger>
              <TabsTrigger value="admin" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Admin Panel
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Mobile View Tabs */}
        <div className="md:hidden p-2 bg-white border-b">
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange as any}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger
                value="chat"
                className="flex items-center justify-center gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                Chat
              </TabsTrigger>
              <TabsTrigger
                value="admin"
                className="flex items-center justify-center gap-2"
              >
                <Settings className="h-4 w-4" />
                Admin
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Desktop Layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Chat Interface */}
          <div
            className={`${activeTab === "chat" || !isMobileView ? "block" : "hidden"} 
                      ${!isMobileView ? (activeTab === "chat" ? "w-full" : "w-1/2") : "w-full"} 
                      h-full transition-all duration-300 ease-in-out`}
          >
            <div className="h-full p-4">
              <ChatInterface
                messages={messages}
                onSendMessage={handleSendMessage}
                onSelectOption={handleOptionSelect}
                isTyping={isTyping}
                currentStep={currentStep}
              />
            </div>
          </div>

          {/* Admin Panel */}
          <div
            className={`${activeTab === "admin" || !isMobileView ? "block" : "hidden"} 
                      ${!isMobileView ? (activeTab === "admin" ? "w-full" : "w-1/2") : "w-full"} 
                      h-full transition-all duration-300 ease-in-out`}
          >
            <div className="h-full">
              <AdminPanel
                activeTab={adminActiveTab}
                onTabChange={handleAdminTabChange}
                stats={adminStats}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotDashboard;
