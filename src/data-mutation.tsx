import React, { useReducer } from "react"
import api from './api'
import { debounce } from "./utils"
import type { I18nData } from "./types"

interface DataMutationProps {
  apiKey: string
  data: I18nData
  children: (data: I18nData) => JSX.Element
}

type Action =
  | { type: 'RESET', data: I18nData }
  | { type: 'CREATE_TRANSLATION', id: string }

const reducer = (state: I18nData, action: Action) => {
  switch (action.type) {
    case 'RESET':
      return action.data
    case 'CREATE_TRANSLATION':
      const newState = { ...state }
      Object.keys(newState).forEach(locale => {
        newState[locale][action.id] = `[${locale}][${action.id}] Please update this translation admin tool.`
      })
      return newState
    default:
      return state
  }
}

let dispatch: React.Dispatch<Action>
let apiKey: string

export default function DataMutation({ apiKey: _apiKey, data: origData, children }: DataMutationProps) {
  const [data, _dispatch] = useReducer(reducer, origData)

  if (dispatch !== _dispatch) dispatch = _dispatch
  if (apiKey !== _apiKey) apiKey = _apiKey

  return children(data)
}

const createTranslationHdrPerId: { [id: string]: () => void } = {}
export const createTranslation = (id: string) => {
  if (!createTranslationHdrPerId[id]) {
    createTranslationHdrPerId[id] = async () => {
      await api.createIdentity(id, apiKey)
      dispatch({ type: 'CREATE_TRANSLATION', id })
    }
  }
  debounce(createTranslationHdrPerId[id], 100)

  return `[${id}] Translations not found!`
}
