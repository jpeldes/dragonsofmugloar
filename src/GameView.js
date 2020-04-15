import React, { useEffect, useState } from "react";
import { apiGameStart } from "./api";
import { GameStats } from "./GameStats";
import { MessageList } from "./MessageList";
import ShopView from "./ShopView";

function useStartGame() {
  const [game, setGame] = useState(null);

  useEffect(() => {
    apiGameStart().then(setGame);
  }, []);

  return [game, setGame];
}

const GameView = () => {
  const [game, setGame] = useStartGame();
  const gameId = game ? game.gameId : null;

  const handleGameUpdate = (data) => {
    // Pluck safe keys
    let plucker = ({ gold, lives, score, highScore, turn }) => ({
      gold,
      lives,
      score,
      highScore,
      turn,
    });
    let pluckedData = plucker(data);
    // Update game
    setGame({ ...game, ...pluckedData });
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
