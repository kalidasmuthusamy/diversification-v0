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
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Call handler right away so state gets updated with initial window size
    handleResize()

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, []) // Empty array ensures that effect is only run on mount and unmount

  // Specific device type detection
  const isMobile = windowSize.width < breakpoints.md // 0-767px
  const isTablet = windowSize.width >= breakpoints.md && windowSize.width < breakpoints.lg // 768-1023px
  const isDesktop = windowSize.width >= breakpoints.lg // 1024px and above

  // Get current device type
  const deviceType: DeviceType = isMobile ? "mobile" : isTablet ? "tablet" : "desktop"

  // Original breakpoint checks
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

  const below = (breakpoint: Breakpoint) => windowSize.width < breakpoints[breakpoint]
  const above = (breakpoint: Breakpoint) => windowSize.width >= breakpoints[breakpoint]
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
