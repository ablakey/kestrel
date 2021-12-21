import { useState } from "react";
import Victor from "victor";
import { Team } from "../enum";
import { ShipName, Ships } from "../Items/Ships";
import { pickRandom, useGame, useKeypress } from "../utils";
import { Dropdown } from "./Components/Dropdown";
import { Modal } from "./Components/Modal";
import { Slider } from "./Components/Slider";

const spawnShipOptions = Object.entries(Ships).map(([name, ship]) => ({
  label: ship.label,
  value: name as ShipName,
}));

export function DebugModal() {
  const game = useGame();
  const [selectedSpawn, setSelectedSpawn] = useState<ShipName>(spawnShipOptions[1].value);

  useKeypress(["Escape"], () => {
    game.setState((draft) => {
      draft.isPaused = false;
      draft.showDebug = false;
    });
  });

  function spawnShip() {
    game.shipFactory.create({
      shipName: selectedSpawn,
      team: pickRandom([Team.Rebel, Team.Confederacy]),
      position: new Victor(Math.random() * 1500 - 750, Math.random() * 1500 - 750),
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
            game.setState((draft) => (draft.volume = v));
          }}
        />
      </div>
      <div style={{ flexGrow: 1 }}>
        <div>
          <Dropdown
            label="Spawn"
            value={selectedSpawn}
            options={spawnShipOptions}
            onChange={setSelectedSpawn}
          />
          <button onClick={spawnShip}>Spawn</button>
        </div>
      </div>
    </Modal>
  );
}
