import { Obj } from "./types"

const LOOKUP_ID_REGEX = /{&(?<id>.*?)}/
const VALUE_REGEX = (value: string) => new RegExp(`{${value}}`, 'g')

const tryReplaceValue = (message: string, values?: Obj<string>) => {
  if (!values) return message

  let result = message
  for (const [key, value] of Object.entries(values)) {
    result = result.replace(VALUE_REGEX(key), value)
  }

  return result
}

const tryReplaceLookup = (message: string, translations: Obj<string>): string => {
  const match = message.match(LOOKUP_ID_REGEX)
  const id = match?.groups?.id

  if (typeof id === 'string' && translations[id]) {
    const result = message.replace(VALUE_REGEX(`&${id}`), translations[id])
    return tryReplaceLookup(result, translations)
  }

  return message
}

const format = (translations: Obj<string>, key: string, values?: Obj<string>) => {
  const translation = translations[key]
  let result = translation

  result = tryReplaceLookup(result, translations)
  result = tryReplaceValue(result, values)

  return result
}

export default format