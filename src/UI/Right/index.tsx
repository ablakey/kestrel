import { Minimap } from "./Minimap";
import { Nav } from "./Nav";
import { Weapon } from "./Weapon";

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
        borderRight: "1px solid white",
      }}
    >
      <Minimap />
      <Nav />
      <Weapon />
    </div>
  );
}
