"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function saveBlogPost(formData: FormData) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: "Not authenticated" }
  }

  // Verify admin
  const { data: profile } = await supabase.from("profiles").select("role, full_name").eq("id", user.id).single()

  if (profile?.role !== "admin" && profile?.role !== "instructor") {
    return { success: false, error: "Not authorized" }
  }

  const id = formData.get("id") as string | null
  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const excerpt = formData.get("excerpt") as string
  const content = formData.get("content") as string
  const isPublished = formData.get("isPublished") === "true"

  const data = {
    title,
    slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    excerpt,
    content,
    author_id: user.id,
    author_name: profile?.full_name || "Admin",
    is_published: isPublished,
    publish_date: isPublished ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  }

  let error

  if (id) {
    const result = await supabase.from("blog_posts").update(data).eq("id", id)
    error = result.error
  } else {
    const result = await supabase.from("blog_posts").insert([data])
    error = result.error
  }

  if (error) {
    console.error("Save blog post error:", error)
    return { success: false, error: error.message || "Failed to save blog post" }
  }

  revalidatePath("/admin/blog")
  revalidatePath("/blog")

  return { success: true }
}

export async function deleteBlogPost(postId: string) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: "Not authenticated" }
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (profile?.role !== "admin" && profile?.role !== "instructor") {
    return { success: false, error: "Not authorized" }
  }

  const { error } = await supabase.from("blog_posts").delete().eq("id", postId)

  if (error) {
    console.error("Delete blog post error:", error)
    return { success: false, error: "Failed to delete blog post" }
  }

  revalidatePath("/admin/blog")
  revalidatePath("/blog")

  return { success: true }
}