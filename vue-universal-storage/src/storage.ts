export interface Storage {
  set(key: any, value: any): any
  get(key: any): any
  remove(key: any): void
}
