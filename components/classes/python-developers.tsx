"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
  ChevronDown,
  ChevronUp,
  Rocket,
  BookOpen,
  Users,
  Trophy,
  Laptop,
  Boxes,
  GitBranch,
  Database,
  Lock
} from "lucide-react"

const weeks = [
  {
    week: 1,
    title: "Professional Python Setup",
    description: "Set up a professional development environment and learn industry best practices for writing clean, maintainable code.",
    objectives: [
      "Configure VS Code or Replit for Python development",
      "Understand PEP 8 style guidelines",
      "Learn to use comments and docstrings effectively",
      "Create well-structured Python projects"
    ],
    activities: [
      { name: "Environment Setup", duration: "25 min", description: "Install VS Code with Python extensions or set up Replit workspace" },
      { name: "Code Style Workshop", duration: "35 min", description: "Learn PEP 8 conventions and write professional documentation" },
      { name: "Project: Developer Profile", duration: "30 min", description: "Create a professional 'About Me' program with proper structure" }
    ],
    project: "Developer Profile App",
    skills: ["VS Code", "PEP 8", "Documentation", "Project Structure"],
    platform: "VS Code/Replit",
    teachingTip: "Emphasize that professional developers spend significant time on code readability and documentation."
  },
  {
    week: 2,
    title: "Functions and Modularity",
    description: "Master function design, parameters, return values, and learn to write reusable, modular code.",
    objectives: [
      "Create functions with multiple parameters",
      "Understand return values and scope",
      "Learn default and keyword arguments",
      "Apply DRY (Don't Repeat Yourself) principles"
    ],
    activities: [
      { name: "Function Deep Dive", duration: "30 min", description: "Explore parameters, return values, and variable scope" },
      { name: "Refactoring Exercise", duration: "30 min", description: "Take messy code and refactor into clean functions" },
      { name: "Project: Utility Library", duration: "30 min", description: "Build a personal library of reusable functions" }
    ],
    project: "Personal Utility Library",
    skills: ["Functions", "Parameters", "Return Values", "Modularity"],
    platform: "VS Code/Replit",
    teachingTip: "Have students identify repeated code patterns and practice extracting them into functions."
  },
  {
    week: 3,
    title: "Data Structures Deep Dive",
    description: "Explore Python's powerful data structures including lists, dictionaries, tuples, and sets for efficient data management.",
    objectives: [
      "Master list comprehensions and operations",
      "Use dictionaries for key-value data storage",
      "Understand when to use tuples vs lists",
      "Apply sets for unique collections"
    ],
    activities: [
      { name: "Data Structures Tour", duration: "30 min", description: "Compare lists, dicts, tuples, and sets with real examples" },
      { name: "List Comprehensions", duration: "30 min", description: "Write elegant one-line data transformations" },
      { name: "Project: Contact Manager", duration: "30 min", description: "Build a contact system using dictionaries" }
    ],
    project: "Contact Manager System",
    skills: ["Lists", "Dictionaries", "Tuples", "Comprehensions"],
    platform: "VS Code/Replit",
    teachingTip: "Use real-world analogies: dictionaries are like phone books, sets are like unique member lists."
  },
  {
    week: 4,
    title: "File I/O and Data Persistence",
    description: "Learn to read, write, and manage files to create programs that save and load data.",
    objectives: [
      "Read and write text files",
      "Work with CSV and JSON formats",
      "Handle file exceptions gracefully",
      "Implement data persistence in programs"
    ],
    activities: [
      { name: "File Operations", duration: "30 min", description: "Master open, read, write, and close with context managers" },
      { name: "Data Formats Workshop", duration: "30 min", description: "Parse and create CSV and JSON files" },
      { name: "Project: Journal App", duration: "30 min", description: "Build an app that saves entries to files" }
    ],
    project: "Digital Journal Application",
    skills: ["File I/O", "CSV", "JSON", "Exception Handling"],
    platform: "VS Code/Replit",
    teachingTip: "Emphasize the importance of always using 'with' statements for file handling."
  },
  {
    week: 5,
    title: "Object-Oriented Programming I",
    description: "Introduction to OOP concepts including classes, objects, attributes, and methods.",
    objectives: [
      "Understand classes as blueprints for objects",
      "Create classes with __init__ constructors",
      "Define instance attributes and methods",
      "Instantiate and interact with objects"
    ],
    activities: [
      { name: "OOP Foundations", duration: "30 min", description: "Learn classes, objects, and the __init__ method" },
      { name: "Method Design", duration: "30 min", description: "Create methods that modify object state" },
      { name: "Project: Pet Simulator", duration: "30 min", description: "Build a virtual pet with attributes and behaviors" }
    ],
    project: "Virtual Pet Simulator",
    skills: ["Classes", "Objects", "__init__", "Methods"],
    platform: "VS Code/Replit",
    teachingTip: "Use the cookie cutter analogy: the class is the cutter, objects are the cookies."
  },
  {
    week: 6,
    title: "Object-Oriented Programming II",
    description: "Advanced OOP concepts including inheritance, encapsulation, and polymorphism.",
    objectives: [
      "Implement inheritance hierarchies",
      "Override methods in child classes",
      "Understand encapsulation with private attributes",
      "Apply polymorphism in program design"
    ],
    activities: [
      { name: "Inheritance Workshop", duration: "30 min", description: "Create parent and child classes with shared behavior" },
      { name: "Encapsulation and Privacy", duration: "30 min", description: "Learn to protect data with naming conventions" },
      { name: "Project: Game Characters", duration: "30 min", description: "Build a character class hierarchy for a game" }
    ],
    project: "RPG Character System",
    skills: ["Inheritance", "Encapsulation", "Polymorphism", "super()"],
    platform: "VS Code/Replit",
    teachingTip: "Draw family trees to visualize inheritance relationships between classes."
  },
  {
    week: 7,
    title: "Algorithms and Problem Solving",
    description: "Learn fundamental algorithms, Big O notation, and systematic approaches to solving programming challenges.",
    objectives: [
      "Understand algorithm efficiency and Big O",
      "Implement searching algorithms (linear, binary)",
      "Apply sorting algorithms (bubble, selection)",
      "Break down complex problems systematically"
    ],
    activities: [
      { name: "Algorithm Analysis", duration: "30 min", description: "Learn Big O notation and compare algorithm efficiency" },
      { name: "Search and Sort", duration: "30 min", description: "Implement and visualize common algorithms" },
      { name: "Project: Algorithm Visualizer", duration: "30 min", description: "Create a program that demonstrates sorting visually" }
    ],
    project: "Sorting Algorithm Visualizer",
    skills: ["Big O", "Binary Search", "Sorting", "Problem Solving"],
    platform: "VS Code/Replit",
    teachingTip: "Use physical cards or objects to demonstrate sorting algorithms before coding."
  },
  {
    week: 8,
    title: "Capstone: Full Application",
    description: "Apply all skills to design, develop, and present a professional-quality Python application.",
    objectives: [
      "Plan and design a complete application",
      "Apply OOP principles to real-world problems",
      "Implement file I/O for data persistence",
      "Present and document your work professionally"
    ],
    activities: [
      { name: "Project Planning", duration: "25 min", description: "Design application architecture and features" },
      { name: "Development Sprint", duration: "40 min", description: "Build core functionality using all learned concepts" },
      { name: "Presentation Prep", duration: "25 min", description: "Document code and prepare demonstration" }
    ],
    project: "Choose Your Project: Task Manager, Quiz Game, or Inventory System",
    skills: ["Full Stack", "OOP", "File I/O", "Presentation"],
    platform: "VS Code/Replit",
    teachingTip: "Encourage students to choose projects they're passionate about for maximum engagement."
  }
]

const skillsOverview = [
  { icon: Code2, title: "Professional Python", description: "Industry-standard coding practices" },
  { icon: Boxes, title: "Object-Oriented Programming", description: "Classes, inheritance, and encapsulation" },
  { icon: Database, title: "Data Management", description: "Files, JSON, and data structures" },
  { icon: GitBranch, title: "Algorithms", description: "Searching, sorting, and Big O" },
  { icon: Lightbulb, title: "Problem Solving", description: "Systematic debugging and design" },
  { icon: Laptop, title: "Real Applications", description: "Build portfolio-ready projects" }
]

export function PythonDevelopers({ isPart2Unlocked = false }: { isPart2Unlocked?: boolean }) {
  const [completedWeeks, setCompletedWeeks] = useState<number[]>([])
  const [expandedActivity, setExpandedActivity] = useState<string | null>(null)

  const toggleWeekComplete = (week: number) => {
    setCompletedWeeks(prev => 
      prev.includes(week) 
        ? prev.filter(w => w !== week)
        : [...prev, week]
    )
  }

  const progress = (completedWeeks.length / weeks.length) * 100

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-chart-3/20 via-background to-chart-4/20 border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
              <Badge className="bg-chart-3 text-primary-foreground text-sm px-3 py-1">
                Grades 9-12
              </Badge>
              <Badge variant="outline" className="text-sm px-3 py-1">
                8 Weeks Total
              </Badge>
              <Badge variant="outline" className="text-sm px-3 py-1">
                <Clock className="h-3 w-3 mr-1" />
                90 min/week
              </Badge>
              <Badge className="bg-amber-400 text-amber-900 text-sm px-3 py-1">
                Part 1: Weeks 1-4 | Part 2: Weeks 5-8
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Python Developers
            </h1>
            
            <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
              Master professional Python programming! Design and develop programs using algorithms, 
              control structures, and object-oriented programming while building real-world applications.
            </p>

            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Laptop className="h-4 w-4 text-chart-3" />
                <span>Platform: VS Code / Replit</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Rocket className="h-4 w-4 text-chart-4" />
                <span>No Downloads Required</span>
              </div>
            </div>

            {/* Progress Tracker */}
            <Card className="max-w-md mx-auto">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Course Progress</span>
                  <span className="text-sm text-muted-foreground">{completedWeeks.length} of {weeks.length} weeks</span>
                </div>
                <Progress value={progress} className="h-3" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Skills Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">What Students Will Learn</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {skillsOverview.map((skill, index) => (
              <Card key={index} className="text-center p-4 hover:shadow-md transition-shadow">
                <skill.icon className="h-8 w-8 mx-auto mb-2 text-chart-3" />
                <h3 className="font-semibold text-sm mb-1">{skill.title}</h3>
                <p className="text-xs text-muted-foreground">{skill.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Weekly Curriculum */}
        <section>
          <h2 className="text-2xl font-bold text-center mb-4">Course Curriculum</h2>
          <p className="text-muted-foreground text-center mb-4">Part 1 (Weeks 1-4) is included. Unlock Part 2 (Weeks 5-8) to continue!</p>
          
          {/* Part 2 Unlock Card */}
          <Card className="mb-8 max-w-2xl mx-auto bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Lock className="h-5 w-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-amber-900 mb-1">Unlock Part 2 (Weeks 5-8)</h3>
                  <p className="text-sm text-amber-700 mb-3">
                    Master professional Python! In Part 2, students learn OOP, algorithms, Big O notation, 
                    and build a portfolio-ready capstone application!
                  </p>
                  <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                    Enroll in Part 2
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="week-1" className="max-w-4xl mx-auto">
            <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent justify-center mb-8">
              {weeks.map((week) => {
                const isLocked = week.week > 4 && !isPart2Unlocked
                return (
                  <TabsTrigger
                    key={week.week}
                    value={`week-${week.week}`}
                    disabled={isLocked}
                    className={`data-[state=active]:bg-chart-3 data-[state=active]:text-primary-foreground relative ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {completedWeeks.includes(week.week) && !isLocked && (
                      <CheckCircle2 className="h-3 w-3 absolute -top-1 -right-1 text-green-500" />
                    )}
                    <span className="flex items-center gap-1">
                      Week {week.week}
                      {isLocked && <Lock className="h-3 w-3" />}
                    </span>
                  </TabsTrigger>
                )
              })}
            </TabsList>

            {weeks.map((week) => (
              <TabsContent key={week.week} value={`week-${week.week}`}>
                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">Week {week.week}</Badge>
                          <Badge className="bg-chart-3/20 text-chart-3 border-chart-3/30">
                            {week.platform}
                          </Badge>
                        </div>
                        <CardTitle className="text-2xl mb-2">{week.title}</CardTitle>
                        <CardDescription className="text-base">
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
                      <h4 className="font-semibold flex items-center gap-2 mb-3">
                        <Target className="h-5 w-5 text-chart-3" />
                        Learning Objectives
                      </h4>
                      <ul className="grid md:grid-cols-2 gap-2">
                        {week.objectives.map((objective, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-chart-3 mt-0.5 shrink-0" />
                            {objective}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Activities */}
                    <div>
                      <h4 className="font-semibold flex items-center gap-2 mb-3">
                        <BookOpen className="h-5 w-5 text-chart-4" />
                        Session Activities (90 minutes)
                      </h4>
                      <div className="space-y-2">
                        {week.activities.map((activity, index) => (
                          <div 
                            key={index}
                            className="border rounded-lg p-3 hover:bg-muted/50 transition-colors cursor-pointer"
                            onClick={() => setExpandedActivity(
                              expandedActivity === `${week.week}-${index}` 
                                ? null 
                                : `${week.week}-${index}`
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Badge variant="secondary" className="text-xs">
                                  {activity.duration}
                                </Badge>
                                <span className="font-medium text-sm">{activity.name}</span>
                              </div>
                              {expandedActivity === `${week.week}-${index}` 
                                ? <ChevronUp className="h-4 w-4 text-muted-foreground" />
                                : <ChevronDown className="h-4 w-4 text-muted-foreground" />
                              }
                            </div>
                            {expandedActivity === `${week.week}-${index}` && (
                              <p className="text-sm text-muted-foreground mt-2 pl-16">
                                {activity.description}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Project */}
                    <div className="bg-gradient-to-r from-chart-3/10 to-chart-4/10 rounded-lg p-4">
                      <h4 className="font-semibold flex items-center gap-2 mb-2">
                        <Trophy className="h-5 w-5 text-chart-4" />
                        Week {week.week} Project: {week.project}
                      </h4>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {week.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <Button asChild size="sm" className="bg-chart-3 hover:bg-chart-3/90">
                        <a 
                          href="https://replit.com/languages/python3" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          Open Replit
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </Button>
                    </div>

                    {/* Teaching Tip */}
                    <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-chart-3">
                      <h4 className="font-semibold flex items-center gap-2 mb-1 text-sm">
                        <Lightbulb className="h-4 w-4 text-chart-4" />
                        Teaching Tip
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {week.teachingTip}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        {/* Course Info Footer */}
        <section className="mt-12 max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-chart-3/10 to-chart-4/10">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <Users className="h-8 w-8 mx-auto mb-2 text-chart-3" />
                  <h3 className="font-semibold">Grades 9-12</h3>
                  <p className="text-sm text-muted-foreground">High school students</p>
                </div>
                <div>
                  <Clock className="h-8 w-8 mx-auto mb-2 text-chart-4" />
                  <h3 className="font-semibold">90 Minutes</h3>
                  <p className="text-sm text-muted-foreground">Per weekly session</p>
                </div>
                <div>
                  <Laptop className="h-8 w-8 mx-auto mb-2 text-chart-3" />
                  <h3 className="font-semibold">VS Code / Replit</h3>
                  <p className="text-sm text-muted-foreground">Browser-based coding</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
