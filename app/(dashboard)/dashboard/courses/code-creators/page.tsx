import { redirect, notFound } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { CodeCreatorsClass } from "@/components/classes/code-creators"

export const metadata = {
  title: "Code Creators | Coding Sprout",
  description: "Grades 4-5 coding course dashboard",
}

export default async function CodeCreatorsPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  const { data: part1Registration } = await supabase
    .from("registrations")
    .select("*, class:classes(*)")
    .eq("parent_id", user.id)
    .eq("payment_status", "paid")
    .ilike("classes.name", "%Code Creators%")
    .not("classes.name", "ilike", "%Part 2%")
    .single()

  if (!part1Registration) notFound()

  const { data: part2Registration } = await supabase
    .from("registrations")
    .select("*, class:classes(*)")
    .eq("parent_id", user.id)
    .eq("payment_status", "paid")
    .ilike("classes.name", "%Code Creators%")
    .ilike("classes.name", "%Part 2%")
    .single()

  return <CodeCreatorsClass isPart2Unlocked={!!part2Registration} />
}