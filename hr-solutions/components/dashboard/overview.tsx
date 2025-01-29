"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    total: 167,
  },
  {
    name: "Feb",
    total: 190,
  },
  {
    name: "Mar",
    total: 210,
  },
  {
    name: "Apr",
    total: 215,
  },
  {
    name: "May",
    total: 235,
  },
  {
    name: "Jun",
    total: 260,
  },
  {
    name: "Jul",
    total: 280,
  },
  {
    name: "Aug",
    total: 295,
  },
  {
    name: "Sep",
    total: 310,
  },
  {
    name: "Oct",
    total: 325,
  },
  {
    name: "Nov",
    total: 340,
  },
  {
    name: "Dec",
    total: 365,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

