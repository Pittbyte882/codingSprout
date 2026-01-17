import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Users, Calendar, Eye, EyeOff } from "lucide-react"

export const metadata: Metadata = {
  title: "Manage Classes | Coding Sprout Admin",
  description: "Create and manage coding classes.",
}

export default async function AdminClassesPage() {
  const supabase = await createServerSupabaseClient()

  const { data: classes } = await supabase.from("classes").select("*").order("start_date", { ascending: true })

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Classes</h1>
          <p className="mt-1 text-muted-foreground">Create and manage your coding classes</p>
        </div>
        <Link href="/admin/classes/new">
          <Button className="bg-primary hover:bg-sprout-green-dark">
            <Plus className="mr-2 h-4 w-4" />
            Add Class
          </Button>
        </Link>
      </div>

      {/* Classes Grid */}
      {classes && classes.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {classes.map((classItem) => (
            <Card key={classItem.id} className={!classItem.is_published ? "opacity-60" : ""}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{classItem.name}</CardTitle>
                    <CardDescription>{classItem.grade_levels?.join(", ") || "All grades"}</CardDescription>
                  </div>
                  <Badge variant={classItem.is_published ? "default" : "secondary"}>
                    {classItem.is_published ? (
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
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(classItem.start_date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>
                      {classItem.spots_taken} / {classItem.max_spots} enrolled
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">${classItem.price}</span>
                    {classItem.charter_price && (
                      <span className="text-muted-foreground">${classItem.charter_price} charter</span>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Link href={`/admin/classes/${classItem.id}`} className="flex-1">
                    <Button variant="outline" className="w-full bg-transparent" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  </Link>
                  <Link href={`/classes/${classItem.id}`}>
                    <Button variant="ghost" size="sm">
                      View
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
            <GraduationCap className="mx-auto h-16 w-16 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-semibold">No classes yet</h3>
            <p className="mt-2 text-muted-foreground">Create your first class to get started</p>
            <Link href="/admin/classes/new" className="mt-6 inline-block">
              <Button className="bg-primary hover:bg-sprout-green-dark">
                <Plus className="mr-2 h-4 w-4" />
                Create Class
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function GraduationCap(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
    </svg>
  )
}
