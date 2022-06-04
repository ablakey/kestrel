import { EXPLOSION_SPREAD } from "../config";
import { Doodad } from "../entities/Doodad";
import { Ship } from "../entities/Ship";
import { getRandomPosition } from "../utils";
import { System } from "./System";

export class EffectsSystem extends System {
  update(ship: Ship, delta: number) {
    /**
     * Apply damage.
     */
    while (ship.effects.length) {
      const effect = ship.effects.pop()!;
      ship.hp -= effect.damage;
    }

    /**
     * Is destroying?
     */
    if (ship.hp <= 0 && ship.condition === "Alive") {
      console.info(`Ship ${ship.id} is breaking up.`);
      ship.condition = "Destroying";
      ship.timeToLive = 3000;
    }

    /**
     * Spawn explosions and sounds occasionally.
     */
    if (ship.condition === "Destroying" && Math.random() < 0.05) {
      const exposionPosition = getRandomPosition(ship.position, EXPLOSION_SPREAD);
      this.engine.entities.addDoodad(
        new Doodad({ name: "SmallExplosion", position: exposionPosition })
      );

      this.engine.soundFactory.playSound("ShipBreaksUp", { position: ship.position });
    }

    if (ship.timeToLive !== null && ship.timeToLive <= 0) {
      this.engine.entities.addDoodad(
        new Doodad({ name: "LargeExplosion", position: ship.position })
      );
      this.engine.soundFactory.playSound("ShipExplodes", { position: ship.position });
      ship.destroyed = true;
    }
  }
}
