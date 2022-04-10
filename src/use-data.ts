import { useCallback, useReducer } from "react"
import api from "./api"
import { useEnhancedMountedEffect, __DEV__ } from "./utils"
import type { I18nData } from './types'

interface DataState {
  loading: boolean
  data: I18nData | undefined | null
  error: Error | undefined | null
}

const reducer = (state: DataState, action: Partial<DataState>) => ({
  ...state,
  ...action
})

const init = (initialData: I18nData | undefined) => ({
  loading: false,
  data: initialData,
  error: undefined
})

export default function useData(initialData: I18nData | undefined, apiKey: string) {
  const [data, dispatch] = useReducer(reducer, initialData, init)

  const loadData = useCallback(async () => {
    dispatch({ loading: true, error: undefined })

    try {
      const data = await api.loadData(apiKey)
      dispatch({ data, loading: false, error: null })
    } catch (error) {
      dispatch({ loading: false, error: error as Error })
    }
  }, [apiKey, dispatch])

  useEnhancedMountedEffect(() => {
    // only load remote data in development or data is not passed in production
    if (__DEV__ || !data.data) {
      loadData()
    }
  })

  return { ...data, refetch: loadData }
}