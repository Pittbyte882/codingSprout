import type React from "react"
import { redirect } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Try to get profile with error handling
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  console.log("User ID:", user.id)
  console.log("Profile query result:", profile)
  console.log("Profile query error:", profileError)

  if (!profile) {
    console.log("Profile is null, redirecting to dashboard")
    redirect("/dashboard")
  }

  console.log("Profile role:", profile.role)

  if (profile.role !== "admin" && profile.role !== "instructor") {
    console.log("Not admin or instructor, redirecting")
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar profile={profile} />
      <div className="flex flex-1 flex-col">
        <AdminHeader user={user} profile={profile} />
        <main className="flex-1 bg-muted/30 p-6">{children}</main>
      </div>
    </div>
  )
}