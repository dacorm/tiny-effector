import {Event} from "./event";
import {Dispatch} from "react";

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
};

export const createStore = <T>(initState: initialState<T>): StoreType<T> => {
    let state = initState;
    let events = new Map();
    let watchers: CallbackType[];

    let store = {
        getState: () => state,
        on(event: Event<T>, cb: StateMutationCallback<T> | StateMutationCallbackWithSecondArg<T>) {

            if (!events.has(event)) {
                events.set(event, cb);
                event?.stores?.push(this);
            }
            return this;
        },
        dispatch(event: Event<T>, payload: (state: initialState<T>) => initialState<T> | SecondDispatchCallback<T>): void {

            const cb = events.get(event);
            if (cb && typeof cb === "function") {
                let newState = cb(state, payload);

                if (newState !== state) {
                    state = newState;
                }
            }

            watchers.forEach((watch: any) => watch(state, payload));
        },
        watch(cb: any): () => void {
            watchers.push(cb);
            return () => {
                watchers = watchers.filter((i) => i !== cb);
            };
        }
    };

    return store;
};