import cookieUniversal from 'cookie-universal'
import Storage from './storage';

export default class Cookie implements Storage {
  constructor(req, res, options = {}) {
    super(options)

    this.cookies = cookieUniversal(req, res, false)
  }

  set(key, value, options = {}) {
    if (!this.isEnabled) {
      return
    }

    const _key = super.getPrefix(this.options.prefix, key)
    const _value = super.encodeValue(value)
    const _options = Object.assign({}, this.options, options)

    if (typeof _options.expires === 'number') {
      _options.expires = new Date(new Date() * 1 + _options.expires * 864e+5)
    }

    if (super.isUnset(value)) {
      _options.expires = new Date(0)
    }

    this.cookies.set(_key, _value, _options)

    return value
  }

  get(key) {
    if (!this.isEnabled) {
      return
    }

    const _key = super.getPrefix(this.options.prefix, key)
    const _value = this.cookies.get(_key)

    return super.decodeValue(_value)
  }

  remove(key, options = {}) {
    if (!this.isEnabled) {
      return
    }

    const _value = this.get(key)

    if (super.isUnset(_value)) {
      return
    }

    this.set(key, undefined, options)
  }
}
