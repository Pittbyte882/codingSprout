"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function saveClass(formData: FormData) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: "Not authenticated" }
  }

  // Verify admin
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (profile?.role !== "admin" && profile?.role !== "instructor") {
    return { success: false, error: "Not authorized" }
  }

  const id = formData.get("id") as string | null
  const data = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    grade_levels: JSON.parse(formData.get("gradeLevels") as string),
    start_date: formData.get("startDate") as string,
    end_date: (formData.get("endDate") as string) || null,
    start_time: formData.get("startTime") as string,
    end_time: formData.get("endTime") as string,
    price: Number.parseFloat(formData.get("price") as string),
    charter_price: formData.get("charterPrice") ? Number.parseFloat(formData.get("charterPrice") as string) : null,
    one_on_one_price: formData.get("oneOnOnePrice") ? Number.parseFloat(formData.get("oneOnOnePrice") as string) : null,
    max_spots: Number.parseInt(formData.get("maxSpots") as string, 10),
    is_online: formData.get("isOnline") === "true",
    is_individual: formData.get("isIndividual") === "true",
    is_published: formData.get("isPublished") === "true",
    zoom_link: (formData.get("zoomLink") as string) || null,
    location: (formData.get("location") as string) || null,
  }

  let error

  if (id) {
    const result = await supabase.from("classes").update(data).eq("id", id)
    error = result.error
  } else {
    const result = await supabase.from("classes").insert([{ ...data, spots_taken: 0 }])
    error = result.error
  }

  if (error) {
    console.error("Save class error:", error)
    return { success: false, error: "Failed to save class" }
  }

  revalidatePath("/admin/classes")
  revalidatePath("/classes")

  return { success: true }
}

export async function saveEvent(formData: FormData) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: "Not authenticated" }
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (profile?.role !== "admin" && profile?.role !== "instructor") {
    return { success: false, error: "Not authorized" }
  }

  const id = formData.get("id") as string | null
  const data = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    event_date: formData.get("eventDate") as string,
    start_time: (formData.get("startTime") as string) || null,
    end_time: (formData.get("endTime") as string) || null,
    location: (formData.get("location") as string) || null,
    is_online: formData.get("isOnline") === "true",
    is_free: formData.get("isFree") === "true",
    price: formData.get("price") ? Number.parseFloat(formData.get("price") as string) : null,
    max_attendees: formData.get("maxAttendees") ? Number.parseInt(formData.get("maxAttendees") as string, 10) : null,
    is_published: formData.get("isPublished") === "true",
  }

  let error

  if (id) {
    const result = await supabase.from("events").update(data).eq("id", id)
    error = result.error
  } else {
    const result = await supabase.from("events").insert([{ ...data, current_attendees: 0 }])
    error = result.error
  }

  if (error) {
    console.error("Save event error:", error)
    return { success: false, error: "Failed to save event" }
  }

  revalidatePath("/admin/events")
  revalidatePath("/events")

  return { success: true }
}

export async function updateRegistrationStatus(registrationId: string, status: string) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: "Not authenticated" }
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (profile?.role !== "admin") {
    return { success: false, error: "Not authorized" }
  }

  const { error } = await supabase.from("registrations").update({ payment_status: status }).eq("id", registrationId)

  if (error) {
    console.error("Update registration error:", error)
    return { success: false, error: "Failed to update registration" }
  }

  revalidatePath("/admin/registrations")

  return { success: true }
}

export async function deleteGalleryItem(id: string) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: "Not authenticated" }
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (profile?.role !== "admin") {
    return { success: false, error: "Not authorized" }
  }

  const { error } = await supabase.from("gallery").delete().eq("id", id)

  if (error) {
    console.error("Delete gallery item error:", error)
    return { success: false, error: "Failed to delete item" }
  }

  revalidatePath("/admin/gallery")
  revalidatePath("/gallery")

  return { success: true }
}

export async function markMessageAsRead(id: string) {
  const supabase = await createServerSupabaseClient()

  const { error } = await supabase.from("contact_submissions").update({ is_read: true }).eq("id", id)

  if (error) {
    return { success: false, error: "Failed to update message" }
  }

  revalidatePath("/admin/messages")

  return { success: true }
}
