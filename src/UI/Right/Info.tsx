import { ShipEntity } from "../../Factories/ShipFactory";
import { Panel } from "./Panel";

export function Info(props: { player: ShipEntity; entityCount: number }) {
  return (
    <Panel>
      <div></div>
      <div>{`${props.entityCount} entites`}</div>
      <div>{`${props.player.components.body.velocity.magnitude().toFixed(0)} m/s`}</div>
    </Panel>
  );
}
