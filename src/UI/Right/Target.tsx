import { ShipEntity } from "../../Factories/ShipFactory";
import { Panel } from "./Panel";

function NoTarget() {
  return <span>"No Target Selected."</span>;
}

function HasTarget(props: { target: ShipEntity }) {
  const { target } = props;
  return (
    <>
      <div>{`${target.components.description.label} (${target.id})`}</div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>{`Health: ${target.components.health.hp}`}</div>
        {/* <div>{TeamLabel[target.components.politics.team]}</div> */}
      </div>
    </>
  );
}

export function Target(props: { target: ShipEntity | null }) {
  const { target } = props;

  return (
    <Panel
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 200,
        padding: 6,
      }}
    >
      {target ? <HasTarget target={target} /> : <NoTarget />}
    </Panel>
  );
}
