import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { ClassForm } from "@/components/admin/class-form"
import { DeleteClassButton } from "@/components/admin/delete-class-button"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Edit Class | Coding Sprout Admin",
  description: "Edit coding class details.",
}

interface EditClassPageProps {
  params: Promise<{ id: string }>
}

export default async function EditClassPage({ params }: EditClassPageProps) {
  const { id } = await params
  const supabase = await createServerSupabaseClient()

  const { data: classItem } = await supabase.from("classes").select("*").eq("id", id).single()

  if (!classItem) {
    notFound()
  }

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
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Edit Class</h1>
            <p className="mt-2 text-muted-foreground">Update class information.</p>
          </div>
          <DeleteClassButton classId={classItem.id} classTitle={classItem.name} />
        </div>
        <ClassForm classItem={classItem} />
      </div>
    </div>
  )
}
