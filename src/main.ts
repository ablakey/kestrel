import { ECS } from "./ecs";
import { Direction, Tag, Thrust } from "./enum";
import { inputSystem } from "./systems/inputSystem";
import { renderSystem } from "./systems/renderSystem";

const ecs = new ECS();

// Player ship.
ecs.createEntity(
  {
    Position: { type: "Position", x: 0, y: 0, yaw: 0 },
    Engine: { type: "Engine", direction: Direction.None, thrust: Thrust.None },
  },
  [Tag.Player]
);

ecs.registerSystem(renderSystem());
ecs.registerSystem(inputSystem());

ecs.start();
