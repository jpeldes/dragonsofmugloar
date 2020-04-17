import React from "react";
import "./GameStats.css";

const Item = ({ emoji, children }) => (
  <div className="stats-item">
    <div>{emoji}</div>
    {children}
  </div>
);

export const GameStats = ({ rep, game, handleInvestigate }) => {
  if (!game) {
    return <header>Game: Syncing</header>;
  }
  const { score, gold, lives, turn, level } = game;
  const { people = "?", state = "?", underworld = "?" } = rep;
  return (
    <>
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
        <Item emoji="🐲">
          <div>{level}</div>
        </Item>
      </header>
      {rep && (
        <header>
          <Item emoji="👨">
            <div>{people}</div>
          </Item>
          <Item emoji="🇺🇸">
            <div>{state}</div>
          </Item>
          <Item emoji="🧟‍♂️">
            <div>{underworld}</div>
          </Item>
        </header>
      )}
      <header>
        <button onClick={handleInvestigate}>Investigate your reputation</button>
      </header>
    </>
  );
};
