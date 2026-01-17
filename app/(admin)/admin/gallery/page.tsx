import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, ImageIcon } from "lucide-react"
import { GalleryItemActions } from "@/components/admin/gallery-item-actions"

export const metadata: Metadata = {
  title: "Gallery | Coding Sprout Admin",
  description: "Manage gallery photos.",
}

export default async function AdminGalleryPage() {
  const supabase = await createServerSupabaseClient()

  const { data: galleryItems } = await supabase.from("gallery").select("*").order("created_at", { ascending: false })

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gallery</h1>
          <p className="mt-1 text-muted-foreground">Upload and manage student photos</p>
        </div>
        <Link href="/admin/gallery/upload">
          <Button className="bg-primary hover:bg-sprout-green-dark">
            <Plus className="mr-2 h-4 w-4" />
            Upload Photo
          </Button>
        </Link>
      </div>

      {galleryItems && galleryItems.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {galleryItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  src={item.image_url || "/placeholder.svg"}
                  alt={item.title || "Gallery image"}
                  fill
                  className="object-cover"
                />
                {!item.is_published && (
                  <Badge className="absolute top-2 right-2" variant="secondary">
                    Draft
                  </Badge>
                )}
              </div>
              <CardContent className="p-4">
                <p className="font-medium truncate">{item.title || "Untitled"}</p>
                {item.student_name && <p className="text-sm text-muted-foreground">{item.student_name}</p>}
                <GalleryItemActions itemId={item.id} />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <ImageIcon className="mx-auto h-16 w-16 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-semibold">No photos yet</h3>
            <p className="mt-2 text-muted-foreground">Upload your first photo to the gallery</p>
            <Link href="/admin/gallery/upload" className="mt-6 inline-block">
              <Button className="bg-primary hover:bg-sprout-green-dark">
                <Plus className="mr-2 h-4 w-4" />
                Upload Photo
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
