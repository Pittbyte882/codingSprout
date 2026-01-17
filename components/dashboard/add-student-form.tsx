"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { addStudent } from "@/app/actions/students"
import { GRADE_LEVELS } from "@/lib/types"

export function AddStudentForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    try {
      const result = await addStudent(formData)
      if (result.success) {
        toast.success("Student added successfully!")
        router.push("/dashboard/students")
      } else {
        toast.error(result.error || "Failed to add student")
      }
    } catch {
      toast.error("Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form action={handleSubmit} className="mt-6 space-y-6">
      <div className="space-y-2">
        <Label htmlFor="fullName">Student's Full Name</Label>
        <Input id="fullName" name="fullName" required placeholder="Enter student's full name" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="gradeLevel">Grade Level</Label>
        <Select name="gradeLevel" required>
          <SelectTrigger>
            <SelectValue placeholder="Select grade level" />
          </SelectTrigger>
          <SelectContent>
            {GRADE_LEVELS.map((grade) => (
              <SelectItem key={grade} value={grade}>
                {grade}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="dateOfBirth">Date of Birth (optional)</Label>
        <Input id="dateOfBirth" name="dateOfBirth" type="date" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes (optional)</Label>
        <Textarea
          id="notes"
          name="notes"
          rows={3}
          placeholder="Any special needs, interests, or notes about your child..."
        />
      </div>

      <div className="flex gap-4">
        <Button type="submit" className="flex-1 bg-primary hover:bg-sprout-green-dark" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Student"}
        </Button>
      </div>
    </form>
  )
}
