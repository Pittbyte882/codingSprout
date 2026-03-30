import { redirect, notFound } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { CodeExplorersClass } from "@/components/classes/code-explorers"

export const metadata = {
  title: "Code Explorers | Coding Sprout",
  description: "Grades 1-2 coding course dashboard",
}

export default async function CodeExplorersPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  const { data: part1Registration } = await supabase
    .from("registrations")
    .select("*, class:classes(*)")
    .eq("parent_id", user.id)
    .eq("payment_status", "paid")
    .ilike("classes.name", "%Code Explorers%")
    .not("classes.name", "ilike", "%Part 2%")
    .single()

  if (!part1Registration) notFound()

  const { data: part2Registration } = await supabase
    .from("registrations")
    .select("*, class:classes(*)")
    .eq("parent_id", user.id)
    .eq("payment_status", "paid")
    .ilike("classes.name", "%Code Explorers%")
    .ilike("classes.name", "%Part 2%")
    .single()

  return <CodeExplorersClass isPart2Unlocked={!!part2Registration} />
}