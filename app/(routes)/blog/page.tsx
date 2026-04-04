import type { Metadata } from "next"
import Link from "next/link"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, User } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog | Coding Sprout",
  description: "Read our latest articles about coding education, tips for parents, and news from Coding Sprout.",
}

const BLOG_CATEGORIES = [
  "All",
  "Getting Started",
  "Coding by Age",
  "Coding Languages & Tools",
  "Classes & Programs",
  "Projects & Activities",
  "Benefits of Coding",
  "Parenting & STEM",
]

interface BlogPageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category } = await searchParams
  const supabase = await createServerSupabaseClient()

  let query = supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("publish_date", { ascending: false })

  if (category && category !== "All") {
    query = query.eq("category", category)
  }

  const { data: posts } = await query

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-off-white to-sky-blue/10 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-secondary sm:text-5xl">Our Blog</h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Insights, tips, and news about coding education for kids
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="border-b bg-white sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 py-4">
          <div className="flex flex-wrap gap-2">
            {BLOG_CATEGORIES.map((cat) => {
              const isActive = cat === "All" ? !category || category === "All" : category === cat
              return (
                <Link
                  key={cat}
                  href={cat === "All" ? "/blog" : `/blog?category=${encodeURIComponent(cat)}`}
                >
                  <Badge
                    variant={isActive ? "default" : "outline"}
                    className={`cursor-pointer text-sm px-4 py-1.5 ${
                      isActive
                        ? "bg-sprout-green hover:bg-sprout-green-dark"
                        : "hover:border-sprout-green hover:text-sprout-green"
                    }`}
                  >
                    {cat}
                  </Badge>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {posts && posts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Card key={post.id} className="group hover:shadow-lg transition-shadow flex flex-col">
                  {post.featured_image_url && !post.featured_image_url.match(/\.(mp4|webm|ogg)$/i) && (
                    <div className="overflow-hidden rounded-t-lg">
                      <img
                        src={post.featured_image_url}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardHeader>
                    {post.category && (
                      <Badge variant="outline" className="w-fit text-xs text-sprout-green border-sprout-green mb-2">
                        {post.category}
                      </Badge>
                    )}
                    <CardTitle className="text-xl group-hover:text-sprout-green transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4 text-xs">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(post.publish_date || post.created_at)}
                      </span>
                      {post.author_name && (
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {post.author_name}
                        </span>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <p className="text-muted-foreground line-clamp-3 mb-4">
                      {post.excerpt || post.content.replace(/<[^>]*>/g, "").substring(0, 150) + "..."}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-sm font-medium text-sprout-green hover:text-sprout-green-dark"
                    >
                      Read more
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {category && category !== "All"
                  ? `No posts in "${category}" yet. Check back soon!`
                  : "No blog posts yet. Check back soon!"}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}