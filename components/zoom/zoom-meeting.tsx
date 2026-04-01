"use client"

import { useEffect, useRef, useState } from "react"
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
  const meetingContainerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isJoined, setIsJoined] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const zoomClientRef = useRef<any>(null)

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

      const { sdkKey, zakToken } = data

      // Import Zoom Component View SDK
      console.log("Step 4: Loading Zoom SDK...")
      const { ZoomMtg } = await import("@zoom/meetingsdk")

      // Use Component View - embeds in a div instead of taking over page
      ZoomMtg.setZoomJSLib("https://source.zoom.us/3.1.2/lib", "/av")
      ZoomMtg.preLoadWasm()
      ZoomMtg.prepareWebSDK()

      console.log("Step 5: Initializing...")

      ZoomMtg.init({
        leaveUrl: window.location.href,
        patchJsMedia: true,
        leaveOnPageUnload: true,
        meetingInfo: [
          "topic",
          "host",
          "participant",
          "dc",
          "enctype",
        ],
        success: () => {
          console.log("Step 6: Joining meeting...")
          ZoomMtg.join({
            meetingNumber,
            userName,
            signature: zakToken,
            sdkKey,
            userEmail,
            passWord: "",
            zak: zakToken,
            success: () => {
              console.log("Joined successfully!")
              setIsJoined(true)
              setIsLoading(false)
            },
            error: (err: any) => {
              console.error("Join error:", err)
              setError(`Failed to join: ${JSON.stringify(err)}`)
              setIsLoading(false)
            },
          })
        },
        error: (err: any) => {
          console.error("Init error:", err)
          setError(`Failed to initialize: ${JSON.stringify(err)}`)
          setIsLoading(false)
        },
      })

      // Move Zoom's root element into our container
      setTimeout(() => {
        const zoomRoot = document.getElementById("zmmtg-root")
        if (zoomRoot && meetingContainerRef.current) {
          meetingContainerRef.current.appendChild(zoomRoot)
          zoomRoot.style.display = "block"
          zoomRoot.style.position = "relative"
          zoomRoot.style.width = "100%"
          zoomRoot.style.height = "100%"
        }
      }, 1000)

    } catch (err) {
      console.error("Zoom error:", err)
      setError("Something went wrong. Please try again.")
      setIsLoading(false)
    }
  }

  const leaveMeeting = async () => {
    try {
      const { ZoomMtg } = await import("@zoom/meetingsdk")
      ZoomMtg.leaveMeeting({})
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
          <div
            ref={meetingContainerRef}
            className="flex-1 rounded-xl overflow-hidden border bg-black"
            style={{ minHeight: "400px" }}
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
    </div>
  )
}
