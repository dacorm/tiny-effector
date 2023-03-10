import { StoreType } from "./effector";
type BaseEvent<T> = (payload: any) => void;
export type ArrayCheck<T> = Array<T>;
export interface Event<T> extends BaseEvent<T> {
    stores?: StoreType<T>[];
}

export const createEvent = <T>(): Event<T> => {
    let event: Event<T> = (payload: any) => {
        event?.stores?.forEach((store: StoreType<T>) => {
            store.dispatch(event, payload);
        });
    };

    event.stores = [];

    return event;
};