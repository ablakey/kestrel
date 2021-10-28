import { difference } from "lodash";
import { Component } from "./components";

export interface System<K extends Component> {
  componentTypes: Extract<Component, { type: K["type"] }>["type"][];
  update(entities: Entity<K>[], delta: number, ecs: ECS): void;
}

type ComponentDict<T extends Component = Component> = {
  [key in T["type"]]: Extract<T, { type: key }>;
};

export type Entity<T extends Component = Component> = {
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
  private systems: System<any>[] = []; // We don't actually care what the components are here.

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

  registerSystem<T extends Component>(system: System<T>) {
    this.systems.push(system);
  }

  start() {
    requestAnimationFrame(this.update.bind(this));
  }

  private update(delta: number) {
    this.systems.forEach((sys) => {
      sys.update(this.query(sys.componentTypes), delta, this);
    });
    requestAnimationFrame(this.update.bind(this));
  }
}
