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
  initialLocale?: string
  data?: I18nData
}

export interface TOptions {
  absolute?: boolean
}

export interface TProps extends TOptions {
  id: string
}

export interface I18nScopeOptions {
  absolute?: boolean
}

export interface I18nScopeProps extends I18nScopeOptions {
  scope: string
}