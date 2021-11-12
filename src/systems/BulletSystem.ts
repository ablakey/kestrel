import { ECS, Entity, System } from "../ecs";

export const BulletSystem = (ecs: ECS): System => {
  // function onTick(delta: number) {
  //   ecs.query(["Body", "Stats"], [Tag.Enemy]).forEach((e) => {});
  // }

  function update(entity: Entity<"Damage" | "Body">) {
    /**
     * Detect collisions.
     */
    ecs.query(["Body", "Stats"]).forEach((e) => {
      const distance = entity.components.body.pos.distance(e.components.body.pos);
      if (distance < 50) {
        entity.destroyed = true;
        e.components.stats.damageEffects.push({ damage: entity.components.damage.damage });
      }
    });
  }

  return { update, componentKinds: ["Damage", "Body"] };
};
