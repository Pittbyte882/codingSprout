import type { Metadata } from "next"
import Link from "next/link"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, Users, Calendar, DollarSign, MessageSquare, TrendingUp, Plus, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Admin Dashboard | Coding Sprout",
  description: "Manage Coding Sprout classes, students, and registrations.",
}

export default async function AdminDashboardPage() {
  const supabase = await createServerSupabaseClient()

  // Get counts
  const [
    { count: classCount },
    { count: registrationCount },
    { count: eventCount },
    { count: messageCount },
    { data: recentRegistrations },
    { data: pendingCharterPayments },
  ] = await Promise.all([
    supabase.from("classes").select("*", { count: "exact", head: true }).eq("is_published", true),
    supabase.from("registrations").select("*", { count: "exact", head: true }),
    supabase
      .from("events")
      .select("*", { count: "exact", head: true })
      .eq("is_published", true)
      .gte("event_date", new Date().toISOString().split("T")[0]),
    supabase.from("contact_submissions").select("*", { count: "exact", head: true }).eq("is_read", false),
    supabase
      .from("registrations")
      .select("*, class:classes(name), student:students(full_name), parent:profiles(full_name, email)")
      .order("registered_at", { ascending: false })
      .limit(5),
    supabase
      .from("registrations")
      .select("*, class:classes(name), student:students(full_name), parent:profiles(full_name, email)")
      .eq("payment_status", "charter_pending")
      .order("registered_at", { ascending: false }),
  ])

  const stats = [
    { label: "Active Classes", value: classCount || 0, icon: GraduationCap, href: "/admin/classes" },
    { label: "Total Registrations", value: registrationCount || 0, icon: Users, href: "/admin/registrations" },
    { label: "Upcoming Events", value: eventCount || 0, icon: Calendar, href: "/admin/events" },
    { label: "Unread Messages", value: messageCount || 0, icon: MessageSquare, href: "/admin/messages" },
  ]

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="mt-1 text-muted-foreground">Manage your Coding Sprout platform</p>
        </div>
        <Link href="/admin/classes/new">
          <Button className="bg-primary hover:bg-sprout-green-dark">
            <Plus className="mr-2 h-4 w-4" />
            Add Class
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pending Charter Payments */}
        {pendingCharterPayments && pendingCharterPayments.length > 0 && (
          <Card className="border-warm-yellow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-warm-yellow" />
                Pending Charter Payments
              </CardTitle>
              <CardDescription>Registrations awaiting charter school approval</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingCharterPayments.map((reg: any) => (
                  <div key={reg.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <p className="font-medium">{reg.student?.full_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {reg.class?.name} - {reg.charter_school_name}
                      </p>
                    </div>
                    <Link href={`/admin/registrations/${reg.id}`}>
                      <Button size="sm" variant="outline">
                        Review
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Registrations */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Recent Registrations
              </CardTitle>
              <CardDescription>Latest class enrollments</CardDescription>
            </div>
            <Link href="/admin/registrations">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {recentRegistrations && recentRegistrations.length > 0 ? (
              <div className="space-y-4">
                {recentRegistrations.map((reg: any) => (
                  <div key={reg.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <p className="font-medium">{reg.student?.full_name}</p>
                      <p className="text-sm text-muted-foreground">{reg.class?.name}</p>
                    </div>
                    <span
                      className={`text-xs font-medium ${reg.payment_status === "paid" ? "text-primary" : "text-muted-foreground"}`}
                    >
                      {reg.payment_status.replace("_", " ")}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-4">No registrations yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
