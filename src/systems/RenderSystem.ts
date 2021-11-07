import * as PIXI from "pixi.js";
import playerShip from "../assets/pixel_ship_blue.png";
import enemyShip from "../assets/pixel_ship_red.png";
import { Entity, Kind, System } from "../ecs";
import { Tag } from "../enum";
import bg from "../assets/spr_stars01.png";
import bg2 from "../assets/spr_stars02.png";

const PARALLAX_MAGNIUDE = 0.5;

/**
 * Force nearest neighbour as default for all graphics interpolation.
 */
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

export const RenderSystem = (): System => {
  const renderedItems: Record<string, PIXI.Sprite> = {};
  const viewport = document.querySelector<HTMLElement>("#viewport")!;
  const app = new PIXI.Application({ backgroundColor: 0x000, resizeTo: viewport });
  viewport.appendChild(app.view);

  app.stage.x = app.renderer.width / 2;
  app.stage.y = app.renderer.height / 2;

  /**
   * Zoom scene.
   */
  app.stage.scale.x = 0.5;
  app.stage.scale.y = 0.5;

  /**
   * Background.
   */
  const bgTexture = PIXI.Texture.from(bg);
  bgTexture;
  const tilingSprite = new PIXI.TilingSprite(
    bgTexture,
    app.screen.width * 2,
    app.screen.height * 2
  );
  tilingSprite.x = -app.screen.width;
  tilingSprite.y = -app.screen.height;
  tilingSprite.scale.x = 2;
  tilingSprite.scale.y = 2;
  app.stage.addChild(tilingSprite);

  const bgTexture2 = PIXI.Texture.from(bg2);
  bgTexture;
  const tilingSprite2 = new PIXI.TilingSprite(
    bgTexture2,
    app.screen.width * 2,
    app.screen.height * 2
  );
  tilingSprite2.x = -app.screen.width;
  tilingSprite2.y = -app.screen.height;
  tilingSprite2.scale.x = 2;
  tilingSprite2.scale.y = 2;
  app.stage.addChild(tilingSprite2);

  /**
   * Container holds all elements in the world coordinates.
   * It exists so that we can move it around, keeping the camera focused on a specific unit.
   */
  const container = new PIXI.Container();
  container.position.set(app.renderer.screen.width / 2, app.renderer.screen.height / 2);
  app.stage.addChild(container);

  function getOrCreateSprite<T extends Kind>(entity: Entity<T>): PIXI.Sprite {
    if (renderedItems[entity.id]) {
      return renderedItems[entity.id];
    } else {
      const newItem = PIXI.Sprite.from(entity.tags.includes(Tag.Player) ? playerShip : enemyShip); // In the future, from entity.
      newItem.anchor.set(0.5);
      container.addChild(newItem);
      renderedItems[entity.id] = newItem;
      return newItem;
    }
  }

  function update(entity: Entity<"Body">) {
    const item = getOrCreateSprite(entity);

    /**
     * Follow player.
     * Parallax scroll backgrounf.
     */
    if (entity.tags.includes(Tag.Player)) {
      container.x = -entity.components.body.pos.x;
      container.y = entity.components.body.pos.y;

      tilingSprite.tilePosition.x = -(entity.components.body.pos.x * PARALLAX_MAGNIUDE * 0.75);
      tilingSprite.tilePosition.y = entity.components.body.pos.y * PARALLAX_MAGNIUDE * 0.75;

      tilingSprite2.tilePosition.x = -(entity.components.body.pos.x * PARALLAX_MAGNIUDE);
      tilingSprite2.tilePosition.y = entity.components.body.pos.y * PARALLAX_MAGNIUDE;
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
