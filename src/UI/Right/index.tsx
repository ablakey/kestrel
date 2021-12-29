import { ShipEntity } from "../../Factories/ShipFactory";
import { useGame } from "../../utils";
import { Info } from "./Info";
import { Minimap } from "./Minimap";
import { Nav } from "./Nav";
import { Stats } from "./Stats";
import { Target } from "./Target";
import { Weapon } from "./Weapon";

export function Right() {
  const game = useGame();

  const player = game.entities.getPlayer();
  const { offensive, inventory, health } = player.components;

  const target = game.entities.get(offensive.target) as ShipEntity;

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
      <Stats hp={health.hp} />
      <Nav />
      <Weapon instance={inventory.weapons.find((w) => w.name === offensive.selectedSecondary)} />
      <Target target={target} />
      <Info entityCount={game.entities.length} player={player} />
    </div>
  );
}
