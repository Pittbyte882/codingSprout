import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, User } from "lucide-react"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createServerSupabaseClient()
  const { data: post } = await supabase.from("blog_posts").select("*").eq("slug", slug).single()

  if (!post) {
    return { title: "Post Not Found | Coding Sprout" }
  }

  return {
    title: `${post.title} | Coding Sprout Blog`,
    description: post.excerpt || post.content.substring(0, 160),
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const supabase = await createServerSupabaseClient()

  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single()

  if (!post) {
    notFound()
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  

  return (
    <div>
      {/* Back Link */}
      <div className="border-b bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 py-4 lg:px-8">
          <Link href="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Article */}
      <article className="py-12 lg:py-16">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          {/* Header */}
          <header className="mb-8">
              {post.category && (
                <Link href={`/blog?category=${encodeURIComponent(post.category)}`}>
                  <Badge variant="outline" className="text-sprout-green border-sprout-green mb-4 w-fit inline-block">
                    {post.category}
                  </Badge>
                </Link>
              )}
              <h1 className="text-4xl font-bold tracking-tight text-deep-navy sm:text-5xl mb-4">{post.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.publish_date || post.created_at)}
                </span>
                {post.author_name && (
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {post.author_name}
                  </span>
                )}
              </div>
            </header>
      {/* Featured Image/Video */}
          {post.featured_image_url && (
            <div className="mb-8">
              {post.featured_image_url.match(/\.(mp4|webm|ogg)$/i) ? (
                <video 
                  src={post.featured_image_url} 
                  controls 
                  className="w-full rounded-2xl"
                />
              ) : (
                <img
                  src={post.featured_image_url}
                  alt={post.title}
                  className="w-full rounded-2xl object-cover max-h-[500px]"
                />
              )}
            </div>
          )}
          {/* Content — renders rich HTML from editor */}
            <div
              className="prose prose-lg max-w-none prose-headings:text-deep-navy prose-a:text-sprout-green prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-gradient-to-br from-sprout-green to-sprout-green-dark p-8 text-white">
            <h3 className="text-2xl font-bold mb-3">Ready to Get Started?</h3>
            <p className="mb-6 text-white/90">
              Enroll your child in one of our coding classes and watch them grow into confident coders!
            </p>
            <Link
              href="/classes"
              className="inline-block bg-white text-sprout-green px-8 py-3 rounded-lg font-semibold hover:bg-off-white transition-colors"
            >
              Browse Classes
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}