import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Check, Clock, CreditCard } from "lucide-react";

interface ChatMessageProps {
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

const ChatMessage = ({
  message = "Hello! How can I help you today?",
  sender = "bot",
  timestamp = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }),
  options = [],
  paymentLink = "",
  paymentAmount = "₹500",
  isPaymentComplete = false,
}: ChatMessageProps) => {
  const isBotMessage = sender === "bot";

  return (
    <div
      className={`flex w-full mb-4 ${isBotMessage ? "justify-start" : "justify-end"}`}
    >
      <div
        className={`flex max-w-[80%] ${isBotMessage ? "flex-row" : "flex-row-reverse"}`}
      >
        {/* Avatar */}
        <div className="flex-shrink-0 mt-1">
          <Avatar className="h-8 w-8 bg-gray-100">
            {isBotMessage ? (
              <AvatarImage
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=bot"
                alt="Bot"
              />
            ) : (
              <AvatarImage
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
                alt="User"
              />
            )}
            <AvatarFallback>{isBotMessage ? "B" : "U"}</AvatarFallback>
          </Avatar>
        </div>

        {/* Message Content */}
        <div className={`mx-2 ${isBotMessage ? "mr-12" : "ml-12"}`}>
          <Card
            className={`p-3 ${isBotMessage ? "bg-white" : "bg-blue-500 text-white"}`}
          >
            <p className="text-sm">{message}</p>

            {/* Payment Link */}
            {paymentLink && isBotMessage && (
              <div className="mt-2 border rounded-md p-2 bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Payment</span>
                  <span className="text-sm font-bold">{paymentAmount}</span>
                </div>
                {isPaymentComplete ? (
                  <div className="flex items-center text-green-600 text-sm">
                    <Check size={16} className="mr-1" />
                    <span>Payment completed</span>
                  </div>
                ) : (
                  <Button
                    className="w-full mt-1 bg-blue-600 hover:bg-blue-700"
                    size="sm"
                    onClick={() => window.open(paymentLink, "_blank")}
                  >
                    <CreditCard size={16} className="mr-2" />
                    Pay Now
                  </Button>
                )}
              </div>
            )}

            {/* Options Buttons */}
            {options.length > 0 && isBotMessage && (
              <div className="mt-2 flex flex-wrap gap-2">
                {options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="bg-gray-50 hover:bg-gray-100 text-gray-800"
                  >
                    {option.text}
                  </Button>
                ))}
              </div>
            )}
          </Card>
          <div className="flex items-center mt-1 text-xs text-gray-500">
            <Clock size={12} className="mr-1" />
            <span>{timestamp}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
