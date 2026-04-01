import { redirect, notFound } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { CodingAdventures } from "@/components/classes/coding-adventures"
import { ZoomMeeting } from "@/components/zoom/zoom-meeting"

export const metadata = {
  title: "Coding Adventures | Coding Sprout",
  description: "TK-K coding course dashboard",
}

export default async function CodingAdventuresPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email")
    .eq("id", user.id)
    .single()

  const { data: registrations } = await supabase
    .from("registrations")
    .select("*, class:classes(*)")
    .eq("parent_id", user.id)
    .eq("payment_status", "paid")

  const part1Registration = registrations?.find(
    (r) =>
      r.class?.name?.toLowerCase().includes("coding adventures") &&
      !r.class?.name?.toLowerCase().includes("part 2")
  )

  if (!part1Registration) notFound()

  const part2Registration = registrations?.find(
    (r) =>
      r.class?.name?.toLowerCase().includes("coding adventures") &&
      r.class?.name?.toLowerCase().includes("part 2")
  )

  const classData = part1Registration.class
  const isLive = classData?.zoom_is_live && classData?.zoom_link

  return (
    <div className="flex h-screen overflow-hidden">
      <div className={`overflow-y-auto ${isLive ? "w-1/2" : "w-full"}`}>
        <CodingAdventures isPart2Unlocked={!!part2Registration} />
      </div>
      {isLive && (
        <div className="w-1/2 border-l p-4 bg-background">
          <ZoomMeeting
          roomUrl={classData.zoom_link}
          userName={profile?.full_name || "Student"}
        />
        </div>
      )}
    </div>
  )
}