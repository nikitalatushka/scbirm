import { Store } from './store'

export interface Material {
    ID: number;
    name: string;
    time: number;
    value: number;
    level: number;
    store: Store;
}