import { redirect, notFound } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { CodingAdventures } from "@/components/classes/coding-adventures"

export const metadata = {
  title: "Coding Adventures | Coding Sprout",
  description: "TK-K coding course dashboard",
}

export default async function CodingAdventuresPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

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

  return <CodingAdventures isPart2Unlocked={!!part2Registration} />
}