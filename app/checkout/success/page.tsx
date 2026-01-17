import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { CheckCircle, Calendar, Clock, Video, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; registration_id?: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()

  if (!params.registration_id) {
    redirect("/classes")
  }

  // Update registration status if coming from Stripe
  if (params.session_id) {
    await supabase
      .from("registrations")
      .update({
        payment_status: "paid",
        status: "confirmed",
      })
      .eq("id", params.registration_id)
  }

  // Fetch registration details
  const { data: registration } = await supabase
    .from("registrations")
    .select(`
      *,
      class:classes(*),
      student:students(*)
    `)
    .eq("id", params.registration_id)
    .single()

  if (!registration) {
    redirect("/classes")
  }

  const classData = registration.class
  const student = registration.student

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-lg w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#4CAF50]/10">
            <CheckCircle className="h-10 w-10 text-[#4CAF50]" />
          </div>
          <CardTitle className="text-2xl text-[#1A3A5C]">Registration Successful!</CardTitle>
          <CardDescription>{student?.first_name} has been enrolled in the class</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg border bg-muted/50 p-4 space-y-3">
            <h3 className="font-semibold text-[#1A3A5C]">{classData?.name}</h3>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(classData?.start_date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{classData?.time_slot}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {classData?.class_type === "online" ? (
                <>
                  <Video className="h-4 w-4" />
                  <span>Online via Zoom</span>
                </>
              ) : (
                <>
                  <MapPin className="h-4 w-4" />
                  <span>{classData?.location || "In-Person"}</span>
                </>
              )}
            </div>

            {registration.is_one_on_one && (
              <div className="mt-2 inline-block rounded-full bg-[#87CEEB]/20 px-3 py-1 text-xs font-medium text-[#1A3A5C]">
                One-on-One Session
              </div>
            )}
          </div>

          <div className="rounded-lg border border-[#4CAF50]/20 bg-[#4CAF50]/5 p-4">
            <p className="text-sm text-[#1A3A5C]">
              <strong>What&apos;s next?</strong> You will receive a confirmation email with all the class details
              {classData?.class_type === "online" && " including the Zoom link"}.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button asChild className="bg-[#4CAF50] hover:bg-[#4CAF50]/90">
              <Link href="/dashboard/enrollments">View My Enrollments</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/classes">Browse More Classes</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
