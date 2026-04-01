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
  const zoomContainerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isJoined, setIsJoined] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const clientRef = useRef<any>(null)

  const joinMeeting = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Get signature from our API
      const response = await fetch("/api/zoom/signature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          meetingNumber,
          role: 0, // 0 = attendee, 1 = host
        }),
      })

      const { signature, sdkKey, zakToken } = await response.json()

      // Dynamically import Zoom SDK (client-side only)
      const { ZoomMtg } = await import("@zoom/meetingsdk")

      ZoomMtg.setZoomJSLib("https://source.zoom.us/3.1.2/lib", "/av")
      ZoomMtg.preLoadWasm()
      ZoomMtg.prepareWebSDK()

      if (zoomContainerRef.current) {
        ZoomMtg.init({
          leaveUrl: window.location.href,
          patchJsMedia: true,
          leaveOnPageUnload: true,
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
              },
              error: (err: any) => {
                console.error("Join error:", err)
                setError("Failed to join meeting. Please try again.")
                setIsLoading(false)
              },
            })
          },
          error: (err: any) => {
            console.error("Init error:", err)
            setError("Failed to initialize video. Please try again.")
            setIsLoading(false)
          },
        })
      }
    } catch (err) {
      console.error("Zoom error:", err)
      setError("Something went wrong. Please try again.")
      setIsLoading(false)
    }
  }

  const leaveMeeting = async () => {
    if (clientRef.current) {
      const { ZoomMtg } = await import("@zoom/meetingsdk")
      ZoomMtg.leaveMeeting({})
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
          <div
            ref={zoomContainerRef}
            id="zmmtg-root"
            className="flex-1 rounded-xl overflow-hidden"
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