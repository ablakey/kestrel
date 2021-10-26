import { Component } from "./components";
import { makeEcs } from "./ecs";
import { renderSystem } from "./systems";

const ecs = makeEcs<Component>();

/**
 * One way to create entities manually.
 * They end up in ecs.entities.
 */
ecs.createEntity({
  Position: {
    type: "Position",
    x: 1,
    y: 2,
  },
});

ecs.registerSystem(renderSystem);

ecs.start();
