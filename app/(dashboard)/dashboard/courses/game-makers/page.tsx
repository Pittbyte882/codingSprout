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

  const { data: part1Registration } = await supabase
    .from("registrations")
    .select("*, class:classes(*)")
    .eq("parent_id", user.id)
    .eq("payment_status", "paid")
    .ilike("classes.name", "%Game Makers%")
    .not("classes.name", "ilike", "%Part 2%")
    .single()

  if (!part1Registration) notFound()

  const { data: part2Registration } = await supabase
    .from("registrations")
    .select("*, class:classes(*)")
    .eq("parent_id", user.id)
    .eq("payment_status", "paid")
    .ilike("classes.name", "%Game Makers%")
    .ilike("classes.name", "%Part 2%")
    .single()

  return <GameMakersClass isPart2Unlocked={!!part2Registration} />
}