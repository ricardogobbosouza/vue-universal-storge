import { CookieSerializeOptions } from 'cookie';
import { IStorage, StorageOptions, StorageValue } from './storage';
declare type CookieOptions = CookieSerializeOptions;
export declare class CookieStorage implements IStorage {
    private cookies;
    private options;
    constructor(req?: object, res?: object, options?: StorageOptions<CookieOptions>);
    set(key: string, value: StorageValue, options?: CookieOptions): StorageValue;
    get(key: string): StorageValue;
    remove(key: string, options?: CookieOptions): void;
}
export default CookieStorage;
