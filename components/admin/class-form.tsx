"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { saveClass } from "@/app/actions/admin"
import { GRADE_LEVELS } from "@/lib/types"
import type { Class } from "@/lib/types"

interface ClassFormProps {
  classItem?: Class
}

export function ClassForm({ classItem }: ClassFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isOnline, setIsOnline] = useState(classItem?.is_online ?? false)
  const [isIndividual, setIsIndividual] = useState(classItem?.is_individual ?? false)
  const [isPublished, setIsPublished] = useState(classItem?.is_published ?? false)
  const [selectedGrades, setSelectedGrades] = useState<string[]>(classItem?.grade_levels || [])

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)

    formData.append("isOnline", String(isOnline))
    formData.append("isIndividual", String(isIndividual))
    formData.append("isPublished", String(isPublished))
    formData.append("gradeLevels", JSON.stringify(selectedGrades))

    if (classItem?.id) {
      formData.append("id", classItem.id)
    }

    try {
      const result = await saveClass(formData)
      if (result.success) {
        toast.success(classItem ? "Class updated!" : "Class created!")
        router.push("/admin/classes")
        router.refresh()
      } else {
        toast.error(result.error || "Failed to save class")
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
        <Label htmlFor="name">Class Name</Label>
        <Input id="name" name="name" required defaultValue={classItem?.name} placeholder="e.g., Python Basics" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={classItem?.description || ""}
          placeholder="Describe what students will learn..."
        />
      </div>

      <div className="space-y-3">
        <Label>Grade Levels</Label>
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
          {GRADE_LEVELS.map((grade) => (
            <div key={grade} className="flex items-center space-x-2">
              <Checkbox
                id={`grade-${grade}`}
                checked={selectedGrades.includes(grade)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedGrades([...selectedGrades, grade])
                  } else {
                    setSelectedGrades(selectedGrades.filter((g) => g !== grade))
                  }
                }}
              />
              <label htmlFor={`grade-${grade}`} className="text-sm">
                {grade}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            name="startDate"
            type="date"
            required
            defaultValue={classItem?.start_date?.split("T")[0]}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">End Date (optional)</Label>
          <Input id="endDate" name="endDate" type="date" defaultValue={classItem?.end_date?.split("T")[0] || ""} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="startTime">Start Time</Label>
          <Input id="startTime" name="startTime" type="time" required defaultValue={classItem?.start_time} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endTime">End Time</Label>
          <Input id="endTime" name="endTime" type="time" required defaultValue={classItem?.end_time} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={classItem?.price || ""}
            placeholder="99.00"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="charterPrice">Charter Price ($)</Label>
          <Input
            id="charterPrice"
            name="charterPrice"
            type="number"
            step="0.01"
            min="0"
            defaultValue={classItem?.charter_price || ""}
            placeholder="Optional"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="oneOnOnePrice">1-on-1 Price ($)</Label>
          <Input
            id="oneOnOnePrice"
            name="oneOnOnePrice"
            type="number"
            step="0.01"
            min="0"
            defaultValue={classItem?.one_on_one_price || ""}
            placeholder="Optional"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="maxSpots">Maximum Spots</Label>
        <Input
          id="maxSpots"
          name="maxSpots"
          type="number"
          min="1"
          required
          defaultValue={classItem?.max_spots || 8}
          placeholder="8"
        />
      </div>

      <div className="space-y-4 rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="isOnline">Online Class</Label>
            <p className="text-sm text-muted-foreground">This class will be held via Zoom</p>
          </div>
          <Switch id="isOnline" checked={isOnline} onCheckedChange={setIsOnline} />
        </div>

        {isOnline && (
          <div className="space-y-2">
            <Label htmlFor="zoomLink">Zoom Link</Label>
            <Input
              id="zoomLink"
              name="zoomLink"
              type="url"
              defaultValue={classItem?.zoom_link || ""}
              placeholder="https://zoom.us/j/..."
            />
          </div>
        )}

        {!isOnline && (
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              defaultValue={classItem?.location || ""}
              placeholder="Enter class location"
            />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between rounded-lg border p-4">
        <div>
          <Label htmlFor="isIndividual">Allow One-on-One</Label>
          <p className="text-sm text-muted-foreground">Students can book private sessions</p>
        </div>
        <Switch id="isIndividual" checked={isIndividual} onCheckedChange={setIsIndividual} />
      </div>

      <div className="flex items-center justify-between rounded-lg border p-4">
        <div>
          <Label htmlFor="isPublished">Published</Label>
          <p className="text-sm text-muted-foreground">Make this class visible on the website</p>
        </div>
        <Switch id="isPublished" checked={isPublished} onCheckedChange={setIsPublished} />
      </div>

      <div className="flex gap-4">
        <Button type="submit" className="flex-1 bg-primary hover:bg-sprout-green-dark" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : classItem ? "Update Class" : "Create Class"}
        </Button>
      </div>
    </form>
  )
}
