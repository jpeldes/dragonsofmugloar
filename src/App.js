import React, { useState } from "react";
import GameView from "./GameView";
import "./App.css";
import { GameList } from "./GameList";

const useLocalStorage = () => {
  const gamesToStorage = (newSavedGames) =>
    localStorage.setItem("games", JSON.stringify(newSavedGames));
  const gamesFromStorage = () => {
    try {
      const str = localStorage.getItem("games");
      return JSON.parse(str) || {};
    } catch (e) {
      return {};
    }
  };

  return [gamesToStorage, gamesFromStorage];
};

function App() {
  const [gamesToStorage, gamesFromStorage] = useLocalStorage();

  const [games, setGames] = useState(gamesFromStorage());
  const saveGame = (gameId, game) => {
    let newSavedGames;
    if (games.hasOwnProperty(gameId)) {
      // Update existing game
      newSavedGames = { ...games, [gameId]: game };
    } else {
      // Set new game as first
      newSavedGames = { [gameId]: game, ...games };
    }
    setGames(newSavedGames);
    gamesToStorage(newSavedGames);
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
