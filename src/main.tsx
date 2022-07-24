import Victor from "victor";
import { Engine } from "./Engine";
import { PlayerShip, Ship } from "./entities/Ship";
import { Layout } from "./UI/Layout";
import { createRoot } from "react-dom/client";
import React, { useContext } from "react";
import { Planet } from "./entities/Planet";

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
  globalThis.engine = engine;

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
      position: new Victor(150, -150),
      shipType: "Blue",
      team: "Player",
      yaw: new Victor(1, 0),
    })
  );

  engine.entities.addShip(
    new Ship({
      position: new Victor(-150, 150),
      shipType: "Red",
      team: "Rebellion",
      yaw: new Victor(0, 0),
    })
  );

  engine.entities.addPlanet(new Planet({ name: "levo", position: new Victor(0, 0) }));
}

main();
