import React from "react";
import { GameStats } from "./GameStats";
import { MessageList } from "./MessageList";
import ShopView from "./ShopView";

const GameView = ({ saveGame, game }) => {
  const gameId = game ? game.gameId : null;

  const handleGameUpdate = (data) => {
    const safeKeys = ["gold", "lives", "score", "highScore", "turn"];
    let newObj = safeKeys.reduce((obj, key) => {
      if (key in data) {
        obj[key] = data[key];
      }
      return obj;
    }, {});

    saveGame(gameId, { ...game, ...newObj });
  };

  return (
    <div>
      <GameStats game={game} />
      {gameId && (
        <article>
          <h3>Messages / Tasks / Ads</h3>
          <MessageList gameId={gameId} handleGameUpdate={handleGameUpdate} />
        </article>
      )}
      {gameId && (
        <article>
          <h3>Shop</h3>
          <ShopView gameId={gameId} handleGameUpdate={handleGameUpdate} />
        </article>
      )}
    </div>
  );
};
export default GameView;
