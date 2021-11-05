import * as PIXI from "pixi.js";
import playerShip from "../assets/pixel_ship_blue.png";
import enemyShip from "../assets/pixel_ship_red.png";
import { Body, Component } from "../components";
import { Entity, System } from "../ecs";
import { Tag } from "../enum";

export const RenderSystem = (): System<Body> => {
  const renderedItems: Record<string, PIXI.Sprite> = {};
  const viewport = document.querySelector<HTMLElement>("#viewport")!;
  const app = new PIXI.Application({ backgroundColor: 0x000, resizeTo: viewport });
  viewport.appendChild(app.view);

  app.stage.x = app.renderer.width / 2;
  app.stage.y = app.renderer.height / 2;

  // Zoom?
  app.stage.scale.x = 0.5;
  app.stage.scale.y = 0.5;

  const container = new PIXI.Container();
  container.position.set(app.renderer.screen.width / 2, app.renderer.screen.height / 2);
  app.stage.addChild(container);

  function getOrCreateSprite<T extends Component>(entity: Entity<T>): PIXI.Sprite {
    if (renderedItems[entity.id]) {
      return renderedItems[entity.id];
    } else {
      const newItem = PIXI.Sprite.from(entity.tags.includes(Tag.Player) ? playerShip : enemyShip); // In the future, from entity.
      newItem.roundPixels = true;
      newItem.anchor.set(0.5);
      container.addChild(newItem);
      renderedItems[entity.id] = newItem;
      return newItem;
    }
  }

  function update(entity: Entity<Body>) {
    const item = getOrCreateSprite(entity);

    /**
     * Follow player.
     */
    if (entity.tags.includes(Tag.Player)) {
      container.x = entity.components.body.pos.x;
      container.y = entity.components.body.pos.y;
    }

    if (entity.destroyed) {
      /**
       * Destroy entity?
       */
      renderedItems[entity.id].destroy();
      return;
    }

    /**
     * Update rendered entity position. Convert coordinate system.
     */
    item.x = entity.components.body.pos.x;
    item.y = -entity.components.body.pos.y;
    item.rotation = 0 - entity.components.body.yaw + Math.PI / 2;
  }

  return { update, componentKinds: ["Body"] };
};
