import { useEffect, useLayoutEffect, useRef } from "react"
import errors from "./errors"
import type { EffectCallback } from 'react'
import type { I18nData } from "./types"

export const __DEV__ = process.env.NODE_ENV === 'development'

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)

export const useEnhancedEffect = canUseDOM ? useLayoutEffect : useEffect

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

export const useSSE = (url: string, listener: (ev: MessageEvent) => void) => {
  useEnhancedEffect(() => {
    const es = new EventSource(url)
    es.addEventListener('message', listener)

    return () => {
      es.removeEventListener('message', listener)
      es.close()
    }
  }, [])
}

export const throwError = (msg: string) => {
  throw new Error(`[remote-i18n] ${msg}`)
}

export const checkDataValidity = (data: I18nData) => {
  const locales = Object.keys(data)

  if (locales.length === 0) {
    throwError(errors.EMPTY_LOCALES)
  }
}