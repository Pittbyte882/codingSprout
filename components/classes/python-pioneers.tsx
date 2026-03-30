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
  Code2, 
  ExternalLink, 
  Lightbulb, 
  Target,
  Terminal,
  Rocket,
  BookOpen,
  Users,
  Brain,
  Zap,
  ChevronDown,
  ChevronUp,
  Lock
} from "lucide-react"

const weeks = [
  {
    week: 1,
    title: "Welcome to Python!",
    description: "Set up your coding environment and write your first Python program",
    objectives: [
      "Set up Replit account and workspace",
      "Understand what Python is and why it's popular",
      "Write and run your first Python program",
      "Learn about print statements and comments"
    ],
    activities: [
      { name: "Environment Setup", duration: "15 min", description: "Create Replit account and explore the interface" },
      { name: "Hello World", duration: "20 min", description: "Write your first program and understand print()" },
      { name: "Comment Challenge", duration: "25 min", description: "Add comments and create an introduction program" }
    ],
    project: "About Me Program",
    projectDescription: "Create a program that prints your name, age, favorite hobby, and a fun fact using multiple print statements and comments.",
    skills: ["Print Statements", "Comments", "Running Code"],
    teacherTip: "Emphasize that errors are normal and part of learning. Show students how to read error messages."
  },
  {
    week: 2,
    title: "Variables: Storing Information",
    description: "Learn how to store and use data with variables",
    objectives: [
      "Understand what variables are and why we use them",
      "Create variables with meaningful names",
      "Use variables in print statements",
      "Learn about variable naming rules"
    ],
    activities: [
      { name: "Variable Basics", duration: "20 min", description: "Create variables and understand assignment" },
      { name: "Name That Variable", duration: "15 min", description: "Practice good naming conventions" },
      { name: "Variable Story", duration: "25 min", description: "Build a story using variables that can be changed" }
    ],
    project: "Mad Libs Generator",
    projectDescription: "Create a Mad Libs story where variables hold nouns, verbs, and adjectives that make a funny story when printed together.",
    skills: ["Variables", "Assignment", "String Concatenation"],
    teacherTip: "Use real-world analogies like labeled boxes or containers to explain variables."
  },
  {
    week: 3,
    title: "Data Types: Numbers and Strings",
    description: "Explore different types of data Python can work with",
    objectives: [
      "Distinguish between integers, floats, and strings",
      "Perform math operations with numbers",
      "Combine and manipulate strings",
      "Convert between data types"
    ],
    activities: [
      { name: "Type Detective", duration: "15 min", description: "Identify and categorize different data types" },
      { name: "Math in Python", duration: "20 min", description: "Use Python as a calculator with +, -, *, /, //, %" },
      { name: "String Magic", duration: "25 min", description: "Concatenate, repeat, and format strings" }
    ],
    project: "Calculator Program",
    projectDescription: "Build a program that takes two numbers and displays all math operations: addition, subtraction, multiplication, division, and remainder.",
    skills: ["Integers", "Floats", "Strings", "Type Conversion"],
    teacherTip: "Show common errors like adding strings to numbers to teach type conversion naturally."
  },
  {
    week: 4,
    title: "Input: Talking to Users",
    description: "Make your programs interactive with user input",
    objectives: [
      "Use the input() function to get user data",
      "Store user input in variables",
      "Convert input to appropriate data types",
      "Create interactive programs"
    ],
    activities: [
      { name: "Input Basics", duration: "15 min", description: "Learn input() and store responses in variables" },
      { name: "Type Conversion", duration: "20 min", description: "Convert string input to numbers for calculations" },
      { name: "Interactive Build", duration: "25 min", description: "Create a program that responds to user input" }
    ],
    project: "Personal Quiz",
    projectDescription: "Create a quiz that asks the user questions about themselves and gives a personalized response based on their answers.",
    skills: ["Input Function", "Type Casting", "User Interaction"],
    teacherTip: "Remind students that input() always returns a string - demonstrate with a simple addition that fails."
  },
  {
    week: 5,
    title: "Conditionals: Making Decisions",
    description: "Teach your programs to make choices with if statements",
    objectives: [
      "Understand Boolean values (True/False)",
      "Use comparison operators (==, !=, <, >, <=, >=)",
      "Write if, elif, and else statements",
      "Create programs that respond differently based on conditions"
    ],
    activities: [
      { name: "True or False", duration: "15 min", description: "Explore Boolean values and comparisons" },
      { name: "If/Else Practice", duration: "20 min", description: "Write conditional statements with different paths" },
      { name: "Decision Tree", duration: "25 min", description: "Build a program with multiple elif branches" }
    ],
    project: "Grade Calculator",
    projectDescription: "Create a program that takes a score and outputs the letter grade (A, B, C, D, F) with a message about performance.",
    skills: ["Booleans", "Comparison Operators", "If/Elif/Else"],
    teacherTip: "Use flowcharts to visualize the decision-making process before writing code."
  },
  {
    week: 6,
    title: "Loops: Repeat and Iterate",
    description: "Automate repetitive tasks with for and while loops",
    objectives: [
      "Understand why loops are useful",
      "Use for loops with range()",
      "Use while loops with conditions",
      "Avoid infinite loops"
    ],
    activities: [
      { name: "For Loop Basics", duration: "20 min", description: "Iterate with for loops and range()" },
      { name: "While Loops", duration: "20 min", description: "Create condition-based loops" },
      { name: "Loop Patterns", duration: "20 min", description: "Build patterns and countdowns with loops" }
    ],
    project: "Multiplication Table Generator",
    projectDescription: "Create a program that asks for a number and prints its multiplication table from 1 to 12 using loops.",
    skills: ["For Loops", "While Loops", "Range Function"],
    teacherTip: "Demonstrate an infinite loop (safely!) so students understand why loop conditions matter."
  },
  {
    week: 7,
    title: "Lists: Organizing Data",
    description: "Store and manage collections of information",
    objectives: [
      "Create and access list elements",
      "Add, remove, and modify list items",
      "Loop through lists",
      "Use list methods and functions"
    ],
    activities: [
      { name: "List Basics", duration: "20 min", description: "Create lists and access items by index" },
      { name: "List Operations", duration: "20 min", description: "Add, remove, and modify list elements" },
      { name: "List Loops", duration: "20 min", description: "Iterate through lists with for loops" }
    ],
    project: "To-Do List App",
    projectDescription: "Build a simple to-do list that lets users add tasks, view all tasks, and mark tasks as complete.",
    skills: ["Lists", "Indexing", "List Methods", "Iteration"],
    teacherTip: "Connect lists to real-world examples like shopping lists or class rosters."
  },
  {
    week: 8,
    title: "Capstone: Python Project Showcase",
    description: "Combine all skills to build and present your final project",
    objectives: [
      "Plan and design a complete program",
      "Apply variables, input, conditionals, loops, and lists",
      "Debug and test your code",
      "Present your project to the class"
    ],
    activities: [
      { name: "Project Planning", duration: "15 min", description: "Design your program with pseudocode" },
      { name: "Build Time", duration: "30 min", description: "Code your final project" },
      { name: "Showcase", duration: "15 min", description: "Present and celebrate achievements" }
    ],
    project: "Choose Your Adventure",
    projectDescription: "Create a text-based adventure game OR a quiz game that uses all the skills learned: variables, input, conditionals, loops, and lists.",
    skills: ["Project Planning", "Integration", "Presentation"],
    teacherTip: "Encourage creativity! Students can modify the project idea to match their interests."
  }
]

const skillsOverview = [
  { icon: Terminal, label: "Python Syntax", description: "Write clean, working Python code" },
  { icon: Code2, label: "Variables & Data Types", description: "Store and manipulate different types of data" },
  { icon: Brain, label: "Conditionals", description: "Make programs that decide and respond" },
  { icon: Zap, label: "Loops", description: "Automate repetitive tasks efficiently" },
  { icon: BookOpen, label: "Lists", description: "Organize and manage collections of data" },
  { icon: Users, label: "Problem Solving", description: "Break down complex challenges into steps" }
]

export function PythonPioneersClass({ isPart2Unlocked = false }: { isPart2Unlocked?: boolean }) {
  const [completedWeeks, setCompletedWeeks] = useState<number[]>([])
  const [expandedActivities, setExpandedActivities] = useState<number | null>(null)

  const toggleWeekComplete = (week: number) => {
    setCompletedWeeks(prev => 
      prev.includes(week) 
        ? prev.filter(w => w !== week)
        : [...prev, week]
    )
  }

  const toggleActivities = (week: number) => {
    setExpandedActivities(prev => prev === week ? null : week)
  }

  const progress = (completedWeeks.length / weeks.length) * 100

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-white/20 text-white border-0">
              Grades 6-8
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-0">
              8 Weeks Total
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-0">
              60 min/session
            </Badge>
            <Badge className="bg-amber-400 text-amber-900">
              Part 1: Weeks 1-4 | Part 2: Weeks 5-8
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Python Pioneers</h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Begin your Python programming journey! Learn fundamental programming concepts 
            including variables, data types, loops, and conditionals while building real programs from scratch.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
              <Terminal className="h-5 w-5" />
              <span>Python via Replit</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
              <Clock className="h-5 w-5" />
              <span>No Downloads Required</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Section */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Course Progress</CardTitle>
                <CardDescription>Track your journey through Python Pioneers</CardDescription>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-primary">{completedWeeks.length}</span>
                <span className="text-muted-foreground"> / {weeks.length} weeks</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={progress} className="h-3" />
          </CardContent>
        </Card>

        {/* Skills Overview */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Skills You Will Learn</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {skillsOverview.map((skill, index) => (
              <Card key={index} className="text-center p-4">
                <skill.icon className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <h3 className="font-semibold text-sm">{skill.label}</h3>
                <p className="text-xs text-muted-foreground mt-1">{skill.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Weekly Curriculum */}
        <h2 className="text-2xl font-bold mb-4">Course Curriculum</h2>
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
                  Go deeper into Python! In Part 2, students master conditionals, loops, lists, and 
                  build a capstone project showcasing all their new programming skills!
                </p>
                <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                  Enroll in Part 2
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="week-1" className="w-full">
          <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent mb-6">
            {weeks.map((week) => {
              const isLocked = week.week > 4 && !isPart2Unlocked
              return (
                <TabsTrigger
                  key={week.week}
                  value={`week-${week.week}`}
                  disabled={isLocked}
                  className={`data-[state=active]:bg-blue-600 data-[state=active]:text-white relative ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <span className="flex items-center gap-1">
                    Week {week.week}
                    {isLocked && <Lock className="h-3 w-3" />}
                  </span>
                  {completedWeeks.includes(week.week) && !isLocked && (
                    <CheckCircle2 className="h-3 w-3 absolute -top-1 -right-1 text-green-500" />
                  )}
                </TabsTrigger>
              )
            })}
          </TabsList>

          {weeks.map((week) => (
            <TabsContent key={week.week} value={`week-${week.week}`}>
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <Badge className="mb-2 bg-blue-600">Week {week.week}</Badge>
                          <CardTitle className="text-2xl">{week.title}</CardTitle>
                          <CardDescription className="text-base mt-2">
                            {week.description}
                          </CardDescription>
                        </div>
                        <Button
                          variant={completedWeeks.includes(week.week) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleWeekComplete(week.week)}
                          className="shrink-0"
                        >
                          {completedWeeks.includes(week.week) ? (
                            <>
                              <CheckCircle2 className="h-4 w-4 mr-1" />
                              Completed
                            </>
                          ) : (
                            <>
                              <Circle className="h-4 w-4 mr-1" />
                              Mark Complete
                            </>
                          )}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Learning Objectives */}
                      <div>
                        <h3 className="font-semibold flex items-center gap-2 mb-3">
                          <Target className="h-5 w-5 text-blue-600" />
                          Learning Objectives
                        </h3>
                        <ul className="grid md:grid-cols-2 gap-2">
                          {week.objectives.map((objective, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                              {objective}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Activities */}
                      <div>
                        <button
                          onClick={() => toggleActivities(week.week)}
                          className="font-semibold flex items-center gap-2 mb-3 hover:text-blue-600 transition-colors"
                        >
                          <Clock className="h-5 w-5 text-blue-600" />
                          Activities (60 min total)
                          {expandedActivities === week.week ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </button>
                        {expandedActivities === week.week && (
                          <div className="space-y-3">
                            {week.activities.map((activity, index) => (
                              <div key={index} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                                <Badge variant="outline" className="shrink-0">
                                  {activity.duration}
                                </Badge>
                                <div>
                                  <p className="font-medium text-sm">{activity.name}</p>
                                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Skills */}
                      <div>
                        <h3 className="font-semibold mb-3">Skills Practiced</h3>
                        <div className="flex flex-wrap gap-2">
                          {week.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Project Card */}
                  <Card className="border-blue-200 bg-blue-50/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Rocket className="h-5 w-5 text-blue-600" />
                        Week {week.week} Project
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-bold text-lg mb-2">{week.project}</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        {week.projectDescription}
                      </p>
                      <Button className="w-full gap-2 bg-blue-600 hover:bg-blue-700" asChild>
                        <a href="https://replit.com" target="_blank" rel="noopener noreferrer">
                          Open Replit
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Teacher Tip */}
                  <Card className="border-amber-200 bg-amber-50/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Lightbulb className="h-5 w-5 text-amber-600" />
                        Teaching Tip
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{week.teacherTip}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
