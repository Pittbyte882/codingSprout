"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { Heart, Check, DollarSign, CreditCard, Loader2 } from "lucide-react"

const PRESET_AMOUNTS = [
  { value: 50, label: "$50", description: "Supplies for one student" },
  { value: 150, label: "$150", description: "One month of classes" },
  { value: 200, label: "$200", description: "Equipment fund" },
  { value: 250, label: "$250", description: "Full scholarship" },
]

export function SponsorshipForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Sponsorship amount state
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState("")
  const [isCustom, setIsCustom] = useState(false)
  
  // Dedication state
  const [isDedicatedToStudent, setIsDedicatedToStudent] = useState(false)
  const [studentName, setStudentName] = useState("")
  
  // Organization state
  const [isFromOrganization, setIsFromOrganization] = useState(false)
  const [organizationName, setOrganizationName] = useState("")
  
  // Sponsor info state
  const [sponsorInfo, setSponsorInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
  })

  // Calculate total
  const totalAmount = isCustom 
    ? (parseFloat(customAmount) || 0) 
    : (selectedAmount || 0)

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount)
    setIsCustom(false)
    setCustomAmount("")
  }

  const handleCustomAmountClick = () => {
    setIsCustom(true)
    setSelectedAmount(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (totalAmount <= 0) {
      toast.error("Please select or enter a sponsorship amount")
      return
    }

    if (totalAmount < 1) {
      toast.error("Minimum sponsorship amount is $1")
      return
    }

    if (isDedicatedToStudent && !studentName.trim()) {
      toast.error("Please enter the student's name")
      return
    }

    if (isFromOrganization && !organizationName.trim()) {
      toast.error("Please enter the organization name")
      return
    }

    setIsSubmitting(true)

    try {
      // Create Stripe Checkout Session
      const response = await fetch("/api/checkout/sponsor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalAmount,
          studentName: isDedicatedToStudent ? studentName : null,
          organizationName: isFromOrganization ? organizationName : null,
          sponsorEmail: sponsorInfo.email,
          sponsorFirstName: sponsorInfo.firstName,
          sponsorLastName: sponsorInfo.lastName,
        }),
      })

      const data = await response.json()

      if (data.error) {
        toast.error(data.error)
        return
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url
      } else {
        toast.error("Failed to create checkout session")
      }
    } catch (error) {
      console.error("Checkout error:", error)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Sponsorship Amount Section */}
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border">
        <div className="flex items-center gap-2 mb-6">
          <DollarSign className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-deep-navy">Select Sponsorship Amount</h2>
        </div>
        
        {/* Preset Amounts */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
          {PRESET_AMOUNTS.map((amount) => (
            <button
              key={amount.value}
              type="button"
              onClick={() => handleAmountSelect(amount.value)}
              className={`
                relative p-4 rounded-xl border-2 transition-all text-center
                ${selectedAmount === amount.value && !isCustom
                  ? "border-sprout-green bg-sprout-green/5 ring-2 ring-sprout-green/20"
                  : "border-light-gray hover:border-sprout-green/50 bg-white"
                }
              `}
            >
              {selectedAmount === amount.value && !isCustom && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-sprout-green rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
              <p className="text-2xl font-bold text-deep-navy">{amount.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{amount.description}</p>
            </button>
          ))}
        </div>

        {/* Custom Amount */}
        <div
          onClick={handleCustomAmountClick}
          className={`
            p-4 rounded-xl border-2 transition-all cursor-pointer
            ${isCustom
              ? "border-sprout-green bg-sprout-green/5 ring-2 ring-sprout-green/20"
              : "border-light-gray hover:border-sprout-green/50 bg-white"
            }
          `}
        >
          <div className="flex items-center gap-3">
            {isCustom && (
              <div className="w-6 h-6 bg-sprout-green rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
            <div className="flex-1">
              <p className="font-medium text-deep-navy mb-2">Other Amount</p>
              {isCustom ? (
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    type="number"
                    min="1"
                    step="0.01"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className="pl-7"
                    autoFocus
                  />
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Click to enter a custom amount</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Dedication Section */}
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border">
        <div className="flex items-center gap-2 mb-6">
          <Heart className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-deep-navy">Dedication (Optional)</h2>
        </div>

        {/* Dedicate to Student */}
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="dedicateToStudent"
              checked={isDedicatedToStudent}
              onCheckedChange={(checked) => setIsDedicatedToStudent(checked as boolean)}
            />
            <div className="space-y-1">
              <label htmlFor="dedicateToStudent" className="text-sm font-medium cursor-pointer">
                Sponsor a specific student
              </label>
              <p className="text-xs text-muted-foreground">
                Your sponsorship will be directed to support this student's education
              </p>
            </div>
          </div>
          
          {isDedicatedToStudent && (
            <div className="ml-6 space-y-2 animate-in slide-in-from-top duration-200">
              <Label htmlFor="studentName">Student's Name *</Label>
              <Input
                id="studentName"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter student's full name"
              />
            </div>
          )}
        </div>

        {/* Organization */}
        <div className="mt-6 pt-6 border-t border-light-gray space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="fromOrganization"
              checked={isFromOrganization}
              onCheckedChange={(checked) => setIsFromOrganization(checked as boolean)}
            />
            <div className="space-y-1">
              <label htmlFor="fromOrganization" className="text-sm font-medium cursor-pointer">
                Sponsoring on behalf of an organization
              </label>
              <p className="text-xs text-muted-foreground">
                Include your organization's name for recognition
              </p>
            </div>
          </div>
          
          {isFromOrganization && (
            <div className="ml-6 space-y-2 animate-in slide-in-from-top duration-200">
              <Label htmlFor="organizationName">Organization Name *</Label>
              <Input
                id="organizationName"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                placeholder="Enter organization name"
              />
            </div>
          )}
        </div>
      </div>

      {/* Sponsor Information (Optional - for receipt) */}
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border">
        <div className="flex items-center gap-2 mb-2">
          <CreditCard className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-deep-navy">Your Information</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          Optional - for your receipt. Payment details will be collected securely by Stripe.
        </p>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={sponsorInfo.firstName}
                onChange={(e) => setSponsorInfo(prev => ({ ...prev, firstName: e.target.value }))}
                placeholder="First name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={sponsorInfo.lastName}
                onChange={(e) => setSponsorInfo(prev => ({ ...prev, lastName: e.target.value }))}
                placeholder="Last name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={sponsorInfo.email}
              onChange={(e) => setSponsorInfo(prev => ({ ...prev, email: e.target.value }))}
              placeholder="you@example.com"
            />
            <p className="text-xs text-muted-foreground">
              We'll send your receipt to this email
            </p>
          </div>
        </div>
      </div>

      {/* Secure Payment Notice */}
      <div className="rounded-2xl bg-sky-blue/10 p-6 ring-1 ring-sky-blue/20">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-sky-blue/20 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-sky-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <p className="font-medium text-deep-navy">Secure Payment with Stripe</p>
            <p className="text-sm text-muted-foreground mt-1">
              Your payment information is encrypted and processed securely. We accept all major credit cards, Apple Pay, and Google Pay.
            </p>
          </div>
        </div>
      </div>

      {/* Order Summary & Submit */}
      <div className="rounded-2xl bg-secondary p-6 text-secondary-foreground">
        <h2 className="text-xl font-semibold mb-4">Sponsorship Summary</h2>
        
        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-secondary-foreground/80">
            <span>Sponsorship Amount</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          {isDedicatedToStudent && studentName && (
            <div className="flex justify-between text-secondary-foreground/80 text-sm">
              <span>Sponsoring</span>
              <span>{studentName}</span>
            </div>
          )}
          {isFromOrganization && organizationName && (
            <div className="flex justify-between text-secondary-foreground/80 text-sm">
              <span>On behalf of</span>
              <span>{organizationName}</span>
            </div>
          )}
          <div className="border-t border-secondary-foreground/20 pt-2 mt-2">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-primary">${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting || totalAmount <= 0}
          className="w-full bg-primary hover:bg-sprout-green-dark text-lg py-6 h-auto"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Redirecting to Checkout...
            </>
          ) : (
            <>
              <Heart className="mr-2 h-5 w-5" />
              Sponsor ${totalAmount.toFixed(2)}
            </>
          )}
        </Button>

        <p className="text-center text-xs text-secondary-foreground/60 mt-4">
          Powered by Stripe • Secure payment processing
        </p>
      </div>
    </form>
  )
}