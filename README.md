# Snakefood

## Why is ECS so tightly bound to the game?
It's not a library and I didn't want to add extra verbosity in many places by making it generic.
There's many better ECS libraries anyway.

## Systems are closures?

I fought with this for a while. I don't think I have the best solution here, but it works well enough, even if the ergonomics are weird:

- I needed a type that would enforce a consistent set of entity components and list of componentKinds
- didn't want the super verbosity and type unsafeness of classes
  - classes don't infer types from interfaces they implement. You have to write them out again
- didn't want to have to explicitly define the constructor and call super every time
  - particularly if I had class members that needed initialization on create


## Ship AI

Probably going to keep this very simple for now.

- ShipCommandAI
  - Decides what the goal of the ship is.
  - hostile? Who?
  - landing?
  - fleeing?

- ShipTargetAI
  - Decide what the target is
    - if Hostile, calculate which target to focus on
      - Could be complicated one day. For now, closest target.
  - Is this just part of ShipCommandAI?

- ShipMovementAI
  - Decide the goal position and orientation.
  - Decide how to get there.
    - calculate direction
    - begin thrusting
    - Calculate how much decel needed, therefore when to begin slowing.

- Ship WeaponsAI
  - Decide what weapon to fire.
  - Decide when to fire it.
