import { Weapons } from "../components";
import { Entity, System } from "../ecs";

export const WeaponSystem = (): System<Weapons> => {
  function update(entity: Entity<Weapons>) {
    if (entity.components.weapons.fireLaser) {
      console.log("Fire");
    }
  }
  return { update, componentKinds: ["Weapons"] };
};
