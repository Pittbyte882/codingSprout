"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { deleteGalleryItem } from "@/app/actions/admin"
import { Trash2 } from "lucide-react"

interface GalleryItemActionsProps {
  itemId: string
}

export function GalleryItemActions({ itemId }: GalleryItemActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this photo?")) return

    setIsDeleting(true)
    const result = await deleteGalleryItem(itemId)
    if (result.success) {
      toast.success("Photo deleted")
    } else {
      toast.error(result.error || "Failed to delete")
    }
    setIsDeleting(false)
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="mt-2 w-full text-destructive hover:text-destructive"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      <Trash2 className="mr-2 h-4 w-4" />
      {isDeleting ? "Deleting..." : "Delete"}
    </Button>
  )
}
