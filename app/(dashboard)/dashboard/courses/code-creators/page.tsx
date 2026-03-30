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

  const { data: registrations } = await supabase
    .from("registrations")
    .select("*, class:classes(*)")
    .eq("parent_id", user.id)
    .eq("payment_status", "paid")

  const part1Registration = registrations?.find(
    (r) =>
      r.class?.name?.toLowerCase().includes("code creators") &&
      !r.class?.name?.toLowerCase().includes("part 2")
  )

  if (!part1Registration) notFound()

  const part2Registration = registrations?.find(
    (r) =>
      r.class?.name?.toLowerCase().includes("code creators") &&
      r.class?.name?.toLowerCase().includes("part 2")
  )

  return <CodeCreatorsClass isPart2Unlocked={!!part2Registration} />
}