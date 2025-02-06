"use client";

import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer, Views, View } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, addMonths, subMonths } from "date-fns";
import { enUS } from "date-fns/locale";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
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
  const [view, setView] = useState<View>(Views.MONTH); // Track current view
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [newEvent, setNewEvent] = useState<CalendarEvent>({
    title: "",
    start: new Date(),
    end: new Date(),
    color: "#34D399",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetch("/api/schedules")
      .then((res) => res.json())
      .then((data) => {
        const validEvents = data.map((event: any) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
        setEvents(validEvents);
      })
      .catch((err) => console.error("Error fetching schedules:", err));
  }, []);

  const handleDateChange = (field: "start" | "end", value: string) => {
    setNewEvent((prev) => ({ ...prev, [field]: new Date(value) }));
  };

  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    setNewEvent((prev) => ({ ...prev, start: slotInfo.start, end: slotInfo.end }));
    setIsDialogOpen(true);
  };

  const handleAddEvent = () => {
    if (newEvent.title) {
      const eventToAdd = {
        ...newEvent,
        start: new Date(newEvent.start),
        end: new Date(newEvent.end),
      };
      fetch("/api/schedules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventToAdd),
      })
        .then((res) => res.json())
        .then((data) => {
          setEvents((prev) => [...prev, data]);
          setIsDialogOpen(false);
          setNewEvent({ title: "", start: new Date(), end: new Date(), color: "#34D399" });
        })
        .catch((err) => console.error("Error adding event:", err));
    }
  };

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
            selectable
            eventPropGetter={eventStyleGetter}
            views={[Views.MONTH, Views.WEEK, Views.DAY]}
            view={view}
            onView={(newView) => setView(newView)} // Ensure built-in buttons work
            date={currentDate}
            onNavigate={setCurrentDate} // Ensure navigation works correctly
            onSelectSlot={handleSelectSlot}
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
              <Label htmlFor="event-title" className="text-right">Title</Label>
              <Input id="event-title" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-start" className="text-right">Start</Label>
              <Input id="event-start" type="datetime-local" value={format(newEvent.start, "yyyy-MM-dd'T'HH:mm")} onChange={(e) => handleDateChange("start", e.target.value)} className="col-span-3" />
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
