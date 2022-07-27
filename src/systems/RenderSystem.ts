import * as PIXI from "pixi.js";
import stars01 from "../assets/sprites/spr_stars01.png";
import stars02 from "../assets/sprites/spr_stars02.png";
import { ZIndex } from "../config";
import { Engine } from "../Engine";
import { IRenderable } from "../interfaces";
import { System } from "./System";

/**
 * Force nearest neighbour as default for all graphics interpolation.
 */
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

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

  graphics.zIndex = ZIndex.Hud;

  return graphics;
}

const PARALLAX_OFFSET = 0.9;
const PARALLAX_MAGNIUDE = 0.5;

export class RenderSystem extends System {
  private renderedReticle: { targetId: number; graphic: PIXI.Graphics } | undefined;
  private renderedItems: Record<string, PIXI.Sprite>;
  private container: PIXI.Container;
  private tilingSprite: PIXI.TilingSprite;
  private tilingSprite2: PIXI.TilingSprite;

  constructor(engine: Engine) {
    super(engine);
    this.renderedItems = {};
    this.renderedReticle = undefined;

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
    const bgTexture = PIXI.Texture.from(stars01);
    bgTexture;
    this.tilingSprite = new PIXI.TilingSprite(
      bgTexture,
      app.screen.width * 2,
      app.screen.height * 2
    );
    this.tilingSprite.x = -app.screen.width;
    this.tilingSprite.y = -app.screen.height;
    this.tilingSprite.scale.x = 2;
    this.tilingSprite.scale.y = 2;
    app.stage.addChild(this.tilingSprite);

    const bgTexture2 = PIXI.Texture.from(stars02);
    bgTexture;
    this.tilingSprite2 = new PIXI.TilingSprite(
      bgTexture2,
      app.screen.width * 2,
      app.screen.height * 2
    );
    this.tilingSprite2.x = -app.screen.width;
    this.tilingSprite2.y = -app.screen.height;
    this.tilingSprite2.scale.x = 2;
    this.tilingSprite2.scale.y = 2;
    app.stage.addChild(this.tilingSprite2);

    /**
     * Container holds all elements in the world coordinates.
     * It exists so that we can move it around, keeping the camera focused on a specific unit.
     */
    this.container = new PIXI.Container();
    this.container.sortableChildren = true;
    this.container.position.set(app.renderer.screen.width / 2, app.renderer.screen.height / 2);
    app.stage.addChild(this.container);
  }

  private getOrCreateSprite(entity: IRenderable): PIXI.Sprite | PIXI.AnimatedSprite {
    // Already exists.
    if (this.renderedItems[entity.id]) {
      return this.renderedItems[entity.id];
    }

    const newSprite = this.engine.spriteFactory.createSprite(entity.sprite);
    newSprite.zIndex = entity.zIndex;

    // Prime the entity to be destroyed once the animation completes.
    if (this.engine.spriteFactory.isAnimated(entity.sprite)) {
      (newSprite as PIXI.AnimatedSprite).onComplete = () => {
        entity.destroyed = true;
      };
    }

    this.container.addChild(newSprite);
    this.renderedItems[entity.id] = newSprite;
    return newSprite;
  }

  public updatePlayer() {
    const playerShip = this.engine.entities.playerShip;
    /**
     * Camera follow player.
     */
    this.container.x = -playerShip.position.x;
    this.container.y = playerShip.position.y;

    /**
     * Parallax relative to player.
     */
    this.tilingSprite.tilePosition.x = -(
      playerShip.position.x *
      PARALLAX_MAGNIUDE *
      PARALLAX_OFFSET
    );
    this.tilingSprite.tilePosition.y = playerShip.position.y * PARALLAX_MAGNIUDE * PARALLAX_OFFSET;
    this.tilingSprite2.tilePosition.x = -(playerShip.position.x * PARALLAX_MAGNIUDE);
    this.tilingSprite2.tilePosition.y = playerShip.position.y * PARALLAX_MAGNIUDE;

    /**
     * Update reticle position if there is a target, otherwise create one, otherwise delete it.
     */
    const target = this.engine.entities.ships.get(playerShip.target);
    if (target === null && this.renderedReticle) {
      this.renderedReticle?.graphic.destroy();
      this.renderedReticle = undefined;
    } else if (target) {
      let graphic;

      if (this.renderedReticle && this.renderedReticle?.targetId === playerShip.target) {
        graphic = this.renderedReticle.graphic;
      } else {
        this.renderedReticle?.graphic.destroy();
        this.renderedReticle = undefined;
        graphic = createReticle(120);
        this.container.addChild(graphic);
        this.renderedReticle = { targetId: target.id, graphic };
      }

      this.renderedReticle.graphic.x = target.position.x;
      this.renderedReticle.graphic.y = -target.position.y;
    }
  }

  update() {
    this.engine.entities.ships.forEach(this.updateOne);
    this.engine.entities.bullets.forEach(this.updateOne);
    this.engine.entities.doodads.forEach(this.updateOne);
    this.engine.entities.planets.forEach(this.updateOne);
  }

  private updateOne(entity: IRenderable) {
    const sprite = this.getOrCreateSprite(entity);

    if (entity.destroyed) {
      /**
       * Destroy entity?
       */
      this.renderedItems[entity.id].destroy();
      return;
    }

    /**
     * Update rendered entity position. Convert coordinate system.
     */
    sprite.x = entity.position.x;
    sprite.y = -entity.position.y;
    sprite.rotation = 0 - entity.yaw.angle() + Math.PI / 2;
  }
}
