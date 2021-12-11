import * as PIXI from "pixi.js";
import { Entity, System } from "../game";

export const MinimapSystem = (): System => {
  const renderedMarkers: Record<string, PIXI.Graphics> = {};
  let container: PIXI.Container | undefined = undefined;

  function getOrCreateMarker(entity: Entity<"Body" | "Politics">) {
    if (renderedMarkers[entity.id]) {
      return renderedMarkers[entity.id];
    } else {
      const marker = new PIXI.Graphics();
      marker.beginFill(0xff0000);
      marker.drawRect(0, 0, 40, 40);
      renderedMarkers[entity.id] = marker;
      container!.addChild(marker);
      return marker;
    }
  }

  function update(entity: Entity<"Body" | "Politics">) {
    /**
     * Need to initialize at runtime otherwise #minimap won't exist yet.
     */
    if (container === undefined) {
      const element = document.querySelector<HTMLElement>("#minimap");
      if (element === null) {
        return;
      }
      const app = new PIXI.Application({ backgroundColor: 0x000, resizeTo: element });
      element.appendChild(app.view);
      app.stage.x = app.renderer.width / 2;
      app.stage.y = app.renderer.height / 2;
      app.stage.scale.x = 0.1;
      app.stage.scale.y = 0.1;

      container = new PIXI.Container();
      container.position.set(app.renderer.screen.width / 2, app.renderer.screen.height / 2);
      app.stage.addChild(container);
    }

    const { body, ammo, player } = entity.components;

    /**
     * Do not render non-trackable ammo on the minimap.
     */
    if (ammo && !ammo.trackable) {
      return;
    }

    const marker = getOrCreateMarker(entity);

    if (player) {
      /**
       * Camera follow player.
       */
      container.x = -body.position.x;
      container.y = body.position.y;
    }

    if (entity.destroyed) {
      /**
       * Destroy entity?
       */
      renderedMarkers[entity.id].destroy();
      return;
    }

    /**
     * Update rendered entity position. Convert coordinate system.
     */
    marker.x = body.position.x;
    marker.y = -body.position.y;
  }

  return { update, componentKinds: ["Body"] };
};
