import { difference } from "lodash";
import { Component } from "./components";
import { Tag } from "./enum";
import { factoryCreators } from "./factories";

export interface System<K extends Component> {
  tags?: Tag[];
  componentTypes: Extract<Component, { type: K["type"] }>["type"][];
  update(entities: Entity<K>[], delta: number): void;
}

type FactoryCreators = typeof factoryCreators;
type FactoryInstances = { [key in keyof FactoryCreators]: InstanceType<FactoryCreators[key]> };

type ComponentDict<T extends Component = Component> = {
  [key in T["type"]]: Extract<T, { type: key }>;
};

export type Entity<T extends Component = Component> = {
  id: number;
  components: ComponentDict<T>;
  tags: Tag[];
};

type PartialEntity = Omit<Entity, "components"> & {
  components: Partial<ComponentDict>;
};

export class ECS {
  private entityIdCounter = 0;
  private entities: Map<number, PartialEntity> = new Map();
  public systems: System<any>[];
  public factories: FactoryInstances;

  constructor(systems: ((ecs: ECS) => System<any>)[], factoryCreators: FactoryCreators) {
    this.factories = Object.fromEntries(
      Object.entries(factoryCreators).map(([name, Factory]) => [name, new Factory(this)])
    ) as FactoryInstances;
    this.systems = systems.map((s) => s(this));
  }

  addEntity(components: Partial<ComponentDict>, tags?: Tag[]) {
    this.entities.set(this.entityIdCounter, {
      id: this.entityIdCounter,
      components,
      tags: tags ?? [],
    });

    this.entityIdCounter++;
  }

  getEntity(id: number) {
    return this.entities.get(id);
  }

  /**
   * componentTypes cannot be optional. There's nothing a system can do if it cannot act on any components.
   * Tags are optional and when populated, every tag must be found on an entity to return the query.
   */
  query(componentTypes: Component["type"][], tags?: Tag[]): PartialEntity[] {
    let matches: PartialEntity[] = Array.from(this.entities.values());

    // Query by type.
    matches = matches.filter(
      (m) => difference(componentTypes, Object.keys(m.components)).length === 0
    );

    // Further query by tag.
    if (tags !== undefined) {
      matches = matches.filter((m) => difference(tags, m.tags).length === 0);
    }

    return matches;
  }

  deleteEntity(id: number) {
    this.entities.delete(id);
  }

  start() {
    requestAnimationFrame(this.update.bind(this));
  }

  private update(delta: number) {
    this.systems.forEach((sys) => {
      sys.update(this.query(sys.componentTypes, sys.tags), delta);
    });
    requestAnimationFrame(this.update.bind(this));
  }
}
