"use client"
import { useEffect, useState } from "react"

export const designTokens = {
  primary: "--primary",
  primaryForeground: "--primary-foreground",
  background: "--background",
  foreground: "--foreground",
  card: "--card",
  cardForeground: "--card-foreground",
}

export function setToken(name: string, value: string) {
  if (typeof document === "undefined") return
  document.documentElement.style.setProperty(name, value)
}

export function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return false
    return document.documentElement.classList.contains("dark")
  })

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  return (
    <button onClick={() => setIsDark(!isDark)} className="px-3 py-1 rounded">
      {isDark ? "Light" : "Dark"}
    </button>
  )
}
