import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { BlogForm } from "@/components/admin/blog-form"
import { DeleteBlogButton } from "@/components/admin/delete-blog-button"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Edit Blog Post | Coding Sprout Admin",
  description: "Edit blog post details.",
}

interface EditBlogPageProps {
  params: Promise<{ id: string }>
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { id } = await params
  const supabase = await createServerSupabaseClient()

  const { data: post } = await supabase.from("blog_posts").select("*").eq("id", id).single()

  if (!post) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        href="/admin/blog"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Blog Posts
      </Link>

      <div className="rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Edit Blog Post</h1>
            <p className="mt-2 text-muted-foreground">Update your blog post content.</p>
          </div>
          <DeleteBlogButton postId={post.id} postTitle={post.title} />
        </div>
        <BlogForm post={post} />
      </div>
    </div>
  )
}