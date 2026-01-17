"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { markMessageAsRead } from "@/app/actions/admin"
import { Check } from "lucide-react"

interface MessageActionsProps {
  messageId: string
}

export function MessageActions({ messageId }: MessageActionsProps) {
  const [isLoading, setIsLoading] = useState(false)

  async function handleMarkRead() {
    setIsLoading(true)
    const result = await markMessageAsRead(messageId)
    if (result.success) {
      toast.success("Marked as read")
    } else {
      toast.error(result.error || "Failed to update")
    }
    setIsLoading(false)
  }

  return (
    <Button variant="outline" size="sm" onClick={handleMarkRead} disabled={isLoading}>
      <Check className="mr-2 h-4 w-4" />
      {isLoading ? "..." : "Mark as Read"}
    </Button>
  )
}
