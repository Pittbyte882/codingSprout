import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { RegisterForm } from "@/components/auth/register-form"

export const metadata: Metadata = {
  title: "Create Account | Coding Sprout",
  description: "Create your Coding Sprout account to enroll your child in coding classes.",
}

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left Side - Form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-md lg:w-[420px]">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center gap-2">
              <Image src="/images/logo.png" alt="Coding Sprout" width={48} height={48} />
              <span className="text-xl font-bold text-secondary">Coding Sprout</span>
            </Link>
            <h1 className="mt-6 text-2xl font-bold tracking-tight text-foreground">Create your account</h1>
            <p className="mt-2 text-sm text-muted-foreground">Join Coding Sprout and enroll your child today</p>
          </div>

          <RegisterForm />

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:text-sprout-green-dark">
              Sign in here
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-blue to-primary">
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="text-center text-primary-foreground">
              <h2 className="text-3xl font-bold">Start Your Child's Coding Journey</h2>
              <p className="mt-4 text-lg text-primary-foreground/80">
                From TK through 12th grade, we have the perfect program for your young coder.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <div className="rounded-lg bg-white/10 px-4 py-2 text-sm">Charter School Friendly</div>
                <div className="rounded-lg bg-white/10 px-4 py-2 text-sm">Online & In-Person</div>
                <div className="rounded-lg bg-white/10 px-4 py-2 text-sm">Small Class Sizes</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
