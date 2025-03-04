import React, { useState } from "react";
import { Calendar } from "../components/ui/calendar";
import { Button } from "../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import {
  CalendarIcon,
  PlusCircle,
  RefreshCw,
  LinkIcon,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface CalendarIntegrationProps {
  isConnected?: boolean;
  appointments?: AppointmentType[];
  onConnect?: () => void;
  onDisconnect?: () => void;
  onRefresh?: () => void;
}

type AppointmentType = {
  id: string;
  customerName: string;
  service: string;
  date: Date;
  status: "confirmed" | "pending" | "cancelled";
};

const CalendarIntegration = ({
  isConnected = true,
  appointments = [
    {
      id: "1",
      customerName: "John Doe",
      service: "Haircut",
      date: new Date(new Date().setHours(new Date().getHours() + 3)),
      status: "confirmed",
    },
    {
      id: "2",
      customerName: "Jane Smith",
      service: "Manicure",
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      status: "pending",
    },
    {
      id: "3",
      customerName: "Mike Johnson",
      service: "Massage",
      date: new Date(new Date().setDate(new Date().getDate() + 2)),
      status: "confirmed",
    },
  ] as AppointmentType[],
  onConnect = () => {},
  onDisconnect = () => {},
  onRefresh = () => {},
}: CalendarIntegrationProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState("upcoming");

  // Get appointments for the selected date
  const appointmentsForDate = appointments.filter(
    (appointment) =>
      date && appointment.date.toDateString() === date.toDateString(),
  );

  // Get upcoming appointments (next 7 days)
  const upcomingAppointments = appointments.filter((appointment) => {
    const today = new Date();
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(today.getDate() + 7);
    return appointment.date >= today && appointment.date <= sevenDaysLater;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge variant="default" className="bg-green-500">
            Confirmed
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-500">
            Pending
          </Badge>
        );
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return null;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <Card className="w-full h-full bg-white">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Calendar Integration</CardTitle>
            <CardDescription>
              Manage your Google Calendar appointments
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {isConnected ? (
              <>
                <Button variant="outline" size="sm" onClick={onRefresh}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                <Button variant="outline" size="sm" onClick={onDisconnect}>
                  <XCircle className="h-4 w-4 mr-2" />
                  Disconnect
                </Button>
              </>
            ) : (
              <Button onClick={onConnect}>
                <LinkIcon className="h-4 w-4 mr-2" />
                Connect Google Calendar
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isConnected ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </div>
            <div>
              <Tabs
                defaultValue="upcoming"
                value={activeTab}
                onValueChange={setActiveTab}
              >
                <TabsList className="w-full">
                  <TabsTrigger value="upcoming" className="flex-1">
                    Upcoming
                  </TabsTrigger>
                  <TabsTrigger value="selected" className="flex-1">
                    Selected Date
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming" className="space-y-4 mt-4">
                  <h3 className="text-sm font-medium">Next 7 Days</h3>
                  {upcomingAppointments.length > 0 ? (
                    <div className="space-y-2">
                      {upcomingAppointments.map((appointment) => (
                        <div
                          key={appointment.id}
                          className="p-3 border rounded-md"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">
                                {appointment.customerName}
                              </p>
                              <p className="text-sm text-gray-500">
                                {appointment.service}
                              </p>
                              <div className="flex items-center mt-1 text-xs text-gray-500">
                                <CalendarIcon className="h-3 w-3 mr-1" />
                                {appointment.date.toLocaleDateString()} at{" "}
                                {formatTime(appointment.date)}
                              </div>
                            </div>
                            <div>{getStatusBadge(appointment.status)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      No upcoming appointments
                    </p>
                  )}
                </TabsContent>
                <TabsContent value="selected" className="space-y-4 mt-4">
                  <h3 className="text-sm font-medium">
                    Appointments for {date?.toLocaleDateString()}
                  </h3>
                  {appointmentsForDate.length > 0 ? (
                    <div className="space-y-2">
                      {appointmentsForDate.map((appointment) => (
                        <div
                          key={appointment.id}
                          className="p-3 border rounded-md"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">
                                {appointment.customerName}
                              </p>
                              <p className="text-sm text-gray-500">
                                {appointment.service}
                              </p>
                              <div className="flex items-center mt-1 text-xs text-gray-500">
                                <CalendarIcon className="h-3 w-3 mr-1" />
                                {formatTime(appointment.date)}
                              </div>
                            </div>
                            <div>{getStatusBadge(appointment.status)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      No appointments for this date
                    </p>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <CalendarIcon className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium mb-2">Connect Your Calendar</h3>
            <p className="text-sm text-gray-500 text-center max-w-md mb-4">
              Connect your Google Calendar to sync appointments and manage your
              schedule directly from the chatbot dashboard.
            </p>
            <Button onClick={onConnect}>
              <LinkIcon className="h-4 w-4 mr-2" />
              Connect Google Calendar
            </Button>
          </div>
        )}
      </CardContent>
      {isConnected && (
        <CardFooter className="flex justify-between">
          <Button variant="outline" size="sm">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Appointment
          </Button>
          <p className="text-xs text-gray-500">
            Last synced: {new Date().toLocaleTimeString()}
          </p>
        </CardFooter>
      )}
    </Card>
  );
};

export default CalendarIntegration;
