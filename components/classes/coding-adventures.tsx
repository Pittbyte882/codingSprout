"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { 
  Rocket, 
  Star, 
  Heart,
  Music,
  Sparkles,
  BookOpen,
  Play,
  CheckCircle2,
  Clock,
  Users,
  Monitor,
  Lightbulb,
  ArrowRight,
  ExternalLink,
  PartyPopper,
  Lock
} from "lucide-react"

const weeks = [
  {
    week: 1,
    title: "My First Code!",
    description: "Meet ScratchJr and make characters move for the first time!",
    objectives: [
      "Open and navigate ScratchJr",
      "Meet Scratch Cat and other characters",
      "Make a character move right and left",
      "Press the green flag to start"
    ],
    activities: [
      { name: "Welcome Song & Intro", duration: "10 min", description: "Hello song, meet our coding friend Scratch Cat" },
      { name: "Explore ScratchJr Together", duration: "15 min", description: "Tap and discover - what do all the buttons do?" },
      { name: "Make Cat Walk", duration: "20 min", description: "Drag blocks to make Scratch Cat walk across the screen" }
    ],
    project: "Walking Cat",
    projectDescription: "Make Scratch Cat walk from one side of the screen to the other",
    skills: ["Tapping", "Dragging", "Green Flag"],
    teachingTip: "Use physical movement! Have kids walk like Scratch Cat before coding it.",
    icon: Rocket
  },
  {
    week: 2,
    title: "Patterns and Sequences",
    description: "Learn that order matters - first this, then that!",
    objectives: [
      "Understand that code runs in order",
      "Connect multiple blocks together",
      "Create a simple sequence",
      "Add sounds to projects"
    ],
    activities: [
      { name: "Pattern Dance", duration: "10 min", description: "Clap, stomp, clap, stomp - patterns in real life!" },
      { name: "Block Sequencing", duration: "15 min", description: "Connect blocks in order: move, wait, move, wait" },
      { name: "Add a Sound", duration: "20 min", description: "Make your character move AND make a sound" }
    ],
    project: "Dancing Character",
    projectDescription: "Create a character that moves in a pattern and makes sounds",
    skills: ["Sequencing", "Sounds", "Patterns"],
    teachingTip: "Use the phrase 'First... Then...' constantly to reinforce sequencing.",
    icon: Music
  },
  {
    week: 3,
    title: "Tell a Story!",
    description: "Add backgrounds and make characters talk with speech bubbles!",
    objectives: [
      "Change the background/scene",
      "Add speech bubbles to characters",
      "Add a second character",
      "Make characters interact"
    ],
    activities: [
      { name: "Story Circle", duration: "10 min", description: "Share a short story - what happens first, next, last?" },
      { name: "Set the Scene", duration: "15 min", description: "Pick a background and add speech bubbles" },
      { name: "Two Friends Talk", duration: "20 min", description: "Add a second character and make them have a conversation" }
    ],
    project: "Mini Story",
    projectDescription: "Create a short story with two characters talking to each other",
    skills: ["Backgrounds", "Speech Bubbles", "Multiple Characters"],
    teachingTip: "Let kids tell their story out loud first before they code it.",
    icon: BookOpen
  },
  {
    week: 4,
    title: "Celebration Day!",
    description: "Show off your creations and celebrate Part 1!",
    objectives: [
      "Review all skills learned",
      "Complete a mini project independently",
      "Present your project to the class",
      "Celebrate your coding journey!"
    ],
    activities: [
      { name: "Skills Review Game", duration: "10 min", description: "Quick review of blocks we learned - quiz game style!" },
      { name: "Free Create Time", duration: "20 min", description: "Make anything you want with what you've learned" },
      { name: "Show and Tell", duration: "15 min", description: "Everyone shares their creation - celebration time!" }
    ],
    project: "My Creation",
    projectDescription: "Create your own project using all the skills you learned",
    skills: ["All Skills", "Creativity", "Presenting"],
    teachingTip: "Every project gets celebrated! Focus on effort and creativity, not perfection.",
    icon: PartyPopper
  },
  // Part 2 - Weeks 5-8
  {
    week: 5,
    title: "Welcome Back, Coders!",
    description: "Review what we learned and discover new characters and backgrounds!",
    objectives: [
      "Review sequencing and patterns from Part 1",
      "Explore the full character library",
      "Add multiple backgrounds to a project",
      "Make characters appear and disappear"
    ],
    activities: [
      { name: "Welcome Back Circle", duration: "10 min", description: "Share what we remember - our favorite blocks and projects!" },
      { name: "Character Safari", duration: "15 min", description: "Explore all the characters and pick new favorites" },
      { name: "Magic Show Project", duration: "20 min", description: "Make characters appear, disappear, and reappear!" }
    ],
    project: "Magic Show",
    projectDescription: "Create a magic show where characters appear and disappear",
    skills: ["Show/Hide", "Multiple Characters", "Backgrounds"],
    teachingTip: "Use 'magic words' like 'Abracadabra!' when teaching show/hide blocks.",
    icon: Sparkles
  },
  {
    week: 6,
    title: "Move in All Directions!",
    description: "Learn to move characters up, down, and all around the screen!",
    objectives: [
      "Move characters in all four directions",
      "Understand the grid/coordinate concept simply",
      "Create paths for characters to follow",
      "Use the reset block to start over"
    ],
    activities: [
      { name: "Direction Dance", duration: "10 min", description: "Stand up! Move left, right, up, down - follow the leader!" },
      { name: "Treasure Hunt Path", duration: "15 min", description: "Make a character follow a path to find treasure" },
      { name: "Maze Adventure", duration: "20 min", description: "Create a simple maze and guide your character through it" }
    ],
    project: "Treasure Hunt",
    projectDescription: "Create a character that follows a path to find hidden treasure",
    skills: ["All Directions", "Paths", "Reset"],
    teachingTip: "Draw paths on paper first, then translate to code blocks.",
    icon: Rocket
  },
  {
    week: 7,
    title: "Let's Make a Game!",
    description: "Create your very first interactive game with touch and tap!",
    objectives: [
      "Use the 'start on tap' block",
      "Make characters respond to touch",
      "Add simple game elements",
      "Create a goal or challenge"
    ],
    activities: [
      { name: "What Makes a Game?", duration: "10 min", description: "Talk about our favorite games - what do they have?" },
      { name: "Tap to Play", duration: "15 min", description: "Learn the 'start on tap' block to make interactive characters" },
      { name: "Pop the Balloon Game", duration: "20 min", description: "Create a simple tap game with moving targets" }
    ],
    project: "Pop the Balloon",
    projectDescription: "Create a game where you tap balloons or characters to make them pop or disappear",
    skills: ["Tap Events", "Interactivity", "Game Design"],
    teachingTip: "Keep games simple! One tap = one action is perfect for this age.",
    icon: Play
  },
  {
    week: 8,
    title: "Grand Finale Showcase!",
    description: "Create your masterpiece and celebrate becoming a Junior Coder!",
    objectives: [
      "Plan a final project using all skills",
      "Work independently with teacher support",
      "Present your creation to family and friends",
      "Celebrate your coding certificate!"
    ],
    activities: [
      { name: "Project Planning", duration: "10 min", description: "Choose: Story, Game, or Animation - draw your idea first!" },
      { name: "Creation Station", duration: "20 min", description: "Build your masterpiece with all the skills you learned" },
      { name: "Grand Showcase", duration: "15 min", description: "Present to the class and receive your Junior Coder certificate!" }
    ],
    project: "My Masterpiece",
    projectDescription: "Create your own story, game, or animation using everything you learned",
    skills: ["All Skills", "Planning", "Independence", "Presenting"],
    teachingTip: "Invite parents to the showcase! This is a big celebration moment.",
    icon: PartyPopper
  }
]

const skillsOverview = [
  { name: "Sequencing", description: "Putting steps in the right order", icon: ArrowRight },
  { name: "Patterns", description: "Recognizing and creating repeating steps", icon: Sparkles },
  { name: "Problem Solving", description: "Figuring out how to make things work", icon: Lightbulb },
  { name: "Creativity", description: "Making your own stories and characters", icon: Heart },
  { name: "Following Directions", description: "Listening and doing steps one at a time", icon: Star },
  { name: "Confidence", description: "Believing you can be a coder!", icon: Rocket }
]

export function CodingAdventures({ isPart2Unlocked = false }: { isPart2Unlocked?: boolean }) {
  const [completedWeeks, setCompletedWeeks] = useState<number[]>([])
  const [activeWeek, setActiveWeek] = useState("1")

  const toggleWeekComplete = (week: number) => {
    setCompletedWeeks(prev => 
      prev.includes(week) 
        ? prev.filter(w => w !== week)
        : [...prev, week]
    )
  }

  const progressPercentage = (completedWeeks.length / weeks.length) * 100

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-white/20 text-white border-white/30 text-sm">
                Grades TK-K
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 text-sm">
                8 Weeks Total
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 text-sm">
                45 min/session
              </Badge>
              <Badge className="bg-yellow-400/90 text-yellow-900 border-yellow-400 text-sm">
                Part 1: Weeks 1-4 | Part 2: Weeks 5-8
              </Badge>
            </div>
            
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                Coding Adventures
              </h1>
              <p className="text-xl text-white/90 max-w-2xl">
                An exciting introduction to coding! Learn sequencing, patterns, and logical thinking 
                through fun, hands-on activities using ScratchJr. Create animated stories and simple games!
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-2">
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                <Monitor className="h-5 w-5" />
                <span>ScratchJr (Free App)</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                <Clock className="h-5 w-5" />
                <span>45 minutes per week</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                <Users className="h-5 w-5" />
                <span>Ages 4-6</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Tracker */}
        <Card className="mb-8 border-2 border-pink-200">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Adventure Progress
                </CardTitle>
                <CardDescription>
                  {completedWeeks.length} of {weeks.length} weeks completed
                </CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <Progress value={progressPercentage} className="w-48 h-3" />
                <span className="text-sm font-medium">{Math.round(progressPercentage)}%</span>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Skills Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>What Young Coders Will Learn</CardTitle>
            <CardDescription>
              Building foundational skills through play and exploration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {skillsOverview.map((skill) => (
                <div 
                  key={skill.name}
                  className="flex flex-col items-center text-center p-4 rounded-xl bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-100"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center mb-3">
                    <skill.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{skill.name}</h3>
                  <p className="text-xs text-muted-foreground">{skill.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Part 2 Unlock Note */}
        <Card className="mb-8 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                <Lock className="h-5 w-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-amber-900 mb-1">Unlock Part 2 (Weeks 5-8)</h3>
                <p className="text-sm text-amber-700 mb-3">
                  Complete Part 1 and unlock Part 2 to continue the adventure! In weeks 5-8, students will 
                  learn to move in all directions, create their first games, and build a masterpiece project!
                </p>
                <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                  Enroll in Part 2
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Curriculum */}
        <Card>
          <CardHeader>
            <CardTitle>Course Curriculum</CardTitle>
            <CardDescription>
              Part 1 (Weeks 1-4) is included. Unlock Part 2 (Weeks 5-8) to continue!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeWeek} onValueChange={setActiveWeek}>
              <TabsList className="grid grid-cols-4 lg:grid-cols-8 mb-6 h-auto">
                {weeks.map((week) => {
                  const isLocked = week.week > 4 && !isPart2Unlocked
                  return (
                    <TabsTrigger 
                      key={week.week} 
                      value={week.week.toString()}
                      disabled={isLocked}
                      className={`flex flex-col gap-1 py-3 data-[state=active]:bg-gradient-to-br data-[state=active]:from-pink-500 data-[state=active]:to-purple-500 data-[state=active]:text-white ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <span className="text-xs flex items-center gap-1">
                        Week {week.week}
                        {isLocked && <Lock className="h-3 w-3" />}
                      </span>
                      <week.icon className="h-4 w-4" />
                    </TabsTrigger>
                  )
                })}
              </TabsList>

              {weeks.map((week) => (
                <TabsContent key={week.week} value={week.week.toString()}>
                  <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                      {/* Week Header */}
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
                              <week.icon className="h-5 w-5 text-white" />
                            </div>
                            <Badge variant="outline">Week {week.week}</Badge>
                            {completedWeeks.includes(week.week) && (
                              <Badge className="bg-green-100 text-green-700">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Complete
                              </Badge>
                            )}
                          </div>
                          <h2 className="text-2xl font-bold">{week.title}</h2>
                          <p className="text-muted-foreground mt-1">{week.description}</p>
                        </div>
                      </div>

                      {/* Learning Objectives */}
                      <Card className="border-pink-200">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Star className="h-5 w-5 text-yellow-500" />
                            Learning Goals
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="grid md:grid-cols-2 gap-2">
                            {week.objectives.map((objective, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-pink-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{objective}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Activities */}
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Play className="h-5 w-5 text-purple-500" />
                            Activities (45 minutes total)
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {week.activities.map((activity, i) => (
                              <div 
                                key={i}
                                className="flex items-start gap-4 p-3 rounded-lg bg-gradient-to-r from-pink-50 to-purple-50"
                              >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                  {i + 1}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <h4 className="font-semibold">{activity.name}</h4>
                                    <Badge variant="secondary" className="text-xs">
                                      <Clock className="h-3 w-3 mr-1" />
                                      {activity.duration}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {activity.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Project */}
                      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-purple-500" />
                            Hands-On Project: {week.project}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-4">{week.projectDescription}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {week.skills.map((skill) => (
                              <Badge key={skill} variant="secondary" className="bg-white">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                          <Button asChild className="w-full md:w-auto bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                            <a 
                              href="https://www.scratchjr.org/" 
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              Open ScratchJr
                              <ExternalLink className="h-4 w-4 ml-2" />
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4">
                      {/* Teaching Tip */}
                      <Card className="bg-yellow-50 border-yellow-200">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm flex items-center gap-2">
                            <Lightbulb className="h-4 w-4 text-yellow-600" />
                            Teaching Tip
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-yellow-800">{week.teachingTip}</p>
                        </CardContent>
                      </Card>

                      {/* Mark Complete */}
                      <Button 
                        onClick={() => toggleWeekComplete(week.week)}
                        variant={completedWeeks.includes(week.week) ? "secondary" : "default"}
                        className={`w-full ${!completedWeeks.includes(week.week) ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600' : ''}`}
                      >
                        {completedWeeks.includes(week.week) ? (
                          <>
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Completed!
                          </>
                        ) : (
                          <>
                            <Star className="h-4 w-4 mr-2" />
                            Mark Week Complete
                          </>
                        )}
                      </Button>

                      {/* Platform Info */}
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Platform</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center gap-3 p-2 rounded-lg bg-muted">
                            <div className="w-8 h-8 rounded bg-gradient-to-br from-orange-400 to-pink-400 flex items-center justify-center">
                              <span className="text-white font-bold text-xs">Jr</span>
                            </div>
                            <div>
                              <p className="font-medium text-sm">ScratchJr</p>
                              <p className="text-xs text-muted-foreground">Free app for iPad/Android/Chromebook</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* For Parents */}
                      <Card className="border-pink-200">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm flex items-center gap-2">
                            <Heart className="h-4 w-4 text-pink-500" />
                            For Parents
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-xs text-muted-foreground">
                            ScratchJr is designed for ages 4-7. It uses picture blocks 
                            instead of words, so no reading is required. Your child will 
                            learn coding concepts through play!
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Continue Learning */}
        <Card className="mt-8 bg-gradient-to-r from-pink-500 to-purple-500 text-white border-0">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold mb-2">Ready for Part 2?</h3>
                <p className="text-white/90">
                  Continue the adventure with more games, stories, and coding fun!
                </p>
              </div>
              <Button variant="secondary" size="lg" className="whitespace-nowrap">
                View Part 2 Curriculum
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
