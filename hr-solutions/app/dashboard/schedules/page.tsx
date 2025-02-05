"use client";

import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, addMonths, subMonths } from "date-fns";
import { enUS } from "date-fns/locale";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, PlusCircle } from "lucide-react";
import "./calendar-styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;
  color: string;
};

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function SchedulesPage() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleBack = () => {
    setCurrentDate((prevDate) => subMonths(prevDate, 1));  // Navigate one month back
  };

  const handleNext = () => {
    setCurrentDate((prevDate) => addMonths(prevDate, 1));  // Navigate one month forward
  };

  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [newEvent, setNewEvent] = useState<CalendarEvent>({
    title: "",
    start: new Date(),
    end: new Date(),
    color: "#34D399",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch the events once the component is mounted
  useEffect(() => {
    fetch("/api/schedules")
      .then((res) => res.json())
      .then((data) => {
        const validEvents = data.map((event: any) => ({
          ...event,
          start: new Date(event.start),  // Ensuring valid Date objects
          end: new Date(event.end),  // Ensuring valid Date objects
        }));
        setEvents(validEvents); // Set the events after fetching
      })
      .catch((err) => console.error("Error fetching schedules:", err));
  }, []); // Empty dependency array to run only once

  // Handles start and end date changes in the form
  const handleDateChange = (field: "start" | "end", value: string) => {
    const parsedDate = new Date(value);
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [field]: parsedDate,
    }));
  };

  // Handles slot selection for event creation
  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      start: slotInfo.start,
      end: slotInfo.end,
    }));
    setIsDialogOpen(true); // Open the dialog after setting the new event
  };

  // Add a new event to the schedule
  const handleAddEvent = () => {
    if (newEvent.title) {
      const eventToAdd = {
        title: newEvent.title,
        start: new Date(newEvent.start),  // Ensure valid Date objects
        end: new Date(newEvent.end),      // Ensure valid Date objects
        color: newEvent.color,
      };
  
      fetch("/api/schedules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventToAdd),
      })
        .then((res) => res.json())
        .then((data) => {
          // Validate event format similar to how we did for fetching events
          const validEvent = {
            ...data,
            start: new Date(data.start),
            end: new Date(data.end),
          };
  
          console.log("Event added:", validEvent);  // Check if event is valid
  
          setEvents((prevEvents) => [...prevEvents, validEvent]);  // Add new event to state
          setIsDialogOpen(false);  // Close the dialog
          setNewEvent({
            title: "",
            start: new Date(),
            end: new Date(),
            color: "#34D399",
          });
        })
        .catch((err) => console.error("Error adding event:", err));
    }
  };
  

  // Set event styles
  const eventStyleGetter = (event: CalendarEvent) => ({
    style: {
      backgroundColor: event.color,
      borderRadius: "5px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block",
    },
  });

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Schedules</h1>
        <div className="flex gap-2">
          <Button onClick={handleBack}>
            <ChevronLeft className="mr-2 h-4 w-4" />
          </Button>
          <Button onClick={handleNext}>
            <ChevronRight className="mr-2 h-4 w-4" />
          </Button>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Event
        </Button>
      </div>
      <Card className="flex-grow overflow-hidden">
        <CardContent className="p-0 h-full">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100%" }}
            onSelectSlot={handleSelectSlot}
            selectable
            eventPropGetter={eventStyleGetter}
            views={["month", "week", "day"]}
            defaultView={Views.MONTH}
            date={currentDate}  // Set the calendar to show the current date (month) based on state
            onNavigate={setCurrentDate}  // Ensure calendar updates with the new currentDate
          />
        </CardContent>
      </Card>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-title" className="text-right">
                Title
              </Label>
              <Input
                id="event-title"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-start" className="text-right">
                Start
              </Label>
              <Input
                id="event-start"
                type="datetime-local"
                value={format(newEvent.start, "yyyy-MM-dd'T'HH:mm")}
                onChange={(e) => handleDateChange("start", e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-end" className="text-right">
                End
              </Label>
              <Input
                id="event-end"
                type="datetime-local"
                value={format(newEvent.end, "yyyy-MM-dd'T'HH:mm")}
                onChange={(e) => handleDateChange("end", e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-color" className="text-right">
                Color
              </Label>
              <Input
                id="event-color"
                type="color"
                value={newEvent.color}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, color: e.target.value })
                }
                className="col-span-3 h-10 p-1"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleAddEvent}>Add Event</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
