import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const recentHires = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    avatar: "/avatars/01.png",
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    avatar: "/avatars/02.png",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    avatar: "/avatars/03.png",
  },
  {
    name: "William Kim",
    email: "william.kim@email.com",
    avatar: "/avatars/04.png",
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    avatar: "/avatars/05.png",
  },
]

export function RecentHires() {
  return (
    <div className="space-y-8">
      {recentHires.map((hire) => (
        <div key={hire.email} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={hire.avatar} alt={hire.name} />
            <AvatarFallback>{hire.name[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{hire.name}</p>
            <p className="text-sm text-muted-foreground">{hire.email}</p>
          </div>
          <div className="ml-auto font-medium">New Hire</div>
        </div>
      ))}
    </div>
  )
}

