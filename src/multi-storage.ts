import { IStorage, StorageValue } from './storage';
import { isSet, isUnset } from './utils'

export class MultiStorage implements IStorage {
  private storages: IStorage[]

  constructor(storages: IStorage[]) {
    this.storages = storages
  }

  sync(key: string, defaultValue?: StorageValue): StorageValue {
    let value = this.get(key)

    if (isUnset(value) && isSet(defaultValue)) {
      value = defaultValue
    }

    if (isSet(value)) {
      this.set(key, value)
    }

    return value
  }

  set(key: string, value: StorageValue): StorageValue {
    if (isUnset(value)) {
      return this.remove(key)
    }

    this.storages.forEach(storage => {
      storage.set(key, value)
    })

    return value
  }

  get(key: string): StorageValue {
    let value = null;

    for (let s = 0; s < this.storages.length; s++) {
      value = this.storages[s].get(key)

      if (isSet(value)) {
        break;
      }
    }

    return value
  }

  remove(key: string): void {
    this.storages.forEach(storage => {
      storage.remove(key)
    })
  }
}

export default MultiStorage
