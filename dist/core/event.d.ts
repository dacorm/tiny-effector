import { StateMutationCallback, StateMutationCallbackWithSecondArg, StoreType } from "./effector";
type BaseEvent<T> = (payload: StateMutationCallback<T> | StateMutationCallbackWithSecondArg<T>) => void;
export interface Event<T> extends BaseEvent<T> {
    stores?: StoreType<T>[];
}
export declare const createEvent: <T>() => Event<T>;
export {};
