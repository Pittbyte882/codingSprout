import type { Metadata } from "next"
import Link from "next/link"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Sitemap | Coding Sprout",
  description: "A complete list of all pages on the Coding Sprout website.",
}

export default async function HtmlSitemapPage() {
  const supabase = await createServerSupabaseClient()

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("title, slug, category, created_at")
    .eq("is_published", true)
    .order("created_at", { ascending: false })

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const mainPages = [
  { title: "Home", url: "/" },
  { title: "Classes", url: "/classes" },
  { title: "Programs & Pricing", url: "/programs" },
  { title: "Blog", url: "/blog" },
  { title: "About Us", url: "/about" },
  { title: "Our Approach", url: "/ourapproach" },
  { title: "Gallery", url: "/gallery" },
  { title: "Contact", url: "/contact" },
  { title: "Events", url: "/events" },
  { title: "Sponsor", url: "/sponsor" },
]
  const seoPages = [
    {
      title: "Coding Classes for Kindergarteners (TK–K)",
      url: "/coding-classes-for-kindergarteners",
    },
    {
      title: "Coding Classes for 1st & 2nd Grade",
      url: "/coding-classes-for-1st-and-2nd-grade",
    },
    {
      title: "Coding Classes for 3rd Grade",
      url: "/coding-classes-for-3rd-grade",
    },
    {
      title: "Coding Classes for 4th & 5th Grade",
      url: "/coding-classes-for-4th-and-5th-grade",
    },
    {
      title: "Coding Classes for Middle School",
      url: "/coding-classes-for-middle-school",
    },
    {
      title: "Coding Classes for High School",
      url: "/coding-classes-for-high-school",
    },
  ]

  // Group blog posts by category
  const blogByCategory: Record<string, typeof posts> = {}
  const uncategorized: typeof posts = []

  posts?.forEach((post) => {
    if (post.category) {
      if (!blogByCategory[post.category]) {
        blogByCategory[post.category] = []
      }
      blogByCategory[post.category]!.push(post)
    } else {
      uncategorized.push(post)
    }
  })

  return (
    <main className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Sitemap</h1>
        <p className="text-lg text-gray-600 mb-12">
          A complete list of all pages on the Coding Sprout website.
        </p>

        {/* Main Pages */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b">
            Main Pages
          </h2>
          <ul className="space-y-3">
            {mainPages.map((page) => (
              <li key={page.url}>
                <Link
                  href={page.url}
                  className="text-sprout-green hover:text-sprout-green-dark hover:underline font-medium"
                >
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* SEO Pages */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b">
            Coding Classes by Grade
          </h2>
          <ul className="space-y-3">
            {seoPages.map((page) => (
              <li key={page.url}>
                <Link
                  href={page.url}
                  className="text-sprout-green hover:text-sprout-green-dark hover:underline font-medium"
                >
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Blog Posts by Category */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b">
            Blog Posts
          </h2>

          {Object.entries(blogByCategory).map(([cat, catPosts]) => (
            <div key={cat} className="mb-8">
              <h3 className="text-lg font-bold text-gray-700 mb-4">{cat}</h3>
              <ul className="space-y-3 ml-4">
                {catPosts?.map((post) => (
                  <li key={post.slug} className="flex items-start gap-4">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-sprout-green hover:text-sprout-green-dark hover:underline font-medium flex-1"
                    >
                      {post.title}
                    </Link>
                    <span className="text-sm text-gray-400 whitespace-nowrap">
                      {formatDate(post.created_at)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {uncategorized.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-700 mb-4">Uncategorized</h3>
              <ul className="space-y-3 ml-4">
                {uncategorized.map((post) => (
                  <li key={post.slug} className="flex items-start gap-4">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-sprout-green hover:text-sprout-green-dark hover:underline font-medium flex-1"
                    >
                      {post.title}
                    </Link>
                    <span className="text-sm text-gray-400 whitespace-nowrap">
                      {formatDate(post.created_at)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(!posts || posts.length === 0) && (
            <p className="text-gray-500">No blog posts published yet.</p>
          )}
        </section>
      </div>
    </main>
  )
}