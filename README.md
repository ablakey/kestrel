# Snakefood


 ## FAQ

 ### Technical

#### Why is Game so tightly bound to the game?
It's not a library and I didn't want to add extra verbosity in many places by making it generic.
There's many better Game libraries anyway.

#### Systems are closures?

I fought with this for a while. I don't think I have the best solution here, but it works well enough, even if the ergonomics are weird:

- I needed a type that would enforce a consistent set of entity components and list of kindsOrArchetype
- didn't want the super verbosity and type unsafeness of classes
  - classes don't infer types from interfaces they implement. You have to write them out again
- didn't want to have to explicitly define the constructor and call super every time
  - particularly if I had class members that needed initialization on create



## Tags
I tried to remove tags once thinking it wasn't that useful. Ran into the issue that I need tags to sub-query things.
For example, without tags, I cannot find the player ship, or exclude the player ship.  Even if I had a "Player" component,
it would still be impossible to exclude the player ship.

Though I guess I could find them all and then exclude player, but that's kind of silly.

Do tags need to be a collection or just a single tag?

Looks like a lot of Unity people don't use tags. Maybe I just get rid of them. How often will I look up player vs. look up the PlayerControlled vs. AI components?


## Random Thoughts
- Some bullets track. Do they need a target? What about properties about how they move?
  - Do I just add additional AI components to bullets?
  - If done right, I could add the MovementAI to a bullet, which would understand how to move and seek target.
    - needs to know things about its turning capabilities.
      - Do I make a component for anything that can turn?

If I have a component that describes Kinematics (max speed, turn radius, acceleration, etc.) I could:
 - use it for ships and bullets.
 - could one day have intelligent bullets that don't just turn, but can use the AI capabilities.

Do I need the bullets to be AI aware?
- BulletSystem for now can just use Kinematics component to know how to turn and how fast to go.
- AISystem can use Kinematics more intelligently.


## AI exploration


## Movement AI
If a ship is hostile to a team:
- Does team exist?
  - No: return
  - Yes: Continue
- Is target hostile?
    - No: target hostile ship
    - Yes: continue

## Weapons AI
- Can we shoot primary at target?
 - No: firePrimary = false
   Yes: firePrimary = true

- Can we shoot


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


## Tracking Hostility

- Some factions are always hostile with each other
- Faction hostility can change
- Per-system reputation
- You can be hostile with individual ships.

I think the way we handle it might be:

- World state:
  - Every faction has reputations with every other faction (by default it can be like: 10)
  - If a reputation is below 0, they're default hostile
  - Reputation can go up and down between entire factions

- Instance state:
  - Is initialized based on world state
  - A second set of state for this instance (the system we're in)
  - We can make it get worse or better
  - it affects world state to a lesser amount.  (eg. make an entire faction attack you in a system hurts your rep with them globally, but not as steep. They might not attack you in another system yet)

- Ship Politics component state:
  - Are initialized based on instance state
  - Can go up and down in the immediate case. (eg. making a single ship hostile with you)


## Keyboard inputs
- keys only invoke state changes when appropriate (eg. if hte game is paused, don't move the ship)
- keys can be re-used depending on context (eg. when a menu is open, different buttons do different things)
- two kinds of managers
  - I tried to do it with one but no luck.
  - so one manager is a system
  - the other is a react hook?
    - we use a hook so that the correct component, when mounted, can listen for keys and do things for its UI
    - this means that the main manager needs to know when NOT to handle events.
- manager
  - A bunch of keys always get listened to
  - Some only when game is running
- Maybe we don't have to track state, but rather just track when game is paused or not.


## Scripted Behaviour

I probabl want a much more detailed AI system, but I'm intentionally starting off with basic if statements and growing organically, for learning.

I think I need a ScriptedBehaviour system where I can give it a series of things to do.  eg. wait, aim at, move to, etc.

when a behaviour is set thats all ai does.

ai only ever runs a behavior? ie there is no other kind.

ai strategy system decides what behaviour to pick.


MovementBehaviour (PointAt, FlyThrough, FlyStraight, Stop, PointBackwards)

### Example behaviours

- SmallShipCombat (external state: target)
  - MovementBehaviour = Turn Towards
  - Wait n seconds (state: countdown)
  - CombatBehaviour = attack
  - begin pursuit
    - MovementBehaviour = Movetowards


- JumpToSystem (external state: system target)
  - MovementB: turn towards AI.navtarget (which is either a Victor or an entity id)
  - wait n seconds (state: countdown)
  - MovementB: Movetowards (Ai.navtarget)


(how to close loop on adjustments?)
- Move to (static?) position
  - movementB: turn towards navtarget
  - movementb: fly towards
  - keep doing math on when to turn
  -  movementB: Stop



### How to implement

- behaviours are functions called by the AIbehaviourSystem.

- when AIStrategy changes behaviour, it should update all the shared state (like timer, target, etc.)

- clear out AIbehaviour. It won't do a thing other than, for now, decide to turn on one of these behaviours.

- later we will add logic for AIBehaviour to decide which behaviours to set.

- TODO: cheat a little: if a ship is moving VERY slow, just set it to 0.
