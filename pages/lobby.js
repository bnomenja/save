import { El, router, useState } from "../mini-framework/index.js";

let interval = null;

export function lobbyPage() {
  const [currentPlayer] = useState("currentPlayer", null);
  if (!currentPlayer) {
    router.navigate("#/");
    return El("div", {});
  }

  const [players] = useState("players", []);
  const [messages, setMessages] = useState("messages", [
    { key: 0, author: "bob", text: "hello" },
  ]);

  const [input, setInput] = useState("chatInput", "");
  const [timer, setTimer] = useState("timer", 1);

  if (interval === null && timer > 0) {
    interval = setInterval(() => {
      const [current, setCurrent] = useState("timer");
      if (current <= 1) {
        clearInterval(interval);
        interval = null;
        router.navigate("#/game");
        return;
      }
      setCurrent(current - 1);
    }, 1000);
  }

  const sendMessage = () => {
    const [currentInput, setCurrentInput] = useState("chatInput");

    if (!currentInput?.trim()) return;
    setMessages([
      ...messages,
      { key: Date.now(), text: currentInput, author: currentPlayer.nickname },
    ]);
    setCurrentInput("");
  };

  return El(
    "div",
    { class: "lobby-container" },

    El(
      "div",
      { class: "timer" },
      timer > 0 ? `Get Ready ${timer}` : "Starting...",
    ),

    El(
      "div",
      { class: "players-lobby" },
      El("h2", {}, "Players: "),
      players.map((p) =>
        El("div", { key: p.id, class: "player-lobby" }, p.nickname),
      ),
    ),

    El(
      "div",
      { class: "chat" },
      El(
        "div",
        { class: "messages" },
        messages.map((m) =>
          El(
            "div",
            {
              key: m.key,
              class:
                "message " +
                (m.author === currentPlayer.nickname ? "me" : "other"),
            },
            currentPlayer.nickname === m.author
              ? `${m.text}`
              : `${m.author}: ${m.text}`,
          ),
        ),
      ),
      El("input", {
        value: input,
        placeholder: "message...",
        oninput: (e) => setInput(e.target.value),
        onkeydown: (e) => {
          if (e.key === "Enter") sendMessage();
        },
      }),
    ),
  );
}
