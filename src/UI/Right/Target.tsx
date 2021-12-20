import { TeamLabel } from "../../strings";
import { ShipEntity } from "../../Utilities/ShipFactory";

export function Target(props: { target: ShipEntity | null }) {
  const { target } = props;

  if (target === null) {
    return <span>"No Target Selected."</span>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "calc(100% - 12px)",
        maxHeight: "calc(100% - 12px)",
        padding: 6,
      }}
    >
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
    </div>
  );
}
