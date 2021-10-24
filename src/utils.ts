import produce from "immer";
import { WritableDraft } from "immer/dist/internal";

export function createStore<T extends { [key: string]: any }>(initialState: T) {
  let state = initialState;

  function update(fn: (draft: WritableDraft<typeof state>) => void) {
    state = produce(state, fn);
    const event = new CustomEvent("store.update", { detail: state });
    window.dispatchEvent(event);
  }

  function subscribe(callback: any) {
    window.addEventListener("store.update", (e: Event) => {
      const state = (e as CustomEvent).detail;
      callback(state);
    });
  }

  return {
    update,
    subscribe,
    state,
  };
}

export type Store = ReturnType<typeof createStore>;
