import React, { useCallback } from "react"
import { useI18n } from "./i18n"
import { createTranslation } from './data-mutation'
import { __DEV__ } from "./utils"
import { useI18nScope } from "./scope"
import type { TOptions, TProps } from "./types"

export const useT = () => {
  const scope = useI18nScope()
  const { locale, data } = useI18n()

  return useCallback((id: string, options: TOptions = {}) => {
    const { absolute } = options
    const key = [!absolute && scope, id].filter(Boolean).join('.')

    return data[locale][key] ??
      (__DEV__ ? createTranslation(key) : '')
  }, [data, scope])
}

export function T({ id, absolute }: TProps) {
  const t = useT()
  return <>{t(id, { absolute })}</>
}