import type { Metadata } from "next"
import Link from "next/link"
import { ClassForm } from "@/components/admin/class-form"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Create Class | Coding Sprout Admin",
  description: "Create a new coding class.",
}

export default function NewClassPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        href="/admin/classes"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Classes
      </Link>

      <div className="rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border">
        <h1 className="text-2xl font-bold text-foreground">Create New Class</h1>
        <p className="mt-2 text-muted-foreground">Fill out the form to create a new coding class.</p>
        <ClassForm />
      </div>
    </div>
  )
}
