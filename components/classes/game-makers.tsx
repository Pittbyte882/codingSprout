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
  Gamepad2, 
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
  Zap,
  Trophy,
  Variable,
  GitBranch,
  Repeat,
  Bug,
  Puzzle,
  Swords,
  Gauge,
  Medal,
  Lock
} from "lucide-react"

const curriculumWeeks = [
  {
    week: 1,
    title: "Welcome to Game Design!",
    subtitle: "What Makes a Great Game?",
    icon: Gamepad2,
    color: "bg-chart-1",
    objectives: [
      "Explore what makes games fun and engaging",
      "Identify core game mechanics in popular games",
      "Learn the game design process",
      "Plan your first game concept"
    ],
    activities: [
      {
        name: "Game Analysis",
        duration: "10 min",
        description: "Play 2-3 simple Scratch games together. Discuss: What's the goal? What are the rules? What makes it fun or frustrating? Students identify patterns in good game design."
      },
      {
        name: "Game Elements Hunt",
        duration: "15 min",
        description: "Create a checklist of game elements: player, goal, obstacles, score, levels. Students sketch their own game idea including these elements."
      },
      {
        name: "My First Maze",
        duration: "20 min",
        description: "Build a simple maze game where the player navigates a character to reach a goal. Introduction to x/y coordinates and basic movement."
      }
    ],
    project: "Maze Runner - Create a maze where the player guides a character to the goal",
    scratchLink: "https://scratch.mit.edu/projects/editor/",
    skills: ["Game Design", "Planning", "Coordinates", "Movement"]
  },
  {
    week: 2,
    title: "Variables: Keeping Score!",
    subtitle: "Tracking Numbers in Your Games",
    icon: Variable,
    color: "bg-chart-2",
    objectives: [
      "Understand what variables are and why games need them",
      "Create and name variables in Scratch",
      "Change variable values during gameplay",
      "Display score and other information on screen"
    ],
    activities: [
      {
        name: "What's a Variable?",
        duration: "10 min",
        description: "Use real-world examples: a scoreboard, a timer, lives remaining. Variables are like labeled boxes that hold changing information."
      },
      {
        name: "Score Counter",
        duration: "20 min",
        description: "Add a score variable to last week's maze. Every time the player collects a coin, score goes up by 1. Learn 'change by' and 'set to' blocks."
      },
      {
        name: "Lives System",
        duration: "15 min",
        description: "Add a 'lives' variable. Start with 3 lives. If the player touches an obstacle, lose a life. Display both score and lives on screen."
      }
    ],
    project: "Coin Collector - Upgrade your maze with collectible coins, a score counter, and a lives system",
    scratchLink: "https://scratch.mit.edu/projects/editor/",
    skills: ["Variables", "Score Keeping", "Lives", "Data Display"]
  },
  {
    week: 3,
    title: "Conditionals: If This, Then That!",
    subtitle: "Making Decisions in Code",
    icon: GitBranch,
    color: "bg-chart-3",
    objectives: [
      "Understand conditional statements (if/then)",
      "Use comparison operators (equals, greater than, less than)",
      "Create win and lose conditions",
      "Combine multiple conditions"
    ],
    activities: [
      {
        name: "Conditional Thinking",
        duration: "10 min",
        description: "Real-life conditionals: 'If it's raining, bring an umbrella.' 'If your score is 10, you win!' Students create their own if/then statements."
      },
      {
        name: "Win Condition",
        duration: "15 min",
        description: "Add a win condition: 'If score = 10, show 'You Win!' and stop the game. Use the if/then block with comparison operators."
      },
      {
        name: "Game Over Logic",
        duration: "20 min",
        description: "Create a game over condition: 'If lives = 0, show Game Over.' Add a restart button so players can try again."
      }
    ],
    project: "Complete Game Loop - Add win and lose conditions to create a full game experience",
    scratchLink: "https://scratch.mit.edu/projects/editor/",
    skills: ["If/Then", "Comparisons", "Win/Lose Logic", "Game States"]
  },
  {
    week: 4,
    title: "If/Else: Two Paths!",
    subtitle: "Different Outcomes Based on Conditions",
    icon: Puzzle,
    color: "bg-chart-4",
    objectives: [
      "Understand if/else statements",
      "Create different outcomes based on conditions",
      "Build power-ups and bonuses",
      "Use nested conditionals"
    ],
    activities: [
      {
        name: "If/Else Examples",
        duration: "10 min",
        description: "Expand thinking: 'If score > 5, you're doing great! Else, keep trying!' Two possible paths based on one check."
      },
      {
        name: "Power-Up System",
        duration: "20 min",
        description: "Create a power-up that appears randomly. If player touches power-up, gain 5 bonus points. Else, power-up disappears after 3 seconds."
      },
      {
        name: "Difficulty Levels",
        duration: "15 min",
        description: "If score > 10, obstacles move faster. Else, obstacles move slowly. Create escalating difficulty based on player progress."
      }
    ],
    project: "Power-Up Challenge - Add power-ups, bonuses, and difficulty scaling to your game",
    scratchLink: "https://scratch.mit.edu/projects/editor/",
    skills: ["If/Else", "Power-Ups", "Difficulty", "Nested Conditions"]
  },
  {
    week: 5,
    title: "Loops in Games",
    subtitle: "Repeating Actions and Game Loops",
    icon: Repeat,
    color: "bg-chart-5",
    objectives: [
      "Use forever loops for continuous game action",
      "Create repeat until loops for specific conditions",
      "Spawn multiple enemies or obstacles",
      "Animate characters smoothly"
    ],
    activities: [
      {
        name: "Forever vs Repeat",
        duration: "10 min",
        description: "Compare loop types: 'forever' runs until stopped, 'repeat 10' runs exactly 10 times, 'repeat until' runs until a condition is met."
      },
      {
        name: "Enemy Spawner",
        duration: "20 min",
        description: "Use clones and loops to spawn enemies that move across the screen continuously. Create an endless wave of obstacles!"
      },
      {
        name: "Smooth Animation",
        duration: "15 min",
        description: "Use loops to create smooth character animation - walking, jumping, or idle breathing. Cycle through costumes in a loop."
      }
    ],
    project: "Endless Runner - Create a game where obstacles continuously spawn and the player must dodge them",
    scratchLink: "https://scratch.mit.edu/projects/editor/",
    skills: ["Forever Loops", "Clones", "Spawning", "Animation"]
  },
  {
    week: 6,
    title: "Collision Detection",
    subtitle: "When Sprites Touch!",
    icon: Zap,
    color: "bg-chart-1",
    objectives: [
      "Detect when sprites touch each other",
      "Create different outcomes for different collisions",
      "Use color-based collision detection",
      "Build projectiles and shooting mechanics"
    ],
    activities: [
      {
        name: "Collision Types",
        duration: "10 min",
        description: "Explore the 'touching' sensing blocks: touching sprite, touching color, touching edge. Each creates different gameplay possibilities."
      },
      {
        name: "Projectile System",
        duration: "20 min",
        description: "Create a shooting mechanic! Press space to launch a projectile. If it touches an enemy, the enemy disappears and score increases."
      },
      {
        name: "Hazard Zones",
        duration: "15 min",
        description: "Use color detection to create danger zones. If player touches red, lose a life. If player touches green, gain health."
      }
    ],
    project: "Space Shooter - Build a game where you shoot projectiles at moving targets",
    scratchLink: "https://scratch.mit.edu/projects/editor/",
    skills: ["Collision Detection", "Projectiles", "Color Sensing", "Hit Detection"]
  },
  {
    week: 7,
    title: "Polish and Playtest",
    subtitle: "Making Your Game Shine",
    icon: Gauge,
    color: "bg-chart-2",
    objectives: [
      "Add sound effects and music",
      "Create start screens and menus",
      "Write game instructions",
      "Test and debug with real players"
    ],
    activities: [
      {
        name: "Sound Design",
        duration: "15 min",
        description: "Add sound effects for key moments: collecting points, losing a life, winning, background music. Sound makes games feel alive!"
      },
      {
        name: "Start Screen",
        duration: "15 min",
        description: "Create a title screen with the game name and a 'Press Space to Start' instruction. Use backdrops and broadcast messages to manage screens."
      },
      {
        name: "Playtest Party",
        duration: "15 min",
        description: "Trade games with classmates. Play each other's games and give constructive feedback. What's fun? What's confusing? What could be better?"
      }
    ],
    project: "Game Polish - Add a title screen, sound effects, and instructions to your best game",
    scratchLink: "https://scratch.mit.edu/projects/editor/",
    skills: ["Sound Effects", "UI Design", "Instructions", "Playtesting"]
  },
  {
    week: 8,
    title: "Game Showcase!",
    subtitle: "Present Your Masterpiece",
    icon: Trophy,
    color: "bg-chart-3",
    objectives: [
      "Complete and finalize a game project",
      "Present and explain your code to others",
      "Give and receive constructive feedback",
      "Celebrate your game development journey"
    ],
    activities: [
      {
        name: "Final Touches",
        duration: "15 min",
        description: "Last chance to fix bugs, add features, and polish your game. Make sure everything works smoothly for your presentation!"
      },
      {
        name: "Game Presentations",
        duration: "25 min",
        description: "Each student presents their game: show gameplay, explain the code, share what you're most proud of and what was challenging."
      },
      {
        name: "Game Jam Awards",
        duration: "5 min",
        description: "Celebrate with fun awards: Most Creative, Best Sound Design, Hardest Challenge, Most Addictive! Everyone wins something."
      }
    ],
    project: "Final Game - Present your polished game to the class and share it with family",
    scratchLink: "https://scratch.mit.edu/projects/editor/",
    skills: ["Presentation", "Public Speaking", "Debugging", "Celebration"]
  }
]

const courseSkills = [
  { name: "Variables", description: "Storing and tracking game data" },
  { name: "Conditionals", description: "Making decisions with if/then/else" },
  { name: "Game Loops", description: "Continuous gameplay actions" },
  { name: "Collision", description: "Detecting when sprites interact" },
  { name: "Game Design", description: "Planning fun, balanced games" },
  { name: "Debugging", description: "Finding and fixing code problems" },
]

export function GameMakersClass({ isPart2Unlocked = false }: { isPart2Unlocked?: boolean }) {
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
      <header className="relative overflow-hidden bg-gradient-to-br from-chart-2/20 via-chart-4/10 to-chart-1/10 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge className="bg-chart-2 text-foreground px-3 py-1 text-sm font-semibold">
                  Grade 3
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
                Game Makers
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-2xl text-pretty">
                Dive into game design and programming logic! Create your own interactive games while learning variables, conditionals, and control structures.
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
              <Card className="border-2 border-chart-2/30">
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
                        ? "Congratulations! You're a Game Maker!" 
                        : `${8 - completedWeeks.length} weeks remaining`}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-chart-2/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-chart-4/10 rounded-full blur-3xl" />
      </header>

      {/* Course Overview */}
      <section className="py-12 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-2 hover:border-chart-2/30 transition-colors">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-chart-2/20 flex items-center justify-center mb-2">
                  <Lightbulb className="h-6 w-6 text-foreground" />
                </div>
                <CardTitle>What Students Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-chart-2 mt-1 shrink-0" />
                    Variables and data management
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-chart-2 mt-1 shrink-0" />
                    Conditional logic (if/then/else)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-chart-2 mt-1 shrink-0" />
                    Game loops and control flow
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-chart-2 mt-1 shrink-0" />
                    Problem-solving and debugging
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-chart-2/30 transition-colors">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-chart-4/20 flex items-center justify-center mb-2">
                  <Sparkles className="h-6 w-6 text-foreground" />
                </div>
                <CardTitle>Platform</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    All coding happens in the browser - no downloads needed!
                  </p>
                  <div className="flex gap-2">
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

            <Card className="border-2 hover:border-chart-2/30 transition-colors md:col-span-2 lg:col-span-1">
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
                    <p className="font-semibold">Grade 3</p>
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
                    Level up your game development! In Part 2, students master game loops, collision detection, 
                    polish their games, and present their final creations!
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
                      className={`flex flex-col items-center gap-1 px-4 py-3 min-w-[80px] data-[state=active]:bg-chart-2 data-[state=active]:text-foreground ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <span className="text-xs font-medium flex items-center gap-1">
                        Week {week.week}
                        {isLocked && <Lock className="h-3 w-3" />}
                      </span>
                      <week.icon className="h-5 w-5" />
                      {completedWeeks.includes(week.week) && !isLocked && (
                        <CheckCircle2 className="h-3 w-3 text-chart-2" />
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
                          <Target className="h-5 w-5 text-chart-2" />
                          Learning Objectives
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {week.objectives.map((objective, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <div className="h-6 w-6 rounded-full bg-chart-2/20 flex items-center justify-center shrink-0 mt-0.5">
                                <span className="text-xs font-semibold text-foreground">{i + 1}</span>
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
                          <Play className="h-5 w-5 text-chart-2" />
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
                    <Card className="border-2 border-chart-2/30 bg-gradient-to-br from-chart-2/5 to-transparent">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <BookOpen className="h-5 w-5 text-chart-2" />
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
                          <li>Let students experiment and make mistakes</li>
                          <li>Encourage sharing games with classmates</li>
                          <li>Celebrate creative solutions, not just correct ones</li>
                          <li>Use debugging as a learning opportunity</li>
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
              <h3 className="text-xl font-bold mb-2">Ready to Make Games?</h3>
              <p className="text-muted-foreground">Open Scratch in your browser to start building - no downloads needed!</p>
            </div>
            <div className="flex gap-4">
              <Button size="lg" asChild>
                <a href="https://scratch.mit.edu/projects/editor/" target="_blank" rel="noopener noreferrer">
                  Open Scratch Editor
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
