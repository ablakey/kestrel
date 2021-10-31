import { Info } from "./Info";
import { Minimap } from "./Minimap";
import { Stats } from "./Stats";
import { Target } from "./Target";

export function Right() {
  return (
    <div
      style={{
        position: "fixed",
        right: 0,
        width: 250,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderLeft: "1px solid white",
      }}
    >
      <Minimap />
      <Stats />
      <Target />
      <Info />
    </div>
  );
}
