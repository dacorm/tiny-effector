import { useState, useEffect } from 'react';

var createEvent = function () {
  var event = function (payload) {
    var _a;
    (_a = event === null || event === void 0 ? void 0 : event.stores) === null || _a === void 0 ? void 0 : _a.forEach(function (store) {
      store.dispatch(event, payload);
    });
  };
  event.stores = [];
  return event;
};

var createStore = function (initState) {
  var state = initState;
  var events = new Map();
  var watchers = [];
  var store = {
    getState: function () {
      return state;
    },
    on: function (event, cb) {
      var _a;
      if (!events.has(event)) {
        events.set(event, cb);
        (_a = event === null || event === void 0 ? void 0 : event.stores) === null || _a === void 0 ? void 0 : _a.push(this);
      }
      return this;
    },
    dispatch: function (event, payload) {
      var cb = events.get(event);
      if (cb && typeof cb === "function") {
        var newState = cb(state, payload);
        if (newState !== state) {
          state = newState;
        }
      }
      watchers.forEach(function (watch) {
        return watch(state, payload);
      });
    },
    watch: function (cb) {
      watchers.push(cb);
      return function () {
        watchers = watchers.filter(function (i) {
          return i !== cb;
        });
      };
    }
  };
  return store;
};

var useStore = function (store) {
    var _a = useState(store.getState()), state = _a[0], setState = _a[1];
    useEffect(function () {
        var unsubscribe = store.watch(setState);
        return function () {
            unsubscribe();
        };
    }, [store]);
    return state;
};

export { createEvent, createStore, useStore };
