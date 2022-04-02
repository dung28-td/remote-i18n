import React, { createContext, useCallback, useContext } from 'react'

/**
 * I18nContext
 */
interface I18nContext {
  locale: string
  translations: {
    [id: string]: string
  }
}

const I18nContext = createContext<I18nContext>({
  locale: '',
  translations: {}
})

/**
 * I18nProvider
 */
interface I18nProviderProps {
  data: {
    [locale: string]: {
      [id: string]: string
    }
  }
  locale: string
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children, data, locale }) => {
  const translations = data[locale]

  return (
    <I18nContext.Provider value={{ locale, translations }}>
      {children}
    </I18nContext.Provider>
  )
}

/**
 * useI18n
 */
export const useI18n = () => useContext(I18nContext)

/**
 * useT
 */
export const useT = () => {
  const { translations } = useI18n()

  return useCallback((id: string) => translations[id], [translations])
}


/**
 * T component
 */
interface TProps {
  id: string
}

export const T = ({ id }: TProps) => {
  const t = useT()

  return <>{t(id)}</>
}