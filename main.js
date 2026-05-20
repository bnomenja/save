import {
  Dom,
  events,
  store,
  router,
  El,
  useState,
} from "./mini-framework/index.js";
import { gamePage } from "./pages/game.js";
import { lobbyPage } from "./pages/lobby.js";
import { resultPage } from "./pages/result.js";
import { welcomePage } from "./pages/welcome.js";

router.register("#", () => welcomePage());
router.register("#/", () => welcomePage());
router.register("#/lobby", () => lobbyPage());
router.register("#/game", () => gamePage());
router.register("#/result", () => resultPage());
