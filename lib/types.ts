// NEW: School interface
export interface School {
  id: string
  name: string
  short_code: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

// NEW: Payment type
export type PaymentType = 'out_of_pocket' | 'school_funds'

// NEW: Age group type (matches your class groupings)
export type AgeGroup = 'tk-2' | '3-5' | '6-8' | '9-12'

// Age group display labels
export const AGE_GROUP_LABELS: Record<AgeGroup, string> = {
  'tk-2': 'TK - 2nd Grade',
  '3-5': '3rd - 5th Grade',
  '6-8': '6th - 8th Grade',
  '9-12': '9th - 12th Grade',
}
export interface Profile {
  id: string
  email: string
  full_name: string | null
  first_name: string | null
  last_name: string | null 
  phone: string | null
  role: "parent" | "admin" | "instructor"
  payment_type: PaymentType | null 
  school_id: string | null 
  other_school_name: string | null 
  created_at: string
  updated_at: string
  school?: School  
}

export interface Student {
  id: string
  parent_id: string
  full_name: string
  first_name: string | null
  last_name: string | null 
  grade_level: string
  age_group: AgeGroup | null
  teacher_name: string | null   
  date_of_birth: string | null
  notes: string | null
  created_at: string
}

export interface Class {
  id: string
  name: string
  title?: string
  description: string | null
  grade_levels: string[] | null
  grade_level_min?: string
  grade_level_max?: string
  start_date: string
  end_date: string | null
  start_time: string
  end_time: string
  class_date?: string
  duration_minutes?: number
  price: number
  price_cents?: number
  charter_price: number | null
  charter_school_price_cents?: number | null
  one_on_one_price: number | null
  one_on_one_price_cents?: number | null
  max_spots: number
  spots_taken: number
  is_individual: boolean
  allows_one_on_one?: boolean
  is_online: boolean
  zoom_link: string | null
  location: string | null
  instructor_id: string | null
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface Registration {
  id: string
  class_id: string
  student_id: string
  parent_id: string
  is_one_on_one: boolean
  payment_method: "stripe" | "charter_school"
  payment_status: "pending" | "paid" | "refunded" | "charter_pending" | "charter_approved"
  stripe_payment_intent_id: string | null
  charter_school_name: string | null
  charter_school_contact: string | null
  amount_paid: number | null
  amount_paid_cents?: number | null
  registered_at: string
  class?: Class
  student?: Student
}

export interface Event {
  id: string
  name: string
  title?: string
  description: string | null
  event_date: string
  start_time: string | null
  end_time: string | null
  location: string | null
  is_online: boolean
  is_free: boolean
  price: number | null
  max_attendees: number | null
  current_attendees: number
  image_url: string | null
  is_published: boolean
  created_at: string
}

export interface GalleryItem {
  id: string
  title: string | null
  description: string | null
  image_url: string
  student_name: string | null
  project_name: string | null
  is_published: boolean
  created_at: string
}

export interface Donation {
  id: string
  donor_name: string | null
  donor_email: string | null
  amount: number
  amount_cents?: number
  stripe_payment_intent_id: string | null
  message: string | null
  is_anonymous: boolean
  created_at: string
}

export interface ContactSubmission {
  id: string
  first_name: string
  last_name: string
  name?: string
  email: string
  phone: string | null
  subject: string | null
  message: string
  is_read: boolean
  created_at: string
}

export interface VolunteerApplication {
  id: string
  first_name: string
  last_name: string
  name?: string
  email: string
  phone: string | null
  availability: string[] | null
  experience: string | null
  skills?: string | null
  motivation: string | null
  message?: string | null
  status: "pending" | "approved" | "rejected"
  created_at: string
}

export interface SiteSetting {
  id: string
  key: string
  value: unknown
  updated_at: string
}

export const GRADE_LEVELS = [
  "TK",
  "K",
  "1st",
  "2nd",
  "3rd",
  "4th",
  "5th",
  "6th",
  "7th",
  "8th",
  "9th",
  "10th",
  "11th",
  "12th",
] as const

export type GradeLevel = (typeof GRADE_LEVELS)[number]
