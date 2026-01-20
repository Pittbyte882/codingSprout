import type { Metadata } from "next"
import Image from "next/image"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Gallery | Coding Sprout",
  description: "See photos of our students and their amazing coding projects at Coding Sprout.",
}

// Placeholder images - using Unsplash for high-quality stock photos
const placeholderImages = [
  { 
    id: 1, 
    title: "Students learning Scratch", 
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=800&fit=crop"
  },
  { 
    id: 2, 
    title: "Game development class", 
    image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=800&h=800&fit=crop"
  },
  { 
    id: 3, 
    title: "Coding workshop", 
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=800&fit=crop"
  },
  { 
    id: 4, 
    title: "Student project showcase", 
    image: "https://images.unsplash.com/photo-1596496050755-c923e73e42e1?w=800&h=800&fit=crop"
  },
  { 
    id: 5, 
    title: "Python programming", 
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=800&fit=crop"
  },
  { 
    id: 6, 
    title: "Group collaboration", 
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=800&fit=crop"
  },
]

export default async function GalleryPage() {
  const supabase = await createServerSupabaseClient()

  const { data: galleryImages } = await supabase
    .from("gallery")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false })

  const images = galleryImages?.length ? galleryImages : null

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-off-white to-sky-blue/10 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-secondary sm:text-5xl">Student Gallery</h1>
            <p className="mt-6 text-lg text-muted-foreground">
              See our amazing students in action and check out their incredible projects!
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {images ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((image) => (
                <div key={image.id} className="group relative aspect-square overflow-hidden rounded-2xl bg-muted">
                  <Image
                    src={image.image_url || "/placeholder.svg"}
                    alt={image.title || "Student work"}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {image.title && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <p className="text-sm font-medium text-white">{image.title}</p>
                      {image.description && <p className="text-xs text-white/80">{image.description}</p>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {placeholderImages.map((image) => (
                <div key={image.id} className="group relative aspect-square overflow-hidden rounded-2xl bg-muted">
                  <Image
                    src={image.image}
                    alt={image.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="text-sm font-medium text-white">{image.title}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}