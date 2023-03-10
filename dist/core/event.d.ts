import { StoreType } from "./effector";
type BaseEvent<T> = (payload: any) => void;
export type ArrayCheck<T> = Array<T>;
export interface Event<T> extends BaseEvent<T> {
    stores?: StoreType<T>[];
}
export declare const createEvent: <T>() => Event<T>;
export {};
