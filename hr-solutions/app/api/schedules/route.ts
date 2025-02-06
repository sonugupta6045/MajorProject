import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { prisma } from "@/lib/prisma";


// Get all schedules
export async function GET() {
  const schedules = await prisma.schedule.findMany();
  return NextResponse.json(schedules);
}

// Create a new schedule
export async function POST(req: Request) {
  const body = await req.json();

  // Ensure start and end are valid Date objects
  const start = new Date(body.start);
  const end = new Date(body.end);

  // Check if the dates are valid
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return NextResponse.json({ error: 'Invalid date format' }, { status: 400 });
  }

  const newSchedule = await prisma.schedule.create({
    data: {
      title: body.title,
      start: start,
      end: end,
      color: body.color,
    },
  });

  return NextResponse.json(newSchedule);
}

// Delete a schedule
export async function DELETE(req: Request) {
  const { id } = await req.json();

  // Check if the schedule exists before attempting to delete
  const existingSchedule = await prisma.schedule.findUnique({
    where: { id },
  });

  if (!existingSchedule) {
    return NextResponse.json({ error: 'Schedule not found' }, { status: 404 });
  }

  await prisma.schedule.delete({
    where: { id },
  });

  return NextResponse.json({ message: "Schedule deleted" });
}
