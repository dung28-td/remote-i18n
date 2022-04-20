import React, { useCallback } from "react"
import { useI18n } from "./i18n"
import { createTranslation } from './data-mutation'
import { __DEV__ } from "./utils"
import { useI18nScope } from "./scope"
import type { TProps } from "./types"

export const useT = () => {
  const scope = useI18nScope()
  const { locale, data } = useI18n()

  return useCallback((id: string) => {
    const key = [scope, id].filter(Boolean).join('.')
    return data[locale][key] ??
      (__DEV__ ? createTranslation(key) : '')
  }, [data, scope])
}

export function T({ id }: TProps) {
  const t = useT()
  return <>{t(id)}</>
}