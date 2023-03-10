import {StateMutationCallback, StateMutationCallbackWithSecondArg, StoreType} from "./effector";

type BaseEvent<T> = (payload: StateMutationCallback<T> | StateMutationCallbackWithSecondArg<T>) => void;
export interface Event<T> extends BaseEvent<T> {
    stores?: StoreType<T>[];
}

export const createEvent = <T>(): Event<T> => {
    let event: Event<T> = (payload: StateMutationCallback<T> | StateMutationCallbackWithSecondArg<T>) => {
        event?.stores?.forEach((store: StoreType<T>) => {
            store.dispatch(event, payload);
        });
    };

    event.stores = [];

    return event;
};