import Victor from "victor";
import { ECS } from "./ecs";
import { Direction, Tag, Thrust } from "./enum";
import { inputSystem } from "./systems/inputSystem";
import { renderSystem } from "./systems/renderSystem";

const ecs = new ECS();

// Player ship.
ecs.createEntity(
  {
    Position: { type: "Position", x: 0, y: 0, yaw: 0, vec: new Victor(0, 0) },
    Engine: { type: "Engine", direction: Direction.None, thrust: Thrust.None },
  },
  [Tag.Player]
);

ecs.createEntity(
  {
    Position: { type: "Position", x: 200, y: 200, yaw: Math.PI + Math.PI, vec: new Victor(0, 0) },
    Engine: { type: "Engine", direction: Direction.None, thrust: Thrust.None },
  },
  [Tag.Enemy]
);

ecs.registerSystem(renderSystem());
ecs.registerSystem(inputSystem());

ecs.start();
