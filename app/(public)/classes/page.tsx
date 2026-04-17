import type { Metadata } from "next"
import { Suspense } from "react"
import Image from "next/image"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { ClassesGrid } from "@/components/classes/classes-grid"
import { ClassesFilter } from "@/components/classes/classes-filter"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "Classes | Coding Sprout",
  description: "Browse our coding classes for kids from TK through 12th grade. Online and in-person options available.",
}

interface ClassesPageProps {
  searchParams: Promise<{ type?: string; grade?: string }>
}

export default async function ClassesPage({ searchParams }: ClassesPageProps) {
  const params = await searchParams

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-off-white to-primary/5 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-secondary sm:text-5xl">Our Classes</h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Find the perfect coding class for your child. We offer both group classes and one-on-one sessions.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  Live instructor over Zoom
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  Small class sizes
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  Charter school funds accepted
                </div>
              </div>
            </div>
            <div className="relative h-72 lg:h-80 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1756142008024-81c8349c8a29?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&dl=samsung-memory-us-HfuG2N-RJdE-unsplash.jpg"
                alt="Kids coding in class"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Classes Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <ClassesFilter currentType={params.type} currentGrade={params.grade} />
          <Suspense fallback={<ClassesGridSkeleton />}>
            <ClassesGridWrapper type={params.type} grade={params.grade} />
          </Suspense>
        </div>
      </section>
    </div>
  )
}

async function ClassesGridWrapper({ type, grade }: { type?: string; grade?: string }) {
  const supabase = await createServerSupabaseClient()

  let query = supabase
    .from("classes")
    .select("*")
    .eq("is_published", true)
    .order("start_date", { ascending: true })

  if (type === "online") {
    query = query.eq("is_online", true)
  } else if (type === "in-person") {
    query = query.eq("is_online", false)
  } else if (type === "individual") {
    query = query.eq("is_individual", true)
  }

  if (grade && grade !== "all") {
    const gradeMap: Record<string, string[]> = {
      "tk-k": ["TK", "K"],
      "1-2": ["1st", "2nd"],
      "3-5": ["3rd", "4th", "5th"],
      "6-8": ["6th", "7th", "8th"],
      "9-12": ["9th", "10th", "11th", "12th"],
    }

    const gradesToFilter = gradeMap[grade]
    if (gradesToFilter) {
      query = query.overlaps("grade_levels", gradesToFilter)
    }
  }

  const { data: classes } = await query

  return <ClassesGrid classes={classes || []} />
}

function ClassesGridSkeleton() {
  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="rounded-2xl border border-border p-6">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-4" />
          <Skeleton className="h-20 w-full mb-4" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
    </div>
  )
}