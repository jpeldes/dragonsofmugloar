import React, { useState } from "react";
import GameView from "./GameView";
import { GameList } from "./GameList";
import { apiGameStart, apiSolveAd, apiBuyItem } from "./api";

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

function GameContainer() {
  const [gamesToStorage, gamesFromStorage] = useLocalStorage();
  const [games, setGames] = useState(gamesFromStorage());

  const handleSaveExistingGame = (gameId, data) => {
    let newGame = { ...games[gameId], ...pluckRelevantGameData(data) };
    let newGames = { ...games, [gameId]: newGame };

    setGames(newGames);
    gamesToStorage(newGames);
  };

  const handleNewGame = () => {
    return apiGameStart().then((newGame) => {
      const gameId = newGame.gameId;

      let newGames = { [gameId]: newGame, ...games };

      setGames(newGames);
      gamesToStorage(newGames);

      setActiveGameId(gameId);
      return newGame;
    });
  };

  const handleSolveAd = (gameId, adId) => {
    return apiSolveAd(gameId, adId).then((data) => {
      handleSaveExistingGame(gameId, data);
      return data;
    });
  };

  const handleBuyItem = (gameId, itemId) => {
    return apiBuyItem(gameId, itemId).then((data) => {
      handleSaveExistingGame(gameId, data);
      return data;
    });
  };

  const [activeGameId, setActiveGameId] = useState(null);
  const activeGame = games[activeGameId];

  return (
    <div className="GameContainer">
      {activeGameId ? (
        <GameView
          game={activeGame}
          handleSolveAd={handleSolveAd}
          handleBuyItem={handleBuyItem}
        />
      ) : (
        <GameList
          games={games}
          handleNewGame={handleNewGame}
          handlePlayGame={setActiveGameId}
        />
      )}
    </div>
  );
}

export default GameContainer;

function pluckRelevantGameData(data) {
  const safeKeys = ["gold", "lives", "score", "highScore", "turn"];
  let newObj = safeKeys.reduce((obj, key) => {
    if (key in data) {
      obj[key] = data[key];
    }
    return obj;
  }, {});
  return newObj;
}
