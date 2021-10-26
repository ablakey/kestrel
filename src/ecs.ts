import { difference } from "lodash";
import { Component } from "./components";

export type System = {
  componentTypes: Component["type"][];
  init: VoidFunction;
  update: (entities: Entity[], delta: number, ecs: ECS) => void;
};

type ComponentDict<T extends { type: string } = Component> = {
  [key in T["type"]]: Extract<T, { type: key }>;
};

export type Entity<T extends { type: string } = Component> = {
  id: number;
  components: ComponentDict<T>;
};

type PartialEntity = {
  id: number;
  components: Partial<ComponentDict>;
};

export class ECS {
  private entityIdCounter = 0;
  private entities: Map<number, PartialEntity> = new Map();
  private systems: System[] = [];

  createEntity(components: Partial<ComponentDict>) {
    this.entities.set(this.entityIdCounter, {
      id: this.entityIdCounter,
      components,
    });

    this.entityIdCounter++;
  }

  getEntity(id: number) {
    return this.entities.get(id);
  }

  query(componentTypes: Component["type"][]): PartialEntity[] {
    const matches: PartialEntity[] = [];
    this.entities.forEach((e) => {
      // TODO: this is probably where optimization will be needed when entity count gets large.
      if (difference(componentTypes, Object.keys(e.components)).length === 0) {
        matches.push(e);
      }
    });
    return matches;
  }

  deleteEntity(id: number) {
    this.entities.delete(id);
  }

  registerSystem(system: System) {
    this.systems.push(system);
  }

  start() {
    this.systems.forEach(({ init }) => {
      init();
    });
    requestAnimationFrame(this.update.bind(this));
  }

  private update(delta: number) {
    this.systems.forEach(({ componentTypes, update }) => {
      update(this.query(componentTypes) as Entity[], delta, this);
    });
    requestAnimationFrame(this.update.bind(this));
  }
}
