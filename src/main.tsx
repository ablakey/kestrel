import ReactDOM from "react-dom";
import Victor from "victor";
import { Layout } from "./UI/Layout";

declare global {
  interface Window {}
}

async function main() {
  function render() {
    ReactDOM.render(<Layout game={game} />, document.getElementById("ui"));
    requestAnimationFrame(render);
  }

  render();
}

main();
