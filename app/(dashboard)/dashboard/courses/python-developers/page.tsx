import { redirect, notFound } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { PythonDevelopers } from "@/components/classes/python-developers"

export const metadata = {
  title: "Python Developers | Coding Sprout",
  description: "Grades 9-12 coding course dashboard",
}

export default async function PythonDevelopersPage() {
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
      r.class?.name?.toLowerCase().includes("python developers") &&
      !r.class?.name?.toLowerCase().includes("part 2")
  )

  if (!part1Registration) notFound()

  const part2Registration = registrations?.find(
    (r) =>
      r.class?.name?.toLowerCase().includes("python developers") &&
      r.class?.name?.toLowerCase().includes("part 2")
  )

  return <PythonDevelopers isPart2Unlocked={!!part2Registration} />
}