import cookieUniversal from 'cookie-universal'
import { CookieSerializeOptions } from 'cookie';
import { IStorage, StorageOptions, StorageValue } from './storage';
import { isUnset, getPrefix, encodeValue, decodeValue } from './utils'

type CookieOptions = CookieSerializeOptions

interface ICookie {
  get: (name: string) => StorageValue
  set: (name: string, value: StorageValue, opts?: CookieSerializeOptions) => void
}

export class CookieStorage implements IStorage {
  private cookies: ICookie
  private options: StorageOptions<CookieOptions>;

  constructor(req?: object, res?: object, options: StorageOptions<CookieOptions> = {}) {
    this.cookies = cookieUniversal(req, res, false)
    this.options = options;
  }

  set(key: string, value: StorageValue, options?: CookieOptions): StorageValue {
    const _key = getPrefix(this.options.prefix, key)
    const _value = encodeValue(value)
    const _options: CookieOptions = Object.assign({}, this.options, options)

    if (typeof _options.expires === 'number') {
      _options.expires = new Date(Number(new Date()) * 1 + _options.expires * 864e+5)
    }

    if (isUnset(value)) {
      _options.expires = new Date(0)
    }

    this.cookies.set(_key, _value, _options)

    return value
  }

  get(key: string): StorageValue {
    const _key = getPrefix(this.options.prefix, key)
    const _value = this.cookies.get(_key)

    return decodeValue(_value)
  }

  remove(key: string, options?: CookieOptions): void {
    const _value = this.get(key)

    if (isUnset(_value)) {
      return
    }

    this.set(key, undefined, options)
  }
}

export default CookieStorage
