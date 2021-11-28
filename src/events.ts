import { EventEmitter } from "eventemitter3";
import TypedEmitter from "typed-emitter";
import Victor from "victor";

export type SpawnEvent = { position: Victor; sound?: string };

interface MessageEvents {
  spawn: (event: SpawnEvent) => void;
}

export const events = new EventEmitter() as unknown as TypedEmitter<MessageEvents>;
