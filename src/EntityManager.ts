import { Component } from "./Components";
import { Team } from "./enum";
import { ShipEntity } from "./Factories/ShipFactory";
import { Archetype, Components, Entity, Game, Kind } from "./game";
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
  private nextId = 1; // Begin at 1 so that entity IDs are always truthy.
  private game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  public get length() {
    return this.entities.size;
  }

  public getPlayer() {
    const player = this.query(["Player"])[0];
    assert(player);
    return player as ShipEntity;
  }

  public forEach(iterFn: (e: Entity) => void) {
    return this.entities.forEach(iterFn);
  }

  public find(iterFn: (e: Entity) => boolean): Entity | undefined {
    Array.prototype.find;
    for (const e of this.entities.values()) {
      if (iterFn(e)) {
        return e;
      }
    }
    return undefined;
  }

  public add<T extends Kind>(
    components: Partial<Components<T>>,
    options?: {
      lifespan?: number;
      archetype?: Archetype;
    }
  ): void {
    this.queryCache = {};

    const entity = {
      id: this.nextId,
      spawned: this.game.elapsed,
      components,
      lifespan: options?.lifespan,
      destroyed: false,
      archetype: options?.archetype,
    };

    this.entities.set(this.nextId, entity);
    this.nextId++;
  }

  /**
   * Delete an entity.
   * Should only be used by Game.
   */
  public _delete(id: number) {
    this.queryCache = {};
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
  public get<T extends Entity>(id: number | null): T | null {
    if (id === null) {
      return null;
    }

    return (this.entities.get(id) as T) ?? null;
  }

  public query<K extends Kind>(kindsOrArchetype: K[]): Entity<K>[] {
    const hash = kindsOrArchetype.join("");

    if (this.queryCache[hash]) {
      return this.queryCache[hash] as Entity<K>[];
    }

    const hits = Array.from(this.entities.values()).filter((e) =>
      this.isMatch(e, kindsOrArchetype)
    ) as Entity<K>[];

    this.queryCache[hash] = hits;

    return hits;
  }

  /**
   * Return if this entity matches the provided kindsOrArchetype. It must include ALL kinds.
   * If kindsOrArchetype is false, then it handles no entities.
   */
  public isMatch(entity: Entity, kindsOrArchetype: Kind[] | Archetype): boolean {
    if (!kindsOrArchetype.length) {
      return false;
    }

    // if matches a list of component kinds.
    if (Array.isArray(kindsOrArchetype)) {
      const kinds = Object.values(entity.components)
        .filter((c) => c !== undefined)
        .map((c) => c.kind);
      for (const c of kindsOrArchetype) {
        if (!kinds.includes(c)) {
          return false;
        }
      }
      return true;
    } else {
      return entity.archetype === kindsOrArchetype;
    }
  }

  /**
   * TODO make public. Accept an optional  "teams" array to filter by?
   */
  private getPlayerTargets() {
    return this.query(["Politics"]).filter((e) => e.components.politics.team !== Team.Player);
  }

  /**
   * From all possible targets, get the next one by indexing one beyond previousTarget.
   * This depends on game.query returning stable results.
   */
  public getNextPlayerTarget(currentTarget: number | null, offsetIndex?: number): number | null {
    const targets = this.getPlayerTargets();

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

  public addComponent(entityId: number, component: Component) {
    const entity = this.get(entityId);
    assert(entity);
    if (entity.components[component.kind as Lowercase<Kind>]) {
      throw new Error("Cannot add component. It already exists.");
    }
    entity.components[component.kind as Lowercase<Kind>] = component as any; // TODO Type safety.
  }
}
