import { times } from "lodash";
import { ECS } from "./ecs";
import { renderSystem } from "./systems";

const ecs = new ECS();

/**
 * One way to create entities manually.
 * They end up in ecs.entities.
 */
times(10000, () => {
  ecs.createEntity({
    Position: {
      type: "Position",
      x: 1,
      y: 2,
    },
  });
});

ecs.createEntity({
  Foo: { type: "Foo" },
});

ecs.registerSystem(renderSystem);

ecs.start();
