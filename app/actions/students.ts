"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function addStudent(formData: FormData) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: "Not authenticated" }
  }

  const data = {
    parent_id: user.id,
    full_name: formData.get("fullName") as string,
    grade_level: formData.get("gradeLevel") as string,
    date_of_birth: (formData.get("dateOfBirth") as string) || null,
    notes: (formData.get("notes") as string) || null,
  }

  const { error } = await supabase.from("students").insert([data])

  if (error) {
    console.error("Add student error:", error)
    return { success: false, error: "Failed to add student" }
  }

  return { success: true }
}

export async function updateStudent(studentId: string, formData: FormData) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: "Not authenticated" }
  }

  const data = {
    full_name: formData.get("fullName") as string,
    grade_level: formData.get("gradeLevel") as string,
    date_of_birth: (formData.get("dateOfBirth") as string) || null,
    notes: (formData.get("notes") as string) || null,
  }

  const { error } = await supabase.from("students").update(data).eq("id", studentId).eq("parent_id", user.id)

  if (error) {
    console.error("Update student error:", error)
    return { success: false, error: "Failed to update student" }
  }

  return { success: true }
}

export async function deleteStudent(studentId: string) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: "Not authenticated" }
  }

  const { error } = await supabase.from("students").delete().eq("id", studentId).eq("parent_id", user.id)

  if (error) {
    console.error("Delete student error:", error)
    return { success: false, error: "Failed to delete student" }
  }

  return { success: true }
}
