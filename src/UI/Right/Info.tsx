import { ShipEntity } from "../../Factories/ShipFactory";
import { Panel } from "./Panel";

export function Info(props: { player: ShipEntity; entityCount: number }) {
  return (
    <Panel>
      <div>{`${props.entityCount} entites`}</div>
      <div>{`${props.player.components.body.velocity.magnitude().toFixed(0)} m/s`}</div>
      <div></div>
      <div>WASD to drive</div>
      <div>Space to Shoot</div>
      <div>Tab to change target</div>
      <div>I for debug tools</div>
    </Panel>
  );
}
