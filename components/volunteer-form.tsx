"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { submitVolunteerApplication } from "@/app/actions/volunteer"

const availabilityOptions = [
  { id: "weekday-morning", label: "Weekday Mornings" },
  { id: "weekday-afternoon", label: "Weekday Afternoons" },
  { id: "weekday-evening", label: "Weekday Evenings" },
  { id: "weekend", label: "Weekends" },
]

export function VolunteerForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [availability, setAvailability] = useState<string[]>([])

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    formData.append("availability", JSON.stringify(availability))

    try {
      const result = await submitVolunteerApplication(formData)
      if (result.success) {
        toast.success("Application submitted! We'll be in touch soon.")
        const form = document.getElementById("volunteer-form") as HTMLFormElement
        form?.reset()
        setAvailability([])
      } else {
        toast.error(result.error || "Something went wrong. Please try again.")
      }
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form id="volunteer-form" action={handleSubmit} className="mt-6 space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" name="firstName" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" name="lastName" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" name="phone" type="tel" required />
      </div>

      <div className="space-y-3">
        <Label>Availability</Label>
        <div className="grid gap-3 sm:grid-cols-2">
          {availabilityOptions.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox
                id={option.id}
                checked={availability.includes(option.id)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setAvailability([...availability, option.id])
                  } else {
                    setAvailability(availability.filter((a) => a !== option.id))
                  }
                }}
              />
              <label htmlFor={option.id} className="text-sm text-foreground">
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
  <Label htmlFor="experience">Relevant Experience</Label>
  <Textarea
    id="experience"
    name="experience"
    rows={3}
    placeholder="Tell us about any relevant experience (teaching, coding, working with kids, etc.)"
  />
  <p className="text-sm text-muted-foreground">
    <span className="text-red-500">*</span> All volunteers must complete a{" "}
    <a 
      href="https://www.cdss.ca.gov/inforesources/community-care/caregiver-background-check/livescan#:~:text=Electronic%20fingerprinting%20technology%20has%20replaced,Community%20Care%20Licensing%20Division%20office."
      target="_blank"
      rel="noopener noreferrer"
      className="text-sky-blue hover:text-sprout-green underline font-medium"
    >
      Live Scan Background Check
    </a>
  </p>
</div>

      <div className="space-y-2">
        <Label htmlFor="motivation">Why do you want to volunteer?</Label>
        <Textarea
          id="motivation"
          name="motivation"
          rows={3}
          required
          placeholder="Tell us why you're interested in volunteering with Coding Sprout"
        />
      </div>

      <Button type="submit" className="w-full bg-primary hover:bg-sprout-green-dark" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  )
}
