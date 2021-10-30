# Snakefood


## Systems are closures?

I fought with this for a while. I don't think I have the best solution here, but it works well enough, even if the ergonomics are weird:

- I needed a type that would enforce a consistent set of entity components and list of componentTypes
- didn't want the super verbosity and type unsafeness of classes
  - classes don't infer types from interfaces they implement. You have to write them out again
- didn't want to have to explicitly define the constructor and call super every time
  - particularly if I had class members that needed initialization on create
