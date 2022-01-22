import { BehaviourName, Behaviours, getInitialBehaviourState } from "../Behaviours";
import { Politics } from "../Components";
import { ShipEntity } from "../Factories/ShipFactory";
import { Entity, Game, System } from "../game";

function getNextBehaviour(game: Game, entity: ShipEntity): BehaviourName {
  const { offensive } = entity.components;

  /**
   * A ship will look for a combat target if the ship is combat effective and there are targets.
   */
  // TODO: is combat effective?
  if (!offensive.target && Politics.getMostHostileTarget(entity, game.entities.getShips())) {
    return "FindTarget";
  }

  /**
   * If a ship has a target, pick a combat style.
   * To begin with, this is just based on the kind of ship it is. But later it may be that
   * ships have many combat styles to pick from either randomly or for some reason.
   */
  if (offensive.target) {
    return "SmallShipAggressive";
  }

  return "None";
}

export const AIStrategySystem = (game: Game): System => {
  function update(entity: ShipEntity, delta: number) {
    const { ai } = entity.components;

    // Don't apply a strategy for the player.
    if (Entity.isPlayer(entity)) {
      return;
    }

    const currentName = ai.behaviour.name;

    const newName = getNextBehaviour(game, entity);

    // If changed, update it.
    if (currentName !== newName) {
      console.log(`Ship ${entity.id} behaviour changed from ${currentName} to ${newName}.`);

      ai.behaviour = getInitialBehaviourState(newName);
    }

    // Invoke behaviour.
    Behaviours[newName](game, entity, delta);
  }

  // const { ai, offensive, body, navigation } = entity.components;
  //   // // If ship already has a target, don't do any strategy.  TODO: this should be more complex.
  //   // if (entity.components.offensive.target) {
  //   //   return;
  //   // }

  //   const hostileTeams = Politics.getHostileTeams(entity);

  //   const ships = game.entities.query(["Politics", "Body"]);

  //   const target = game.entities.get(offensive.target);
  //   /**
  //    * Pick a hostile target?
  //    * If there's something to fight, do that first.
  //    */
  //   if (!target) {
  //     for (const team of hostileTeams) {
  //       const worstEnemies = ships.filter((s) => s.components.politics.team === team);
  //       if (worstEnemies.length) {
  //         const target = pickRandom(worstEnemies).id;
  //         console.log(`Ship ${entity.id} become hostile towards Ship ${target}`);
  //         offensive.target = target;
  //         navigation.target = target;
  //       }
  //     }
  //   }

  //   /**
  //    * Point towards?
  //    */
  //   if (target) {
  //     ai.combatBehaviour = CombatBehaviour.Aggressive;
  //     ai.movementBehaviour = MovementBehaviour.PointAt;
  //   }

  //   /**
  //    * Fly at?
  //    */
  //   if (target && Body.isFacing(body, target.components.body!)) {
  //     ai.movementBehaviour = MovementBehaviour.FlyThrough;
  //   }

  //   /**
  //    * No AI strategy determined. Reset AI.
  //    */
  //   if (offensive.target === null && ai.combatBehaviour !== CombatBehaviour.None) {
  //     console.log(`Entity ${entity.id} stop combat AI.`);
  //     ai.combatBehaviour = CombatBehaviour.None;
  //   }

  //   if (navigation.target === null && ai.movementBehaviour !== MovementBehaviour.None) {
  //     console.log(`Entity ${entity.id} stop movement AI.`);
  //     ai.movementBehaviour = MovementBehaviour.None;
  //   }
  // }
  return { update, kindsOrArchetype: "ShipEntity" };
};
