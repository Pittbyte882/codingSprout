import { redirect, notFound } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { GameMakersClass } from "@/components/classes/game-makers"

export const metadata = {
  title: "Game Makers | Coding Sprout",
  description: "Grade 3 coding course dashboard",
}

export default async function GameMakersPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  // Get all paid registrations with class data
  const { data: registrations } = await supabase
    .from("registrations")
    .select("*, class:classes(*)")
    .eq("parent_id", user.id)
    .eq("payment_status", "paid")

  // Filter in JavaScript instead
  const part1Registration = registrations?.find(
    (r) =>
      r.class?.name?.toLowerCase().includes("game makers") &&
      !r.class?.name?.toLowerCase().includes("part 2")
  )

  if (!part1Registration) notFound()

  const part2Registration = registrations?.find(
    (r) =>
      r.class?.name?.toLowerCase().includes("game makers") &&
      r.class?.name?.toLowerCase().includes("part 2")
  )

  return <GameMakersClass isPart2Unlocked={!!part2Registration} />
}