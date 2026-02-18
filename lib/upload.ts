import { createClient } from "@/lib/supabase/client"

export async function uploadBlogMedia(file: File): Promise<{ url: string; error?: string }> {
  const supabase = createClient()

  // Generate unique filename
  const fileExt = file.name.split(".").pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
  const filePath = `blog/${fileName}`

  // Upload file
  const { error: uploadError } = await supabase.storage.from("blog-media").upload(filePath, file)

  if (uploadError) {
    console.error("Upload error:", uploadError)
    return { url: "", error: uploadError.message }
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("blog-media").getPublicUrl(filePath)

  return { url: publicUrl }
}

export async function deleteBlogMedia(url: string): Promise<boolean> {
  const supabase = createClient()

  // Extract file path from URL
  const path = url.split("/blog-media/").pop()
  if (!path) return false

  const { error } = await supabase.storage.from("blog-media").remove([path])

  if (error) {
    console.error("Delete error:", error)
    return false
  }

  return true
}