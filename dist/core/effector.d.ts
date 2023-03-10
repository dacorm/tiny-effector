import { Event } from "./event";
import { Dispatch } from "react";
export type initialState<T> = T;
export type StateMutationCallback<T> = (state: T) => T;
export type StateMutationCallbackWithSecondArg<T> = (state: T, arg: any) => T & any;
export type SecondDispatchCallback<T> = (state: initialState<T>, arg: any) => initialState<T> & any;
export type CallbackType = () => unknown | Dispatch<unknown>;
export interface StoreType<T> {
    getState: () => initialState<T>;
    on: (event: Event<T>, cb: StateMutationCallback<T> | StateMutationCallbackWithSecondArg<T>) => StoreType<T>;
    dispatch: (event: Event<T>, payload: (state: initialState<T>, arg?: T extends Array<T> ? T[0] : T) => initialState<T>) => void;
    watch: (cb: any) => () => void;
}
export declare const createStore: <T>(initState: T) => StoreType<T>;
