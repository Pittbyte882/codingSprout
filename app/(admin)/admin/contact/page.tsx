import { createServerSupabaseClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function AdminContactsPage() {
  const supabase = await createServerSupabaseClient()
  
  // Check if user is logged in (you can add admin check here)
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect("/login")
  }

  // Get all contact submissions
  const { data: submissions } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Contact Form Submissions</h1>
      
      <div className="space-y-4">
        {submissions?.map((submission) => (
          <div key={submission.id} className="border rounded-lg p-6 bg-white shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">{submission.name}</h3>
                <p className="text-gray-600">{submission.email}</p>
                {submission.phone && <p className="text-gray-600">{submission.phone}</p>}
              </div>
              <span className="text-sm text-gray-500">
                {new Date(submission.created_at).toLocaleDateString()}
              </span>
            </div>
            
            <div className="mb-2">
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                {submission.subject}
              </span>
            </div>
            
            <p className="text-gray-700 whitespace-pre-wrap">{submission.message}</p>
          </div>
        ))}
        
        {submissions?.length === 0 && (
          <p className="text-center text-gray-500">No submissions yet.</p>
        )}
      </div>
    </div>
  )
}