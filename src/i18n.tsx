import React, { createContext, useContext } from 'react'
import useData from './use-data'
import DataMutation from './data-mutation'
import { __DEV__ } from './utils'
import type { I18nContext, I18nProviderProps } from './types'

/**
 * Create I18nContext
 */
const defaultI18nContext = {
  locale: '',
  data: {}
}

const I18nContext = createContext<I18nContext>(defaultI18nContext)

/**
 * useI18n hooks
 */
export const useI18n = () => useContext(I18nContext)

/**
 * I18nProvider component
 */
export const I18nProvider: React.FC<I18nProviderProps> = ({ apiKey, locale, data: initialData, children }) => {
  const { loading, data, error } = useData(initialData, apiKey)

  if (!data) {
    if (loading) return <div>Loading...</div>
    if (error) throw error
    return null
  }

  if (__DEV__) return (
    <DataMutation apiKey={apiKey} data={data}>
      {data => (
        <I18nContext.Provider value={{ locale, data }}>
          {children}
        </I18nContext.Provider>
      )}
    </DataMutation>
  )

  return (
    <I18nContext.Provider value={{ locale, data }}>
      {children}
    </I18nContext.Provider>
  )
}
