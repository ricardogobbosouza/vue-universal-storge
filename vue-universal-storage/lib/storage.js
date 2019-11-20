export default class Storage {
  constructor(options = {}) {
    this.options = options;
  }

  get isEnabled() {
    return this.options && this.options.enabled
  }

  static isUnset(value) {
    return typeof value === 'undefined' || value === null
  }

  static isSet(value) {
    return !this.isUnset(value)
  }

  static encodeValue(value) {
    if (typeof value === 'object') {
      return JSON.stringify(value)
    }

    return value
  }

  static decodeValue(value) {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value)
      } catch (_) { }
    }

    return value
  }

  static getPrefix(prefix, key) {
    return (prefix || '') + key
  }
}