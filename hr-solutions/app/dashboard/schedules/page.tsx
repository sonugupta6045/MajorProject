"use client"

import { useState } from "react"
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar"
import {format} from "date-fns/format"
import {parse} from "date-fns/parse"
import {startOfWeek} from "date-fns/startOfWeek"
import {getDay} from "date-fns/getDay"
import {enUS} from "date-fns/locale/en-US"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CalendarIcon, PlusCircle } from "lucide-react"

// Import custom CSS for react-big-calendar
import "./calendar-styles.css"
import "react-big-calendar/lib/css/react-big-calendar.css"

const locales = {
  "en-US": enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

// Sample events with different colors
const initialEvents = [
  {
    id: 1,
    title: "Team Meeting",
    start: new Date(2023, 5, 15, 10, 0),
    end: new Date(2023, 5, 15, 11, 0),
    color: "#34D399", // green
  },
  {
    id: 2,
    title: "Interview: Software Engineer",
    start: new Date(2023, 5, 16, 14, 0),
    end: new Date(2023, 5, 16, 15, 30),
    color: "#60A5FA", // blue
  },
  {
    id: 3,
    title: "Onboarding: New Hires",
    start: new Date(2023, 5, 17, 9, 0),
    end: new Date(2023, 5, 17, 12, 0),
    color: "#F472B6", // pink
  },
]

export default function SchedulesPage() {
  const [events, setEvents] = useState(initialEvents)
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: new Date(),
    end: new Date(),
    color: "#34D399", // default color
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    setNewEvent({
      ...newEvent,
      start: slotInfo.start,
      end: slotInfo.end,
    })
    setIsDialogOpen(true)
  }

  const handleAddEvent = () => {
    if (newEvent.title) {
      setEvents([...events, { ...newEvent, id: events.length + 1 }])
      setIsDialogOpen(false)
      setNewEvent({
        title: "",
        start: new Date(),
        end: new Date(),
        color: "#34D399",
      })
    }
  }

  const eventStyleGetter = (event: any) => {
    return {
      style: {
        backgroundColor: event.color,
        borderRadius: "5px",
        opacity: 0.8,
        color: "white",
        border: "0px",
        display: "block",
      },
    }
  }

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
            onSelectSlot={handleSelectSlot}
            selectable
            eventPropGetter={eventStyleGetter}
            views={["month", "week", "day"]}
            defaultView={Views.MONTH}
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
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-start" className="text-right">
                Start
              </Label>
              <div className="col-span-3 relative">
                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="event-start"
                  type="datetime-local"
                  value={format(newEvent.start, "yyyy-MM-dd'T'HH:mm")}
                  onChange={(e) => setNewEvent({ ...newEvent, start: new Date(e.target.value) })}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-end" className="text-right">
                End
              </Label>
              <div className="col-span-3 relative">
                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="event-end"
                  type="datetime-local"
                  value={format(newEvent.end, "yyyy-MM-dd'T'HH:mm")}
                  onChange={(e) => setNewEvent({ ...newEvent, end: new Date(e.target.value) })}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-color" className="text-right">
                Color
              </Label>
              <Input
                id="event-color"
                type="color"
                value={newEvent.color}
                onChange={(e) => setNewEvent({ ...newEvent, color: e.target.value })}
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
  )
}

