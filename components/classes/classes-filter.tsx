"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const classTypes = [
  { value: "all", label: "All Classes" },
  { value: "in-person", label: "In-Person" },
  { value: "online", label: "Online" },
  { value: "individual", label: "One-on-One" },
]

const gradeFilters = [
  { value: "all", label: "All Grades" },
  { value: "tk-2", label: "TK - 2nd Grade" },
  { value: "3-5", label: "3rd - 5th Grade" },
  { value: "6-8", label: "6th - 8th Grade" },
  { value: "9-12", label: "9th - 12th Grade" },
]

interface ClassesFilterProps {
  currentType?: string
  currentGrade?: string
}

export function ClassesFilter({ currentType, currentGrade }: ClassesFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value === "all") {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    router.push(`/classes?${params.toString()}`)
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">
        {classTypes.map((type) => (
          <Button
            key={type.value}
            variant={currentType === type.value || (!currentType && type.value === "all") ? "default" : "outline"}
            size="sm"
            onClick={() => updateFilter("type", type.value)}
            className={
              currentType === type.value || (!currentType && type.value === "all")
                ? "bg-primary hover:bg-sprout-green-dark"
                : ""
            }
          >
            {type.label}
          </Button>
        ))}
      </div>

      <Select value={currentGrade || "all"} onValueChange={(value) => updateFilter("grade", value)}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Filter by grade" />
        </SelectTrigger>
        <SelectContent>
          {gradeFilters.map((grade) => (
            <SelectItem key={grade.value} value={grade.value}>
              {grade.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
