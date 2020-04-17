import React from "react";
import { GameStats } from "./GameStats";
import { MessageList } from "./MessageList";
import ShopView from "./ShopView";

const GameView = ({ saveGame, game }) => {
  const gameId = game ? game.gameId : null;
  return (
    <div>
      <GameStats game={game} />
      {gameId && (
        <article>
          <h3>Messages / Tasks / Ads</h3>
          <MessageList gameId={gameId} handleGameUpdate={saveGame} />
        </article>
      )}
      {gameId && (
        <article>
          <h3>Shop</h3>
          <ShopView gameId={gameId} handleGameUpdate={saveGame} />
        </article>
      )}
    </div>
  );
};
export default GameView;
