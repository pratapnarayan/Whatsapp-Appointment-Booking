import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Switch } from "./ui/switch";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import {
  CreditCard,
  IndianRupee,
  History,
  Settings,
  PlusCircle,
} from "lucide-react";

interface PaymentSettingsProps {
  apiKey?: string;
  isEnabled?: boolean;
  paymentHistory?: PaymentRecord[];
  onSaveSettings?: (settings: PaymentSettingsData) => void;
}

interface PaymentRecord {
  id: string;
  customerName: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
}

interface PaymentSettingsData {
  apiKey: string;
  isEnabled: boolean;
}

const PaymentSettings = ({
  apiKey = "",
  isEnabled = true,
  paymentHistory = [
    {
      id: "pay_123456",
      customerName: "Rahul Sharma",
      amount: 1500,
      date: "2023-06-15",
      status: "completed",
    },
    {
      id: "pay_123457",
      customerName: "Priya Patel",
      amount: 2000,
      date: "2023-06-14",
      status: "completed",
    },
    {
      id: "pay_123458",
      customerName: "Amit Kumar",
      amount: 1200,
      date: "2023-06-13",
      status: "pending",
    },
  ] as PaymentRecord[],
  onSaveSettings = () => {},
}: PaymentSettingsProps) => {
  const [localApiKey, setLocalApiKey] = useState(apiKey);
  const [localIsEnabled, setLocalIsEnabled] = useState(isEnabled);
  const [activeTab, setActiveTab] = useState("general");

  const handleSaveSettings = () => {
    onSaveSettings({
      apiKey: localApiKey,
      isEnabled: localIsEnabled,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600";
      case "pending":
        return "text-amber-600";
      case "failed":
        return "text-red-600";
      default:
        return "";
    }
  };

  return (
    <Card className="w-full h-full bg-white overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" />
          <CardTitle>Payment Settings</CardTitle>
        </div>
        <CardDescription>
          Configure Razorpay integration and manage payment history
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full mb-4">
            <TabsTrigger value="general" className="flex items-center gap-1">
              <Settings className="h-4 w-4" />
              <span>General</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-1">
              <History className="h-4 w-4" />
              <span>Payment History</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium">Enable Payments</h3>
                  <p className="text-sm text-muted-foreground">
                    Allow customers to make payments via WhatsApp
                  </p>
                </div>
                <Switch
                  checked={localIsEnabled}
                  onCheckedChange={setLocalIsEnabled}
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Razorpay API Key</h3>
                <Input
                  placeholder="Enter your Razorpay API key"
                  value={localApiKey}
                  onChange={(e) => setLocalApiKey(e.target.value)}
                  type="password"
                />
              </div>

              <div className="pt-2">
                <Button onClick={handleSaveSettings}>Save Settings</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <div className="rounded-md border">
              <div className="grid grid-cols-4 gap-4 p-3 bg-muted/50 text-sm font-medium">
                <div>Customer</div>
                <div>Amount</div>
                <div>Date</div>
                <div>Status</div>
              </div>

              <div className="divide-y">
                {paymentHistory.map((payment) => (
                  <div
                    key={payment.id}
                    className="grid grid-cols-4 gap-4 p-3 text-sm"
                  >
                    <div>{payment.customerName}</div>
                    <div className="flex items-center gap-1">
                      <IndianRupee className="h-3 w-3" />
                      {payment.amount.toFixed(2)}
                    </div>
                    <div>{new Date(payment.date).toLocaleDateString()}</div>
                    <div className={getStatusColor(payment.status)}>
                      {payment.status.charAt(0).toUpperCase() +
                        payment.status.slice(1)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-1"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Export Payment History</span>
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PaymentSettings;
