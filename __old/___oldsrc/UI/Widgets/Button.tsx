export function Button(props: { label: string; onClick: VoidFunction }) {
  return <button onClick={props.onClick}>{props.label}</button>;
}
