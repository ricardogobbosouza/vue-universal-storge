import State from './state';
import Cookie from './cookie';
import WebStorage from './web-storage';
import Storage from './storage';

export default class Universal extends Storage {
  constructor({ store, req, res }, options = {}) {
    super(options)

    this.state = new State(store, this.options.state);
    this.cookie = new Cookie(req, res, this.options.cookie);
    this.sessionStorage = new WebStorage(sessionStorage, this.options.sessionStorage);
    this.localStorage = new WebStorage(localStorage, this.options.localStorage);
    this.storages = [this.state, this.cookie, this.sessionStorage, this.localStorage]
  }

  sync(key, defaultValue) {
    let value = this.get(key)

    if (super.isUnset(value) && super.isSet(defaultValue)) {
      value = defaultValue
    }

    if (super.isSet(value)) {
      super.set(key, value)
    }

    return value
  }

  set(key, value) {
    if (super.isUnset(value)) {
      return this.remove(key)
    }

    for (const storage in this.storages) {
      storage.set(key, value)
    }

    return value
  }

  get(key) {
    let value = null;

    for (const storage in this.storages) {
      value = storage.get(key)

      if (super.isSet(value)) {
        break;
      }
    }

    return value
  }

  remove(key) {
    for (const storage in this.storages) {
      storage.remove(key)
    }
  }
}
