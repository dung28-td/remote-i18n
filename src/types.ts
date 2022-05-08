export interface I18nData {
  [locale: string]: {
    [id: string]: string
  }
}

export interface I18nContext {
  locale: string
  setLocale: (locale: string) => void
  data: I18nData
  template?: Obj<RenderHTML>
}

export interface I18nProviderProps {
  apiKey: string
  initialLocale?: string
  data?: I18nData
  template?: Obj<RenderHTML>
}

export interface TOptions {
  absolute?: boolean
  values?: Obj<string>
  template?: Obj<RenderHTML>
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

export interface Obj<T> {
  [key: string]: T
}

export interface RenderHTMLProps {
  attributes: Obj<string> | undefined
  children: string | JSX.Element | undefined
}

export type RenderHTML = (props: RenderHTMLProps) => JSX.Element