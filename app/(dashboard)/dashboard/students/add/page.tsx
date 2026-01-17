import type { Metadata } from "next"
import Link from "next/link"
import { AddStudentForm } from "@/components/dashboard/add-student-form"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Add Student | Coding Sprout",
  description: "Add a new student to your Coding Sprout account.",
}

export default function AddStudentPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 lg:px-8">
      {/* Back Link */}
      <Link
        href="/dashboard/students"
        className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Students
      </Link>

      <div className="rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border">
        <h1 className="text-2xl font-bold text-foreground">Add New Student</h1>
        <p className="mt-2 text-muted-foreground">Add your child's information to enroll them in coding classes.</p>
        <AddStudentForm />
      </div>
    </div>
  )
}
