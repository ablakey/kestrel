import Victor from "victor";
import { Engine } from "./Engine";
import { PlayerShip, Ship } from "./entities/Ship";
import { Layout } from "./UI/Layout";
import { createRoot } from "react-dom/client";
import React, { useContext } from "react";

declare global {
  interface Window {
    engine: any;
  }
}

export const EngineContext = React.createContext(undefined as unknown as Engine); // TODO: a better default.

export function useEngine() {
  return useContext(EngineContext);
}

async function main() {
  const engine = new Engine();
  await engine.initialize();
  engine.start();
  window.engine = engine;

  const root = createRoot(document.getElementById("ui")!);

  function render() {
    root.render(
      <EngineContext.Provider value={engine}>
        <Layout />
      </EngineContext.Provider>
    );
    requestAnimationFrame(render);
  }
  render();

  engine.entities.setPlayerShip(
    new PlayerShip({
      position: new Victor(0, 0),
      shipType: "Blue",
      team: "Player",
      yaw: new Victor(1, 0),
    })
  );

  engine.entities.addShip(
    new Ship({
      position: new Victor(-100, 100),
      shipType: "Red",
      team: "Rebellion",
      yaw: new Victor(0, 0),
    })
  );
}

main();
