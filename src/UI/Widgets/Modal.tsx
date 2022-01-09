import { CSSProperties, ReactNode } from "react";

export function Modal(props: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div style={props.style} className="modal">
      {props.children}
    </div>
  );
}
