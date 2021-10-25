import { useEffect, useState } from "react";
import { createStore } from "../utils";

export function RightPanel(props: { store: ReturnType<typeof createStore> }) {
  const [state, setState] = useState(props.store.state);

  useEffect(() => {
    props.store.subscribe((e: any) => {
      setState(e);
    });
  }, []);

  return <div>{state.foo}</div>;
}
