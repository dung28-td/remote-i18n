import React, { useCallback } from "react"
import { useI18n } from "./i18n"
import { createTranslation } from './data-mutation'
import { __DEV__ } from "./utils"
import { useI18nScope } from "./scope"
import format from './format'
import type { TOptions, TProps } from "./types"

export const useT = () => {
  const scope = useI18nScope()
  const { locale, data, template: globalTemplate } = useI18n()

  return useCallback((id: string, options: TOptions = {}) => {
    const { absolute, values, template: localTemplate } = options
    const translations = data[locale]
    const key = [!absolute && scope, id].filter(Boolean).join('.')
    const message = translations[key]
    const template = Object.assign({}, globalTemplate, localTemplate)

    if (typeof message === 'string') return format(translations, key, values, template)
    if (__DEV__) return createTranslation(key)
    return ''
  }, [data, locale, globalTemplate, scope])
}

export function T({ id, ...options }: TProps) {
  const t = useT()
  return <>{t(id, options)}</>
}