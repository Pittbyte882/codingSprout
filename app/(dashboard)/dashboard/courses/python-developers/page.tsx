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

  const { data: part1Registration } = await supabase
    .from("registrations")
    .select("*, class:classes(*)")
    .eq("parent_id", user.id)
    .eq("payment_status", "paid")
    .ilike("classes.name", "%Python Developers%")
    .not("classes.name", "ilike", "%Part 2%")
    .single()

  if (!part1Registration) notFound()

  const { data: part2Registration } = await supabase
    .from("registrations")
    .select("*, class:classes(*)")
    .eq("parent_id", user.id)
    .eq("payment_status", "paid")
    .ilike("classes.name", "%Python Developers%")
    .ilike("classes.name", "%Part 2%")
    .single()

  return <PythonDevelopers isPart2Unlocked={!!part2Registration} />
}