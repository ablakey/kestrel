import { ECS } from "./ecs";
import { renderSystem } from "./systems";

const ecs = new ECS();

ecs.createEntity({
  Position: { type: "Position", x: -200, y: -200, yaw: 0 },
});

ecs.createEntity({
  Position: { type: "Position", x: 100, y: 100, yaw: 0 },
});

ecs.registerSystem(renderSystem);

ecs.start();
