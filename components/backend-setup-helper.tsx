"use client"

import { AlertCircle, HelpCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function BackendSetupHelper() {
  const [showHelp, setShowHelp] = useState(true)

  if (!showHelp) return null

  return (
    <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20 mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
            <div>
              <CardTitle className="text-amber-900 dark:text-amber-100">Backend Not Running</CardTitle>
              <CardDescription className="text-amber-800 dark:text-amber-200">
                To add/edit products, choose one option:
              </CardDescription>
            </div>
          </div>
          <button
            onClick={() => setShowHelp(false)}
            className="text-amber-600 hover:text-amber-700 font-bold text-lg"
          >
            ✕
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2 text-sm text-amber-900 dark:text-amber-100">
          <p className="font-semibold flex items-center gap-2">
            <span className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">1</span>
            Quick Test (Mock Backend):
          </p>
          <div className="ml-8 bg-black/20 rounded p-2 font-mono text-xs dark:bg-white/10">
            Edit .env.local:<br />
            NEXT_PUBLIC_API_URL=/api/mock
          </div>
        </div>

        <div className="space-y-2 text-sm text-amber-900 dark:text-amber-100">
          <p className="font-semibold flex items-center gap-2">
            <span className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">2</span>
            Real Backend (Java Spring Boot):
          </p>
          <div className="ml-8 space-y-1">
            <p>• Ensure PostgreSQL is running</p>
            <p>• Start backend: <span className="font-mono bg-black/20 px-1 rounded">mvn spring-boot:run</span></p>
            <p>• Keep .env.local as: <span className="font-mono bg-black/20 px-1 rounded">http://localhost:8080/api</span></p>
          </div>
        </div>

        <a
          href="./BACKEND_SETUP.md"
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-600 hover:text-amber-700 dark:text-amber-200 dark:hover:text-amber-100 font-semibold flex items-center gap-1 mt-3 text-sm"
        >
          <HelpCircle className="h-4 w-4" />
          View Full Setup Guide
        </a>
      </CardContent>
    </Card>
  )
}
