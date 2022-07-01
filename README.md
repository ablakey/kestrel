
# Project Kestrel


## FSM notes

Eg. To go somewhere static:

States:
STOPPING
AIM_AT
MOVING_TOWARDS
STOPPED


STOPPING: if not facing away, face away.  If facing away, thruster.  If stopped, enter AIM_AT

AIM_AT: If not aiming at, rotate nearest.  If aiming at, enter MOVING_TOWARDS.

MOVING_TOWARDS: If not  <stopping distance>, thruster.  If <stopping distnace> and not facing away, turn.  If <stopping distance> and facing away, slow down.  If Stopped, enter STOPPED
