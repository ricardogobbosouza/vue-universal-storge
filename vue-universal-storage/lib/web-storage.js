import Storage from './storage';

export default class WebStorage extends Storage {
  constructor(driver, options = {}) {
    super(options)

    this.driver = driver
  }

  get isEnabled() {
    return super.isEnabled && super.isSet(this.driver)
  }

  set(key, value) {
    if (!this.isEnabled) {
      return
    }

    if (super.isUnset(value)) {
      return this.remove(key)
    }

    const _key = super.getPrefix(this.options.prefix, key)
    const _value = super.encodeValue(value)

    try {
      this.driver.setItem(_key, _value)
    } catch (e) {
      if (!this.options.ignoreExceptions) {
        throw e
      }
    }

    return value
  }

  get(key) {
    if (!this.isEnabled) {
      return
    }

    const _key = super.getPrefix(this.options.prefix, key)
    const _value = this.driver.getItem(_key)
    
    return super.decodeValue(_value)
  }

  remove(key) {
    if (!this.isEnabled) {
      return
    }
    
    const _key = super.getPrefix(this.options.prefix, key)

    this.driver.removeItem(_key)
  }
}