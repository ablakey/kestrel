import { MenuInput } from "../config";
import { useGame, useKeypress } from "../utils";
import { Modal } from "./Widgets/Modal";
import splashScreenImage from "../assets/images/splash_screen.png";
import { Button } from "./Widgets/Button";

export function AboutModal() {
  const game = useGame();

  function close() {
    game.setState((draft) => {
      draft.isPaused = false;
      draft.showAbout = false;
    });
  }

  useKeypress([MenuInput.Close.key], close);

  return (
    <Modal style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <h2>Welcome to Project Kestrel</h2>
      <div>
        This is a reimplementation of a Mid 90's Macintosh game called Escape Velocity. The purpose
        of this project is for fun and to learn a bit. I've never developed a game before and
        there's a ton to learn by doing so!
      </div>
      <img style={{ width: "100%" }} src={splashScreenImage} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Button label="Done" onClick={close} />
      </div>
    </Modal>
  );
}
