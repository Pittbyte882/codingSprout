import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "Sign In | Coding Sprout",
  description: "Sign in to your Coding Sprout account to manage enrollments and view class schedules.",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left Side - Form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center gap-2">
              <Image src="/images/logo.png" alt="Coding Sprout" width={48} height={48} />
              <span className="text-xl font-bold text-secondary">Coding Sprout</span>
            </Link>
            <h1 className="mt-6 text-2xl font-bold tracking-tight text-foreground">Welcome back!</h1>
            <p className="mt-2 text-sm text-muted-foreground">Sign in to your account to continue</p>
          </div>

          <LoginForm />

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="font-medium text-primary hover:text-sprout-green-dark">
              Create one here
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-sprout-green-dark">
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="text-center text-primary-foreground">
              <h2 className="text-3xl font-bold">Helping Kids Grow Into Confident Coders</h2>
              <p className="mt-4 text-lg text-primary-foreground/80">
                Access your dashboard to manage enrollments, view schedules, and track your child's progress.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
