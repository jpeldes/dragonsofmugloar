import React from "react";
import { GameStats } from "./GameStats";
import { MessageList } from "./MessageList";
import ShopView from "./ShopView";

const GameView = ({ game, messages, handleSolveAd, handleBuyItem }) => {
  const gameId = game ? game.gameId : null;
  return (
    <div>
      <GameStats game={game} />
      {gameId && (
        <article>
          <h3>Messages / Tasks / Ads</h3>
          <MessageList
            messages={messages}
            gameId={gameId}
            handleSolveAd={handleSolveAd}
          />
        </article>
      )}
      {gameId && (
        <article>
          <h3>Shop</h3>
          <ShopView gameId={gameId} handleBuyItem={handleBuyItem} />
        </article>
      )}
    </div>
  );
};
export default GameView;
