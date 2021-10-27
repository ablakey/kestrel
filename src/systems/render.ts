import { Position } from "../components";
import { Entity, System } from "../ecs";
import * as PIXI from "pixi.js";
import ship from "../assets/pixel_ship_blue.png";

export class RenderSys extends System<Position> {
  renderedItems: Record<string, PIXI.Sprite> = {};
  componentTypes: ["Position"];
  app: PIXI.Application;

  constructor() {
    super();
    const left = document.querySelector<HTMLElement>("#left")!;
    const app = new PIXI.Application({ backgroundColor: 0x000, resizeTo: left });
    left.appendChild(app.view);

    app.stage.x = app.renderer.width / 2;
    app.stage.y = app.renderer.height / 2;
    // Zoom?
    // app.stage.scale.x = 2;
    // app.stage.scale.y = 2;
    this.app = app;
  }

  getOrCreate(entity: Entity<Position>): PIXI.Sprite {
    if (this.renderedItems[entity.id]) {
      return this.renderedItems[entity.id];
    } else {
      const newItem = PIXI.Sprite.from(ship); // In the future, from entity.
      newItem.anchor.set(0.5);
      this.app.stage.addChild(newItem);
      this.renderedItems[entity.id] = newItem;
      return newItem;
    }
  }

  init() {
    console.log("init");
  }

  update(entities: Entity<Position>[]) {
    entities.forEach((e) => {
      const item = this.getOrCreate(e);

      // Update rendered item position.
      item.x = e.components.Position.x;
      item.y = e.components.Position.y;
      item.rotation = e.components.Position.yaw;

      // TODO: temporary.
      e.components.Position.yaw += 0.1;
    });
  }
}
