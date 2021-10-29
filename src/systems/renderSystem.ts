import * as PIXI from "pixi.js";
import playerShip from "../assets/pixel_ship_blue.png";
import enemyShip from "../assets/pixel_ship_red.png";

import { Component, Position } from "../components";
import { Entity, System } from "../ecs";
import { Tag } from "../enum";

export const renderSystem = (): System<Position> => {
  const renderedItems: Record<string, PIXI.Sprite> = {};
  const left = document.querySelector<HTMLElement>("#left")!;
  const app = new PIXI.Application({ backgroundColor: 0x000, resizeTo: left });
  left.appendChild(app.view);

  app.stage.x = app.renderer.width / 2;
  app.stage.y = app.renderer.height / 2;

  // Zoom?
  app.stage.scale.x = 0.5;
  app.stage.scale.y = 0.5;

  function getOrCreate<T extends Component>(entity: Entity<T>): PIXI.Sprite {
    if (renderedItems[entity.id]) {
      return renderedItems[entity.id];
    } else {
      const newItem = PIXI.Sprite.from(entity.tags.includes(Tag.Player) ? playerShip : enemyShip); // In the future, from entity.
      newItem.anchor.set(0.5);
      app.stage.addChild(newItem);
      renderedItems[entity.id] = newItem;
      return newItem;
    }
  }

  function update(entities: Entity<Position>[]) {
    entities.forEach((e) => {
      const item = getOrCreate(e);

      // Update rendered item position. Convert coordinate system.
      item.x = e.components.Position.x;
      item.y = -e.components.Position.y;
      item.rotation = 0 - e.components.Position.yaw + Math.PI / 2;
    });
  }

  return { update, componentTypes: ["Position"] };
};
