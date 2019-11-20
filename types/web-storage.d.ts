import { IStorage, StorageOptions, StorageValue } from './storage';
declare type WebStorageOptions = {
    ignoreExceptions?: boolean;
};
declare type LocalStorageOptions = WebStorageOptions;
declare type SessionStorageOptions = WebStorageOptions;
declare abstract class WebStorage implements IStorage {
    private driver;
    private options;
    constructor(driver: Storage, options?: StorageOptions<WebStorageOptions>);
    set(key: string, value: StorageValue): StorageValue;
    get(key: string): StorageValue;
    remove(key: string): void;
}
export declare class LocalStorage extends WebStorage {
    constructor(options?: StorageOptions<LocalStorageOptions>);
}
export declare class SessionStorage extends WebStorage {
    constructor(options?: StorageOptions<SessionStorageOptions>);
}
export {};
