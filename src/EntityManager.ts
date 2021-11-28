import { Components, ECS, Entity, Kind } from "./ecs";
import { Team } from "./enum";
import { assert } from "./utils";

export class Entities {
  /**
   * The queryCache is a way to cache sets of entities that match a given query.
   * This is a huge optimization because query might be called many times per tick. A smarter
   * implementation might try to cleverly partially invalidate the cache, but we just purge it
   * any time any entities are added or deleted.
   *
   * Entities cannot currently gain or lose components once spawned.
   */
  private queryCache: Record<string, Entity<any>[] | undefined> = {};
  private entities: Map<number, Entity> = new Map();
  private nextId = 0;
  private ecs: ECS;

  constructor(ecs: ECS) {
    this.ecs = ecs;
  }

  public get length() {
    return this.entities.size;
  }

  public forEach(iterFn: (e: Entity) => void) {
    return this.entities.forEach(iterFn);
  }

  public add<T extends Kind>(
    components: Components<T>,
    options?: {
      lifespan?: number;
    }
  ): Entity<T> {
    this.queryCache = {};

    const entity = {
      id: this.nextId,
      spawned: this.ecs.elapsed,
      components,
      lifespan: options?.lifespan,
      destroyed: false,
    };

    this.entities.set(this.nextId, entity);
    this.nextId++;

    return entity as Entity<T>;
  }

  /**
   * Delete an entity.
   * Should only be used by ECS.
   */
  public _delete(id: number) {
    this.entities.delete(id);
  }

  /**
   * Entity doesn't exist or `isDestroyed === true`
   */
  public isDestroyed(id: number): boolean {
    const entity = this.get(id);
    return entity === null || entity.destroyed;
  }

  /**
   * Convenience wrapper around `this.entities.get` to handle null input ids rather than switching on those at the call
   * site.
   */
  public get(id: number | null): Entity | null {
    if (id === null) {
      return null;
    }

    return this.entities.get(id) ?? null;
  }

  public query<K extends Kind>(componentKinds: K[]): Entity<K>[] {
    const hash = componentKinds.join("");

    if (this.queryCache[hash]) {
      return this.queryCache[hash] as Entity<K>[];
    }

    const hits = Array.from(this.entities.values()).filter((e) =>
      this.isMatch(e, componentKinds)
    ) as Entity<K>[];

    this.queryCache[hash] = hits;

    return hits;
  }

  /**
   * Return if this entity matches the provided componentKinds. It must include ALL kinds.
   * If componentKinds is false, then it handles no entities.
   */
  public isMatch(entity: Entity, componentKinds: Kind[]): boolean {
    if (!componentKinds.length) {
      return false;
    }

    const kinds = Object.values(entity.components)
      .filter((c) => c !== undefined)
      .map((c) => c.kind);
    for (const c of componentKinds) {
      if (!kinds.includes(c)) {
        return false;
      }
    }
    return true;
  }

  /**
   * TODO make public. Accept an optional  "teams" array to filter by?
   */
  private getTargets() {
    return this.query(["Politics"]).filter((e) => e.components.Politics.team !== Team.Player);
  }

  /**
   * From all possible targets, get the next one by indexing one beyond previousTarget.
   * This depends on ecs.query returning stable results.
   */
  getTarget(currentTarget: number | null, offsetIndex?: number): number | null {
    const targets = this.getTargets();

    if (!targets.length) {
      return null;
    }

    const currentTargetIndex = targets.findIndex((e) => e.id === currentTarget);

    if (currentTargetIndex === -1) {
      return targets[0].id;
    } else {
      const newTarget = targets.at((currentTargetIndex + (offsetIndex ?? 0)) % targets.length);
      assert(newTarget);
      return newTarget.id;
    }
  }
}
