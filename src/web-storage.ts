import { IStorage, StorageOptions, StorageValue } from './storage';
import { isUnset, getPrefix, encodeValue, decodeValue } from './utils'

type WebStorageOptions = {
  ignoreExceptions?: boolean
}
type LocalStorageOptions = WebStorageOptions
type SessionStorageOptions = WebStorageOptions

abstract class WebStorage implements IStorage {
  private driver: Storage;
  private options: StorageOptions<WebStorageOptions>;

  constructor(driver: Storage, options: StorageOptions<WebStorageOptions> = {}) {
    this.driver = driver
    this.options = options
  }

  set(key: string, value: StorageValue): StorageValue {
    if (isUnset(value)) {
      return this.remove(key)
    }

    const _key = getPrefix(this.options.prefix, key)
    const _value = encodeValue(value)

    try {
      this.driver.setItem(_key, _value)
    } catch (e) {
      if (!this.options.ignoreExceptions) {
        throw e
      }
    }

    return value
  }

  get(key: string): StorageValue {
    const _key = getPrefix(this.options.prefix, key)
    const _value = this.driver.getItem(_key)

    return decodeValue(_value)
  }

  remove(key: string): void {
    const _key = getPrefix(this.options.prefix, key)

    this.driver.removeItem(_key)
  }
}

export class LocalStorage extends WebStorage {
  constructor(options: StorageOptions<LocalStorageOptions> = {}) {
    super(localStorage, options)
  }
}

export class SessionStorage extends WebStorage {
  constructor(options: StorageOptions<SessionStorageOptions> = {}) {
    super(sessionStorage, options)
  }
}
