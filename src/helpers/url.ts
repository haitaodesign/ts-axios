import { isDate, isObject } from './util'

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildURL(url: string, params?: any) {
  if (!params) {
    return url
  }

  const parts: string[] = []

  Object.keys(params).forEach(key => {
    let val = params[key]
    if (val === null || typeof val === 'undefined') {
      return
    }

    let values: string[]
    if (Array.isArray(val)) {
      values = val
      key += '[]' // 这里有点疑问，没看懂
    } else {
      values = [val]
    }

    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })

    let serializedParams = parts.join('&')

    if (serializedParams) {
      const markeIndex = url.indexOf('#')
      if (markeIndex !== -1) {
        url = url.slice(0, markeIndex)
      }

      url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
    }

    return url
  })
}
