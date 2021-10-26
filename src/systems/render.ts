import { Position } from "../components";
import { Entity, System } from "../ecs";

export const renderSystem: System = {
  componentTypes: ["Position"],
  init: () => {
    console.log("foo");
  },
  update: function (entities: Entity<Position>[]) {
    // console.log(entities.map((e) => Object.keys(e.components)).flat());
  },
};
