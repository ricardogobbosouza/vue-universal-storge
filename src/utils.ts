export function isUnset(value: any): boolean {
  return typeof value === 'undefined' || value === null
}

export function isSet(value: any): boolean {
  return !isUnset(value)
}

export function getPrefix(prefix: string | undefined | null, key: string): string {
  return (prefix || '') + key
}

export function encodeValue(value: any): any {
  if (typeof value === 'object') {
    return JSON.stringify(value)
  }

  return value
}

export function decodeValue(value: any): any {
  if (typeof value === 'string') {
    try {
      return JSON.parse(value)
    } catch (_) { }
  }

  return value
}
