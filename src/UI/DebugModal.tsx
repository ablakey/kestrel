import { Modal } from "./Components/Modal";
import { Slider } from "./Components/Slider";
import { useGame } from "./uiHelpers";

export function DebugModal() {
  const game = useGame();

  return (
    <Modal style={{ display: "flex" }}>
      <div style={{ flexGrow: 1 }}>
        <Slider
          label="Volume"
          value={game.state.volume}
          onChange={(v) => {
            game.state.volume = v;
          }}
        />
      </div>
      <div style={{ flexGrow: 1 }}>Right</div>
    </Modal>
  );
}
