import { Position } from "../components";
import { Entity, System } from "../ecs";
import * as PIXI from "pixi.js";
import ship from "../assets/pixel_ship_blue.png";

// TODO: Stages should be classes.

// inside init.
const left = document.querySelector<HTMLElement>("#left")!;
const app = new PIXI.Application({ backgroundColor: 0x000, resizeTo: left });
left.appendChild(app.view);

app.stage.x = app.renderer.width / 2;
app.stage.y = app.renderer.height / 2;
// Zoom in.
// app.stage.scale.x = 2;
// app.stage.scale.y = 2;

const renderedItems: Record<string, PIXI.Sprite> = {};

export const renderSystem: System = {
  componentTypes: ["Position"],
  init: () => {
    console.log("foo");
  },
  update: function (entities: Entity<Position>[]) {
    entities.forEach((e) => {
      // Create?
      if (renderedItems[e.id] === undefined) {
        renderedItems[e.id] = PIXI.Sprite.from(ship);
        app.stage.addChild(renderedItems[e.id]);
        renderedItems[e.id].anchor.set(0.5);
      }

      // Update?
      renderedItems[e.id].x = e.components.Position.x;
      renderedItems[e.id].y = e.components.Position.y;
      renderedItems[e.id].rotation = e.components.Position.yaw;

      e.components.Position.yaw += 0.1;
      // Delete?

      // TODO
    });
  },
};
