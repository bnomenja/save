import { Player } from "../entities/player.js";
import { DEFFAULT_GRID } from "../map/const.js";
import { router, useState, El } from "../mini-framework/index.js";

export function welcomePage() {
  const [input, setInput] = useState("input", "");
  const [inputError, setInputError] = useState("inputError", "");
  const [players, setPlayers] = useState("players", [new Player(1, 1, "bob")]);
  const [currentPlayer, setCurrentPlayer] = useState("currentPlayer", null);

  const handleSavePlayer = (nickname) => {
    if (players.length >= 4)
      return { success: false, error: "the lobby is already full" };

    const alreadySaved = players.some((p) => p.nickname === nickname);

    if (alreadySaved)
      return { success: false, error: "this nickname is already used" };

    const maxRow = DEFFAULT_GRID.length - 1;
    const maxCol = DEFFAULT_GRID.at(0).length - 1;

    const getSpawn = (playerNumber) => {
      if (playerNumber === 0) return { x: 1, y: 1 };
      if (playerNumber === 1) return { x: maxCol - 1, y: maxRow - 1 };
      if (playerNumber === 2) return { x: maxCol - 1, y: 1 };
      if (playerNumber === 3) return { x: 1, y: maxRow - 1 };
    };

    const { x, y } = getSpawn(players.length);

    const newPlayer = new Player(x, y, nickname);

    setCurrentPlayer(newPlayer);
    setPlayers([...players, newPlayer, new Player(maxCol -1, 1, "Pierre")]);

    return { success: true };
  };

  const handleInput = (e) => {
    if (e.key === "Enter") {
      const { success, error } = handleSavePlayer(input.trim());

      if (!success) setInputError(error);
      else {
        setInput("");
        setInputError("");
        router.navigate("#/lobby");
      }
    }
  };

  return El(
    "div",
    { class: "welcome-container" },
    El("h1", null, "Welcome to Bomberman"),
    El("p", null, "Enter a nickname to start to play"),
    El("div", { class: "input-error" }, inputError),
    El("input", {
      value: input,
      placeholder: "...",
      minLength: 3,
      maxLength: 12,
      oninput: (e) => setInput(e.target.value),
      onkeydown: handleInput,
    }),
  );
}
