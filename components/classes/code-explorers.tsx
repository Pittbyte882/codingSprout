"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { 
  Rocket, 
  Lightbulb, 
  Target, 
  BookOpen, 
  Play, 
  CheckCircle2, 
  Clock,
  Users,
  Star,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Repeat,
  MousePointerClick,
  MessageSquare,
  Palette,
  Music,
  Gamepad2,
  Trophy,
  Lock
} from "lucide-react"

const curriculumWeeks = [
  {
    week: 1,
    title: "Welcome to Coding!",
    subtitle: "Meet Scratch and Make Your First Animation",
    icon: Rocket,
    color: "bg-chart-1",
    objectives: [
      "Understand what coding is and why it is fun",
      "Navigate the Scratch/ScratchJr interface",
      "Create your first simple animation",
      "Learn the concept of giving instructions to a computer"
    ],
    activities: [
      {
        name: "Robot Game",
        duration: "10 min",
        description: "Students take turns being a 'robot' while classmates give step-by-step instructions to complete simple tasks. This teaches that computers follow exact instructions."
      },
      {
        name: "Scratch Tour",
        duration: "15 min",
        description: "Guided exploration of Scratch - finding sprites, backgrounds, and the block palette. Students learn where everything lives."
      },
      {
        name: "My First Animation",
        duration: "15 min",
        description: "Create a simple animation where a character moves across the screen and says 'Hello!' Using move and say blocks."
      }
    ],
    project: "Hello World Animation - Make a sprite introduce itself and move around",
    scratchLink: "https://scratch.mit.edu/projects/editor/",
    skills: ["Sequencing", "Basic Navigation", "Move Blocks", "Say Blocks"]
  },
  {
    week: 2,
    title: "Sequencing Adventures",
    subtitle: "Putting Steps in the Right Order",
    icon: Target,
    color: "bg-chart-2",
    objectives: [
      "Understand that order matters in coding",
      "Create multi-step sequences",
      "Debug simple ordering mistakes",
      "Connect multiple blocks together"
    ],
    activities: [
      {
        name: "Story Sequencing",
        duration: "10 min",
        description: "Students arrange picture cards to tell a story in order. Discuss how changing the order changes the story - just like code!"
      },
      {
        name: "Dance Sequence",
        duration: "15 min",
        description: "Program a sprite to do a dance with multiple moves in sequence. Students stack move, turn, and wait blocks."
      },
      {
        name: "Debug Challenge",
        duration: "15 min",
        description: "Fix scrambled code sequences. Students identify which blocks are out of order and rearrange them."
      }
    ],
    project: "Dance Party - Create a sprite that performs a 5-step dance routine",
    scratchLink: "https://scratch.mit.edu/projects/editor/",
    skills: ["Sequencing", "Wait Blocks", "Turn Blocks", "Debugging"]
  },
  {
    week: 3,
    title: "Loop-de-Loop!",
    subtitle: "Making Actions Repeat",
    icon: Repeat,
    color: "bg-chart-3",
    objectives: [
      "Understand what loops are and why we use them",
      "Use repeat blocks to make code shorter",
      "Create patterns using loops",
      "Recognize when to use a loop vs sequential code"
    ],
    activities: [
      {
        name: "Pattern Hunt",
        duration: "10 min",
        description: "Find repeating patterns in real life - floor tiles, music beats, walking. Discuss how patterns repeat."
      },
      {
        name: "Loop vs No Loop",
        duration: "15 min",
        description: "Compare code that uses loops vs code that repeats blocks manually. See how loops save time and space!"
      },
      {
        name: "Shape Drawing",
        duration: "15 min",
        description: "Use loops to draw shapes - squares, triangles, and stars. Each shape uses a different repeat number."
      }
    ],
    project: "Shape Art - Use loops to create a colorful pattern or geometric design",
    scratchLink: "https://scratch.mit.edu/projects/editor/",
    skills: ["Repeat Loops", "Pattern Recognition", "Efficiency", "Pen Blocks"]
  },
  {
    week: 4,
    title: "Click, Tap, Play!",
    subtitle: "Making Things Interactive with Events",
    icon: MousePointerClick,
    color: "bg-chart-4",
    objectives: [
      "Understand what events are in coding",
      "Use 'when green flag clicked' to start programs",
      "Respond to keyboard and mouse clicks",
      "Create interactive projects"
    ],
    activities: [
      {
        name: "Event Brainstorm",
        duration: "10 min",
        description: "List things that 'trigger' actions in real life - doorbells, alarms, light switches. Connect to coding events."
      },
      {
        name: "Keyboard Control",
        duration: "15 min",
        description: "Make a sprite move using arrow keys. Students learn 'when key pressed' events."
      },
      {
        name: "Click Reactions",
        duration: "15 min",
        description: "Create sprites that react when clicked - change costume, make sounds, or say something funny."
      }
    ],
    project: "Pet the Sprite - Create an interactive pet that responds to clicks and key presses",
    scratchLink: "https://scratch.mit.edu/projects/editor/",
    skills: ["Events", "Keyboard Input", "Mouse Input", "Green Flag"]
  },
  {
    week: 5,
    title: "Story Time!",
    subtitle: "Creating Interactive Stories",
    icon: MessageSquare,
    color: "bg-chart-5",
    objectives: [
      "Create characters that have conversations",
      "Use timing to coordinate dialogue",
      "Add multiple scenes/backdrops",
      "Combine sequencing, loops, and events"
    ],
    activities: [
      {
        name: "Story Planning",
        duration: "10 min",
        description: "Students sketch a simple 3-scene story with characters. Plan what each character will say and do."
      },
      {
        name: "Dialogue Building",
        duration: "20 min",
        description: "Create two sprites that have a conversation using say blocks and wait blocks for timing."
      },
      {
        name: "Scene Changes",
        duration: "10 min",
        description: "Learn to switch backdrops and use 'when backdrop switches' events."
      }
    ],
    project: "My Mini Story - Create a short interactive story with at least 2 characters and 2 scenes",
    scratchLink: "https://scratch.mit.edu/projects/editor/",
    skills: ["Dialogue", "Timing", "Backdrops", "Broadcast Messages"]
  },
  {
    week: 6,
    title: "Art Studio",
    subtitle: "Creative Coding with Colors and Sounds",
    icon: Palette,
    color: "bg-chart-1",
    objectives: [
      "Use color and graphic effects",
      "Add sounds and music to projects",
      "Create visual effects with loops",
      "Express creativity through code"
    ],
    activities: [
      {
        name: "Effect Explorer",
        duration: "10 min",
        description: "Experiment with all the visual effects - color, fisheye, whirl, pixelate. See what each one does!"
      },
      {
        name: "Sound Safari",
        duration: "15 min",
        description: "Browse the sound library and add sounds to sprites. Learn when sounds play and how to time them."
      },
      {
        name: "Animation Effects",
        duration: "15 min",
        description: "Combine loops and effects to create smooth animations - growing, shrinking, spinning, and color changing."
      }
    ],
    project: "My Art Show - Create an animated artwork with colors, effects, and sounds",
    scratchLink: "https://scratch.mit.edu/projects/editor/",
    skills: ["Graphic Effects", "Sound Blocks", "Costumes", "Animation"]
  },
  {
    week: 7,
    title: "Game Time!",
    subtitle: "Build Your First Simple Game",
    icon: Gamepad2,
    color: "bg-chart-2",
    objectives: [
      "Understand basic game mechanics",
      "Create a simple catching or chasing game",
      "Keep track of score",
      "Combine all skills learned so far"
    ],
    activities: [
      {
        name: "Game Analysis",
        duration: "10 min",
        description: "Play a simple Scratch game together. Discuss: What are the rules? How do you win? What makes it fun?"
      },
      {
        name: "Catch the Star",
        duration: "25 min",
        description: "Build a game where the player controls a character to catch falling objects. Learn variables for scoring."
      },
      {
        name: "Game Testing",
        duration: "5 min",
        description: "Trade games with a partner. Give feedback on what is fun and what could be better."
      }
    ],
    project: "Catch Game - Create a game where players catch falling objects and earn points",
    scratchLink: "https://scratch.mit.edu/projects/editor/",
    skills: ["Game Design", "Variables", "Score Keeping", "Collision Detection"]
  },
  {
    week: 8,
    title: "Showcase Day!",
    subtitle: "Share Your Amazing Creations",
    icon: Trophy,
    color: "bg-chart-3",
    objectives: [
      "Complete and polish a final project",
      "Practice presenting and explaining code",
      "Celebrate learning achievements",
      "Plan next steps in coding journey"
    ],
    activities: [
      {
        name: "Project Polishing",
        duration: "20 min",
        description: "Final time to add finishing touches to projects. Add instructions, fix bugs, make it special!"
      },
      {
        name: "Show and Tell",
        duration: "20 min",
        description: "Each student shares their favorite project with the class. Explain what it does and what they are proud of."
      },
      {
        name: "Certificate Ceremony",
        duration: "5 min",
        description: "Celebrate completing Code Explorers! Discuss what comes next - more Scratch, or moving to new challenges."
      }
    ],
    project: "Choose your favorite project to polish and present to the class",
    scratchLink: "https://scratch.mit.edu/projects/editor/",
    skills: ["Presentation", "Debugging", "Creativity", "Reflection"]
  }
]

const courseSkills = [
  { name: "Sequencing", description: "Putting instructions in the right order" },
  { name: "Loops", description: "Making actions repeat" },
  { name: "Events", description: "Making things respond to clicks and keys" },
  { name: "Problem Solving", description: "Breaking down big problems into small steps" },
  { name: "Debugging", description: "Finding and fixing mistakes in code" },
  { name: "Creativity", description: "Expressing ideas through code" },
]

export function CodeExplorersClass({ isPart2Unlocked = false }: { isPart2Unlocked?: boolean }) {
  const [activeWeek, setActiveWeek] = useState(1)
  const [completedWeeks, setCompletedWeeks] = useState<number[]>([])

  const toggleWeekComplete = (week: number) => {
    if (completedWeeks.includes(week)) {
      setCompletedWeeks(completedWeeks.filter(w => w !== week))
    } else {
      setCompletedWeeks([...completedWeeks, week])
    }
  }

  const progress = (completedWeeks.length / 8) * 100

  const currentWeek = curriculumWeeks.find(w => w.week === activeWeek)!

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/20 to-accent/10 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge className="bg-primary text-primary-foreground px-3 py-1 text-sm font-semibold">
                  Grades 1-2
                </Badge>
                <Badge variant="outline" className="px-3 py-1 text-sm">
                  8 Weeks Total
                </Badge>
                <Badge variant="outline" className="px-3 py-1 text-sm">
                  45 min/session
                </Badge>
                <Badge className="bg-amber-100 text-amber-800 border-amber-300 px-3 py-1 text-sm">
                  Part 1: Weeks 1-4 | Part 2: Weeks 5-8
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance">
                Code Explorers
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-2xl text-pretty">
                Young coders explore visual programming and create interactive stories using ScratchJr and Scratch!
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="text-lg px-6 gap-2">
                  <Play className="h-5 w-5" />
                  Start Learning
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-6 gap-2">
                  <ExternalLink className="h-5 w-5" />
                  Open Scratch
                </Button>
              </div>
            </div>
            
            <div className="lg:w-80">
              <Card className="border-2 border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Star className="h-5 w-5 text-accent" />
                    Your Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Weeks Completed</span>
                      <span className="font-semibold">{completedWeeks.length} / 8</span>
                    </div>
                    <Progress value={progress} className="h-3" />
                    <p className="text-xs text-muted-foreground">
                      {progress === 100 
                        ? "Congratulations! You completed the course!" 
                        : `${8 - completedWeeks.length} weeks remaining`}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-accent/5 rounded-full blur-3xl" />
      </header>

      {/* Course Overview */}
      <section className="py-12 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-2 hover:border-primary/30 transition-colors">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>What Students Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                    Core programming concepts
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                    Computational thinking skills
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                    Problem-solving strategies
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                    Breaking down complex problems
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/30 transition-colors">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-accent/20 flex items-center justify-center mb-2">
                  <Sparkles className="h-6 w-6 text-accent-foreground" />
                </div>
                <CardTitle>Platform</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    All coding happens in the browser - no downloads needed!
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="secondary">ScratchJr</Badge>
                    <Badge variant="secondary">Scratch 3.0</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full gap-2" asChild>
                    <a href="https://scratch.mit.edu" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      Visit Scratch
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/30 transition-colors md:col-span-2 lg:col-span-1">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-secondary-foreground" />
                </div>
                <CardTitle>Class Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Age Group</p>
                    <p className="font-semibold">Grades 1-2</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Duration</p>
                    <p className="font-semibold">8 Weeks</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Session Length</p>
                    <p className="font-semibold">45 Minutes</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Format</p>
                    <p className="font-semibold">Live Online</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Skills Students Will Develop</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {courseSkills.map((skill) => (
              <Card key={skill.name} className="text-center p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-sm mb-1">{skill.name}</h3>
                <p className="text-xs text-muted-foreground">{skill.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Curriculum */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Weekly Curriculum</h2>
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
                    Continue the adventure! In Part 2, students will create interactive stories, explore art and sound, 
                    build their first game, and showcase their amazing creations!
                  </p>
                  <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                    Enroll in Part 2
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Tabs value={`week-${activeWeek}`} onValueChange={(v) => setActiveWeek(parseInt(v.replace('week-', '')))}>
            {/* Week Selector - Scrollable on mobile */}
            <div className="mb-8 overflow-x-auto pb-2">
              <TabsList className="inline-flex h-auto p-1 bg-card border border-border">
                {curriculumWeeks.map((week) => {
                  const isLocked = week.week > 4 && !isPart2Unlocked
                  return (
                    <TabsTrigger
                      key={week.week}
                      value={`week-${week.week}`}
                      disabled={isLocked}
                      className={`flex flex-col items-center gap-1 px-4 py-3 min-w-[80px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <span className="text-xs font-medium flex items-center gap-1">
                        Week {week.week}
                        {isLocked && <Lock className="h-3 w-3" />}
                      </span>
                      <week.icon className="h-5 w-5" />
                      {completedWeeks.includes(week.week) && !isLocked && (
                        <CheckCircle2 className="h-3 w-3 text-primary" />
                      )}
                    </TabsTrigger>
                  )
                })}
              </TabsList>
            </div>

            {/* Week Content */}
            {curriculumWeeks.map((week) => (
              <TabsContent key={week.week} value={`week-${week.week}`} className="mt-0">
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Main Content */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Week Header Card */}
                    <Card className="border-2 overflow-hidden">
                      <div className={`h-2 ${week.color}`} />
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardDescription className="text-base">Week {week.week}</CardDescription>
                            <CardTitle className="text-2xl md:text-3xl">{week.title}</CardTitle>
                            <p className="text-muted-foreground mt-1">{week.subtitle}</p>
                          </div>
                          <div className={`h-16 w-16 rounded-2xl ${week.color} bg-opacity-20 flex items-center justify-center`}>
                            <week.icon className="h-8 w-8 text-foreground" />
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge variant="outline" className="gap-1">
                            <Clock className="h-3 w-3" />
                            45 minutes
                          </Badge>
                          {week.skills.map((skill) => (
                            <Badge key={skill} variant="secondary">{skill}</Badge>
                          ))}
                        </div>
                        <Button 
                          onClick={() => toggleWeekComplete(week.week)}
                          variant={completedWeeks.includes(week.week) ? "default" : "outline"}
                          className="gap-2"
                        >
                          {completedWeeks.includes(week.week) ? (
                            <>
                              <CheckCircle2 className="h-4 w-4" />
                              Completed
                            </>
                          ) : (
                            <>
                              Mark as Complete
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Learning Objectives */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Target className="h-5 w-5 text-primary" />
                          Learning Objectives
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {week.objectives.map((objective, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                <span className="text-xs font-semibold text-primary">{i + 1}</span>
                              </div>
                              <span>{objective}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    {/* Activities */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Play className="h-5 w-5 text-primary" />
                          Class Activities
                        </CardTitle>
                        <CardDescription>45-minute session breakdown</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                          {week.activities.map((activity, i) => (
                            <AccordionItem key={i} value={`activity-${i}`}>
                              <AccordionTrigger className="hover:no-underline">
                                <div className="flex items-center gap-3 text-left">
                                  <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                                    <span className="text-sm font-bold text-secondary-foreground">{i + 1}</span>
                                  </div>
                                  <div>
                                    <p className="font-semibold">{activity.name}</p>
                                    <p className="text-sm text-muted-foreground">{activity.duration}</p>
                                  </div>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <p className="text-muted-foreground pl-11">
                                  {activity.description}
                                </p>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Project Card */}
                    <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <BookOpen className="h-5 w-5 text-primary" />
                          Week {week.week} Project
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground">{week.project}</p>
                        <Button className="w-full gap-2" asChild>
                          <a href={week.scratchLink} target="_blank" rel="noopener noreferrer">
                            Open Scratch Editor
                            <ArrowRight className="h-4 w-4" />
                          </a>
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Navigation */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Navigate Weeks</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <Button 
                            variant="outline" 
                            disabled={week.week === 1}
                            onClick={() => setActiveWeek(week.week - 1)}
                            className="gap-1"
                          >
                            <ArrowRight className="h-4 w-4 rotate-180" />
                            Previous
                          </Button>
                          <Button 
                            variant="outline"
                            disabled={week.week === 8}
                            onClick={() => setActiveWeek(week.week + 1)}
                            className="gap-1"
                          >
                            Next
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Teacher Tips */}
                    <Card className="bg-secondary/30">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Lightbulb className="h-5 w-5 text-secondary-foreground" />
                          Teaching Tips
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>Keep energy high with frequent check-ins</li>
                          <li>Encourage experimentation over perfection</li>
                          <li>Celebrate all attempts, not just successes</li>
                          <li>Use screen sharing to demonstrate concepts</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Quick Links Footer */}
      <section className="py-12 bg-card border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Ready to Start?</h3>
              <p className="text-muted-foreground">Open Scratch in your browser to begin coding - no downloads needed!</p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" size="lg" asChild>
                <a href="https://www.scratchjr.org/" target="_blank" rel="noopener noreferrer">
                  ScratchJr (Tablets)
                </a>
              </Button>
              <Button size="lg" asChild>
                <a href="https://scratch.mit.edu/projects/editor/" target="_blank" rel="noopener noreferrer">
                  Scratch 3.0
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
