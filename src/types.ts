export interface I18nData {
  [locale: string]: {
    [id: string]: string
  }
}

export interface I18nContext {
  locale: string
  setLocale: (locale: string) => void
  data: I18nData
}

export interface I18nProviderProps {
  apiKey: string
  initialLocale: string
  data?: I18nData
}

export interface TProps {
  id: string
}

export interface I18nScopeProps {
  scope: string
}