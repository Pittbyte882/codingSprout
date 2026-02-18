"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { uploadBlogMedia } from "@/lib/upload"
import { Loader2, Upload, X } from "lucide-react"
import { saveBlogPost } from "@/app/actions/blog"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  is_published: boolean
  featured_image_url?: string
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
  const [featuredImage, setFeaturedImage] = useState(post?.featured_image_url || "")
  const [isUploading, setIsUploading] = useState(false)

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle)
    if (!post?.id) {
      const autoSlug = newTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
      setSlug(autoSlug)
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      toast.error("Please upload an image or video file")
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB")
      return
    }

    setIsUploading(true)
    const result = await uploadBlogMedia(file)
    setIsUploading(false)

    if (result.error) {
      toast.error("Failed to upload: " + result.error)
    } else {
      setFeaturedImage(result.url)
      toast.success("Media uploaded successfully!")
    }
  }

  function removeFeaturedImage() {
    setFeaturedImage("")
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
        <Label htmlFor="featuredImage">Featured Image/Video (Optional)</Label>

        {featuredImage ? (
          <div className="relative">
            {featuredImage.match(/\.(mp4|webm|ogg)$/i) ? (
              <video src={featuredImage} controls className="w-full rounded-lg max-h-96" />
            ) : (
              <img src={featuredImage} alt="Featured" className="w-full rounded-lg max-h-96 object-cover" />
            )}
            <button
              type="button"
              onClick={removeFeaturedImage}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              id="featuredImage"
              type="file"
              accept="image/*,video/*"
              onChange={handleImageUpload}
              disabled={isUploading}
              className="hidden"
            />
            <label
              htmlFor="featuredImage"
              className="cursor-pointer flex flex-col items-center gap-2"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
                  <p className="text-sm text-gray-600">Uploading...</p>
                </>
              ) : (
                <>
                  <Upload className="h-8 w-8 text-gray-400" />
                  <p className="text-sm text-gray-600">Click to upload image or video</p>
                  <p className="text-xs text-gray-500">PNG, JPG, MP4, WebM (max 10MB)</p>
                </>
              )}
            </label>
          </div>
        )}

        <input type="hidden" name="featuredImageUrl" value={featuredImage} />
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