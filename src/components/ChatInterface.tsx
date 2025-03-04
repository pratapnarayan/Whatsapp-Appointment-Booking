import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Send, Paperclip, Mic, Image, SmilePlus } from "lucide-react";
import ChatMessage from "./ChatMessage";
import ChatOptions from "./ChatOptions";

interface ChatInterfaceProps {
  messages?: ChatMessageType[];
  onSendMessage?: (message: string) => void;
  onSelectOption?: (optionId: string) => void;
  isTyping?: boolean;
  currentStep?:
    | "welcome"
    | "service"
    | "date"
    | "time"
    | "confirmation"
    | "payment"
    | "complete";
}

interface ChatMessageType {
  id: string;
  message: string;
  sender: "bot" | "user";
  timestamp?: string;
  options?: {
    text: string;
    value: string;
  }[];
  paymentLink?: string;
  paymentAmount?: string;
  isPaymentComplete?: boolean;
}

const defaultMessages: ChatMessageType[] = [
  {
    id: "1",
    message:
      "Welcome to our appointment booking service! Please select your preferred language.",
    sender: "bot",
    timestamp: "10:00 AM",
    options: [
      { text: "English", value: "english" },
      { text: "हिंदी (Hindi)", value: "hindi" },
    ],
  },
  {
    id: "2",
    message: "I would like to book in English",
    sender: "user",
    timestamp: "10:01 AM",
  },
  {
    id: "3",
    message: "Great! How can I help you today?",
    sender: "bot",
    timestamp: "10:01 AM",
    options: [
      { text: "Book Appointment", value: "book" },
      { text: "View Appointments", value: "view" },
      { text: "Cancel Appointment", value: "cancel" },
      { text: "Support", value: "support" },
    ],
  },
  {
    id: "4",
    message: "I want to book an appointment",
    sender: "user",
    timestamp: "10:02 AM",
  },
  {
    id: "5",
    message: "Please select a service:",
    sender: "bot",
    timestamp: "10:02 AM",
    options: [
      { text: "Haircut", value: "haircut" },
      { text: "Massage", value: "massage" },
      { text: "Facial Treatment", value: "facial" },
      { text: "Consultation", value: "consultation" },
    ],
  },
];

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages = defaultMessages,
  onSendMessage = () => {},
  onSelectOption = () => {},
  isTyping = false,
  currentStep = "service",
}) => {
  const [inputValue, setInputValue] = useState("");
  const [activeTab, setActiveTab] = useState("chat");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="w-full h-full max-w-[900px] mx-auto bg-gray-50 flex flex-col overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b bg-white">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="chat">Chat Simulation</TabsTrigger>
            <TabsTrigger value="preview">Customer Preview</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <TabsContent
        value="chat"
        className="flex-1 flex flex-col overflow-hidden p-0 m-0"
      >
        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg.message}
                sender={msg.sender}
                timestamp={msg.timestamp}
                options={msg.options}
                paymentLink={msg.paymentLink}
                paymentAmount={msg.paymentAmount}
                isPaymentComplete={msg.isPaymentComplete}
              />
            ))}
            {isTyping && (
              <div className="flex items-center space-x-2 text-gray-500 text-sm ml-12">
                <div className="flex space-x-1">
                  <div
                    className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
                <span>Bot is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Current Options Display */}
        {currentStep !== "complete" && (
          <div className="p-4 border-t bg-white">
            <ChatOptions
              type={currentStep === "welcome" ? "language" : currentStep}
              onSelect={onSelectOption}
            />
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t bg-white">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" className="rounded-full">
              <Paperclip size={18} />
            </Button>
            <div className="flex-1 relative">
              <Input
                placeholder="Type a message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                className="pr-20 py-6 rounded-full"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                >
                  <SmilePlus size={18} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                >
                  <Mic size={18} />
                </Button>
              </div>
            </div>
            <Button
              onClick={handleSendMessage}
              size="icon"
              className="rounded-full bg-blue-600 hover:bg-blue-700"
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      </TabsContent>

      <TabsContent
        value="preview"
        className="flex-1 flex flex-col overflow-hidden p-0 m-0"
      >
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-100">
          <div className="max-w-sm w-full bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            {/* WhatsApp-like header */}
            <div className="bg-green-600 text-white p-3">
              <h3 className="font-medium">Business Name</h3>
              <p className="text-xs opacity-80">Appointment Booking</p>
            </div>

            {/* Preview chat content */}
            <div className="p-3 bg-[#e5ddd5] h-96 overflow-y-auto">
              {messages.slice(-3).map((msg) => (
                <div
                  key={msg.id}
                  className={`mb-2 max-w-[80%] ${msg.sender === "bot" ? "ml-0" : "ml-auto"}`}
                >
                  <div
                    className={`p-2 rounded-lg text-sm ${
                      msg.sender === "bot" ? "bg-white" : "bg-green-100"
                    }`}
                  >
                    {msg.message}

                    {msg.options &&
                      msg.options.length > 0 &&
                      msg.sender === "bot" && (
                        <div className="mt-2 space-y-1">
                          {msg.options.map((option, idx) => (
                            <div
                              key={idx}
                              className="bg-gray-100 p-1 rounded text-center text-gray-800"
                            >
                              {option.text}
                            </div>
                          ))}
                        </div>
                      )}

                    {msg.paymentLink && (
                      <div className="mt-2 bg-gray-50 p-2 rounded border">
                        <div className="flex justify-between">
                          <span>Payment</span>
                          <span>{msg.paymentAmount}</span>
                        </div>
                        <button className="w-full mt-1 bg-blue-500 text-white p-1 rounded text-xs">
                          Pay Now
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {msg.timestamp}
                  </div>
                </div>
              ))}
            </div>

            {/* Input area */}
            <div className="p-2 bg-white flex items-center">
              <div className="flex-1 bg-gray-100 rounded-full px-3 py-2 text-sm text-gray-400">
                Type a message
              </div>
              <Button size="icon" variant="ghost" className="text-green-600">
                <Mic size={18} />
              </Button>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-500 text-center max-w-md">
            This is how your customers will see the chat on their WhatsApp
            application
          </p>
        </div>
      </TabsContent>
    </Card>
  );
};

export default ChatInterface;
