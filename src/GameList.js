import React from "react";
import { apiGameStart } from "./api";

const NewGameItem = ({ handleNewGame }) => (
  <div>
    <h3>New game</h3>
    <button onClick={handleNewGame}>+ CREATE</button>
  </div>
);

const GameItem = ({ gameId, handleClick }) => (
  <div>
    <h3>{gameId}</h3>
    <button onClick={() => handleClick(gameId)}>Continue</button>
  </div>
);

export const GameList = ({ games, saveGame, setActiveGameId }) => {
  const handleNewGame = () => {
    apiGameStart().then((data) => {
      saveGame(data.gameId, data);
      setActiveGameId(data.gameId);
      return data;
    });
  };

  console.log(games);

  return (
    <div>
      <h1>Welcome to Dragons of Mugloar</h1>
      <div>
        <NewGameItem handleNewGame={handleNewGame} />
        {Object.values(games).map(({ gameId }) => (
          <GameItem
            key={gameId}
            gameId={gameId}
            handleClick={setActiveGameId}
          />
        ))}
      </div>
    </div>
  );
};
export default GameList;