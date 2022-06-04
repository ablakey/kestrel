import { IMoveable } from "../interfaces";
import { System } from "./System";

export class PhysicsSystem extends System {
  update() {
    this.engine.entities.ships.forEach(this.updateOne);
    this.engine.entities.bullets.forEach(this.updateOne);
    this.engine.entities.doodads.forEach(this.updateOne);
  }

  private updateOne(entity: IMoveable) {
    const deltaSeconds = this.engine.delta / 1000;
    entity.position.add(entity.velocity.clone().multiplyScalar(deltaSeconds));
    entity.yaw.rotate(entity.angularVelocity * deltaSeconds);
  }
}
