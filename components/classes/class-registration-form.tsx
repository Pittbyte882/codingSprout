"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { registerForClass } from "@/app/actions/registrations"
import type { Class, Student } from "@/lib/types"
import { CreditCard, School } from "lucide-react"

interface ClassRegistrationFormProps {
  classItem: Class
  students: Student[]
}

export function ClassRegistrationForm({ classItem, students }: ClassRegistrationFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "charter_school">("stripe")
  const [selectedStudent, setSelectedStudent] = useState<string>("")
  const [isOneOnOne, setIsOneOnOne] = useState(false)

  const price =
    isOneOnOne && classItem.one_on_one_price
      ? classItem.one_on_one_price
      : paymentMethod === "charter_school" && classItem.charter_price
        ? classItem.charter_price
        : classItem.price

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    formData.append("classId", classItem.id)
    formData.append("studentId", selectedStudent)
    formData.append("paymentMethod", paymentMethod)
    formData.append("isOneOnOne", String(isOneOnOne))
    formData.append("amount", String(price))

    try {
      const result = await registerForClass(formData)

      if (result.success) {
        if (result.checkoutUrl) {
          // Redirect to Stripe checkout
          window.location.href = result.checkoutUrl
        } else {
          // Charter school - pending approval
          toast.success("Registration submitted! We'll contact you about charter school payment.")
          router.push("/dashboard/enrollments")
        }
      } else {
        toast.error(result.error || "Registration failed")
      }
    } catch {
      toast.error("Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Select Student */}
      <div className="space-y-2">
        <Label>Select Student</Label>
        <Select value={selectedStudent} onValueChange={setSelectedStudent} required>
          <SelectTrigger>
            <SelectValue placeholder="Choose a student" />
          </SelectTrigger>
          <SelectContent>
            {students.map((student) => (
              <SelectItem key={student.id} value={student.id}>
                {student.full_name} ({student.grade_level})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* One-on-One Option */}
      {classItem.is_individual && classItem.one_on_one_price && (
        <div className="space-y-3">
          <Label>Session Type</Label>
          <RadioGroup
            value={isOneOnOne ? "one-on-one" : "group"}
            onValueChange={(value) => setIsOneOnOne(value === "one-on-one")}
          >
            <div className="flex items-center space-x-2 rounded-lg border p-4">
              <RadioGroupItem value="group" id="group" />
              <Label htmlFor="group" className="flex-1 cursor-pointer">
                <span className="font-medium">Group Class</span>
                <span className="ml-2 text-muted-foreground">${classItem.price}</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2 rounded-lg border p-4">
              <RadioGroupItem value="one-on-one" id="one-on-one" />
              <Label htmlFor="one-on-one" className="flex-1 cursor-pointer">
                <span className="font-medium">One-on-One Session</span>
                <span className="ml-2 text-muted-foreground">${classItem.one_on_one_price}</span>
              </Label>
            </div>
          </RadioGroup>
        </div>
      )}

      {/* Payment Method */}
      <div className="space-y-3">
        <Label>Payment Method</Label>
        <RadioGroup
          value={paymentMethod}
          onValueChange={(value) => setPaymentMethod(value as "stripe" | "charter_school")}
        >
          <div className="flex items-center space-x-2 rounded-lg border p-4">
            <RadioGroupItem value="stripe" id="stripe" />
            <Label htmlFor="stripe" className="flex flex-1 cursor-pointer items-center gap-3">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <div>
                <span className="font-medium">Credit/Debit Card</span>
                <p className="text-sm text-muted-foreground">Pay securely with Stripe</p>
              </div>
            </Label>
          </div>
          <div className="flex items-center space-x-2 rounded-lg border p-4">
            <RadioGroupItem value="charter_school" id="charter_school" />
            <Label htmlFor="charter_school" className="flex flex-1 cursor-pointer items-center gap-3">
              <School className="h-5 w-5 text-muted-foreground" />
              <div>
                <span className="font-medium">Charter School Funds</span>
                <p className="text-sm text-muted-foreground">We'll send an invoice to your school</p>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Charter School Details */}
      {paymentMethod === "charter_school" && (
        <div className="space-y-4 rounded-lg bg-muted/50 p-4">
          <div className="space-y-2">
            <Label htmlFor="charterSchoolName">Charter School Name</Label>
            <Input
              id="charterSchoolName"
              name="charterSchoolName"
              required
              placeholder="Enter your charter school name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="charterSchoolContact">School Contact Email</Label>
            <Input
              id="charterSchoolContact"
              name="charterSchoolContact"
              type="email"
              required
              placeholder="Contact email for invoicing"
            />
          </div>
        </div>
      )}

      {/* Total */}
      <div className="rounded-lg bg-muted/50 p-4">
        <div className="flex items-center justify-between">
          <span className="font-medium">Total</span>
          <span className="text-2xl font-bold">${price}</span>
        </div>
        {paymentMethod === "charter_school" && classItem.charter_price && classItem.charter_price < classItem.price && (
          <p className="mt-2 text-sm text-primary">Charter school discount applied!</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-sprout-green-dark"
        disabled={isSubmitting || !selectedStudent}
      >
        {isSubmitting ? "Processing..." : paymentMethod === "stripe" ? "Proceed to Payment" : "Submit Registration"}
      </Button>
    </form>
  )
}
