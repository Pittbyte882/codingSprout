"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { saveBlogPost } from "@/app/actions/blog"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  is_published: boolean
}

interface BlogFormProps {
  post?: BlogPost
}

export function BlogForm({ post }: BlogFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPublished, setIsPublished] = useState(post?.is_published ?? false)
  const [title, setTitle] = useState(post?.title || "")
  const [slug, setSlug] = useState(post?.slug || "")

  // Auto-generate slug from title
  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle)
    if (!post?.id) {
      // Only auto-generate slug for new posts
      const autoSlug = newTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
      setSlug(autoSlug)
    }
  }

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)

    formData.append("isPublished", String(isPublished))

    if (post?.id) {
      formData.append("id", post.id)
    }

    try {
      const result = await saveBlogPost(formData)
      if (result.success) {
        toast.success(post ? "Blog post updated!" : "Blog post created!")
        router.push("/admin/blog")
        router.refresh()
      } else {
        toast.error(result.error || "Failed to save blog post")
      }
    } catch {
      toast.error("Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form action={handleSubmit} className="mt-6 space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          required
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="e.g., Why Coding is Important for Kids"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">URL Slug</Label>
        <Input
          id="slug"
          name="slug"
          required
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="e.g., why-coding-is-important-for-kids"
        />
        <p className="text-xs text-muted-foreground">
          This will be the URL: codingsprout.com/blog/{slug || "your-slug"}
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt (Optional)</Label>
        <Textarea
          id="excerpt"
          name="excerpt"
          rows={3}
          defaultValue={post?.excerpt || ""}
          placeholder="A short summary of your blog post (shown in previews)"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          rows={20}
          required
          defaultValue={post?.content || ""}
          placeholder="Write your blog post content here..."
          className="font-mono text-sm"
        />
        <p className="text-xs text-muted-foreground">
          Tip: Write in plain text with line breaks for paragraphs. We'll format it nicely on display.
        </p>
      </div>

      <div className="flex items-center justify-between rounded-lg border p-4">
        <div>
          <Label htmlFor="isPublished">Published</Label>
          <p className="text-sm text-muted-foreground">Make this post visible on your website</p>
        </div>
        <Switch id="isPublished" checked={isPublished} onCheckedChange={setIsPublished} />
      </div>

      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/blog")}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" className="flex-1 bg-primary hover:bg-sprout-green-dark" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : post ? "Update Post" : "Create Post"}
        </Button>
      </div>
    </form>
  )
}