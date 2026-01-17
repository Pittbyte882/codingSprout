"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { createBrowserSupabaseClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import {
  Menu,
  User,
  LogOut,
  Home,
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
import type { User as SupabaseUser } from "@supabase/supabase-js"
import type { Profile } from "@/lib/types"

interface AdminHeaderProps {
  user: SupabaseUser
  profile: Profile | null
}

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Classes", href: "/admin/classes", icon: GraduationCap },
  { label: "Registrations", href: "/admin/registrations", icon: Users },
  { label: "Events", href: "/admin/events", icon: Calendar },
  { label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
  { label: "Donations", href: "/admin/donations", icon: Heart },
  { label: "Volunteers", href: "/admin/volunteers", icon: HandHeart },
  { label: "Settings", href: "/admin/settings", icon: Settings },
]

export function AdminHeader({ user, profile }: AdminHeaderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  async function handleSignOut() {
    const supabase = createBrowserSupabaseClient()
    await supabase.auth.signOut()
    toast.success("Signed out successfully")
    router.push("/")
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-border bg-card">
      <div className="flex h-full items-center justify-between px-4 lg:px-6">
        {/* Mobile Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex h-16 items-center gap-2 border-b px-6">
              <Image src="/images/logo.png" alt="Coding Sprout" width={32} height={32} />
              <span className="font-bold">Admin Panel</span>
            </div>
            <nav className="space-y-1 p-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Page Title - could be dynamic */}
        <div className="lg:hidden">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo.png" alt="Coding Sprout" width={32} height={32} />
          </Link>
        </div>

        <div className="hidden lg:block" />

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <Home className="mr-2 h-4 w-4" />
              View Site
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <User className="h-4 w-4" />
                </div>
                <span className="hidden sm:block">{profile?.full_name || user.email}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium">{profile?.full_name || "Admin"}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
