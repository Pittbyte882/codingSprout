import { Button } from "@/components/ui/button"
import type { Metadata } from "next"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageActions } from "@/components/admin/message-actions"
import { MessageSquare } from "lucide-react"

export const metadata: Metadata = {
  title: "Messages | Coding Sprout Admin",
  description: "View contact form submissions.",
}

export default async function AdminMessagesPage() {
  const supabase = await createServerSupabaseClient()

  const { data: messages } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false })

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Contact Messages</h1>
        <p className="mt-1 text-muted-foreground">View and respond to contact form submissions</p>
      </div>

      {messages && messages.length > 0 ? (
        <div className="space-y-4">
          {messages.map((message) => (
            <Card key={message.id} className={!message.is_read ? "border-primary/50 bg-primary/5" : ""}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {message.first_name} {message.last_name}
                      {!message.is_read && <Badge className="bg-primary">New</Badge>}
                    </CardTitle>
                    <CardDescription>
                      {message.email} • {formatDate(message.created_at)}
                    </CardDescription>
                  </div>
                  <Badge variant="outline">{message.subject}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{message.message}</p>
                {message.phone && <p className="mt-2 text-sm text-muted-foreground">Phone: {message.phone}</p>}
                <div className="mt-4 flex gap-2">
                  <a href={`mailto:${message.email}`}>
                    <Button size="sm" className="bg-primary hover:bg-sprout-green-dark">
                      Reply via Email
                    </Button>
                  </a>
                  {!message.is_read && <MessageActions messageId={message.id} />}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <MessageSquare className="mx-auto h-16 w-16 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-semibold">No messages yet</h3>
            <p className="mt-2 text-muted-foreground">Contact form submissions will appear here</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
