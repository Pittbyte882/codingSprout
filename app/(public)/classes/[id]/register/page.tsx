import type { Metadata } from "next"
import { redirect, notFound } from "next/navigation"
import Link from "next/link"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { ClassRegistrationForm } from "@/components/classes/class-registration-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, MapPin, Video } from "lucide-react"

interface RegisterPageProps {
  params: Promise<{ id: string }>
}

export const metadata: Metadata = {
  title: "Register for Class | Coding Sprout",
  description: "Complete your registration for a Coding Sprout class.",
}

export default async function RegisterPage({ params }: RegisterPageProps) {
  const { id } = await params
  const supabase = await createServerSupabaseClient()

  // Check if user is logged in
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/login?redirect=/classes/${id}/register`)
  }

  // Get class details
  const { data: classItem } = await supabase.from("classes").select("*").eq("id", id).single()

  if (!classItem) {
    notFound()
  }

  // Get user's students
  const { data: students } = await supabase.from("students").select("*").eq("parent_id", user.id).order("full_name")

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

  const spotsRemaining = classItem.max_spots - classItem.spots_taken
  const isFull = spotsRemaining <= 0

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Back Link */}
      <div className="border-b bg-card">
        <div className="mx-auto max-w-3xl px-4 py-4 lg:px-8">
          <Link
            href={`/classes/${id}`}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Class Details
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-8 lg:px-8">
        <h1 className="text-2xl font-bold text-foreground">Register for Class</h1>
        <p className="mt-2 text-muted-foreground">Complete the form below to enroll your child</p>

        {/* Class Summary */}
        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{classItem.name}</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  {classItem.grade_levels?.join(", ") || "All grades"}
                </p>
              </div>
              {classItem.is_online ? (
                <Badge className="bg-sky-blue/10 text-sky-blue">
                  <Video className="mr-1 h-3 w-3" />
                  Online
                </Badge>
              ) : (
                <Badge className="bg-primary/10 text-primary">
                  <MapPin className="mr-1 h-3 w-3" />
                  In-Person
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{formatDate(classItem.start_date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>
                  {formatTime(classItem.start_time)} - {formatTime(classItem.end_time)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Registration Form */}
        {isFull ? (
          <Card className="mt-6">
            <CardContent className="py-8 text-center">
              <h3 className="text-lg font-semibold text-destructive">This class is full</h3>
              <p className="mt-2 text-muted-foreground">Please check back later or contact us to join the waitlist.</p>
              <Link href="/contact" className="mt-4 inline-block">
                <button className="text-primary hover:underline">Contact Us</button>
              </Link>
            </CardContent>
          </Card>
        ) : !students || students.length === 0 ? (
          <Card className="mt-6">
            <CardContent className="py-8 text-center">
              <h3 className="text-lg font-semibold">Add a Student First</h3>
              <p className="mt-2 text-muted-foreground">
                You need to add at least one student to your account before registering for classes.
              </p>
              <Link
                href={`/dashboard/students/add?redirect=/classes/${id}/register`}
                className="mt-4 inline-block rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-sprout-green-dark"
              >
                Add a Student
              </Link>
            </CardContent>
          </Card>
        ) : (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Registration Details</CardTitle>
            </CardHeader>
            <CardContent>
              <ClassRegistrationForm classItem={classItem} students={students} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
