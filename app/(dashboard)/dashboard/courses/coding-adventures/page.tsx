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

  const { data: part1Registration } = await supabase
    .from("registrations")
    .select("*, class:classes(*)")
    .eq("parent_id", user.id)
    .eq("payment_status", "paid")
    .ilike("classes.name", "%Coding Adventures%")
    .not("classes.name", "ilike", "%Part 2%")
    .single()

  if (!part1Registration) notFound()

  const { data: part2Registration } = await supabase
    .from("registrations")
    .select("*, class:classes(*)")
    .eq("parent_id", user.id)
    .eq("payment_status", "paid")
    .ilike("classes.name", "%Coding Adventures%")
    .ilike("classes.name", "%Part 2%")
    .single()

  return <CodingAdventures isPart2Unlocked={!!part2Registration} />
}