import { Component } from "./components";
import { Tag } from "./enum";
import { factoryCreators } from "./factories";

(window as any).hit = 0;
(window as any).miss = 0;

export type Kind = Component["kind"];

export interface System {
  tags: Tag[];
  componentKinds: Kind[];
  onTick?: (delta: number) => void;
  update: (entity: Entity<Kind>, delta: number) => void;
}

type FactoryCreators = typeof factoryCreators;
type FactoryInstances = { [key in keyof FactoryCreators]: InstanceType<FactoryCreators[key]> };

type ComponentDict<T extends Kind> = {
  [key in Uncapitalize<T>]: Extract<Component, { kind: Capitalize<key> }>;
};

export type Entity<T extends Kind> = {
  id: number;
  spawned: number;
  components: ComponentDict<T> & Partial<ComponentDict<Kind>>;
  lifespan?: number;
  destroyed: boolean;
  tags: Tag[];
};

type PartialEntity = Omit<Entity<Kind>, "components"> & {
  components: Partial<ComponentDict<Kind>>;
};

export class ECS {
  private nextId = 0;
  private systems: System[];
  public entities: Map<number, PartialEntity> = new Map();
  public factories: FactoryInstances;
  public elapsed = 0;

  /**
   * The queryCache is a way to cache sets of entities that match a given query.
   * This is a huge optimization because query might be called many times per tick. A smarter
   * implementation might try to cleverly partially invalidate the cache, but we just purge it
   * any time any data changes.  Changes include:
   * - Adding or deleting entities.
   * - Changing tags.
   */
  private queryCache: Record<string, Entity<any>[] | undefined> = {};

  constructor(systemCreators: ((ecs: ECS) => System)[]) {
    this.factories = Object.fromEntries(
      Object.entries(factoryCreators).map(([name, Factory]) => [name, new Factory(this)])
    ) as FactoryInstances;
    this.systems = systemCreators.map((s) => s(this));
  }

  public addEntity(
    components: Partial<ComponentDict<Kind>>,
    options?: {
      tags?: Tag[];
      lifespan?: number;
    }
  ) {
    this.queryCache = {};

    this.entities.set(this.nextId, {
      id: this.nextId++,
      spawned: this.elapsed,
      components,
      lifespan: options?.lifespan,
      destroyed: false,
      tags: options?.tags ?? [],
    });
  }

  /**
   * `componentKinds` cannot be optional. There's nothing a system can do if it cannot act on any
   * components. Tags are optional and when populated, every tag must be found on an entity to
   * return the query.
   */
  public query<K extends Kind>(componentKinds: K[], tags?: Tag[]): Entity<K>[] {
    const hash = [...componentKinds, ...(tags ?? [])].join("");

    if (this.queryCache[hash]) {
      (window as any).hit++;
      return this.queryCache[hash] as Entity<K>[];
    } else {
      (window as any).miss++;
    }

    // Optimize this by caching the values based on componentKinds and tags.
    // If a component is destroyed. Remove it from all caches.
    // Each cache is a dict of a  set of entities, keyed by the query hash.

    const hits = Array.from(this.entities.values()).filter((e) =>
      this.isMatch(e, componentKinds, tags)
    ) as Entity<K>[];

    this.queryCache[hash] = hits;

    return hits;
  }

  public start() {
    requestAnimationFrame(this.tick.bind(this));
  }

  /**
   * Given an entity, a list of component kinds, and an optional list of tags, return true if the
   * entity is a subset of these properties.
   */
  private isMatch(entity: PartialEntity, componentKinds: Kind[], tags?: Tag[]): boolean {
    const kinds = Object.values(entity.components).map((c) => c.kind);
    for (const c of componentKinds) {
      if (!kinds.includes(c)) {
        return false;
      }
    }

    for (const t of tags ?? []) {
      if (!entity.tags.includes(t)) {
        return false;
      }
    }

    return true;
  }

  /**
   * For each system, query all relevant entities based on components and tags,
   * call update on the system for each entity, independently.
   *
   * If a system has no entities to act on, it is not run.
   */
  private tick(timestamp: number) {
    const delta = timestamp - this.elapsed;
    this.elapsed = timestamp;

    /**
     * Flag entities for deletion.
     * This gives systems one more chance to act on them, cleaning up.
     */
    this.entities.forEach((e) => {
      if (e.lifespan !== undefined && this.elapsed > e.spawned + e.lifespan) {
        e.destroyed = true;
      }
    });

    /**
     * Call onTick for every system. This is called once per tick and can be used for a system
     * to perform tasks once each cycle.
     */
    this.systems.forEach((s) => {
      s.onTick?.(delta);
    });

    /**
     * For each system, walk every entity and see if they should be acted on.
     * If we don't know, because _systemIndexes[idx] === undefined then calculate it.
     */
    this.systems.forEach((sys) => {
      this.entities.forEach((e) => {
        if (this.isMatch(e, sys.componentKinds, sys.tags)) {
          sys.update(e as Entity<Kind>, delta);
        }
      });
    });

    /**
     * Delete destroyed entities.
     */
    this.entities.forEach((e) => {
      if (e.destroyed) {
        this.entities.delete(e.id);
      }
    });

    requestAnimationFrame(this.tick.bind(this));
  }
}
