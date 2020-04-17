import React from "react";
import "./GameStats.css";

const Item = ({ emoji, children }) => (
  <div className="stats-item">
    <div>{emoji}</div>
    {children}
  </div>
);

export const GameStats = ({ game }) => {
  if (!game) {
    return <header>Game: Syncing</header>;
  }
  const { score, gold, lives, turn } = game;
  return (
    <header>
      <Item emoji="🎯">
        <div>{score}</div>
      </Item>
      <Item emoji="💰">
        <div>{gold}</div>
      </Item>
      <Item emoji="❤️">
        <div>{lives}</div>
      </Item>
      <Item emoji="🚶‍♂️">
        <div>{turn}</div>
      </Item>
    </header>
  );
};
