"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { Eye, EyeOff, User, GraduationCap, CreditCard, ChevronRight, ChevronLeft, Check } from "lucide-react"

// Types
type PaymentType = 'out_of_pocket' | 'school_funds'
type AgeGroup = 'tk-2' | '3-5' | '6-8' | '9-12'

interface School {
  id: string
  name: string
  short_code: string | null
}

const AGE_GROUP_OPTIONS: { value: AgeGroup; label: string }[] = [
  { value: 'tk-2', label: 'TK - 2nd Grade' },
  { value: '3-5', label: '3rd - 5th Grade' },
  { value: '6-8', label: '6th - 8th Grade' },
  { value: '9-12', label: '9th - 12th Grade' },
]

// Step indicator component
function StepIndicator({ currentStep }: { currentStep: number }) {
  const steps = [
    { number: 1, label: 'Parent Info', icon: User },
    { number: 2, label: 'Student Info', icon: GraduationCap },
    { number: 3, label: 'Payment', icon: CreditCard },
  ]

  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => {
        const Icon = step.icon
        const isCompleted = currentStep > step.number
        const isCurrent = currentStep === step.number

        return (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                  transition-all duration-200
                  ${isCompleted 
                    ? 'bg-sprout-green text-white' 
                    : isCurrent 
                      ? 'bg-sprout-green text-white ring-4 ring-sprout-green/20' 
                      : 'bg-light-gray text-dark-gray'
                  }
                `}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
              </div>
              <span className={`text-xs mt-1 ${isCurrent ? 'text-sprout-green font-medium' : 'text-muted-foreground'}`}>
                {step.label}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div 
                className={`w-12 h-0.5 mx-2 mb-5 ${
                  currentStep > step.number ? 'bg-sprout-green' : 'bg-light-gray'
                }`} 
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export function RegisterForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [schools, setSchools] = useState<School[]>([])
  const [loadingSchools, setLoadingSchools] = useState(true)

  const [formData, setFormData] = useState({
    parentFirstName: '',
    parentLastName: '',
    email: '',
    phone: '',
    password: '',
    studentFirstName: '',
    studentLastName: '',
    ageGroup: '' as AgeGroup | '',
    paymentType: '' as PaymentType | '',
    schoolId: '',
    otherSchoolName: '',
    teacherName: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Fetch schools from Supabase
  useEffect(() => {
    async function fetchSchools() {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('schools')
        .select('id, name, short_code')
        .eq('is_active', true)
        .order('name')

      if (error) {
        console.error('Error fetching schools:', error)
        toast.error('Failed to load schools')
      } else {
        setSchools(data || [])
      }
      setLoadingSchools(false)
    }

    fetchSchools()
  }, [])

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.parentFirstName.trim()) newErrors.parentFirstName = 'First name is required'
      if (!formData.parentLastName.trim()) newErrors.parentLastName = 'Last name is required'
      if (!formData.email.trim()) newErrors.email = 'Email is required'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email'
      if (!formData.password) newErrors.password = 'Password is required'
      else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters'
    }

    if (step === 2) {
      if (!formData.studentFirstName.trim()) newErrors.studentFirstName = 'Student first name is required'
      if (!formData.studentLastName.trim()) newErrors.studentLastName = 'Student last name is required'
      if (!formData.ageGroup) newErrors.ageGroup = 'Please select an age group'
    }

    if (step === 3) {
      if (!formData.paymentType) newErrors.paymentType = 'Please select a payment method'
      if (formData.paymentType === 'school_funds') {
        if (!formData.schoolId) newErrors.schoolId = 'Please select your school'
        if (formData.schoolId === 'other' && !formData.otherSchoolName.trim()) {
          newErrors.otherSchoolName = 'Please enter your school name'
        }
        if (!formData.teacherName.trim()) newErrors.teacherName = "Please enter your student's teacher name"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    setCurrentStep(prev => prev - 1)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    
    if (!validateStep(currentStep)) return
    
    setIsLoading(true)

    const supabase = createClient()

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: {
            full_name: `${formData.parentFirstName} ${formData.parentLastName}`,
            first_name: formData.parentFirstName,
            last_name: formData.parentLastName,
            phone: formData.phone,
            payment_type: formData.paymentType,
            school_id: formData.paymentType === 'school_funds' && formData.schoolId !== 'other' 
              ? formData.schoolId 
              : null,
            other_school_name: formData.schoolId === 'other' ? formData.otherSchoolName : null,
          },
        },
      })

      if (authError) throw authError

      if (authData.user) {
        const { error: studentError } = await supabase
          .from('students')
          .insert({
            parent_id: authData.user.id,
            full_name: `${formData.studentFirstName} ${formData.studentLastName}`,
            first_name: formData.studentFirstName,
            last_name: formData.studentLastName,
            age_group: formData.ageGroup,
            grade_level: formData.ageGroup,
            teacher_name: formData.paymentType === 'school_funds' ? formData.teacherName : null,
          })

        if (studentError) {
          console.error('Error creating student:', studentError)
          toast.error('Account created but there was an issue saving student info. Please update in your dashboard.')
        }
      }

      toast.success("Account created! Please check your email to verify your account.")
      router.push("/login")
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const inputClass = (fieldName: string) => `
    ${errors[fieldName] ? 'border-red-500 focus:ring-red-500' : ''}
  `

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <StepIndicator currentStep={currentStep} />

      {/* Step 1: Parent Information */}
      {currentStep === 1 && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold text-deep-navy">Parent/Guardian Information</h2>
            <p className="text-sm text-muted-foreground">Tell us about yourself</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="parentFirstName">First Name *</Label>
              <Input
                id="parentFirstName"
                value={formData.parentFirstName}
                onChange={(e) => updateField('parentFirstName', e.target.value)}
                placeholder="First name"
                className={inputClass('parentFirstName')}
              />
              {errors.parentFirstName && (
                <p className="text-xs text-red-500">{errors.parentFirstName}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="parentLastName">Last Name *</Label>
              <Input
                id="parentLastName"
                value={formData.parentLastName}
                onChange={(e) => updateField('parentLastName', e.target.value)}
                placeholder="Last name"
                className={inputClass('parentLastName')}
              />
              {errors.parentLastName && (
                <p className="text-xs text-red-500">{errors.parentLastName}</p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="you@example.com"
              className={inputClass('email')}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="phone">Phone Number (optional)</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              placeholder="(555) 123-4567"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">Password *</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => updateField('password', e.target.value)}
                placeholder="Create a password (min 8 characters)"
                className={inputClass('password')}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          <Button 
            type="button" 
            onClick={handleNext}
            className="w-full bg-sprout-green hover:bg-sprout-green-dark mt-6"
          >
            Continue
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}

      {/* Step 2: Student Information */}
      {currentStep === 2 && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold text-deep-navy">Student Information</h2>
            <p className="text-sm text-muted-foreground">Tell us about your young coder</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="studentFirstName">Student First Name *</Label>
              <Input
                id="studentFirstName"
                value={formData.studentFirstName}
                onChange={(e) => updateField('studentFirstName', e.target.value)}
                placeholder="First name"
                className={inputClass('studentFirstName')}
              />
              {errors.studentFirstName && (
                <p className="text-xs text-red-500">{errors.studentFirstName}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="studentLastName">Student Last Name *</Label>
              <Input
                id="studentLastName"
                value={formData.studentLastName}
                onChange={(e) => updateField('studentLastName', e.target.value)}
                placeholder="Last name"
                className={inputClass('studentLastName')}
              />
              {errors.studentLastName && (
                <p className="text-xs text-red-500">{errors.studentLastName}</p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="ageGroup">Age Group / Grade Level *</Label>
            <select
              id="ageGroup"
              value={formData.ageGroup}
              onChange={(e) => updateField('ageGroup', e.target.value)}
              className={`
                w-full h-10 px-3 rounded-md border border-input bg-background text-sm
                focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
                ${errors.ageGroup ? 'border-red-500' : ''}
              `}
            >
              <option value="">Select grade level...</option>
              {AGE_GROUP_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.ageGroup && (
              <p className="text-xs text-red-500">{errors.ageGroup}</p>
            )}
          </div>

          <div className="flex gap-3 mt-6">
            <Button 
              type="button" 
              variant="outline"
              onClick={handleBack}
              className="flex-1"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button 
              type="button" 
              onClick={handleNext}
              className="flex-1 bg-sprout-green hover:bg-sprout-green-dark"
            >
              Continue
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Payment Method */}
      {currentStep === 3 && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold text-deep-navy">Payment Method</h2>
            <p className="text-sm text-muted-foreground">How will you be paying for classes?</p>
          </div>

          <div className="space-y-3">
            <Label>Select Payment Method *</Label>
            
            {/* Out of Pocket Option */}
            <div
              onClick={() => updateField('paymentType', 'out_of_pocket')}
              className={`
                p-4 rounded-lg border-2 cursor-pointer transition-all
                ${formData.paymentType === 'out_of_pocket'
                  ? 'border-sprout-green bg-sprout-green/5'
                  : 'border-light-gray hover:border-sprout-green/50'
                }
              `}
            >
              <div className="flex items-start gap-3">
                <div className={`
                  w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5
                  ${formData.paymentType === 'out_of_pocket'
                    ? 'border-sprout-green bg-sprout-green'
                    : 'border-gray-300'
                  }
                `}>
                  {formData.paymentType === 'out_of_pocket' && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-deep-navy">💳 Out of Pocket</p>
                  <p className="text-sm text-muted-foreground">I'll pay directly for classes</p>
                </div>
              </div>
            </div>

            {/* School Funds Option */}
            <div
              onClick={() => updateField('paymentType', 'school_funds')}
              className={`
                p-4 rounded-lg border-2 cursor-pointer transition-all
                ${formData.paymentType === 'school_funds'
                  ? 'border-sprout-green bg-sprout-green/5'
                  : 'border-light-gray hover:border-sprout-green/50'
                }
              `}
            >
              <div className="flex items-start gap-3">
                <div className={`
                  w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5
                  ${formData.paymentType === 'school_funds'
                    ? 'border-sprout-green bg-sprout-green'
                    : 'border-gray-300'
                  }
                `}>
                  {formData.paymentType === 'school_funds' && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-deep-navy">🏫 Using School Funds</p>
                  <p className="text-sm text-muted-foreground">My charter school covers the costs</p>
                </div>
              </div>
            </div>
            
            {errors.paymentType && (
              <p className="text-xs text-red-500">{errors.paymentType}</p>
            )}
          </div>

          {/* Charter School Fields */}
          {formData.paymentType === 'school_funds' && (
            <div className="space-y-4 pt-4 border-t border-light-gray animate-in slide-in-from-top duration-300">
              <div className="space-y-1.5">
                <Label htmlFor="schoolId">Select Your Charter School *</Label>
                <select
                  id="schoolId"
                  value={formData.schoolId}
                  onChange={(e) => updateField('schoolId', e.target.value)}
                  className={`
                    w-full h-10 px-3 rounded-md border border-input bg-background text-sm
                    focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
                    ${errors.schoolId ? 'border-red-500' : ''}
                  `}
                  disabled={loadingSchools}
                >
                  <option value="">
                    {loadingSchools ? 'Loading schools...' : 'Select your school...'}
                  </option>
                  {schools.map(school => (
                    <option key={school.id} value={school.id}>
                      {school.name} {school.short_code ? `(${school.short_code})` : ''}
                    </option>
                  ))}
                  <option value="other">Other (not listed)</option>
                </select>
                {errors.schoolId && (
                  <p className="text-xs text-red-500">{errors.schoolId}</p>
                )}
              </div>

              {/* Other School Name */}
              {formData.schoolId === 'other' && (
                <div className="space-y-1.5 animate-in slide-in-from-top duration-200">
                  <Label htmlFor="otherSchoolName">Enter Your School Name *</Label>
                  <Input
                    id="otherSchoolName"
                    value={formData.otherSchoolName}
                    onChange={(e) => updateField('otherSchoolName', e.target.value)}
                    placeholder="Type your school name"
                    className={inputClass('otherSchoolName')}
                  />
                  {errors.otherSchoolName && (
                    <p className="text-xs text-red-500">{errors.otherSchoolName}</p>
                  )}
                </div>
              )}

              {/* Teacher Name */}
              <div className="space-y-1.5">
                <Label htmlFor="teacherName">Student's Teacher Name *</Label>
                <Input
                  id="teacherName"
                  value={formData.teacherName}
                  onChange={(e) => updateField('teacherName', e.target.value)}
                  placeholder="Enter teacher's name"
                  className={inputClass('teacherName')}
                />
                {errors.teacherName && (
                  <p className="text-xs text-red-500">{errors.teacherName}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  We'll need this for charter school billing
                </p>
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <Button 
              type="button" 
              variant="outline"
              onClick={handleBack}
              className="flex-1"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button 
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-sprout-green hover:bg-sprout-green-dark"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </div>
        </div>
      )}

      <p className="text-center text-xs text-muted-foreground mt-6">
        By creating an account, you agree to our{" "}
        <a href="/terms" className="text-sky-blue hover:underline">Terms of Service</a>
        {" "}and{" "}
        <a href="/privacy" className="text-sky-blue hover:underline">Privacy Policy</a>.
      </p>
    </form>
  )
}