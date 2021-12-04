import { Game } from "../../game";
import { ShipEntity } from "../../Utilities/ShipFactory";
import { Info } from "./Info";
import { Minimap } from "./Minimap";
import { Panel } from "./Panel";
import { Stats } from "./Stats";
import { Target } from "./Target";

export function Right(props: { game: Game }) {
  const player = props.game.getPlayer();

  const target = props.game.entities.get(player.components.Offensive.target) as ShipEntity;

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
      <Stats hp={player.components.Health.hp} />
      <Panel style={{ height: 200 }}>
        <Target target={target} />
      </Panel>
      <Info entityCount={props.game.entities.length} player={player} />
    </div>
  );
}
