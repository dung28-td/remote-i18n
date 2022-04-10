import { useEffect, useLayoutEffect, useRef } from "react"
import type { EffectCallback } from 'react'

export const __DEV__ = process.env.NODE_ENV === 'development'

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)

const useEnhancedEffect = canUseDOM ? useLayoutEffect : useEffect

export const useEnhancedMountedEffect = (effect: EffectCallback) => {
  const mounted = useRef(false)

  useEnhancedEffect(() => {
    if (mounted.current) return
    mounted.current = true
    return effect()
  }, [])
}

const debouncedTimers = new Map()
export const debounce = (callback: () => void, ms: number) => {
  const timer = debouncedTimers.get(callback)
  if (timer) clearTimeout(timer)
  debouncedTimers.set(callback, setTimeout(callback, ms))
}
