import React, { useState, useEffect } from "react";
import GameView from "./GameView";
import { GameList } from "./GameList";
import { apiGameStart, apiSolveAd, apiBuyItem, apiSyncMessages } from "./api";

const useMessageList = (gameId) => {
  const [list, setList] = useState([]);

  const syncMessages = () => {
    if (gameId) {
      return apiSyncMessages(gameId).then(translateTricks).then(setList);
    } else {
      return Promise.reject();
    }
  };

  useEffect(() => {
    if (gameId) {
      apiSyncMessages(gameId).then(translateTricks).then(setList);
    }
  }, [gameId]);

  return [syncMessages, list];
};

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
  // State

  const [gamesToStorage, gamesFromStorage] = useLocalStorage();
  const [games, setGames] = useState(gamesFromStorage());

  const [activeGameId, setActiveGameId] = useState(null);
  const activeGame = games[activeGameId];

  const [syncMessages, messageList] = useMessageList(activeGameId);

  // Handlers

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

  const handleSolveAd = (adId) => {
    return apiSolveAd(activeGameId, adId).then((data) => {
      handleSaveExistingGame(activeGameId, data);
      syncMessages();
      return data;
    });
  };

  const handleBuyItem = (itemId) => {
    return apiBuyItem(activeGameId, itemId).then((data) => {
      handleSaveExistingGame(activeGameId, data);
      syncMessages();
      return data;
    });
  };

  // Render

  return (
    <div className="GameContainer">
      {activeGameId ? (
        <GameView
          game={activeGame}
          messages={messageList}
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
  const safeKeys = ["gold", "lives", "score", "highScore", "turn", "level"];
  let newObj = safeKeys.reduce((obj, key) => {
    if (key in data) {
      obj[key] = data[key];
    }
    return obj;
  }, {});
  return newObj;
}

function translateTricks(messageList) {
  return messageList.map((ad) => {
    if (ad.encrypted) {
      try {
        return {
          ...ad,
          id: atob(ad.adId),
          message: atob(ad.message),
          probability: atob(ad.probability),
        };
      } catch (e) {
        return ad;
      }
    }
    return ad;
  });
}
