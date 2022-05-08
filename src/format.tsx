import React, { Fragment } from 'react'
import { Obj, RenderHTML } from "./types"

const LOOKUP_ID_REGEX = /{&(?<id>.*?)}/
const VALUE_REGEX = (value: string) => new RegExp(`{${value}}`, 'g')
const HTML_REGEX = /<(?<tag>\w+)\s*(?<attributes>.*?)\s*>(?<children>.*?)<\/\1>/
const HTML_WITHOUT_CHILDREN_REGEX = /<(?<tag>\w+)\s*(?<attributes>.*?)\s*\/>/
const HTML_ATTRIBUTE_REGEX = /(?<key>.+?)=(["'])(?<value>.*?)\2/

const tryParseAttributes = (_attributes: string, result: Obj<string> | undefined = undefined): Obj<string> | undefined => {
  const attributes = _attributes.trim()
  if (!attributes) return result

  const match = attributes.match(HTML_ATTRIBUTE_REGEX)
  if (!match) return result

  result ||= {}

  const { key, value } = match.groups!
  result[key] = value

  const otherAttributes = attributes.replace(match[0], '')
  return tryParseAttributes(otherAttributes, result)
}

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

const tryReplaceTemplate = (message: string, template?: Obj<RenderHTML>): string | JSX.Element => {
  if (!template) return message

  const match = message.match(HTML_REGEX) || message.match(HTML_WITHOUT_CHILDREN_REGEX)
  if (!match) return message

  const { tag, attributes: _attributes, children: _children } = match.groups!
  const renderTemplate = template[tag]
  if (!renderTemplate) return message

  const [prefix, _suffix] = message.split(match[0])

  const attributes = tryParseAttributes(_attributes)
  const children = _children ? tryReplaceTemplate(_children, template) : undefined
  const suffix = tryReplaceTemplate(_suffix, template)

  return (
   <Fragment>
     {prefix}
     {renderTemplate({ attributes, children })}
     {suffix}
   </Fragment>
  )
}

const format = (translations: Obj<string>, key: string, values?: Obj<string>, template?: Obj<RenderHTML>) => {
  const translation = translations[key]
  let result: string | JSX.Element = translation

  result = tryReplaceValue(result, values)
  result = tryReplaceLookup(result, translations)
  result = tryReplaceTemplate(result, template)

  return result
}

export default format