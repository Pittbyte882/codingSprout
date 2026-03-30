"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Target, 
  Lightbulb, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Gamepad2,
  Code2,
  Puzzle,
  Layers,
  Rocket,
  Lock
} from "lucide-react"
import Link from "next/link"

interface Activity {
  title: string
  duration: string
  description: string
}

interface Week {
  week: number
  title: string
  description: string
  objectives: string[]
  activities: Activity[]
  project: string
  skills: string[]
  teacherTip: string
}

const curriculum: Week[] = [
  {
    week: 1,
    title: "Level Up Your Coding!",
    description: "Review fundamentals and discover advanced Scratch features. Get ready to create sophisticated projects!",
    objectives: [
      "Review variables, loops, and conditionals",
      "Explore advanced Scratch blocks",
      "Learn about cloning and custom blocks",
      "Set goals for the course"
    ],
    activities: [
      { title: "Skills Assessment Game", duration: "10 min", description: "Play through a review game testing loops, variables, and conditionals" },
      { title: "Advanced Block Exploration", duration: "20 min", description: "Discover cloning, custom blocks, and broadcast messages" },
      { title: "Mini Challenge", duration: "15 min", description: "Create a sprite that clones itself using the clone block" }
    ],
    project: "Clone Army",
    skills: ["Cloning", "Custom Blocks", "Review"],
    teacherTip: "Assess prior knowledge early. Some students may need review while others are ready for challenges."
  },
  {
    week: 2,
    title: "Custom Blocks: Your Own Commands!",
    description: "Learn to create custom blocks (functions) to organize code and make it reusable.",
    objectives: [
      "Understand what functions/custom blocks are",
      "Create custom blocks with inputs",
      "Use custom blocks to reduce code repetition",
      "Debug and test custom blocks"
    ],
    activities: [
      { title: "Function Foundations", duration: "10 min", description: "Learn why programmers create reusable code blocks" },
      { title: "Build Custom Blocks", duration: "20 min", description: "Create custom blocks with and without input parameters" },
      { title: "Refactor Challenge", duration: "15 min", description: "Take messy code and clean it up using custom blocks" }
    ],
    project: "Drawing Machine",
    skills: ["Functions", "Parameters", "Code Organization"],
    teacherTip: "Relate custom blocks to real life - like a recipe that can be reused with different ingredients."
  },
  {
    week: 3,
    title: "Lists: Storing Collections!",
    description: "Master lists (arrays) to store and manage multiple pieces of data in your programs.",
    objectives: [
      "Understand what lists are and why they're useful",
      "Create, add to, and remove from lists",
      "Access specific items in a list",
      "Use lists in interactive projects"
    ],
    activities: [
      { title: "List Basics", duration: "10 min", description: "Create lists and learn add, delete, and access operations" },
      { title: "Quiz Game Builder", duration: "20 min", description: "Build a quiz using lists to store questions and answers" },
      { title: "High Score System", duration: "15 min", description: "Add a high score list that saves top 5 scores" }
    ],
    project: "Trivia Challenge",
    skills: ["Lists/Arrays", "Data Storage", "Iteration"],
    teacherTip: "Use physical examples - a list is like a numbered shelf where each spot holds one item."
  },
  {
    week: 4,
    title: "Broadcast Messages: Sprites Talking!",
    description: "Learn advanced event handling with broadcast messages for sprite-to-sprite communication.",
    objectives: [
      "Understand broadcast and receive blocks",
      "Coordinate actions between multiple sprites",
      "Create chain reactions with broadcasts",
      "Design multi-sprite interactions"
    ],
    activities: [
      { title: "Message Basics", duration: "10 min", description: "Learn how sprites can send and receive messages" },
      { title: "Conversation Builder", duration: "20 min", description: "Create a dialogue scene with multiple characters" },
      { title: "Chain Reaction", duration: "15 min", description: "Build a Rube Goldberg-style chain of events" }
    ],
    project: "Interactive Story",
    skills: ["Events", "Broadcast", "Coordination"],
    teacherTip: "Compare broadcasts to walkie-talkies - one sprite sends, others listening on that channel respond."
  },
  {
    week: 5,
    title: "Introduction to Code.org!",
    description: "Explore Code.org's App Lab and discover text-based programming concepts alongside visual blocks.",
    objectives: [
      "Navigate Code.org's interface",
      "Compare block-based and text-based coding",
      "Create a simple app with buttons and events",
      "Understand how visual blocks translate to text"
    ],
    activities: [
      { title: "Code.org Tour", duration: "10 min", description: "Explore App Lab interface and tools" },
      { title: "Button Basics", duration: "20 min", description: "Create an app with buttons, text, and images" },
      { title: "Event Handlers", duration: "15 min", description: "Make buttons respond to clicks with actions" }
    ],
    project: "My First App",
    skills: ["App Lab", "UI Design", "Events"],
    teacherTip: "Emphasize that the same logic they learned in Scratch applies here - just different syntax."
  },
  {
    week: 6,
    title: "App Design: Screens and Navigation!",
    description: "Build multi-screen apps with navigation, learning UI/UX design principles.",
    objectives: [
      "Design apps with multiple screens",
      "Create navigation between screens",
      "Apply basic UI/UX design principles",
      "Use images and styling in apps"
    ],
    activities: [
      { title: "Multi-Screen Design", duration: "10 min", description: "Learn screen management and navigation patterns" },
      { title: "App Builder", duration: "25 min", description: "Create a 3-screen app with home, content, and about pages" },
      { title: "Polish and Style", duration: "10 min", description: "Add images, colors, and improve user experience" }
    ],
    project: "Info App",
    skills: ["UI Design", "Navigation", "User Experience"],
    teacherTip: "Have students think about apps they use daily - what makes navigation easy or confusing?"
  },
  {
    week: 7,
    title: "Capstone Project: Design Phase!",
    description: "Plan and begin building a sophisticated final project combining all skills learned.",
    objectives: [
      "Brainstorm and plan a complex project",
      "Create a project design document",
      "Break down the project into steps",
      "Begin building core features"
    ],
    activities: [
      { title: "Project Planning", duration: "15 min", description: "Brainstorm ideas and choose between Scratch game or Code.org app" },
      { title: "Design Document", duration: "10 min", description: "Sketch screens/scenes and list required features" },
      { title: "Build Session", duration: "20 min", description: "Start building the foundation of the project" }
    ],
    project: "Capstone Part 1",
    skills: ["Planning", "Design", "Project Management"],
    teacherTip: "Help students scope appropriately - better to have a polished simple project than incomplete complex one."
  },
  {
    week: 8,
    title: "Capstone Showcase!",
    description: "Complete, test, and present your capstone projects. Celebrate your coding journey!",
    objectives: [
      "Complete and polish the final project",
      "Test and debug thoroughly",
      "Present project to the class",
      "Reflect on growth and set future goals"
    ],
    activities: [
      { title: "Final Build Time", duration: "15 min", description: "Complete remaining features and fix bugs" },
      { title: "Showcase Presentations", duration: "25 min", description: "Present projects and explain design decisions" },
      { title: "Celebration & Reflection", duration: "5 min", description: "Certificates and discussion of next steps" }
    ],
    project: "Capstone Complete",
    skills: ["Presentation", "Debugging", "Reflection"],
    teacherTip: "Every project is a success - focus on growth and effort, not just final results."
  }
]

const skillsOverview = [
  { icon: Code2, label: "Custom Blocks", description: "Create reusable functions" },
  { icon: Layers, label: "Lists & Data", description: "Store and manage collections" },
  { icon: Puzzle, label: "Advanced Logic", description: "Complex conditionals and loops" },
  { icon: Gamepad2, label: "Game Design", description: "Build sophisticated games" },
  { icon: Sparkles, label: "App Development", description: "Create apps with Code.org" },
  { icon: Rocket, label: "Project Planning", description: "Design and manage projects" }
]

export function CodeCreatorsClass({ isPart2Unlocked = false }: { isPart2Unlocked?: boolean }) {
  const [completedWeeks, setCompletedWeeks] = useState<number[]>([])
  const [expandedActivities, setExpandedActivities] = useState<number | null>(null)

  const toggleWeekComplete = (week: number) => {
    setCompletedWeeks(prev => 
      prev.includes(week) 
        ? prev.filter(w => w !== week)
        : [...prev, week]
    )
  }

  const progress = (completedWeeks.length / curriculum.length) * 100

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-chart-3 to-chart-4 text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <Link href="/" className="text-primary-foreground/80 hover:text-primary-foreground text-sm mb-4 inline-block">
            &larr; Back to All Classes
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge variant="secondary" className="text-sm">Grades 4-5</Badge>
            <Badge variant="outline" className="border-primary-foreground/30 text-primary-foreground text-sm">8 Weeks Total</Badge>
            <Badge variant="outline" className="border-primary-foreground/30 text-primary-foreground text-sm">45 min/session</Badge>
            <Badge className="bg-amber-400 text-amber-900 text-sm">Part 1: Weeks 1-4 | Part 2: Weeks 5-8</Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Code Creators</h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl">
            Master game design and advanced programming concepts! Build sophisticated projects while developing problem-solving and computational thinking skills.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Progress and Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-chart-3" />
                Course Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-2">
                <Progress value={progress} className="flex-1" />
                <span className="text-sm font-medium">{completedWeeks.length}/8 weeks</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {completedWeeks.length === 0 
                  ? "Start your advanced coding journey!" 
                  : completedWeeks.length === 8 
                    ? "Congratulations! Course completed!" 
                    : `Keep going! ${8 - completedWeeks.length} weeks remaining.`}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Platforms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start gap-2" asChild>
                <a href="https://scratch.mit.edu/projects/editor/" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  Open Scratch
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2" asChild>
                <a href="https://studio.code.org/projects/applab/new" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  Open Code.org App Lab
                </a>
              </Button>
              <p className="text-xs text-muted-foreground">No downloads required - works in browser!</p>
            </CardContent>
          </Card>
        </div>

        {/* Skills Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Skills You Will Master</CardTitle>
            <CardDescription>Advanced programming concepts for sophisticated projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {skillsOverview.map((skill, index) => (
                <div key={index} className="text-center p-4 rounded-lg bg-muted/50">
                  <skill.icon className="h-8 w-8 mx-auto mb-2 text-chart-3" />
                  <h4 className="font-medium text-sm">{skill.label}</h4>
                  <p className="text-xs text-muted-foreground">{skill.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Curriculum */}
        <h2 className="text-2xl font-bold mb-4">Weekly Curriculum</h2>
        <p className="text-muted-foreground mb-4">Part 1 (Weeks 1-4) is included. Unlock Part 2 (Weeks 5-8) to continue!</p>
        
        {/* Part 2 Unlock Card */}
        <Card className="mb-8 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                <Lock className="h-5 w-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-amber-900 mb-1">Unlock Part 2 (Weeks 5-8)</h3>
                <p className="text-sm text-amber-700 mb-3">
                  Take your skills further! In Part 2, students explore Code.org App Lab, build multi-screen apps, 
                  and complete a capstone project showcasing everything they have learned!
                </p>
                <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                  Enroll in Part 2
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="week-1" className="space-y-4">
          <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent p-0">
            {curriculum.map((week) => {
              const isLocked = week.week > 4 && !isPart2Unlocked
              return (
                <TabsTrigger 
                  key={week.week} 
                  value={`week-${week.week}`}
                  disabled={isLocked}
                  className={`data-[state=active]:bg-chart-3 data-[state=active]:text-primary-foreground relative ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <span className="flex items-center gap-1">
                    Week {week.week}
                    {isLocked && <Lock className="h-3 w-3" />}
                  </span>
                  {completedWeeks.includes(week.week) && !isLocked && (
                    <CheckCircle2 className="h-3 w-3 absolute -top-1 -right-1 text-primary" />
                  )}
                </TabsTrigger>
              )
            })}
          </TabsList>

          {curriculum.map((week) => (
            <TabsContent key={week.week} value={`week-${week.week}`}>
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-2xl flex items-center gap-2">
                            {completedWeeks.includes(week.week) ? (
                              <CheckCircle2 className="h-6 w-6 text-primary" />
                            ) : (
                              <Circle className="h-6 w-6 text-muted-foreground" />
                            )}
                            Week {week.week}: {week.title}
                          </CardTitle>
                          <CardDescription className="mt-2 text-base">
                            {week.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Objectives */}
                      <div>
                        <h4 className="font-semibold flex items-center gap-2 mb-3">
                          <Target className="h-4 w-4 text-chart-3" />
                          Learning Objectives
                        </h4>
                        <ul className="grid sm:grid-cols-2 gap-2">
                          {week.objectives.map((objective, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-chart-3 mt-0.5 flex-shrink-0" />
                              {objective}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Activities */}
                      <div>
                        <button 
                          onClick={() => setExpandedActivities(expandedActivities === week.week ? null : week.week)}
                          className="font-semibold flex items-center gap-2 mb-3 hover:text-chart-3 transition-colors w-full text-left"
                        >
                          <Clock className="h-4 w-4 text-chart-3" />
                          Activities (45 minutes total)
                          {expandedActivities === week.week ? (
                            <ChevronUp className="h-4 w-4 ml-auto" />
                          ) : (
                            <ChevronDown className="h-4 w-4 ml-auto" />
                          )}
                        </button>
                        
                        {expandedActivities === week.week && (
                          <div className="space-y-3">
                            {week.activities.map((activity, index) => (
                              <div key={index} className="bg-muted/50 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-1">
                                  <h5 className="font-medium">{activity.title}</h5>
                                  <Badge variant="secondary" className="text-xs">
                                    {activity.duration}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{activity.description}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2">
                        {week.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="bg-chart-3/10 text-chart-3 border-chart-3/20">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                  <Card className="bg-chart-3/5 border-chart-3/20">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Rocket className="h-5 w-5 text-chart-3" />
                        Project
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="font-medium text-lg mb-3">{week.project}</p>
                      <Button className="w-full gap-2 bg-chart-3 hover:bg-chart-3/90" asChild>
                        <a 
                          href={week.week >= 5 ? "https://studio.code.org/projects/applab/new" : "https://scratch.mit.edu/projects/editor/"} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Open {week.week >= 5 ? "Code.org" : "Scratch"}
                        </a>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-chart-5" />
                        Teaching Tip
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{week.teacherTip}</p>
                    </CardContent>
                  </Card>

                  <Button 
                    variant={completedWeeks.includes(week.week) ? "outline" : "default"}
                    className="w-full"
                    onClick={() => toggleWeekComplete(week.week)}
                  >
                    {completedWeeks.includes(week.week) ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Completed
                      </>
                    ) : (
                      <>
                        <Circle className="h-4 w-4 mr-2" />
                        Mark Complete
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  )
}
