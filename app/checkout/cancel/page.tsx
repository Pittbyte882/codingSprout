import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function CheckoutCancelPage({
  searchParams,
}: {
  searchParams: Promise<{ registration_id?: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()

  // Delete the pending registration if it exists
  if (params.registration_id) {
    await supabase.from("registrations").delete().eq("id", params.registration_id).eq("payment_status", "pending")
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-lg w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <XCircle className="h-10 w-10 text-destructive" />
          </div>
          <CardTitle className="text-2xl text-[#1A3A5C]">Payment Cancelled</CardTitle>
          <CardDescription>Your registration was not completed. No charges have been made.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg border bg-muted/50 p-4">
            <p className="text-sm text-muted-foreground">
              If you experienced any issues during checkout or have questions about our classes, please don&apos;t
              hesitate to contact us.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button asChild className="bg-[#4CAF50] hover:bg-[#4CAF50]/90">
              <Link href="/classes">Browse Classes</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
