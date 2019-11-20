import { IStorage, StorageValue } from './storage';
export declare class MultiStorage implements IStorage {
    private storages;
    constructor(storages: IStorage[]);
    sync(key: string, defaultValue?: StorageValue): StorageValue;
    set(key: string, value: StorageValue): StorageValue;
    get(key: string): StorageValue;
    remove(key: string): void;
}
export default MultiStorage;
