import { BehaviourName, Behaviours, getInitialBehaviourState } from "../Behaviours";
import { Politics } from "../Components";
import { MIN_SPEED } from "../config";
import { ShipEntity } from "../Factories/ShipFactory";
import { Entity, Game, System } from "../game";

function getNextBehaviour(game: Game, entity: ShipEntity): BehaviourName {
  const { offensive, body, ai } = entity.components;

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

  /**
   * Ship is stopped.
   */
  if (ai.behaviour.name === "Stop" && body.velocity.magnitude() < MIN_SPEED) {
    return "None";
  }

  if (body.velocity.magnitude() > MIN_SPEED) {
    return "Stop";
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

  return { update, kindsOrArchetype: "ShipEntity" };
};
