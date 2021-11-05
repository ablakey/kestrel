import Victor from "victor";
import { BaseFactory } from "./BaseFactory";

// TODO: Need a library of bullets and populate most of the paramers based on picking one of them.

export class BulletFactory extends BaseFactory {
  create(pos: Victor, yaw: number) {
    return this.ecs.addEntity({
      body: {
        kind: "Body",
        pos: pos ?? new Victor(0, 0),
        yaw: yaw,
        vel: new Victor(1, 0).multiplyScalar(2000).rotate(yaw),
      },
      bullet: {
        kind: "Bullet",
        lifespan: 500,
      },
    });
  }
}
