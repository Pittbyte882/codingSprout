import type React from "react"
import { redirect } from "next/navigation"
import { getAdminSession } from "@/app/actions/admin-auth"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getAdminSession()

  // If no admin session, redirect to admin login
  if (!session) {
    redirect("/admin/login")
  }

  // Create a profile-like object for compatibility with existing components
  const adminProfile = {
    id: session.adminId,
    email: session.email,
    full_name: session.fullName,
    first_name: null,
    last_name: null,
    phone: null,
    role: session.role as "admin" | "instructor" | "parent",
    payment_type: null,
    school_id: null,
    other_school_name: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  // Create a user-like object for compatibility with existing components
  const adminUser = {
    id: session.adminId,
    email: session.email,
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar profile={adminProfile} />
      <div className="flex flex-1 flex-col">
        <AdminHeader user={adminUser} profile={adminProfile} />
        <main className="flex-1 bg-muted/30 p-6">{children}</main>
      </div>
    </div>
  )
}