import { ECS } from "./ecs";
import { Tag } from "./enum";
import { ShipFactory } from "./factories/ShipFactory";
import { InputSystem } from "./systems/InputSystem";
import { MovementSystem } from "./systems/movementSystem";
import { RenderSystem } from "./systems/RenderSystem";
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";

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

function UiElement() {
  const [ticks, setTicks] = useState(0);
  console.log(ticks);

  useEffect(() => {
    console.log("effect");
    setInterval(() => {
      console.log("ticks");
      setTicks(ticks + 1);
    }, 1000);
  }, []);

  return <div>{ecs.query([], [Tag.Player])[0].components.body?.vel.magnitude()}</div>;
}

ReactDOM.render(<UiElement />, document.getElementById("ui-overlay"));
