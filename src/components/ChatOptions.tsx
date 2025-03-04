import React from "react";
import { Button } from "./ui/button";
import {
  Check,
  Clock,
  Calendar,
  CreditCard,
  X,
  MessageSquare,
  HelpCircle,
} from "lucide-react";

interface ChatOptionProps {
  options?: ChatOption[];
  onSelect?: (option: string) => void;
  type?: "service" | "date" | "time" | "confirmation" | "payment" | "language";
}

interface ChatOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
  description?: string;
}

const defaultServiceOptions: ChatOption[] = [
  { id: "haircut", label: "Haircut", icon: <MessageSquare size={16} /> },
  { id: "massage", label: "Massage", icon: <MessageSquare size={16} /> },
  {
    id: "facial",
    label: "Facial Treatment",
    icon: <MessageSquare size={16} />,
  },
  { id: "consultation", label: "Consultation", icon: <HelpCircle size={16} /> },
];

const defaultDateOptions: ChatOption[] = [
  { id: "2023-06-01", label: "Today, June 1", icon: <Calendar size={16} /> },
  { id: "2023-06-02", label: "Tomorrow, June 2", icon: <Calendar size={16} /> },
  { id: "2023-06-03", label: "Saturday, June 3", icon: <Calendar size={16} /> },
  { id: "2023-06-04", label: "Sunday, June 4", icon: <Calendar size={16} /> },
];

const defaultTimeOptions: ChatOption[] = [
  { id: "09:00", label: "9:00 AM", icon: <Clock size={16} /> },
  { id: "11:00", label: "11:00 AM", icon: <Clock size={16} /> },
  { id: "14:00", label: "2:00 PM", icon: <Clock size={16} /> },
  { id: "16:00", label: "4:00 PM", icon: <Clock size={16} /> },
];

const defaultConfirmationOptions: ChatOption[] = [
  { id: "confirm", label: "Confirm Booking", icon: <Check size={16} /> },
  { id: "cancel", label: "Cancel", icon: <X size={16} /> },
];

const defaultPaymentOptions: ChatOption[] = [
  {
    id: "pay_now",
    label: "Pay Now",
    icon: <CreditCard size={16} />,
    description: "Secure payment via Razorpay",
  },
  { id: "pay_later", label: "Pay at Venue", icon: <CreditCard size={16} /> },
];

const defaultLanguageOptions: ChatOption[] = [
  { id: "english", label: "English" },
  { id: "hindi", label: "हिंदी (Hindi)" },
];

const getDefaultOptions = (type: string): ChatOption[] => {
  switch (type) {
    case "service":
      return defaultServiceOptions;
    case "date":
      return defaultDateOptions;
    case "time":
      return defaultTimeOptions;
    case "confirmation":
      return defaultConfirmationOptions;
    case "payment":
      return defaultPaymentOptions;
    case "language":
      return defaultLanguageOptions;
    default:
      return defaultServiceOptions;
  }
};

const ChatOptions: React.FC<ChatOptionProps> = ({
  options,
  onSelect = () => {},
  type = "service",
}) => {
  const displayOptions = options || getDefaultOptions(type);

  return (
    <div className="flex flex-col space-y-2 w-full max-w-[700px] bg-white p-3 rounded-lg">
      <div className="grid grid-cols-2 gap-2">
        {displayOptions.map((option) => (
          <Button
            key={option.id}
            variant="outline"
            className="flex items-center justify-start gap-2 p-3 h-auto text-left"
            onClick={() => onSelect(option.id)}
          >
            {option.icon && <span className="text-primary">{option.icon}</span>}
            <div className="flex flex-col">
              <span className="font-medium">{option.label}</span>
              {option.description && (
                <span className="text-xs text-muted-foreground">
                  {option.description}
                </span>
              )}
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ChatOptions;
