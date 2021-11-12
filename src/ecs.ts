import { Component } from "./components";
import { factoryCreators } from "./factories";

(window as any).hit = 0;
(window as any).miss = 0;

export type Kind = Component["kind"];

export interface System {
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
   * any time any entities are added or deleted.
   *
   * Entities cannot currently gain or lose components once spawned.
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
      lifespan?: number;
    }
  ) {
    this.queryCache = {};

    const entity = {
      id: this.nextId,
      spawned: this.elapsed,
      components,
      lifespan: options?.lifespan,
      destroyed: false,
    };

    this.entities.set(this.nextId, entity);
    this.nextId++;

    return entity;
  }

  /**
   * Return a collection of entities that contain ALL the componentKinds provided.
   */
  public query<K extends Kind>(componentKinds: K[]): Entity<K>[] {
    const hash = componentKinds.join("");

    if (this.queryCache[hash]) {
      (window as any).hit++;
      return this.queryCache[hash] as Entity<K>[];
    } else {
      (window as any).miss++;
    }

    const hits = Array.from(this.entities.values()).filter((e) =>
      this.isMatch(e, componentKinds)
    ) as Entity<K>[];

    this.queryCache[hash] = hits;

    return hits;
  }

  public start() {
    requestAnimationFrame(this.tick.bind(this));
  }

  private isMatch(entity: PartialEntity, componentKinds: Kind[]): boolean {
    const kinds = Object.values(entity.components).map((c) => c.kind);
    for (const c of componentKinds) {
      if (!kinds.includes(c)) {
        return false;
      }
    }
    return true;
  }

  /**
   * For each system, query all relevant entities based on components, call update on the system for
   * each entity, independently. If a system has no entities to act on, it is not run.
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
        if (this.isMatch(e, sys.componentKinds)) {
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
