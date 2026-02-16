import type { Metadata } from "next"
import Image from "next/image"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Gallery | Coding Sprout",
  description: "See our amazing interactive coding lessons for all grade levels!",
}

export default async function GalleryPage() {
  const supabase = await createServerSupabaseClient()

  const { data: galleryImages } = await supabase
    .from("gallery")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false })

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-off-white to-sky-blue/10 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-secondary sm:text-5xl">
              Lessons Gallery
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Explore our coding lessons designed for students from TK through 12th grade!
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {galleryImages && galleryImages.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {galleryImages.map((image) => (
                <div 
                  key={image.id} 
                  className="group relative overflow-hidden rounded-2xl bg-white shadow-lg border-2 border-gray-200 hover:border-primary hover:shadow-2xl transition-all duration-300"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    <Image
                      src={image.image_url || "/placeholder.svg"}
                      alt={image.title || "Interactive Lesson"}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  
                  {/* Content Section - Solid white background for readability */}
                  <div className="p-6 bg-white">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {image.title}
                    </h3>
                    {image.description && (
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                        {image.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl shadow">
              <p className="text-xl text-muted-foreground">No lessons available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark py-16 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Ready to Start Learning?</h2>
            <p className="mt-4 text-lg opacity-90">
              Enroll in Coding Sprout to access all our interactive lessons and start your coding journey!
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <a
                href="/register"
                className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-base font-semibold text-primary transition-colors hover:bg-off-white"
              >
                Enroll Now
              </a>
              <a
                href="/classes"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
              >
                View Classes
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}