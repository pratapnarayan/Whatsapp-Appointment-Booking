import React from "react";
import ChatbotDashboard from "./ChatbotDashboard";

const Home = () => {
  // Sample admin stats
  const adminStats = {
    totalConversations: 1248,
    activeUsers: 356,
    completionRate: 78,
    totalAppointments: 523,
    totalRevenue: 125000,
  };

  return (
    <div className="w-screen h-screen bg-gray-100">
      <ChatbotDashboard initialTab="chat" adminStats={adminStats} />
    </div>
  );
};

export default Home;
