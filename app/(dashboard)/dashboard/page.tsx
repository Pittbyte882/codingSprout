import type { Metadata } from "next"
import Link from "next/link"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, GraduationCap, Calendar, Plus, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Dashboard | Coding Sprout",
  description: "Manage your Coding Sprout enrollments and students.",
}

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  // Get profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Get students
  const { data: students } = await supabase.from("students").select("*").eq("parent_id", user.id)

  // Get upcoming registrations
  const { data: registrations } = await supabase
    .from("registrations")
    .select("*, class:classes(*), student:students(*)")
    .eq("parent_id", user.id)
    .order("registered_at", { ascending: false })
    .limit(5)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Welcome back, {profile?.full_name || "Parent"}!</h1>
        <p className="mt-2 text-muted-foreground">Manage your students and class enrollments</p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students?.length || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Enrollments</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {registrations?.filter((r) => r.payment_status === "paid" || r.payment_status === "charter_approved")
                .length || 0}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Classes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {registrations?.filter(
                (r) => r.class?.start_date && new Date(r.class.start_date) >= new Date() && r.payment_status === "paid",
              ).length || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Students Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>My Students</CardTitle>
              <CardDescription>Manage your enrolled students</CardDescription>
            </div>
            <Link href="/dashboard/students/add">
              <Button size="sm" className="bg-primary hover:bg-sprout-green-dark">
                <Plus className="mr-2 h-4 w-4" />
                Add Student
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {students && students.length > 0 ? (
              <div className="space-y-4">
                {students.map((student) => (
                  <div key={student.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <p className="font-medium">{student.full_name}</p>
                      <p className="text-sm text-muted-foreground">{student.grade_level}</p>
                    </div>
                    <Link href={`/dashboard/students/${student.id}`}>
                      <Button variant="ghost" size="sm">
                        View
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">No students added yet</p>
                <Link href="/dashboard/students/add" className="mt-4 inline-block">
                  <Button variant="outline" size="sm">
                    Add Your First Student
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Enrollments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Enrollments</CardTitle>
              <CardDescription>Your latest class registrations</CardDescription>
            </div>
            <Link href="/classes">
              <Button size="sm" variant="outline">
                Browse Classes
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {registrations && registrations.length > 0 ? (
              <div className="space-y-4">
                {registrations.map((reg) => (
                  <div key={reg.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <p className="font-medium">{reg.class?.name || "Class"}</p>
                      <p className="text-sm text-muted-foreground">{reg.student?.full_name}</p>
                    </div>
                    <Badge
                      variant={
                        reg.payment_status === "paid" || reg.payment_status === "charter_approved"
                          ? "default"
                          : "secondary"
                      }
                      className={
                        reg.payment_status === "paid" || reg.payment_status === "charter_approved" ? "bg-primary" : ""
                      }
                    >
                      {reg.payment_status.replace("_", " ")}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <GraduationCap className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">No enrollments yet</p>
                <Link href="/classes" className="mt-4 inline-block">
                  <Button variant="outline" size="sm">
                    Browse Available Classes
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
