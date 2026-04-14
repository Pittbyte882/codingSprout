"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { Trash2 } from "lucide-react"
import { deleteRegistration } from "@/app/actions/admin"

interface DeleteRegistrationButtonProps {
  registrationId: string
  studentName: string
}

export function DeleteRegistrationButton({
  registrationId,
  studentName,
}: DeleteRegistrationButtonProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDelete() {
    setIsDeleting(true)
    const result = await deleteRegistration(registrationId)
    if (result.success) {
      toast.success("Registration deleted")
      router.refresh()
    } else {
      toast.error(result.error || "Failed to delete")
      setIsDeleting(false)
    }
  }
console.log("DeleteRegistrationButton rendering for:", registrationId)


  return (
  <AlertDialog>
   <AlertDialogTrigger asChild>
  <Button 
    size="sm" 
    disabled={isDeleting}
    className="bg-red-500 hover:bg-red-600 text-white h-6 px-2 text-xs rounded-full"
  >
    <Trash2 className="h-3 w-3 mr-1" />
    Delete
  </Button>
</AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete Registration?</AlertDialogTitle>
        <AlertDialogDescription>
          This will permanently delete {studentName}'s registration. This cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={handleDelete}
          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
)
}