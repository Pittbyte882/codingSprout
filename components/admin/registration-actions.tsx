"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { updateRegistrationStatus } from "@/app/actions/admin"
import { Check, X } from "lucide-react"

interface RegistrationActionsProps {
  registrationId: string
}

export function RegistrationActions({ registrationId }: RegistrationActionsProps) {
  const [isLoading, setIsLoading] = useState(false)

  async function handleApprove() {
    setIsLoading(true)
    const result = await updateRegistrationStatus(registrationId, "charter_approved")
    if (result.success) {
      toast.success("Registration approved!")
    } else {
      toast.error(result.error || "Failed to approve")
    }
    setIsLoading(false)
  }

  async function handleReject() {
    setIsLoading(true)
    const result = await updateRegistrationStatus(registrationId, "refunded")
    if (result.success) {
      toast.success("Registration rejected")
    } else {
      toast.error(result.error || "Failed to reject")
    }
    setIsLoading(false)
  }

  return (
    <div className="flex gap-2">
      <Button size="sm" onClick={handleApprove} disabled={isLoading} className="bg-primary hover:bg-sprout-green-dark">
        <Check className="mr-2 h-4 w-4" />
        Approve Charter
      </Button>
      <Button size="sm" variant="destructive" onClick={handleReject} disabled={isLoading}>
        <X className="mr-2 h-4 w-4" />
        Reject
      </Button>
    </div>
  )
}
