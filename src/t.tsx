import React, { useCallback } from "react"
import { useI18n } from "./i18n"
import { createTranslation } from './data-mutation'
import { __DEV__ } from "./utils"
import { useI18nScope } from "./scope"
import format from './format'
import type { TOptions, TProps } from "./types"

export const useT = () => {
  const scope = useI18nScope()
  const { locale, data } = useI18n()

  return useCallback((id: string, options: TOptions = {}) => {
    const { absolute, values } = options
    const translations = data[locale]
    const key = [!absolute && scope, id].filter(Boolean).join('.')
    const message = translations[key]

    if (typeof message === 'string') return format(translations, key, values)
    if (__DEV__) return createTranslation(key)
    return ''
  }, [data, scope])
}

export function T({ id, ...options }: TProps) {
  const t = useT()
  return <>{t(id, options)}</>
}