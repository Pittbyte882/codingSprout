"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { toast } from "sonner"
import { Heart, Check, CreditCard, Building2, User, DollarSign } from "lucide-react"

const PRESET_AMOUNTS = [
  { value: 50, label: "$50", description: "Supplies for one student" },
  { value: 150, label: "$150", description: "One month of classes" },
  { value: 200, label: "$200", description: "Equipment fund" },
  { value: 250, label: "$250", description: "Full scholarship" },
]

const CARD_TYPES = [
  { value: "visa", label: "Visa" },
  { value: "mastercard", label: "Mastercard" },
  { value: "amex", label: "American Express" },
  { value: "discover", label: "Discover" },
]

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
]

export function DonationForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Donation amount state
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState("")
  const [isCustom, setIsCustom] = useState(false)
  
  // Dedication state
  const [isDedicatedToStudent, setIsDedicatedToStudent] = useState(false)
  const [studentName, setStudentName] = useState("")
  
  // Organization state
  const [isFromOrganization, setIsFromOrganization] = useState(false)
  const [organizationName, setOrganizationName] = useState("")
  
  // Billing info state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    cardType: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    billingAddress: "",
    city: "",
    state: "",
    zipCode: "",
  })
  
  // Remember card state
  const [rememberCard, setRememberCard] = useState(false)

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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (totalAmount <= 0) {
      toast.error("Please select or enter a donation amount")
      return
    }

    if (isDedicatedToStudent && !studentName.trim()) {
      toast.error("Please enter the student's name")
      return
    }

    if (rememberCard) {
      // Redirect to create account page
      toast.info("Please create an account to save your card information")
      router.push("/register")
      return
    }

    setIsSubmitting(true)

    try {
      // Here you would integrate with Stripe, Square, or your payment processor
      // For now, we'll simulate a successful donation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success(`Thank you for your generous donation of $${totalAmount.toFixed(2)}!`)
      router.push("/donate/thank-you")
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Donation Amount Section */}
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border">
        <div className="flex items-center gap-2 mb-6">
          <DollarSign className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-deep-navy">Select Donation Amount</h2>
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
                Dedicate this donation to a specific student
              </label>
              <p className="text-xs text-muted-foreground">
                Your donation will be directed to support this student's education
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
                Donating on behalf of an organization
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

      {/* Billing Information */}
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border">
        <div className="flex items-center gap-2 mb-6">
          <User className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-deep-navy">Your Information</h2>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border">
        <div className="flex items-center gap-2 mb-6">
          <CreditCard className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-deep-navy">Payment Information</h2>
        </div>

        <div className="space-y-4">
          {/* Card Type */}
          <div className="space-y-2">
            <Label htmlFor="cardType">Card Type *</Label>
            <Select
              value={formData.cardType}
              onValueChange={(value) => handleInputChange("cardType", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select card type" />
              </SelectTrigger>
              <SelectContent>
                {CARD_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Card Number */}
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number *</Label>
            <Input
              id="cardNumber"
              value={formData.cardNumber}
              onChange={(e) => handleInputChange("cardNumber", formatCardNumber(e.target.value))}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              required
            />
          </div>

          {/* Expiry and CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date *</Label>
              <Input
                id="expiryDate"
                value={formData.expiryDate}
                onChange={(e) => handleInputChange("expiryDate", formatExpiryDate(e.target.value))}
                placeholder="MM/YY"
                maxLength={5}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV *</Label>
              <Input
                id="cvv"
                value={formData.cvv}
                onChange={(e) => handleInputChange("cvv", e.target.value.replace(/\D/g, "").slice(0, 4))}
                placeholder="123"
                maxLength={4}
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Billing Address */}
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border">
        <div className="flex items-center gap-2 mb-6">
          <Building2 className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-deep-navy">Billing Address</h2>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="billingAddress">Street Address *</Label>
            <Input
              id="billingAddress"
              value={formData.billingAddress}
              onChange={(e) => handleInputChange("billingAddress", e.target.value)}
              placeholder="123 Main Street"
              required
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State *</Label>
              <Select
                value={formData.state}
                onValueChange={(value) => handleInputChange("state", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                  {US_STATES.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 col-span-2 sm:col-span-1">
              <Label htmlFor="zipCode">ZIP Code *</Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => handleInputChange("zipCode", e.target.value.replace(/\D/g, "").slice(0, 5))}
                placeholder="12345"
                maxLength={5}
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Remember Card Option */}
      <div className="rounded-2xl bg-sky-blue/10 p-6 ring-1 ring-sky-blue/20">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="rememberCard"
            checked={rememberCard}
            onCheckedChange={(checked) => setRememberCard(checked as boolean)}
          />
          <div className="space-y-1">
            <label htmlFor="rememberCard" className="text-sm font-medium cursor-pointer text-deep-navy">
              Save my card for future donations
            </label>
            <p className="text-xs text-muted-foreground">
              You'll be prompted to create an account to securely save your payment information
            </p>
          </div>
        </div>
      </div>

      {/* Order Summary & Submit */}
      <div className="rounded-2xl bg-secondary p-6 text-secondary-foreground">
        <h2 className="text-xl font-semibold mb-4">Donation Summary</h2>
        
        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-secondary-foreground/80">
            <span>Donation Amount</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          {isDedicatedToStudent && studentName && (
            <div className="flex justify-between text-secondary-foreground/80 text-sm">
              <span>Dedicated to</span>
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
            "Processing..."
          ) : (
            <>
              <Heart className="mr-2 h-5 w-5" />
              Donate ${totalAmount.toFixed(2)}
            </>
          )}
        </Button>

        <p className="text-center text-xs text-secondary-foreground/60 mt-4">
          Your donation is secure and encrypted. Coding Sprout is a registered 501(c)(3) organization.
        </p>
      </div>
    </form>
  )
}