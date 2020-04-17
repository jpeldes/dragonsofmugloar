import React from "react";
import { GameStats } from "./GameStats";
import { MessageList } from "./MessageList";
import ShopView from "./ShopView";

const GameView = ({ rep, game, messages, handleSolveAd, handleBuyItem, handleInvestigate }) => {
  const gameId = game ? game.gameId : null;

  if (gameId && game.lives === 0) {
    return (
      <div>
        <GameStats game={game} rep={rep} />
        <h1 className="text-centered">Game over!</h1>
      </div>
    );
  }

  return (
    <div>
      <GameStats game={game} rep={rep} handleInvestigate={handleInvestigate} />
      {gameId && (
        <article>
          <h1 className="text-centered">Quests</h1>
          <MessageList
            messages={messages}
            gameId={gameId}
            handleSolveAd={handleSolveAd}
          />
        </article>
      )}
      {gameId && (
        <article>
          <h1 className="text-centered">Wares</h1>
          <ShopView gameId={gameId} handleBuyItem={handleBuyItem} />
        </article>
      )}
    </div>
  );
};
export default GameView;
