"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Video, VideoOff, Loader2 } from "lucide-react"

interface ZoomMeetingProps {
  meetingNumber: string
  userName: string
  userEmail: string
}

function ZoomMeetingInner({
  meetingNumber,
  userName,
  userEmail,
}: ZoomMeetingProps) {
  const meetingContainerRef = useRef<HTMLDivElement>(null)
  const clientRef = useRef<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isJoined, setIsJoined] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const joinMeeting = async () => {
    if (!meetingContainerRef.current) return

    setIsLoading(true)
    setError(null)

    try {
      // Get signature from API
      const response = await fetch("/api/zoom/signature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ meetingNumber, role: 0 }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to get signature")
      }

      const { signature, sdkKey } = data

      // Import the EMBEDDED version — this is the key difference
      const { ZoomMtgEmbedded } = await import("@zoom/meetingsdk/embedded")

      // Create client
      const client = ZoomMtgEmbedded.createClient()
      clientRef.current = client

      // Initialize with our container div
      await client.init({
        zoomAppRoot: meetingContainerRef.current,
        language: "en-US",
        customize: {
          video: {
            isResizable: true,
            viewSizes: {
              default: {
                width: 600,
                height: 400,
              },
            },
          },
        },
      })

      // Join the meeting
      await client.join({
        meetingNumber,
        userName,
        signature,
        sdkKey,
        userEmail,
        password: "",
      })

      setIsJoined(true)
      setIsLoading(false)
    } catch (err: any) {
      console.error("Zoom error:", err)
      setError(err.message || "Failed to join. Please try again.")
      setIsLoading(false)
    }
  }

  const leaveMeeting = async () => {
    try {
      if (clientRef.current) {
        await clientRef.current.leaveMeeting()
      }
    } catch (e) {
      console.error(e)
    }
    setIsJoined(false)
  }

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
            <div className="text-sm text-destructive bg-destructive/10 px-4 py-2 rounded-lg text-center">
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
          {/* This div is where Zoom embeds */}
          <div
            ref={meetingContainerRef}
            className="flex-1 rounded-xl overflow-hidden"
            style={{ minHeight: "500px" }}
          />
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

      {/* Container must exist in DOM even before joining */}
      {!isJoined && (
        <div
          ref={meetingContainerRef}
          style={{ display: "none" }}
        />
      )}
    </div>
  )
}

// Export with SSR disabled — critical for Zoom SDK to work in Next.js
export const ZoomMeeting = dynamic(
  () => Promise.resolve(ZoomMeetingInner),
  { ssr: false }
)