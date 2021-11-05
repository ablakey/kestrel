import { times } from "lodash";
import ReactDOM from "react-dom";
import Victor from "victor";
import { ECS } from "./ecs";
import { Tag } from "./enum";
import { UiRoot } from "./ui/UiRoot";

const ecs = new ECS();

ecs.factories.ShipFactory.create({
  tags: [Tag.Player],
});

times(3, () => {
  ecs.factories.ShipFactory.create({
    pos: new Victor(Math.random() * 1000 - 500, Math.random() * 1000 - 500),
    tags: [Tag.Enemy],
  });
});

ecs.start();

/**
 * UI.
 */
function render() {
  ReactDOM.render(<UiRoot ecs={ecs} />, document.getElementById("ui"));
}

render();
setInterval(render, 100);

/**
 * For debugging.
 */
declare global {
  interface Window {
    ecs: any;
  }
}

window.ecs = ecs;
