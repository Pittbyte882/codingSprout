import { redirect, notFound } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { PythonPioneersClass } from "@/components/classes/python-pioneers"

export const metadata = {
  title: "Python Pioneers | Coding Sprout",
  description: "Grades 6-8 coding course dashboard",
}

export default async function PythonPioneersPage() {
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
      r.class?.name?.toLowerCase().includes("python pioneers") &&
      !r.class?.name?.toLowerCase().includes("part 2")
  )

  if (!part1Registration) notFound()

  const part2Registration = registrations?.find(
    (r) =>
      r.class?.name?.toLowerCase().includes("python pioneers") &&
      r.class?.name?.toLowerCase().includes("part 2")
  )

  return <PythonPioneersClass isPart2Unlocked={!!part2Registration} />
}