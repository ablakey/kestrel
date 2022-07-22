
# Project Kestrel


## FSM notes

Eg. To go somewhere static:

States:
STOPPING
AIM_AT
MOVING_TOWARDS
STOPPING



STOPPING: if not facing away, face away.  If facing away, thruster.  If stopped, enter AIM_AT

AIM_AT: If not aiming at, rotate nearest.  If aiming at, enter MOVING_TOWARDS.

MOVING_TOWARDS: If not  <stopping distance>, thruster.  If <stopping distnace> and not facing away, turn.  If <stopping distance> and facing away, slow down.  If Stopped, enter STOPPED



### Some incomplete graph view.

Ships want to:
- pursue and attack
  - PURSUE (lazy: always aim and drive)
- stay put and attack
  - AIM AT
- flee
  - AIM AWAY, MOVE
- go to location
  - STOP, AIM AT, MOVE_TO, STOP
- leave the system
  - AIM_AT, MOVE, STOP, AIM_AT, WARP



STOPPING -> AIM_AT | PURSUE |



## Strategy

A ship will always have a Strategy.  This is used by the Sim to decide what states to transition into.

A strategy will be set by a higher level system:  GameSimulation.   Ie. when a ship is spawned, it will be given a strategy.  Eg. a pirate is spawned, it is set to Attack.

The target that pirate will attack will be set by the StrategySystem.  It looks at the current Strategy and then does things to populate the right state to conduct that strategy.
