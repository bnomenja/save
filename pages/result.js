import { El, router, store, useState } from "../mini-framework/index.js";
import { playerColor } from "./game.js";
import { Player } from "../entities/player.js";

export function resultPage() {
  const [players] = useState("players");
  const [winner] = useState("winner")

  if (!winner) return router.navigate("#");

  return El(
    "div",
    { class: "result-container" },
    El("h1", { class: "result-title" }, "Game Over"),
    El(
      "div",
      {
        class: "winner-card",
        style: `--player-color: ${playerColor(winner.nickname)}`,
      },
      El("div", { class: "winner-avatar" }, winner.nickname[0].toUpperCase()),
      El("div", { class: "winner-nickname" }, winner.nickname),
      El("div", { class: "winner-label" }, "🏆 Winner"),
    ),
    El(
      "button",
      { class: "result-btn",onclick: () => {
  store.set({
    players: [new Player(1, 1, "bob")], // ← valeur initiale de welcome.js
    currentPlayer: null,
    map: undefined,      // ← undefined force useState à réinitialiser
    bombs: undefined,
    powerups: undefined,
    timer: undefined,
    chatInput: undefined,
    messages: undefined,
    input: undefined,
    inputError: undefined,
  });
  router.navigate("#");
} },
      "Play Again",
    ),
  );
}