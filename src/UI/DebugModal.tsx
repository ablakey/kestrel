import { useEffect, useState } from "react";
import { Team } from "../enum";
import { ShipName, Ships } from "../Items/Ships";
import { Dropdown } from "./Components/Dropdown";
import { Modal } from "./Components/Modal";
import { Slider } from "./Components/Slider";
import { useGame } from "./uiHelpers";

export function DebugModal() {
  const game = useGame();
  const [selectedSpawn, setSelectedSpawn] = useState<ShipName>("Red");

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      console.log(e);
      e.stopImmediatePropagation();
      e.preventDefault();
    });
  }, []);

  const spawnShipOptions = Object.entries(Ships).map(([name, ship]) => ({
    label: ship.label,
    value: name as ShipName,
  }));

  function spawnShip() {
    game.shipFactory.create({
      shipName: selectedSpawn,
      team: Team.Independent,
      x: Math.random() * 1500 - 750,
      y: Math.random() * 1500 - 750,
      yaw: Math.random() * Math.PI,
    });
  }

  return (
    <Modal style={{ display: "flex" }}>
      <div style={{ flexGrow: 1 }}>
        <Slider
          label="Volume"
          value={game.state.volume}
          onChange={(v) => {
            game.state.volume = v;
          }}
        />
      </div>
      <div style={{ flexGrow: 1 }}>
        <div>
          <Dropdown label="Spawn" options={spawnShipOptions} onChange={setSelectedSpawn} />
          <button onClick={spawnShip}>Spawn</button>
        </div>
      </div>
    </Modal>
  );
}
