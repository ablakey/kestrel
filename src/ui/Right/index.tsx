import { assert } from "../../utils";
import { Info } from "./Info";
import { Minimap } from "./Minimap";
import { Stats } from "./Stats";
import { Target } from "./Target";

export function Right() {
  const { Health } = window.ecs.query(["Player"])[0].components;
  assert(Health);

  const hp = Health.hp;
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
      <Stats hp={hp} />
      <Target />
      <Info />
    </div>
  );
}
