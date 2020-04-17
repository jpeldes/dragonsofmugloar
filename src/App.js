import React, { useState } from "react";
import GameView from "./GameView";
import "./App.css";
import { GameList } from "./GameList";

function App() {
  const [games, setGames] = useState({});
  const saveGame = (gameId, game) => {
    setGames({ ...games, [gameId]: game });
  };

  const [activeGameId, setActiveGameId] = useState(null);
  const activeGame = games[activeGameId];

  return (
    <div className="App">
      {activeGameId ? (
        <GameView game={activeGame} saveGame={saveGame} />
      ) : (
        <GameList
          games={games}
          saveGame={saveGame}
          setActiveGameId={setActiveGameId}
        />
      )}
    </div>
  );
}

export default App;
