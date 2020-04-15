import React from "react";
export const GameStats = ({ game }) => {
  if (!game) {
    return <header>Game: Syncing</header>;
  }
  return (
    <header>
      <span>Game {game.id}</span> | <span>Gold: {game.gold}</span> |
      <span>Score {game.score}</span> | <span>Lives: {game.lives}</span> |
      <span>Turns: {game.turn}</span>
    </header>
  );
};
