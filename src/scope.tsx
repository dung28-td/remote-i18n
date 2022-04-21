import React, { createContext, useContext } from "react";
import type { I18nScopeOptions, I18nScopeProps } from "./types";

const I18nScopeContext = createContext<string | undefined>(undefined)

export const useI18nScope = () => useContext(I18nScopeContext)

export const I18nScope: React.FC<I18nScopeProps> = ({ scope, absolute, children }) => {
  const parent = useI18nScope()
  const value = [!absolute && parent, scope].filter(Boolean).join('.')

  return (
    <I18nScopeContext.Provider value={value}>
      {children}
    </I18nScopeContext.Provider>
  )
}

export function withI18nScope<T>(Component: React.ComponentType<T>, scope: string, options: I18nScopeOptions = {}) {
  return function ComponentWithScope(props: T) {
    const { absolute } = options

    return (
      <I18nScope scope={scope} absolute={absolute}>
        <Component {...props} />
      </I18nScope>
    )
  }
}