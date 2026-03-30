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

  const { data: registrations } = await supabase
    .from("registrations")
    .select("*, class:classes(*)")
    .eq("parent_id", user.id)
    .eq("payment_status", "paid")

  const part1Registration = registrations?.find(
    (r) =>
      r.class?.name?.toLowerCase().includes("code explorers") &&
      !r.class?.name?.toLowerCase().includes("part 2")
  )

  if (!part1Registration) notFound()

  const part2Registration = registrations?.find(
    (r) =>
      r.class?.name?.toLowerCase().includes("code explorers") &&
      r.class?.name?.toLowerCase().includes("part 2")
  )

  return <CodeExplorersClass isPart2Unlocked={!!part2Registration} />
}