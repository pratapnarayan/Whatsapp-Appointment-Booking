import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import { Globe, MessageSquare, Bell, Languages, Settings } from "lucide-react";

interface ChatbotSettingsProps {
  defaultLanguage?: string;
  availableLanguages?: string[];
  notificationsEnabled?: boolean;
  autoResponderEnabled?: boolean;
  welcomeMessage?: string;
  responseDelay?: number;
  onSave?: () => void;
}

const ChatbotSettings = ({
  defaultLanguage = "English",
  availableLanguages = ["English", "Hindi"],
  notificationsEnabled = true,
  autoResponderEnabled = true,
  welcomeMessage = "Welcome to our appointment booking service! How can I help you today?",
  responseDelay = 1,
  onSave = () => console.log("Settings saved"),
}: ChatbotSettingsProps) => {
  return (
    <Card className="w-full h-full bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Chatbot Settings
        </CardTitle>
        <CardDescription>
          Configure your WhatsApp chatbot behavior and preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="general">
              <Globe className="h-4 w-4 mr-2" />
              General
            </TabsTrigger>
            <TabsTrigger value="language">
              <Languages className="h-4 w-4 mr-2" />
              Language
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Auto Responder</h3>
                  <p className="text-xs text-gray-500">
                    Automatically respond to customer messages
                  </p>
                </div>
                <Switch checked={autoResponderEnabled} />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Welcome Message</h3>
                <textarea
                  className="w-full h-24 p-2 text-sm border rounded-md"
                  defaultValue={welcomeMessage}
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">
                  Response Delay (seconds)
                </h3>
                <Select defaultValue={responseDelay.toString()}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select delay" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Immediate</SelectItem>
                    <SelectItem value="1">1 second</SelectItem>
                    <SelectItem value="2">2 seconds</SelectItem>
                    <SelectItem value="3">3 seconds</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="language" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Default Language</h3>
                <Select defaultValue={defaultLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableLanguages.map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Available Languages</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="english" defaultChecked />
                    <label htmlFor="english" className="text-sm">
                      English
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="hindi" defaultChecked />
                    <label htmlFor="hindi" className="text-sm">
                      Hindi
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="spanish" />
                    <label htmlFor="spanish" className="text-sm">
                      Spanish
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="french" />
                    <label htmlFor="french" className="text-sm">
                      French
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Appointment Reminders</h3>
                  <p className="text-xs text-gray-500">
                    Send reminders before appointments
                  </p>
                </div>
                <Switch checked={notificationsEnabled} />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Reminder Timing</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="24hr" defaultChecked />
                    <label htmlFor="24hr" className="text-sm">
                      24 hours before
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="1hr" defaultChecked />
                    <label htmlFor="1hr" className="text-sm">
                      1 hour before
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Payment Confirmations</h3>
                  <p className="text-xs text-gray-500">
                    Send receipt after payment
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end">
          <Button onClick={onSave} className="px-4">
            Save Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatbotSettings;
