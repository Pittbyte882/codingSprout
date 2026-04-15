import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, User, GraduationCap, Calendar } from "lucide-react"

export const metadata: Metadata = {
  title: "Student Details | Coding Sprout",
  description: "View student details and enrollments.",
}

interface StudentPageProps {
  params: Promise<{ id: string }>
}

export default async function StudentDetailPage({ params }: StudentPageProps) {
  const { id } = await params
  const supabase = await createServerSupabaseClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  // Get student — make sure it belongs to this parent
  const { data: student } = await supabase
    .from("students")
    .select("*")
    .eq("id", id)
    .eq("parent_id", user.id)
    .single()

  if (!student) notFound()

  // Get all registrations for this student
  const { data: registrations } = await supabase
    .from("registrations")
    .select("*, class:classes(*)")
    .eq("student_id", id)
    .order("registered_at", { ascending: false })

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-primary">Paid</Badge>
      case "charter_approved":
        return <Badge className="bg-primary">Charter Approved</Badge>
      case "charter_pending":
        return <Badge className="bg-warm-yellow text-yellow-900">Charter Pending</Badge>
      case "pending":
        return <Badge variant="secondary">Payment Pending</Badge>
      case "refunded":
        return <Badge variant="destructive">Refunded</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 lg:px-8">
      {/* Back button */}
      <Link
        href="/dashboard/students"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to My Students
      </Link>

      {/* Student Profile Card */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">{student.full_name}</CardTitle>
              <p className="text-muted-foreground mt-1">{student.grade_level} Grade</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            {student.date_of_birth && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
                <p className="text-sm mt-1">{formatDate(student.date_of_birth)}</p>
              </div>
            )}
            {student.school_name && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">School</p>
                <p className="text-sm mt-1">{student.school_name}</p>
              </div>
            )}
            {student.notes && (
              <div className="sm:col-span-2">
                <p className="text-sm font-medium text-muted-foreground">Notes</p>
                <p className="text-sm mt-1">{student.notes}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Enrollments Section */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-primary" />
          Class Enrollments
        </h2>
        <Link href="/classes">
          <Button size="sm" className="bg-primary hover:bg-sprout-green-dark">
            Browse Classes
          </Button>
        </Link>
      </div>

      {registrations && registrations.length > 0 ? (
        <div className="space-y-4">
          {registrations.map((reg: any) => (
            <Card key={reg.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{reg.class?.name}</h3>
                      {getStatusBadge(reg.payment_status)}
                    </div>
                    <div className="grid gap-2 sm:grid-cols-3 text-sm text-muted-foreground">
                      {reg.class?.start_date && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(reg.class.start_date)}</span>
                        </div>
                      )}
                      {reg.class?.start_time && (
                        <div>
                          <span>{reg.class.start_time} – {reg.class.end_time}</span>
                        </div>
                      )}
                      <div>
                        <span className="capitalize">
                          {reg.payment_method?.replace("_", " ")}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 text-sm">
                      <span className="font-medium text-foreground">
                        Amount: ${reg.amount_paid_cents ? (reg.amount_paid_cents / 100).toFixed(2) : "0.00"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <GraduationCap className="mx-auto h-16 w-16 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-semibold">No enrollments yet</h3>
            <p className="mt-2 text-muted-foreground">
              {student.full_name} hasn't been enrolled in any classes yet.
            </p>
            <Link href="/classes" className="mt-6 inline-block">
              <Button className="bg-primary hover:bg-sprout-green-dark">
                Browse Classes
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}