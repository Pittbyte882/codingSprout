import type { Metadata } from "next"
import Link from "next/link"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Eye, EyeOff, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Manage Blog | Coding Sprout Admin",
  description: "Create and manage blog posts.",
}

export default async function AdminBlogPage() {
  const supabase = await createServerSupabaseClient()

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false })

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Blog Posts</h1>
          <p className="mt-1 text-muted-foreground">Create and manage your blog content</p>
        </div>
        <Link href="/admin/blog/new">
          <Button className="bg-primary hover:bg-sprout-green-dark">
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </Link>
      </div>

      {/* Posts Grid */}
      {posts && posts.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.id} className={!post.is_published ? "opacity-60" : ""}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-1">{post.author_name}</CardDescription>
                  </div>
                  <Badge variant={post.is_published ? "default" : "secondary"}>
                    {post.is_published ? (
                      <>
                        <Eye className="mr-1 h-3 w-3" /> Published
                      </>
                    ) : (
                      <>
                        <EyeOff className="mr-1 h-3 w-3" /> Draft
                      </>
                    )}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.excerpt || post.content.substring(0, 100) + "..."}
                  </p>
                  <div className="text-xs text-muted-foreground">
                    {post.publish_date ? formatDate(post.publish_date) : formatDate(post.created_at)}
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Link href={`/admin/blog/${post.id}`} className="flex-1">
                    <Button variant="outline" className="w-full" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  </Link>
                  {post.is_published && (
                    <Link href={`/blog/${post.slug}`} target="_blank">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="mx-auto h-16 w-16 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-semibold">No blog posts yet</h3>
            <p className="mt-2 text-muted-foreground">Create your first blog post to get started</p>
            <Link href="/admin/blog/new" className="mt-6 inline-block">
              <Button className="bg-primary hover:bg-sprout-green-dark">
                <Plus className="mr-2 h-4 w-4" />
                Create Post
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}