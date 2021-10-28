import { ECS } from "./ecs";
import { renderSystem } from "./systems/render";

const ecs = new ECS();

ecs.createEntity({
  Position: { type: "Position", x: -200, y: -200, yaw: 0 },
});

// ecs.createEntity({
//   Position: { type: "Position", x: 100, y: 100, yaw: 0 },
// });

ecs.registerSystem(renderSystem());
// ecs.registerSystem(inputSystem);

ecs.start();
