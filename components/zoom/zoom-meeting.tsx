"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Video, VideoOff, Loader2 } from "lucide-react"

interface ZoomMeetingProps {
  meetingNumber: string
  userName: string
  userEmail: string
}

export function ZoomMeeting({
  meetingNumber,
  userName,
  userEmail,
}: ZoomMeetingProps) {
  const [isJoined, setIsJoined] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const joinMeeting = async () => {
    setIsLoading(true)
    setError(null)

    try {
      console.log("Step 1: Fetching signature...")
      const response = await fetch("/api/zoom/signature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          meetingNumber,
          role: 0,
        }),
      })

      console.log("Step 2: Response status:", response.status)
      const data = await response.json()
      console.log("Step 3: Response data:", data)

      if (!response.ok) {
        throw new Error(data.error || "Failed to get signature")
      }

      // Use Zoom's web client URL instead of SDK
      // This opens Zoom in an iframe without taking over the page
      setIsJoined(true)
      setIsLoading(false)
    } catch (err) {
      console.error("Zoom error:", err)
      setError("Something went wrong. Please try again.")
      setIsLoading(false)
    }
  }

  const leaveMeeting = () => {
    setIsJoined(false)
  }

  // Build the Zoom web client URL
  const zoomWebUrl = `https://zoom.us/wc/${meetingNumber}/join?prefer=1&un=${encodeURIComponent(btoa(userName))}`

  return (
    <div className="flex flex-col h-full">
      {!isJoined ? (
        <div className="flex flex-col items-center justify-center h-full gap-4 bg-muted/30 rounded-xl border p-8">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Video className="h-8 w-8 text-primary" />
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-lg">Live Class in Session</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Your instructor is ready. Join to start learning!
            </p>
          </div>

          {error && (
            <div className="text-sm text-destructive bg-destructive/10 px-4 py-2 rounded-lg">
              {error}
            </div>
          )}

          <Button
            onClick={joinMeeting}
            disabled={isLoading}
            className="bg-primary hover:bg-sprout-green-dark"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Video className="mr-2 h-4 w-4" />
                Join Live Class
              </>
            )}
          </Button>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex-1 rounded-xl overflow-hidden border">
            <iframe
              src={zoomWebUrl}
              allow="camera; microphone; fullscreen; display-capture"
              className="w-full h-full"
              style={{ minHeight: "500px" }}
            />
          </div>
          <Button
            onClick={leaveMeeting}
            variant="destructive"
            size="sm"
            className="mt-2"
          >
            <VideoOff className="mr-2 h-4 w-4" />
            Leave Class
          </Button>
        </div>
      )}
    </div>
  )
}