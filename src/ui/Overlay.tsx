import { Game } from "../game";

export function Overlay(props: { game: Game }) {
  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        right: 250,
        top: 0,
        bottom: 0,
        margin: "4vmax",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flexEnd",
      }}
    >
      Overlay
    </div>
  );
}
