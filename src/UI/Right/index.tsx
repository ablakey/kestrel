import { ShipEntity } from "../../Utilities/ShipFactory";
import { useGame } from "../../utils";
import { Info } from "./Info";
import { Minimap } from "./Minimap";
import { Panel } from "./Panel";
import { Stats } from "./Stats";
import { Target } from "./Target";

export function Right() {
  const game = useGame();

  const player = game.getPlayer();

  const target = game.entities.get(player.components.offensive.target) as ShipEntity;

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
      <Stats hp={player.components.health.hp} />
      <Panel style={{ height: 200 }}>
        <Target target={target} />
      </Panel>
      <Info entityCount={game.entities.length} player={player} />
    </div>
  );
}
