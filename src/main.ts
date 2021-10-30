import { ECS } from "./ecs";
import { Tag } from "./enum";
import { ShipFactory } from "./factories/ShipFactory";
import { InputSystem } from "./systems/InputSystem";
import { MovementSystem } from "./systems/movementSystem";
import { RenderSystem } from "./systems/RenderSystem";

const ecs = new ECS([InputSystem, MovementSystem, RenderSystem], {
  ShipFactory,
});

ecs.factories.ShipFactory.create({
  tags: [Tag.Player],
});

ecs.factories.ShipFactory.create({
  x: 300,
  y: 100,
  tags: [Tag.Enemy],
});

ecs.start();
