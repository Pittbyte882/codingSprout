import type { Metadata } from "next"
import Link from "next/link"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Calendar, Eye, EyeOff } from "lucide-react"

export const metadata: Metadata = {
  title: "Manage Events | Coding Sprout Admin",
  description: "Create and manage events.",
}

export default async function AdminEventsPage() {
  const supabase = await createServerSupabaseClient()

  const { data: events } = await supabase.from("events").select("*").order("event_date", { ascending: true })

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Events</h1>
          <p className="mt-1 text-muted-foreground">Create and manage events</p>
        </div>
        <Link href="/admin/events/new">
          <Button className="bg-primary hover:bg-sprout-green-dark">
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </Link>
      </div>

      {events && events.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {events.map((event) => (
            <Card key={event.id} className={!event.is_published ? "opacity-60" : ""}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{event.name}</CardTitle>
                    <CardDescription>{formatDate(event.event_date)}</CardDescription>
                  </div>
                  <Badge variant={event.is_published ? "default" : "secondary"}>
                    {event.is_published ? (
                      <>
                        <Eye className="mr-1 h-3 w-3" /> Published
                      </>
                    ) : (
                      <>
                        <EyeOff className="mr-1 h-3 w-3" /> Draft
                      </>
                    )}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{event.description}</p>
                <div className="flex gap-2">
                  <Link href={`/admin/events/${event.id}`} className="flex-1">
                    <Button variant="outline" className="w-full bg-transparent" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <Calendar className="mx-auto h-16 w-16 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-semibold">No events yet</h3>
            <p className="mt-2 text-muted-foreground">Create your first event</p>
            <Link href="/admin/events/new" className="mt-6 inline-block">
              <Button className="bg-primary hover:bg-sprout-green-dark">
                <Plus className="mr-2 h-4 w-4" />
                Create Event
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
