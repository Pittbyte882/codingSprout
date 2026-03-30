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

  const { data: part1Registration } = await supabase
    .from("registrations")
    .select("*, class:classes(*)")
    .eq("parent_id", user.id)
    .eq("payment_status", "paid")
    .ilike("classes.name", "%Python Pioneers%")
    .not("classes.name", "ilike", "%Part 2%")
    .single()

  if (!part1Registration) notFound()

  const { data: part2Registration } = await supabase
    .from("registrations")
    .select("*, class:classes(*)")
    .eq("parent_id", user.id)
    .eq("payment_status", "paid")
    .ilike("classes.name", "%Python Pioneers%")
    .ilike("classes.name", "%Part 2%")
    .single()

  return <PythonPioneersClass isPart2Unlocked={!!part2Registration} />
}