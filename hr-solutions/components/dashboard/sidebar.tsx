"use client";

import { cn } from "@/lib/utils";
import Logout from "@/components/logout";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BookMarked,
  Calendar,
  Briefcase,
  Settings,
  FileText,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: BookMarked,
  },
  {
    title: "Shortlisted Profiles",
    href: "/dashboard/shortlisted",
    icon: BookMarked,
  },
  {
    title: "Schedules",
    href: "/dashboard/schedules",
    icon: Calendar,
  },
  {
    title: "Manage Positions",
    href: "/dashboard/positions",
    icon: Briefcase,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Guidelines",
    href: "/dashboard/guidelines",
    icon: FileText,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className="border-r bg-gray-100/40 w-60 dark:bg-gray-800/40 mt-4">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <ScrollArea className="flex-1 px-3">
          <div className="space-y-1 py-2 mt-4">
            {sidebarItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn("w-full justify-start", {
                  "bg-gray-200 dark:bg-gray-700": pathname === item.href,
                })}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              </Button>
            ))}
          </div>
        </ScrollArea>
        <div className="mt-auto p-4">
        <Logout />
        </div>
      </div>
    </div>
  );
}




