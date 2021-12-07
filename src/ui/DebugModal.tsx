import { TestChild } from "./TestChild";

export function DebugModal() {
  return (
    <div className="modal">
      <TestChild foo={1} />
      <TestChild foo={1} />
      <TestChild foo={1} />
      <TestChild foo={1} />
    </div>
  );
}
