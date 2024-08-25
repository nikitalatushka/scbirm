import { Store } from '../types/store';

export interface Product {
    ID: number;
    name: string;
    time: number;
    value: number;
    level: number;
    store: Store;
}