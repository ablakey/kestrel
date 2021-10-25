import { Component } from "./components";
import { makeEcs } from "./ecs";

const ecs = makeEcs<Component>();

/**
 * One way to create entities manually.
 * They end up in ecs.entities.
 */
ecs.createEntity([
  {
    type: "Position",
    x: 0,
    y: 0,
  },
  {
    type: "Rect",
    width: 100,
    height: 200,
  },
]);

// TODO: implement query so that these walk all entities and return the ones that have the corresponding properties.
const entities = ecs.query(["Position"]);
const entities2 = ecs.query(["Position", "Rect"]);
