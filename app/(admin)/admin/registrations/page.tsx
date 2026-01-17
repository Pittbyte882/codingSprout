import type { Metadata } from "next"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RegistrationActions } from "@/components/admin/registration-actions"

export const metadata: Metadata = {
  title: "Registrations | Coding Sprout Admin",
  description: "Manage class registrations.",
}

export default async function AdminRegistrationsPage() {
  const supabase = await createServerSupabaseClient()

  const { data: registrations } = await supabase
    .from("registrations")
    .select(
      "*, class:classes(name, start_date), student:students(full_name, grade_level), parent:profiles(full_name, email)",
    )
    .order("registered_at", { ascending: false })

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
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
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Registrations</h1>
        <p className="mt-1 text-muted-foreground">Manage class registrations and payments</p>
      </div>

      {registrations && registrations.length > 0 ? (
        <div className="space-y-4">
          {registrations.map((reg: any) => (
            <Card key={reg.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{reg.student?.full_name}</CardTitle>
                    <CardDescription>
                      {reg.class?.name} - {reg.student?.grade_level}
                    </CardDescription>
                  </div>
                  {getStatusBadge(reg.payment_status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Parent</p>
                    <p className="text-sm">{reg.parent?.full_name}</p>
                    <p className="text-xs text-muted-foreground">{reg.parent?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Class Date</p>
                    <p className="text-sm">{reg.class?.start_date ? formatDate(reg.class.start_date) : "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Payment Method</p>
                    <p className="text-sm capitalize">{reg.payment_method.replace("_", " ")}</p>
                    {reg.charter_school_name && (
                      <p className="text-xs text-muted-foreground">{reg.charter_school_name}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Amount</p>
                    <p className="text-sm">${reg.amount_paid || 0}</p>
                  </div>
                </div>

                {reg.payment_status === "charter_pending" && (
                  <div className="mt-4 pt-4 border-t">
                    <RegistrationActions registrationId={reg.id} />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No registrations yet</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
