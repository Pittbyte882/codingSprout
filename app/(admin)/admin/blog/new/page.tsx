import type { Metadata } from "next"
import Link from "next/link"
import { BlogForm } from "@/components/admin/blog-form"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Create Blog Post | Coding Sprout Admin",
  description: "Create a new blog post.",
}

export default function NewBlogPostPage() {
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
        <h1 className="text-2xl font-bold text-foreground">Create New Blog Post</h1>
        <p className="mt-2 text-muted-foreground">Write and publish a new blog post.</p>
        <BlogForm />
      </div>
    </div>
  )
}