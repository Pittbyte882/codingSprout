import type { Metadata } from "next"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Video, MapPin, ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  title: "My Enrollments | Coding Sprout",
  description: "View your class enrollments and upcoming sessions.",
}

export default async function EnrollmentsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data: registrations } = await supabase
    .from("registrations")
    .select("*, class:classes(*), student:students(*)")
    .eq("parent_id", user.id)
    .order("registered_at", { ascending: false })

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-primary">Confirmed</Badge>
      case "charter_approved":
        return <Badge className="bg-primary">Confirmed (Charter)</Badge>
      case "charter_pending":
        return <Badge variant="secondary">Pending Approval</Badge>
      case "pending":
        return <Badge variant="secondary">Payment Pending</Badge>
      case "refunded":
        return <Badge variant="destructive">Refunded</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Enrollments</h1>
          <p className="mt-2 text-muted-foreground">View and manage your class registrations</p>
        </div>
        <Link href="/classes">
          <Button className="bg-primary hover:bg-sprout-green-dark">Browse Classes</Button>
        </Link>
      </div>

      {/* Enrollments List */}
      {registrations && registrations.length > 0 ? (
        <div className="space-y-4">
          {registrations.map((reg) => (
            <Card key={reg.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{reg.class?.name}</CardTitle>
                    <CardDescription>
                      Student: {reg.student?.full_name} ({reg.student?.grade_level})
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {reg.class?.is_online ? (
                      <Badge variant="outline" className="border-sky-blue text-sky-blue">
                        <Video className="mr-1 h-3 w-3" />
                        Online
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-primary text-primary">
                        <MapPin className="mr-1 h-3 w-3" />
                        In-Person
                      </Badge>
                    )}
                    {getStatusBadge(reg.payment_status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-6 text-sm">
                    {reg.class?.start_date && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{formatDate(reg.class.start_date)}</span>
                      </div>
                    )}
                    {reg.class?.start_time && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>
                          {formatTime(reg.class.start_time)} - {formatTime(reg.class.end_time)}
                        </span>
                      </div>
                    )}
                  </div>
                  {reg.class?.is_online &&
                    reg.class?.zoom_link &&
                    (reg.payment_status === "paid" || reg.payment_status === "charter_approved") && (
                      <a href={reg.class.zoom_link} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="bg-sky-blue hover:bg-sky-blue/90 text-secondary">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Join Zoom
                        </Button>
                      </a>
                    )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <Calendar className="mx-auto h-16 w-16 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-semibold">No enrollments yet</h3>
            <p className="mt-2 text-muted-foreground">Browse our classes and enroll your child today!</p>
            <Link href="/classes" className="mt-6 inline-block">
              <Button className="bg-primary hover:bg-sprout-green-dark">Browse Classes</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
