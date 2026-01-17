"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  Calendar,
  ImageIcon,
  MessageSquare,
  Heart,
  HandHeart,
  Settings,
} from "lucide-react"
import type { Profile } from "@/lib/types"

interface AdminSidebarProps {
  profile: Profile | null
}

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Classes", href: "/admin/classes", icon: GraduationCap },
  { label: "Registrations", href: "/admin/registrations", icon: Users },
  { label: "Events", href: "/admin/events", icon: Calendar },
  { label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { label: "Contact Messages", href: "/admin/messages", icon: MessageSquare },
  { label: "Donations", href: "/admin/donations", icon: Heart },
  { label: "Volunteers", href: "/admin/volunteers", icon: HandHeart },
  { label: "Settings", href: "/admin/settings", icon: Settings },
]

export function AdminSidebar({ profile }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="hidden w-64 flex-shrink-0 border-r border-border bg-sidebar lg:block">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
          <Image src="/images/logo.png" alt="Coding Sprout" width={32} height={32} className="brightness-0 invert" />
          <span className="font-bold text-sidebar-foreground">Admin Panel</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* User Info */}
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground">
              {profile?.full_name?.[0] || "A"}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-sidebar-foreground">{profile?.full_name || "Admin"}</p>
              <p className="truncate text-xs text-sidebar-foreground/60">{profile?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
