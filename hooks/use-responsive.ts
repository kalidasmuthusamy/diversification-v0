"use client"

import { useState, useEffect } from "react"

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
type DeviceType = "mobile" | "tablet" | "desktop"

const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
}

export function useResponsive() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const isMobile = windowSize.width < breakpoints.md
  const isTablet = windowSize.width >= breakpoints.md && windowSize.width < breakpoints.lg
  const isDesktop = windowSize.width >= breakpoints.lg

  const deviceType: DeviceType = isMobile ? "mobile" : isTablet ? "tablet" : "desktop"

  const isXs = windowSize.width < breakpoints.sm
  const isSm = windowSize.width >= breakpoints.sm && windowSize.width < breakpoints.md
  const isMd = windowSize.width >= breakpoints.md && windowSize.width < breakpoints.lg
  const isLg = windowSize.width >= breakpoints.lg && windowSize.width < breakpoints.xl
  const isXl = windowSize.width >= breakpoints.xl && windowSize.width < breakpoints["2xl"]
  const is2Xl = windowSize.width >= breakpoints["2xl"]

  const isSmDown = windowSize.width < breakpoints.md
  const isMdDown = windowSize.width < breakpoints.lg
  const isLgDown = windowSize.width < breakpoints.xl
  const isXlDown = windowSize.width < breakpoints["2xl"]

  const isSmUp = windowSize.width >= breakpoints.sm
  const isMdUp = windowSize.width >= breakpoints.md
  const isLgUp = windowSize.width >= breakpoints.lg
  const isXlUp = windowSize.width >= breakpoints.xl
  const is2XlUp = windowSize.width >= breakpoints["2xl"]

  const below = (bp: Breakpoint) => windowSize.width < breakpoints[bp]
  const above = (bp: Breakpoint) => windowSize.width >= breakpoints[bp]
  const between = (min: Breakpoint, max: Breakpoint) =>
    windowSize.width >= breakpoints[min] && windowSize.width < breakpoints[max]

  return {
    windowSize,
    breakpoints,
    deviceType,
    isMobile,
    isTablet,
    isDesktop,
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    is2Xl,
    isSmDown,
    isMdDown,
    isLgDown,
    isXlDown,
    isSmUp,
    isMdUp,
    isLgUp,
    isXlUp,
    is2XlUp,
    below,
    above,
    between,
  }
}
