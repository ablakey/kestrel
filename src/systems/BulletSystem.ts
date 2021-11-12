import { ECS, Entity, System } from "../ecs";

export const BulletSystem = (ecs: ECS): System => {
  // function onTick(delta: number) {
  //   ecs.query(["Body", "Health"], [Tag.Enemy]).forEach((e) => {});
  // }

  function update(entity: Entity<"Damage" | "Body">) {
    /**
     * Detect collisions.
     */
    ecs.query(["Body", "Health"]).forEach((e) => {
      const distance = entity.components.body.position.distance(e.components.body.position);
      if (distance < 50) {
        entity.destroyed = true;
        e.components.health.effects.push({ damage: entity.components.damage.damage });
      }
    });
  }

  return { update, componentKinds: ["Damage", "Body"] };
};
