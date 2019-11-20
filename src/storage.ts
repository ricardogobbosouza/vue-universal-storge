export type StorageValue = any

export type StorageOptions<S> = S & {
  prefix?: string
}

export interface IStorage {
  set(key: string, value: StorageValue): StorageValue
  get(key: string): StorageValue
  remove(key: string): void
}
