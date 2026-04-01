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

  // Inject Zoom CSS
  useEffect(() => {
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = "https://source.zoom.us/3.1.2/css/bootstrap.css"
    document.head.appendChild(link)

    const link2 = document.createElement("link")
    link2.rel = "stylesheet"
    link2.href = "https://source.zoom.us/3.1.2/css/react-select.css"
    document.head.appendChild(link2)

    return () => {
      document.head.removeChild(link)
      document.head.removeChild(link2)
    }
  }, [])

  const joinMeeting = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Get ZAK token from our API
      const response = await fetch("/api/zoom/signature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ meetingNumber, role: 0 }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to get token")
      }

      const { sdkKey, zakToken } = data

      // Import Zoom SDK
      const { ZoomMtg } = await import("@zoom/meetingsdk")

      // Set up Zoom JS lib
      ZoomMtg.setZoomJSLib("https://source.zoom.us/3.1.2/lib", "/av")
      ZoomMtg.preLoadWasm()
      ZoomMtg.prepareWebSDK()

      // Initialize in component view mode
      ZoomMtg.init({
        leaveUrl: window.location.href,
        patchJsMedia: true,
        leaveOnPageUnload: true,
        // Component view — renders inside a container div
        success: () => {
          ZoomMtg.join({
            meetingNumber,
            userName,
            signature: zakToken,
            sdkKey,
            userEmail,
            passWord: "",
            zak: zakToken,
            success: () => {
              setIsJoined(true)
              setIsLoading(false)

              // Move zoom root into our container
              const zoomRoot = document.getElementById("zmmtg-root")
              if (zoomRoot && meetingContainerRef.current) {
                // Style it to fit in our container
                zoomRoot.style.position = "relative"
                zoomRoot.style.width = "100%"
                zoomRoot.style.height = "100%"
                zoomRoot.style.display = "block"
                meetingContainerRef.current.appendChild(zoomRoot)
              }
            },
            error: (err: any) => {
              console.error("Join error:", err)
              setError(`Failed to join meeting: ${err.reason || JSON.stringify(err)}`)
              setIsLoading(false)
            },
          })
        },
        error: (err: any) => {
          console.error("Init error:", err)
          setError(`Failed to initialize: ${err.reason || JSON.stringify(err)}`)
          setIsLoading(false)
        },
      })
    } catch (err: any) {
      console.error("Zoom error:", err)
      setError(err.message || "Something went wrong. Please try again.")
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
            style={{ minHeight: "500px", position: "relative" }}
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