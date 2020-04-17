import React from "react";
import "./GameList.css";

const NewGameItem = ({ handleNewGame }) => (
  <div className="item new">
    <h3>New game</h3>
    <button onClick={handleNewGame}>+ CREATE</button>
  </div>
);

const GameItem = ({ gameId, score, handleClick, btnDisabled, btnText }) => (
  <div className="item">
    <h3 className="text-centered">{gameId}</h3>
    <div className="text-centered">Score: {score}</div>
    <button disabled={btnDisabled} onClick={() => handleClick(gameId)}>
      {btnText}
    </button>
  </div>
);

export const GameList = ({ games, handleNewGame, handlePlayGame }) => {
  return (
    <div>
      <h1>Welcome to Dragons of Mugloar</h1>
      <div className="game-list">
        <NewGameItem handleNewGame={handleNewGame} />
        {Object.values(games).map(({ gameId, lives, score }) => (
          <GameItem
            key={gameId}
            gameId={gameId}
            score={score}
            handleClick={handlePlayGame}
            btnDisabled={lives === 0}
            btnText={lives === 0 ? "Game over!" : "Continue"}
          />
        ))}
      </div>
    </div>
  );
};
export default GameList;
