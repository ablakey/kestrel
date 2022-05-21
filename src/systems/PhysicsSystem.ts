import { IMoveable } from "../interfaces";

export class PhysicsSystem {
  update(delta: number, entity: IMoveable) {
    const deltaSeconds = delta / 1000;
    entity.position.add(entity.velocity.clone().multiplyScalar(deltaSeconds));
    entity.yaw.rotate(entity.angularVelocity * deltaSeconds);
  }
}
