import { CSSProperties, ReactNode } from "react";

export function Panel(props: { children: ReactNode; style?: CSSProperties }) {
  return <div style={{ borderBottom: "1px solid white", ...props.style }}>{props.children}</div>;
}
