export interface I18nData {
  [locale: string]: {
    [id: string]: string
  }
}

export interface I18nContext {
  locale: string
  data: I18nData
}

export interface I18nProviderProps {
  apiKey: string
  locale: string
  data?: I18nData
}

export interface TProps {
  id: string
}