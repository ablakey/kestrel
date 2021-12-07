export function TestChild(props: { foo: number }) {
  console.log("update");
  return <div>{props.foo}</div>;
}
