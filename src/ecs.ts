import { Component } from "./components";

type ComponentDict = { [K in Component["type"]]?: Component has K};

export type Entity = {
  id: number;
  components: ComponentDict;
};

export type System = {
  componentTypes: Component["type"][];
  update: (delta: number, entities: Entity[]) => void;
};

export function makeEcs<C extends Component>() {
  let entityIdCounter = 0;

  /**
   * An array of entities, keyed by id.
   * It makes lookup O(1) like an object, but we get the array behaviour.
   * However, when deleting entities, we end up with `undefined` rather than an empty position, so we have to filter
   * `undefined` anyway.  It also makes it a bit cleaner to walk and search by property, since we don't have to
   * turn the object into an array first.
   *
   * None of this is really performance focused yet.
   */
  const entities: (Entity | undefined)[] = [];

  function createEntity(components: ComponentDict) {
    entities[entityIdCounter] = {
      id: entityIdCounter,
      components,
    };

    entityIdCounter++;
  }

  function getEntity(id: number) {
    return entities[id];
  }

  function query(componentTypes: C["type"][]): Entity[] {
    console.log(componentTypes);
    return entities.filter((e): e is Entity => e !== undefined); // TODO: actually query by
  }

  function deleteEntity(id: number) {
    entities[id] = undefined;
  }

  const systems: System[] = [];

  function registerSystem(system: System) {
    systems.push(system);
  }

  function update(delta: number) {
    console.log(1);
    systems.forEach(({ componentTypes, update }) => {
      update(delta, query(componentTypes));
    });
    requestAnimationFrame(update);
  }

  function start() {
    // TODO: run once systems.
    requestAnimationFrame(update);
  }

  return { createEntity, getEntity, query, deleteEntity, registerSystem, start };
}
