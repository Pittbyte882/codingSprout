import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, MapPin, Video, User } from "lucide-react"
import type { Class } from "@/lib/types"

interface ClassesGridProps {
  classes: Class[]
}

export function ClassesGrid({ classes }: ClassesGridProps) {
  if (classes.length === 0) {
    return (
      <div className="mt-12 text-center">
        <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Calendar className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">No Classes Available</h3>
        <p className="mt-2 text-muted-foreground">
          Check back soon for new class offerings, or contact us to request a specific class.
        </p>
        <Link href="/contact" className="mt-4 inline-block">
          <Button variant="outline">Contact Us</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {classes.map((classItem) => (
        <ClassCard key={classItem.id} classItem={classItem} />
      ))}
    </div>
  )
}

function ClassCard({ classItem }: { classItem: Class }) {
  const spotsRemaining = classItem.max_spots - classItem.spots_taken
  const isFull = spotsRemaining <= 0
  const isLowSpots = spotsRemaining > 0 && spotsRemaining <= 3

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
    <Card className="group flex flex-col overflow-hidden border-2 border-transparent transition-all hover:border-primary/50 hover:shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg leading-tight">{classItem.name}</CardTitle>
            <CardDescription className="mt-1">{classItem.grade_levels?.join(", ") || "All grades"}</CardDescription>
          </div>
          <div className="flex flex-col gap-1">
            {classItem.is_online ? (
              <Badge variant="secondary" className="bg-sky-blue/10 text-sky-blue">
                <Video className="mr-1 h-3 w-3" />
                Online
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                <MapPin className="mr-1 h-3 w-3" />
                In-Person
              </Badge>
            )}
            {classItem.is_individual && (
              <Badge variant="secondary" className="bg-warm-yellow/10 text-yellow-700">
                <User className="mr-1 h-3 w-3" />
                1-on-1
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-3">
        <p className="mb-4 text-sm text-muted-foreground line-clamp-2">{classItem.description}</p>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{formatDate(classItem.start_date)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4 text-primary" />
            <span>
              {formatTime(classItem.start_time)} - {formatTime(classItem.end_time)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            {isFull ? (
              <span className="font-medium text-destructive">Class Full</span>
            ) : isLowSpots ? (
              <span className="font-medium text-orange-600">Only {spotsRemaining} spots left!</span>
            ) : (
              <span className="text-muted-foreground">{spotsRemaining} spots available</span>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t bg-muted/30 pt-4">
        <div>
          <span className="text-2xl font-bold text-foreground">${classItem.price}</span>
          {classItem.charter_price && classItem.charter_price !== classItem.price && (
            <span className="ml-2 text-sm text-muted-foreground">(${classItem.charter_price} charter)</span>
          )}
        </div>
        <Link href={`/classes/${classItem.id}`}>
          <Button size="sm" disabled={isFull} className={isFull ? "" : "bg-primary hover:bg-sprout-green-dark"}>
            {isFull ? "Join Waitlist" : "Enroll Now"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
