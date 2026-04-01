"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Video, VideoOff, Loader2 } from "lucide-react"

interface DailyMeetingProps {
  roomUrl: string
  userName: string
}

function DailyMeetingInner({ roomUrl, userName }: DailyMeetingProps) {
  const [isJoined, setIsJoined] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const joinMeeting = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsJoined(true)
      setIsLoading(false)
    }, 1000)
  }

  const leaveMeeting = () => {
    setIsJoined(false)
  }

  // Build URL with username pre-filled
  const iframeUrl = `${roomUrl}?name=${encodeURIComponent(userName)}`

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
          <iframe
            src={iframeUrl}
            allow="camera; microphone; fullscreen; speaker; display-capture"
            className="flex-1 rounded-xl border"
            style={{ minHeight: "500px", width: "100%" }}
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

import dynamic from "next/dynamic"
export const ZoomMeeting = dynamic(
  () => Promise.resolve(DailyMeetingInner),
  { ssr: false }
)