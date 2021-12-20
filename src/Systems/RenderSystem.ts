import * as PIXI from "pixi.js";
import bg from "../assets/sprites/spr_stars01.png";
import bg2 from "../assets/sprites/spr_stars02.png";
import { Game, Entity, System } from "../game";
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

const PARALLAX_OFFSET = 0.9;
const PARALLAX_MAGNIUDE = 0.5;

/**
 * Force nearest neighbour as default for all graphics interpolation.
 */
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

async function preloadAssets() {
  return new Promise((resolve, reject) => {
    PIXI.Loader.shared.add("explosion").load((loader, resources) => {
      for (const [name, resource] of Object.entries(resources)) {
        if (resource.error) {
          reject(`Failed to load resource: ${name}. Reason: ${resource.error}`);
          return;
        }
      }
      resolve(null);
    });
  });
}

export const RenderSystem = async (game: Game): Promise<System> => {
  await preloadAssets();

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

  function getOrCreateSprite(entity: Entity<"Sprite">): PIXI.Sprite | PIXI.AnimatedSprite {
    const { sprite } = entity.components;

    // Already exists.
    if (renderedItems[entity.id]) {
      return renderedItems[entity.id];
    }

    const newSprite = game.spriteFactory.createSprite(sprite.name);

    // if (sprite.spritesheet) {
    //   const spritesheet = Spritesheets[sprite.spritesheet];
    //   const texture = PIXI.Texture.from(spritesheet.sheet);
    //   const sheet = new PIXI.Spritesheet(texture, spritesheet.data);
    //   newItem = new PIXI.AnimatedSprite(sheet);
    //   // TODO: anchor
    // }

    container.addChild(newSprite);
    renderedItems[entity.id] = newSprite;
    return newSprite;
  }

  // TODO
  // TODO
  // TODO
  // TODO getOrCreateSprite should handle Spritesheets too. So it should return one of the two items.
  // TODO
  // TODO
  // TODO
  // TODO

  function update(entity: Entity<"Body" | "Sprite">) {
    const { player, body, offensive } = entity.components;
    const item = getOrCreateSprite(entity);

    /**
     * Player-specific updates.
     */
    if (player) {
      assert(offensive); // Player always has an offensive component.

      /**
       * Camera follow player.
       */
      container.x = -body.position.x;
      container.y = body.position.y;

      /**
       * Parallax relative to player.
       */
      tilingSprite.tilePosition.x = -(body.position.x * PARALLAX_MAGNIUDE * PARALLAX_OFFSET);
      tilingSprite.tilePosition.y = body.position.y * PARALLAX_MAGNIUDE * PARALLAX_OFFSET;
      tilingSprite2.tilePosition.x = -(body.position.x * PARALLAX_MAGNIUDE);
      tilingSprite2.tilePosition.y = body.position.y * PARALLAX_MAGNIUDE;

      /**
       * Update reticle position if there is a target, otherwise create one, otherwise delete it.
       */
      const target = game.entities.get(offensive.target);
      if (target === null && renderedReticle) {
        renderedReticle?.graphic.destroy();
        renderedReticle = undefined;
      } else if (target) {
        assert(target?.components.body);

        let graphic;

        if (renderedReticle?.targetId === offensive.target) {
          graphic = renderedReticle.graphic;
        } else {
          renderedReticle?.graphic.destroy();
          renderedReticle = undefined;
          graphic = createReticle(120);
          container.addChild(graphic);
          renderedReticle = { targetId: target.id, graphic };
        }

        renderedReticle.graphic.x = target.components.body.position.x;
        renderedReticle.graphic.y = -target.components.body.position.y;
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
    item.x = body.position.x;
    item.y = -body.position.y;
    item.rotation = 0 - body.yaw.angle() + Math.PI / 2;
  }

  return { update, componentKinds: ["Body", "Sprite"] };
};
