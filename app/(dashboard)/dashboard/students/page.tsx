import type { Metadata } from "next"
import Link from "next/link"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, User, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "My Students | Coding Sprout",
  description: "Manage your enrolled students at Coding Sprout.",
}

export default async function StudentsPage() {
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data: students } = await supabase.from("students").select("*").eq("parent_id", user.id).order("full_name")

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Students</h1>
          <p className="mt-2 text-muted-foreground">Add and manage your children's profiles</p>
        </div>
        <Link href="/dashboard/students/add">
          <Button className="bg-primary hover:bg-sprout-green-dark">
            <Plus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </Link>
      </div>

      {/* Students Grid */}
      {students && students.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {students.map((student) => (
            <Card key={student.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{student.full_name}</CardTitle>
                    <CardDescription>{student.grade_level}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Link href={`/dashboard/students/${student.id}`}>
                  <Button variant="outline" className="w-full bg-transparent">
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <User className="mx-auto h-16 w-16 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-semibold">No students yet</h3>
            <p className="mt-2 text-muted-foreground">Add your first student to start enrolling in classes</p>
            <Link href="/dashboard/students/add" className="mt-6 inline-block">
              <Button className="bg-primary hover:bg-sprout-green-dark">
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Student
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
