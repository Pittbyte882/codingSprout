"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { adminLogin } from "@/app/actions/admin-auth"
import { Sprout, Loader2, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

export default function AdminLoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const result = await adminLogin(formData)

    if (result.success) {
      router.push("/admin")
      router.refresh()
    } else {
      setError(result.error || "Login failed")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-navy via-deep-navy to-slate-800 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-sprout-green/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-sky-blue/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-12 h-12 bg-sprout-green rounded-xl flex items-center justify-center">
                <Sprout className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold text-deep-navy font-heading">
                Coding Sprout
              </span>
            </Link>
            <h1 className="text-2xl font-bold text-deep-navy font-heading">
              Admin Portal
            </h1>
            <p className="text-dark-gray mt-2">
              Sign in to access the admin dashboard
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-deep-navy mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-sprout-green focus:border-transparent transition-all duration-200 text-deep-navy placeholder:text-dark-gray/50"
                placeholder="admin@codingsprout.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-deep-navy mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-sprout-green focus:border-transparent transition-all duration-200 text-deep-navy placeholder:text-dark-gray/50 pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-gray hover:text-deep-navy transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-sprout-green hover:bg-sprout-green-dark text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-sprout-green/25 hover:shadow-xl hover:shadow-sprout-green/30"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-light-gray">
            <p className="text-center text-sm text-dark-gray">
              This is a restricted area for authorized personnel only.
            </p>
          </div>
        </div>

        {/* Back to main site link */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-white/70 hover:text-white text-sm transition-colors"
          >
            ← Back to Coding Sprout
          </Link>
        </div>
      </div>
    </div>
  )
}
