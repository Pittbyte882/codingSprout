import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, Users, MapPin, Video, User, ArrowLeft, CheckCircle2 } from "lucide-react"

interface ClassPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: ClassPageProps): Promise<Metadata> {
  const { id } = await params
  const supabase = await createServerSupabaseClient()
  const { data: classItem } = await supabase.from("classes").select("*").eq("id", id).single()

  if (!classItem) {
    return { title: "Class Not Found | Coding Sprout" }
  }

  return {
    title: `${classItem.name} | Coding Sprout`,
    description: classItem.description,
  }
}

export default async function ClassPage({ params }: ClassPageProps) {
  const { id } = await params
  const supabase = await createServerSupabaseClient()
  const { data: classItem } = await supabase.from("classes").select("*").eq("id", id).single()

  if (!classItem) {
    notFound()
  }

  const spotsRemaining = classItem.max_spots - classItem.spots_taken
  const isFull = spotsRemaining <= 0

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatTime = (timeStr: string) => {
    return new Date(`2000-01-01T${timeStr}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    })
  }

  return (
    <div>
      {/* Back Link */}
      <div className="border-b bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-4 lg:px-8">
          <Link
            href="/classes"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Classes
          </Link>
        </div>
      </div>

      {/* Class Details */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-2 mb-4">
                {classItem.is_online ? (
                  <Badge className="bg-sky-blue/10 text-sky-blue">
                    <Video className="mr-1 h-3 w-3" />
                    Online Class
                  </Badge>
                ) : (
                  <Badge className="bg-primary/10 text-primary">
                    <MapPin className="mr-1 h-3 w-3" />
                    In-Person Class
                  </Badge>
                )}
                {classItem.is_individual && (
                  <Badge className="bg-warm-yellow/10 text-yellow-700">
                    <User className="mr-1 h-3 w-3" />
                    One-on-One Session
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl font-bold text-secondary sm:text-4xl">{classItem.name}</h1>

              <p className="mt-2 text-lg text-muted-foreground">
                For {classItem.grade_levels?.join(", ") || "all grades"}
              </p>

              <div className="mt-8">
                <h2 className="text-xl font-semibold text-foreground">About This Class</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">{classItem.description}</p>
              </div>

              {/* What students will learn */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-foreground">What Students Will Learn</h2>
                <ul className="mt-4 space-y-3">
                  {[
                    "Core programming concepts and computational thinking",
                    "Problem-solving skills through coding challenges",
                    "How to break down complex problems into smaller steps",
                    "Collaboration and communication skills",
                    "Building confidence through hands-on projects",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <Card className="sticky top-24 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-baseline justify-between">
                    <span className="text-3xl font-bold">${classItem.price}</span>
                    {classItem.charter_price && classItem.charter_price !== classItem.price && (
                      <span className="text-sm font-normal text-muted-foreground">
                        ${classItem.charter_price} charter
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">{formatDate(classItem.start_date)}</p>
                        {classItem.end_date && classItem.end_date !== classItem.start_date && (
                          <p className="text-sm text-muted-foreground">to {formatDate(classItem.end_date)}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <p className="text-foreground">
                        {formatTime(classItem.start_time)} - {formatTime(classItem.end_time)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-primary" />
                      {isFull ? (
                        <p className="font-medium text-destructive">Class Full</p>
                      ) : (
                        <p className="text-foreground">
                          {spotsRemaining} of {classItem.max_spots} spots available
                        </p>
                      )}
                    </div>
                    {classItem.location && (
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-primary" />
                        <p className="text-foreground">{classItem.location}</p>
                      </div>
                    )}
                  </div>

                  {/* Progress bar for spots */}
                  <div>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-muted-foreground">Enrollment</span>
                      <span className="font-medium">
                        {classItem.spots_taken}/{classItem.max_spots}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full transition-all ${isFull ? "bg-destructive" : "bg-primary"}`}
                        style={{ width: `${(classItem.spots_taken / classItem.max_spots) * 100}%` }}
                      />
                    </div>
                  </div>

                  <Link href={`/classes/${classItem.id}/register`} className="block">
                    <Button size="lg" className="w-full bg-primary hover:bg-sprout-green-dark" disabled={isFull}>
                      {isFull ? "Join Waitlist" : "Enroll Now"}
                    </Button>
                  </Link>

                  <p className="text-center text-xs text-muted-foreground">
                    We accept charter school funds and offer flexible payment options
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
