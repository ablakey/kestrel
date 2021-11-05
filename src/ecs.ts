import { difference } from "lodash";
import { Component } from "./components";
import { Tag } from "./enum";
import { factoryCreators } from "./factories";
import { systems } from "./systems";

export interface System<K extends Component> {
  tags?: Tag[];
  componentKinds: Extract<Component, { kind: K["kind"] }>["kind"][];
  update(entity: Entity<K>, delta: number): void;
}

type FactoryCreators = typeof factoryCreators;
type FactoryInstances = { [key in keyof FactoryCreators]: InstanceType<FactoryCreators[key]> };

type ComponentDict<T extends Component = Component> = {
  [key in Uncapitalize<T["kind"]>]: Extract<T, { kind: Capitalize<key> }>;
};

export type Entity<T extends Component = Component> = {
  id: number;
  spawnTime: number;
  components: ComponentDict<T>;
  destroyed: boolean;
  tags: Tag[];
};

type PartialEntity = Omit<Entity, "components"> & {
  components: Partial<ComponentDict>;
};

export class ECS {
  private nextId = 0;
  private systems: System<any>[];
  public entities: Map<number, PartialEntity> = new Map();
  public factories: FactoryInstances;
  public elapsed = 0;

  constructor() {
    this.factories = Object.fromEntries(
      Object.entries(factoryCreators).map(([name, Factory]) => [name, new Factory(this)])
    ) as FactoryInstances;
    this.systems = systems.map((s) => s(this));
  }

  public addEntity(components: Partial<ComponentDict>, tags?: Tag[]) {
    this.entities.set(this.nextId, {
      id: this.nextId++,
      spawnTime: this.elapsed,
      components,
      destroyed: false,
      tags: tags ?? [],
    });
  }

  /**
   * componentKinds cannot be optional. There's nothing a system can do if it cannot act on any components.
   * Tags are optional and when populated, every tag must be found on an entity to return the query.
   */
  public query<K extends Component["kind"]>(componentKinds: K[], tags?: Tag[]) {
    let matches = Array.from(this.entities.values());

    // Query by type.
    matches = matches.filter(
      (m) =>
        difference(
          componentKinds,
          Object.values(m.components).map((c) => c.kind)
        ).length === 0
    );

    // Further query by tag.
    if (tags !== undefined) {
      matches = matches.filter((m) => difference(tags, m.tags).length === 0);
    }

    return matches as Entity<Extract<Component, { kind: K }>>[];
  }

  public start() {
    requestAnimationFrame(this.update.bind(this));
  }

  /**
   * For each system, query all relevant entities based on components and tags,
   * call update on the system for each entity, independently.
   *
   * If a system has no entities to act on, it is not run.
   *
   * Destroy all entities with the `destroy` flag set.
   */
  private update(timestamp: number) {
    const delta = timestamp - this.elapsed;
    this.elapsed = timestamp;

    this.systems.forEach((sys) => {
      const entities = this.query(sys.componentKinds, sys.tags);
      entities.forEach((e) => sys.update(e, delta));
    });

    this.entities.forEach((e) => {
      if (e.destroyed) {
        this.entities.delete(e.id);
      }
    });

    requestAnimationFrame(this.update.bind(this));
  }
}
