import React, { useCallback } from "react"
import { useI18n } from "./i18n"
import { createTranslation } from './data-mutation'
import { __DEV__ } from "./utils"
import type { TProps } from "./types"

export const useT = () => {
  const { locale, data } = useI18n()
  return useCallback((id: string) => {
    return data[locale][id] ??
      (__DEV__ ? createTranslation(id) : '')
  }
  , [data])
}

export function T({ id }: TProps) {
  const t = useT()
  return <>{t(id)}</>
}