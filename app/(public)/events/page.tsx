import type { Metadata } from "next"
import Link from "next/link"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Events | Coding Sprout",
  description: "Join our upcoming coding events, workshops, and community activities for kids and families.",
}

export default async function EventsPage() {
  const supabase = await createServerSupabaseClient()

  const { data: events } = await supabase
    .from("events")
    .select("*")
    .eq("is_published", true)
    .gte("event_date", new Date().toISOString().split("T")[0])
    .order("event_date", { ascending: true })

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-off-white to-warm-yellow/10 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-secondary sm:text-5xl">Upcoming Events</h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Join us for workshops, open houses, and special coding events for the whole family.
            </p>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {events && events.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">No Upcoming Events</h3>
              <p className="mt-2 text-muted-foreground">
                Check back soon for new events, or sign up for our newsletter to stay informed.
              </p>
              <Link href="/contact" className="mt-6 inline-block">
                <Button variant="outline">Contact Us</Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

function EventCard({ event }: { event: any }) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  const formatTime = (timeStr: string) => {
    return new Date(`2000-01-01T${timeStr}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    })
  }

  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <Badge
            variant="secondary"
            className={event.is_free ? "bg-primary/10 text-primary" : "bg-warm-yellow/10 text-yellow-700"}
          >
            {event.is_free ? "Free Event" : `$${event.price}`}
          </Badge>
        </div>
        <CardTitle className="mt-2 text-xl">{event.name}</CardTitle>
        <CardDescription>{event.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 space-y-3 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4 text-primary" />
          <span>{formatDate(event.event_date)}</span>
        </div>
        {event.start_time && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4 text-primary" />
            <span>
              {formatTime(event.start_time)}
              {event.end_time && ` - ${formatTime(event.end_time)}`}
            </span>
          </div>
        )}
        {event.location && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{event.location}</span>
          </div>
        )}
        {event.max_attendees && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4 text-primary" />
            <span>{event.max_attendees - (event.current_attendees || 0)} spots available</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="border-t bg-muted/30 pt-4">
        <Link href={`/events/${event.id}`} className="w-full">
          <Button className="w-full bg-primary hover:bg-sprout-green-dark">Learn More</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
