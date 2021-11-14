import * as PIXI from "pixi.js";
import bg from "../assets/spr_stars01.png";
import bg2 from "../assets/spr_stars02.png";
import { ECS, Entity, System } from "../ecs";
import { assert } from "../utils";

/**
 * Create a reticle, which is four L shapes at the corners, resembling a square.
 * Remember that in the context of drawing, positive y increases downwards.
 */
function createReticle(size: number) {
  const halfSize = size / 2;
  const min = -halfSize;
  const max = halfSize;

  const graphics = new PIXI.Graphics();

  // graphics.beginFill(0xff3300);
  graphics.lineStyle(4, 0xffd900, 1);

  // Top-left
  graphics.moveTo(min, min + 20);
  graphics.lineTo(min, min);
  graphics.lineTo(min + 20, min);

  // Top-right
  graphics.moveTo(max - 20, min);
  graphics.lineTo(max, min);
  graphics.lineTo(max, min + 20);

  // Bottom-right
  graphics.moveTo(max, max - 20);
  graphics.lineTo(max, max);
  graphics.lineTo(max - 20, max);

  // Bottom-left
  graphics.moveTo(min + 20, max);
  graphics.lineTo(min, max);
  graphics.lineTo(min, max - 20);

  return graphics;
}

const PARALLAX_MAGNIUDE = 0.5;

/**
 * Force nearest neighbour as default for all graphics interpolation.
 */
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

export const RenderSystem = (ecs: ECS): System => {
  const renderedItems: Record<string, PIXI.Sprite> = {};
  let renderedReticle: { targetId: number; graphic: PIXI.Graphics } | undefined = undefined;

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

  // /**
  //  * Create a targeting reticle.
  //  */
  // const reticle = createReticle(100);
  // container.addChild(reticle);

  function getOrCreateSprite(entity: Entity<"Body" | "Sprite">): PIXI.Sprite {
    if (renderedItems[entity.id]) {
      return renderedItems[entity.id];
    } else {
      const newItem = PIXI.Sprite.from(entity.components.Sprite.texture);
      newItem.anchor.set(0.5);
      container.addChild(newItem);
      renderedItems[entity.id] = newItem;
      return newItem;
    }
  }

  function update(entity: Entity<"Body" | "Sprite">) {
    const { Player, Body, Offensive } = entity.components;
    const item = getOrCreateSprite(entity);

    if (Player) {
      // Follow camera on player.
      container.x = -Body.position.x;
      container.y = Body.position.y;

      // Update parallax.
      tilingSprite.tilePosition.x = -(Body.position.x * PARALLAX_MAGNIUDE * 0.75);
      tilingSprite.tilePosition.y = Body.position.y * PARALLAX_MAGNIUDE * 0.75;
      tilingSprite2.tilePosition.x = -(Body.position.x * PARALLAX_MAGNIUDE);
      tilingSprite2.tilePosition.y = Body.position.y * PARALLAX_MAGNIUDE;

      if (Offensive?.target) {
        const target = ecs.entities.get(Offensive.target);
        assert(target?.components.Body);
        let graphic;
        if (renderedReticle?.targetId === Offensive.target) {
          graphic = renderedReticle.graphic;
        } else {
          graphic = createReticle(120);
          container.addChild(graphic);
          renderedReticle = { targetId: target.id, graphic };
        }

        renderedReticle.graphic.x = target.components.Body.position.x;
        renderedReticle.graphic.y = -target.components.Body.position.y;
      }
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
    item.x = Body.position.x;
    item.y = -Body.position.y;
    item.rotation = 0 - Body.yaw.angle() + Math.PI / 2;
  }

  return { update, componentKinds: ["Body", "Sprite"] };
};
