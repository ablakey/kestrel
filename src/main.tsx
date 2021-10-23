import produce from "immer";
import { WritableDraft } from "immer/dist/internal";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { createGame } from "./phaser";

function createStore() {
  let state = {
    foo: Math.random(),
  };

  function update(fn: (draft: WritableDraft<typeof state>) => void) {
    state = produce(state, fn);
    // state = produce(state, (draft) => {
    //   draft.foo = value;
    // });
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

function UserInterface(props: { store: ReturnType<typeof createStore> }) {
  const [state, setState] = useState(props.store.state);

  useEffect(() => {
    props.store.subscribe((e: any) => {
      setState(e);
    });
  }, []);

  return <div>{state.foo}</div>;
}

function main() {
  const store = createStore();

  function update() {
    store.update((draft) => {
      draft.foo = Math.random();
    });
    requestAnimationFrame(update);
  }

  requestAnimationFrame(update);

  ReactDOM.render(<UserInterface store={store} />, document.querySelector("#right"));

  const game = createGame();
}

window.onload = main;
